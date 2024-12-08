import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Genshin_Api/', // Sustituye <repo-name> con el nombre exacto de tu repositorio
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
