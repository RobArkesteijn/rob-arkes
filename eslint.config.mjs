import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    rules: {
      'nuxt/nuxt-config-keys-order': 'off',
      'nuxt/prefer-import-meta': 'error',
    },
  },
)
