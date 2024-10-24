export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

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

  googleFonts: {
    families: {
      Merienda: [400, 700, 900],
    },
    display: 'swap',
  },

  imports: {
    dirs: ['animations'],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts',
    'nuxt-particles',
  ],

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
