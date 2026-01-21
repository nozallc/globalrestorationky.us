
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';

export default defineConfig({
  site: 'https://www.globalrestorationky.us',
  trailingSlash: 'never',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap({
      // Tiered Sitemap Strategy: Prioritize by content type & update frequency
      filter: (page) => {
        // Exclude noindex pages (VCard landing pages)
        if (page.includes('/the-team/oc-vcf') || page.includes('/the-team/je-vcf')) {
          return false;
        }
        // Exclude static assets and non-canonical pages
        if (page.includes('/_astro/') || page.includes('/admin/')) {
          return false;
        }
        return true;
      },
      serialize: (item) => {
        // Priority 1.0 (Daily): Critical conversion pages + pillar authority page
        if (
          item.url === 'https://www.globalrestorationky.us/' ||
          item.url.includes('/water-damage-restoration') ||
          item.url.includes('/roofing') ||
          item.url.includes('/request-inspection') ||
          item.url.includes('/lexington-ky-roofing-storm-damage-restoration')
        ) {
          return {
            ...item,
            priority: 1.0,
            changefreq: 'daily',
          };
        }

        // Priority 0.9 (Weekly): Location hubs (all city/region pages)
        if (item.url.includes('/location/')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'weekly',
          };
        }

        // Priority 0.8 (Weekly): Service category pages
        if (item.url.includes('/services/')) {
          return {
            ...item,
            priority: 0.8,
            changefreq: 'weekly',
          };
        }

        // Priority 0.7 (Monthly): Team, secondary services
        if (
          item.url.includes('/the-team') ||
          item.url.includes('/siding') ||
          item.url.includes('/gutters') ||
          item.url.includes('/service-areas')
        ) {
          return {
            ...item,
            priority: 0.7,
            changefreq: 'monthly',
          };
        }

        // Priority 0.6 (Rarely): Contact page and other utility pages
        if (item.url.includes('/contact')) {
          return {
            ...item,
            priority: 0.6,
            changefreq: 'monthly',
          };
        }

        // Default: Low priority
        return {
          ...item,
          priority: 0.5,
          changefreq: 'monthly',
        };
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      },
    },
  },
});
