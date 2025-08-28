import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "savano-miatama",
    project: "javascript-react"
  })],

  resolve: {
    alias: {
      src: '/src'
    }
  },

  build: {
    sourcemap: true
  }
})