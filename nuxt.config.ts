// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@ant-design-vue/nuxt', '@pinia/nuxt'],
  
  // 运行时配置
  runtimeConfig: {
    // 仅在服务端可见
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8088'
    }
  },
  
  // SSR 配置
  ssr: true,
  
  // Vite 开发服务器代理配置
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8088',
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})