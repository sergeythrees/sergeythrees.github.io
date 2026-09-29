#!/usr/bin/env node
/**
 * Сборка демо-стенда GREEN-API для портфолио.
 *
 * Стенд — это собранное приложение `apps/telegram` из отдельного репозитория
 * green-api плюс заглушка бэкенда `stand/green-api/mock-green-api.js`. Исходный
 * репозиторий только читается: всё копируется во временный каталог, там
 * устанавливаются зависимости и запускается `vite build --base=./`, а готовый
 * `dist` переносится в приёмник (по умолчанию `public/demos/green-api`).
 *
 * Использование:
 *   node scripts/build-stand.mjs [--src <путь>] [--out <путь>]
 *                                [--keep-temp] [--skip-install] [--help]
 *
 * Путь к исходникам также читается из переменной окружения GREEN_API_SRC,
 * по умолчанию — `../green-api` относительно корня этого репозитория.
 *
 * Внешних зависимостей нет, нужен Node 22+ и сеть для `npm install`.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const DEFAULT_SRC = path.join(REPO_ROOT, '..', 'green-api');
const DEFAULT_OUT = path.join(REPO_ROOT, 'public', 'demos', 'green-api');
const MOCK_SOURCE = path.join(REPO_ROOT, 'stand', 'green-api', 'mock-green-api.js');

/** Каталоги, которые не копируются из исходного репозитория. */
const EXCLUDED_DIRS = new Set(['node_modules', 'dist', '.cache', '.git']);

/** Якорь, перед которым вставляется заглушка. */
const MODULE_ANCHOR = '<script type="module"';
const MOCK_TAG = '<script src="./mock-green-api.js"></script>';
const MOCK_FILE = 'mock-green-api.js';

const HELP = `
Сборка демо-стенда GREEN-API.

  --src <путь>      исходный репозиторий green-api
                    (по умолчанию GREEN_API_SRC или ../green-api)
  --out <путь>      приёмник собранного стенда
                    (по умолчанию public/demos/green-api)
  --keep-temp       не удалять временный каталог сборки
  --skip-install    не запускать npm install
  --help            показать эту справку

Пример:
  GREEN_API_SRC=/path/to/green-api npm run stand:green-api
`.trim();

/** Разбирает аргументы командной строки. */
function parseArgs(argv) {
  const options = {
    src: process.env.GREEN_API_SRC || DEFAULT_SRC,
    out: DEFAULT_OUT,
    keepTemp: false,
    skipInstall: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const [name, inlineValue] = arg.includes('=')
      ? [arg.slice(0, arg.indexOf('=')), arg.slice(arg.indexOf('=') + 1)]
      : [arg, undefined];

    const takeValue = () => {
      if (inlineValue !== undefined) return inlineValue;
      i += 1;
      if (i >= argv.length) throw new Error(`для ${name} не указано значение`);
      return argv[i];
    };

    switch (name) {
      case '--src':
        options.src = takeValue();
        break;
      case '--out':
        options.out = takeValue();
        break;
      case '--keep-temp':
        options.keepTemp = true;
        break;
      case '--skip-install':
        options.skipInstall = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
      default:
        throw new Error(`неизвестный аргумент: ${arg}`);
    }
  }

  return options;
}

/** Проверяет версию Node: скрипт рассчитан на 22+. */
function ensureNodeVersion() {
  const major = Number(process.versions.node.split('.')[0]);
  if (Number.isNaN(major) || major < 22) {
    throw new Error(
      `нужен Node 22 или новее, запущено ${process.version}. ` +
        'Обновите Node (например, через nvm install 22).',
    );
  }
}

/** Запускает команду; возвращает код возврата и (если не stream) весь вывод. */
function run(command, args, cwd, { stream = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      stdio: stream ? 'inherit' : ['ignore', 'pipe', 'pipe'],
    });

    let output = '';
    if (!stream) {
      child.stdout.on('data', (chunk) => {
        output += chunk;
      });
      child.stderr.on('data', (chunk) => {
        output += chunk;
      });
    }

    child.on('error', (error) => reject(error));
    child.on('close', (code) => resolve({ code, output: output.trim() }));
  });
}

/** Копирует дерево, пропуская служебные каталоги. */
async function copyTree(from, to) {
  await fs.cp(from, to, {
    recursive: true,
    dereference: false,
    filter: (source) => !EXCLUDED_DIRS.has(path.basename(source)),
  });
}

/** Собирает список обычных файлов рекурсивно (символические ссылки пропускает). */
async function collectFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(full)));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

/** Человекочитаемый размер. */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} Б`;
  const units = ['КБ', 'МБ', 'ГБ'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(1).replace('.', ',')} ${units[unit]}`;
}

