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


export const resumeRu: Resume = {
  name: 'Сергей Степаненко',
  title: 'Фронтенд-разработчик и UX-инженер',
  summary:
    'Фронтенд-разработчик, работаю с 2017 года. В основном делаю визуальные редакторы: ' +
    'спроектировал WYSIWYG-редактор форм FormEngine и переделал конструктор BPMN-диаграмм ' +
    'в WorkflowEngine. Веду фронтенд-направление и участвую в open source, в том числе в rsuite/rsuite.',

  contacts: [
    { label: 'Телефон', value: '+7 987 709-68-32', href: 'tel:+79877096832' },
    { label: 'Email', value: 'sergeythrees@gmail.com', href: 'mailto:sergeythrees@gmail.com' },
    { label: 'GitHub', value: 'github.com/sergeythrees', href: 'https://github.com/sergeythrees' },
    { label: 'Город', value: 'Москва' },
  ],

  experience: [
    {
      position: 'Frontend Dev & UX Engineer',
      company: 'OptimaJet',
      period: '08/2020 — 03/2026',
      location: 'Москва, удалённо',
      industry: 'IT / Программное обеспечение',
      description:
        'FormEngine (конструктор форм, опросов и сайтов): с нуля спроектировал и написал интерфейс ' +
        'встраиваемого WYSIWYG-редактора форм, подключил 50+ UI-компонентов из MUI, Shadcn и Ant. ' +
        'WorkflowEngine (BPM-платформа): переделал дизайн конструктора BPMN-диаграмм и админки. ' +
        'Поддерживал фронтенд у международных клиентов.',
      achievements: [
        'Оптимизировал рендеринг и сократил время сборки интерфейсов на 40%',
        'Сделал плагинную архитектуру, через которую расширяется визуальный редактор',
      ],
    },
    {
      position: 'Frontend Developer',
      company: 'InferStat',
      period: '01/2019 — 08/2020',
      location: 'Москва',
      industry: 'IT / Программное обеспечение',
      description:
        'Infertrade (платформа финансовой аналитики): глубоко переработал интерфейс и ускорил ' +
        'клиентскую валидацию, чтобы сложные формулы проверялись сразу при вводе.',
      achievements: [
        'Сделал ленивую загрузку и изоляцию схем валидации плагинов, дашборды стали запускаться на 25% быстрее',
      ],
    },
    {
      position: 'Frontend Dev & UX Designer Intern',
      company: 'iSpring Solutions',
      period: '07/2017 — 09/2018',
      location: 'Москва',
      industry: 'IT / Программное обеспечение',
      description:
        'iSpring Suite и iSpring Learn: перевёл плееры с Flash на HTML5 Canvas и SVG, сверстал ' +
        'адаптивные курсы. Проводил юзабилити-тесты и интервью, составлял CJM для облачной LMS.',
      achievements: [
        'Адаптивная вёрстка увеличила просмотры курсов с мобильных на 25%',
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

  languages: [
    { language: 'Русский', level: 'Родной' },
    { language: 'Английский', level: 'B2' },
  ],

  projects: [
    {
      name: 'FormEngine & WorkflowEngine Extensions',
      description:
        'Расширения и SDK для визуальных редакторов, которые встраиваются в системы ' +
        'крупных корпоративных клиентов.',
    },
    {
      name: 'Open Source Contributions',
      description:
        'Исправления багов и доработки в библиотеке UI-компонентов rsuite/rsuite.',
    },
  ],

  preferences: [
    { label: 'Формат работы', value: 'Офис, гибрид, удалённо' },
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
  title: 'Frontend Developer & UX Engineer',
  summary:
    'Frontend developer since 2017, mostly working on visual editors. I architected the ' +
    'FormEngine WYSIWYG form editor and redesigned the WorkflowEngine BPMN diagram builder. ' +
    'I lead frontend work and contribute to open source, including rsuite/rsuite.',

  contacts: [
    { label: 'Phone', value: '+7 987 709-68-32', href: 'tel:+79877096832' },
    { label: 'Email', value: 'sergeythrees@gmail.com', href: 'mailto:sergeythrees@gmail.com' },
    { label: 'GitHub', value: 'github.com/sergeythrees', href: 'https://github.com/sergeythrees' },
    { label: 'Location', value: 'Moscow' },
  ],

  experience: [
    {
      position: 'Frontend Dev & UX Engineer',
      company: 'OptimaJet',
      period: '08/2020 — 03/2026',
      location: 'Moscow, Russia (Remote)',
      industry: 'Software & BPM Platforms',
      description:
        'FormEngine (form, survey and website builder): designed and built the UI of an embeddable ' +
        'WYSIWYG form editor from scratch and integrated 50+ UI components from MUI, Shadcn and Ant. ' +
        'WorkflowEngine (BPM platform): redesigned the BPMN diagram builder and the admin panel.',
      achievements: [
        'Optimized rendering and cut UI build times by 40%',
        'Introduced a plugin architecture for extending the visual editor',
      ],
    },
    {
      position: 'Frontend Developer',
      company: 'InferStat',
      period: '01/2019 — 08/2020',
      location: 'Moscow, Russia',
      industry: 'Financial Analytics',
      description:
        'Infertrade (financial analytics tool): reworked the platform UI in depth and sped up ' +
        'client-side validation so complex formulas are checked as you type.',
      achievements: [
        'Added lazy loading and isolated plugin validation schemas, so dashboards start 25% faster',
      ],
    },
    {
      position: 'Frontend Dev & UX Designer Intern',
      company: 'iSpring Solutions',
      period: '07/2017 — 09/2018',
      location: 'Moscow, Russia',
      industry: 'E-learning Software',
      description:
        'iSpring Suite & iSpring Learn: moved e-learning players from Flash to HTML5 Canvas ' +
        'and SVG and built responsive course layouts.',
      achievements: [
        'Responsive layouts brought 25% more course views from mobile',
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

  languages: [
    { language: 'Russian', level: 'Native' },
    { language: 'English', level: 'B2' },
  ],

  projects: [
    {
      name: 'FormEngine & WorkflowEngine Extensions',
      description: 'Custom extensions and SDKs for visual editors.',
    },
    {
      name: 'Open Source Contributions',
      description: 'Bug fixes and improvements in the rsuite/rsuite UI component library.',
    },
  ],

  preferences: [
    { label: 'Work format', value: 'Office, remote, hybrid' },
    { label: 'Willing to complete assessments', value: 'Yes' },
    { label: 'Additional checks', value: 'Yes (background check)' },
    { label: 'Relocation', value: 'Open to relocation' },
    { label: 'Availability', value: 'Immediate' },
    { label: 'Salary expectations', value: '$50,000 – 60,000' },
    { label: 'Visa sponsorship required', value: 'US, EU, Canada, UK' },
  ],

  pdf: 'resume/cv-en.pdf',
};
