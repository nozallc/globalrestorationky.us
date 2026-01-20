// Single source of truth for service area/city/hub structure (no SEO content)

export type ServiceAreaHubKey = 'lexington' | 'louisville' | 'south-ky';

export interface ServiceAreaCity {
  label: string;
  href: string;
  hub: ServiceAreaHubKey;
}

export interface ServiceAreaHub {
  key: ServiceAreaHubKey;
  label: string;
  href: string;
  cities: ServiceAreaCity[];
}

export const SERVICE_AREA_HUBS: ServiceAreaHub[] = [
  {
    key: 'lexington',
    label: 'Lexington & Central KY',
    href: '/lexington-ky-roofing-storm-damage-restoration',
    cities: [
      { label: 'Nicholasville', href: '/location/nicholasville', hub: 'lexington' },
      { label: 'Georgetown', href: '/location/georgetown', hub: 'lexington' },
      { label: 'Versailles', href: '/location/lexington/versailles', hub: 'lexington' },
      { label: 'Richmond', href: '/location/richmond', hub: 'lexington' },
      { label: 'Frankfort', href: '/location/frankfort', hub: 'lexington' },
      { label: 'Winchester', href: '/location/winchester-ky', hub: 'lexington' },
      { label: 'Paris', href: '/location/paris-ky', hub: 'lexington' },
      { label: 'Lancaster', href: '/location/lancaster-ky', hub: 'lexington' },
    ],
  },
  {
    key: 'louisville',
    label: 'Louisville',
    href: '/location/louisville',
    cities: [
      { label: 'Shelbyville', href: '/location/louisville/shelbyville', hub: 'louisville' },
    ],
  },
  {
    key: 'south-ky',
    label: 'South KY',
    href: '/location/south-ky',
    cities: [
      { label: 'Somerset', href: '/location/south-ky/somerset', hub: 'south-ky' },
      { label: 'Corbin', href: '/location/south-ky/corbin', hub: 'south-ky' },
      { label: 'London', href: '/location/south-ky/london', hub: 'south-ky' },
      { label: 'Berea', href: '/location/south-ky/berea', hub: 'south-ky' },
    ],
  },
];

// Flat list of all cities for convenience
export const SERVICE_AREA_CITIES: ServiceAreaCity[] = SERVICE_AREA_HUBS.flatMap(hub => hub.cities);
