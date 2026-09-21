import { initPreferences } from '@vben/preferences';

import { overridesPreferences } from '~/preferences';

/**
 * 初始化应用偏好设置（需要最先执行）
 */
export default defineNuxtPlugin(async () => {
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION || '';
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  await initPreferences({
    namespace,
    overrides: overridesPreferences,
  });
});