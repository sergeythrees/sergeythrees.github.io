#!/usr/bin/env node
/**
 * GitHub Pages не умеет отдавать index.html для произвольного пути: на /employers/tasks/
 * он вернёт 404.html. Копия index.html делает такой ответ обычной загрузкой SPA —
 * BrowserRouter видит исходный путь и рисует нужную страницу.
 *
 * Запускается из npm run build после vite build.
 */
import { access, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const index = path.join(root, 'dist', 'index.html');
const fallback = path.join(root, 'dist', '404.html');

try {
  await access(index);
} catch {
  console.error('make-404: dist/index.html не найден — сначала выполните vite build');
  process.exit(1);
}

await copyFile(index, fallback);
console.log(`make-404: ${path.relative(root, fallback)} создан из index.html`);
