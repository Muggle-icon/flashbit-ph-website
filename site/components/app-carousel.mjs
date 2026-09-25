const screens = [
  { id: 'welcome', label: 'Welcome', alt: 'Welcome screen.', description: 'Read the introduction, then continue to the app.' },
  { id: 'login', label: 'Sign in', alt: 'Phone number sign-in screen.', description: 'Use your phone number and follow the instructions in the app.' },
  { id: 'home', label: 'Home', alt: 'Home screen.', description: 'Find loan information and explore the options on your home screen.' },
  { id: 'borrow', label: 'Loan details', alt: 'Loan details screen. Amounts and dates shown are examples.', description: 'Review the amount, term, interest, fees and repayment schedule before you decide.' },
];
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

/** One guide: the step descriptions are also the screenshot selectors. */
export function renderAppCarousel(brand, siteUrl) {
  if (!brand || !/^[a-z0-9-]+$/.test(brand.id) || !brand.name || typeof siteUrl !== 'function') {
    throw new Error('renderAppCarousel requires a brand id/name and a siteUrl function.');
  }
  const id = `app-carousel-${brand.id}`;
  const name = escapeHtml(brand.name);
  return `<figure class="app-carousel" data-app-carousel role="region" aria-roledescription="carousel" aria-label="${name} app screens" aria-describedby="${id}-caption">
    <div class="app-carousel-heading"><div class="section-heading"><h2 id="app-guide-title">Inside the ${name} app</h2><p>Explore the screens, from welcome to loan details.</p></div><button class="app-carousel-playback" type="button" data-carousel-playback aria-controls="${id}-screens" hidden>Pause autoplay</button></div>
    <div class="app-carousel-layout">
      <div class="app-carousel-navigation" data-carousel-controls hidden>
        <ol class="app-carousel-selectors" aria-label="Choose an app screen">${screens.map((screen, index) => `<li><button type="button" data-carousel-go="${index}" aria-controls="${id}-screens" aria-labelledby="${id}-label-${index}" aria-describedby="${id}-description-${index}"${index === 0 ? ' aria-current="true"' : ''}><span class="step-number" aria-hidden="true">${index + 1}</span><span class="step-copy"><strong id="${id}-label-${index}">${screen.label}</strong><span class="step-description" id="${id}-description-${index}">${screen.description}</span></span></button></li>`).join('')}</ol>
      </div>
      <div class="app-carousel-stage">
        <p class="app-carousel-current-description" data-carousel-description>${screens[0].description}</p>
        <div class="app-carousel-phone"><div class="app-carousel-viewport" id="${id}-screens" data-carousel-viewport tabindex="0" role="group" aria-label="App screenshots. Swipe or use the left and right arrow keys to explore.">
          ${screens.map((screen, index) => `<div class="app-carousel-slide" data-carousel-slide data-label="${screen.label}" data-description="${screen.description}" role="group" aria-roledescription="slide" aria-label="${index + 1} of ${screens.length}: ${screen.label}"><img src="${escapeHtml(siteUrl(`assets/${brand.id}-${screen.id}.png`))}" width="1125" height="2436" loading="lazy" decoding="async" draggable="false" alt="${name} ${screen.alt}"></div>`).join('\n')}
        </div></div>
        <div class="app-carousel-toolbar" data-carousel-controls hidden>
          <button class="app-carousel-arrow" type="button" data-carousel-previous aria-controls="${id}-screens" aria-label="Previous app screen"><span aria-hidden="true">←</span></button>
          <p class="app-carousel-position"><span data-carousel-label>${screens[0].label}</span><span data-carousel-count>1 / ${screens.length}</span></p>
          <button class="app-carousel-arrow" type="button" data-carousel-next aria-controls="${id}-screens" aria-label="Next app screen"><span aria-hidden="true">→</span></button>
        </div>
        <p class="app-carousel-fallback">Swipe to explore all four app screens.</p>
      </div>
    </div>
    <figcaption id="${id}-caption">App screenshots are examples. Review the details of your own offer.</figcaption>
    <span class="app-carousel-status" data-carousel-status aria-live="polite" aria-atomic="true"></span>
  </figure>`;
}