/** Последние `count` строк вывода — для сообщения об ошибке сборки. */
function tail(text, count) {
  return text.split('\n').slice(-count).join('\n');
}

/** Vite печатает версию в первой строке вывода: `vite v8.3.1 building ...`. */
function extractViteVersion(output) {
  const match = output.match(/vite v(\d+\.\d+\.\d+\S*)/i);
  return match ? match[1] : 'не определена';
}

/**
 * Вставляет тег заглушки непосредственно перед первым module-скриптом.
 * Заглушка обязана выполниться раньше бандла приложения.
 */
function injectMockTag(html) {
  const mockAt = html.indexOf(`${MOCK_FILE}"`);
  const moduleAt = html.indexOf(MODULE_ANCHOR);

  if (moduleAt === -1) {
    throw new Error(
      `в dist/index.html не найден якорь ${MODULE_ANCHOR} — ` +
        'сборка выполнена не Vite или шаблон index.html изменился',
    );
  }

  if (mockAt !== -1) {
    if (mockAt > moduleAt) {
      throw new Error(
        'в dist/index.html заглушка уже есть, но подключена после module-скрипта — ' +
          'порядок нужно исправить вручную в исходном index.html',
      );
    }
    return { html, injected: false };
  }

  // Сохраняем отступ строки, чтобы разметка осталась читаемой.
  const injected =
    html.slice(0, moduleAt) + `${MOCK_TAG}\n    ` + html.slice(moduleAt);
  return { html: injected, injected: true };
}

