<template> 
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import AppLayoutDefault from '@/layouts/DefaultLayout.vue'
import {watch, shallowRef } from 'vue'
import { useRoute } from 'vue-router'

const layout = shallowRef(AppLayoutDefault)
const route = useRoute()
watch(
  () => route.meta?.layout,
  async (metaLayout) => {
    if (metaLayout) {
      layout.value = (await import(/* @vite-ignore */`@/layouts/${metaLayout}.vue`)).default
    } else {
      layout.value = AppLayoutDefault
    }
  },
  { immediate: true }
)

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}
</style>