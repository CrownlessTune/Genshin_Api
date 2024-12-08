import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Genshin_Api/', // Reemplaza <repo-name> con el nombre de tu repositorio en GitHub
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Configura '@' como alias para la carpeta src
    },
  },
});
