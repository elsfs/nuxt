/**
 * 抑制 Nuxt dev 下的 [NUXT_E4011] 误报。
 *
 * 本应用使用了 @vben/layouts 的 BasicLayout：它的内容区
 * (packages/effects/layouts/src/basic/content/content.vue) 自行渲染
 * <RouterView>，不会消费 <NuxtPage /> 所在的默认插槽。
 * 因此 Nuxt 会误判「项目有 pages 但没有使用 <NuxtPage />」。
 *
 * 实际上页面是由 vben 的 <RouterView> 正常渲染的（同时保留了 vben 自身的
 * keep-alive / 过渡 / 标签页联动），所以这里直接把「页面已使用」标记为 true，
 * 以消除该误报，避免污染控制台。
 *
 * 说明：若后续改为由 <NuxtPage /> 直接承载页面，可删除本插件。
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.dev) {
    (nuxtApp as unknown as { _isNuxtPageUsed?: boolean })._isNuxtPageUsed =
      true;
  }
});
