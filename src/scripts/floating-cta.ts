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

console.log('[floating-cta] Script module loaded - execution proof', { href: location.href });

type CTAVisibilityState = 'hidden-initial' | 'visible-content' | 'hidden-footer';

let isInitialized = false;

function initFloatingCTA(): void {
  console.log('[floating-cta] initFloatingCTA() called');
  if (typeof document === 'undefined' || isInitialized) {
    console.log('[floating-cta] Early return: document undefined or already initialized');
    return;
  }
  isInitialized = true;

  // Cache DOM references once (prevents repeated queries in loops)
  const ctaElement = document.querySelector('.floating-cta') as HTMLElement | null;
  const footerElement = document.querySelector('.site-footer') as HTMLElement | null;

  console.log('[floating-cta] element query result:', { 
    ctaElement,
    ctaElementClasses: ctaElement?.className,
    footerElement,
  });
  if (ctaElement) {
    const computed = window.getComputedStyle(ctaElement);
    console.log('[floating-cta-debug] Computed styles:', { 
      display: computed.display, 
      opacity: computed.opacity, 
      visibility: computed.visibility, 
      position: computed.position,
      bottom: computed.bottom,
      zIndex: computed.zIndex,
      pointerEvents: computed.pointerEvents
    });
  }

  if (!ctaElement || !footerElement) {
    console.log('[floating-cta] Missing required elements, aborting');
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
    console.log('[floating-cta] state changed to:', newState);

    // Remove old classes, add new ones
    ctaElement.classList.remove('visible', 'hidden');

    if (currentState === 'visible-content') {
      ctaElement.classList.add('visible');
      console.log('[floating-cta] SHOW: added .visible class', {
        newClasses: ctaElement.className,
        computedDisplay: window.getComputedStyle(ctaElement).display,
        computedOpacity: window.getComputedStyle(ctaElement).opacity,
      });
    } else {
      ctaElement.classList.add('hidden');
      console.log('[floating-cta] HIDE: added .hidden class', {
        newClasses: ctaElement.className,
        computedDisplay: window.getComputedStyle(ctaElement).display,
        computedOpacity: window.getComputedStyle(ctaElement).opacity,
      });
    }
  }

  /**
   * Detect when footer enters/exits viewport
   * Uses small rootMargin buffer to hide CTA before footer is fully visible
   */
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log('[floating-cta] footerObserver fired:', { 
          isIntersecting: entry.isIntersecting,
          boundingClientRect: entry.boundingClientRect.top,
        });
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

    console.log('[floating-cta] Homepage detected. Hero section found:', !!heroSection, {
      selector: heroSection?.className,
    });

    if (heroSection) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log('[floating-cta] heroObserver fired:', { 
              isIntersecting: entry.isIntersecting,
              willToggleVisibility: entry.isIntersecting !== heroOutOfView,
            });
            heroOutOfView = !entry.isIntersecting;
            updateCTAVisibility();
          });
        },
        { threshold: 0 }
      );

      heroObserver.observe(heroSection);
    } else {
      // Fallback: treat as "hero passed" to allow pill to show
      console.log('[floating-cta] No hero section found, setting heroOutOfView=true (fallback)');
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
        // Sentinel is already positioned at ~300px mark, so no rootMargin needed
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
  console.log('[floating-cta] Initial state setup:', {
    isHomepage,
    heroOutOfView,
    footerInView,
    willShow: !footerInView && heroOutOfView,
  });
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

  console.log('[floating-cta] scheduleFloatingCTAInit started');

  let initTriggered = false;

  // Approach 1: requestIdleCallback (when browser is idle)
  if ('requestIdleCallback' in window) {
    console.log('[floating-cta] requestIdleCallback available, scheduling init');
    (window.requestIdleCallback as any)(
      () => {
        console.log('[floating-cta] requestIdleCallback fired');
        if (!initTriggered) {
          initTriggered = true;
          initFloatingCTA();
          removeInteractionListeners();
        }
      },
      { timeout: 1500 }
    );
  } else {
    console.log('[floating-cta] requestIdleCallback NOT available, using setTimeout');
    // Fallback: setTimeout for browsers without requestIdleCallback
    setTimeout(() => {
      console.log('[floating-cta] setTimeout fired');
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
    console.log('[floating-cta] First user interaction detected, triggering init');
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