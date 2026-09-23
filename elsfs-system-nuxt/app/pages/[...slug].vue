<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { Fallback } from '@vben/common-ui';

/**
 * 兜底路由（catch-all）。
 *
 * 侧边菜单由后端菜单数据生成，其中包含大量尚未在本 Nuxt 应用中实现的页面
 * （如 /system/menu、/developer/table、/ai/aiModelConfig ...）。
 * 若不存在任何兜底路由，vue-router 在渲染这些菜单链接时会不断打印
 * `[VUE_ROUTER_R0004] No match found for location with path "xxx"` 警告。
 *
 * 这里注册一个通配路由，使所有未命中的路径都能正常 resolve，
 * 并展示一个友好的「页面不存在 / 尚未实现」提示。
 */
defineOptions({ name: 'CatchAllNotFound' });

definePageMeta({
  layout: 'basic',
  name: 'NotFoundCatchAll',
  title: '404',
});

const route = useRoute();
const currentPath = computed(() => route.fullPath);
</script>

<template>
  <Fallback status="404">
    <template #describe>
      <p class="my-4 max-w-md text-center text-muted-foreground">
        路径 <code class="text-foreground">{{ currentPath }}</code>
        对应的页面尚未在该 Nuxt 应用中实现，或该地址不存在。
      </p>
    </template>
  </Fallback>
</template>
