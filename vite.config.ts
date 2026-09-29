import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — сайт публикуется в корень домена и должен работать
// при открытии как с https://sergeythrees.github.io, так и из подкаталога.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});
