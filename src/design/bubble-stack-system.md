# Bubble Stack System — Design & Implementation Guide

**Canonical Reference:** `src/pages/roofing.astro` (Roofing page)  
**Version:** 2.0 — Refreshed Jan 13, 2026  
**Status:** Active Design Standard  
**Audience:** Engineers, designers, new contributors

---

## Purpose & Scope

The **Bubble Stack System** is the design standard for all image-backed service pages on Global Restoration LLC. It combines hero photography, semi-transparent overlays, typography hierarchy, and white card surfaces to create a premium, readable experience.

**Roofing page** (`src/pages/roofing.astro`) is the **single source of truth**. All new service pages must replicate its structure, CSS patterns, and responsive behavior *exactly* unless explicitly approved otherwise.

### Applies To:
- Service pages: Water Damage Restoration, Siding, Gutters, Insurance Claims
- Location pages (if hero is implemented)
- Any page with a hero image + overlay content

### Does NOT Apply To:
- Home page (unique design)
- Contact page (form-focused, no hero)
- Interior location pages (if no hero image)
- Global components (Header, Footer)

---

## High-Level Page Structure

Every Bubble Stack page follows this sequence:

```
1. HERO IMAGE BAND (full-bleed background)
   ├─ Title Bubble (H1 + subhead) — over image
   ├─ Logo overlay (optional watermark) — centered
   └─ CTA Bubble (action prompt) — over image, below title

2. BELOW-HERO SECTIONS (white background)
   ├─ Proof Element (checklist or trust signals)
   └─ Mid-Content Bubble (supporting text + white cards)

3. ADDITIONAL CONTENT (white background)
   ├─ FAQ
   ├─ Final CTA card
   └─ (Page-specific sections as needed)
```

**Critical Rule:** The first two sections sit inside the hero container (background image). Everything after is white background.

---

## Hero Image Container Spec

### DOM Structure
```astro
<div class="roofing-bg-band" style={`background-image: url('${imageAsset.src}');`}>
  <!-- All overlay content goes here -->
  <div class="roofing-header-wrap">
    <!-- Title bubble -->
  </div>
  <!-- CTA bubble -->
</div>
<!-- Below-hero sections -->
```

### CSS Requirements

**Base Container:**
```css
.roofing-bg-band {
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: var(--roofBgX) var(--roofBgY);
  overflow: visible;
  min-height: 900px;  /* Fixed height — do not change */
}
```

**Responsive Positioning Variables:**
```css
:root {
  --roofBgX: 50%;
  --roofBgY: 25%;  /* Desktop: center-top focus */
}

@media (max-width: 1024px) {
  :root {
    --roofBgX: 50%;
    --roofBgY: 23%;  /* Tablet: slight adjustment */
  }
}

@media (max-width: 768px) {
  :root {
    --roofBgX: 25%;   /* Mobile: shift left */
    --roofBgY: 35%;   /* Mobile: shift down to emphasize subject */
  }
}
```

### Image Cropping & Focal Point Logic

**Strategy:** Use CSS `background-position` to frame the image, not HTML image cropping.

**Roofing Page Example:**
- Image shows: Man in hoodie holding a hammer, standing on roof
- Desktop/Tablet focus: Hoodie logo (center of torso area)
- Mobile focus: Full man in left-center (25% X, 35% Y shifts left and down)
- **Avoided:** Exposed leg at bottom (removed via Y-position adjustment)

**Rules:**
- **X-axis:** 50% = centered. Adjust lower (25%) to show left-side subject on mobile.
- **Y-axis:** Balance between showing top of image (25%) and showing full subject (35% on mobile).
- **Never:** Use `background-size: contain` or `100% 100%` — stretches and distorts.
- **Always:** Test on 320px mobile, 768px tablet, 1200px+ desktop.

### NO Overlay Gradient

⚠️ **Common Mistake:** The older doc mentioned a full-bleed overlay gradient pseudo-element. This is **NOT used**. Remove if you see it.

Instead, rely on:
1. **Image darkness** (use a photo with good shadow areas)
2. **Bubble opacity** (white bubbles sit clearly over darker image areas)
3. **Text shadow** (on H1 for extra lift if needed)

---

