# Siding landing page

One-page, navigation-free siding lead-gen page for Global Restoration LLC, built from this repo.

- Page: `src/pages/siding-landing.astro` (layout: `src/layouts/SidingLandingLayout.astro`)
- Config (phone, URL, endpoint, service areas, FAQ): `src/lib/siding-landing.ts`
- GA4 ID (central, reusable): `src/lib/analytics.ts`
- HighLevel chat widget (reusable component): `src/components/HighLevelChatWidget.astro`
- HighLevel lead form embed (reusable component): `src/components/HighLevelForm.astro`

## Builds

| Command | Output | Purpose |
|---|---|---|
| `npm run build` | `dist/` | Full original site. `/siding-landing` is included and is `noindex` there. |
| `npm run build:siding` | `dist-siding/` | Standalone deployable: landing page at `/`, its assets, robots.txt, one-URL sitemap, 404, `_redirects`, `_headers`. No other route is published. |

Builds regenerate tracked files in `.astro/`; run `git checkout -- .astro` afterwards.

## Cloudflare Pages (siding.noza.app)

Build command `npm run build:siding`, output directory `dist-siding`, Node 20+.
Environment variables are listed in `.env.siding.example`; none are required to build.

## Before launch: owner confirmation needed

- HighLevel form "Request Free Inspection" (id `wlD5c84wGVUOv3Y1xuMH`) is a generic storm/roofing inspection form. Its SMS-consent text names **JSR Roofing & Construction LLC**, not Global Restoration LLC; its "What needs addressed?" list includes Roofing, Gutters and Structural Damage; it is titled "Free". Fix these in HighLevel (the page embeds it as-is).
- The form sends no event to the site. `generate_lead` is intentionally not implemented; HighLevel submission records are the source of truth (a thank-you redirect to a site URL would allow reliable tracking later).
- Dedicated call-tracking number (`PUBLIC_LANDING_PHONE`). Until then the page uses 888-370-9899.
- Claims copied from the existing site that need confirmation: materials (vinyl, James Hardie, LP SmartSide), "locally owned", address 616 W 3rd St, the county list.
- Not claimed anywhere (add only if true): reviews, warranties, financing, discounts, licensing, free estimates, response-time guarantees.

## SEO notes

- Temporary host: indexable, self-canonical `https://siding.noza.app/`, one-URL sitemap.
- Full-site build: `/siding-landing` is `noindex` with canonical to the temporary host, and the site sitemap still lists it. See the delivery notes for the recommended change once `globalrestorationky.us` is available.