/** Проверяет готовый стенд в приёмнике. */
async function verifyStand(outDir) {
  const indexFile = path.join(outDir, 'index.html');
  const mockFile = path.join(outDir, MOCK_FILE);
  const assetsDir = path.join(outDir, 'assets');

  await fs.access(indexFile);
  await fs.access(mockFile);

  const assets = await collectFiles(assetsDir).catch(() => {
    throw new Error(`в приёмнике нет каталога assets: ${assetsDir}`);
  });
  if (assets.length === 0) {
    throw new Error(`каталог assets пуст: ${assetsDir}`);
  }

  const html = await fs.readFile(indexFile, 'utf8');
  const mockAt = html.indexOf(MOCK_TAG);
  const moduleAt = html.indexOf(MODULE_ANCHOR);

  if (mockAt === -1) throw new Error('в index.html нет тега заглушки');
  if (moduleAt === -1) throw new Error(`в index.html нет якоря ${MODULE_ANCHOR}`);
  if (mockAt > moduleAt) {
    throw new Error('тег заглушки стоит после module-скрипта');
  }

  const relativeAssets = html.match(/(?:src|href)="\.\/assets\//g) ?? [];
  const absoluteAssets = html.match(/(?:src|href)="\/assets\//g) ?? [];
  if (relativeAssets.length === 0) {
    throw new Error('ассеты в index.html подключены не относительными путями (./assets/...)');
  }
  if (absoluteAssets.length > 0) {
    throw new Error('в index.html остались абсолютные пути к ассетам (/assets/...)');
  }

  return { assets: assets.length, relativeAssets: relativeAssets.length };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(HELP);
    return;
  }

  ensureNodeVersion();

  const src = path.resolve(process.cwd(), options.src);
  const out = path.resolve(process.cwd(), options.out);

  // --- проверки до тяжёлых операций ---------------------------------------
  const appDir = path.join(src, 'apps', 'telegram');
  try {
    await fs.access(path.join(appDir, 'package.json'));
  } catch {
    throw new Error(
      `не найден исходный репозиторий green-api: ${path.join(appDir, 'package.json')}\n` +
        'Укажите путь к нему аргументом --src <путь> или переменной окружения ' +
        'GREEN_API_SRC, например:\n' +
        '  GREEN_API_SRC=/path/to/green-api npm run stand:green-api',
    );
  }

  try {
    await fs.access(MOCK_SOURCE);
  } catch {
    throw new Error(`не найдена заглушка: ${MOCK_SOURCE}`);
  }

  if (src === out || out.startsWith(src + path.sep)) {
    throw new Error('приёмник не должен находиться внутри исходного репозитория');
  }

  console.log(`Исходники: ${src}`);
  console.log(`Приёмник:  ${out}`);

  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'green-api-stand-'));
  const keepTemp = options.keepTemp;

  try {
    console.log(`Временный каталог: ${tempRoot}`);

    // --- 1. Копирование исходников ----------------------------------------
    console.log('Копирую исходники…');
    for (const name of ['package.json', 'package-lock.json']) {
      const from = path.join(src, name);
      try {
        await fs.access(from);
      } catch {
        if (name === 'package-lock.json') continue; // lock-файл необязателен
        throw new Error(`в исходном репозитории нет ${name}`);
      }
      await fs.copyFile(from, path.join(tempRoot, name));
    }

    // Дальше всё работает только с копией: исходный репозиторий не изменяется.
    const tempAppDir = path.join(tempRoot, 'apps', 'telegram');
    if (!tempAppDir.startsWith(tempRoot + path.sep)) {
      throw new Error('внутренняя ошибка: приложение должно собираться во временном каталоге');
    }
    await copyTree(appDir, tempAppDir);

    // --- 2. Заглушка в public/ приложения ---------------------------------
    const publicDir = path.join(tempAppDir, 'public');
    await fs.mkdir(publicDir, { recursive: true });
    await fs.copyFile(MOCK_SOURCE, path.join(publicDir, MOCK_FILE));
    console.log(`Заглушка скопирована в public/${MOCK_FILE}`);

    // --- 3. Зависимости ----------------------------------------------------
    const modulesDir = path.join(tempRoot, 'node_modules');
    const hasModules = await fs
      .access(modulesDir)
      .then(() => true)
      .catch(() => false);

    if (options.skipInstall) {
      console.log('npm install пропущен (--skip-install)');
    } else if (hasModules) {
      console.log('node_modules уже есть, npm install пропущен');
    } else {
      console.log('Устанавливаю зависимости (npm install)… это может занять минуту');
      const install = await run('npm', ['install'], tempRoot, { stream: true });
      if (install.code !== 0) {
        throw new Error(`npm install завершился с кодом ${install.code}`);
      }
    }

    // --- 4. Сборка приложения ---------------------------------------------
    // `--base=./` (а не правка vite.config.ts) даёт относительные пути,
    // пригодные для публикации в подкаталоге сайта.
    console.log('Собираю приложение (vite build --base=./)…');
    const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    const build = await run(npx, ['vite', 'build', '--base=./'], tempAppDir);
    const viteVersion = extractViteVersion(build.output);

    if (build.code !== 0) {
      console.error(tail(build.output, 30));
      throw new Error(`сборка упала с кодом ${build.code}`);
    }
    console.log(tail(build.output, 6));

    // --- 5. Заглушка в собранном index.html --------------------------------
    const distDir = path.join(tempAppDir, 'dist');
    if (!distDir.startsWith(tempRoot + path.sep)) {
      throw new Error('внутренняя ошибка: dist должен лежать во временном каталоге');
    }
    // Vite копирует public/ в dist сам; без этого файла стенд работать не будет.
    await fs.access(path.join(distDir, MOCK_FILE)).catch(() => {
      throw new Error(`Vite не скопировал public/${MOCK_FILE} в dist`);
    });
    const distIndex = path.join(distDir, 'index.html');
    const html = await fs.readFile(distIndex, 'utf8');
    const { html: patched, injected } = injectMockTag(html);

    if (injected) {
      await fs.writeFile(distIndex, patched);
      console.log(`Тег заглушки вставлен перед первым ${MODULE_ANCHOR}`);
    } else {
      console.log('Тег заглушки уже есть в index.html, дубликат не добавлен');
    }

    // --- 6. Публикация результата ------------------------------------------
    console.log(`Публикую dist в ${out}…`);
    await fs.rm(out, { recursive: true, force: true });
    await fs.mkdir(out, { recursive: true });
    await fs.cp(distDir, out, { recursive: true });

    // --- 7. Проверка и сводка ----------------------------------------------
    const checked = await verifyStand(out);
    const files = await collectFiles(out);
    const totalBytes = (
      await Promise.all(files.map(async (file) => (await fs.stat(file)).size))
    ).reduce((sum, size) => sum + size, 0);

    const relativeOut = path.relative(process.cwd(), out) || out;
    const shownOut = relativeOut.startsWith('..') ? out : relativeOut;
    console.log('');
    console.log('Готово. Стенд собран.');
    console.log(`Каталог:        ${shownOut}`);
    console.log(`Файлов:         ${files.length} (ассетов: ${checked.assets})`);
    console.log(`Размер:         ${formatBytes(totalBytes)}`);
    console.log(`Vite:           ${viteVersion}`);
    console.log('Заглушка:       подключена до module-скрипта');
    console.log(`Относительные:  ${checked.relativeAssets} ссылок на ./assets/...`);
  } finally {
    if (keepTemp) {
      console.log(`Временный каталог сохранён: ${tempRoot}`);
    } else {
      await fs.rm(tempRoot, { recursive: true, force: true });
    }
  }
}

main().catch((error) => {
  console.error(`\nОшибка: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
});
