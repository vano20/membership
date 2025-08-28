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
      "@": "/src",
      "@/components": "/src/components",
      "@/pages": "/src/pages",
      "@/context": "/src/context",
      "@/hooks": "/src/hooks",
      "@/types": "/src/types",
      "@/store": "/src/store",
      "@/helper": "/src/helper"
    }
  },

  build: {
    sourcemap: true
  }
})