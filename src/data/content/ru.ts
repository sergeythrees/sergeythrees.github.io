import type { Content } from '../types';

/**
 * Контент сайта на русском. Здесь и только здесь лежит весь текст,
 * который видит посетитель; английская версия — рядом, в content/en.ts.
 */
export const contentRu: Content = {
  site: {
    name: 'Sergey Stepanenko',
    handle: '@sergeythrees',
    role: 'Разработчик · AI-автоматизация · Telegram Mini Apps · React',
    headline: 'Пишу фронтенд и довожу свои проекты до запуска.',
    intro:
      'Фронтенд пишу с 2017 года. Здесь собраны мои проекты: конструктор форм на React, ' +
      'Telegram Mini App с депозитом в TON, бот на DeepSeek и браузерный агент для откликов ' +
      'на вакансии. У каждого есть исходники и инструкция по запуску.',
    email: 'sergeythrees@gmail.com',
    location: 'Москва · офис, гибрид, удалённо',
    links: [
      {
        label: 'GitHub',
        value: 'github.com/sergeythrees',
        href: 'https://github.com/sergeythrees',
      },
      {
        label: 'Почта',
        value: 'sergeythrees@gmail.com',
        href: 'mailto:sergeythrees@gmail.com',
      },
    ],
    skills: [
      {
        group: 'Фронтенд',
        items: ['React 19', 'TypeScript', 'Vite', 'MobX', 'Emotion', 'Ant Design'],
      },
      {
        group: 'Бэкенд и данные',
        items: ['Node.js', 'Fastify', 'Python 3.12', 'SQLite', 'PostgreSQL'],
      },
      {
        group: 'AI и автоматизация',
        items: ['DeepSeek API', 'browser-use', 'Playwright', 'Telegram API', 'grammY'],
      },
      {
        group: 'Инфраструктура',
        items: ['Docker', 'GitHub Actions', 'TON / Tact', 'Health Connect'],
      },
    ],
    principles: [
      'Проект должен запускаться у другого человека, а не только у меня.',
      'Тесты пишу вместе с кодом.',
      'Запуск одной командой. Если не получилось, в README написано, что сделать руками.',
      'Новую зависимость добавляю, только когда без неё никак.',
    ],
    about: [
      'Мне нравится делать продукт целиком: интерфейс, сервер и автоматизацию вокруг них. ' +
        'Сначала собираю самую простую версию, которая уже работает, потом дописываю.',
      'Проект без команд запуска, тестов и честного списка «что готово, что нет» ' +
        'я считаю незаконченным.',
      'До этого работал фронтендом в продуктовых командах: редактор форм, BPMN-конструктор, ' +
        'финансовая аналитика, e-learning. Сейчас делаю свои продукты и автоматизацию ' +
        'на LLM и браузере.',
    ],
  },

  projects: [
    {
      id: 'fe',
      name: 'FormEngine',
      tagline: 'Формы для React из JSON-схемы: дизайнер, валидация, условная логика',
      summary:
        'Монорепозиторий библиотек и приложений на React. Форма описывается в JSON, ' +
        'а состояние, валидацию, события, условия показа и локализацию берёт на себя библиотека. ' +
        'Это форк Optimajet FormEngine с моими доработками и своей сборкой.',
      status: 'Активная разработка',
      statusType: 'success',
      facts: [
        { label: 'Версия пакетов', value: '7.13.0' },
        { label: 'Пакетов в монорепо', value: '10+' },
        { label: 'Тесты', value: 'Vitest + Playwright' },
      ],
      features: [
        'Drag-and-drop дизайнер форм на react-dnd и Monaco Editor.',
        'Наборы компонентов под Ant Design, MUI, Mantine и RSuite: одна схема работает с любым.',
        'Валидация на Zod, вычисляемые поля и условная логика показа.',
        'Локализация форм на Fluent.js, хранение данных в IndexedDB.',
        'Монорепозиторий на npm workspaces: сборка Vite, бандлы IIFE через Rollup.',
        'Документация на Docusaurus, линтер Biome + ESLint, CI на Earthly и GitHub Actions.',
      ],
      stack: [
        'TypeScript 5.8',
        'React 19',
        'MobX',
        'Zod',
        'Emotion',
        'Fluent.js',
        'Vite',
        'Vitest',
        'Playwright',
        'Docusaurus',
      ],
      links: [
        {
          label: 'Открыть дизайнер',
          href: 'https://formbuilder.formengine.io',
          hint: 'Живой демо-стенд',
        },
        { label: 'Демо-приложения', href: 'https://demo.formengine.io' },
        { label: 'Документация', href: 'https://formengine.io/documentation/' },
        { label: 'Исходный код', href: 'https://github.com/sergeythrees/fe' },
        { label: 'Upstream', href: 'https://github.com/optimajet/formengine', hint: 'optimajet/formengine' },
      ],
      appUrl: 'https://formbuilder.formengine.io',
      runNote:
        'Форк собирается из каталога src/.',
      runCommands: ['cd src', 'npm install', 'npm run start'],
      details: [
        'Главная идея: форма — это данные. Схема хранится в JSON, рендерер и состояние дают ' +
          'библиотеки, приложению остаётся подключить готовую форму.',
        'Одна и та же схема отображается и в RSuite, и в Ant Design, разметку переписывать не нужно.',
        'На FormEngine построены внутренние инструменты: конструктор форм, просмотрщик ' +
          'и примеры под разные лицензии.',
      ],
      screenshots: [
        { src: 'projects/fe/01-builder.webp', caption: 'Дизайнер: перетаскивание полей на канвас' },
        { src: 'projects/fe/02-viewer.webp', caption: 'Просмотрщик: форма, собранная по схеме' },
        { src: 'projects/fe/03-form-builder.webp', caption: 'Form Builder из набора примеров' },
        { src: 'projects/fe/04-form-viewer.webp', caption: 'Отрисованная форма во вьюере' },
        { src: 'projects/fe/05-og.webp', caption: 'Обложка документации проекта' },
      ],
    },
    {
      id: 'commitment_tma',
      name: 'Мой Контракт',
      tagline: 'Telegram Mini App: обещание себе с депозитом в TON-эскроу',
      summary:
        'Контракт с самим собой: ставишь цель, вносишь депозит в USDT на эскроу в TON ' +
        'и получаешь кешбэк за каждый выполненный день. Это перенос iOS-приложения ' +
        '(SwiftUI, HealthKit, YooKassa) в Telegram и на TON.',
      status: 'TON testnet',
      statusType: 'processing',
      facts: [
        { label: 'Сеть', value: 'TON testnet' },
        { label: 'Тесты', value: '168 (node:test, Vitest, Playwright)' },
        { label: 'Смарт-контракт', value: 'Tact 1.6.13' },
      ],
      features: [
        'Цель с фотографией и дедлайном — из неё строится контракт.',
        'Депозит в tUSDT уходит в эскроу по Tact-контракту, возврат при отмене.',
        'Кешбэк начисляется за каждый выполненный день, история в профиле.',
        'Отмена контракта с возвратом депозита, включая сценарий отмены через TON Wallet.',
        'Шаги и активность подтягиваются из Health Connect (Android) и HealthKit (iOS).',
        'Бэкенд на Fastify и grammY, клиент на React 18 и TON Connect.',
      ],
      stack: [
        'TypeScript',
        'Fastify 5',
        'grammY',
        'node:sqlite',
        'Vite 6',
        'React 18',
        '@tonconnect/ui-react',
        'Tact',
        'Kotlin / Compose',
        'SwiftUI',
      ],
      links: [
        { label: 'Исходный код', href: 'https://github.com/sergeythrees/commitment_tma' },
      ],
      runNote:
        'Публичного стенда пока нет. Бэкенд поднимается на :3000 и сам отдаёт собранный Mini App, ' +
        'наружу его выводит туннель cloudflared. Платежи идут в TON testnet.',
      runCommands: ['npm install', 'npm run build', 'npm start'],
      details: [
        'Идея простая: когда на кону свои деньги, обещание держать легче. ' +
          'Пока контракт действует, депозит лежит в эскроу.',
        'Смарт-контракт на Tact проверяется в эмуляторе TON. Весь цикл оплаты покрыт ' +
          'e2e-тестами на Playwright со сравнением скриншотов.',
        'Fastify отдаёт статику Mini App, данные хранятся в node:sqlite, бот написан на grammY.',
      ],
      screenshots: [
        { src: 'projects/commitment_tma/01-onboarding.webp', caption: 'Онбординг' },
        {
          src: 'projects/commitment_tma/02-dashboard-active.webp',
          caption: 'Активный контракт: цель, депозит, кешбэк',
        },
        { src: 'projects/commitment_tma/03-dashboard-goal-photo.webp', caption: 'Цель с фотографией' },
        { src: 'projects/commitment_tma/04-create-contract.webp', caption: 'Создание контракта' },
        { src: 'projects/commitment_tma/05-contract-details.webp', caption: 'Детали контракта' },
        {
          src: 'projects/commitment_tma/06-contract-deposit-pending.webp',
          caption: 'Ожидание подтверждения депозита',
        },
      ],
    },
    {
      id: 'ai_mirror',
      name: 'AI Mirror',
      tagline: 'Telegram-бот: психологический портрет по методу 360°',
      summary:
        'Каждый день отвечаешь на вопросы о себе, а близкие анонимно отвечают о тебе. ' +
        'DeepSeek сводит ответы в прямой отчёт: суперсила, слепые зоны, самообман и точки роста.',
      status: 'Работает локально',
      statusType: 'default',
      facts: [
        { label: 'Роль', value: 'Telegram-бот + дашборд' },
        { label: 'Хранилище', value: 'SQLite' },
        { label: 'Без API-ключа', value: 'работает fallback-режим' },
      ],
      features: [
        'Ежедневные вопросы и рефлексия, история ответов в SQLite.',
        'Анонимные ответы близких: человек не видит, кто именно ответил.',
        'Отчёт от модели без смягчений: суперсила, слепые зоны, самообман, точки роста.',
        'Без AI_API_KEY бот не падает, а переключается в демо-режим.',
        'Локальный дашборд на aiohttp, где видны данные и отчёты.',
        'Docker-образ и make-цели для развёртывания.',
      ],
      stack: [
        'Python 3.10+',
        'aiogram 3',
        'SQLite',
        'APScheduler',
        'aiohttp',
        'DeepSeek API',
        'Docker',
        'pytest',
        'ruff',
      ],
      links: [{ label: 'Исходный код', href: 'https://github.com/sergeythrees/ai_mirror' }],
      runNote:
        'Дашборд открывается на 127.0.0.1:8787. Позже бота хочу заменить на Telegram Mini App.',
      runCommands: ['make docker-build', 'docker run --rm -p 8787:8787 ai-mirror'],
      details: [
        'Метод 360° внутри мессенджера: вы каждый день отвечаете о себе, близкие анонимно ' +
          'отвечают о вас, а модель сравнивает ответы и пишет отчёт.',
        'Тон отчёта жёсткий специально. Смягчённый отчёт приятно читать, но толку от него мало.',
        'Стек небольшой: aiogram для Telegram, SQLite для данных, APScheduler для ежедневных ' +
          'вопросов, aiohttp для дашборда.',
      ],
      screenshots: [
        {
          src: 'projects/ai_mirror/01-dashboard.webp',
          caption: 'Дашборд: сводка по пользователю и лента ответов',
        },
        {
          src: 'projects/ai_mirror/02-dashboard-2.webp',
          caption: 'Банк вопросов: категории и форма нового вопроса',
        },
        { src: 'projects/ai_mirror/03-dashboard-3.webp', caption: 'Пользователи и карточка профиля' },
      ],
    },
    {
      id: 'job_applier',
      name: 'Universal Job Applier',
      tagline: 'Автопилот для поиска работы: ИИ-агент откликается в браузере',
      summary:
        'Собирает вакансии и откликается на них через ИИ-агента в обычном Chrome. ' +
        'Человек подтверждает только то, что нельзя отменить: отправку отклика, ответ рекрутеру и оффер.',
      status: 'Работает локально',
      statusType: 'default',
      facts: [
        { label: 'Агент', value: 'browser-use + Chrome' },
        { label: 'Подтверждение', value: 'только необратимые шаги' },
        { label: 'Хранилище', value: 'JSON / YAML, без БД' },
      ],
      features: [
        'Вакансии собирает свой скрапер и актор Apify.',
        'Перед откликом вакансия сравнивается с профилем.',
        'Агент на browser-use и Playwright подключается к Chrome по CDP.',
        'Подтверждать нужно только необратимые действия: отправку, ответ, оффер.',
        'Локальный дашборд на stdlib http.server, внешние сервисы не нужны.',
        'Отдельные модули готовят отклик, ответы на вопросы интервью и на возражения.',
      ],
      stack: ['Python 3.12', 'browser-use', 'Playwright', 'Chrome CDP', 'DeepSeek API', 'Apify', 'uv'],
      links: [
        { label: 'Исходный код', href: 'https://github.com/sergeythrees/universal_job_applier' },
      ],
      runNote:
        'Дашборд открывается на 127.0.0.1:8787, Chrome запускается отдельным скриптом.',
      runCommands: ['bash setup_and_run.sh', 'python3 dashboard.py --port 8787'],
      details: [
        'Отклики отнимают часы, хотя решение всё равно принимаешь сам. Агент берёт на себя ' +
          'рутину и останавливается перед каждым шагом, который нельзя отменить.',
        'Агент работает в настоящем Chrome через CDP, поэтому вход на сайтах не слетает.',
        'Базы данных нет: состояние лежит в JSON и YAML рядом с кодом. Для личного инструмента ' +
          'этого хватает, и обслуживать нечего.',
      ],
      screenshots: [
        {
          src: 'projects/job_applier/01-dashboard.webp',
          caption: 'Дашборд: метрики откликов, запуск и журнал',
        },
        { src: 'projects/job_applier/02-dashboard-2.webp', caption: 'Решения дня и активность за 14 дней' },
        { src: 'projects/job_applier/03-dashboard-3.webp', caption: 'Очередь вакансий со статусами и ссылками' },
      ],
    },
  ],

  tasks: [
    {
      id: 'green-api',
      name: 'Чат-клиент Telegram на GREEN-API',
      tagline: 'Веб-клиент чата на HTTP API',
      badge: 'Тестовое задание',
      summary:
        'Веб-клиент Telegram на HTTP API GREEN-API. Вход по данным инстанса, новый чат ' +
        'по номеру телефона, отправка сообщений и получение ответов через long polling. ' +
        'Интерфейс собран на официальном UI Kit от Telegram.',
      status: 'Выполнено',
      statusType: 'success',
      facts: [
        { label: 'Тестов', value: '131 (Vitest + testing-library)' },
        { label: 'Интеграция', value: 'GREEN-API HTTP API' },
        { label: 'Живой стенд', value: 'заглушка или свой инстанс' },
      ],
      features: [
        'Вход по apiUrl, idInstance и apiTokenInstance с проверкой состояния инстанса.',
        'Создание чата по номеру телефона или @username через CheckAccount → chatId.',
        'Сообщение появляется в чате сразу, а потом сверяется с idMessage от сервера.',
        'Long polling через ReceiveNotification / DeleteNotification, при ошибках делает паузу.',
        'Двухпанельный UI: список чатов, поиск, пузыри, композер, тёмная тема.',
        'Цвета и размеры взяты из темы Telegram Web.',
        'Скриншоты снимает скрипт на Chrome DevTools Protocol без сторонних зависимостей.',
        'Со своими idInstance и apiTokenInstance стенд работает с настоящим GREEN-API.',
      ],
      stack: [
        'TypeScript',
        'React 18',
        'Vite 8',
        '@telegram-apps/telegram-ui',
        'Vitest',
        'jsdom',
      ],
      links: [
        {
          label: 'Исходный код',
          href: 'https://github.com/sergeythrees/green-api',
          hint: 'sergeythrees/green-api',
        },
      ],
      appUrl: 'demos/green-api/',
      runNote:
        'Стенд открывается на обычном экране входа. Кнопка «Быстрый демо-вход» подставляет ' +
        'демо-ключи и сразу открывает чат: можно создать диалог, отправить сообщение и получить ' +
        'автоответ. Чтобы проверить настоящий API, войдите со своими idInstance и apiTokenInstance. ' +
        'Локально запускается из корня репозитория, нужен Node 22.12+.',
      runCommands: ['npm install', 'npm run dev:telegram'],
      details: [
        'Главное в задании — работать с чужим API строго по документации. Весь сетевой код ' +
          'собран в одном типизированном клиенте, контракты методов сверены с документацией.',
        'Цвета и размеры я взял из сборки Telegram Web, поэтому клиент выглядит как привычный мессенджер.',
        'В задание входили только текстовые сообщения. Медиа, группы и реакции я не делал, ' +
          'и это прямо оговорено.',
        'Демо-стенд — отдельная сборка с заглушкой. Она перехватывает HTTP-запросы и отвечает ' +
          'на методы GREEN-API заготовленными данными, включая long polling и автоответ.',
      ],
      screenshots: [
        { src: 'projects/green-api/01-login.webp', caption: 'Вход по учётным данным инстанса' },
        { src: 'projects/green-api/02-conversation.webp', caption: 'Переписка' },
        { src: 'projects/green-api/03-conversation-dark.webp', caption: 'Тёмная тема' }
      ],
    },
    {
      id: 'vanilla-video-feed',
      name: 'Вертикальная видеолента',
      tagline: 'Лента коротких видео на чистом JS',
      badge: 'Тестовое задание',
      summary:
        'Лента коротких видео на чистом JavaScript: scroll-snap, IntersectionObserver ' +
        'и один активный плеер. Сверх задания добавил оптимизации, тесты и линтеры.',
      status: 'Выполнено',
      statusType: 'success',
      facts: [
        { label: 'Зависимости', value: '0 в рантайме' },
        { label: 'Оптимизации', value: 'виртуализация DOM, preload по расстоянию' },
        { label: 'Проверки', value: 'Vitest, Playwright, ESLint, Stylelint' },
      ],
      features: [
        'Лента на scroll-snap, в каждый момент играет только одно видео.',
        'IntersectionObserver решает, какое видео играет, а какое на паузе.',
        'Виртуализация DOM: карточки далеко от экрана удаляются из DOM.',
        'Видео подгружаются по мере приближения к экрану, src ставится с задержкой.',
        'Управление с клавиатуры, при уходе со вкладки видео останавливается.',
        'Свой сервер на Node: список видео из Google Drive, прокси для потока, статика.',
      ],
      stack: ['Vanilla JS', 'ES-модули', 'Node.js', 'HTML5', 'CSS3', 'Vitest', 'Playwright'],
      links: [
        {
          label: 'Исходный код',
          href: 'https://github.com/sergeythrees/vanilla-video-feed',
        },
      ],
      runNote: 'После npm start лента открывается на http://localhost:3000.',
      runCommands: ['npm install', 'npm start'],
      details: [
        'Условия задания: чистый JS, без фреймворков, сборщика и готовых видеоплееров.',
        'Больше всего времени ушло на производительность. Виртуализация DOM, предзагрузка ' +
          'по расстоянию и отложенная установка src убрали подтормаживания при быстрой прокрутке.',
        'Сервер на голом Node: берёт список видео из Google Drive, проксирует поток и сам отдаёт статику.',
      ],
      screenshots: [
        { src: 'projects/vanilla-video-feed/01-feed.webp', caption: 'Лента видео на десктопе' },
        { src: 'projects/vanilla-video-feed/02-feed-mobile.webp', caption: 'Лента на мобильном экране' },
      ],
    },
  ],

  employers: {
    eyebrow: 'Работодателям',
    title: 'Работодателям',
    subtitle: 'Резюме, тестовые задания и контакты.',
    intro:
      'Здесь то, что обычно просят на первом этапе: резюме, выполненные тестовые задания ' +
      'с исходниками и контакты.',
    highlights: [
      {
        title: '8 лет во фронтенде',
        text: 'От Flash-плееров до WYSIWYG-редактора форм и BPMN-конструктора.',
      },
      {
        title: 'Свои проекты',
        text: 'Конструктор форм, Telegram Mini App с оплатой в TON, бот на LLM и браузерный агент.',
      },
      {
        title: 'Открытый код',
        text: 'Проекты лежат на GitHub, у тестовых заданий есть тесты и инструкция по запуску.',
      },
    ],
    cta: {
      resume: 'Смотреть резюме',
      tasks: 'Тестовые задания',
      contact: 'Написать',
    },
  },
};
