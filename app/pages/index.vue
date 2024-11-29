<script setup lang="ts">
useSeoMeta({
  title: 'Homepage',
  description: 'The website of Rob Arkesteijn, a Frontend Developer from Delft - The Netherlands',
})
</script>

<template>
  <div
    class="index"
  >
    <div class="index__container">
      <div class="index__grid-section index__grid-section--col1">
        <h1>The website of Rob Arkesteijn</h1>
      </div>
      <div class="index__grid-section index__grid-section--row1" />
      <div class="index__grid-section index__grid-section--row2" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.index {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  padding-inline: 20px;

  &__container {
    margin: auto;
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
  }

  &__grid-section {
    border-radius: 20px;
    border: 1px solid $primary;
    box-shadow: 0 0 10px 0 $night;
    background-color: rgba($night, 0.5);
    padding: 20px;
    transition: box-shadow 0.2s;

    @include hover-style {
      box-shadow: 0 0 10px 0 $scarlet;
    }

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
</style>
