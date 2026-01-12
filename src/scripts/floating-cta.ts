/**
 * Floating CTA Controller
 * 
 * Manages visibility of floating CTA button based on:
 * 1. Homepage: Hidden until hero section scrolls out of view, hidden when footer visible
 * 2. Other pages: Visible after scroll threshold, hidden when footer visible
 * 3. Uses IntersectionObserver for reliable detection
 */

function initFloatingCTA() {
  if (typeof document === 'undefined') return;

  const cta = document.querySelector('.floating-cta') as HTMLElement | null;
  const footer = document.querySelector('.site-footer') as HTMLElement | null;
  const heroSection = document.querySelector('section:first-of-type'); // Hero section on homepage
  const isHomepage = window.location.pathname === '/';

  if (!cta || !footer) {
    console.warn('Floating CTA: Missing elements (cta or footer)');
    return;
  }

  // Type narrowing for TypeScript: we know cta and footer are not null after guard above
  const ctaElement = cta as HTMLElement;
  const footerElement = footer as HTMLElement;

  let shouldShow = !isHomepage; // On non-homepage, start as potentially visible
  let footerInView = false;

  // IntersectionObserver for footer visibility
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        footerInView = entry.isIntersecting;
        updateCTAVisibility();
      });
    },
    { threshold: 0.1 }
  );

  footerObserver.observe(footerElement);

  // For homepage: observe hero section to hide CTA until hero is out of view
  if (isHomepage && heroSection) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Hide CTA while hero is in view
          shouldShow = !entry.isIntersecting;
          updateCTAVisibility();
        });
      },
      { threshold: 0 }
    );

    heroObserver.observe(heroSection);
  } else if (!isHomepage) {
    // On other pages: show immediately (not homepage, so show right away)
    shouldShow = true;
    updateCTAVisibility();
  }

  function updateCTAVisibility() {
    // Hide if footer is in view, otherwise follow shouldShow logic
    if (footerInView) {
      ctaElement.classList.remove('visible');
      ctaElement.classList.add('hidden');
    } else if (shouldShow) {
      ctaElement.classList.remove('hidden');
      ctaElement.classList.add('visible');
    } else {
      ctaElement.classList.remove('visible');
      ctaElement.classList.add('hidden');
    }
  }

  // Set initial state
  updateCTAVisibility();
}

// Initialize immediately on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingCTA);
  } else {
    // DOM already ready
    setTimeout(initFloatingCTA, 0);
  }
}
