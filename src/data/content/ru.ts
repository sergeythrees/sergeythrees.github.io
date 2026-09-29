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
    headline: 'Делаю рабочие приложения, а не демо.',
    intro:
      'Собираю продукты, которые живут своей жизнью: форм-движки на React, ' +
      'Telegram Mini Apps с расчётами в TON, ИИ-ботов и браузерных агентов. ' +
      'Каждый проект ниже — с исходным кодом, тестами и понятным способом запуска.',
    email: 'sergeythrees@gmail.com',
    location: 'Москва · удалённо',
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
      'Работающий код вместо демо: каждый проект можно запустить и проверить.',
      'Тесты как часть проекта, а не отдельная задача «на потом».',
      'Понятный запуск в одну команду и честная инструкция, если так не получилось.',
      'Минимум зависимостей и инфраструктуры — только то, что реально нужно задаче.',
    ],
    about: [
      'Собираю продукты, которые живут своей жизнью: интерфейсы, серверную часть и ' +
        'автоматизацию вокруг них. Обычно начинаю с того, что формулирую задачу целиком ' +
        'и собираю минимально работающую версию, а затем наращиваю её.',
      'Отдельное внимание — запуску и поддержке: если в каждом проекте есть команды ' +
        'запуска, тесты и описание того, что уже работает, а что ещё в процессе, ' +
        'он считается незаконченным.',
      'В прошлом — фронтенд в продуктовых командах: WYSIWYG-редакторы форм, ' +
        'BPMN-конструктор, финансовая аналитика, e-learning. Сейчас — свои продукты ' +
        'и автоматизация на стыке AI и браузера.',
    ],
  },

  projects: [
    {
      id: 'fe',
      name: 'FormEngine',
      tagline: 'JSON-формы для React: дизайнер, валидация, условная логика',
      summary:
        'Монорепозиторий React-библиотек и приложений, где форма описывается в JSON, ' +
        'а библиотека берёт на себя состояние, валидацию, события, условную логику и локализацию. ' +
        'Форк Optimajet с собственной доработкой и сборкой.',
      status: 'Активная разработка',
      statusType: 'success',
      facts: [
        { label: 'Версия пакетов', value: '7.13.0' },
        { label: 'Пакетов в монорепо', value: '10+' },
        { label: 'Тесты', value: 'Vitest + Playwright' },
      ],
      features: [
        'Drag-and-drop дизайнер форм на react-dnd и Monaco Editor.',
        'Готовые UI-наборы: Ant Design, MUI, Mantine, RSuite — одна форма, разные оболочки.',
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
        'Форк собирается локально из каталога src/: npm install, затем npm run start.',
      runCommands: ['cd src', 'npm install', 'npm run start'],
      details: [
        'FormEngine решает одну задачу: форма — это данные, а не код. Описание лежит в JSON, ' +
          'рендерер и контроллер состояния собираются из библиотеки, приложение получает готовую форму.',
        'Поддерживаются готовые наборы UI-библиотек, поэтому одна и та же JSON-схема ' +
          'отображается и внутри RSuite, и внутри Ant Design без переписывания разметки.',
        'Проект используется как основа для внутренних инструментов: форма-конструктор, ' +
          'просмотрщик и готовые примеры для разных лицензий.',
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
      tagline: 'Telegram Mini App: обязательства с депозитом в TON-эскроу',
      summary:
        'Контракт с самим собой: цель, депозит в USDT на TON-эскроу и кешбэк за каждый выполненный день. ' +
        'Перенос iOS-приложения (SwiftUI, HealthKit, YooKassa) на Telegram Mini App и блокчейн TON.',
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
        'Полный стек: backend на Fastify и grammY, клиент на React 18 и TON Connect.',
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
        'Публичного стенда пока нет: backend поднимается на :3000 и сам раздаёт собранный Mini App, ' +
        'наружу пробрасывается cloudflared-туннелем. Расчёты идут в TON testnet.',
      runCommands: ['npm install', 'npm run build', 'npm start'],
      details: [
        'Идея простая: деньги делают обязательство настоящим. Пока депозит лежит в эскроу, ' +
          'договорённость подтверждена криптографически, а не только словом.',
        'Смарт-контракт написан на Tact и проверяется в эмуляторе TON, полный цикл платежа ' +
          'покрыт e2e-тестами Playwright со golden-снимками экранов.',
        'Бэкенд на Fastify отдаёт статику Mini App, состояние хранится в node:sqlite, ' +
          'бот-логика — на grammY.',
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
      tagline: 'Telegram-бот: цифровой психологический портрет по методу 360°',
      summary:
        'Ежедневная рефлексия плюс анонимная обратная связь от близких. DeepSeek собирает ' +
        'жёсткий отчёт без обёртки: суперсила, слепые зоны, самообман и точки роста.',
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
        'Жёсткий отчёт от модели: суперсила, слепые зоны, самообман, точки роста.',
        'Работает и без AI_API_KEY — уходит в демонстрационный fallback-режим.',
        'Локальный веб-дашборд на aiohttp для просмотра данных и отчётов.',
        'Docker-образ и make-цели для быстрого развёртывания.',
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
        'Дашборд поднимается локально на 127.0.0.1:8787. В планах — Telegram Mini App ' +
        'вместо бота.',
      runCommands: ['make docker-build', 'docker run --rm -p 8787:8787 ai-mirror'],
      details: [
        'Метод 360° в мессенджере: вы отвечаете себе ежедневно, а близкие — анонимно о вас. ' +
          'ИИ сопоставляет два потока и собирает отчёт.',
        'Тон отчёта намеренно жёсткий — без этого инструмент превращается в приятное чтение ' +
          'и перестаёт работать.',
        'Стек минимальный: aiogram для Telegram, SQLite для данных, APScheduler для ежедневных ' +
          'вопросов, aiohttp для локального дашборда.',
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
      tagline: 'Личный автопилот поиска работы с ИИ-браузерным агентом',
      summary:
        'Парсер вакансий плюс ИИ-агент в настоящем браузере: сам готовит и подаёт отклики, ' +
        'человек подтверждает только необратимые шаги — отправку, ответ рекрутера и оффер.',
      status: 'Работает локально',
      statusType: 'default',
      facts: [
        { label: 'Агент', value: 'browser-use + Chrome' },
        { label: 'Подтверждение', value: 'только необратимые шаги' },
        { label: 'Хранилище', value: 'JSON / YAML, без БД' },
      ],
      features: [
        'Сбор вакансий: собственный скрапер плюс Apify-актор для источников.',
        'Оценка соответствия вакансии профилю перед откликом.',
        'Браузерный агент на browser-use и Playwright с подключением к Chrome по CDP.',
        'Человеческое подтверждение только необратимых действий: отправка, ответ, оффер.',
        'Локальный дашборд на stdlib http.server — весь контроль без внешних сервисов.',
        'Модули подготовки отклика, ответов на интервью и работы с возражениями.',
      ],
      stack: ['Python 3.12', 'browser-use', 'Playwright', 'Chrome CDP', 'DeepSeek API', 'Apify', 'uv'],
      links: [
        { label: 'Исходный код', href: 'https://github.com/sergeythrees/universal_job_applier' },
      ],
      runNote:
        'Дашборд поднимается локально на 127.0.0.1:8787, Chrome запускается отдельным скриптом.',
      runCommands: ['bash setup_and_run.sh', 'python3 dashboard.py --port 8787'],
      details: [
        'Идея: рутина откликов съедает часы, а решение всё равно принимает человек. ' +
          'Агент делает монотонную часть и останавливается там, где действие необратимо.',
        'Браузер не эмулируется в настольном приложении — подключается к живому Chrome через CDP, ' +
          'поэтому сессии авторизации остаются валидными.',
        'Без внешней базы: состояние в JSON и YAML рядом с кодом, что удобно для ' +
          'персонального инструмента и не требует обслуживания.',
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
      tagline: 'Веб-клиент чата поверх HTTP API',
      badge: 'Тестовое задание',
      summary:
        'Веб-клиент чата для мессенджера Telegram на HTTP API GREEN-API: вход по учётным данным ' +
        'инстанса, чат по номеру телефона, отправка сообщений и приём ответа длинным опросом. ' +
        'Используется официальный UI Kit от Telegram.',
      status: 'Выполнено',
      statusType: 'success',
      facts: [
        { label: 'Тестов', value: '132 (Vitest + testing-library)' },
        { label: 'Интеграция', value: 'GREEN-API HTTP API' },
        { label: 'Живой стенд', value: 'на заглушке бэкенда' },
      ],
      features: [
        'Вход по apiUrl, idInstance и apiTokenInstance с проверкой состояния инстанса.',
        'Создание чата по номеру телефона или @username через CheckAccount → chatId.',
        'Отправка текста с оптимистичным сообщением, которое сверяется с серверным idMessage.',
        'Длинный опрос ReceiveNotification / DeleteNotification с паузой при ошибках.',
        'Двухпанельный UI: список чатов, поиск, пузыри, композер, тёмная тема.',
        'Палитра и геометрия взяты из темы настоящего Telegram Web, а не подобраны на глаз.',
        'Скриншот-харнесс на чистом Chrome DevTools Protocol без внешних зависимостей.',
      ],
      stack: [
        'TypeScript',
        'React 18',
        'Vite 8',
        '@telegram-apps/telegram-ui',
        'Vitest',
        'jsdom',
      ],
      links: [],
      appUrl: 'demos/green-api/',
      runNote:
        'Стенд открывается прямо здесь: бэкенд GREEN-API подменён заглушкой, поэтому видны вход, ' +
        'создание чата, отправка сообщения и автоответ собеседника. Локальный запуск — из корня ' +
        'репозитория, Node 22.12+.',
      runCommands: ['npm install', 'npm run dev:telegram'],
      details: [
        'Ключевая часть задания — работа с чужим API строго по документации: весь транспорт ' +
          'вынесен в один типизированный клиент, контракты методов выписаны и сверены с документацией.',
        'Оформление не подбиралось на глаз: значения токенов и палитра разобраны из сборки ' +
          'настоящего Telegram Web, поэтому клиент выглядит как привычный мессенджер.',
        'Объём задания ограничен текстовыми сообщениями — медиа, группы и реакции в него ' +
          'не входили, и это зафиксировано явно.',
        'Стенд-заглушка — отдельная сборка с перехватом HTTP: она отвечает на методы GREEN-API ' +
          'заранее подготовленными данными, включая длинный поллинг и автоответ собеседника.',
      ],
      screenshots: [
        { src: 'projects/green-api/01-telegram-login.webp', caption: 'Вход по учётным данным инстанса' },
        { src: 'projects/green-api/02-telegram-conversation.webp', caption: 'Переписка в Telegram-клиенте' },
      ],
    },
    {
      id: 'vanilla-video-feed',
      name: 'Вертикальная видео-лента',
      tagline: 'Видео-фид на ванильном JS без фреймворков',
      badge: 'Тестовое задание',
      summary:
        'Лента коротких видео на чистом JavaScript: scroll-snap, IntersectionObserver и ' +
        'единственный активный плеер. Поверх базовой версии — оптимизации производительности ' +
        'и полный набор тестов и линтеров.',
      status: 'Выполнено',
      statusType: 'success',
      facts: [
        { label: 'Зависимости', value: '0 в рантайме' },
        { label: 'Оптимизации', value: 'виртуализация DOM, preload по расстоянию' },
        { label: 'Проверки', value: 'Vitest, Playwright, ESLint, Stylelint' },
      ],
      features: [
        'Scroll-snap лента с переключением единственного активного плеера.',
        'IntersectionObserver решает, что играет, а что ставится на паузу.',
        'DOM-виртуализация: далёкие карточки выгружаются, лишняя работа не рендерится.',
        'Preload видео по расстоянию до вьюпорта и отложенная установка src.',
        'Управление с клавиатуры и остановка плеера при уходе со вкладки.',
        'Свой Node-сервер: список видео из Google Drive, прокси потока, статика.',
      ],
      stack: ['Vanilla JS', 'ES-модули', 'Node.js', 'HTML5', 'CSS3', 'Vitest', 'Playwright'],
      links: [
        {
          label: 'Исходный код',
          href: 'https://github.com/sergeythrees/vanilla-video-feed',
        },
      ],
      runNote: 'Запуск: npm start, лента поднимается на http://localhost:3000.',
      runCommands: ['npm install', 'npm start'],
      details: [
        'Задание проверяло, умею ли я делать сложное на ванильном JS: без фреймворков, ' +
          'без сборщика и без готовых библиотек для видеоплеера.',
        'Основная работа — не сам фид, а производительность: виртуализация DOM, ' +
          'предзагрузка по расстоянию и отложенная установка src убирают основные просадки ' +
          'при быстром скролле.',
        'Сервер написан на голом Node: список видео берётся из Google Drive, поток ' +
          'отдаётся через прокси, статика — своими руками.',
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
    subtitle: 'Резюме, опыт и открытые исходники — всё, что нужно для решения.',
    intro:
      'Собрал всё, что обычно спрашивают на первом этапе: краткое резюме, выполненные ' +
      'тестовые задания с исходниками и прямой контакт. Ничего лишнего — факты и ссылки на код.',
    highlights: [
      {
        title: 'Фронтенд в продакшене 8 лет',
        text: 'От Flash-плееров до WYSIWYG-редактора форм и BPMN-конструктора.',
      },
      {
        title: 'Собственные продукты',
        text: 'Форм-движок, Telegram Mini App с расчётами в TON, ИИ-боты и браузерные агенты.',
      },
      {
        title: 'Открытые исходники',
        text: 'Код проектов лежит на GitHub, у заданий есть тесты и инструкция запуска.',
      },
    ],
    cta: {
      resume: 'Смотреть резюме',
      tasks: 'Тестовые задания',
      contact: 'Написать',
    },
  },
};
