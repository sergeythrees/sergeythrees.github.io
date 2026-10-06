import type { Content } from '../types';

/** English site content. Mirrors content/ru.ts field by field. */
export const contentEn: Content = {
  site: {
    name: 'Sergey Stepanenko',
    handle: '@sergeythrees',
    role: 'Developer · AI automation · Telegram Mini Apps · React',
    headline: 'I build frontends and see my own projects through to launch.',
    intro:
      'I have been doing frontend since 2017. These are my own projects: a form builder for React, ' +
      'a Telegram Mini App with a TON deposit, a DeepSeek-powered bot and a browser agent that ' +
      'applies for jobs. Each one has source code and instructions for running it.',
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
      'A project should run on someone else’s machine, not just mine.',
      'I write tests along with the code.',
      'One command to start. If that didn’t work out, the README says what to do by hand.',
      'I add a dependency only when I can’t do without it.',
    ],
    about: [
      'I like building the whole product: the interface, the server and the automation ' +
        'around them. I start with the simplest version that works and build from there.',
      'If a project has no run commands, no tests and no honest list of what works and what ' +
        'doesn’t yet, I don’t consider it finished.',
      'Before this I did frontend in product teams: a form editor, a BPMN designer, financial ' +
        'analytics, e-learning. These days I work on my own products and on automation with ' +
        'LLMs and the browser.',
    ],
  },

  projects: [
    {
      id: 'fe',
      name: 'FormEngine',
      tagline: 'React forms from a JSON schema: designer, validation, conditional logic',
      summary:
        'A monorepo of React libraries and apps. You describe a form in JSON, and the library ' +
        'handles state, validation, events, conditional display and localization. ' +
        'It’s a fork of Optimajet FormEngine with my changes and my own build.',
      status: 'Active development',
      statusType: 'success',
      facts: [
        { label: 'Package version', value: '7.13.0' },
        { label: 'Packages in the monorepo', value: '10+' },
        { label: 'Tests', value: 'Vitest + Playwright' },
      ],
      features: [
        'Drag-and-drop form designer on react-dnd and Monaco Editor.',
        'Component sets for Ant Design, MUI, Mantine and RSuite: one schema works with any of them.',
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
        { label: 'Demo apps', href: 'https://demo.formengine.io' },
        { label: 'Documentation', href: 'https://formengine.io/documentation/' },
        { label: 'Source code', href: 'https://github.com/sergeythrees/fe' },
        { label: 'Upstream', href: 'https://github.com/optimajet/formengine', hint: 'optimajet/formengine' },
      ],
      appUrl: 'https://formbuilder.formengine.io',
      runNote:
        'The fork is built from the src/ directory.',
      runCommands: ['cd src', 'npm install', 'npm run start'],
      details: [
        'The core idea: a form is data. The schema is stored as JSON, the libraries provide the ' +
          'renderer and state, and the app just plugs in the finished form.',
        'The same schema renders in RSuite and in Ant Design with no markup changes.',
        'Internal tools are built on top of it: a form builder, a viewer and examples for ' +
          'different licenses.',
      ],
      screenshots: [
        { src: 'projects/fe/01-builder.webp', caption: 'Designer: dragging fields onto the canvas' },
        { src: 'projects/fe/02-viewer.webp', caption: 'Viewer: a form assembled from a schema' },
        { src: 'projects/fe/03-form-builder.webp', caption: 'Form Builder from the examples set' },
        { src: 'projects/fe/04-form-viewer.webp', caption: 'A rendered form in the viewer' },
      ],
    },
    {
      id: 'commitment_tma',
      name: 'My Contract',
      tagline: 'Telegram Mini App: a promise to yourself backed by a TON escrow deposit',
      summary:
        'A contract with yourself: set a goal, put a USDT deposit into escrow on TON and get cashback ' +
        'for every day you follow through. It’s a port of an iOS app (SwiftUI, HealthKit, YooKassa) ' +
        'to Telegram and TON.',
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
        'Backend on Fastify and grammY, client on React 18 and TON Connect.',
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
        'No public demo yet. The backend runs on :3000 and serves the built Mini App itself; ' +
        'a cloudflared tunnel makes it reachable from outside. Payments go through TON testnet.',
      runCommands: ['npm install', 'npm run build', 'npm start'],
      details: [
        'The idea is simple: a promise is easier to keep when your own money is on the line. ' +
          'While the contract is active, the deposit stays in escrow.',
        'The Tact smart contract is tested in the TON emulator. The whole payment flow is covered ' +
          'by Playwright e2e tests with screenshot comparison.',
        'Fastify serves the Mini App static files, data lives in node:sqlite, and the bot is built on grammY.',
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
      tagline: 'Telegram bot: a psychological portrait using the 360° method',
      summary:
        'You answer questions about yourself every day, and people close to you answer about you ' +
        'anonymously. DeepSeek turns it into a blunt report: superpower, blind spots, self-deception ' +
        'and growth areas.',
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
        'An unsoftened report from the model: superpower, blind spots, self-deception, growth areas.',
        'Without AI_API_KEY the bot doesn’t crash, it switches to a demo mode.',
        'A local aiohttp dashboard for browsing data and reports.',
        'A Docker image and make targets for deployment.',
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
        'The dashboard runs on 127.0.0.1:8787. Later I want to replace the bot with a Telegram Mini App.',
      runCommands: ['make docker-build', 'docker run --rm -p 8787:8787 ai-mirror'],
      details: [
        'The 360° method inside a messenger: you answer about yourself every day, people close to you ' +
          'answer about you anonymously, and the model compares the two and writes a report.',
        'The blunt tone is on purpose. A softened report is nice to read but doesn’t help much.',
        'The stack is small: aiogram for Telegram, SQLite for data, APScheduler for the daily ' +
          'questions, aiohttp for the dashboard.',
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
      tagline: 'A job-search autopilot: an AI agent applies for you in the browser',
      summary:
        'Collects job listings and applies to them through an AI agent running in a regular Chrome. ' +
        'You only confirm the steps that can’t be undone: sending an application, replying to a ' +
        'recruiter, accepting an offer.',
      status: 'Runs locally',
      statusType: 'default',
      facts: [
        { label: 'Agent', value: 'browser-use + Chrome' },
        { label: 'Confirmation', value: 'irreversible steps only' },
        { label: 'Storage', value: 'JSON / YAML, no DB' },
      ],
      features: [
        'Listings come from a custom scraper and an Apify actor.',
        'Each listing is matched against the profile before applying.',
        'The agent runs on browser-use and Playwright and connects to Chrome over CDP.',
        'Only irreversible actions need confirmation: sending, replying, accepting an offer.',
        'A local dashboard on stdlib http.server, no external services needed.',
        'Separate modules draft applications, interview answers and responses to objections.',
      ],
      stack: ['Python 3.12', 'browser-use', 'Playwright', 'Chrome CDP', 'DeepSeek API', 'Apify', 'uv'],
      links: [
        { label: 'Source code', href: 'https://github.com/sergeythrees/universal_job_applier' },
      ],
      runNote:
        'The dashboard runs on 127.0.0.1:8787; Chrome is started by a separate script.',
      runCommands: ['bash setup_and_run.sh', 'python3 dashboard.py --port 8787'],
      details: [
        'Applying for jobs takes hours, even though you make the decisions yourself anyway. ' +
          'The agent handles the routine and stops before every step that can’t be undone.',
        'The agent works in a real Chrome over CDP, so you stay logged in on job sites.',
        'There’s no database: state lives in JSON and YAML next to the code. That’s enough for a ' +
          'personal tool, and there’s nothing to maintain.',
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
      id: 'medical-olympics',
      name: 'Clinical Cases — Medical Olympics cases',
      tagline: 'Cases, answers and scores: FastAPI, Postgres, LLM',
      badge: 'Test assignment',
      summary:
        'A mini version of Medical Olympics: a doctor reads a clinical case, picks a diagnosis ' +
        'and management, and gets a score with a breakdown. The assignment had three parts — ' +
        'FastAPI + PostgreSQL, a Next.js frontend, and extracting a case from raw text with an ' +
        'LLM and an eval harness.',
      status: 'Completed',
      statusType: 'success',
      facts: [
        { label: 'Tests', value: '31 (pytest, real Postgres)' },
        { label: 'Assignment parts', value: '3: API+DB, frontend, LLM extraction' },
        { label: 'LLM evaluation', value: 'harness, 4 golden cases' },
      ],
      features: [
        'The database enforces integrity: composite FKs and a partial unique index for one diagnosis per answer.',
        'One attempt per participant — UNIQUE (case_id, participant); the database settles the race between two requests (409).',
        'Scoring lives in the submission_scores view (score, max_score, diagnosis_correct) — one rule for the result and the leaderboard.',
        'The public CasePublic schema never returns points or explanations — a test checks that the answer key does not leak.',
        'Server Components load the case list and the case page; the only client island is AnswerForm, submitting through a Server Action.',
        'Frontend types are generated from the backend OpenAPI schema, and contract drift is caught by tests on both sides.',
        'Raw text to CaseIn extraction via an LLM with a repair loop; a draft is not saved until the author publishes it.',
        'An eval harness with quality gates: the run exits with code 1 when metrics fall below the thresholds.',
      ],
      stack: [
        'Python 3.13',
        'FastAPI',
        'PostgreSQL 17',
        'SQLAlchemy',
        'Alembic',
        'Pydantic',
        'Next.js 16',
        'React 19',
        'TypeScript',
        'Docker',
      ],
      links: [
        {
          label: 'Source code',
          href: 'https://github.com/sergeythrees/medical-olympics',
          hint: 'sergeythrees/medical-olympics',
        },
      ],
      runNote:
        'The whole stack starts with docker compose up --build: the frontend opens at ' +
        'http://localhost:3000 and Swagger at http://localhost:8000/docs, with the 4 demo cases ' +
        'already seeded. Extraction only works if a DeepSeek or Gemini key is set in ' +
        'backend/.env; without a key POST /extract returns 503. There is no live stand — it ' +
        'needs Postgres and FastAPI, so it only runs locally.',
      runCommands: ['docker compose up --build'],
      details: [
        'The three parts of the assignment form one product: raw text goes through LLM extraction ' +
          'into a CaseIn, that same CaseIn is the POST /cases body, and the Next.js frontend reads ' +
          'and answers through the API. One Pydantic class, CaseIn, is at once the request body, ' +
          'the JSON schema for the model and the source of the frontend TypeScript types via ' +
          'OpenAPI, so the validation rules are the same for an LLM draft and for a case posted ' +
          'to the API.',
        'I put integrity and scoring in the database rather than in application code: an answer ' +
          'cannot point at an option from another case (composite FKs), an answer cannot hold two ' +
          'diagnoses (partial unique index), a participant gets one attempt, and the database ' +
          'settles the race between two concurrent requests. Points are computed by the ' +
          'submission_scores view: one aggregation with FILTER yields score, max_score and ' +
          'diagnosis_correct, and both the answer breakdown and the leaderboard read that same ' +
          'view, so the scoring rule lives in one place.',
        'In the LLM pipeline the JSON schema comes from CaseIn.model_json_schema(), the model ' +
          'output is validated by the same class, and on invalid JSON or a broken rule the model ' +
          'gets its own answer back with the exact error text — up to 3 attempts, then 502. The ' +
          'prompt requires not inventing missing data (null) and preserving negations; a draft ' +
          'from /extract is not saved, and the author publishes the case with its answer key ' +
          'after review — the LLM should not be the one deciding what counts as the right answer.',
        'The eval harness runs on 4 golden cases; with deepseek-flash: schema_valid 1.0 without ' +
          'repair, correct diagnosis and management polarity clean, vitals/coverage/grounded/values ' +
          '1.00, findings_f1 0.94–0.95, latency 6.7–9.6 s. The first run gave F1 0.80, but almost ' +
          'all mismatches turned out to be metric bugs (synonyms such as “JVP” and “Jugular ' +
          'venous pressure”), and the rest exposed an inconsistency in my own annotation: blood ' +
          'gases were one finding in one case and five in another. So the metric was split — ' +
          'coverage and grounded check content and act as gates, F1 describes structure. Four ' +
          'cases are a harness demo, not a statistically significant model comparison.',
      ],
      screenshots: [
        { src: 'projects/medical-olympics/01-cases.webp', caption: 'Clinical case list' },
        {
          src: 'projects/medical-olympics/02-case.webp',
          caption: 'A case: findings, vitals and the answer form',
        },
        {
          src: 'projects/medical-olympics/03-result.webp',
          caption: 'Answer debrief: score, missed and harmful actions',
        },
      ],
    },
    {
      id: 'green-api',
      name: 'Telegram chat client on GREEN-API',
      tagline: 'A web chat client on an HTTP API',
      badge: 'Test assignment',
      summary:
        'A Telegram web client on the GREEN-API HTTP API. Sign in with instance credentials, start ' +
        'a chat by phone number, send messages and get replies via long polling. The UI is built ' +
        'on the official Telegram UI Kit.',
      status: 'Completed',
      statusType: 'success',
      facts: [
        { label: 'Tests', value: '131 (Vitest + testing-library)' },
        { label: 'Integration', value: 'GREEN-API HTTP API' },
        { label: 'Live stand', value: 'stub or your own instance' },
      ],
      features: [
        'Sign-in with apiUrl, idInstance and apiTokenInstance, with instance state validation.',
        'Creating a chat by phone number or @username via CheckAccount → chatId.',
        'A sent message shows up in the chat right away and is then matched to the server’s idMessage.',
        'Long polling via ReceiveNotification / DeleteNotification, with a pause on errors.',
        'Two-pane UI: chat list, search, bubbles, composer, dark theme.',
        'Colors and sizes are taken from the Telegram Web theme.',
        'Screenshots are taken by a script on the Chrome DevTools Protocol with no third-party dependencies.',
        'With your own idInstance and apiTokenInstance, the stand talks to the real GREEN-API.',
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
          label: 'Source code',
          href: 'https://github.com/sergeythrees/green-api',
          hint: 'sergeythrees/green-api',
        },
      ],
      appUrl: 'demos/green-api/',
      runNote:
        'The stand opens on the regular sign-in screen. The “Quick demo sign-in” button fills in ' +
        'demo credentials and takes you straight to the chat, where you can start a dialog, send ' +
        'a message and get an automatic reply. To try the real API, sign in with your own ' +
        'idInstance and apiTokenInstance. To run it locally, use the repository root and Node 22.12+.',
      runCommands: ['npm install', 'npm run dev:telegram'],
      details: [
        'The main point of the assignment was working with someone else’s API strictly by the docs. ' +
          'All network code sits in one typed client, and the method contracts are checked against the documentation.',
        'I took the colors and sizes from the Telegram Web build, so the client looks like the messenger people already know.',
        'Only text messages were in scope. I didn’t do media, groups or reactions, and that’s stated up front.',
        'The demo stand is a separate build with a stub. It intercepts HTTP requests and answers GREEN-API ' +
          'methods with canned data, including long polling and an automatic reply.',
      ],
      screenshots: [
        { src: 'projects/green-api/01-login.webp', caption: 'Signing in with instance credentials' },
        { src: 'projects/green-api/02-conversation.webp', caption: 'Conversation' },
        { src: 'projects/green-api/03-conversation-dark.webp', caption: 'Dark theme' }
      ],
    },
    {
      id: 'vanilla-video-feed',
      name: 'Vertical video feed',
      tagline: 'A short-video feed in plain JS',
      badge: 'Test assignment',
      summary:
        'A short-video feed in plain JavaScript: scroll-snap, IntersectionObserver and one ' +
        'active player. Beyond the brief, I added performance work, tests and linters.',
      status: 'Completed',
      statusType: 'success',
      facts: [
        { label: 'Dependencies', value: '0 at runtime' },
        { label: 'Optimizations', value: 'DOM virtualization, distance-based preload' },
        { label: 'Checks', value: 'Vitest, Playwright, ESLint, Stylelint' },
      ],
      features: [
        'A scroll-snap feed where only one video plays at a time.',
        'IntersectionObserver decides which video plays and which is paused.',
        'DOM virtualization: cards far off screen are removed from the DOM.',
        'Videos preload as they get close to the viewport, and src is set lazily.',
        'Keyboard controls; playback stops when you leave the tab.',
        'A small Node server: video list from Google Drive, a stream proxy, static files.',
      ],
      stack: ['Vanilla JS', 'ES modules', 'Node.js', 'HTML5', 'CSS3', 'Vitest', 'Playwright'],
      links: [
        {
          label: 'Source code',
          href: 'https://github.com/sergeythrees/vanilla-video-feed',
        },
      ],
      runNote: 'After npm start the feed opens at http://localhost:3000.',
      runCommands: ['npm install', 'npm start'],
      details: [
        'The rules: plain JS, no frameworks, no bundler, no ready-made video players.',
        'Most of the time went into performance. DOM virtualization, distance-based preloading ' +
          'and lazy src assignment got rid of the stutter during fast scrolling.',
        'The server is bare Node: it gets the video list from Google Drive, proxies the stream ' +
          'and serves static files itself.',
      ],
      screenshots: [
        { src: 'projects/vanilla-video-feed/01-feed.webp', caption: 'Video feed on desktop' },
        { src: 'projects/vanilla-video-feed/02-feed-mobile.webp', caption: 'Feed on a mobile screen' },
      ],
    },
  ],

  employers: {
    title: 'For employers',
    subtitle:
      'What people usually ask for at the first stage: a résumé, completed test assignments ' +
      'with source code, and contacts.',
    highlights: [
      {
        title: '8 years in frontend',
        text: 'From Flash players to a WYSIWYG form editor and a BPMN designer.',
      },
      {
        title: 'My own projects',
        text: 'A form builder, a Telegram Mini App with TON payments, an LLM bot and a browser agent.',
      },
      {
        title: 'Open source',
        text: 'The projects are on GitHub, and the test assignments come with tests and run instructions.',
      },
    ],
    cta: {
      contact: 'Get in touch',
    },
  },
};
