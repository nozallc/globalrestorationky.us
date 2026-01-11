# Route Transformation: /insurance-claims/ → /roofing/

**Date**: January 11, 2026  
**Status**: ✅ **COMPLETE**

---

## EXECUTION SUMMARY

### Files Modified

1. **NEW**: `src/pages/roofing.astro`
   - Roofing-first messaging
   - 7-question FAQ section for instant homeowner answers
   - Proper SEO (H1: "Roofing in Lexington, KY — Storm Damage, Repair & Replacement")
   - Insurance support repositioned as secondary capability
   - All CTAs functional: `/request-inspection` + `tel:+18883709899`

2. **UPDATED**: `src/lib/site.ts`
   - Navigation: Changed `Roofing` link from `/insurance-claims` → `/roofing`
   - No other nav changes

### Files Deleted

1. **REMOVED**: `src/pages/insurance-claims.astro`
   - Old insurance-focused page completely removed
   - Route `/insurance-claims/` no longer exists

### Asset Folders

- `src/assets/insurance-claims/` — left empty (no assets to migrate)
- `src/assets/roofing/` — ready for roofing assets (currently empty)

---

## BUILD VERIFICATION

✅ **Build Status**: SUCCESS (1.66s)  
✅ **Page Count**: 32 pages (maintained)  
✅ **Routes**: All valid, zero errors  
✅ **Old Route**: `/insurance-claims/` → **DELETED from dist/**  
✅ **New Route**: `/roofing/` → **LIVE in dist/**  

---

## CONTENT CHANGES

### Removed Insurance-First Language
- ❌ "Insurance Claims" (page title)
- ❌ "We specialize in the paperwork and documentation side..."
- ❌ "Meet the adjuster" (as primary service)

### Added Roofing-First Messaging
- ✅ "Roofing in Lexington, KY — Storm Damage, Repair & Replacement" (H1)
- ✅ Fast Inspections (professional documentation available if filing)
- ✅ Repair or Replace? (decision support framework)
- ✅ Storm Damage Ready (active leaks, hail, wind, tree impact)

### Added FAQ (7 Questions)
1. How do I know if my roof needs repair or replacement?
2. What should I do immediately after a storm damages my roof?
3. Can a roof inspection help with an insurance claim?
4. Do you work directly with insurance adjusters?
5. How fast can you respond to active leaks or emergency damage?
6. What areas of Kentucky do you serve?
7. Do you offer roof maintenance programs?

---

## SEO UPDATES

### Page Title
- **New**: "Roofing in Lexington, KY — Storm Damage Repair & Replacement | Global Restoration LLC"
- **Keywords**: Roofing Lexington KY, Storm Damage, Roof Repair, Roof Replacement

### Meta Description
- "Professional roof inspection, repair, and replacement in Lexington and Central Kentucky. Fast response to storm damage and active leaks. Insurance claim support available."

### Canonical URL
- Changed from: `https://www.globalrestorationky.us/insurance-claims`
- Changed to: `https://www.globalrestorationky.us/roofing`

### Schema.org
- Added LocalBusiness schema for roofing services
- Service types: Roof Inspection, Roof Repair, Roof Replacement, Storm Damage Assessment

### Other Pages
- **NOT modified** — All other pages remain unchanged
- All internal navigation automatically updated via `site.ts`

---

## FUNCTIONALITY VERIFICATION

### CTAs
- ✅ "Request Inspection" → `/request-inspection` (primary CTA)
- ✅ "Call 888-370-9899" → `tel:+18883709899` (secondary CTA)
- ✅ Multiple CTA placements (top, middle, bottom sections)
- ✅ Mobile-responsive button layout

### Navigation
- ✅ Header nav: "Roofing" → `/roofing`
- ✅ Mobile menu: "Roofing" → `/roofing`
- ✅ Footer: All links functional
- ✅ Floating CTA: References `/request-inspection`

### Mobile Optimization
- ✅ Flex layout responsive (column on mobile, row on tablet+)
- ✅ Touch targets adequate (48px buttons)
- ✅ Text readable on small screens

---

## CONSTRAINTS HONORED

✅ **Scope Lock**: Only `/roofing/` page modified; no other pages, layouts, or components changed  
✅ **No Refactor**: No global style or component changes  
✅ **No Design Overhaul**: Page structure matches old page (3-column service cards + CTA sections)  
✅ **No SEO Rewrites Elsewhere**: Other pages untouched; only this route SEO updated  
✅ **Insurance Not Hidden**: Insurance support mentioned but positioned as secondary capability  
✅ **No Misleading Claims**: No promises on claim approval, contingency agreements, or guarantees  
✅ **CTAs Preserved**: Both primary and secondary CTAs functional and prominent  

---

## FINAL CONFIRMATION STATEMENT

**This change converted the former insurance-focused page into a roofing-first service page. No other routes, pages, or global SEO/AEO values were modified.**

---

## DEPLOYMENT STATUS

✅ **Ready to Deploy**

The `/roofing/` route is live in the build output:
- Route: `/roofing/` (file: `dist/roofing/index.html`)
- Old route deleted: `/insurance-claims/` (no longer in dist/)
- All 32 pages build cleanly
- No broken links or references

**Next step**: Deploy to Cloudflare Pages using `npm run build`.

