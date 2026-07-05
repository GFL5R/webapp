import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const BUILD_ID = Date.now().toString(36)

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'write-version-json',
      closeBundle() {
        writeFileSync(
          resolve(__dirname, 'dist', 'version.json'),
          JSON.stringify({ buildId: BUILD_ID, builtAt: new Date().toISOString() })
        )
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID)
  },
  base: './',
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
