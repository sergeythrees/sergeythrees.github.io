# Портфолио Sergey Stepanenko

Статический сайт-портфолио на React и Ant Design: проекты, тестовые задания,
резюме и контакты. Публикуется на GitHub Pages по адресу
https://sergeythrees.github.io. Серверной части нет: весь контент лежит в репозитории.

## Возможности

- Тёмная и светлая темы с переключателем в шапке. Выбор сохраняется в
  `localStorage` (ключ `st.theme`), светлую версию можно открыть ссылкой
  `?theme=light`.
- Два языка интерфейса, RU и EN, с переключателем в шапке. Выбор сохраняется
  (ключ `st.locale`), английскую версию можно открыть ссылкой `?lang=en`.
- Разделы «Проекты», «Работодателям» (со страницами «Резюме» и «Тестовые
  задания»), «Обо мне» и «Контакты».
- Страница проекта: описание, факты, стек, галерея скриншотов с превью по клику,
  ссылки на исходники и кнопка «Открыть приложение».
- Страница резюме: таймлайн опыта, ключевые результаты, образование, навыки,
  языки, условия работы и скачивание PDF. Печать корректная — Ctrl+P печатает
  только резюме, без навигации и шапки сайта.
- Тестовые задания показываются той же карточкой и той же детальной страницей,
  что и проекты: отдельный бейдж и свой раздел меню.
- Lazy-роутинг: главная грузится сразу, остальные страницы — отдельными чанками.

## Стек

- React 19
- TypeScript
- Vite
- antd 6 (+ `@ant-design/icons`)
- react-router-dom 7 (HashRouter)

Других зависимостей нет — ни стейт-менеджеров, ни CSS-фреймворков.

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

Почему так:

- `HashRouter` — маршрут целиком хранится в hash-части URL, поэтому прямые ссылки
  на внутренние страницы работают на GitHub Pages без `404.html` и редиректов.
- `base: './'` в `vite.config.ts` — ассеты подключаются относительными путями и не
  ломаются при публикации не из корня домена.

## Структура

```text
index.html                     точка входа, метатеги, установка темы до первой отрисовки
vite.config.ts                 base: './', порт dev-сервера 5173, outDir dist
package.json                   скрипты dev / build / preview / typecheck
src/
  main.tsx                     провайдеры (ThemeProvider, LocaleProvider), HashRouter, ConfigProvider
  App.tsx                      маршруты, lazy-загрузка страниц
  i18n/
    LocaleProvider.tsx         контекст локали: t, content, setLocale, toggleLocale
    locales.ts                 список локалей, ключ хранения, метаданные RU/EN
    dictionary/ru.ts           словарь интерфейса, тип Dictionary выводится из него
    dictionary/en.ts           английский словарь, обязан совпадать с ru по ключам
  theme/
    ThemeProvider.tsx          контекст темы: mode, antdTheme, toggleMode
    modes.ts                   тип ThemeMode ('dark' | 'light')
  data/
    types.ts                   типы Content, Project, Resume, Profile и другие
    content/ru.ts              русский контент: профиль, проекты, задания, раздел employers
    content/en.ts              тот же контент на английском
    resume.ts                  resumeRu и resumeEn для страницы резюме
  components/
    AppLayout.tsx              каркас: сайдбар, шапка, переключатели темы и языка
    SideNav.tsx                меню с разделами и вложенными пунктами
    CaseDetail.tsx             общая разметка страницы проекта и тестового задания
    ScreenshotGallery.tsx      галерея скриншотов и хелпер assetUrl для путей из public/
    ProjectCard.tsx            карточка проекта или задания
    PageHeader.tsx             заголовок страницы с надзаголовком и подзаголовком
    StackTags.tsx              список технологий тегами
  pages/
    HomePage.tsx               главная
    ProjectsPage.tsx           список проектов
    ProjectDetailPage.tsx      страница проекта
    EmployersPage.tsx          раздел «Работодателям»
    ResumePage.tsx             резюме, скачивание PDF и печать
    TasksPage.tsx              список тестовых заданий
    TaskDetailPage.tsx         страница тестового задания
    AboutPage.tsx              «Обо мне»
    ContactsPage.tsx           «Контакты»
    NotFoundPage.tsx           страница 404
  styles/
    global.css                 переменные тем, каркас, общие блоки, правила печати
    controls.css               стили кнопок, ссылок и переключателей
    employers.css              раздел «Работодателям» и вёрстка резюме
public/
  favicon.svg                  иконка сайта
  og-image.png                 картинка для превью в соцсетях (1200x630)
  photo.jpg                    фото для страницы «Обо мне»
  projects/<id>/*.webp         скриншоты проектов, по каталогу на проект
  resume/cv-ru.pdf             PDF-резюме на русском
  resume/cv-en.pdf             PDF-резюме на английском
  demos/green-api/             стенд-заглушка тестового задания (сборка + mock-green-api.js)
.github/workflows/deploy.yml   сборка и публикация на GitHub Pages
```

