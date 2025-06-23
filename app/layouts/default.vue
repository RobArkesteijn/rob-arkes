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
        <AppHeader />
        <div class="background">
          <BackgroundSmoke />
          <BackgroundParticles />
          <BackgroundRayGradient />
        </div>
        <main id="smooth-wrapper">
          <slot />
        </main>
        <ScrollDownIndicator />
        <PauseAnimationButton />
      </div>
    </Body>
  </Html>
</template>

<style lang="scss">
main {
  >:first-child {
    padding-block: $header-height;
  }
}

.background {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}

.scroll-down-indicator {
  position: fixed;
  bottom: 20px;
  right: 50%;
}

.pause-animation-button {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
