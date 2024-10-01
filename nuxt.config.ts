// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  css: ['@/assets/scss/app.scss'],

  devtools: { enabled: true },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@nuxtjs/stylelint-module',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "./app/assets/scss/base/_colors.scss";
          @import "./app/assets/scss/helpers/_variables.scss";
          @import "./app/assets/scss/helpers/_mixins.scss";
          @import "./app/assets/scss/helpers/_functions.scss";
          `,
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },
})
