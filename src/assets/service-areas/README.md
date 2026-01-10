# src/assets/service-areas/ — Region Hub & City Structure

This folder contains all assets for the Service Areas section, organized hierarchically by **region hub** and then by **city**.

## Folder Structure

```
service-areas/
├── regions/                          # All region hubs and their cities
│   ├── lexington-central-ky/         # Lexington & Central KY region hub
│   │   ├── lexington/                # Main city: Lexington
│   │   ├── nicholasville/            # City: Nicholasville
│   │   ├── georgetown/               # City: Georgetown
│   │   ├── versailles/               # City: Versailles
│   │   ├── richmond/                 # City: Richmond
│   │   ├── frankfort/                # City: Frankfort
│   │   ├── winchester/               # City: Winchester
│   │   ├── paris/                    # City: Paris
│   │   └── lancaster/                # City: Lancaster
│   │
│   ├── louisville-metro/             # Louisville region hub
│   │   ├── louisville/               # Main city: Louisville
│   │   └── shelbyville/              # City: Shelbyville
│   │
│   └── south-ky/                     # South KY region hub
│       ├── somerset/                 # City: Somerset
│       ├── corbin/                   # City: Corbin
│       ├── london/                   # City: London
│       └── berea/                    # City: Berea
```

## What Goes in Each Folder

### Region Hub Folders
(`lexington-central-ky/`, `louisville-metro/`, `south-ky/`)

- Regional map assets
- Region overview images
- Hub-specific hero backgrounds

### City Folders
(e.g., `lexington-central-ky/lexington/`, `south-ky/somerset/`)

- City-specific hero images
- Local landmark photos
- City map assets
- Testimonials or local case studies
- FAQ section images

## Naming Convention

- **Folder names:** kebab-case (lowercase, hyphens only)
- **Region hubs:** `{region-name}-{descriptor}` (e.g., `lexington-central-ky`, `louisville-metro`)
- **Cities:** `{city-name}` (e.g., `lexington`, `somerset`)

## Adding a New City

To add a new city to the site:

1. **Determine the region hub** — Which region does it belong to?
2. **Create the folder structure:**
   ```
   src/assets/service-areas/regions/{region-hub}/{city-name}/
   ```
3. **Add images to the city folder**
4. **Create the page** — Add the corresponding `.astro` file under `src/pages/location/`
5. **Update `src/lib/serviceAreas.ts`** — Add the city to the appropriate hub

### Example: Adding "Winchester" to Lexington Region

```
src/assets/service-areas/regions/lexington-central-ky/winchester/
  ├── hero-winchester.jpg
  ├── landmark-downtown.jpg
  └── map-winchester.png
```

Then create: `src/pages/location/winchester-ky.astro` (or add to the structure)

## Image Format & Size Guidelines

- **Hero images:** 1920×1080 px (16:9), 100–300 KB (WebP/JPG)
- **Landmark photos:** 800×600 px or 600×400 px, 50–150 KB
- **Maps:** 600×400 px, 30–80 KB
- **File formats:** JPG (photos), PNG (graphics), SVG (icons)

## Route Mapping

| Folder Path | Page Route | Type |
|---|---|---|
| `lexington-central-ky/lexington/` | `/location/lexington` | Region hub |
| `lexington-central-ky/nicholasville/` | `/location/nicholasville` | City |
| `louisville-metro/louisville/` | `/location/louisville` | Region hub |
| `louisville-metro/shelbyville/` | `/location/louisville/shelbyville` | City |
| `south-ky/somerset/` | `/location/south-ky/somerset` | City |

## See Also

- [../README.md](../README.md) — Main assets documentation
- `src/lib/serviceAreas.ts` — Single source of truth for region/city structure
