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
  {
    name: 'Water Damage Restoration (24/7)',
    slug: 'water-damage-restoration',
    short: 'Emergency mitigation, drying, and rebuild—start-to-finish restoration.',
    heroKws: ['Lexington KY water damage restoration', '24/7 water mitigation'],
  },
  {
    name: 'Gutters',
    slug: 'gutter-installation',
    short: 'Seamless gutters and storm-ready drainage solutions.',
    heroKws: ['emergency roof and gutter repair', 'gutter replacement'],
  },
  {
    name: 'Siding',
    slug: 'siding-replacement',
    short: 'Siding replacement and repair for storm-related and wear damage.',
    heroKws: ['gutter and siding replacement', 'siding repair'],
  },
] as const;

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Roofing', href: '/insurance-claims' },
  { label: 'Water Damage', href: '/water-damage' },
  { label: 'Request Inspection', href: '/request-inspection' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Team', href: '/the-team' },
  { label: 'Contact', href: '/contact' },
] as const;

export const NAV_LINKS_MOBILE = [
  { label: 'Home', href: '/' },
  ...NAV_LINKS,
] as const;
