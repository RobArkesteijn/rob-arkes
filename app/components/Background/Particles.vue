<script setup lang="ts">
import type { ISourceOptions as ParticlesOptions, Container } from '@tsparticles/engine'

const particlesContainer = ref<Container | null>(null)

const animationActive = useAnimationActive()

const options: ParticlesOptions = {
  particles: {
    number: {
      value: 800,
      density: {
        enable: true,
        width: 3000,
        height: 3000,
      },
    },
    collisions: {
      enable: true,
      mode: 'bounce',
    },
    color: {
      value: ['#d9c2ff', '#3a405a', '#ff1f8f', '#1b1a55'],
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: { min: 0.1, max: 0.8 },
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
    },
    size: {
      value: { min: 0.5, max: 2 },
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 2,
      path: {
        enable: true,
        options: {
          type: 'circle',
          radius: 300,
        },
      },
      angle: {
        value: 360,
        offset: 0,
      },
      outModes: {
        default: 'bounce',
      },
      random: false,
      straight: false,
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: {
        enable: true,
        mode: 'attract',
      },
      onClick: {
        enable: true,
        mode: 'push',
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      attract: {
        distance: 300,
        duration: 0.5,
        speed: 1,
        factor: 5,
        maxSpeed: 5,
      },
      push: {
        quantity: 4,
      },
      explode: {
        particles: {
          shape: {
            type: 'star',
          },
          opacity: {
            value: { min: 0.5, max: 1 },
            animation: {
              enable: true,
              speed: 3,
              sync: false,
            },
          },
          size: {
            value: { min: 3, max: 6 },
            animation: {
              enable: true,
              speed: 4,
              sync: false,
              startValue: 'min',
              destroy: 'max',
            },
          },
        },
        rate: {
          quantity: 5,
          delay: 0.1,
        },
        life: {
          duration: 0.4,
          count: 1,
        },
      },
    },
  },
  detectRetina: true,
}

watch(animationActive, (active) => {
  if (particlesContainer.value) {
    if (active) {
      particlesContainer.value.play()
    }
    else {
      particlesContainer.value.pause()
    }
  }
})
</script>

<template>
  <div class="fire-sparks-background">
    <NuxtParticles
      id="tsparticles"
      :options="options"
      @load="(container) => particlesContainer = container"
    />
  </div>
</template>

<style scoped lang="scss">
.fire-sparks-background {
  width: 100%;
  height: 100%;
}
</style>
