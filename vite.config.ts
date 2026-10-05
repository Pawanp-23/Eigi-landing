import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Two pages: the landing page (/) and Success stories (/stories/).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        stories: resolve(import.meta.dirname, 'stories/index.html'),
      },
    },
  },
})
