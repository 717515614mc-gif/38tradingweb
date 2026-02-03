import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  console.log('当前模式:', mode)
  console.log('VITE_API_BASE_URL:', env.VITE_API_BASE_URL)
  
  // 为构建环境设置默认值
  const apiBaseUrl = env.VITE_API_BASE_URL || 'http://demo01-222374-8-1400573097.sh.run.tcloudbase.com'
  
  return {
    plugins: [vue()],
    
    // 只在开发服务器配置代理
    ...(command === 'serve' ? {
      server: {
        port: 3000,
        proxy: {
          '/api': {
            target: apiBaseUrl,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api')
          }
        }
      }
    } : {}),
    
    // 生产环境构建时的 base URL 配置
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  }
})
