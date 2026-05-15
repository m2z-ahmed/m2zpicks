(function () {
  'use strict';

  /* ── Ad Slots Manager for Multiple Pages ── */
  
  // ════════════════════════════════════════════════════════
  // AD CONFIGURATION - CUSTOMIZE IMAGES, LINKS & ALT TEXT PER SLOT HERE
  // ════════════════════════════════════════════════════════
  const AD_CONFIG = {
    // Global settings
    restrictedZones: ['form', 'footer', 'nav', '.no-ads', '#comments', '.site-header'],

    // Per-slot image, link & alt text configuration (customize here)
    slots: {
      // HOMEPAGE ADS
      homepage: {
        'creator-picks': {
          image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKWdl5MfAcH1ZJMuOC5DySGxv3fqFGcOnY0AHhOR28XOlGsNcIlJ08gcOTDBOUSa8eVOWPzW42DcevBpJXN9Utls-DDxRV9wIEBeWwA1W6cGtYyQYFCI0yKVkXYMHqhjc1uICT_It8elvpkJY7tFaTfVzalGfWTPZ2j14ndG8dIjYQaCXGz6G2bZQKfv4/s1536/ChatGPT%20Image%20May%2015,%202026,%2003_41_12%20PM.png',
          link: '/contact.html',
          alt: 'Ads By M2ZPicks'
        },
        'categories': {
          image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKWdl5MfAcH1ZJMuOC5DySGxv3fqFGcOnY0AHhOR28XOlGsNcIlJ08gcOTDBOUSa8eVOWPzW42DcevBpJXN9Utls-DDxRV9wIEBeWwA1W6cGtYyQYFCI0yKVkXYMHqhjc1uICT_It8elvpkJY7tFaTfVzalGfWTPZ2j14ndG8dIjYQaCXGz6G2bZQKfv4/s1536/ChatGPT%20Image%20May%2015,%202026,%2003_41_12%20PM.png',
          link: '/contact.html',
          alt: 'Ads By M2ZPicks'
        }
      },
      
      // CREATORS PAGE ADS
      creators: {
        'page-controls': {
          image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKWdl5MfAcH1ZJMuOC5DySGxv3fqFGcOnY0AHhOR28XOlGsNcIlJ08gcOTDBOUSa8eVOWPzW42DcevBpJXN9Utls-DDxRV9wIEBeWwA1W6cGtYyQYFCI0yKVkXYMHqhjc1uICT_It8elvpkJY7tFaTfVzalGfWTPZ2j14ndG8dIjYQaCXGz6G2bZQKfv4/s1536/ChatGPT%20Image%20May%2015,%202026,%2003_41_12%20PM.png',
          link: '/contact.html',
          alt: 'Ads By M2ZPicks'
        }
      },
      
      // RANKINGS PAGE ADS
      rankings: {
        'leaderboard': {
          image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKWdl5MfAcH1ZJMuOC5DySGxv3fqFGcOnY0AHhOR28XOlGsNcIlJ08gcOTDBOUSa8eVOWPzW42DcevBpJXN9Utls-DDxRV9wIEBeWwA1W6cGtYyQYFCI0yKVkXYMHqhjc1uICT_It8elvpkJY7tFaTfVzalGfWTPZ2j14ndG8dIjYQaCXGz6G2bZQKfv4/s1536/ChatGPT%20Image%20May%2015,%202026,%2003_41_12%20PM.png',
          link: '/contact.html',
          alt: 'Ads By M2ZPicks'
        }
      },
      
      // BLOGS PAGE ADS
      blogs: {
        'after-6-cards': {
          image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKWdl5MfAcH1ZJMuOC5DySGxv3fqFGcOnY0AHhOR28XOlGsNcIlJ08gcOTDBOUSa8eVOWPzW42DcevBpJXN9Utls-DDxRV9wIEBeWwA1W6cGtYyQYFCI0yKVkXYMHqhjc1uICT_It8elvpkJY7tFaTfVzalGfWTPZ2j14ndG8dIjYQaCXGz6G2bZQKfv4/s1536/ChatGPT%20Image%20May%2015,%202026,%2003_41_12%20PM.png',
          link: '/contact.html',
          alt: 'Ads By M2ZPicks'
        }
      }
    }
  };

  // Helper function to get image for specific slot
  function getImageForSlot(page, slot) {
    return AD_CONFIG.slots[page]?.[slot]?.image || AD_CONFIG.slots.homepage['creator-picks'].image;
  }

  // Helper function to get link for specific slot
  function getLinkForSlot(page, slot) {
    return AD_CONFIG.slots[page]?.[slot]?.link || AD_CONFIG.slots.homepage['creator-picks'].link;
  }

  // Helper function to get alt text for specific slot
  function getAltForSlot(page, slot) {
    return AD_CONFIG.slots[page]?.[slot]?.alt || 'Ad By M2ZPicks';
  }

  // Utility Functions
  function getAdWidth() {
    const w = window.innerWidth;
    if (w < 480) return '300px';
    if (w < 768) return '300px';
    if (w < 1024) return '468px';
    return '728px';
  }

  function createAdElement(src, href, altText) {
    const wrap = document.createElement('div');
    wrap.setAttribute('data-ad-slot', 'true');
    wrap.style.cssText = 'grid-column: 1 / -1; display:block; margin:2rem auto; text-align:center; padding:1rem 0; width:100%;';

    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.cssText = 'display:inline-block;';

    const img = document.createElement('img');
    img.src = src;
    img.alt = altText;
    img.style.cssText = `max-width:${getAdWidth()}; height:auto; border-radius:6px; display:block;`;
    img.loading = 'lazy';

    link.appendChild(img);
    wrap.appendChild(link);
    return wrap;
  }

  function isInRestrictedZone(element) {
    return AD_CONFIG.restrictedZones.some((selector) => {
      try {
        return element.closest(selector);
      } catch (_err) {
        return false;
      }
    });
  }

  function removeExistingAds() {
    document.querySelectorAll('[data-ad-slot="true"]').forEach((el) => el.remove());
  }

  // ────────────────────────────────────────────
  // HOMEPAGE AD SLOTS
  // ────────────────────────────────────────────
  
  function injectHomepageAds() {
    // AD SLOT 1: After Creator Picks Section
    const creatorPicksSection = document.querySelector('[class*="creator"], [id*="creator"], .picks');
    if (creatorPicksSection) {
      const ad1 = createAdElement(getImageForSlot('homepage', 'creator-picks'), getLinkForSlot('homepage', 'creator-picks'), getAltForSlot('homepage', 'creator-picks'));
      creatorPicksSection.after(ad1);
    }

    // AD SLOT 2: After Category Buttons
    const categorySection = document.querySelector('.categories, [class*="category"], [id*="category-buttons"]');
    if (categorySection) {
      const ad2 = createAdElement(getImageForSlot('homepage', 'categories'), getLinkForSlot('homepage', 'categories'), getAltForSlot('homepage', 'categories'));
      categorySection.after(ad2);
    }
  }

  // ────────────────────────────────────────────
  // CREATORS PAGE AD SLOTS
  // ────────────────────────────────────────────
  
  function injectCreatorsPageAds() {
    // AD SLOT: After Page Controls
    const pageControls = document.querySelector('#creatorPager');
    if (pageControls) {
      const ad = createAdElement(getImageForSlot('creators', 'page-controls'), getLinkForSlot('creators', 'page-controls'), getAltForSlot('creators', 'page-controls'));
      pageControls.after(ad);
    }
  }

  // ────────────────────────────────────────────
  // RANKINGS PAGE AD SLOTS
  // ────────────────────────────────────────────
  
  function injectRankingsPageAds() {
    // AD SLOT: After Leaderboard, Before Methodology
    const leaderboard = document.querySelector('.leaderboard, [class*="leaderboard"], [id*="leaderboard"]');
    if (leaderboard) {
      const methodology = document.querySelector('.methodology, [class*="methodology"], [id*="methodology"]');
      const ad = createAdElement(getImageForSlot('rankings', 'leaderboard'), getLinkForSlot('rankings', 'leaderboard'), getAltForSlot('rankings', 'leaderboard'));
      
      if (methodology) {
        methodology.before(ad);
      } else {
        leaderboard.after(ad);
      }
    }
  }

  // ────────────────────────────────────────────
  // BLOGS PAGE AD SLOTS
  // ────────────────────────────────────────────
  
  function injectBlogsPageAds() {
    // AD SLOT: After 6 Blog Cards
    const blogCards = document.querySelectorAll('#allBlogs .blog-card');
    
    if (blogCards.length >= 6) {
      const sixthCard = blogCards[5];
      if (sixthCard && !isInRestrictedZone(sixthCard)) {
        const ad = createAdElement(getImageForSlot('blogs', 'after-6-cards'), getLinkForSlot('blogs', 'after-6-cards'), getAltForSlot('blogs', 'after-6-cards'));
        sixthCard.after(ad);
      }
    }
  }

  // ────────────────────────────────────────────
  // PAGE DETECTION & INITIALIZATION
  // ────────────────────────────────────────────
  
  function detectPageType() {
    const url = window.location.pathname;
    
    if (url.includes('/blogs') || url.includes('/blog')) {
      return 'blogs';
    } else if (url.includes('/creators') || url.includes('/creator')) {
      return 'creators';
    } else if (url.includes('/rankings') || url.includes('/ranking')) {
      return 'rankings';
    } else if (url === '/' || url === '/index.html' || url === '') {
      return 'homepage';
    }
    return null;
  }

  function injectAdsForPage() {
    removeExistingAds();
    const pageType = detectPageType();

    switch (pageType) {
      case 'homepage':
        injectHomepageAds();
        break;
      case 'creators':
        injectCreatorsPageAds();
        break;
      case 'rankings':
        injectRankingsPageAds();
        break;
      case 'blogs':
        injectBlogsPageAds();
        break;
      default:
        break;
    }
  }

  // ────────────────────────────────────────────
  // INITIALIZATION & OBSERVERS
  // ────────────────────────────────────────────
  
  function setupObservers() {
    // Initial injection with delay
    setTimeout(injectAdsForPage, 1000);

    // Observe DOM changes and re-inject ads
    let injectTimeout;
    const observer = new MutationObserver(() => {
      clearTimeout(injectTimeout);
      injectTimeout = setTimeout(injectAdsForPage, 1500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false
    });

    // Re-inject on resize to account for responsive changes
    window.addEventListener('resize', () => {
      clearTimeout(injectTimeout);
      injectTimeout = setTimeout(injectAdsForPage, 500);
    });
  }

  // Start the script when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObservers);
  } else {
    setupObservers();
  }
})();
