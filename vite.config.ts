import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
  },
  base: process.env.NODE_ENV === 'production' ? '/UltimatePizzaDough/' : '/',
})
