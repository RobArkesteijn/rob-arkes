<script setup lang="ts">
import gsap from 'gsap'

onMounted(() => {
  const lightRays = document.querySelector('.light-rays') as SVGElement
  gsap.set(lightRays, { translateY: '-50%', translateX: '-50%' })
  gsap.fromTo(
    lightRays,
    { scale: 1, opacity: 0.3, rotate: 0 },
    {
      scale: 1.2,
      opacity: 0.5,
      rotate: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    },
  )
})
</script>

<template>
  <svg
    class="light-rays"
    viewBox="0 0 500 500"
  >
    <defs>
      <radialGradient id="rayGradient">
        <stop
          offset="0%"
          stop-color="rgb(255,255,255,0.8)"
        />
        <stop
          offset="100%"
          stop-color="rgba(255,255,255,0)"
        />
      </radialGradient>
    </defs>
    <circle
      cx="250"
      cy="250"
      r="200"
      fill="url(#rayGradient)"
      opacity="0.5"
    />
  </svg>
</template>

<style scoped lang="scss">
.light-rays {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
