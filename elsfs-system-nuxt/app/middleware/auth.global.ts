import type { RouteRecordRaw } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { generateMenus } from '@vben/utils';

import {    getAllMenusApi } from '@vben/api-types';

import { useAuthStore } from '~/store';

/**
 * 无需权限拦截的基本路由（认证相关页面）
 */
const coreRouteNames = [
  'Root',
  'Login',
  'CodeLogin',
  'QrCodeLogin',
  'ForgetPassword',
  'Register',
];

/**
 * 全局认证/权限守卫
 * 替代原 vite 项目中的 router/guard.ts + router/access.ts
 * Nuxt 使用文件式路由，因此这里不再动态注入路由，只负责：
 * 1. token 校验与登录页跳转
 * 2. 拉取用户信息、权限码、菜单并写入 store（用于侧边菜单渲染）
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const authStore = useAuthStore();

  // 根路径重定向到默认首页
  if (to.path === '/') {
    return navigateTo(preferences.app.defaultHomePath, { replace: true });
  }

  // 基本路由，不需要进入权限拦截
  if (coreRouteNames.includes(to.name as string)) {
    if (to.path === LOGIN_PATH && accessStore.accessToken) {
      const redirect = (to.query?.redirect as string) || '';
      return navigateTo(
        decodeURIComponent(
          redirect ||
            userStore.userInfo?.homePath ||
            preferences.app.defaultHomePath,
        ),
        { replace: true },
      );
    }
    return;
  }

  // accessToken 检查
  if (!accessStore.accessToken) {
    // 明确声明忽略权限访问权限，则可以访问
    if (to.meta.ignoreAccess) {
      return;
    }

    // 没有访问权限，跳转登录页面
    if (to.fullPath !== LOGIN_PATH) {
      return navigateTo({
        path: LOGIN_PATH,
        // 携带当前跳转的页面，登录后重新跳转该页面
        query:
          to.fullPath === preferences.app.defaultHomePath
            ? {}
            : { redirect: encodeURIComponent(to.fullPath) },
        replace: true,
      });
    }
    return;
  }

  // 是否已经生成过菜单/权限
  if (accessStore.isAccessChecked) {
    return;
  }

  // 获取用户信息、权限码、菜单
  const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
  const [ menuRoutes] = await Promise.all([
    getAllMenusApi(),
  ]);

  userStore.setUserInfo(userInfo);
  accessStore.setIsAccessChecked(true);

  // 生成菜单（文件式路由，无需动态注入路由到 vue-router）
  const accessibleMenus = generateMenus(
    menuRoutes as unknown as RouteRecordRaw[],
    useRouter(),
  );
  accessStore.setAccessMenus(accessibleMenus);
});
