<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity $transition-time;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
