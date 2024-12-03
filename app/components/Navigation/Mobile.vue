<script setup lang="ts">
import navigationSlide from '@/animations/navigationSlide'

defineProps({
  items: {
    type: Array as PropType<NavigationElement[]>,
    required: true,
  },
})

const navigationActive = ref(false)
const navigationElementWrapper = ref<HTMLElement | null>(null)

const route = useRoute()

watch(() => navigationActive.value, (activeValue) => {
  navigationSlide(navigationElementWrapper.value, activeValue)
})

watch(() => route.path, () => {
  navigationActive.value = false
})
</script>

<template>
  <div class="navigation-mobile">
    <button
      class="navigation-mobile__button"
      :aria-label="navigationActive ? 'Close menu' : 'Open menu'"
      :aria-expanded="navigationActive"
      aria-controls="mobile-navigation-menu"
      @click="() => navigationActive = !navigationActive"
    >
      <Icon
        v-if="navigationActive"
        name="material-symbols:close-rounded"
      />
      <Icon
        v-else
        name="material-symbols:menu-rounded"
      />
    </button>
    <div
      id="mobile-navigation-menu"
      ref="navigationElementWrapper"
      class="navigation-mobile__element-wrapper"
    >
      <NuxtLink
        v-for="(item, index) in items"
        :key="`headerItem-${index}`"
        :to="item.link"
        class="navigation-mobile__element button"
        :class="{ 'button--active': route.path === item.link }"
      >
        <span class="navigation-mobile__element-text">
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation-mobile {
  position: relative;

  @include respond-min($tablet) {
    display: none;
  }

  &__button {
    font-size: 24px;
    display: flex;
    align-items: center;
  }

  &__element-wrapper {
    position: absolute;
    right: 0;
    top: 100px - 27px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  &__element {
    transform: translateX(calc(100% + 20px));
    opacity: 0;
  }
}
</style>
