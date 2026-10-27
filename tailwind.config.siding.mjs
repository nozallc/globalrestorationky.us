// Tailwind config for the siding landing build: same theme as the main site, but only
// scans the landing-page files so the inlined CSS stays small.
import base from './tailwind.config.mjs';

export default {
  ...base,
  content: [
    './src/pages/siding-landing.astro',
    './src/layouts/SidingLandingLayout.astro',
    './src/components/siding-landing/**/*.astro',
  ],
};
