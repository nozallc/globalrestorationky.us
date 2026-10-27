// Astro config for the standalone siding landing-page build (npm run build:siding).
// Separate from astro.config.mjs so the original site's configuration is untouched.
// The full site is built into dist-siding-full; scripts/build-siding.mjs then assembles
// dist-siding containing ONLY the landing page, so no other route is deployed.
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'url';

export default defineConfig({
  site: process.env.PUBLIC_LANDING_URL || 'https://siding.noza.app',
  trailingSlash: 'never',
  output: 'static',
  outDir: './dist-siding-full',
  build: { inlineStylesheets: 'always' },
  // No sitemap integration: the old-domain sitemap must not be generated for this build.
  integrations: [tailwind({ configFile: './tailwind.config.siding.mjs' })],
  vite: {
    resolve: {
      alias: {
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      },
    },
  },
});
