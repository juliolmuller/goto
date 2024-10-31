import { fileURLToPath, URL } from 'node:url';

import vuePlugin from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevToolsPlugin from 'vite-plugin-vue-devtools';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vuePlugin(), vueDevToolsPlugin()],
  server: {
    port: 30303,
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
});
