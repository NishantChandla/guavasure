/**
 * Vite configuration for Shopify admin UI
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()] as any,
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, '../dist/shopify/admin'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@admin': path.resolve(__dirname),
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    allowedHosts: ['e52e25c87fea.ngrok-free.app'],
  },
});
