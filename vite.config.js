import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'xampp' ? '/Portfolio/dist/' : './',
  build: { outDir: 'dist', emptyOutDir: true },
}));