## Overlay Bubble Spec

These bubbles sit **directly over the hero image** in a fixed vertical stack.

### Title Bubble (`.header-bubble`)

**Purpose:** H1 heading + subhead paragraph

**Positioning:**
```css
.header-bubble {
  position: relative;
  background: rgba(255, 255, 255, 0.80);  /* 80% white — solid, not translucent */
  border: none;
  border-radius: 2.5rem;                  /* 3rem on tablet+ */
  backdrop-filter: none;                  /* No blur */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 1rem auto;
  max-width: 95%;
  padding: 2rem 1.5rem;                   /* 2.5rem 2rem on tablet+ */
}

@media (min-width: 768px) {
  .header-bubble {
    padding: 2.5rem 2rem;
    border-radius: 3rem;
  }
}
```

**Placement Logic:**
- Sits **slightly above** hero image midpoint (use `mt-5` Tailwind class for margin-top)
- Creates visual weight at top of hero
- Whitespace below allows CTA bubble to sit below midpoint

**Typography Inside:**
```css
.header-bubble h1 {
  color: #00007e;                          /* Brand blue — non-negotiable */
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.header-bubble p {
  color: #000000;                          /* Black — high contrast */
  font-weight: 500;
}
```

**Markup Rules:**
- H1: `class="text-3xl font-black md:text-4xl"` (Tailwind sizes only, no color classes)
- P: `class="mt-3 mx-auto max-w-xl text-base"` (Tailwind sizing only, no color classes)
- CSS rules in `<style>` block control color explicitly (no Tailwind color overrides)

### CTA Bubble (`.roofing-cta-section`)

**Purpose:** Action prompt with buttons ("Start with a documented inspection")

**Positioning:**
```css
.roofing-cta-section {
  background: rgba(255, 255, 255, 0.18);  /* 18% opacity — semi-transparent */
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
}

.roofing-cta-section > div:first-child {
  color: #00007e;                          /* Brand blue headline */
  font-weight: 800;
}

.roofing-cta-section p {
  color: #000000;                          /* Black supporting text */
  font-weight: 700;
}
```

**Placement Logic:**
- Wrapped in `<section class="mx-auto max-w-6xl px-4 py-8 mt-15">`
- `mt-15` Tailwind class positions it **slightly below** hero midpoint
- Separated from title bubble by intentional gap (visual breathing room)
- Sits inside `.roofing-bg-band` (still over image)

**Buttons Inside:**
- Keep all button styling **unchanged** — use existing `.rounded-lg`, `.bg-global-red`, etc.
- CTA bubble background does NOT affect button appearance
- Buttons always remain interactive and discoverable

### Z-Index & Stacking

```css
.roofing-bg-band > * {
  position: relative;
  z-index: 1;                              /* Content above image */
}

.hero-logo-overlay {
  z-index: 2;                              /* Logo sits above bubbles */
}
```

---

## Logo Overlay (Optional Branding Element)

**When to Use:** Any hero that needs brand watermarking (optional, not required)

**Structure:**
```astro
<div class="hero-logo-overlay" aria-hidden="true">
  <Image src={logo} alt="" width={200} height={200} />
</div>
```

**CSS:**
```css
.hero-logo-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);        /* Center absolutely */
  width: 200px;
  height: 200px;
  opacity: 0.15;                           /* Very subtle — don't dominate */
  pointer-events: none;
  z-index: 2;
}

.hero-logo-overlay img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

**Rules:**
- Place **between** title and CTA bubbles vertically
- 200px is a good size (adjust only with design approval)
- Opacity 0.15 ensures it never interferes with text
- `aria-hidden="true"` since it's decorative

---

## Below-Hero Bubble Stack Spec

These sections sit **outside** `.roofing-bg-band` with white backgrounds.

### Proof Element (Checklist or Trust Card)

**Purpose:** Build credibility with social proof, checklist, or trust signals

**Example Structure:**
```astro
<section class="mx-auto max-w-6xl px-4 py-12">
  <div class="checklist-card mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-50/95 p-6 md:p-8">
    <h3 class="text-lg font-extrabold text-slate-900 mb-6 text-center">Why Homeowners Trust Our Process</h3>
    <!-- List items with checkmarks -->
  </div>
