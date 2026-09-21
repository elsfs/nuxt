import { registerAccessDirective } from '@vben/access';
import { registerLoadingDirective } from '@vben/common-ui';
import '@vben/styles';
import '@vben/styles/ele';

import { ElLoading } from 'element-plus';
import { initComponentAdapter } from '~/adapter/component';
import { initSetupVbenForm } from '~/adapter/form';

/**
 * 应用初始化：组件适配器、表单、指令、tippy、motion
 * 对应原 vite 项目的 bootstrap.ts
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  const { vueApp } = nuxtApp;

  // 初始化组件适配器
  await initComponentAdapter();

  // 初始化表单组件
  await initSetupVbenForm();

  // 注册 Element Plus 提供的 v-loading 指令
  vueApp.directive('loading', ElLoading.directive);

  // 注册 Vben 提供的 v-loading 和 v-spinning 指令
  registerLoadingDirective(vueApp, {
    loading: false, // 与 Element Plus 的 v-loading 二选一，此处不再注册
    spinning: 'spinning',
  });

  // 安装权限指令
  registerAccessDirective(vueApp);

  // 初始化 tippy
  const { initTippy } = await import('@vben/common-ui/es/tippy');
  initTippy(vueApp);

  // 配置 Motion 插件
  const { MotionPlugin } = await import('@vben/plugins/motion');
  vueApp.use(MotionPlugin);
});
