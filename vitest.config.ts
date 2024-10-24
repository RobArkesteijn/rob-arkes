import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    dir: './test',
    environment: 'nuxt',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
})