</section>
```

**CSS:**
```css
.checklist-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.03);
}
```

**Title Requirement:**
- Every below-hero bubble MUST have an `<h3>` title
- Format: `class="text-lg font-extrabold text-slate-900 mb-6 text-center"`
- Text is dark (`text-slate-900`) for readability on light background

### Mid-Content Bubble (`.mid-content-bubble`)

**Purpose:** Supporting paragraph + grouped white service/option cards

**Structure:**
```astro
<section class="mx-auto max-w-6xl px-4 py-16">
  <div class="mid-content-bubble">
    <h3 class="text-lg font-extrabold text-slate-900 mb-4 text-center">Our Services & Support</h3>
    <p>Supporting paragraph text...</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3">
      <!-- Service cards -->
    </div>
  </div>
</section>
```

**CSS:**
```css
.mid-content-bubble {
  position: relative;
  background: rgba(255, 255, 255, 0.12);  /* 12% opacity — subtle frosted glass */
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 3rem;                     /* 3.5rem on tablet+ */
  backdrop-filter: blur(7px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 1.5rem auto;
  max-width: 95%;
  padding: 2.5rem 1.5rem;                  /* 3rem 2.5rem on tablet+ */
}

@media (min-width: 768px) {
  .mid-content-bubble {
    padding: 3rem 2.5rem;
    border-radius: 3.5rem;
  }
}

.mid-content-bubble > p {
  color: #1e293b;                          /* Dark slate for readability */
  font-weight: 500;
}
```

**Typography:**
- **Title:** `<h3>` with `text-slate-900` (dark, visible on white)
- **Supporting paragraph:** Dark slate text (`#1e293b`), medium weight
- **DO NOT use white text** in this bubble (it's almost white already; would have poor contrast)

### Service/Option Cards (`.service-card`)

**Purpose:** Highlight specific services or options in a grid

**CSS:**
```css
.service-card {
  background: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
  color: #1e293b;
}

.service-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.service-card h1, .service-card h2, .service-card h3, 
.service-card h4, .service-card h5, .service-card h6 {
  color: #3d5064 !important;               /* Muted blue-gray titles */
}

.service-card p {
  color: #475569 !important;               /* Dark neutral body text */
}
```

**Markup:**
```astro
<div class="service-card rounded-2xl border border-slate-200 bg-white p-6 text-center">
  <div class="text-lg font-extrabold text-slate-900">{title}</div>
  <p class="mt-2 text-sm text-slate-900">{description}</p>
</div>
```

**Rules:**
- Cards sit inside `.mid-content-bubble` (or standalone white section)
- Titles: muted blue-gray (`#3d5064`) — secondary color
- Body: dark neutral (`#475569`) — readable, no color tint
- Use `!important` on card text colors to prevent parent bubble styles leaking in
- Hover state adds shadow lift (subtle interaction feedback)

---

## Mobile Rules (Mandatory)

### Hero Image Positioning
Mobile users see a different focal point than desktop:

```css
@media (max-width: 768px) {
  :root {
    --roofBgX: 25%;   /* Shift left to show left-side subject */
    --roofBgY: 35%;   /* Shift down to show full height subject */
  }
}
```

**Example:** Roofing page shows the man in the hoodie more prominently on mobile by shifting the image left and down.

### Bubble Responsive Sizing

**Header Bubble:**
- Mobile: `border-radius: 2.5rem; padding: 2rem 1.5rem;`
- Tablet+: `border-radius: 3rem; padding: 2.5rem 2rem;`

**Mid-Content Bubble:**
- Mobile: `border-radius: 3rem; padding: 2.5rem 1.5rem;`
- Tablet+: `border-radius: 3.5rem; padding: 3rem 2.5rem;`

**Rule:** Use responsive padding/radius utilities in `@media` blocks, not Tailwind breakpoint prefixes for custom styling.

### No Special Mobile Bubbles
- Do NOT create mobile-only bubbles
- Do NOT hide/show sections on mobile
- Do NOT change bubble opacity by breakpoint (opacity is fixed, size adjusts)
- Same content, same layout, same hierarchy — just adjusted proportions

---

## Implementation Checklist (For Claude & Developers)

Use this checklist when creating or updating a service page:

- [ ] **Asset Prepared:** Hero image in WebP format, optimized for web (2-3MB max)
- [ ] **DOM Structure:** Copy Roofing page structure exactly
  - [ ] `.roofing-bg-band` wrapper with `background-image` style
  - [ ] `.roofing-header-wrap` → `.header-bubble` (H1 + subhead)
  - [ ] `.roofing-cta-section` (action prompt + buttons)
  - [ ] Proof element section (checklist or trust card)
  - [ ] `.mid-content-bubble` (supporting text + service cards)
- [ ] **CSS Variables:** Hero image positioning defined for all 3 breakpoints
  - [ ] Desktop: `--roofBgX` and `--roofBgY` in `:root`
  - [ ] Tablet: `@media (max-width: 1024px)` overrides
  - [ ] Mobile: `@media (max-width: 768px)` overrides
- [ ] **Header Bubble CSS:** Required rule present in `<style>` block
  ```css
  .header-bubble h1 {
    color: #00007e;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  ```
- [ ] **Bubble Opacity Values:**
  - [ ] Header bubble: `rgba(255, 255, 255, 0.80)` (white background)
  - [ ] Mid-content bubble: `rgba(255, 255, 255, 0.12)` (semi-transparent)
  - [ ] CTA bubble: `rgba(255, 255, 255, 0.18)` (semi-transparent)
- [ ] **Below-Hero Sections:** Each has visible title (`<h3>`)
  - [ ] Proof element has descriptive title
  - [ ] Mid-content bubble has descriptive title
- [ ] **Typography:** No inline color classes on H1 or key paragraphs
  - [ ] H1: Size and weight only (e.g., `text-3xl font-black`), color via CSS rule
  - [ ] Supporting text: No color classes (color via CSS rule)
- [ ] **Responsive Tested:**
  - [ ] Hero looks good on 320px (mobile)
  - [ ] Hero looks good on 768px (tablet)
  - [ ] Hero looks good on 1200px+ (desktop)
  - [ ] Image focal point is correct at all breakpoints
- [ ] **Accessibility:**
  - [ ] Contrast ratio ≥ 4.5:1 for all text
  - [ ] H1 uses semantic `<h1>` tag
  - [ ] Logo overlay has `aria-hidden="true"`
  - [ ] Buttons have proper `href` or `onclick` attributes
- [ ] **Build Verification:**
  - [ ] `npm run build` passes without errors
  - [ ] Local preview at page URL shows correct layout
  - [ ] No visual diffs from Roofing page (except content)

---

## Do Not Break These (Guardrails)

Common failure modes to avoid:

### Layout & Structure
- **Don't** create new hero wrapper classes unless explicitly approved by design
- **Don't** move content blocks when asked for "readability improvements" — adjust typography/contrast instead
- **Don't** stack sections without clear visual breaks (alternate image/white backgrounds)
- **Don't** hide sections on mobile without explicit instruction in user request

### Styling & Colors
- **Don't** introduce new colors without design review (stick to `#00007e`, `#3d5064`, `#475569`, white, and grays)
- **Don't** apply gradient overlays to hero unless explicitly required
- **Don't** use different opacity values for bubbles (use exact values from Spec section)
- **Don't** mix "frosted glass" (blur + translucent background) with solid white bubbles on the same page

### Typography
- **Don't** use inline color Tailwind classes on H1 or supporting paragraphs (use CSS rules instead)
- **Don't** change font-weight values without reviewing the hierarchy
- **Don't** apply text-shadow to anything except H1 (can get muddy)

### Responsive Behavior
- **Don't** create mobile-specific bubbles or hide sections
- **Don't** use different positioning strategies (desktop uses flexbox, mobile uses grid, etc.)
- **Don't** trust browser cache — force refresh and verify actual positioning
- **Don't** assume `mt-*` Tailwind utilities match specific pixel values (they don't; test visually)

### Components
- **Don't** refactor `.header-bubble`, `.mid-content-bubble`, or `.service-card` into shared components
- **Don't** create page-specific component variants (one implementation, used everywhere)
- **Don't** import these components from other files (define them in page `<style>` block)

### Process
- **Don't** add features or sections that don't exist on the Roofing page without explicit user approval
- **Don't** claim "code cleanup" as reason to refactor (refactoring requires explicit request + approval)
- **Don't** mix multiple changes in one request — one task per PR/request

---

---

## Copy/Paste Snippets

### Hero Wrapper Skeleton
```astro
<div class="roofing-bg-band" style={`background-image: url('${imageAsset.src}');`}>
  <!-- Logo overlay (optional) -->
  <div class="hero-logo-overlay" aria-hidden="true">
    <Image src={logo} alt="" width={200} height={200} />
  </div>

  <!-- Title Bubble -->
  <div class="roofing-header-wrap">
    <div class="header-bubble mt-5">
      <div class="text-center">
        <h1 class="text-3xl font-black md:text-4xl">Your Page Title</h1>
        <p class="mt-3 mx-auto max-w-xl text-base">Your subheading text here.</p>
      </div>
    </div>
  </div>

  <!-- CTA Bubble -->
  <section class="mx-auto max-w-6xl px-4 py-8 mt-15">
    <div class="mx-auto max-w-2xl">
      <div class="roofing-cta-section rounded-2xl p-8 text-center">
        <div class="text-lg font-extrabold text-slate-900">Action Prompt</div>
        <p class="mt-2 text-sm">Supporting text.</p>
        <div class="mt-4 flex flex-col gap-3 sm:flex-row justify-center">
          <a class="rounded-lg bg-global-red px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-95" href="/path">Action Button</a>
          <a class="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-900 hover:bg-white" href="/path">Secondary Button</a>
        </div>
      </div>
    </div>
  </section>
</div>
```

### Hero CSS Skeleton
```css
<style>
  :root {
    --roofBgX: 50%;
    --roofBgY: 25%;   /* Adjust based on image focal point */
  }

  @media (max-width: 1024px) {
    :root {
      --roofBgX: 50%;
      --roofBgY: 23%;
    }
  }

  @media (max-width: 768px) {
    :root {
      --roofBgX: 50%;   /* Shift left if subject is off-center */
      --roofBgY: 35%;   /* Adjust to show full subject height */
    }
  }

  .roofing-bg-band {
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: var(--roofBgX) var(--roofBgY);
    overflow: visible;
    min-height: 900px;
  }

  .roofing-bg-band > * {
    position: relative;
    z-index: 1;
  }

  .roofing-header-wrap > * {
    position: relative;
    z-index: 1;
  }

  .roofing-header-wrap {
    padding: 0;
    margin: 0;
  }

  .header-bubble {
    position: relative;
    background: rgba(255, 255, 255, 0.80);
    border: none;
    border-radius: 2.5rem;
    backdrop-filter: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin: 1rem auto;
    max-width: 95%;
    padding: 2rem 1.5rem;
  }

  @media (min-width: 768px) {
    .header-bubble {
      padding: 2.5rem 2rem;
      border-radius: 3rem;
    }
  }

  .header-bubble h1 {
    color: #00007e;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .header-bubble p {
    color: #000000;
    font-weight: 500;
  }

  .roofing-cta-section {
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(10px);
  }

  .roofing-cta-section > div:first-child {
    color: #00007e;
    font-weight: 800;
  }

  .roofing-cta-section p {
    color: #000000;
    font-weight: 700;
  }
</style>
```

---

## Reference Implementation

**Canonical source for all patterns:**
- `src/pages/roofing.astro` — HTML structure, CSS rules, responsive logic
- Copy this file's `<style>` block when creating new service pages
- Copy the hero markup structure (DOM order matters for z-index and positioning)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Jan 13, 2026 | **Complete refresh:** Removed frosted glass overlay gradient theory, documented actual implementation (white bubble backgrounds, logo overlay, responsive image positioning, section titles). Restructured checklist and guardrails. |
| 1.0 | Jan 12, 2026 | Initial Bubble Stack System doc |

---

## Questions or Clarifications?

If a new page doesn't match these patterns:
1. Check the Roofing page source code
2. Ask: "Does the Roofing page do this?"
3. If yes → implement it the same way
4. If no → request explicit design approval before deviating

**Design consistency = user trust = brand strength.**
