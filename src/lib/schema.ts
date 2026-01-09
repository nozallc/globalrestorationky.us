/**
 * Schema.org structured data generators
 * Helps with SEO by providing explicit machine-readable data
 */

export interface SchemaProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'BreadcrumbList';
  data: Record<string, any>;
}

export function generateOrganizationSchema(baseUrl: string, name: string, phone: string, email: string, address: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': name,
    'url': baseUrl,
    'logo': `${baseUrl}/assets/NAME & LOGO BANNER.png`,
    'description': '24/7 Water Damage Restoration & Storm Roof Repair across Central Kentucky',
    'telephone': phone,
    'email': email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '616 W 3rd St',
      'addressLocality': 'Lexington',
      'addressRegion': 'KY',
      'postalCode': '40508',
      'addressCountry': 'US'
    },
    'sameAs': [
      // Add social profiles when available
      // 'https://www.facebook.com/...',
      // 'https://www.instagram.com/...'
    ],
    'serviceArea': {
      '@type': 'State',
      'name': 'Kentucky'
    }
  };
}

export function generateLocalBusinessSchema(baseUrl: string, name: string, phone: string, city: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': name,
    'url': baseUrl,
    'telephone': phone,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': city,
      'addressRegion': 'KY',
      'addressCountry': 'US'
    },
    'areaServed': {
      '@type': 'State',
      'name': 'Kentucky'
    }
  };
}

export function generateServiceSchema(baseUrl: string, serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceName,
    'description': description,
    'url': baseUrl,
    'provider': {
      '@type': 'Organization',
      'name': 'Global Restoration LLC'
    },
    'areaServed': {
      '@type': 'State',
      'name': 'Kentucky'
    },
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': baseUrl,
      'servicePhone': '888-370-9899'
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}
