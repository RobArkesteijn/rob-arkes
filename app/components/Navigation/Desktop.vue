<script setup lang="ts">
defineProps({
  items: {
    type: Array as PropType<NavigationElement[]>,
    required: true,
  },
})

const route = useRoute()
</script>

<template>
  <div class="navigation-desktop">
    <NuxtLink
      v-for="(item, index) in items"
      :key="`headerItem-${index}`"
      :to="item.link"
      class="navigation-desktop__element button"
      :class="{ 'button--active': route.path === item.link }"
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.navigation-desktop {
  position: relative;
  display: flex;
  gap: 20px;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 150%;
    left: -25%;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(
      to right,
      transparent,
      $blaze-orange 7.5%,
      $blaze-orange 92.5%,
      transparent
    );
    z-index: map.get($z-index, 'negative');
  }

  @include respond-max($tablet) {
    display: none;
  }
}
</style>
