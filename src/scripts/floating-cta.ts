/**
 * Floating CTA Controller
 * 
 * Mobile-only floating inspection request button
 * 
 * Behavior:
 * - Homepage: Hidden until hero scrolls out of view, hidden when footer visible
 * - Other pages: Hidden until user scrolls threshold amount, hidden when footer visible
 * - Desktop (768px+): Never shows (JS + CSS double-guard)
 * - Uses IntersectionObserver for reliable detection
 */

// State machine to prevent race conditions
type CTAVisibilityState = 'hidden-initial' | 'visible-content' | 'hidden-footer';

function initFloatingCTA(): void {
  if (typeof document === 'undefined') return;

  // MOBILE-ONLY GUARD: Exit if desktop
  const isMobile = window.innerWidth < 768;
  if (!isMobile) {
    console.debug('Floating CTA: Desktop detected (768px+), skipping initialization');
    return;
  }

  const ctaElement = document.querySelector('.floating-cta') as HTMLElement | null;
  const footerElement = document.querySelector('.site-footer') as HTMLElement | null;
  const isHomepage = window.location.pathname === '/';

  // Guard against missing elements
  if (!ctaElement || !footerElement) {
    console.warn('Floating CTA: Missing required elements (cta or footer)');
    return;
  }

  // State tracking
  let currentState: CTAVisibilityState = 'hidden-initial';
  let footerInView = false;
  let heroOutOfView = !isHomepage; // Non-homepage starts as "hero out of view"

  /**
   * Determine visibility based on current state
   */
  function updateCTAVisibility(): void {
    let newState: CTAVisibilityState;

    if (footerInView) {
      newState = 'hidden-footer';
    } else if (heroOutOfView) {
      newState = 'visible-content';
    } else {
      newState = 'hidden-initial';
    }

    // Only update DOM if state changed (prevent unnecessary reflows)
    if (newState === currentState) return;

    currentState = newState;

    // Remove old classes, add new ones
    ctaElement.classList.remove('visible', 'hidden');

    if (currentState === 'visible-content') {
      ctaElement.classList.add('visible');
    } else {
      ctaElement.classList.add('hidden');
    }
  }

  /**
   * Detect when footer enters/exits viewport
   * Uses small rootMargin buffer to hide CTA before footer is fully visible
   */
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        footerInView = entry.isIntersecting;
        updateCTAVisibility();
      });
    },
    {
      threshold: 0.05,         // Trigger at 5% visible
      rootMargin: '50px 0 0 0', // Trigger 50px before footer enters
    }
  );

  footerObserver.observe(footerElement);

  // Homepage: Detect when hero scrolls out of view
  if (isHomepage) {
    const heroSection = document.querySelector('[data-hero], .hero-section, section:first-of-type') as HTMLElement | null;

    if (heroSection) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Hero in view = CTA hidden; Hero out of view = CTA shown (if footer not visible)
            heroOutOfView = !entry.isIntersecting;
            updateCTAVisibility();
          });
        },
        { threshold: 0 } // Fire as soon as hero edge leaves viewport
      );

      heroObserver.observe(heroSection);
    } else {
      console.warn('Floating CTA: Could not find hero section on homepage');
    }
  } else {
    // Non-homepage: Wait for user to scroll threshold amount
    // Use document as target and rootMargin to detect scroll position
    const scrollThresholdObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Marker exits top = user scrolled past threshold
          heroOutOfView = !entry.isIntersecting;
          updateCTAVisibility();
        });
      },
      {
        threshold: 0,
        rootMargin: '300px 0px -300px 0px', // Trigger ~300px down the page
      }
    );

    // Create sentinel element to detect scroll threshold
    const sentinel = document.createElement('div');
    sentinel.style.height = '0';
    sentinel.style.pointerEvents = 'none';
    sentinel.ariaHidden = 'true';

    // Insert sentinel after first real section (hero equivalent)
    const firstSection = document.querySelector('section');
    if (firstSection?.nextElementSibling) {
      firstSection.nextElementSibling.before(sentinel);
    } else if (firstSection) {
      firstSection.after(sentinel);
    } else {
      // Fallback: insert at top of main
      const main = document.querySelector('main');
      if (main?.firstChild) {
        main.insertBefore(sentinel, main.firstChild);
      }
    }

    scrollThresholdObserver.observe(sentinel);
  }

  // Set initial state
  updateCTAVisibility();
}

// Initialize on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingCTA);
  } else {
    // DOM already ready (e.g., after navigation)
    setTimeout(initFloatingCTA, 0);
  }
}
