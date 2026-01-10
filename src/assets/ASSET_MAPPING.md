# Asset Folder Mapping to Pages Routes

This document maps every page route in `src/pages/**` to its corresponding asset folder in `src/assets/`.

## Pages Found (27 total)

### Root & Main Pages

| Page File | Route | Asset Folder |
|---|---|---|
| `index.astro` | `/` | `src/assets/home/` |
| `contact.astro` | `/contact` | `src/assets/contact/` |
| `insurance-claims.astro` | `/insurance-claims` | `src/assets/insurance-claims/` |
| `request-inspection.astro` | `/request-inspection` | `src/assets/request-inspection/` |
| `service-areas.astro` | `/service-areas` | `src/assets/service-areas/` |
| `water-damage.astro` | `/water-damage` | `src/assets/water-damage/` |

### Services

| Page File | Route | Asset Folder |
|---|---|---|
| `services/index.astro` | `/services` | `src/assets/services/` |
| `services/[slug].astro` | `/services/water-damage-restoration` | `src/assets/water-damage/` |
| `services/[slug].astro` | `/services/insurance-roofing-claims` | `src/assets/roofing/` |
| `services/[slug].astro` | `/services/gutter-installation` | `src/assets/services/` |
| `services/[slug].astro` | `/services/siding-replacement` | `src/assets/services/` |

### Team

| Page File | Route | Asset Folder |
|---|---|---|
| `the-team/index.astro` | `/the-team` | `src/assets/the-team/` |
| `the-team/je.astro` | `/the-team/je` | `src/assets/the-team/` |
| `the-team/oc.astro` | `/the-team/oc` | `src/assets/the-team/` |
| `the-team/je-vcf.astro` | `/the-team/je-vcf` | `src/assets/the-team/` |
| `the-team/oc-vcf.astro` | `/the-team/oc-vcf` | `src/assets/the-team/` |

### Locations — Lexington & Central KY Region Hub

| Page File | Route | Asset Folder |
|---|---|---|
| `location/lexington/index.astro` | `/location/lexington` | `src/assets/service-areas/regions/lexington-central-ky/lexington/` |
| `location/lexington/versailles.astro` | `/location/lexington/versailles` | `src/assets/service-areas/regions/lexington-central-ky/versailles/` |
| `location/nicholasville.astro` | `/location/nicholasville` | `src/assets/service-areas/regions/lexington-central-ky/nicholasville/` |
| `location/georgetown.astro` | `/location/georgetown` | `src/assets/service-areas/regions/lexington-central-ky/georgetown/` |
| `location/richmond.astro` | `/location/richmond` | `src/assets/service-areas/regions/lexington-central-ky/richmond/` |
| `location/frankfort.astro` | `/location/frankfort` | `src/assets/service-areas/regions/lexington-central-ky/frankfort/` |
| (planned) | `/location/winchester-ky` | `src/assets/service-areas/regions/lexington-central-ky/winchester/` |
| (planned) | `/location/paris-ky` | `src/assets/service-areas/regions/lexington-central-ky/paris/` |
| (planned) | `/location/lancaster-ky` | `src/assets/service-areas/regions/lexington-central-ky/lancaster/` |

### Locations — Louisville Region Hub

| Page File | Route | Asset Folder |
|---|---|---|
| `location/louisville/index.astro` | `/location/louisville` | `src/assets/service-areas/regions/louisville-metro/louisville/` |
| `location/louisville/shelbyville.astro` | `/location/louisville/shelbyville` | `src/assets/service-areas/regions/louisville-metro/shelbyville/` |

### Locations — South KY Region Hub

| Page File | Route | Asset Folder |
|---|---|---|
| `location/south-ky/index.astro` | `/location/south-ky` | `src/assets/service-areas/regions/south-ky/` |
| `location/south-ky/somerset.astro` | `/location/south-ky/somerset` | `src/assets/service-areas/regions/south-ky/somerset/` |
| `location/south-ky/corbin.astro` | `/location/south-ky/corbin` | `src/assets/service-areas/regions/south-ky/corbin/` |
| `location/south-ky/london.astro` | `/location/south-ky/london` | `src/assets/service-areas/regions/south-ky/london/` |
| `location/south-ky/berea.astro` | `/location/south-ky/berea` | `src/assets/service-areas/regions/south-ky/berea/` |

### Dynamic Route

| Page File | Route | Asset Folder |
|---|---|---|
| `location/[slug].astro` | (catch-all for unmapped cities) | `src/assets/service-areas/regions/{region}/` |

---

## Summary

✅ **Total pages:** 27 .astro files  
✅ **Asset folder coverage:** 100% — Every page route has a mapped asset folder  
✅ **Region hubs:** 3 (Lexington & Central KY, Louisville, South KY)  
✅ **Cities mapped:** 13 actual pages + 3 planned  
✅ **Folder structure:** Hierarchical (service-areas → regions → hub → city)  

---

## Notes

- **Planned cities** (Winchester, Paris, Lancaster) have asset folders ready but pages haven't been created yet
- **Dynamic route** `[slug].astro` is a fallback catch-all for any unmapped locations
- All non-location asset folders are organized by page/feature (home, services, team, etc.)
- **Shared assets** (logos, icons) go in `global/` folder

---

**Last Updated:** January 10, 2026
