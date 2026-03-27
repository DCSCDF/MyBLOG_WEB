// Nuxt 插件：在客户端初始化时设置 API 地址
import { initApiBase } from '~/utils/apiConfig';

export default defineNuxtPlugin({
  name: 'init-api',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig();
    
    // 从 runtimeConfig 获取 API 地址
    const apiBase = config.public.apiBase as string;
    
    if (apiBase) {
      initApiBase(apiBase);
    }
  }
})
