import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      port: 3000
    },
    watch: {
      persistent: true,
      usePolling: true
    }
  },
  plugins: [react({fastRefresh: true})]
})
