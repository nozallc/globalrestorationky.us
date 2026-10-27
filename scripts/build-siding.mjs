// Builds the siding landing page as a standalone deployable (dist-siding/).
//   npm run build:siding
// Cloudflare Pages: build command `npm run build:siding`, output directory `dist-siding`.
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const FULL = 'dist-siding-full';
const OUT = 'dist-siding';
const SITE = (process.env.PUBLIC_LANDING_URL || 'https://siding.noza.app').replace(/\/+$/, '');

const build = spawnSync(process.execPath, ['node_modules/astro/astro.js', 'build', '--config', 'astro.config.siding.mjs'], {
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_SIDING_TARGET: '1', PUBLIC_LANDING_URL: SITE },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const page = join(FULL, 'siding-landing', 'index.html');
if (!existsSync(page)) throw new Error(`Expected ${page} was not produced`);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Landing page becomes the homepage.
cpSync(page, join(OUT, 'index.html'));

// Copy only the /_astro/ assets reachable from the page (and from the CSS/JS it references).
const seen = new Set();
const queue = [readFileSync(page, 'utf8')];
while (queue.length) {
  for (const [ref] of queue.pop().matchAll(/\/_astro\/[A-Za-z0-9._-]+/g)) {
    if (seen.has(ref)) continue;
    seen.add(ref);
    const src = join(FULL, ref);
    if (!existsSync(src)) throw new Error(`Referenced asset missing: ${ref}`);
    mkdirSync(dirname(join(OUT, ref)), { recursive: true });
    cpSync(src, join(OUT, ref));
    if (/\.(css|js)$/.test(ref)) queue.push(readFileSync(src, 'utf8'));
  }
}

cpSync(join(FULL, 'favicon.svg'), join(OUT, 'favicon.svg'));

writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE}/</loc></url>\n</urlset>\n`,
);
// An explicit 404 stops Cloudflare Pages from serving the landing page (HTTP 200) at every unknown URL.
writeFileSync(
  join(OUT, '404.html'),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found</title></head><body style="font-family:system-ui,sans-serif;text-align:center;padding:3rem 1rem"><h1>Page not found</h1><p><a href="/">Go to the Global Restoration siding page</a></p></body></html>\n`,
);
// Scoped to this build only; the original site's public/_redirects is not involved.
writeFileSync(join(OUT, '_redirects'), '/siding-landing / 301\n/siding-landing/ / 301\n');
writeFileSync(
  join(OUT, '_headers'),
  `/_astro/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`,
);

console.log(`\nStandalone landing page ready in ${OUT}/ (${seen.size} assets) for ${SITE}`);
