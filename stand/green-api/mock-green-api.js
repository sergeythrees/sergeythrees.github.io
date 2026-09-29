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

  function isStubbed(url) {
    if (url.indexOf('/waInstance') === -1) return false;
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
      if (methodIn(url, methods[i])) return true;
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
  // Only when nothing is stored yet: a visitor who typed their own instance in
  // the login form keeps it.
  try {
    var existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing === null || existing === '') {
      // Drop the key an earlier version of this mock left under the old name.
      try {
        window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch (legacyError) {
        /* ignore */
      }
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          apiUrl: 'https://4100.api.green-api.com',
          idInstance: '4100000001',
          apiTokenInstance: 'demo-token',
        }),
      );
    }
  } catch (error) {
    /* Private mode: the login screen is still usable. */
  }

  // --- demo badge ---------------------------------------------------------
  function addBadge() {
    if (document.querySelector('.mock-stand-badge')) return;

    var style = document.createElement('style');
    style.textContent =
      '.mock-stand-badge{position:fixed;left:12px;bottom:12px;z-index:9999;' +
      'display:inline-block;max-width:calc(100vw - 24px);box-sizing:border-box;' +
      'padding:6px 10px;border-radius:8px;text-decoration:none;white-space:nowrap;' +
      'overflow:hidden;text-overflow:ellipsis;' +
      'background:rgba(17,17,17,.72);color:#fff;' +
      'font:12px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;' +
      'box-shadow:0 2px 8px rgba(0,0,0,.28);backdrop-filter:blur(4px);}' +
      '.mock-stand-badge:hover{background:rgba(17,17,17,.86);}' +
      '@media (max-width:520px){.mock-stand-badge{font-size:11px;padding:5px 8px;}}';
    (document.head || document.documentElement).appendChild(style);

    var badge = document.createElement('a');
    badge.className = 'mock-stand-badge';
    badge.href = 'https://sergeythrees.github.io/#/employers/tasks/green-api';
    badge.target = '_blank';
    badge.rel = 'noopener';
    badge.textContent = 'Демо-стенд · бэкенд GREEN-API замокан';

    var host = document.body || document.documentElement;
    if (host) host.appendChild(badge);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addBadge);
  } else {
    addBadge();
  }
})();
