import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        privacy: 'privacy-policy.html',
        terms: 'terms-and-conditions.html',
        support: 'support.html'
      }
    }
  },
  server: { port: 3000, host: '0.0.0.0' }
});
