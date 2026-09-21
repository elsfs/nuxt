import {ViteConfig} from "@nuxt/schema";
import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

import { tailwindReferencePlugin } from './tailwind-reference';


const appConfig = {
  head: {
    title: 'Vben Admin Ele Nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      {
        name: 'description',
        content: 'A Modern Back-end Management System (Nuxt)',
      },
    ],
    link: [{ rel: 'icon', href: '/favicon.ico' }],
  },
};

const runtimeConfig = {
  public: {
    apiURL: '/api',
    appNamespace: 'vben-web-ele-nuxt',
    appTitle: 'Vben Admin Ele Nuxt',
    appVersion: '',
  },
};

const viteConfig = {
  plugins: [tailwindReferencePlugin(), tailwindcss()],
  define: {
    'import.meta.env.VITE_APP_TITLE': JSON.stringify('Vben Admin Ele Nuxt'),
    'import.meta.env.VITE_APP_NAMESPACE': JSON.stringify('vben-web-ele-nuxt'),
    'import.meta.env.VITE_APP_STORE_SECURE_KEY': JSON.stringify('please-replace-me-with-your-own-key'),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(''),
    'import.meta.env.VITE_GLOB_API_URL': JSON.stringify(process.env.NUXT_PUBLIC_API_URL || '/api'),
  },
}as  ViteConfig;

/**
 * Nuxt 配置
 * - ssr:false 纯前端渲染，保证 @vben/* 中依赖 localStorage/window 的代码可用
 * - srcDir 指向 app 目录
 */
export default defineNuxtConfig({
  compatibilityDate: '2026-08-20',
  ssr: false,
  devtools: { enabled: false },
  // Element Plus 官方 Nuxt 模块：按需自动导入组件/指令/图标/样式与方法
  modules: ['@element-plus/nuxt'],
  elementPlus: {
    // unplugin-element-plus 原默认 importStyle 为 css，这里保持一致
    importStyle: 'css',
  },
  srcDir: 'app',
  typescript: {
    typeCheck: false,
  },
  app: appConfig,

  devServer: {
    port: 5778,
  },
  runtimeConfig,
  nitro: {
    // 用 routeRules 做前缀代理：保留请求方法/请求体/原始路径(/api/**)。
    // backend-mock(PORT=5320) 的端点在 /api 命名空间下(/api/auth/login 等)，
    // target 里显式带上 /api/** 以完成路径透传(等效 target+'/**' 捕获组回填)。
    // 注：nitro.devProxy 在当前版本会丢失转发路径，已弃用该方案。
    routeRules: {
      '/api/**': { proxy: 'http://localhost:6002/**' },
    },
  },
  // 全局设计令牌/CSS 变量与 reset（--background 等）、Element Plus 覆写，
  // 最后是 Tailwind v4 入口(preflight/utilities/@source 扫描)。
  css: ['@vben/styles', '@vben/styles/ele', '@vben/tailwind-config/theme'],
  vite: viteConfig,
});
