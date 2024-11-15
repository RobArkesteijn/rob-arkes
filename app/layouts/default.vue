<script setup lang="ts">
const container = ref<HTMLElement | null>(null)

onMounted(() => {
  pageFadeIn(container.value)
})
</script>

<template>
  <div
    ref="container"
    class="layout"
  >
    <div class="background">
      <BackgroundSmoke />
      <BackgroundParticles />
    </div>
    <AppHeader />
    <main
      id="smooth-wrapper"
    >
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.background {
  position: fixed;
  z-index: map.get($z-index, 'negative');
  height: 100%;
  width: 100%;
}
</style>
