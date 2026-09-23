<script lang="ts" setup>
import { computed } from 'vue';

import { Fallback } from '@vben/common-ui';

import type { NuxtError } from '#app';

type FallbackStatus = '403' | '404' | '500' | 'coming-soon' | 'offline';

defineOptions({ name: 'FallbackNotFound' });

definePageMeta({ layout: 'basic'});

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
  <div class="flex h-screen w-full items-center justify-center">
    <Fallback :status="status" />
    <button class="text-sm underline" type="button" @click="handleBack">
      Back to home
    </button>
  </div>
</template>
