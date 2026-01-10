# src/assets/ Directory Structure

This folder organizes page-specific image and media assets in a scalable, predictable way. Each subfolder maps to a route or section of the site, making it easy to locate and manage assets.

## Folder Naming Convention

- **Kebab-case format** (lowercase with hyphens, no spaces or underscores)
- **Route-based naming** (folder name matches the page intent/route)
- **One folder per major page/feature**
- **`global/` folder for shared assets** used across multiple pages

---

## Folder Structure & Contents

```
src/assets/
├── home/                      # Homepage hero, sections, call-to-action images
├── services/                  # Service hub page, service card visuals
├── roofing/                   # Roofing-specific service content (future use)
├── water-damage/              # Water damage service page content
├── service-areas/             # Service areas hub + region/city hierarchies
│   ├── regions/               # Organized by region hub → cities
│   │   ├── lexington-central-ky/
│   │   │   ├── lexington/
│   │   │   ├── nicholasville/
│   │   │   ├── georgetown/
│   │   │   ├── versailles/
│   │   │   ├── richmond/
│   │   │   ├── frankfort/
│   │   │   ├── winchester/
│   │   │   ├── paris/
│   │   │   └── lancaster/
│   │   ├── louisville-metro/
│   │   │   ├── louisville/
│   │   │   └── shelbyville/
│   │   └── south-ky/
│   │       ├── somerset/
│   │       ├── corbin/
│   │       ├── london/
│   │       └── berea/
│   └── README.md              # Service areas structure guide
├── insurance-claims/          # Insurance claims page assets
├── request-inspection/        # Inspection request form page assets
├── the-team/                  # Team member photos, bios, profiles
├── contact/                   # Contact page form, location images
├── chatbot/                   # Chatbot UI assets (future use)
├── locations/                 # DEPRECATED - See service-areas/regions/ instead
│   └── README.md              # Pointer to new structure
└── global/                    # Shared assets (logos, icons, backgrounds, fonts)
    ├── logos/                 # Company logos, brand marks (all sizes)
    ├── icons/                 # SVG icons, UI components (used site-wide)
    ├── backgrounds/           # Hero backgrounds, overlays (reusable)
    └── patterns/              # Design patterns, textures (shared)
```

---

## What Goes in Each Folder

### `home/`
- Hero section images (banner, background, overlay)
- Section background images
- CTA button graphics or backgrounds
- Quick facts checkmark icons or illustrations

### `services/`
- Service card icons or images
- Service hub page hero
- Category backgrounds

### `roofing/`
- Roofing-specific hero or section images
- Roofing project photos (before/after)
- Roofing process illustrations

### `water-damage/`
- Water damage recovery images
- Emergency response photos
- Mitigation process diagrams

### `service-areas/`
- Service areas hub page hero image
- Region hub overview images and maps
- City-specific hero images and location photos
- See `service-areas/README.md` for detailed structure (region/city hierarchy)

### `insurance-claims/`
- Insurance claim process infographics
- Documentation examples
- Claim support visuals

### `request-inspection/`
- Form section backgrounds
- Inspection process images
- Timeline or step graphics

### `the-team/`
- Team member headshots / professional photos
- Team bios graphics
- LinkedIn integration assets

### `contact/`
- Contact form backgrounds
- Location/map images
- Office photos

### `chatbot/`
- Chatbot avatar/icon
- Chat interface assets
- Message bubble designs (for future chatbot feature)

### `locations/`
- Location-specific hero images
- City/town landmark photos
- Location-based service area maps
- Separate subfolders for major hubs (e.g., `locations/lexington/`, `locations/louisville/`)

