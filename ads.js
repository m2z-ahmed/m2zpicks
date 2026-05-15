(function () {
  'use strict';

  /* ── Auto Ads Engine (Like Google Auto Ads) ── */
  const ads = [
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKWdl5MfAcH1ZJMuOC5DySGxv3fqFGcOnY0AHhOR28XOlGsNcIlJ08gcOTDBOUSa8eVOWPzW42DcevBpJXN9Utls-DDxRV9wIEBeWwA1W6cGtYyQYFCI0yKVkXYMHqhjc1uICT_It8elvpkJY7tFaTfVzalGfWTPZ2j14ndG8dIjYQaCXGz6G2bZQKfv4/s1536/ChatGPT%20Image%20May%2015,%202026,%2003_41_12%20PM.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrYC1orsTFkXVqaU4Mi70gJ09FLIRQrByALXsW6_7rM41_Af3p0IyRYWJEdif9rRhKJHanzKxVlb1-8o_zT2PKSjYnGzhcmuwB3Heppzn28fb8xsbZ7W6_13oJ7rlyxIJ7Suj7kP-KRbKKHUui_xxBxYbK8n7aVFAhLkm9rfc149haClZ7jr4jRidOsu0/s1536/ChatGPT%20Image%20May%2015,%202026,%2003_40_38%20PM.png',
    'https://blogger.googleusercontent.com/img/a/AVvXsEgv9E_FhRanAKllO0qm2GL2-mHtm6XnceHvG6oaFf64s8X80sjziAU7Z3YK6pqh4sO1dj6jxfq_4_ekypaOAtlSmKngjcxDaIgUvxFFuA57fDhwJRE_xksuN77nlQEfMDw_TEbbUljdFIX42snXjgZytJJQONEUHa_ALd8gChVh699-x52-PFFzNLZMyCk'
  ];

  const LINK = [
    'https://m2zpicks.netlify.app/contact',
    'https://m2zpicks.netlify.app/contact',
    'https://m2zpicks.netlify.app/contact'
  ];

  const ALT = [
    'Ad By M2ZPicks',
    'Ad By M2ZPicks',
    'Ad By M2ZPicks'
  ];
  const NO_ZONES = ['form', 'footer', 'nav', '.no-ads', '#comments', '.site-header'];

  function getAdWidth() {
    const w = window.innerWidth;
    if (w < 480) return '300px';
    if (w < 768) return '300px';
    if (w < 1024) return '468px';
    return '728px';
  }

  function createAdElement(src, adIndex) {
    const wrap = document.createElement('div');
    wrap.setAttribute('data-auto-ad', 'true');
    wrap.style.cssText = 'grid-column: 1 / -1; display:block; margin:2rem auto; text-align:center; padding:1rem 0; width:100%;';

    const link = document.createElement('a');
    link.href = LINK[adIndex];
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.cssText = 'display:inline-block;';

    const img = document.createElement('img');
    img.src = src;
    img.alt = ALT[adIndex];
    img.style.cssText = `max-width:${getAdWidth()}; height:auto; border-radius:6px; display:block;`;
    img.loading = 'lazy';

    link.appendChild(img);
    wrap.appendChild(link);
    return wrap;
  }

  function isInRestrictedZone(element) {
    return NO_ZONES.some((selector) => {
      try {
        return element.closest(selector);
      } catch (_err) {
        return false;
      }
    });
  }

  function inject() {
    document.querySelectorAll('[data-auto-ad]').forEach((el) => el.remove());

    const targetElements = document.querySelectorAll('.tool-card');
    if (!targetElements.length) return;

    const targetArray = Array.from(targetElements);
    let adCount = 0;

    targetArray.forEach((element, index) => {
      if (isInRestrictedZone(element)) return;
      if ((index + 1) % 24 === 0) {
        const adIndex = adCount % ads.length;
        const ad = createAdElement(ads[adIndex], adIndex);
        element.after(ad);
        adCount += 1;
      }
    });
  }

  function setupObservers() {
    setTimeout(inject, 1000);

    let injectTimeout;
    const observer = new MutationObserver(() => {
      clearTimeout(injectTimeout);
      injectTimeout = setTimeout(inject, 1500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false
    });

    window.addEventListener('resize', () => {
      clearTimeout(injectTimeout);
      injectTimeout = setTimeout(inject, 500);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObservers);
  } else {
    setupObservers();
  }
})();
