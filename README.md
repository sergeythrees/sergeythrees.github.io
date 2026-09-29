# Портфолио Sergey Stepanenko

Статический сайт-портфолио с проектами, скриншотами и ссылками на исходный код.

## Что это

Статический лендинг-портфолио на React и Ant Design: профиль, список проектов и
отдельная страница каждого проекта со скриншотами, стеком и ссылками. Публикуется на
GitHub Pages по адресу https://sergeythrees.github.io. Тёмная тема, слева панель
навигации, серверная часть не нужна.

## Стек

- React 19
- TypeScript
- Vite
- antd 6
- react-router-dom 7 (HashRouter)

## Локальный запуск

```bash
npm install
npm run dev      # dev-сервер Vite на http://localhost:5173
npm run build    # tsc -b && vite build, результат в dist/
npm run preview  # локальный просмотр собранного dist/
```

Проверка типов отдельно:

```bash
npm run typecheck
```

## Деплой

Деплой автоматический: push в ветку `main` запускает workflow
`.github/workflows/deploy.yml`. Он выполняет `npm ci`, затем `npm run build`,
загружает каталог `dist` как артефакт Pages и публикует его через
`actions/deploy-pages`. Workflow можно запустить и вручную (событие
`workflow_dispatch`).

При первом запуске включите в репозитории Settings → Pages → Source: GitHub Actions.

Роутинг построен на `HashRouter`, поэтому сайт работает на GitHub Pages без `404.html`
и без редиректов: маршрут целиком хранится в hash-части URL.

## Структура

- `src/data` — данные: `site.ts` (профиль, контакты, навыки) и `projects.ts` (проекты)
- `src/components` — `AppLayout`, `SideNav`, `ProjectCard`, `ScreenshotGallery`,
  `PageHeader`, `StackTags`
- `src/pages` — `HomePage`, `ProjectsPage`, `ProjectDetailPage`, `AboutPage`,
  `ContactsPage`, `NotFoundPage`
- `src/styles` и `src/theme.ts` — глобальные стили и тема Ant Design
- `public/projects/<id>` — скриншоты проектов: `fe`, `commitment_tma`, `ai_mirror`,
  `job_applier`
- `.github/workflows` — сборка и деплой на GitHub Pages

## Как добавить проект

1. Положите скриншоты в `public/projects/<id>/`, где `<id>` — идентификатор проекта.
   Формат webp, ширина до 1000 px. Конвертация из PNG одной командой:

```bash
magick вход.png -auto-orient -resize "1000x1000>" -strip -quality 82 \
  public/projects/<id>/01-название.webp
```

2. Добавьте объект в массив `projects` в `src/data/projects.ts` со всеми полями:
   `id`, `name`, `tagline`, `summary`, `status`, `statusType`, `facts`, `features`,
   `stack`, `links`, `appUrl` (живая ссылка, если есть), `runNote`, `runCommands`,
   `details`, `screenshots` (массив объектов `{ src, caption }`).

3. Больше ничего править не нужно: проект сам появится в меню, на главной, в списке
   проектов и в галерее на странице проекта.

## Скриншоты

Все изображения в `public/projects` — реальные скриншоты приложений: FormEngine и
«Мой Контракт» взяты из репозиториев и e2e-снапшотов Playwright, дашборды AI Mirror и
Universal Job Applier сняты локально через headless Chromium.

## Контакты

- Почта: sergeythrees@gmail.com
- GitHub: https://github.com/sergeythrees
