import { preferences } from '@vben/preferences';

import { setupI18n } from '~/locales';

/**
 * 国际化 i18n 配置
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  await setupI18n(nuxtApp.vueApp, {
    defaultLocale: preferences.app.locale,
  });
});