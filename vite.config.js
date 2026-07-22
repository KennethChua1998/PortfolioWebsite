import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { generateFallbackHtml } from './src/seo/fallback.js'

const seoFallback = {
  name: 'seo-fallback',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace('<!--seo-fallback-->', generateFallbackHtml())
  },
}

export default defineConfig({
  plugins: [vue(), seoFallback],
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
        },
      },
    },
  },
})