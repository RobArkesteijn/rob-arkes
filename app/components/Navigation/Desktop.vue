<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

defineProps({
  items: {
    type: Array as PropType<NavigationElement[]>,
    required: true,
  },
})

const navigationDestkopContainer = ref<HTMLElement | null>(null)
const navigationElements = ref<ComponentPublicInstance[] | null>(null)
const backgroundLine = ref<string>('')

const route = useRoute()

const getNavigationBackgroundLine = (elements: ComponentPublicInstance[], container: HTMLElement) => {
  const containerWidth = container.offsetWidth
  const containerWidthPseudo = container.offsetWidth * 1.5
  const blazeOrange = '#ff6600'

  const buttonWidths: number[] = []
  const gradientStops: string[] = []

  gradientStops.push()

  elements.forEach((el) => {
    const buttonWidth = el.$el.offsetWidth
    buttonWidths.push(buttonWidth)
  })

  let previousWidth: number = 0
  let previousStart: number = 0
  buttonWidths.forEach((width) => {
    const start = previousStart ? previousStart + previousWidth + 20 : (containerWidthPseudo - containerWidth) / 2
    const end = start + width
    previousWidth = width
    previousStart = start

    gradientStops.push(`${blazeOrange} ${start}px`)
    gradientStops.push(`transparent ${start}px`)
    gradientStops.push(`transparent ${end}px`)
    gradientStops.push(`${blazeOrange} ${end}px`)
  })

  const gradient = `linear-gradient(
    to right,
    transparent,
    ${blazeOrange} 7.5%,
    ${gradientStops.join(', ')},
    ${blazeOrange} 92.5%,
    transparent
  )`

  return gradient
}

onMounted(() => {
  if (navigationDestkopContainer.value
    && navigationElements.value
    && navigationElements.value.length > 0
  ) {
    backgroundLine.value = getNavigationBackgroundLine(navigationElements.value, navigationDestkopContainer.value)
  }
})
</script>

<template>
  <div
    ref="navigationDestkopContainer"
    class="navigation-desktop"
    :style="{ '--background-line': backgroundLine }"
  >
    <NuxtLink
      v-for="(item, index) in items"
      :key="`headerItem-${index}`"
      ref="navigationElements"
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
    background: var(--background-line);
    z-index: map.get($z-index, 'negative');
  }

  @include respond-max($tablet) {
    display: none;
  }
}
</style>
