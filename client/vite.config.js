import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
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
    },
    cors:{
      origin: '*'
    }
  },
  plugins: [react({fastRefresh: true}), svgr()],
})
