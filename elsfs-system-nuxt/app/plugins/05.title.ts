import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { preferences } from '@vben/preferences';

import { useTitle } from '@vueuse/core';
import { $t } from '~/locales';

/**
 * 动态更新浏览器标题
 */
export default defineNuxtPlugin(() => {
  const route = useRoute();

  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = route.meta?.title;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });
});
