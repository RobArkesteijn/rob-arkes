<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

defineProps({
  device: {
    type: String as PropType<'mobile' | 'desktop'>,
    required: true,
  },
})

const menuFooterLinks = ref<ComponentPublicInstance[] | null>(null)
const route = useRoute()

const footerLinks = [
  {
    to: '/cookies',
    label: 'Cookies',
  },
  {
    to: 'https://api.lambweston.eu/media/111/download/lwm_privacy_statement_v2018feb_001.pdf',
    label: 'Privacy',
  },
]

onMounted(() => {
  if (menuFooterLinks.value) {
    menuFooterLinks.value.forEach((item) => {
      item.$el.addEventListener('mouseenter', () => splitTextOnHover(item.$el, true))
      item.$el.addEventListener('mouseleave', () => splitTextOnHover(item.$el, false))
    })
  }
})

onUnmounted(() => {
  if (menuFooterLinks.value) {
    menuFooterLinks.value.forEach((item) => {
      item.$el.removeEventListener('mouseenter', () => splitTextOnHover(item.$el, true))
      item.$el.removeEventListener('mouseleave', () => splitTextOnHover(item.$el, false))
    })
  }
})
</script>

<template>
  <div
    class="main-navigation-footer"
    :class="[`main-navigation-footer--${device}`, `main-navigation-footer--${route.path.slice(1)}`]"
  >
    <NuxtLink
      v-for="(link, index) in footerLinks"
      :key="`footerLink-${index}`"
      ref="menuFooterLinks"
      class="main-navigation-footer__link"
      :class="{ 'main-navigation-footer__link--active': $route.fullPath === `${link.to}` }"
      :to="link.to"
    >
      {{ link.label }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.main-navigation-footer {
  $self: &;

  &--mobile {
    padding: 24px 16px;

    @include respond-min($mobile) {
      display: none;
    }
  }

  &--desktop {
    @include respond-max($mobile) {
      display: none;
    }
  }

  &__social-media {
    #{ $self }--mobile & {
      margin-bottom: 16px;
    }
  }

  &__link {
    display: block;
    font-size: to-rem(12);
    margin-top: 24px;
    color: $white;
    transition: color $transition-time;

    &--active {
      color: $daintree-600;
    }

    @include hover-style {
      color: $daintree-600;
    }
  }

  &--gravity {
    #{ $self } {
      &__link {
        color: $highlight-gravity;

        &--active {
          color: $primary-gravity;
        }

        @include hover-style {
          color: $primary-gravity;
        }
      }
    }
  }

  &--stardust {
    #{ $self } {
      &__link{
        color: $highlight-stardust;

        &--active {
          color: $primary-stardust;
        }

        @include hover-style {
          color: $primary-stardust;
        }
      }
    }
  }

  &--nebula {
    #{ $self } {
      &__link {
        color: $highlight-nebula;

        &--active {
          color: $primary-nebula;
        }

        @include hover-style {
          color: $primary-nebula;
        }
      }
    }
  }

  &--singularity {
    #{ $self } {
      &__link {
        color: $highlight-singularity;

        &--active {
          color: $primary-singularity;
        }

        @include hover-style {
          color: $primary-singularity;
        }
      }
    }
  }
}
</style>
