# Image Integration Guide for Roofing Page

## Image Details
- **Purpose**: Professional roofing expertise section
- **What it shows**: Roofer performing professional roof inspection/repair work
- **Location on page**: Between initial CTA and FAQ section
- **Display**: Responsive grid (stacked on mobile, side-by-side on desktop)

## File Location & Naming
Save the image as:
```
src/assets/roofing/professional-roofer.jpg
```

**Directory path**:
```
C:\Users\josep\Documents\globalrestorationky.us\src\assets\roofing\
```

## How It's Positioned

### Desktop (lg screens, 1024px+)
- Image on left, text on right
- Ratio: 50/50 split
- Image height: auto (maintains aspect ratio)
- Shadow effect for depth

### Tablet (md screens, 768px+)
- Image on left, text on right
- Slightly adjusted spacing
- Image maintains aspect ratio

### Mobile (sm screens, <768px)
- Image stacked above text (full width)
- Maintains aspect ratio
- Auto height with 16:9 aspect ratio container
- Text follows below

## Responsive Styling Applied
- Rounded corners: `rounded-2xl`
- Shadow: `shadow-lg`
- Object fit: `object-cover` (crops to fit without distortion)
- Loading: `lazy` (loads on scroll)
- Alt text: SEO-optimized for accessibility

## Image Specifications (Recommended)
- **Format**: JPG (Astro will auto-optimize)
- **Dimensions**: 1200px × 800px (or similar 3:2 ratio)
- **File size**: 200-400 KB (Astro will compress)
- **Quality**: High resolution, sharp and professional
- **Focus**: Face/upper body visible, roof/work tools clear
- **Lighting**: Well-lit, professional quality

## What the Page Section Includes
1. **Image container** with lazy loading
2. **Trust-building copy**: "Professional Roofing You Can Trust"
3. **5-point value list** with checkmarks:
   - Certified inspections with detailed documentation
   - Clear explanations—no jargon, no pressure
   - Fair pricing and honest recommendations
   - Respectful of your home and property
   - Fast response to emergencies (24/7)

## Mobile/Desktop Optimization
✅ **Mobile** (stacked layout):
- Image full width at top
- Text flows below with full readability
- Checkmarks properly spaced
- Touch-friendly list items

✅ **Desktop** (2-column layout):
- Image on left (order-2 reversed)
- Text on right
- Clean visual balance
- Easy to scan

## How to Save the Image
1. Save the roofer photo as: `professional-roofer.jpg`
2. Place in: `src/assets/roofing/` folder
3. Run: `npm run build`
4. Astro will automatically:
   - Compress the JPG
   - Create WebP versions for modern browsers
   - Optimize for responsive display
   - Generate correct paths

## Build Command
```bash
npm run build
```

After saving the image, the build will automatically optimize it and include it in the production output.

## Expected Result
When you view `/roofing` page:
- Image displays prominently with proper sizing
- Text wraps appropriately on all devices
- Professional appearance with trust-building messaging
- Strong visual hierarchy
- CTA buttons remain accessible above and below section

---

**Note**: The page structure is ready. Just save the image file and run the build!
