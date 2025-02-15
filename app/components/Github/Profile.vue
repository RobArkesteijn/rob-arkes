<script setup lang="ts">
import type { User } from '@/types/Github'

defineProps({
  data: {
    type: Object as PropType<User>,
    required: true,
  },
})
</script>

<template>
  <div class="github-profile">
    <div class="github-profile__user-data">
      <NuxtImg
        v-if="data.avatar_url"
        :src="data.avatar_url"
        alt=""
        class="github-profile__user-data-image"
      />
      <div class="github-profile__user-data-content">
        <h3 v-if="data.name">
          {{ data.name }}
        </h3>
        <p
          v-if="data.location"
          class="github-profile__user-data-content-element"
        >
          <Icon
            name="material-symbols:location-on-rounded"
            size="20px"
          />
          {{ data.location }}
        </p>
        <p
          v-if="data.company"
          class="github-profile__user-data-content-element"
        >
          <Icon
            name="material-symbols:work"
            size="20px"
          />
          {{ data.company }}
        </p>
        <NuxtLink
          :src="data.html_url"
          class="github-profile__user-data-content-element github-profile__user-data-account-link"
        >
          <Icon
            name="mdi:github"
            size="20px"
          />
          Github
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.github-profile {
  display: flex;
  height: 100%;

  &__user-data {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-block: auto;

    @include respond-min($tablet) {
    flex-direction: row;
  }
  }

  &__user-data-image {
    border-radius: 20px;
    filter: grayscale(100%);
    mix-blend-mode: luminosity;
  }

  &__user-data-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-block: auto;
  }

  &__user-data-content-element {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
