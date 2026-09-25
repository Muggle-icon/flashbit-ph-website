const screens = [
  { id: 'welcome', label: 'Welcome', description: 'Welcome screen.' },
  { id: 'login', label: 'Sign in', description: 'Phone number sign-in screen.' },
  { id: 'home', label: 'Home', description: 'Home screen.' },
  { id: 'borrow', label: 'Loan details', description: 'Loan details screen. Amounts and dates shown are examples.' },
];

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

/** Full, unchanged screenshots; controls are progressively enabled by carousel.js. */
export function renderAppCarousel(brand, siteUrl) {
  if (!brand || !/^[a-z0-9-]+$/.test(brand.id) || !brand.name || typeof siteUrl !== 'function') {
    throw new Error('renderAppCarousel requires a brand id/name and a siteUrl function.');
  }
  const id = `app-carousel-${brand.id}`;
  const name = escapeHtml(brand.name);
  return `<figure class="app-carousel" data-app-carousel role="region" aria-roledescription="carousel" aria-label="${name} app screens" aria-describedby="${id}-caption">
  <div class="app-carousel-stage">
    <div class="app-carousel-heading"><img src="${escapeHtml(siteUrl(`assets/${brand.icon || `${brand.id}-icon.png`}`))}" width="360" height="360" alt="" loading="lazy"><span>Inside the ${name} app</span></div>
    <div class="app-carousel-phone">
      <div class="app-carousel-viewport" id="${id}-screens" data-carousel-viewport tabindex="0" role="group" aria-label="App screenshots. Swipe or use the left and right arrow keys to explore.">
        ${screens.map((screen, index) => `<div class="app-carousel-slide" data-carousel-slide data-label="${screen.label}" role="group" aria-roledescription="slide" aria-label="${index + 1} of ${screens.length}: ${screen.label}"><img src="${escapeHtml(siteUrl(`assets/${brand.id}-${screen.id}.png`))}" width="1125" height="2436" loading="lazy" decoding="async" draggable="false" alt="${name} ${screen.description}"></div>`).join('\n        ')}
      </div>
    </div>
    <div class="app-carousel-controls" data-carousel-controls hidden>
      <div class="app-carousel-toolbar">
        <button class="app-carousel-arrow" type="button" data-carousel-previous aria-controls="${id}-screens" aria-label="Previous app screen"><span aria-hidden="true">←</span></button>
        <p class="app-carousel-position"><span data-carousel-label>${screens[0].label}</span><span data-carousel-count>1 / ${screens.length}</span></p>
        <button class="app-carousel-arrow" type="button" data-carousel-next aria-controls="${id}-screens" aria-label="Next app screen"><span aria-hidden="true">→</span></button>
      </div>
      <div class="app-carousel-selectors" role="group" aria-label="Choose an app screen">${screens.map((screen, index) => `<button type="button" data-carousel-go="${index}" aria-controls="${id}-screens"${index === 0 ? ' aria-current="true"' : ''}>${screen.label}</button>`).join('')}</div>
      <button class="app-carousel-playback" type="button" data-carousel-playback aria-controls="${id}-screens">Pause autoplay</button>
    </div>
    <p class="app-carousel-fallback">Swipe to explore all four app screens.</p>
  </div>
  <figcaption id="${id}-caption">App screenshots are examples. Review the details of your own offer.</figcaption>
  <span class="app-carousel-status" data-carousel-status aria-live="polite" aria-atomic="true"></span>
</figure>`;
}
