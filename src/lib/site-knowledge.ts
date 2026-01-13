/**
 * Site Knowledge Base
 * 
 * Curated content for the chatbot to reference when answering questions.
 * This is server-side only and NOT shipped to the browser.
 */

export interface SiteKnowledge {
  services: Record<string, string>;
  faqs: Array<{ question: string; answer: string }>;
  company: {
    name: string;
    phone: string;
    email: string;
    areasServed: string[];
    businessHours: string;
  };
}

const siteKnowledge: SiteKnowledge = {
  services: {
    roofing:
      'Professional storm damage roof repair and restoration. Comprehensive damage documentation, local Kentucky expertise, and detailed inspection protocols.',
    'water-damage':
      'Emergency water damage restoration and cleanup. Fast 24/7 response to water emergencies, professional mitigation, and thorough restoration.',
    siding:
      'Siding repair and replacement services for residential and commercial properties. Expert installation and restoration.',
    gutters:
      'Professional gutter installation, cleaning, and repair services to protect your home from water damage.',
    'insurance-claims':
      'We help homeowners navigate the insurance claim process. Our contractors provide detailed damage documentation to support your claim.',
  },
  faqs: [
    {
      question: 'Are you licensed and insured?',
      answer:
        'Yes, we maintain full licensing and insurance coverage for all work performed. Credentials are available upon request.',
    },
    {
      question: 'Do you offer emergency services?',
      answer:
        'Yes, we provide 24/7 emergency response for water damage and storm damage. Call 888-370-9899 immediately for emergencies.',
    },
    {
      question: 'How do I schedule an inspection?',
      answer:
        'You can request an inspection through our website or call 888-370-9899. We typically respond within 24 hours.',
    },
    {
      question: 'What areas do you serve?',
      answer:
        'We serve Lexington, Louisville, and throughout Kentucky including Central KY, Metro Louisville, and South Kentucky regions.',
    },
    {
      question: 'Do you work with insurance companies?',
      answer:
        'Yes, we work with insurance companies and help homeowners document damage thoroughly for their claims.',
    },
  ],
  company: {
    name: 'Global Restoration',
    phone: '888-370-9899',
    email: 'contact@globalrestorationky.us',
    areasServed: [
      'Lexington',
      'Louisville',
      'Central Kentucky',
      'South Kentucky',
      'Metro Louisville',
    ],
    businessHours: '24/7 emergency response available',
  },
};

/**
 * Load site knowledge and optionally filter by service/page context
 */
export function loadSiteKnowledge(
  serviceTag?: string
): {
  knowledge: string;
  services: string[];
} {
  const servicesList = Object.keys(siteKnowledge.services);

  let knowledge = `You are the Global Restoration Assistant, representing Global Restoration, a professional water damage, roofing, siding, and gutter restoration company serving Kentucky.

Company Info:
- Phone: ${siteKnowledge.company.phone} (24/7)
- Email: ${siteKnowledge.company.email}
- Service Areas: ${siteKnowledge.company.areasServed.join(', ')}

Services Offered:
`;

  for (const [service, description] of Object.entries(
    siteKnowledge.services
  )) {
    knowledge += `- ${service}: ${description}\n`;
  }

  knowledge += `\nImportant Guidelines:
1. For emergencies or urgent issues, always recommend calling ${siteKnowledge.company.phone}
2. For scheduling inspections, direct users to request through the website or call ${siteKnowledge.company.phone}
3. Encourage users to get a free professional inspection to assess damage
4. Do not make guarantees about outcomes or pricing without professional assessment
5. For insurance claims, explain that our team can help document damage thoroughly
6. Keep responses friendly, professional, and helpful
7. If you don't know something, suggest contacting the team directly`;

  if (serviceTag && siteKnowledge.services[serviceTag]) {
    knowledge += `\nFocused Service Context: The user is asking about ${serviceTag}. Prioritize this service in your response.`;
  }

  knowledge += `\n\nFrequently Asked Questions:\n`;
  for (const faq of siteKnowledge.faqs) {
    knowledge += `Q: ${faq.question}\nA: ${faq.answer}\n\n`;
  }

  return { knowledge, services: servicesList };
}
