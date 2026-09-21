import { initStores } from '@vben/stores';

/**
 * 初始化 pinia（含 SecureLS 持久化），必须在路由守卫/中间件之前执行
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION || '';
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  await initStores(nuxtApp.vueApp, { namespace });
});