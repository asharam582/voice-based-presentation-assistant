import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ws': { target: 'ws://localhost:8000', ws: true, changeOrigin: true },
      '/speech-token': { target: 'http://localhost:8000', changeOrigin: true },
      '/generate-slides': { target: 'http://localhost:8000', changeOrigin: true },
      '/health': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
  optimizeDeps: {
    exclude: ['microsoft-cognitiveservices-speech-sdk'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})




