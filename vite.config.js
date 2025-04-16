import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 在Vercel上部署时不需要base路径前缀
  base: '/',
  build: {
    outDir: 'dist',
  },
})
