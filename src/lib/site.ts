export const SITE = {
  name: 'Global Restoration LLC',
  phone: '888-370-9899',
  tel: '+18883709899',
  email: 'hello@globalrestorationky.us',
  url: 'https://www.globalrestorationky.us',
  addressLine: '616 W 3rd St, Lexington, KY 40508',
} as const;

export const CITIES = [
  { name: 'Lexington', slug: 'lexington-ky' },
  { name: 'Nicholasville', slug: 'nicholasville-ky' },
  { name: 'Georgetown', slug: 'georgetown-ky' },
  { name: 'Richmond', slug: 'richmond-ky' },
  { name: 'Frankfort', slug: 'frankfort-ky' },
  { name: 'Winchester', slug: 'winchester-ky' },
  { name: 'Versailles', slug: 'versailles-ky' },
  { name: 'Paris', slug: 'paris-ky' },
  { name: 'Lancaster', slug: 'lancaster-ky' },
] as const;

export const SERVICES = [
  {
    name: 'Roofing Insurance Claims',
    slug: 'insurance-roofing-claims',
    short: 'Storm, wind & hail damage documentation + insurance-ready scopes.',
    heroKws: [
      'insurance claim roof repair',
      'hail damage roof inspection',
      'wind damage roof replacement',
    ],
  },
] as const;

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Roofing', href: '/roofing' },
  { label: 'Siding', href: '/services/siding' },
  { label: 'Gutters', href: '/services/gutters' },
  { label: 'Water Damage', href: '/services/water-damage-restoration' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Team', href: '/the-team' },
  { label: 'Contact', href: '/contact' },
] as const;

export const NAV_LINKS_MOBILE = [
  { label: 'Home', href: '/' },
  ...NAV_LINKS,
] as const;
