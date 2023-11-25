import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// config dos alias do paths
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/modules/**/use-cases', 'prisma']],
  },
})
