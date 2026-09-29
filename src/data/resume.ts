// Данные резюме для страницы «Резюме»: русская и английская версии.
// Факты (город, даты, телефон, зарплата, готовность к переезду) — из resume_ru.yaml;
// из resume_br.yaml берём только английские формулировки описаний и навыков.
// Из br-версии намеренно НЕ берём: страну/город/телефон (там тестовая Бразилия),
// зарплатные ожидания (80–100k вместо 50–60k) и open_to_relocation (true вместо false).

import type { Resume } from './types';

// Списки технологий в обеих версиях одинаковые, переводим только названия групп.
const skillItems = {
  languages: ['TypeScript', 'JavaScript (ES6+)'],
  frameworks: ['React', 'Vue'],
  libraries: ['Redux', 'MobX', 'SCSS', 'HTML5 Canvas', 'SVG'],
  tools: ['Vite', 'Webpack', 'Lerna', 'Docker', 'CI/CD', 'Figma', 'Framer', 'ProtoPie'],
  testing: ['Jest', 'Vitest', 'Playwright'],
  ai: ['Cursor', 'MCP', 'Agent orchestration', 'LLM API integration'],
};

// Языки одинаковы в обеих версиях.
const languages: Resume['languages'] = [
  { language: 'Russian', level: 'Native' },
  { language: 'English', level: 'B2' },
];

export const resumeRu: Resume = {
  name: 'Сергей Степаненко',
  title: 'Senior Frontend Developer · UX Engineer · Разработчик · AI-автоматизация · Telegram Mini Apps · React',
  summary:
    'Фронтенд-разработчик с опытом с 2017 года. Специализируюсь на визуальных редакторах: ' +
    'спроектировал WYSIWYG-редактор форм FormEngine и провёл редизайн конструктора ' +
    'BPMN-диаграмм WorkflowEngine. Веду фронтенд-направление и развиваю открытые проекты, ' +
    'включая вклад в rsuite/rsuite.',

  contacts: [
    { label: 'Телефон', value: '+7 987 709-68-32', href: 'tel:+79877096832' },
    { label: 'Email', value: 'sergeythrees@gmail.com', href: 'mailto:sergeythrees@gmail.com' },
    { label: 'GitHub', value: 'github.com/sergeythrees', href: 'https://github.com/sergeythrees' },
    { label: 'Город', value: 'Москва' },
  ],

  experience: [
    {
      position: 'Senior Frontend Dev & UX Engineer',
      company: 'OptimaJet',
      period: '08/2020 — 03/2026',
      location: 'Москва, удалённо',
      industry: 'IT / Программное обеспечение',
      description:
        'FormEngine (Form/Survey/Website Builder): Спроектировал и разработал с нуля интерфейс ' +
        'встраиваемого WYSIWYG-редактора форм. Интегрировал 50+ UI-компонентов (MUI, Shadcn, Ant). ' +
        'WorkflowEngine (BPM Platform): Провел редизайн конструктора BPMN-диаграмм и админ-панели. ' +
        'Занимался фронтенд-поддержкой международных клиентов.',
      achievements: [
        'Сократил время сборки интерфейсов на 40%, оптимизировав рендеринг кода',
        'Внедрил плагинную архитектуру для расширения функционала визуального редактора',
      ],
    },
    {
      position: 'Senior Frontend Developer',
      company: 'InferStat',
      period: '01/2019 — 08/2020',
      location: 'Москва',
      industry: 'IT / Программное обеспечение',
      description:
        'Infertrade (Financial Analytics Tool): Провел глубокий рефакторинг интерфейса платформы ' +
        'финансовой аналитики. Оптимизировал клиентскую валидацию для моментального отклика ' +
        'при вводе сложных формул.',
      achievements: [
        'Внедрил ленивую загрузку и изоляцию схем валидации плагинов, что ускорило инициализацию дашбордов на 25%',
      ],
    },
    {
      position: 'Frontend Dev & UX Designer Intern',
      company: 'iSpring Solutions',
      period: '07/2017 — 09/2018',
      location: 'Москва',
      industry: 'IT / Программное обеспечение',
      description:
        'iSpring Suite & iSpring Learn: Мигрировал плееры с Flash на HTML5/Canvas и SVG. ' +
        'Создал адаптивную верстку курсов. Проводил юзабилити-тесты, интервью, создавал CJM ' +
        'для облачной LMS.',
      achievements: [
        'Обеспечил рост просмотров курсов с мобильных устройств на 25% благодаря адаптивной верстке',
      ],
    },
  ],

  education: [
    {
      degree: 'Магистратура',
      institution: 'МАДИ',
      field: 'Программная инженерия',
      period: '2019 — 2021',
      grade: '5.0',
    },
    {
      degree: 'Бакалавриат',
      institution: 'ПГТУ',
      field: 'Программная инженерия',
      period: '2015 — 2019',
      grade: '5.0',
    },
  ],

  skills: [
    { group: 'Языки', items: skillItems.languages },
    { group: 'Фреймворки', items: skillItems.frameworks },
    { group: 'Библиотеки', items: skillItems.libraries },
    { group: 'Инструменты', items: skillItems.tools },
    { group: 'Тестирование', items: skillItems.testing },
    { group: 'AI-инструменты', items: skillItems.ai },
  ],

  languages,

  projects: [
    {
      name: 'FormEngine & WorkflowEngine Extensions',
      description:
        'Разработка кастомных расширений и SDK для визуальных интерфейсов, интегрируемых ' +
        'в инфраструктуру крупных корпоративных клиентов.',
    },
    {
      name: 'Open Source Contributions',
      description:
        'Активное участие в развитии и исправлении багов в известной экосистеме ' +
        'UI-компонентов rsuite/rsuite.',
    },
  ],

  preferences: [
    { label: 'Формат работы', value: 'Удалённо' },
    { label: 'Готовность к тестовым заданиям', value: 'Да' },
    { label: 'Переезд', value: 'Готов' },
    { label: 'Выход на работу', value: 'Немедленно' },
    { label: 'Ожидания по зарплате', value: '$50 000 – 60 000' },
    { label: 'Спонсорство визы требуется', value: 'США, ЕС, Канада, Великобритания' },
  ],

  pdf: 'resume/cv-ru.pdf',
};