### `global/`
- **logos/** — Company logo (all formats/sizes: favicon, header, footer)
- **icons/** — SVG icons (check marks, arrows, social, UI elements)
- **backgrounds/** — Overlays, gradients, reusable hero backgrounds
- **patterns/** — Textures, design patterns, repeated elements
- **fonts/** — Web font files (if self-hosted)

---

## Recommended Image Formats & Sizes for Web

### Format Guidelines
- **JPG** — Photographs, complex scenes, high-quality photos (use quality ~75-85%)
- **WebP** — Modern format, smaller file size, good quality (fallback to JPG)
- **PNG** — Graphics with transparency, logos, icons
- **SVG** — Scalable vector graphics, icons, logos, illustrations (preferred for icons)

### Size Guidelines by Use Case

#### Hero Images
- **Desktop:** 1920×1080 px (16:9 aspect ratio)
- **Mobile:** 768×1024 px (min) or 375×667 px (full mobile)
- **File size:** 100–300 KB (compressed WebP/JPG)
- **Format:** WebP with JPG fallback

#### Service Card Images
- **Size:** 600×400 px or 800×600 px (4:3 or 16:9)
- **File size:** 50–150 KB
- **Format:** WebP or JPG

#### Team Member Photos
- **Size:** 500×500 px (1:1 square) or 600×750 px (headshot)
- **File size:** 80–150 KB
- **Format:** JPG with WebP variant

#### Icons & Logos
- **SVG:** Preferred (scalable, no size limit needed)
- **PNG fallback:** 256×256 px minimum for quality
- **File size:** 5–50 KB (SVG) or 10–30 KB (PNG)

#### Background Images
- **Desktop:** 1920×1080 px or larger
- **Mobile:** 768×1024 px or larger
- **File size:** 150–400 KB (highly compressed)
- **Format:** WebP with JPG fallback; consider using CSS gradients + subtle pattern

#### Thumbnails / Previews
- **Size:** 300×200 px (4:3) or 400×300 px
- **File size:** 30–60 KB
- **Format:** JPG or WebP

---

## Service Areas → Regions → Cities Structure

The site organizes cities under **region hubs** (e.g., Lexington & Central KY, Louisville, South KY). This mirrors the business service model and site navigation.

### Region Hubs
- **Lexington & Central KY** (`lexington-central-ky/`) — Main hub with 9 cities
- **Louisville** (`louisville-metro/`) — Secondary hub with 2 cities
- **South KY** (`south-ky/`) — Tertiary hub with 4 cities

### All Cities Mapped

| Region Hub | Cities |
|---|---|
| **Lexington & Central KY** | Lexington (hub), Nicholasville, Georgetown, Versailles, Richmond, Frankfort, Winchester, Paris, Lancaster |
| **Louisville** | Louisville (hub), Shelbyville |
| **South KY** | Somerset, Corbin, London, Berea |

### Adding a New City

To add a new city page and assets:

1. **Create the asset folder:**
   ```
   src/assets/service-areas/regions/{region-hub}/{city-name}/
   ```
   Example: `src/assets/service-areas/regions/lexington-central-ky/winchester/`

2. **Add city images** (hero, landmarks, maps) to the folder

3. **Create the page file** under `src/pages/location/`
   - Standalone cities: `src/pages/location/{city-slug}.astro`
   - Nested under hub: `src/pages/location/{region-slug}/{city-slug}.astro`

4. **Update `src/lib/serviceAreas.ts`:**
   - Add the city to the appropriate `SERVICE_AREA_HUB` in the `cities` array

---

### Import in Component/Page File

```astro
---
// Direct import (best for static, known paths)
import heroImage from '../assets/home/hero-banner.jpg';
import logo from '../assets/global/logos/logo-dark.svg';
---

<img src={heroImage} alt="Hero section background" />
<img src={logo} alt="Company logo" />
```

### Using in HTML with Public Path

```astro
<!-- Use /src/assets/ images via public path (after build) -->
<img src="/src/assets/home/hero-banner.jpg" alt="Hero" />

<!-- Or reference relative paths if in same folder -->
<img src="../assets/home/my-image.jpg" alt="Image" />
```

### Using in Astro Image Component (Optimized)

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/home/hero-banner.jpg';
---

<Image 
  src={heroImage} 
  alt="Hero section background"
  width={1920}
  height={1080}
  format="webp"
/>
```

### Using in CSS/Tailwind

```css
.hero-bg {
  background-image: url('/src/assets/home/hero-pattern.webp');
  background-size: cover;
  background-position: center;
}
```

### Dynamic Image Path in Loops

```astro
---
const images = [
  '../assets/services/service-1.jpg',
  '../assets/services/service-2.jpg',
  '../assets/services/service-3.jpg',
];
---

{images.map((img) => (
  <img src={img} alt="Service image" />
))}
```

---

## File Naming Best Practices

Use clear, descriptive names in kebab-case:

- ✅ `hero-banner-desktop.jpg`
- ✅ `team-member-joe-headshot.jpg`
- ✅ `service-card-water-damage.png`
- ✅ `icon-checkmark.svg`
- ❌ `IMG_1234.jpg`
- ❌ `image.jpg`
- ❌ `hero_banner.jpg` (use hyphens, not underscores)

---

## Performance Tips

1. **Compress images** before uploading:
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Aim for <150 KB for most web images

2. **Use WebP** when possible:
   - Smaller file sizes (20-30% smaller than JPG)
   - Provide JPG fallback for older browsers

3. **Lazy load non-critical images:**
   ```astro
   <img src="..." alt="..." loading="lazy" />
   ```

4. **Set explicit dimensions:**
   ```astro
   <img src="..." alt="..." width="1920" height="1080" />
   ```
   Prevents layout shift (improves Lighthouse CLS score)

5. **Use srcset for responsive images:**
   ```astro
   <img 
     src="image-lg.jpg" 
     srcset="image-sm.jpg 480w, image-lg.jpg 1920w"
     alt="Responsive image"
   />
   ```

---

## Adding New Pages

When a new page is added to `src/pages/`:

1. Create a matching folder in `src/assets/` using kebab-case route name
2. Update this README with the new folder description
3. Add subfolders if needed (e.g., `src/assets/new-page/sections/`, `src/assets/new-page/icons/`)

---

## Notes

- **Do not commit empty folders** to version control (optional: add `.gitkeep` files if needed)
- **Keep assets organized by page** — do not dump everything in `global/`
- **Global folder is for shared assets only** (logos, icons, backgrounds used on 3+ pages)
- **All paths assume Astro project root** — adjust relative paths as needed for your component depth

---

**Last Updated:** January 10, 2026
**Project:** Global Restoration KY
