export interface SocialLink {
  label: string;
  value: string;
  href: string;
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  intro: string;
  email: string;
  location: string;
  links: SocialLink[];
  skills: { group: string; items: string[] }[];
}

export const profile: Profile = {
  name: 'Sergey Stepanenko',
  handle: '@sergeythrees',
  role: 'Разработчик · AI-автоматизация · Telegram Mini Apps · React',
  tagline: 'Делаю рабочие приложения, а не демо.',
  intro:
    'Собираю продукты, которые живут своей жизнью: форм-движки на React, ' +
    'Telegram Mini Apps с расчётами в TON, ИИ-ботов и браузерных агентов. ' +
    'Каждый проект ниже — с исходным кодом, тестами и понятным способом запуска.',
  email: 'sergeythrees@gmail.com',
  location: 'GitHub · sergeythrees',
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
};
