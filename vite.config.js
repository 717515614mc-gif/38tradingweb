import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://demo01-222374-8-1400573097.sh.run.tcloudbase.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  
  // 明确指定构建时的 base URL
  base: './',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