export const resumeEn: Resume = {
  name: 'Sergei Stepanenko',
  title: 'Senior Frontend Developer & UX Engineer',
  summary:
    'Frontend developer with experience since 2017. Focused on visual editors: architected the ' +
    'FormEngine WYSIWYG form editor and redesigned the WorkflowEngine BPMN diagram builder. ' +
    'Leading frontend work and contributing to open source projects such as rsuite/rsuite.',

  contacts: [
    { label: 'Phone', value: '+7 987 709-68-32', href: 'tel:+79877096832' },
    { label: 'Email', value: 'sergeythrees@gmail.com', href: 'mailto:sergeythrees@gmail.com' },
    { label: 'GitHub', value: 'github.com/sergeythrees', href: 'https://github.com/sergeythrees' },
    { label: 'Location', value: 'Moscow' },
  ],

  experience: [
    {
      position: 'Senior Frontend Dev & UX Engineer',
      company: 'OptimaJet',
      period: '08/2020 — 03/2026',
      location: 'Moscow, Russia (Remote)',
      industry: 'Software & BPM Platforms',
      description:
        'FormEngine (Form/Survey/Website Builder): Architected and developed an embeddable ' +
        'WYSIWYG form editor UI from scratch. Integrated 50+ UI components from MUI, Shadcn, ' +
        'and Ant. WorkflowEngine (BPM Platform): Redesign of the BPMN diagram builder and admin panel.',
      achievements: [
        'Optimized code rendering, cutting UI build times by 40% and increasing team productivity',
        'Introduced a plugin architecture to extend the visual editor functionality',
      ],
    },
    {
      position: 'Senior Frontend Developer',
      company: 'InferStat',
      period: '01/2019 — 08/2020',
      location: 'Moscow, Russia',
      industry: 'Financial Analytics',
      description:
        'Infertrade (Financial Analytics Tool): Executed a deep refactoring of the analytics ' +
        'platform UI, significantly improving frontend stability. Optimized client-side ' +
        'validation for instant feedback.',
      achievements: [
        'Identified lazy loading advantages, accelerating analytical dashboard initialization by 25%',
      ],
    },
    {
      position: 'Frontend Dev & UX Designer Intern',
      company: 'iSpring Solutions',
      period: '07/2017 — 09/2018',
      location: 'Moscow, Russia',
      industry: 'E-learning Software',
      description:
        'iSpring Suite & iSpring Learn: Migrated e-learning players from legacy Flash to ' +
        'HTML5/Canvas and SVG. Developed responsive course layouts.',
      achievements: [
        'Developed responsive course layouts, which drove a 25% increase in mobile views',
      ],
    },
  ],

  education: [
    {
      degree: "Master's Degree",
      institution: 'MADI',
      field: 'Software Engineering',
      period: '2019 — 2021',
      grade: '5.0',
    },
    {
      degree: "Bachelor's Degree",
      institution: 'Volga Tech (PSTU)',
      field: 'Software Engineering',
      period: '2015 — 2019',
      grade: '5.0',
    },
  ],

  skills: [
    { group: 'Languages', items: skillItems.languages },
    { group: 'Frameworks', items: skillItems.frameworks },
    { group: 'Libraries', items: skillItems.libraries },
    { group: 'Tools', items: skillItems.tools },
    { group: 'Testing', items: skillItems.testing },
    { group: 'AI tools', items: skillItems.ai },
  ],

  languages,

  projects: [
    {
      name: 'FormEngine & WorkflowEngine Extensions',
      description: 'Development of custom extensions and SDKs for visual interfaces.',
    },
    {
      name: 'Open Source Contributions',
      description: 'Active participation in the development and bug fixing in rsuite/rsuite.',
    },
  ],

  preferences: [
    { label: 'Work format', value: 'Remote only' },
    { label: 'Willing to complete assessments', value: 'Yes' },
    { label: 'Additional checks', value: 'Yes (background check)' },
    { label: 'Relocation', value: 'Not open to relocation' },
    { label: 'Availability', value: 'Immediate' },
    { label: 'Salary expectations', value: '$50,000 – 60,000' },
    { label: 'Visa sponsorship required', value: 'US, EU, Canada, UK' },
  ],

  pdf: 'resume/cv-en.pdf',
};
