<script lang="ts" setup>
import { computed } from 'vue';

import { Fallback } from '@vben/common-ui';

import type { NuxtError } from '#app';

type FallbackStatus = '403' | '404' | '500' | 'coming-soon' | 'offline';

defineOptions({ name: 'FallbackNotFound' });

// 注意：error.vue 不是 pages 下的页面，definePageMeta 是编译期宏，
// 在这里调用会在运行时触发 [NUXT_E1007] 并导致错误页自身崩溃。
// 因此错误页通过 <NuxtLayout name="basic"> 复用 basic 布局外壳，
// 并把错误内容通过 #content 插槽渲染进布局的内容区。

const props = defineProps<{ error: NuxtError }>();

const statusMap: Record<number, FallbackStatus> = {
  403: '403',
  404: '404',
  500: '500',
};

const status = computed(
  (): FallbackStatus =>
    statusMap[props.error?.statusCode ?? 404] ?? '404',
);

const handleBack = () => clearError({ redirect: '/' });
</script>

<template>
  <NuxtLayout name="basic">
    <template #content>
      <Fallback :status="status">
        <template #action>
          <button class="text-sm underline" type="button" @click="handleBack">
            返回首页
          </button>
        </template>
      </Fallback>
    </template>
  </NuxtLayout>
</template>
