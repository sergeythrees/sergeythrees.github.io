/*
 * Demo stand for the GREEN-API Telegram chat client.
 *
 * The whole GREEN-API backend is mocked in the browser: `window.fetch` is
 * wrapped and any request whose PATH contains `/waInstance` plus one of the
 * documented methods is answered locally. Matching is done by path rather than
 * by host, so the stand works with whatever `apiUrl` a visitor types — no real
 * keys and no network are involved.
 *
 * Written as ES5 on purpose: the file is loaded with a plain <script> tag
 * before the application bundle, so it must parse on the oldest engines we
 * support. Promises and `Response` are used, everything else is `var` and
 * `function`.
 */
(function () {
  'use strict';

  var LEGACY_STORAGE_KEY =
    'green-api-telegram-chat:credentials-' + window.location.pathname;
  var STORAGE_KEY = 'green-api-telegram-chat:credentials';

  // The identifiers of the fake instance the stand pretends to talk to.
  var PEER_CHAT_ID = '6900000001';
  var SELF_CHAT_ID = '305000000';
  var SELF_ID = '305000000';
  var ACCOUNT = '79001234567';
  var PEER_PHONE = '79991234567';
  var INSTANCE_ID = 4100000001;
  var INSTANCE_WID = ACCOUNT + '@c.us';

  // Демо-инстанс: заглушка отвечает ТОЛЬКО на него. Как только посетитель
  // выходит и вводит свои idInstance/apiTokenInstance, запросы уходят в
  // настоящий GREEN-API (у него открыт CORS, поэтому браузер их пропускает).
  var DEMO_INSTANCE = '4100000001';
  var DEMO_TOKEN = 'demo-token';
  var DEMO_API_URL = 'https://4100.api.green-api.com';
  // Флаг «демо уже подставляли»: после выхода и входа со своими ключами
  // перезагрузка страницы не возвращает посетителя в демо-режим.
  var SEEDED_KEY = 'green-api-stand:seeded';

  // --- notification queue -------------------------------------------------
  // `receiveNotification` is a long poll: a waiter parks until a notification
  // is pushed, exactly like the real API. Everything the app polls is served
  // from this queue.
  window.__queue = [];
  window.__waiters = [];
  window.__sent = [];
  window.__receipt = 500;

  window.__pushNotification = function (notification) {
    var waiter = window.__waiters.shift();
    if (waiter) waiter(notification);
    else window.__queue.push(notification);
  };

  function jsonResponse(body, status) {
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: status || 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  // --- auto-reply ---------------------------------------------------------
  // One reply per chat: the first message sent to a peer is answered ~1.2 s
  // later, so the demo keeps working no matter how many messages a visitor
  // types instead of turning into a chatty bot.
  var replied = {};
  var replies = [
    'Привет! Это заглушка GREEN-API — сообщение дошло.',
    'Вижу твоё сообщение, отвечаю из мока.',
    'Стенд работает на подменённом бэкенде, реальные ключи не нужны.',
    'Ещё одно сообщение — и можно закрывать тестовое.',
    'Ответ приходит через ReceiveNotification, как в живом API.',
  ];
  var replyIndex = 0;

  // Body shape taken from a notification captured on a live instance, with the
  // identifiers replaced: for an incoming message `senderData` describes the
  // peer, and the client resolves the chat by `chatId` first.
  function autoReply(chatId) {
    var chat = chatId ? String(chatId) : PEER_CHAT_ID;
    if (replied[chat]) return;
    replied[chat] = true;

    var text = replies[replyIndex % replies.length];
    replyIndex += 1;
    window.__receipt += 1;

    window.setTimeout(function () {
      window.__pushNotification({
        receiptId: window.__receipt,
        body: {
          typeWebhook: 'incomingMessageReceived',
          instanceData: {
            idInstance: INSTANCE_ID,
            wid: INSTANCE_WID,
            typeInstance: 'telegram',
          },
          timestamp: Math.floor(Date.now() / 1000),
          idMessage: 'demo-in-' + window.__receipt,
          senderData: {
            chatId: chat,
            chatType: 'user',
            sender: chat,
            chatName: 'Анна Смирнова',
            senderName: 'Анна Смирнова',
            senderContactName: 'Анна Смирнова',
            senderPhoneNumber: Number(PEER_PHONE),
          },
          messageData: {
            typeMessage: 'textMessage',
            textMessageData: { textMessage: text },
          },
        },
      });
    }, 1200);
  }

  // --- fetch interception -------------------------------------------------
  var originalFetch = window.fetch.bind(window);

  function requestUrl(input) {
    if (typeof input === 'string') return input;
    if (input && typeof input.url === 'string') return input.url;
    return String(input);
  }

  function methodIn(url, method) {
    return url.indexOf('/' + method + '/') !== -1;
  }

  /** Разбирает адрес GREEN-API: /waInstance{instance}/{method}/{token}. */
  function parseInstanceRequest(url) {
    var match = /\/waInstance([^/]+)\/([^/?]+)\/([^/?]+)/.exec(url);
    if (!match) return null;
    return { instance: match[1], method: match[2], token: match[3] };
  }

  function isStubbed(url) {
    var request = parseInstanceRequest(url);
    if (!request) return false;

    // Обслуживаем только демо-инстанс: со своими ключами запрос обязан уйти в
    // настоящий GREEN-API, иначе вход с реальным токеном «удавался» бы на
    // подставных данных.
    if (request.instance !== DEMO_INSTANCE || request.token !== DEMO_TOKEN) return false;

    var methods = [
      'getStateInstance',
      'getAccountSettings',
      'setSettings',
      'checkAccount',
      'getContactInfo',
      'sendMessage',
      'deleteNotification',
      'receiveNotification',
    ];
    for (var i = 0; i < methods.length; i += 1) {
      if (request.method === methods[i]) return true;
    }
    return false;
  }

  function requestBody(init) {
    if (!init || init.body == null) return null;
    try {
      return JSON.parse(String(init.body));
    } catch (error) {
      return null;
    }
  }

  window.fetch = function (input, init) {
    var url = requestUrl(input);

    if (!isStubbed(url)) return originalFetch(input, init);

    if (methodIn(url, 'getStateInstance')) {
      return jsonResponse({ stateInstance: 'authorized' });
    }

    if (methodIn(url, 'getAccountSettings')) {
      return jsonResponse({
        stateInstance: 'authorized',
        username: '@green_api_demo',
        phone: Number(ACCOUNT),
      });
    }

    if (methodIn(url, 'setSettings')) {
      return jsonResponse({ saveSettings: true });
    }

    if (methodIn(url, 'checkAccount')) {
      // A confirmed peer, so the client sends to the canonical numeric chatId.
      return jsonResponse({ exist: true, chatId: '10000000', fromCache: true });
    }

    if (methodIn(url, 'getContactInfo')) {
      // The live answer for a peer whose profile name is unset: `name` is "."
      // and only the username and the phone identify them.
      return jsonResponse({
        chatId: PEER_CHAT_ID,
        name: '.',
        contactName: '.',
        username: '@peer_demo',
        phoneNumber: Number(PEER_PHONE),
      });
    }

    if (methodIn(url, 'sendMessage')) {
      var body = requestBody(init);
      window.__sent.push(body);
      autoReply(body ? body.chatId : null);
      return jsonResponse({ idMessage: 'srv-' + window.__sent.length });
    }

    if (methodIn(url, 'deleteNotification')) {
      return jsonResponse({ result: true, reason: '' });
    }

    if (methodIn(url, 'receiveNotification')) {
      if (window.__queue.length) {
        return jsonResponse(window.__queue.shift());
      }
      // Park the long poll until something is pushed.
      return new Promise(function (resolve) {
        window.__waiters.push(function (notification) {
          resolve(
            new Response(JSON.stringify(notification), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );
        });
      });
    }

    return jsonResponse({ reason: 'unexpected ' + url }, 404);
  };

  // --- pre-filled credentials --------------------------------------------
  // Демо-ключи подставляем один раз (флаг SEEDED_KEY) и только если в
  // localStorage ещё ничего нет. После «Выйти» и входа со своими ключами
  // перезагрузка страницы оставляет посетителя в его инстансе.
  // --- стартовое состояние -------------------------------------------------
  // Демо-ключи НЕ подставляем: стенд должен открываться на штатном экране
  // авторизации, а демо-вход посетитель запускает кнопкой ниже. Единственное,
  // что здесь делаем, — убираем демо-ключи, оставшиеся от прежней версии
  // стенда. Свои ключи посетителя не трогаем никогда.
  try {
    var storedRaw = window.localStorage.getItem(STORAGE_KEY);
    var stored = storedRaw ? JSON.parse(storedRaw) : null;
    if (
      stored &&
      stored.idInstance === DEMO_INSTANCE &&
      stored.apiTokenInstance === DEMO_TOKEN
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    window.localStorage.removeItem(SEEDED_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (error) {
    /* Приватный режим: экран входа всё равно работает. */
  }

  // --- кнопка быстрого демо-входа ------------------------------------------
  // Живёт на штатном экране авторизации, под строкой «Чат на GREEN-API».
  // Приложение не переписываем: кнопка добавляется в уже отрисованную форму,
  // заполняет поля демо-ключами и отправляет её.
  var DEMO_BUTTON_CLASS = 'stand-demo-login';

  /** Заполняет поле так, как это делает пользователь (React слушает input). */
  function fillField(selector, value) {
    var field = document.querySelector(selector);
    if (!field) return false;
    var proto =
      field.tagName === 'TEXTAREA'
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;
    var setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    setter.call(field, value);
    field.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  }

  /** Подставляет демо-ключи и отправляет форму входа. */
  function submitDemoLogin() {
    var form = document.querySelector('form.login__card');
    if (!form) return;

    fillField('#login-api-url', DEMO_API_URL);
    fillField('#login-id-instance', DEMO_INSTANCE);
    fillField('#login-api-token', DEMO_TOKEN);

    // React применяет состояние асинхронно, поэтому отправляем форму следом.
    window.setTimeout(function () {
      if (typeof form.requestSubmit === 'function') form.requestSubmit();
      else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }, 0);
  }

  function injectDemoButton() {
    var brand = document.querySelector('.login__brand');
    if (!brand || !brand.parentNode) return;
    if (document.querySelector('.' + DEMO_BUTTON_CLASS)) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = DEMO_BUTTON_CLASS;
    button.textContent = 'Быстрый демо-вход';
    button.addEventListener('click', submitDemoLogin);

    brand.parentNode.insertBefore(button, brand.nextSibling);
  }

  // Экран входа появляется не только при старте, но и после «Выйти»,
  // поэтому следим за разметкой, а не делаем это один раз.
  function watchLoginScreen() {
    injectDemoButton();
    var observer = new MutationObserver(injectDemoButton);
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  // --- demo badge ---------------------------------------------------------
  // Плашка объясняет, что происходит: в демо-режиме отвечает заглушка, а для
  // проверки своего инстанса нужно выйти и войти с реальными ключами.
  function addBadge() {
    if (document.querySelector('.mock-stand-badge')) return;

    var style = document.createElement('style');
    style.textContent =
      '.mock-stand-badge{position:fixed;left:12px;bottom:12px;z-index:9999;' +
      'display:flex;flex-direction:column;gap:2px;max-width:calc(100vw - 24px);' +
      'box-sizing:border-box;padding:7px 11px;border-radius:8px;text-decoration:none;' +
      'background:rgba(17,17,17,.76);color:#fff;' +
      'font:12px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;' +
      'box-shadow:0 2px 8px rgba(0,0,0,.28);backdrop-filter:blur(4px);}' +
      '.mock-stand-badge:hover{background:rgba(17,17,17,.9);}' +
      '.mock-stand-badge__hint{opacity:.72;font-size:11px;}' +
      '@media (max-width:520px){.mock-stand-badge{font-size:11px;padding:6px 9px;}' +
      '.mock-stand-badge__hint{font-size:10px;}}' +
      // Кнопка демо-входа: нейтральные цвета, чтобы подходила и светлой, и
      // тёмной теме приложения (она следует за системной).
      '.stand-demo-login{display:block;width:100%;box-sizing:border-box;' +
      'margin:0 0 14px;padding:10px 12px;border:1px dashed currentColor;border-radius:10px;' +
      'background:transparent;color:inherit;opacity:.75;cursor:pointer;' +
      'font:inherit;font-size:14px;line-height:1.2;}' +
      '.stand-demo-login:hover{opacity:1;background:rgba(128,128,128,.12);}' +
      '.stand-demo-login:focus-visible{outline:2px solid currentColor;outline-offset:2px;}';
    (document.head || document.documentElement).appendChild(style);

    var badge = document.createElement('a');
    badge.className = 'mock-stand-badge';
    badge.href = 'https://sergeythrees.github.io/#/employers/tasks/green-api';
    badge.target = '_blank';
    badge.rel = 'noopener';

    var title = document.createElement('span');
    title.textContent = 'Демо-режим: отвечает заглушка GREEN-API';

    var hint = document.createElement('span');
    hint.className = 'mock-stand-badge__hint';
    hint.textContent = 'Демо-вход — кнопкой на экране входа, либо свои ключи GREEN-API';

    badge.appendChild(title);
    badge.appendChild(hint);

    var host = document.body || document.documentElement;
    if (host) host.appendChild(badge);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      addBadge();
      watchLoginScreen();
    });
  } else {
    addBadge();
    watchLoginScreen();
  }
})();
