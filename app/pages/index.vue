<script setup lang="ts">
import { ScrollSmoother } from 'gsap/ScrollSmoother'

const firstSection = ref<Element | null>(null)
const secondSection = ref<Element | null>(null)
const index = ref<HTMLElement | null>(null)

const { data: githubData } = await useFetch('/api/github/user')

useSeoMeta({
  title: 'Enter the cosmos',
  description: 'Explore the forces that shape my creative universe. Each cosmic element reflects a different facet of my work and vision.',
})

onMounted(() => {
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
    normalizeScroll: true,
  })

  if (firstSection.value) {
    splitTextOnScroll(firstSection.value)
  }

  if (secondSection.value) {
    gridFadeIn(secondSection.value)
  }
})
</script>

<template>
  <div
    id="smooth-content"
    ref="index"
    class="index"
  >
    <div
      ref="firstSection"
      class="index__section"
    >
      <div class="index__container index__container--text content-wrapper">
        <h1 class="index__title split-text">
          Enter the cosmos
        </h1>
        <p class="index__introduction split-text">
          Explore the forces that shape my creative universe. Each cosmic element reflects a different facet of my work and vision.
        </p>
      </div>
    </div>
    <div
      ref="secondSection"
      class="index__section index__section--large"
    >
      <div class="index__container-wrapper">
        <div class="index__container index__container--grid content-wrapper">
          <GridSection
            class="index__grid-section index__grid-section--col1"
            color-type="nebula"
          />
          <GridSection
            class="index__grid-section index__grid-section--row1"
            color-type="singularity"
          >
            <GithubProfile
              v-if="githubData"
              :data="githubData"
            />
          </GridSection>
          <GridSection
            class="index__grid-section index__grid-section--row2"
            color-type="stardust"
          />
        </div>
      </div>
    </div>
    <div
      class="index__section"
    >
      <div class="index__container index__container--text content-wrapper">
        <h1 class="index__title">
          Enter the cosmos
        </h1>
        <p class="index__introduction">
          Explore the forces that shape my creative universe. Each cosmic element reflects a different facet of my work and vision.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$section-height: calc(100vh - $header-height * 2);

.index {
  $self: &;

  display: flex;
  flex-direction: column;
  gap: $header-height;
  min-height: 100vh;
  width: 100vw;

  &__section {
    height: $section-height;
    width: 100%;
    display: flex;

    &--large {
      height: calc($section-height * 4);

      #{ $self } {
        &__container-wrapper {
          height: $section-height;
          width: 100%;
          display: flex;
        }
      }
    }
  }

  &__container {
    margin: auto;
    position: relative;

    &--grid {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1fr;
      grid-template-areas:
          "col1"
          "row1"
          "row2";
      height: 600px;
      width: 100%;
      max-width: 1250px;
      gap: 20px;

      @include respond-min($tablet) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "col1 row1"
          "col1 row2";
      }

      #{ $self} {
        &__grid-section {
          &--col1 {
            grid-area: col1;
            grid-row: span 9;
          }

          &--row1 {
            grid-area: row1;
            grid-row: span 4;
          }

          &--row2 {
            grid-area: row2;
            grid-row: span 5;
          }
        }
      }
    }

    &--text {
      text-align: center;
    }
  }

  &__introduction {
    font-size: to-rem(16);
  }
}
</style>
