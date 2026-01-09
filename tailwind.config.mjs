/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Open Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'global-blue': '#00007e',
        'global-red': '#ff4343',
        'brand-primary': '#1A3A5D',
        'brand-secondary': '#F5B942',
        'brand-accent': '#E5F0FF',
        'brand-neutral': '#F8FAFC',
        'brand-dark': '#222B3A',
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
      },
      boxShadow: {
        'card': '0 4px 16px rgba(30, 58, 138, 0.08)',
        'hover': '0 8px 24px rgba(30, 58, 138, 0.12)',
        'btn': '0 2px 8px rgba(30, 58, 138, 0.10)',
      },
      spacing: {
        'section': '2.5rem',
        'container': '1.25rem',
      },
      maxWidth: {
        'container': '1200px',
      },
      fontWeight: {
        'heading': '700',
        'body': '400',
      },
      fontSize: {
        'h1': '2.5rem',
        'h2': '2rem',
        'h3': '1.5rem',
        'body': '1rem',
      },
      transitionProperty: {
        'base': 'all',
      },
      transitionTimingFunction: {
        'base': 'cubic-bezier(0.4,0,0.2,1)',
      },
      transitionDuration: {
        'base': '200ms',
      },
      scale: {
        'card-hover': '1.03',
      },
    },
  },
  plugins: [],
};
