<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'

const container = ref<HTMLElement | null>(null)
const startBanner = ref<ComponentPublicInstance | null>(null)
const shortIntroduction = ref<ComponentPublicInstance | null>(null)

onMounted(() => {
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
    normalizeScroll: true,
  })

  pageFadeIn(container.value)
  startBannerScrollTrigger(startBanner.value)
  shortIntroductionScrollTrigger(shortIntroduction.value)
})
</script>

<template>
  <div
    id="smooth-content"
    ref="container"
    class="index"
  >
    <StartBanner
      ref="startBanner"
      class="index__start"
    />
    <ShortIntroduction
      ref="shortIntroduction"
      class="index__introduction"
    />
  </div>
</template>

<style lang="scss" scoped>
.index {
  opacity: 0;

  &__introduction {
    margin-top: -100vh;
  }
}
</style>
