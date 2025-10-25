/**
 * Vite configuration for frontend admin UI
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // @ts-expect-error - Vite plugin react is not typed
  plugins: [react()],
  root: './src/frontend',
  build: {
    outDir: '../../dist/frontend',
    emptyOutDir: true,
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    allowedHosts: ['e52e25c87fea.ngrok-free.app'],
  },
});
