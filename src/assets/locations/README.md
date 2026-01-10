# Locations Assets — See service-areas/regions/

**Note:** This folder is deprecated. All city/location assets have been moved to a hierarchical structure under `service-areas/regions/`.

## Current Structure

City images are now organized by their **region hub**:

```
src/assets/service-areas/regions/
├── lexington-central-ky/
│   ├── lexington/
│   ├── nicholasville/
│   ├── georgetown/
│   ├── versailles/
│   ├── richmond/
│   ├── frankfort/
│   ├── winchester/
│   ├── paris/
│   └── lancaster/
├── louisville-metro/
│   ├── louisville/
│   └── shelbyville/
└── south-ky/
    ├── somerset/
    ├── corbin/
    ├── london/
    └── berea/
```

## How to Add a New City

1. Identify which **region hub** the city belongs to
2. Create a new folder under `src/assets/service-areas/regions/{region-hub}/{city-name}/`
3. Add your city images there
4. The corresponding page route will be: `/location/{city-slug}` or `/location/{region-hub}/{city-slug}`

## See Also

- [src/assets/README.md](../README.md) — Main documentation
- [src/assets/service-areas/README.md](../service-areas/README.md) — Service areas structure guide

**Do not store city assets in this folder.** This is for reference only.
