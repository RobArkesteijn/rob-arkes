<script setup lang="ts">
const animationActive = useAnimationActive()
</script>

<template>
  <button
    :aria-label="animationActive ? 'Pause animation' : 'Continue animation'"
    aria-live="polite"
    class="pause-animation-button"
    @click="() => animationActive = !animationActive"
  >
    <Icon
      v-if="animationActive"
      class="pause-animation-button__icon"
      name="material-symbols:pause"
    />
    <Icon
      v-else
      class="pause-animation-button__icon"
      name="material-symbols:play-arrow"
    />
  </button>
</template>

<style scoped lang="scss">
.pause-animation-button {
  cursor: pointer;
  display: flex;
  border-radius: 0;
  border-color: $daintree-100;

  &__icon {
    font-size: 24px;
    color: $daintree-100;
  }
}
</style>
