import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/form': 'https://mini-project-backend-rbuf.onrender.com/',
    },
  },
  plugins: [react()],
})