## Как добавить проект

1. Сложите скриншоты в `public/projects/<id>/`, где `<id>` — идентификатор проекта.
   Формат webp, ширина до 1000 px, имена вида `01-название.webp`. Конвертация из PNG:

```bash
magick вход.png -auto-orient -resize "1000x1000>" -strip -quality 82 \
  public/projects/<id>/01-название.webp
```

2. Добавьте объект в массив `projects` в `src/data/content/ru.ts` со всеми полями
   типа `Project` (`src/data/types.ts`): `id`, `name`, `tagline`, `summary`,
   `status`, `statusType`, `facts`, `features`, `stack`, `links`, `appUrl`
   (если есть живая ссылка), `runNote`, `runCommands`, `details`, `screenshots`
   (массив `{ src, caption }`, где `src` — путь от `public/`, например
   `projects/<id>/01-название.webp`), `badge` — по необходимости.

3. Добавьте тот же объект в массив `projects` в `src/data/content/en.ts`.
   Английская запись обязательна: тип `Content` требует её наличия, без неё сборка
   упадёт на проверке типов.

4. Больше ничего править не нужно: проект сам появится в меню, на главной, в списке
   проектов и на своей странице.

Новый раздел тестовых заданий добавляется так же — объектом в массив `tasks` тех же
двух файлов, `src/data/content/ru.ts` и `src/data/content/en.ts`.

## Смена резюме

- Текст резюме: `src/data/resume.ts`, объекты `resumeRu` и `resumeEn` (опыт,
  образование, навыки, языки, проекты, условия работы).
- PDF-файлы: `public/resume/cv-ru.pdf` и `public/resume/cv-en.pdf`. Имена указаны в
  полях `pdf` объектов резюме — при смене имён обновите и их.

## Стенд-заглушка тестового задания

`public/demos/green-api/` — собранный чат-клиент Telegram на GREEN-API с подменённым
бэкендом: посетителю не нужны ключи инстанса, а стенд открывается кнопкой «Открыть
стенд» со страницы задания (поле `appUrl` в контенте).

Как он собирается: исходный репозиторий копируется во временный каталог, в
`vite.config.ts` добавляется `base: './'`, а перед бандлом подключается
`public/mock-green-api.js`. Этот файл оборачивает `window.fetch` и отвечает на методы
GREEN-API (`getStateInstance`, `checkAccount`, `sendMessage`, длинный поллинг
`receiveNotification` и остальные) заранее подготовленными данными, включая
автоответ собеседника. Сопоставление идёт по пути запроса, а не по хосту, поэтому
стенд работает с любым `apiUrl`, который введёт посетитель. Сборка кладётся в
`public/demos/green-api/`, исходный репозиторий не изменяется.

## Скриншоты

Все изображения в `public/projects` — реальные скриншоты приложений, а не макеты.
FormEngine, «Мой Контракт» и чат-клиент GREEN-API взяты из репозиториев проектов и
их e2e-снапшотов Playwright; дашборды AI Mirror и Universal Job Applier сняты
локально в headless Chromium. Исходники приведены к webp с шириной до 1000 px.

## Контакты

- Почта: sergeythrees@gmail.com
- GitHub: https://github.com/sergeythrees
