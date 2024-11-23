<script setup lang="ts">
import { navigationItems } from '@/data/Navigation'

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
    <SiteLink to="/">
      <NuxtImg
        ref="logoRef"
        src="/logo.png"
        format="webp"
        quality="20"
        alt="Website logo"
        class="app-header__logo"
      />
    </SiteLink>
    <NavigationDesktop :items="navigationItems" />
    <NavigationMobile :items="navigationItems" />
    <div class="app-header__logo-size-copy" />
  </div>
</template>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  height: $header-height;
  z-index: map.get($z-index, 'header');
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  padding-inline: 20px;

  &__logo {
    transform-origin: center;
    width: 50px;

    @include respond-min($tablet) {
      width: 60px;
    }
  }

  &__logo-size-copy {
    width: 90px;

    @include respond-max($tablet) {
      display: none;
    }

    @include respond-min($tablet) {
      width: 60px;
    }
  }
}
</style>
