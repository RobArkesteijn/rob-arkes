<script setup lang="ts">
import type { ISourceOptions as ParticlesOptions } from '@tsparticles/engine'

const options: ParticlesOptions = {
  particles: {
    number: {
      value: 600,
      density: {
        enable: true,
        width: 3000,
        height: 3000,
      },
    },
    color: {
      value: ['#ffac33', '#ff5500', '#ff6600', '#ff3300'],
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
      attract: {
        enable: false,
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      direction: 'top',
      enable: true,
      speed: 8,
      random: true,
      straight: false,
      outModes: 'out',
    },
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: false,
      },
      onClick: {
        enable: false,
      },
      resize: {
        enable: true,
      },
    },
  },
  detectRetina: true,
}
</script>

<template>
  <div class="fire-sparks-background">
    <NuxtParticles
      id="tsparticles"
      :options="options"
    />
  </div>
</template>

<style scoped lang="scss">
.fire-sparks-background {
  width: 100%;
  height: 100%;
}
</style>
