<script setup lang="ts">
import { gsap } from 'gsap-trial'
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import type { ComponentPublicInstance } from 'vue'
import type { RouteLocationAsRelativeGeneric, RouteLocationAsPathGeneric } from '#vue-router'

defineProps({
  items: {
    type: Array as PropType<NavigationElement[]>,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()
const { isMobile } = useDevice()
const menuActive = ref(false)
const panelWrapper = ref<HTMLElement | null>(null)
const itemCards = ref<HTMLElement[] | null>(null)
const menuItems = ref<ComponentPublicInstance[] | null>(null)

interface PanelItem {
  label: string
  link: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}

const panelItems: PanelItem[] = [
  {
    label: 'about',
    link: '/about',
  },
  {
    label: 'projects',
    link: '/projects',
  },
  {
    label: 'techniques',
    link: '/techniques',
  },
  {
    label: 'contact',
    link: '/contact',
  },
]

router.beforeEach(() => {
  menuActive.value = false
})

const animationDuration = 0.2
let scrollPosition = 0

const onEnter = () => {
  const tl = gsap.timeline({ delay: animationDuration })

  scrollPosition = window.scrollY

  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.disable()
  })

  tl.to(['main', '.scroll-down-indicator'], {
    duration: animationDuration,
    opacity: 0,
  })

  tl.fromTo(panelWrapper.value,
    {
      x: '-100%',
    },
    {
      x: 0,
      opacity: 1,
      duration: animationDuration,
    },
  )

  tl.fromTo(itemCards.value,
    {
      opacity: 0,
      scale: 0,
    },
    {
      duration: animationDuration,
      opacity: 1,
      scale: 1,
      stagger: {
        amount: animationDuration,
        grid: [2, 3],
        ease: 'none',
        from: 'start',
      },
    },
  )
}

const onLeave = () => {
  const tl = gsap.timeline({ delay: animationDuration })

  window.scrollTo(0, scrollPosition)

  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.enable()
  })

  tl.to(itemCards.value, {
    duration: animationDuration,
    opacity: 0,
    scale: 0,
    stagger: {
      amount: animationDuration,
      grid: [2, 3],
      ease: 'none',
      from: 'end',
    },
  })

  tl.to(panelWrapper.value, {
    x: '-100%',
    duration: animationDuration,
  })

  tl.to(['main', '.scroll-down-indicator'], {
    opacity: 1,
    duration: animationDuration,
  })
}

watch(() => menuActive.value, (active) => {
  if (active) {
    onEnter()
  }
  else {
    onLeave()
  }
})

onMounted(() => {
  const mobileCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting)
    })
  },
  {
    threshold: 1,
  })

  if (menuItems.value) {
    menuItems.value.forEach((item) => {
      item.$el.addEventListener('mouseenter', () => splitTextOnHover(item.$el, true))
      item.$el.addEventListener('mouseleave', () => splitTextOnHover(item.$el, false))
    })
  }

  watch(() => menuActive.value, async (newValue) => {
    if (newValue && isMobile) {
      await nextTick()
      if (itemCards.value) {
        itemCards.value.forEach((card) => {
          mobileCardObserver.observe(card)
        })
      }
    }
  })
})

onUnmounted(() => {
  if (menuItems.value) {
    menuItems.value.forEach((item) => {
      item.$el.removeEventListener('mouseenter', () => splitTextOnHover(item.$el, true))
      item.$el.removeEventListener('mouseleave', () => splitTextOnHover(item.$el, false))
    })
  }
})
</script>

