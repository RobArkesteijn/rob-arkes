<script setup lang="ts">
import { gsap } from 'gsap-trial'

const scrollDownIndicator = ref<ComponentPublicInstance | null>(null)

const animationActive = useAnimationActive()
const animationId = 'scrollDownIndicator'

watch(animationActive, (active) => {
  const tween = gsap.getById(animationId)
  console.log(tween)
  if (tween) {
    if (active) {
      tween.resume()
    }
    else {
      tween.pause()
    }
  }
})

onMounted(() => {
  if (scrollDownIndicator.value) {
    const cleanup = createBounceIndicatorWithScrollFade(scrollDownIndicator.value.$el, {
      y: -15,
      duration: 1.5,
      ease: 'power2.inOut',
      id: animationId,
    })

    onBeforeUnmount(() => {
      cleanup()
    })
  }
})
</script>

<template>
  <Icon
    ref="scrollDownIndicator"
    name="material-symbols:arrow-cool-down-rounded"
    class="scroll-down-indicator"
  />
</template>

<style scoped lang="scss">
.scroll-down-indicator {
  transform: translateX(50%);
  color: $highlight-stardust;
  font-size: 60px;
}
</style>
