<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  pageFadeIn(container.value)
})
</script>

<template>
  <Html lang="en">
    <Body>
      <OgImageScreenshot />
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
        <main>
          <slot />
        </main>
        <PauseAnimationButton class="pause-animation-button" />
      </div>
    </Body>
  </Html>
</template>

<style scoped lang="scss">
main >:first-child {
  padding-block: $header-height;
}

.background {
  position: fixed;
  z-index: map.get($z-index, 'negative');
  height: 100%;
  width: 100%;
}

.pause-animation-button {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
