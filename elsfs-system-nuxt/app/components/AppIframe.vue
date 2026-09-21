<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();

defineOptions({ name: 'AppIframe' });
</script>

<template>
  <div class="size-full">
    <iframe
      :src="(route.meta.link as string) || ''"
      class="size-full border-0"
    ></iframe>
  </div>
</template>