
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';

export default defineConfig({
  site: 'https://www.globalrestorationky.us',
  trailingSlash: 'never',
  output: 'static',
  integrations: [tailwind(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      },
    },
  },
});