<template>
  <div
    class="main-navigation"
    :class="[{ 'main-navigation--active': menuActive }, `main-navigation--${route.path.slice(1)}`]"
  >
    <button
      id="navigationButton"
      :aria-expanded="menuActive"
      aria-haspopup="true"
      :aria-label="'button'"
      class="main-navigation__button button button--stardust"
      data-test="navigation-button"
      @click="() => menuActive = !menuActive"
    >
      <Icon
        name="mdi:window-close"
        class="main-navigation__button-icon main-navigation__button-icon--close"
      />
      <Icon
        name="mdi:menu"
        class="main-navigation__button-icon main-navigation__button-icon--hamburger"
      />
    </button>

    <div
      class="main-navigation__container"
      aria-labelledby="navigationButton"
      data-test="navigation-menu"
      :tabindex="menuActive ? 0 : -1"
    >
      <div
        class="main-navigation__menu"
      >
        <div
          ref="panelWrapper"
          class="main-navigation__panel-wrapper"
        >
          <div class="main-navigation__panel">
            <div class="main-navigation__panel-list">
              <NuxtLink
                v-for="(item, index) in panelItems"
                :key="`panelItem-${index}`"
                ref="menuItems"
                :to="item.link"
                class="main-navigation__panel-list-item heading"
                :class="{ 'main-navigation__panel-list-item--active': $route.fullPath === router.resolve(item.link).fullPath }"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
            <NavigationMainFooter device="desktop" />
          </div>
        </div>
        <div
          class="main-navigation__items-wrapper"
        >
          <div class="main-navigation__items">
            <div
              v-for="(item, index) in items"
              :key="`item-card-${index}`"
              ref="itemCards"
              class="main-navigation__item-card-wrapper"
              :class="[{ 'main-navigation__item-card-wrapper--active': $route.path === item.link }]"
            >
              <NuxtLink
                :to="item.link"
                class="main-navigation__item-card"
              >
                <span class="main-navigation__item-card-title heading">
                  {{ item.label }}
                </span>
                <div
                  v-if="item.image"
                  class="main-navigation__item-card-image-wrapper"
                >
                  <NuxtImg
                    :src="item.image"
                    class="main-navigation__item-card-image"
                  />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <NavigationMainFooter device="mobile" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-navigation {
  $self: &;

  &__button {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: map.get($z-index, 'positive');
    background-color: $night;
    border-color: $highlight-stardust;

    @include respond-max($mobile) {
      padding-inline: 16px;
    }

    @include hover-style {
      border-color: $daintree-200;
    }

    #{ $self } {
      &__button-icon {
        &--close {
          display: none;
        }
      }
    }
  }

  &__container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }

  &__menu {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    @include respond-min($mobile) {
      flex-direction: row;
    }

    #{ $self } {
      &__panel-wrapper {
        transform: translateX(-100%);
        background-color: $night;

        @include respond-max($mobile) {
          height: 50%;
        }

        @include respond-min($mobile) {
          filter: drop-shadow(-8px 0 10px $black);
          min-width: 25%;
        }
      }

      &__panel {
        height: 100%;
        padding-inline: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-block: $header-height 34px;

        @include respond-min($tablet) {
          padding-top: $header-height;
          padding-inline: 40px;
        }
      }

      &__panel-list {
        font-size: to-rem(18);
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-block: auto;

        @include respond-min($desktop) {
          font-size: to-rem(24);
          gap: 30px;
        }
      }

      &__panel-list-item {
        color: $daintree-50;
        text-decoration: none;
        transition: color $transition-time;

        &--active {
          color: $daintree-500;
        }

        @include hover-style {
          color: $daintree-500;
        }
      }

      &__panel-list-item-icon-wrapper {
        border-radius: 50%;
        border: solid 2px $white;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 34px;
        height: 34px;
      }

      &__items-wrapper {
        flex-grow: 1;
        overflow-x: scroll;
        scrollbar-width: none;

        @include respond-min($mobile) {
          padding-top: $header-height;
        }

        &::-webkit-scrollbar {
          display: none;
        }

        @include respond-min($mobile) {
          overflow-y: auto;
        }
      }

      &__items {
        display: flex;
        height: 100%;

        @include respond-max($mobile) {
          gap: 10px;
        }

        @include respond-min($mobile) {
          display: grid;
          grid-template-columns: 1fr;
          grid-auto-rows: calc(50% - $header-height / 2);
        }

        @include respond-min($tablet) {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      &__item-card-wrapper {
        transition: background-color $transition-time;
        padding-block: 20px;
        opacity: 0;

        &.is-visible,
        &--active {
          #{$self} {
            &__item-card-image {
               scale: 1.1;
            }
          }
        }

        @include hover-style {
          #{$self} {
            &__item-card-image {
              scale: 1.1;
            }
          }
        }

        &.is-visible {
          background-color: $night;
        }
      }

      &__item-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: background-color $transition-time;
        text-decoration: none;
        height: 100%;
        min-width: 240px;

        @include respond-min($mobile) {
          min-width: 240px;
        }
      }

      &__item-card-title {
        color: $white;
        font-size: to-rem(18);
        text-align: center;

        @include respond-min($tablet) {
          font-size: to-rem(24);
        }
      }

      &__item-card-image-wrapper {
        margin: auto;
        height: 60%;

        @include respond-min($mobile) {
          height: 70%;
        }
      }

      &__item-card-image {
        margin-inline: auto;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 0 20px $black);
        transition: scale $transition-time;
      }
    }
  }

  &--active {
    #{ $self }__container {
      pointer-events: auto;
      overflow-y: hidden;
    }

    #{ $self }__button-icon {
      &--close {
        display: block;
      }

      &--hamburger {
        display: none;
      }
    }
  }

  &--gravity {
    #{ $self } {
      &__panel-list-item {
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
      &__panel-list-item {
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
      &__panel-list-item {
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
      &__panel-list-item {
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
