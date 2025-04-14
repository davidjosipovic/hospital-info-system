import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: process.env.NODE_ENV === 'docker' ? 3000 : 5173,
    host: true, // Ensures it works in Docker
    watch: {
      usePolling: true, // Enable polling for file changes
      interval: 1000, // Check for changes every 1 second
    },
  },
})
