# 🚀 Global Restoration KY — Implementation Guide
## Advanced Recommendations & Setup Instructions

**Document Date:** January 9, 2026  
**Site:** https://www.globalrestorationky.us  
**Status:** Ready for Implementation

---

## TABLE OF CONTENTS

1. [Image Format Optimization (WebP/AVIF)](#1-image-format-optimization)
2. [Google Analytics 4 Setup](#2-google-analytics-4-setup)
3. [Enhanced Structured Data (Optional)](#3-enhanced-structured-data)
4. [Error Tracking with Sentry](#4-error-tracking-with-sentry)
5. [Web Vitals Monitoring](#5-web-vitals-monitoring)
6. [Deployment & Verification Checklist](#6-deployment--verification-checklist)

---

## 1. IMAGE FORMAT OPTIMIZATION

### Why This Matters
- **WebP:** 25-35% smaller than JPEG, widely supported
- **AVIF:** 50% smaller than JPEG, next-generation format
- Current hero image (roofer.png) is ~800KB; optimization could save 300-400KB per page load

### What's Already Done
✅ Hero image dimensions fixed (1920x1080) to prevent layout shift  
✅ Loading attributes optimized (eager for hero, lazy for below-fold)

### What You Need to Do

#### Step 1: Convert Images to WebP/AVIF
Use any of these tools:
- **Online:** https://ezgif.com or https://www.xconvert.com
- **Command-line (ffmpeg):**
  ```bash
  ffmpeg -i roofer.png -c:v libwebp -q:v 80 roofer.webp
  ffmpeg -i roofer.png -c:v libaom-av1 -crf 30 roofer.avif
  ```
- **ImageMagick:**
  ```bash
  convert roofer.png -quality 80 roofer.webp
  convert roofer.png roofer.avif
  ```

#### Step 2: Upload Converted Images
Place WebP/AVIF versions in `public/assets/`:
```
public/assets/
├── roofer.png          (original)
├── roofer.webp         (converted)
├── roofer.avif         (converted)
├── roof-banner.png
├── roof-banner.webp
├── roof-banner.avif
└── ... (other images)
```

#### Step 3: Update HTML to Use Picture Elements

**Update [src/pages/index.astro](../src/pages/index.astro)** — Hero section:

```astro
<div class="absolute inset-0 z-0">
  <picture>
    <source srcSet="/assets/roofer.avif" type="image/avif" />
    <source srcSet="/assets/roofer.webp" type="image/webp" />
    <img 
      src="/assets/roofer.png" 
      alt="Professional roofer performing inspection" 
      class="w-full h-full object-cover"
      loading="eager"
      width="1920"
      height="1080"
    />
  </picture>
  <div class="absolute inset-0 hero-overlay"></div>
</div>
```

**Update [src/layouts/Layout.astro](../src/layouts/Layout.astro)** — OG image meta tag:

```astro
<!-- Add multiple formats for OG image -->
<meta property="og:image" content={`${SITE.url}/assets/roof-banner.avif`} />
<meta property="og:image:type" content="image/avif" />
<!-- Fallback for older crawlers -->
<meta property="og:image" content={`${SITE.url}/assets/roof-banner.png`} />
```

#### Expected Results
- Hero image: ~3-5 second load → ~1-2 second load (50%+ improvement)
- Page load impact: ~300-400KB reduction
- Lighthouse Performance score: +5-10 points

---

## 2. GOOGLE ANALYTICS 4 SETUP

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with Google account (or create one)
3. Click **"Start Measuring"** → **"Create a new property"**
4. Property name: `Global Restoration KY`
5. Industry category: **"Real Estate"** or **"Services"**
6. Business size: **"Small"**
7. Skip to **Web** platform
8. Website URL: `https://www.globalrestorationky.us`
9. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Install GA4 Tracking Code

Create [src/components/Analytics.astro](../src/components/Analytics.astro):

```astro
---
// Google Analytics 4 Tracking Component
const GA4_ID = import.meta.env.PUBLIC_GA4_ID || 'G-XXXXXXXXXX';
---

<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{GA4_ID}', {
    page_path: window.location.pathname,
  });
</script>
```

### Step 3: Add to Layout

Update [src/layouts/Layout.astro](../src/layouts/Layout.astro):

```astro
---
import Analytics from '../components/Analytics.astro';
// ... other imports
---
<!doctype html>
<html lang="en">
  <head>
    <!-- ... existing head content ... -->
    <Analytics />
  </head>
```

### Step 4: Set Environment Variables

Create [.env.local]() (NOT committed to Git):

```bash
PUBLIC_GA4_ID=G-XXXXXXXXXX
```

Or in Cloudflare Pages dashboard:
- **Settings → Environment Variables**
- Add: `PUBLIC_GA4_ID = G-XXXXXXXXXX`

### Step 5: Add Event Tracking

Track CTA clicks. Create [src/lib/analytics.ts](../src/lib/analytics.ts):

```typescript
export function trackCTAClick(ctaType: 'request-inspection' | 'call-now' | 'download-vcf') {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'cta_click', {
      'cta_type': ctaType,
      'page_title': document.title,
    });
  }
}

export function trackFormStart() {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_start', {
      'form_name': 'inspection_request',
    });
  }
}

export function trackFormSubmit() {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_submit', {
      'form_name': 'inspection_request',
    });
  }
}
```

### Step 6: Add Tracking to CTAs (Optional Client-Side)

For client-side tracking on CTAs, you'd need to add `is:inline` scripts to buttons. This requires Astro client-side JS.

**Example:** Add to a button in any page:

```astro
<a 
  href="/request-inspection" 
  class="btn-primary"
  onclick="trackCTAClick && trackCTAClick('request-inspection')"
>
  Request Inspection
</a>
```

### What You'll See in GA4
- **Engagement Report:** Time on page, bounce rate, sessions
- **Conversion Report:** Form submissions, CTA clicks
- **Audience Report:** Geographic, device, browser data
- **Retention:** Return visitor frequency

### GA4 Dashboard Setup
1. Go to **Reports** → **Acquisition** → **All Traffic** to see traffic sources
2. Create a **Custom Dashboard** for KPIs:
   - Sessions per day
   - CTA clicks
   - Form submissions
   - Top pages
   - Bounce rate

---

## 3. ENHANCED STRUCTURED DATA (Optional)

### ✅ Already Implemented
- **Organization Schema:** On all pages (home page level)
- **BreadcrumbList Schema:** On location and service pages
- **LocalBusiness:** Available in [src/lib/schema.ts](../src/lib/schema.ts)

### What You Can Add (Optional)

#### Add Service-Specific Schema

Update [src/pages/services/[slug].astro](../src/pages/services/[slug].astro):

```astro
---
import { generateServiceSchema } from '../../lib/schema';

// ... existing code ...

const serviceSchema = generateServiceSchema(
  `${SITE.url}/services/${slug}`,
  serviceData.name,
  serviceData.description
);
---

<Layout ...>
  <script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
  <!-- ... rest of page ... -->
</Layout>
```

#### Add AggregateRating (If You Have Reviews)

```typescript
export function generateAggregateRating(ratingValue: number, reviewCount: number) {
  return {
    "@type": "AggregateRating",
    "ratingValue": ratingValue,
    "reviewCount": reviewCount
  };
}
```

### Validation
Check schema is correct:
1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Paste `https://www.globalrestorationky.us`
3. Look for ✅ checks on Organization, BreadcrumbList

---

## 4. ERROR TRACKING WITH SENTRY

### Why This Matters
- Catch JavaScript errors before users notice
- Track performance bottlenecks
- Get alerts on critical issues

### Step 1: Create Sentry Account

1. Go to [Sentry.io](https://sentry.io)
2. Sign up (free tier available: 5k errors/month)
3. Create new project: **Astro** → JavaScript
4. Copy your **DSN** (format: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

### Step 2: Install Sentry SDK

```bash
npm install @sentry/astro
```

### Step 3: Configure Astro

Update [astro.config.mjs](../astro.config.mjs):

```javascript
import sentry from '@sentry/astro';

export default defineConfig({
  integrations: [
    tailwind(),
    sentry({
      dsn: import.meta.env.SENTRY_DSN,
      environment: import.meta.env.MODE,
      enabled: import.meta.env.PROD,
      tracesSampleRate: 0.1, // Sample 10% of transactions
    }),
  ],
});
```

### Step 4: Set Environment Variable

Add to [.env.local](../):

```bash
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### Step 5: Deploy & Monitor

After deployment, Sentry will automatically catch any errors. View in Sentry dashboard:
- **Issues** tab: All errors
- **Performance** tab: Slow pages
- **Releases** tab: Track by version

---

## 5. WEB VITALS MONITORING

### What Are Core Web Vitals?
1. **Largest Contentful Paint (LCP):** How fast main content loads
2. **First Input Delay (FID):** How responsive page is to clicks
3. **Cumulative Layout Shift (CLS):** How much content moves around

✅ Already optimized:
- Hero image CLS fixed (width/height set)
- Minimal JavaScript (static site)
- Header sticky (stable height)

### Step 1: Add Web Vitals Library

```bash
npm install web-vitals
```

### Step 2: Create Analytics Component

Create [src/components/WebVitals.astro](../src/components/WebVitals.astro):

```astro
<script>
  import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

  function sendToAnalytics(metric) {
    // Send to GA4
    if (window.gtag) {
      window.gtag('event', 'web_vital', {
        'metric_name': metric.name,
        'value': Math.round(metric.value),
        'metric_id': metric.id,
      });
    }

    // Send to Sentry (if enabled)
    if (window.Sentry) {
      window.Sentry.captureMessage(`Web Vital: ${metric.name} = ${metric.value}`, 'info');
    }

    // Log to console (dev)
    if (import.meta.env.DEV) {
      console.log(`📊 ${metric.name}:`, Math.round(metric.value));
    }
  }

  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
</script>
```

### Step 3: Add to Layout

```astro
import WebVitals from '../components/WebVitals.astro';

<Layout>
  <WebVitals />
  <!-- ... rest of layout ... -->
</Layout>
```

### View Results

In GA4:
1. **Reports → Engagement → Web Vitals**
2. See LCP, FID, CLS trends
3. Compare mobile vs desktop

### Target Scores (Google's Standards)
| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | < 2.5s | 2.5-4s | > 4s |
| FID | < 100ms | 100-300ms | > 300ms |
| CLS | < 0.1 | 0.1-0.25 | > 0.25 |

---

## 6. DEPLOYMENT & VERIFICATION CHECKLIST

### Pre-Deployment Verification

- [ ] All images converted to WebP/AVIF (if implementing image optimization)
- [ ] GA4 Measurement ID added to .env.local
- [ ] Sentry DSN added to .env.local (if implementing error tracking)
- [ ] Build passes locally: `npm run build`
- [ ] No console errors in dist build output
- [ ] robots.txt and sitemap.xml present in public/
- [ ] All internal links tested and working

### Cloudflare Pages Deployment

#### Step 1: Set Environment Variables

In Cloudflare Pages dashboard:

**Settings → Environment Variables → Production**

Add:
```
PUBLIC_GA4_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

#### Step 2: Deploy

```bash
# Build locally to verify
npm run build

# Push to Git (Cloudflare auto-deploys on push)
git add .
git commit -m "Add advanced optimizations: GA4, image optimization, schema data"
git push origin main
```

#### Step 3: Verify in Cloudflare Dashboard

1. **Deployments** tab: Confirm build succeeded
2. **Analytics** tab: Check request stats
3. **Cache** tab: Ensure static assets cached long-term

### Post-Deployment Verification

#### Google Analytics
- [ ] Tracking code loaded (check Network tab → googletagmanager.com)
- [ ] Data appearing in GA4 dashboard after 24 hours
- [ ] Events firing on CTA clicks

#### Sentry
- [ ] Project created and configured
- [ ] DSN valid in Astro config
- [ ] Test error captured (trigger test in Sentry dashboard)

#### Images
- [ ] WebP/AVIF serving (use `curl -I` to check Content-Type)
- [ ] Hero image loads in <2 seconds
- [ ] Lighthouse score improved

#### Schema.org
- [ ] Validate with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Organization schema present ✅
- [ ] BreadcrumbList on location pages ✅

---

## SUMMARY OF IMPLEMENTATIONS

### ✅ Already Completed (in this audit)
1. **Structured Data Schema**
   - Organization schema on all pages
   - BreadcrumbList on location/service pages
   - Service schema generator ready

### 📋 Ready to Implement (low effort, high impact)
1. **Image Optimization** — 1-2 hours
   - Convert 3-4 main images (roofer.png, roof-banner.png, etc.)
   - Update HTML picture elements
   - Expected: 300-400KB savings, +5-10 Lighthouse points

2. **Google Analytics 4** — 1-2 hours
   - Create GA4 property
   - Add tracking code
   - Set up custom dashboards
   - Expected: Full visibility into user behavior, CTA tracking

### 📌 Optional (medium effort, medium impact)
1. **Error Tracking (Sentry)** — 1 hour
   - Catch runtime errors automatically
   - Performance monitoring

2. **Web Vitals Monitoring** — 30 minutes
   - Track user experience metrics
   - Identify performance issues

---

## TROUBLESHOOTING

### Images Not Loading (WebP/AVIF)
- **Check:** Do WebP/AVIF files exist in `public/assets/`?
- **Check:** Are picture elements written correctly?
- **Solution:** Use `curl -I https://site.com/assets/roofer.webp` to verify serve

### GA4 Not Tracking
- **Check:** Is GA4_ID in environment variables?
- **Check:** Is googletagmanager.com loading (Network tab)?
- **Wait:** GA4 takes 24 hours to show initial data
- **Solution:** Check GA4 Real-Time → should see pageviews immediately

### Build Errors After Changes
- **Run:** `npm install` to ensure dependencies
- **Run:** `npm run build` locally to see full error
- **Check:** Astro version is ^5.0.0 in package.json

### Schema Not Validating
- **Tool:** https://search.google.com/test/rich-results
- **Check:** JSON syntax (use JSON validator if unsure)
- **Common issue:** Missing quotes around keys/values

---

## SUPPORT & RESOURCES

| Topic | Resource |
|-------|----------|
| Google Analytics 4 | https://analytics.google.com/analytics/web |
| Sentry Setup | https://docs.sentry.io/platforms/javascript/guides/astro/ |
| Web Vitals | https://web.dev/vitals/ |
| Schema.org | https://schema.org |
| Astro Docs | https://docs.astro.build |
| Image Conversion | https://ezgif.com or ffmpeg docs |

---

## NEXT STEPS

1. **This week:** Implement image optimization (biggest impact)
2. **Next week:** Set up Google Analytics 4
3. **Following week:** Add error tracking (Sentry) if needed
4. **Ongoing:** Monitor metrics in GA4 dashboard, adjust content based on user behavior

---

**Document prepared:** January 9, 2026  
**For:** Global Restoration KY Astro Site  
**Contact:** Your development team or hosting support
