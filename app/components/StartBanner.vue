<template>
  <section
    id="start"
    class="start-banner"
  >
    <h1
      class="start-banner__title"
    >
      <span
        v-for="letter in 'Rob-Arkes'.split('')"
        :key="`animation-${letter}`"
        class="start-banner__title-letter"
      >
        {{ letter }}
      </span>
    </h1>
    <h2
      class="start-banner__subtitle"
    >
      The Showcase
    </h2>
  </section>
</template>

<style lang="scss" scoped>
.start-banner {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title {
    font-size: 80px;
    font-weight: 700;
    text-align: center;
    text-shadow: 0 0 10px $night;

    @include respond-min($tablet) {
      font-size: 150px;
    }
  }

  &__title-letter {
    display: inline-block;
  }

  &__subtitle {
    font-size: 32px;
    font-weight: 700;
    text-shadow: 0 0 5px $night;

    @include respond-min($tablet) {
      font-size: 48px;
    }
  }
}
</style>
