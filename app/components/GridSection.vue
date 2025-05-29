<script setup lang="ts">
import { gsap } from 'gsap'
import type { ColorSettings } from '#build/imports'

const props = defineProps({
  colorType: {
    type: String as PropType<string>,
    required: false,
  },
})

const isActive = ref(false)
const cursor = ref<HTMLElement | null>(null)
const gridSection = ref<HTMLElement | null>(null)

const defaultColors: ComputedRef<ColorSettings> = computed(() => {
  const borderColor = gridColors('stardust').borderColor
  const cursorColor = gridColors('stardust').cursorColor
  const hoverShadowColor = gridColors('stardust').hoverShadowColor

  return {
    borderColor,
    cursorColor,
    hoverShadowColor,
  }
})

const borderColor = computed(() => {
  return gridColors(props.colorType).borderColor ?? defaultColors.value.borderColor
})

const cursorColor = computed(() => {
  return gridColors(props.colorType).cursorColor ?? defaultColors.value.cursorColor
})

const hoverShadowColor = computed(() => {
  return gridColors(props.colorType).hoverShadowColor ?? defaultColors.value.hoverShadowColor
})

const handleMouseEnter = () => {
  isActive.value = true
}

const handleMouseLeave = () => {
  isActive.value = false
}

const duration = 0.5

const updateCursorPosition = (event: MouseEvent) => {
  if (!isActive.value || !gridSection.value || !cursor.value) {
    return
  }
  const xTo = gsap.quickTo(cursor.value, 'x', {
    duration,
    ease: 'power3',
  })

  const yTo = gsap.quickTo(cursor.value, 'y', {
    duration,
    ease: 'power3',
  })
  const rect = gridSection.value.getBoundingClientRect()
  const cursorX = event.clientX - rect.left
  const cursorY = event.clientY - rect.top
  xTo(cursorX)
  yTo(cursorY)
}

onMounted(() => {
  if (!gridSection.value) return

  gridSection.value.addEventListener('mousemove', updateCursorPosition)
  gridSection.value.addEventListener('mouseenter', handleMouseEnter)
  gridSection.value.addEventListener('mouseleave', handleMouseLeave)
})

onBeforeUnmount(() => {
  if (!gridSection.value) return

  gridSection.value.removeEventListener('mousemove', updateCursorPosition)
})
</script>

<template>
  <div
    ref="gridSection"
    class="grid-section"
  >
    <div class="grid-section__background">
      <div
        ref="cursor"
        class="grid-section__cursor"
      />
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
$border-color: v-bind('borderColor');
$cursor-color: v-bind('cursorColor');
$hover-shadow-color: v-bind('hoverShadowColor');
$cursor-size: 200px;
$cursor-size-half: calc($cursor-size / 2);

.grid-section {
  $self: &;

  position: relative;
  border-radius: 20px;
  border: 1px solid $border-color;
  box-shadow: 0 0 10px 0 $night;
  background-color: rgba($night, 0.5);
  padding: 20px;
  transition: box-shadow $transition-time;
  overflow: hidden;

  @include hover-style {
    box-shadow: 0 0 10px 0 $hover-shadow-color;

    #{$self} {
      &__cursor {
        opacity: 0.2;
        box-shadow: 0 0 $cursor-size-half $cursor-size-half $cursor-color;
        width: $cursor-size;
        height: $cursor-size;
      }
    }
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__cursor {
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(15px);
    background-color: $cursor-color;
    width: 30px;
    height: 30px;
    transform-origin: 50% 50%;
    transform: translate(-50%, -50%);
    transition:
      opacity $transition-time,
      box-shadow $transition-time,
      height $transition-time,
      width $transition-time;
    opacity: 0;
  }
}
</style>
