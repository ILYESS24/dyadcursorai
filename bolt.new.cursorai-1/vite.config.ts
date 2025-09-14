import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    remix(),
    react(),
    UnoCSS(),
    nodePolyfills({
      include: ['path', 'buffer', 'events', 'util', 'stream'],
    }),
  ],
  resolve: {
    alias: {
      '~': '/app',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./app/styles/variables.scss";`
      }
    }
  },
  build: {
    target: 'esnext',
  },
  server: {
    port: 3000,
  },
});