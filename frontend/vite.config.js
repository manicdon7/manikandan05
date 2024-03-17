import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://manikandan05-backend.vercel.app',
      secure: false,
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
}
})