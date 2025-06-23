export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#131112' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  build: {
    transpile: [
      'gsap',
      'three',
      '@vercel/speed-insights/nuxt',
    ],
  },

  compatibilityDate: '2025-06-23',

  css: ['@/assets/scss/app.scss'],

  devtools: { enabled: false },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  experimental: {
    buildCache: true,
    typedPages: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  image: {
    quality: 80,
  },

  imports: {
    dirs: ['animations', 'data', 'types'],
  },

  linkChecker: {
    enabled: false,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@nuxtjs/stylelint-module',
    '@nuxt/fonts',
    'nuxt-particles',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@nuxtjs/device',
  ],

  ogImage: {
    enabled: true,
  },

  routeRules: {
    '/**': { isr: true },
  },

  nitro: {
    storage: {
      recipes: {
        driver: 'fs',
        base: 'github-user',
      },
    },
  },

  site: {
    url: 'rob-arkes.vercel.app',
    name: 'RobArkes',
    indexable: false,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use 'sass:map';
          @use '@/assets/scss/helpers' as *;
          `,
          api: 'modern',
        },
      },
    },
  },
})
