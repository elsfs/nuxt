<script lang="ts" setup>
/**
 * /dashboard 是 preferences.app.defaultHomePath（登录后的默认跳转地址），
 * 同时也是后端菜单「仪表板」的父级路径，本身没有内容页。
 * 这里重定向到「分析页」，避免登录后直接落到 404。
 */
definePageMeta({
  name: 'Dashboard',
  redirect: '/dashboard/analytics',
  title: 'page.dashboard.title',
});
</script>

<template>
  <div />
</template>
