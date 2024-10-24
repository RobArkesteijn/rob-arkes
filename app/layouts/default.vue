<template>
  <div class="layout">
    <div class="background">
      <SmokeBackground />
      <FireParticlesBackground />
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
  height: 100%;
  width: 100%;
}
</style>
