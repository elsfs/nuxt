<script lang="ts" setup>
import { useElementPlusDesignTokens } from '@vben/hooks';

import { ElConfigProvider } from 'element-plus';

import { elementLocale } from '~/locales';

defineOptions({ name: 'App' });

useElementPlusDesignTokens();
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- 全局网络请求异常提示弹窗 -->
    <ErrorMessage />
  </ElConfigProvider>
</template>
