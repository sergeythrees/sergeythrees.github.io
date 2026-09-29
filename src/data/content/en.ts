import type { Content } from '../types';

/** English site content. Mirrors content/ru.ts field by field. */
export const contentEn: Content = {
  site: {
    name: 'Sergey Stepanenko',
    handle: '@sergeythrees',
    role: 'Developer · AI automation · Telegram Mini Apps · React',
    headline: 'I ship working applications, not demos.',
    intro:
      'I build products that live their own life: form engines on React, ' +
      'Telegram Mini Apps with TON settlements, AI bots and browser agents. ' +
      'Every project below comes with source code, tests and a clear way to run it.',
    email: 'sergeythrees@gmail.com',
    location: 'Moscow · remote',
    links: [
      {
        label: 'GitHub',
        value: 'github.com/sergeythrees',
        href: 'https://github.com/sergeythrees',
      },
      {
        label: 'Email',
        value: 'sergeythrees@gmail.com',
        href: 'mailto:sergeythrees@gmail.com',
      },
    ],
    skills: [
      {
        group: 'Frontend',
        items: ['React 19', 'TypeScript', 'Vite', 'MobX', 'Emotion', 'Ant Design'],
      },
      {
        group: 'Backend and data',
        items: ['Node.js', 'Fastify', 'Python 3.12', 'SQLite', 'PostgreSQL'],
      },
      {
        group: 'AI and automation',
        items: ['DeepSeek API', 'browser-use', 'Playwright', 'Telegram API', 'grammY'],
      },
      {
        group: 'Infrastructure',
        items: ['Docker', 'GitHub Actions', 'TON / Tact', 'Health Connect'],
      },
    ],
    principles: [
      'Working code instead of a demo: every project can be run and checked.',
      'Tests are part of the project, not a separate task for later.',
      'A one-command startup, and an honest note when that was not possible.',
      'Minimal dependencies and infrastructure — only what the task actually needs.',
    ],
    about: [
      'I build products that live their own life: interfaces, the server side and the ' +
        'automation around them. I usually start by framing the whole task and building ' +
        'a minimally working version, then growing it.',
      'Startup and maintenance get separate attention: a project without run commands, ' +
        'tests and a note on what already works and what is still in progress counts ' +
        'as unfinished.',
      'Before — frontend in product teams: WYSIWYG form editors, a BPMN designer, ' +
        'financial analytics, e-learning. Now — my own products and automation at the ' +
        'intersection of AI and the browser.',
    ],
  },

  projects: [
    {
      id: 'fe',
      name: 'FormEngine',
      tagline: 'JSON forms for React: designer, validation, conditional logic',
      summary:
        'A monorepo of React libraries and applications where a form is described in JSON, ' +
        'and the library takes over state, validation, events, conditional logic and localization. ' +
        'A fork of Optimajet with its own improvements and build.',
      status: 'Active development',
      statusType: 'success',
      facts: [
        { label: 'Package version', value: '7.13.0' },
        { label: 'Packages in the monorepo', value: '10+' },
        { label: 'Tests', value: 'Vitest + Playwright' },
      ],
      features: [
        'Drag-and-drop form designer on react-dnd and Monaco Editor.',
        'Ready-made UI kits: Ant Design, MUI, Mantine, RSuite — one form, different shells.',
        'Validation with Zod, computed fields and conditional display logic.',
        'Form localization with Fluent.js, data stored in IndexedDB.',
        'Monorepo on npm workspaces: Vite build, IIFE bundles via Rollup.',
        'Documentation on Docusaurus, Biome + ESLint linters, CI on Earthly and GitHub Actions.',
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
          label: 'Open the designer',
          href: 'https://formbuilder.formengine.io',
          hint: 'Live demo stand',
        },
        { label: 'Demo apps', href: 'https://demo.formengine.io' },
        { label: 'Documentation', href: 'https://formengine.io/documentation/' },
        { label: 'Source code', href: 'https://github.com/sergeythrees/fe' },
        { label: 'Upstream', href: 'https://github.com/optimajet/formengine', hint: 'optimajet/formengine' },
      ],
      appUrl: 'https://formbuilder.formengine.io',
      runNote:
        'The fork builds locally from the src/ directory: npm install, then npm run start.',
      runCommands: ['cd src', 'npm install', 'npm run start'],
      details: [
        'FormEngine solves one problem: a form is data, not code. The description lives in JSON, ' +
          'the renderer and the state controller come from the library, and the application gets a ready form.',
        'Ready-made UI library kits are supported, so the same JSON schema ' +
          'renders inside RSuite and inside Ant Design without rewriting the markup.',
        'The project is used as a base for internal tools: a form builder, ' +
          'a viewer and ready-made examples for different licenses.',
      ],
      screenshots: [
        { src: 'projects/fe/01-builder.webp', caption: 'Designer: dragging fields onto the canvas' },
        { src: 'projects/fe/02-viewer.webp', caption: 'Viewer: a form assembled from a schema' },
        { src: 'projects/fe/03-form-builder.webp', caption: 'Form Builder from the examples set' },
        { src: 'projects/fe/04-form-viewer.webp', caption: 'A rendered form in the viewer' },
        { src: 'projects/fe/05-og.webp', caption: 'Cover art for the project documentation' },
      ],
    },
    {
      id: 'commitment_tma',
      name: 'My Contract',
      tagline: 'Telegram Mini App: commitments with a deposit in TON escrow',
      summary:
        'A contract with yourself: a goal, a USDT deposit in TON escrow and cashback for every completed day. ' +
        'Porting an iOS app (SwiftUI, HealthKit, YooKassa) to a Telegram Mini App and the TON blockchain.',
      status: 'TON testnet',
      statusType: 'processing',
      facts: [
        { label: 'Network', value: 'TON testnet' },
        { label: 'Tests', value: '168 (node:test, Vitest, Playwright)' },
        { label: 'Smart contract', value: 'Tact 1.6.13' },
      ],
      features: [
        'A goal with a photo and a deadline — the contract is built from it.',
        'A tUSDT deposit goes into escrow under a Tact contract, refunded on cancellation.',
        'Cashback accrues for every completed day, with history in the profile.',
        'Contract cancellation with a deposit refund, including cancellation via TON Wallet.',
        'Steps and activity are pulled from Health Connect (Android) and HealthKit (iOS).',
        'Full stack: backend on Fastify and grammY, client on React 18 and TON Connect.',
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
        { label: 'Source code', href: 'https://github.com/sergeythrees/commitment_tma' },
      ],
      runNote:
        'There is no public stand yet: the backend comes up on :3000 and serves the built Mini App itself, ' +
        'exposed to the outside through a cloudflared tunnel. Settlements run in TON testnet.',
      runCommands: ['npm install', 'npm run build', 'npm start'],
      details: [
        'The idea is simple: money makes a commitment real. While the deposit sits in escrow, ' +
          'the agreement is confirmed cryptographically, not just by word.',
        'The smart contract is written in Tact and verified in the TON emulator; the full payment cycle ' +
          'is covered by Playwright e2e tests with golden screen snapshots.',
        'The Fastify backend serves the Mini App static files, state is stored in node:sqlite, ' +
          'and the bot logic runs on grammY.',
      ],
      screenshots: [
        { src: 'projects/commitment_tma/01-onboarding.webp', caption: 'Onboarding' },
        {
          src: 'projects/commitment_tma/02-dashboard-active.webp',
          caption: 'Active contract: goal, deposit, cashback',
        },
        { src: 'projects/commitment_tma/03-dashboard-goal-photo.webp', caption: 'Goal with a photo' },
        { src: 'projects/commitment_tma/04-create-contract.webp', caption: 'Creating a contract' },
        { src: 'projects/commitment_tma/05-contract-details.webp', caption: 'Contract details' },
        {
          src: 'projects/commitment_tma/06-contract-deposit-pending.webp',
          caption: 'Waiting for deposit confirmation',
        },
      ],
    },
    {
      id: 'ai_mirror',
      name: 'AI Mirror',
      tagline: 'Telegram bot: a digital psychological portrait using the 360° method',
      summary:
        'Daily reflection plus anonymous feedback from people close to you. DeepSeek assembles ' +
        'a blunt report with no sugar-coating: superpower, blind spots, self-deception and growth areas.',
      status: 'Runs locally',
      statusType: 'default',
      facts: [
        { label: 'Role', value: 'Telegram bot + dashboard' },
        { label: 'Storage', value: 'SQLite' },
        { label: 'Without an API key', value: 'fallback mode works' },
      ],
      features: [
        'Daily questions and reflection, with answer history in SQLite.',
        'Anonymous answers from people close to you: the user never sees who replied.',
        'A blunt report from the model: superpower, blind spots, self-deception, growth areas.',
        'Works without AI_API_KEY too — it falls back to a demo mode.',
        'A local aiohttp web dashboard for browsing data and reports.',
        'A Docker image and make targets for quick deployment.',
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
      links: [{ label: 'Source code', href: 'https://github.com/sergeythrees/ai_mirror' }],
      runNote:
        'The dashboard comes up locally on 127.0.0.1:8787. Planned: a Telegram Mini App ' +
        'instead of the bot.',
      runCommands: ['make docker-build', 'docker run --rm -p 8787:8787 ai-mirror'],
      details: [
        'The 360° method inside a messenger: you answer about yourself daily, while people close to you ' +
          'answer anonymously about you. The AI cross-references both streams and assembles a report.',
        'The tone of the report is deliberately blunt — without that, the tool turns into pleasant reading ' +
          'and stops working.',
        'The stack is minimal: aiogram for Telegram, SQLite for data, APScheduler for the daily ' +
          'questions, aiohttp for the local dashboard.',
      ],
      screenshots: [
        {
          src: 'projects/ai_mirror/01-dashboard.webp',
          caption: 'Dashboard: user summary and answer feed',
        },
        {
          src: 'projects/ai_mirror/02-dashboard-2.webp',
          caption: 'Question bank: categories and the new-question form',
        },
        { src: 'projects/ai_mirror/03-dashboard-3.webp', caption: 'Users and the profile card' },
      ],
    },
    {
      id: 'job_applier',
      name: 'Universal Job Applier',
      tagline: 'A personal job-search autopilot with an AI browser agent',
      summary:
        'A vacancy scraper plus an AI agent in a real browser: it prepares and submits applications ' +
        'on its own, while the human confirms only irreversible steps — sending, a recruiter reply, an offer.',
      status: 'Runs locally',
      statusType: 'default',
      facts: [
        { label: 'Agent', value: 'browser-use + Chrome' },
        { label: 'Confirmation', value: 'irreversible steps only' },
        { label: 'Storage', value: 'JSON / YAML, no DB' },
      ],
      features: [
        'Vacancy collection: a custom scraper plus an Apify actor for the sources.',
        'A match score between a vacancy and the profile before applying.',
        'A browser agent on browser-use and Playwright, connecting to Chrome over CDP.',
        'Human confirmation only for irreversible actions: sending, reply, offer.',
        'A local dashboard on stdlib http.server — full control with no external services.',
        'Modules for preparing applications, answering interview questions and handling objections.',
      ],
      stack: ['Python 3.12', 'browser-use', 'Playwright', 'Chrome CDP', 'DeepSeek API', 'Apify', 'uv'],
      links: [
        { label: 'Source code', href: 'https://github.com/sergeythrees/universal_job_applier' },
      ],
      runNote:
        'The dashboard comes up locally on 127.0.0.1:8787; Chrome is started by a separate script.',
      runCommands: ['bash setup_and_run.sh', 'python3 dashboard.py --port 8787'],
      details: [
        'The idea: application routine eats hours, while the decision is still made by a human. ' +
          'The agent does the monotonous part and stops where an action becomes irreversible.',
        'The browser is not emulated inside a desktop app — it connects to a live Chrome over CDP, ' +
          'so authorization sessions stay valid.',
        'No external database: state lives in JSON and YAML next to the code, which suits a ' +
          'personal tool and needs no maintenance.',
      ],
      screenshots: [
        {
          src: 'projects/job_applier/01-dashboard.webp',
          caption: 'Dashboard: application metrics, run controls and the log',
        },
        { src: 'projects/job_applier/02-dashboard-2.webp', caption: "Today's decisions and 14-day activity" },
        { src: 'projects/job_applier/03-dashboard-3.webp', caption: 'Vacancy queue with statuses and links' },
      ],
    },
  ],

  tasks: [
    {
      id: 'green-api',
      name: 'Telegram chat client on GREEN-API',
      tagline: 'A web chat client on top of an HTTP API',
      badge: 'Test assignment',
      summary:
        'A web chat client for Telegram on the GREEN-API HTTP API: sign-in with instance credentials, ' +
        'a chat by phone number or @username, sending messages via SendMessage and receiving replies ' +
        'through ReceiveNotification long polling. The UI is built on the official Telegram UI Kit ' +
        'and follows the look of Telegram Web.',
      status: 'Completed',
      statusType: 'success',
      facts: [
        { label: 'Tests', value: '131 (Vitest + testing-library)' },
        { label: 'Integration', value: 'GREEN-API HTTP API' },
        { label: 'Live stand', value: 'on a stubbed backend' },
      ],
      features: [
        'Sign-in with apiUrl, idInstance and apiTokenInstance, with instance state validation.',
        'Creating a chat by phone number or @username via CheckAccount → chatId.',
        'Sending text with an optimistic message that is reconciled against the server idMessage.',
        'Long polling with ReceiveNotification / DeleteNotification and a pause on errors.',
        'Two-pane UI: chat list, search, bubbles, composer, dark theme.',
        'The palette and geometry come from the real Telegram Web theme, not eyeballed.',
        'A screenshot harness on raw Chrome DevTools Protocol with no external dependencies.',
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
        'The stand opens right here: the GREEN-API backend is replaced with a stub, so you can see ' +
        'sign-in, creating a chat, sending a message and the automatic reply. To run it locally, ' +
        'start from the repository root, Node 22.12+.',
      runCommands: ['npm install', 'npm run dev:telegram'],
      details: [
        'The key part of the assignment was working with a third-party API strictly by the documentation: ' +
          'the whole transport lives in one typed client, and the method contracts are written out and checked against the docs.',
        'The design was not eyeballed: token values and the palette were taken from the build of the real ' +
          'Telegram Web, so the client looks like a familiar messenger.',
        'The scope was limited to text messages — media, groups and reactions were out of it, and that is stated explicitly.',
        'The demo stand is a separate build with an HTTP interceptor: it answers GREEN-API methods with ' +
          'prepared data, including long polling and an automatic reply from the peer.',
      ],
      screenshots: [
        { src: 'projects/green-api/01-telegram-login.webp', caption: 'Signing in with instance credentials' },
        { src: 'projects/green-api/02-telegram-conversation.webp', caption: 'Conversation in the Telegram client' },
      ],
    },
    {
      id: 'vanilla-video-feed',
      name: 'Vertical video feed',
      tagline: 'A video feed in vanilla JS with no frameworks',
      badge: 'Test assignment',
      summary:
        'A short-video feed in pure JavaScript: scroll-snap, IntersectionObserver and ' +
        'a single active player. On top of the base version — performance optimizations ' +
        'plus a full set of tests and linters.',
      status: 'Completed',
      statusType: 'success',
      facts: [
        { label: 'Dependencies', value: '0 at runtime' },
        { label: 'Optimizations', value: 'DOM virtualization, distance-based preload' },
        { label: 'Checks', value: 'Vitest, Playwright, ESLint, Stylelint' },
      ],
      features: [
        'Scroll-snap feed that switches a single active player.',
        'IntersectionObserver decides what plays and what is paused.',
        'DOM virtualization: distant cards are unloaded, no redundant rendering.',
        'Video preload by distance to the viewport and deferred src assignment.',
        'Keyboard controls and stopping the player when leaving the tab.',
        'A custom Node server: video list from Google Drive, stream proxy, static files.',
      ],
      stack: ['Vanilla JS', 'ES modules', 'Node.js', 'HTML5', 'CSS3', 'Vitest', 'Playwright'],
      links: [
        {
          label: 'Source code',
          href: 'https://github.com/sergeythrees/vanilla-video-feed',
        },
      ],
      runNote: 'Run: npm start, the feed comes up on http://localhost:3000.',
      runCommands: ['npm install', 'npm start'],
      details: [
        'The assignment tested whether I can build something complex in vanilla JS: no frameworks, ' +
          'no bundler and no ready-made video player libraries.',
        'The main work was not the feed itself but performance: DOM virtualization, ' +
          'distance-based preloading and deferred src assignment remove the main jank ' +
          'during fast scrolling.',
        'The server is written in bare Node: the video list comes from Google Drive, the stream ' +
          'is served through a proxy, and static files are hand-rolled.',
      ],
      screenshots: [
        { src: 'projects/vanilla-video-feed/01-feed.webp', caption: 'Video feed on desktop' },
        { src: 'projects/vanilla-video-feed/02-feed-mobile.webp', caption: 'Feed on a mobile screen' },
      ],
    },
  ],

  employers: {
    eyebrow: 'For employers',
    title: 'For employers',
    subtitle: 'Resume, experience and open source — everything needed for a decision.',
    intro:
      'I collected everything usually asked at the first stage: a short resume, completed ' +
      'test assignments with source code, and a direct contact. Nothing extra — facts and links to code.',
    highlights: [
      {
        title: '8 years of frontend in production',
        text: 'From Flash players to a WYSIWYG form editor and a BPMN designer.',
      },
      {
        title: 'Own products',
        text: 'A form engine, a Telegram Mini App with TON settlements, AI bots and browser agents.',
      },
      {
        title: 'Open source',
        text: 'Project code is on GitHub, and the assignments come with tests and run instructions.',
      },
    ],
    cta: {
      resume: 'View resume',
      tasks: 'Test assignments',
      contact: 'Get in touch',
    },
  },
};
