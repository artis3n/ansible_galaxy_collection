import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Jest-like globals
    globals: true,
    // Environment
    environment: 'node',
    // Include below if you want code coverage
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
    },
  },
})
