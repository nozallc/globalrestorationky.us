# Bubble Stack System

## Canonical Reference Implementation
**Global Restoration LLC Roofing Page** (`src/pages/roofing.astro`)

This document formalizes the layout, visual logic, and typography hierarchy established on the Roofing page as the authoritative design system for all image-backed content sections.

---

## System Overview

The **Bubble Stack System** is a layout methodology that combines:
- **Full-bleed background images** with gradient overlay darkening
- **Translucent frosted-glass "bubble" wrappers** for grouped content
- **Solid white surface cards** for actions, options, and proofs
- **Alternating rhythm** between image-backed and white sections
- **Restrained typography hierarchy** with strategic color usage

**Purpose:** Create premium, readable experiences where content sits comfortably over photography without sacrificing contrast, legibility, or brand presence.

---

## Core Components

### 1. Image-as-Background Container

**Purpose:** Establish visual context and depth for the entire section.

**Markup:**
```astro
<div class="roofing-bg-band" style={`background-image: url('${imageAsset.src}');`}>
  <!-- child content -->
</div>
```

**CSS Rules:**
- `background-size: cover`
- `background-repeat: no-repeat`
- `background-position: 50% var(--roofBgY)` (responsive positioning via CSS variable)
- `overflow: visible` (allows pseudo-elements to extend beyond container)

**Responsive Positioning:**
```css
:root {
  --roofBgY: 22%;        /* Desktop */
}
@media (max-width: 1024px) {
  :root { --roofBgY: 28%; /* Tablet */
}
@media (max-width: 768px) {
  :root { --roofBgY: 35%; /* Mobile */
}
```

### 2. Full-Viewport Overlay Gradient

**Purpose:** Darken the image uniformly while allowing light areas to remain visible for bubble transparency effects.

**Pseudo-element:** `.roofing-bg-band::before`

**CSS Properties:**
```css
.roofing-bg-band::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100vw;          /* Full-bleed: prevent edge seams */
  right: -100vw;         /* Full-bleed: prevent edge seams */
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,      /* Heavy darkening at top */
    rgba(0, 0, 0, 0.5) 15%,
    rgba(0, 0, 0, 0.35) 35%,
    rgba(0, 0, 0, 0.15) 65%,    /* Fade to light at bottom */
    transparent 100%
  );
  pointer-events: none;   /* Never block interaction */
  z-index: 0;             /* Below content */
}
```

**Critical Rule:** Use `left: -100vw; right: -100vw` to prevent visible seams at viewport edges. Container must have `overflow: visible`.

---

## 3. Translucent Bubble Wrappers

### When to Use
- Group related content that sits directly over the image background
- Provide visual hierarchy and breathing room
- Improve contrast for text without hard surfaces
- Create premium "frosted glass" aesthetic

### When NOT to Use
- Inside white surface cards (no nested bubbles)
- For structural layout (bubbles are styling only)
- For single-use text blocks (use direct styling instead)

### Header Bubble: `.header-bubble`

**Used for:** H1 heading + subhead (most prominent section)

**CSS:**
```css
.header-bubble {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2.5rem / 3rem;        /* Responsive: 3rem / 3.5rem on tablet+ */
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 1rem auto;
  max-width: 95%;
  padding: 2rem 1.5rem;               /* Responsive: 2.5rem 2rem on tablet+ */
}
```

**Opacity Rules:**
- Background: `rgba(255, 255, 255, 0.07)` (7% opacity)
- Border: `rgba(255, 255, 255, 0.15)` (15% opacity)
- Effect: Extremely subtle, feels "lighter" than a hard card

### Mid-Content Bubble: `.mid-content-bubble`

**Used for:** Supporting paragraph + service cards grouped together

**CSS:**
```css
.mid-content-bubble {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 3rem / 3.5rem;        /* Responsive */
  backdrop-filter: blur(7px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 1.5rem auto;
  max-width: 95%;
  padding: 2.5rem 1.5rem;             /* Responsive: 3rem 2.5rem on tablet+ */
}
```

**Opacity Rules:**
- Background: `rgba(255, 255, 255, 0.06)` (6% opacity)
- Border: `rgba(255, 255, 255, 0.13)` (13% opacity)
- Effect: Subtle, calming, premium

### Blur and Border Radius Semantics
- **Blur amount:** Matched to perceived opacity (8px for header / 7px for mid-content)
- **Border radius:** Organic ellipse ratios (height > width for subtle visual interest)
- **Do NOT change:** Blur or radius values without design review

---

## 4. Solid White Surface Cards

### When to Use
- Call-to-action sections (inspections, contact)
- Proof elements (checklists, trust signals)
- Action-oriented content (service cards with descriptions)

### Styling Requirements

**Base Card Rules:**
```css
.service-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 1rem;
}

.service-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

**Text Color Enforcement:**
- Headings: `#3d5064` (muted blue-gray, secondary color)
- Body text: `#475569` (dark neutral slate)
- Always use `!important` to prevent inheritance from parent bubbles

**Critical Rule:** White cards break the "text over image" rule. They are discrete, interactive surfaces with no transparency requirement.

---

## 5. Content Rhythm: Alternating Image / White Sections

### Sequence (Roofing Page)
1. **Image-backed section**
   - Header bubble (H1 + subhead)
   - Checklist card (white, proof element)
2. **Image-backed section**
   - Mid-content bubble (paragraph + service cards)
   - CTA card (white, action element)
3. **White section (no background image)**
   - FAQ (clean white, new visual breath)

### Principle
- Alternate between **visual interest (image)** and **visual rest (white)**
- Use white cards as **punctuation** within image sections
- Never stack white cards back-to-back without a visual break
- Closing section should be clean white if page is long

