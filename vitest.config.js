import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
import { describe } from 'vitest';

export default mergeConfig(
  viteConfig,
  describe,
  defineConfig({
    test: {
      environment: 'jsdom',
      globas: true,
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
