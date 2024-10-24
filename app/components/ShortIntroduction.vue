<script setup lang="ts">
onMounted(() => {
  const textLines = Array.from(document.querySelectorAll('.short-introduction__text-line')) as HTMLElement[]
  calculateTextIndext(textLines, 5)
})
</script>

<template>
  <section
    id="intro"
    class="short-introduction"
  >
    <div class="short-introduction__content-container">
      <NuxtImg
        src="/rob-arkesteijn.jpg"
        alt="Rob Arkesteijn"
        format="webp"
        quality="60"
        class="short-introduction__image"
      />
      <div class="short-introduction__text">
        <p class="short-introduction__text-line">
          <strong>Rob Arkesteijn</strong> is a Dutch Front end developer
        </p>
        <p class="short-introduction__text-line">
          Transforming Visions into Vibrant Realities
        </p>
        <p class="short-introduction__text-line">
          Innovative User Experiences
        </p>
        <p class="short-introduction__text-line">
          Designs that Speak Volumes
        </p>
        <p class="short-introduction__text-line">
          Crafting Stories through Motion
        </p>
        <p class="short-introduction__text-line">
          Empowering Brands with Impactful Design
        </p>
        <p class="short-introduction__text-line">
          Engagement Through Animation
        </p>
        <p class="short-introduction__text-line">
          A Journey in Every Click
        </p>
        <p class="short-introduction__text-line">
          Tailored Designs for Unique Brands
        </p>
        <p class="short-introduction__text-line">
          Elevating Online Presence
        </p>
        <p class="short-introduction__text-line">
          Where Creativity Meets Technology
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.short-introduction {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content-container {
    display: flex;
    flex-direction: column;

    @include respond-min($tablet) {
      flex-direction: row;
    }
  }

  &__image {
    position: relative;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
    border: solid 3px $dim-gray;
    will-change: rotate;
    rotate: -5deg;
    filter: grayscale(1) drop-shadow(5px 5px 2px $night);

    @include respond-min($tablet) {
      height: 600px;
    }
  }

  &__text {
    font-size: to-rem(18);

    @include respond-min($tablet) {
      font-size: to-rem(32);
      position: relative;
      margin-block: auto;
      top: calc(32.75px / -2);
      left: calc((52.29px / 2) * -1);
      padding-inline: 24px;
    }
  }

  &__text-line {
    text-shadow: 2px 2px 2px $night;
  }
}
</style>
