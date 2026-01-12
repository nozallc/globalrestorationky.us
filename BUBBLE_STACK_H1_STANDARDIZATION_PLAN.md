# Bubble Stack System H1 Standardization Plan

**Date:** January 12, 2026  
**Purpose:** Formalize H1 title styling in the Bubble Stack System documentation and ensure consistency across all service pages.

---

## Background

During recent updates to the services hub page (`/services`), a styling inconsistency was discovered:

- **Roofing page** (`src/pages/roofing.astro`) — H1 styled with **brand blue (#00007e)** via CSS rule
- **Services hub page** — H1 initially had `text-white` inline class, overriding proper brand blue styling
- **Other service pages** (water-damage, siding, gutters) — Already correctly styled with **brand blue**

**Issue:** The H1 color rule was not explicitly documented in the Bubble Stack System, leading to confusion and inconsistent implementation.

---

## Current State Audit

### Pages Already Correctly Styled
✅ **src/pages/roofing.astro**
- CSS Rule: `.header-bubble h1 { color: #00007e; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); }`
- Status: Correct (canonical reference)

✅ **src/pages/services/water-damage-restoration.astro**
- CSS Rule: `.header-bubble h1 { color: #00007e; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); }`
- Status: Correct

✅ **src/pages/services/siding.astro**
- CSS Rule: `.header-bubble h1 { color: #00007e; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); }`
- Status: Correct

✅ **src/pages/services/gutters.astro**
- CSS Rule: `.header-bubble h1 { color: #00007e; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); }`
- Status: Correct

⚠️ **src/pages/services/index.astro** (Services Hub)
- **ISSUE FIXED:** Originally had `text-white` inline class
- CSS Rule: `.header-bubble h1 { color: #00007e; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); }` 
- Status: **NOW CORRECT** (fixed in last commit)

### Summary
- **5/5 service pages** are now correctly styled with brand blue H1
- **No pages need H1 color adjustments**
- **Documentation needs update** to prevent future confusion

---

## What Needs to Be Done

### 1. Update `src/design/bubble-stack-system.md`

**Current State:**
- Typography section exists but does NOT explicitly document H1 color rules
- Color strategy section mentions "Primary (Strongest): H1: `#00007e`" but lacks implementation detail
- No explicit CSS rule for `.header-bubble h1` color is shown

**Required Changes:**

#### Add H1-Specific CSS Rule Documentation
Insert new subsection "H1 Anchor Point CSS" under "Typography Hierarchy & Contrast" section:

```markdown
### H1 Anchor Point (Header Bubble)

**CSS Rule:**
```css
.header-bubble h1 {
  color: #00007e;              /* Brand blue — appears once per page */
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);  /* Lift text from background */
}
```

**Rules:**
- H1 color is **always `#00007e`** (brand blue) — no exceptions
- This rule must be present in the `<style>` block of every page using `.header-bubble`
- Do NOT use inline `text-white` or other color classes; rely on CSS rule to override
- Text-shadow is critical for readability over background images
- Applied to ALL pages using the Bubble Stack System
```

#### Update "Enforcement Rule" Section
Modify the existing enforcement rule to explicitly reference H1 styling:

**Current:** 
> "If uncertain about layout, color, spacing, or typography on any new page: Match the Roofing page exactly."

**Updated:**
> "If uncertain about layout, color, spacing, or typography on any new page: Match the Roofing page exactly."
>
> **Specific requirement for H1:** Every page must include `.header-bubble h1 { color: #00007e; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); }` in its `<style>` block. Do not rely on inline classes for H1 color.

#### Update "Implementation Checklist"
Add explicit H1 verification item:

```markdown
- [ ] H1 color rule present: `.header-bubble h1 { color: #00007e; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); }`
```

---

### 2. Verification of All Service Pages (Read-Only)

**Status:** All 5 service pages already have correct H1 styling. No changes needed.

**Verification results:**
- ✅ roofing.astro — brand blue H1
- ✅ water-damage-restoration.astro — brand blue H1
- ✅ siding.astro — brand blue H1
- ✅ gutters.astro — brand blue H1
- ✅ services/index.astro — brand blue H1 (just fixed)

---

## Implementation Plan

### Phase 1: Documentation (NO CODE CHANGES)
**File to modify:** `src/design/bubble-stack-system.md`

**Steps:**
1. Add "H1 Anchor Point (Header Bubble)" subsection with explicit CSS rule
2. Update "Enforcement Rule" to reference H1 styling requirement
3. Update "Implementation Checklist" to include H1 color verification
4. No changes to any `.astro` files
5. Commit message: "docs: standardize H1 color rule in Bubble Stack System documentation"

**Estimated effort:** 5 minutes

---

### Phase 2: Future Prevention
Once documentation is updated, future developers will:
- Copy the exact CSS rule from the Bubble Stack System doc
- Apply it to every new Bubble Stack page
- Never have to guess about H1 color again

---

## Files Affected

### Will Be Modified
- `src/design/bubble-stack-system.md` — Documentation only

### Will NOT Be Modified
- `src/pages/roofing.astro` — Already correct
- `src/pages/services/index.astro` — Already correct (H1 color)
- `src/pages/services/water-damage-restoration.astro` — Already correct
- `src/pages/services/siding.astro` — Already correct
- `src/pages/services/gutters.astro` — Already correct
- No other files require changes

---

## Verification Checklist (After Implementation)

- [ ] `src/design/bubble-stack-system.md` includes explicit `.header-bubble h1 { color: #00007e; }` rule
- [ ] Enforcement rule explicitly mentions H1 styling requirement
- [ ] Implementation checklist includes H1 color verification item
- [ ] All service pages still render correctly with brand blue H1 (visual check)
- [ ] Build completes with 0 errors (npm run build)
- [ ] Commit message is clear and references this plan

---

## Risk Assessment

**Risk Level:** ⬇️ **VERY LOW**

- Documentation-only change
- No code modifications
- No impact on rendered pages
- All pages already correctly styled
- Zero risk of breaking existing functionality

---

## Recommendation

**PROCEED with Phase 1 (Documentation Update)**

Once documentation is updated, this becomes the authoritative reference for all future implementations.

---

## Questions for Review

1. ✅ Should the H1 rule be added as a dedicated subsection or folded into existing "Typography Hierarchy"?
2. ✅ Should we add a "gotcha" note about inline color classes (e.g., `text-white`) overriding correct CSS?
3. ✅ Should we add an example comparison showing "WRONG" vs "RIGHT" CSS patterns?

---

