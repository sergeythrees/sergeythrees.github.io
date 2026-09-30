/**
 * Словарь интерфейса. Ключи в english.ts обязаны совпадать один в один —
 * тип словаря выводится из ru.
 */
export const ru = {
  nav: {
    cta: 'Обзор проектов',
    sections: 'Разделы',
    home: 'Главная',
    projects: 'Проекты',
    employers: 'Работодателям',
    about: 'Обо мне',
    contacts: 'Контакты',
    resume: 'Резюме',
    tasks: 'Тестовые задания',
  },
  common: {
    open: 'Открыть',
    details: 'Подробнее',
    demo: 'демо',
    github: 'GitHub',
    email: 'Почта',
    write: 'Написать',
    copyEmail: 'Скопировать почту',
    stack: 'Стек',
    features: 'Что умеет',
    detailsTitle: 'О проекте',
    screenshots: 'Скриншоты',
    runTitle: 'Запуск локально',
    copyOk: 'Почта скопирована',
    copyFail: 'Не удалось скопировать — скопируйте адрес вручную',
  },
  project: {
    openApp: 'Открыть приложение',
    localOnly: 'Приложение запускается локально',
    localOnlyNote:
      'Публичного стенда пока нет. Как запустить локально, написано ниже.',
    prev: '← Предыдущий',
    next: 'Следующий →',
    notFound: 'Проект не найден',
    notFoundText: 'Такого проекта нет. Возможно, ссылка устарела.',
    galleryEmpty: 'Скриншоты появятся позже.',
  },
  home: {
    eyebrow: 'Портфолио · GitHub',
    ctaProjects: 'Смотреть проекты',
    ctaAbout: 'Обо мне',
    projectsTitle: 'Проекты',
    projectsAll: 'Все проекты',
    stackTitle: 'Стек',
    ctaTitle: 'Есть задача?',
    ctaText: 'Напишите, если есть работа, вакансия или вопрос по проектам.',
  },
  projects: {
    eyebrow: 'Раздел',
    title: 'Проекты',
    subtitle: 'Мои проекты с исходниками и инструкцией по запуску.',
  },
  about: {
    eyebrow: 'Обо мне',
    title: 'Обо мне',
    skillsTitle: 'Стек',
    principlesTitle: 'Принципы',
  },
  contacts: {
    eyebrow: 'Связь',
    title: 'Контакты',
    subtitle: 'Напишите, если есть работа, вакансия или вопрос по проектам.',
    quickLabel: 'Быстро',
    quickText: 'Скопировать адрес без почтового клиента',
    more: 'Больше кода и проектов — на',
    projectsHint: 'Как запустить проект локально, написано на его странице.',
    seeProjects: 'Смотреть проекты',
  },
  employers: {
    eyebrow: 'Работодателям',
    title: 'Работодателям',
    subtitle: 'Резюме, тестовые задания и контакты.',
    intro:
      'Здесь то, что обычно просят на первом этапе: резюме, выполненные тестовые задания с исходниками и контакты.',
    highlightsTitle: 'Коротко обо мне',
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
    resumeTitle: 'Резюме',
    resumeText: 'Опыт, образование, навыки и условия работы. Есть PDF.',
    tasksTitle: 'Тестовые задания',
    tasksText: 'Чат-клиент на GREEN-API и видеолента на чистом JS.',
  },
  resume: {
    download: 'Скачать PDF',
    experience: 'Опыт работы',
    education: 'Образование',
    skills: 'Навыки',
    languages: 'Языки',
    projects: 'Проекты',
    preferences: 'Условия работы',
    contacts: 'Контакты',
    achievements: 'Результаты',
    noPdf: 'PDF-версия скоро появится',
  },
  tasks: {
    eyebrow: 'Раздел',
    title: 'Тестовые задания',
    subtitle: 'Задания от работодателей. Исходники открыты, чат-клиент можно попробовать прямо на сайте.',
    badge: 'Тестовое задание',
    openStand: 'Открыть стенд',
  },
  notFound: {
    title: 'Страница не найдена',
    text: 'Такой страницы нет. Можно вернуться на главную или посмотреть проекты.',
    cta: 'На главную',
  },
  ui: {
    language: 'Язык',
    themeDark: 'Тёмная тема',
    themeLight: 'Светлая тема',
    menu: 'Меню',
    expandSidebar: 'Развернуть сайдбар',
    collapseSidebar: 'Свернуть сайдбар',
    notFoundRoot: 'Не найден контейнер #root в index.html',
    languageSwitchAria: 'Сменить язык',
    themeSwitchAria: 'Сменить тему',
  },
};


export type Dictionary = typeof ru;
