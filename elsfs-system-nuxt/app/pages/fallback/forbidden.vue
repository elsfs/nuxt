<script lang="ts" setup>
import { Fallback } from '@vben/common-ui';

defineOptions({ name: 'Fallback403Demo' });
definePageMeta({ layout: 'basic', name: 'FallbackForbidden', title: '403' });
</script>

<template>
  <Fallback status="403" />
</template>
