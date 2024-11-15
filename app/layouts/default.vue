<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  pageFadeIn(container.value)
})
</script>

<template>
  <Html>
    <Body>
      <SpeedInsights />
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
    </Body>
  </Html>
</template>

<style scoped lang="scss">
.background {
  position: fixed;
  z-index: map.get($z-index, 'negative');
  height: 100%;
  width: 100%;
}
</style>
