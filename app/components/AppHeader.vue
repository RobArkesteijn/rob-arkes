<script setup lang="ts">
const logoRef = ref<ComponentPublicInstance | null>(null)

const scrollRotate = () => {
  if (logoRef.value) {
    logoRef.value.$el.style.transform = `rotate(${window.scrollY / 4}deg)`
  }
}

onMounted(() => {
  window.onscroll = function () {
    scrollRotate()
  }
})
</script>

<template>
  <div class="app-header">
    <NuxtImg
      ref="logoRef"
      src="/logo.png"
      format="webp"
      quality="20"
      alt="Website logo"
      sizes="60px"
      class="app-header__logo"
    />
  </div>
</template>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  height: 100px;

  &__logo {
    padding: 20px;
    transform-origin: center;
  }
}
</style>
