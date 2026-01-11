/**
 * Mobile Menu Handler
 * 
 * Deferred script for mobile menu toggle functionality.
 * This script is loaded asynchronously after initial render
 * since the mobile menu is not visible above-the-fold.
 */

export function initMobileMenu(): void {
  const menuBtn = document.querySelector('.mobile-menu-btn') as HTMLButtonElement | null;
  const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement | null;

  if (!menuBtn || !mobileMenu) {
    console.warn('Mobile menu elements not found');
    return;
  }

  // Toggle menu open/closed on button click
  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    const newValue = isExpanded ? 'false' : 'true';
    menuBtn.setAttribute('aria-expanded', newValue);
    mobileMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
    });
  });
}

// Only run on the client
if (typeof document !== 'undefined') {
  // Initialize mobile menu when script loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
}
