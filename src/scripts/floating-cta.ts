/**
 * Floating CTA Controller (ALL DEVICES)
 * 
 * Behavior:
 * - Hidden until hero scrolls out of view
 * - Hidden when footer enters viewport
 * - Uses IntersectionObserver for efficient detection
 * - Staged initialization for Lighthouse performance
 * - Works on all pages and all devices
 */

type CTAVisibilityState = 'hidden-initial' | 'visible-content' | 'hidden-footer';

let isInitialized = false;

function initFloatingCTA(): void {
  if (typeof document === 'undefined' || isInitialized) return;
  isInitialized = true;

  // Cache DOM references once (prevents repeated queries in loops)
  const ctaElement = document.querySelector('.floating-cta') as HTMLElement | null;
  const footerElement = document.querySelector('.site-footer') as HTMLElement | null;

  if (!ctaElement || !footerElement) {
    return;
  }

  const isHomepage = window.location.pathname === '/';

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
    // Improved hero detection: try multiple selectors matching actual page structures
    const heroSection = document.querySelector(
      '#hero, [data-hero], .hero, .hero-band, .hero-wrap, .hero-section, .home-services-bubble, section:first-of-type'
    ) as HTMLElement | null;

    if (heroSection) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            heroOutOfView = !entry.isIntersecting;
            updateCTAVisibility();
          });
        },
        { threshold: 0 }
      );

      heroObserver.observe(heroSection);
    } else {
      // Fallback: treat as "hero passed" to allow pill to show
      heroOutOfView = true;
    }
  } else {
    // Non-homepage: Detect when user scrolls past ~300px threshold using sentinel
    const scrollThresholdObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          heroOutOfView = !entry.isIntersecting;
          updateCTAVisibility();
        });
      },
      {
        threshold: 0,
        rootMargin: '300px 0px -300px 0px',
      }
    );

    // Create sentinel element with improved insertion logic
    const sentinel = document.createElement('div');
    sentinel.style.height = '0';
    sentinel.style.pointerEvents = 'none';
    sentinel.ariaHidden = 'true';

    const main = document.querySelector('main');
    const firstSection = main?.querySelector('section');
    
    if (firstSection?.nextElementSibling) {
      firstSection.nextElementSibling.before(sentinel);
    } else if (firstSection) {
      firstSection.after(sentinel);
    } else if (main?.firstChild) {
      main.insertBefore(sentinel, main.firstChild);
    } else {
      // Ultimate fallback: insert at document body start
      document.body.insertBefore(sentinel, document.body.firstChild);
    }

    scrollThresholdObserver.observe(sentinel);
  }

  // Set initial state
  updateCTAVisibility();
}

/**
 * Staged initialization for Lighthouse performance:
 * 1. Use requestIdleCallback to init after page settles (timeout: 1500ms)
 * 2. Also trigger on first user interaction for responsiveness
 * 3. One-time listeners that self-remove after first trigger
 */
function scheduleFloatingCTAInit(): void {
  if (typeof window === 'undefined') return;

  let initTriggered = false;

  // Approach 1: requestIdleCallback (when browser is idle)
  if ('requestIdleCallback' in window) {
    (window.requestIdleCallback as any)(
      () => {
        if (!initTriggered) {
          initTriggered = true;
          initFloatingCTA();
          removeInteractionListeners();
        }
      },
      { timeout: 1500 }
    );
  } else {
    // Fallback: setTimeout for browsers without requestIdleCallback
    setTimeout(() => {
      if (!initTriggered) {
        initTriggered = true;
        initFloatingCTA();
        removeInteractionListeners();
      }
    }, 800);
  }

  // Approach 2: First user interaction (pointerdown, keydown, or scroll)
  // This ensures pill works even if requestIdleCallback is delayed
  function onFirstInteraction() {
    if (!initTriggered) {
      initTriggered = true;
      initFloatingCTA();
      removeInteractionListeners();
    }
  }

  function removeInteractionListeners() {
    document.removeEventListener('pointerdown', onFirstInteraction, true);
    document.removeEventListener('keydown', onFirstInteraction, true);
    window.removeEventListener('scroll', onFirstInteraction, true);
  }

  // Add one-time listeners (capture phase for pointerdown, passive for scroll)
  document.addEventListener('pointerdown', onFirstInteraction, { capture: true, once: true });
  document.addEventListener('keydown', onFirstInteraction, { once: true });
  window.addEventListener('scroll', onFirstInteraction, { passive: true, once: true });
}

// Schedule initialization
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleFloatingCTAInit);
  } else {
    scheduleFloatingCTAInit();
  }
}