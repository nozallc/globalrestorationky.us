/**
 * Siding landing page configuration (single source of truth).
 *
 * Everything that changes between the temporary siding.noza.app deployment and a
 * future globalrestorationky.us deployment lives here or in PUBLIC_* env vars.
 * See .env.siding.example for the variables Cloudflare Pages needs.
 */
import { SITE } from './site';
import { GA4_MEASUREMENT_ID } from './analytics';

const env = import.meta.env;

/** True only for the `build:siding` target (astro.config.siding.mjs). */
export const IS_SIDING_BUILD = env.PUBLIC_SIDING_TARGET === '1';

/** Public origin of this landing page. Canonical, og:url, schema and sitemap derive from it. */
export const LANDING_URL = (env.PUBLIC_LANDING_URL || 'https://siding.noza.app').replace(/\/+$/, '');

/**
 * Landing-page phone number. Defaults to the existing company number (SITE.phone);
 * set PUBLIC_LANDING_PHONE to the HighLevel tracking number when it is provided.
 * Any common format is accepted ("859-555-0100", "(859) 555-0100", "+18595550100").
 */
function parsePhone(raw: string) {
  const digits = raw.replace(/\D/g, '');
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (ten.length !== 10) {
    throw new Error(`PUBLIC_LANDING_PHONE must be a 10-digit US number, got "${raw}"`);
  }
  return {
    display: `${ten.slice(0, 3)}-${ten.slice(3, 6)}-${ten.slice(6)}`,
    tel: `+1${ten}`,
  };
}

const phone = parsePhone(env.PUBLIC_LANDING_PHONE?.trim() || SITE.phone);

export const LANDING = {
  business: SITE.name,
  address: SITE.addressLine,
  phoneDisplay: phone.display,
  phoneTel: phone.tel,
  telHref: `tel:${phone.tel}`,
  /** Real company number, used in structured data so NAP stays consistent when a tracking number is on the page. */
  schemaTel: SITE.tel,
  url: LANDING_URL,
  // Central ID (src/lib/analytics.ts). Deliberately NOT PUBLIC_GA_MEASUREMENT_ID, which the legacy site layout uses.
  ga4Id: (env.PUBLIC_LANDING_GA4_ID || GA4_MEASUREMENT_ID).trim(),
  adsId: (env.PUBLIC_GOOGLE_ADS_ID || '').trim(),
  adsCallLabel: (env.PUBLIC_GOOGLE_ADS_CALL_LABEL || '').trim(),
} as const;

/** County -> principal city, as supplied by the owner. */
export const SERVICE_AREAS = [
  { county: 'Fayette', city: 'Lexington' },
  { county: 'Scott', city: 'Georgetown' },
  { county: 'Jessamine', city: 'Nicholasville' },
  { county: 'Woodford', city: 'Versailles' },
  { county: 'Franklin', city: 'Frankfort' },
  { county: 'Madison', city: 'Richmond' },
  { county: 'Clark', city: 'Winchester' },
  { county: 'Bourbon', city: 'Paris' },
] as const;

/** FAQ content: rendered visibly AND emitted as FAQPage JSON-LD from this one array. */
export const FAQS = [
  {
    q: 'How much does siding replacement cost?',
    a: 'It depends on the size of your home, the siding material, the condition of the wall behind it, and the trim and detail work involved. The most accurate way to get a number is an on-site estimate. Call us or send the estimate request form.',
  },
  {
    q: 'Should I repair or replace my siding?',
    a: 'Localized damage, such as a few cracked or loose panels, can often be repaired if matching material is available. Widespread damage, repeated repairs, or moisture problems behind the siding usually point toward replacement. We can look at it and tell you which makes sense.',
  },
  {
    q: 'What siding materials do you work with?',
    a: 'We install vinyl, fiber cement (James Hardie), and engineered wood (LP SmartSide) siding. Tell us what you are considering when you call and we will go over the options for your home.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Lexington and surrounding Central Kentucky, including Scott, Jessamine, Woodford, Franklin, Madison, Clark, and Bourbon counties. If you are not sure whether we cover your address, call and ask.',
  },
  {
    q: 'My siding was damaged in a storm. Can you help?',
    a: 'Yes. We can inspect storm damage and repair or replace the affected siding. If you plan to file an insurance claim, coverage decisions are made by your insurance company based on your policy.',
  },
] as const;
