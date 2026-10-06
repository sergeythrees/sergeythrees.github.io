import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/' — сайт публикуется в корень домена (sergeythrees.github.io). Абсолютные
// пути к ассетам обязательны: на глубоком маршруте вида /employers/tasks/ относительные
// ./assets/... указывали бы в несуществующий подкаталог.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});