---

## Typography Hierarchy & Contrast

### Color Strategy: Restrained Palette

**Primary (Strongest):**
- H1: `#00007e` (brand blue)
- Used once, at the top of the page
- Anchors the entire visual experience

**Secondary (Softer):**
- Service card titles: `#3d5064` (muted blue-gray)
- Related to brand blue, but desaturated
- Signifies "supporting focus"
- Prevents "blue overload" while maintaining cohesion

**Tertiary (Neutral):**
- Service card body: `#475569` (dark slate)
- Highly readable, zero color tint
- Used for all descriptive/supporting text

**Over-Background (Contrast):**
- Supporting paragraph: `rgba(255, 255, 255, 0.95)` (near-white)
- Subhead: `rgba(255, 255, 255, 0.95)` (near-white)

### H1 Anchor Point (Header Bubble)

**CSS Rule (REQUIRED on all Bubble Stack pages):**
```css
.header-bubble h1 {
  color: #00007e;              /* Brand blue — appears once per page */
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);  /* Lift text from dark background */
}
```

**Implementation Rules:**
- H1 color is **always `#00007e`** (brand blue) — no exceptions
- This CSS rule MUST be present in the `<style>` block of every page using `.header-bubble`
- Do NOT use inline color classes (e.g., `text-white`, `text-blue-500`) — they override correct styling
- Text-shadow is critical for readability when H1 appears over background images
- Applied to ALL pages using the Bubble Stack System

**Why CSS Rule Over Inline Classes:**
- CSS cascade ensures brand consistency
- Inline classes are fragile and lead to confusion (as discovered Jan 12, 2026)
- Rule-based approach makes intent explicit in documentation
- Easier to audit and maintain across multiple pages

### Font-Weight Rules

**Text Over Image Background (Roofing page):**
- H1: `font-black` (900) — maximum strength for visibility
- Subhead paragraph: `font-weight: 500` — medium, readable on background
- Supporting paragraph: `font-weight: 500` — medium, confident presence

**Text Inside White Cards:**
- Titles: `font-extrabold` (800) — hierarchy
- Body: `font-normal` (400) — clean, readable
- **Rule:** Do NOT increase weight in white cards; reserved for background text

### Text-Shadow for Contrast Lift

**Applied to:** `.header-bubble h1`

```css
.header-bubble h1 {
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
```

**Rules:**
- Blur radius: `6px` (diffuse, not sharp)
- Color: `rgba(0, 0, 0, 0.3)` (neutral, low opacity)
- Vertical offset: `2px` (subtle, not dramatic)
- **Never use:** Outline, glow, multiple shadows, or hard edges

---

## Accessibility & Restraint Principles

### Color Usage
- **Limit brand blue to ONE anchor point** (H1)
- **Use desaturated secondary colors** for supporting elements
- **Never stack bright colors** — reduces visual hierarchy
- **Typography, not color, drives the information architecture**

### Contrast & Readability
- All text over image: minimum 4.5:1 contrast ratio
- Use `text-shadow` to lift text from dark image areas
- All white card text meets WCAG AA standards
- Test text on both light and dark backgrounds

### Restraint
- Fewer colors = stronger hierarchy
- Fewer weights = clearer prominence
- Fewer shadows = lighter appearance
- **Goal:** Premium look through discipline, not decoration

### Pointer Events & Interactivity
- All pseudo-elements: `pointer-events: none` (never block clicks)
- Bubbles are pure styling; they do not interfere with interaction
- Click targets always respond immediately

---

## Enforcement Rule

**If uncertain about layout, color, spacing, or typography on any new page:**

> **"Match the Roofing page exactly."**

Visit `src/pages/roofing.astro` and replicate the structure, CSS values, and responsive logic precisely. Do not improvise variants until a design system extension is formally approved.

### H1 Styling Non-Negotiable Requirement
Every page using the Bubble Stack System MUST include this CSS rule in its `<style>` block:
```css
.header-bubble h1 {
  color: #00007e;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
```
Do NOT rely on inline color classes. CSS rules ensure brand consistency and prevent confusion.

---

## Implementation Checklist for New Pages

When applying the Bubble Stack System to a new page:

- [ ] Image asset selected and optimized (WebP, appropriate dimensions)
- [ ] `.roofing-bg-band` wrapper created with full-bleed overlay
- [ ] CSS variables for responsive background positioning defined
- [ ] Header bubble structure (H1 + subhead) replicated
- [ ] **H1 color rule present:** `.header-bubble h1 { color: #00007e; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); }`
- [ ] Checklist or proof card included (white surface, dark text)
- [ ] Mid-content bubble for supporting paragraph + grouped content
- [ ] Service/option cards styled with white background and `#3d5064` titles
- [ ] CTA card positioned (white, action-oriented)
- [ ] Font-weights verified (500 for background text, standard for cards)
- [ ] Contrast checked (4.5:1 minimum for all text)
- [ ] Mobile responsiveness tested (padding, border-radius, positioning)
- [ ] No new colors introduced without design review
- [ ] All white cards tested with hover states
- [ ] Pointer-events: none on all pseudo-elements verified

---

## File References

**Implementation Source:**
- `src/pages/roofing.astro` — Canonical CSS and HTML structure

**Future Pages Using This System:**
- (To be documented as pages are created)

---

## Version & Approval

**Version:** 1.0 (Initial)  
**Date:** January 12, 2026  
**Status:** Authoritative Design System  
**Reference Name:** Bubble Stack System

This system is the formal design contract for all image-backed content sections. Deviations require explicit approval and documented rationale.
