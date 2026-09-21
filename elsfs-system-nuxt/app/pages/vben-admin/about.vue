<script lang="ts" setup>
import { About } from '@vben/common-ui';

defineOptions({ name: 'About' });
definePageMeta({
  layout: 'basic',
  name: 'VbenAbout',
  title: 'demos.vben.about',
  icon: 'lucide:copyright',
  order: 9999,
});
</script>

<template>
  <About />
</template>
