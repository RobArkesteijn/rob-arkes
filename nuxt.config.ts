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

  compatibilityDate: '2024-11-02',

  css: ['@/assets/scss/app.scss'],

  devtools: { enabled: false },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  googleFonts: {
    families: {
      Aboreto: [400],
    },
    display: 'swap',
  },

  imports: {
    dirs: ['animations', 'data', 'types'],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts',
    'nuxt-particles',
    '@nuxt/icon',
    '@nuxtjs/seo',
  ],

  ogImage: {
    enabled: false,
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
