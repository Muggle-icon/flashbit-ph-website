import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderAppCarousel } from './components/app-carousel.mjs';

const baseSegments = (process.env.BASE_PATH || '/').split('/').filter(Boolean);
if (baseSegments.some(segment => !/^[A-Za-z0-9._~-]+$/.test(segment) || segment === '.' || segment === '..')) {
  throw new Error('BASE_PATH must be a URL path, such as / or /repository-name/.');
}
const basePath = baseSegments.length ? `/${baseSegments.join('/')}/` : '/';
const siteUrl = relativePath => `${basePath}${relativePath.replace(/^\/+/, '')}`;
const brandLockups = JSON.parse(await readFile(new URL('./brand-lockups.json', import.meta.url), 'utf8'));
const assetVersions = Object.fromEntries(await Promise.all(
  ['styles.css', 'carousel.css', 'carousel.js', ...Object.keys(brandLockups).map(id => `assets/${id}-lockup.svg`)].map(async file => [file,
    createHash('sha256').update(await readFile(new URL(`./dist/${file}`, import.meta.url))).digest('hex').slice(0, 12),
  ])
));
const assetUrl = file => `${siteUrl(file)}?v=${assetVersions[file]}`;
const dist = process.env.OUTPUT_DIR
  ? path.resolve(process.env.OUTPUT_DIR)
  : fileURLToPath(new URL('./dist/', import.meta.url));
const brands = [
  { id: 'livaya', name: 'LIVAYA', title: 'For home and your small business.', description: 'Loan information for household expenses and small-business cash flow.', label: 'Home, your shop and everyday life', needs: ['Household bills & groceries', 'Stock for your small shop', 'School-related expenses'], body: 'Groceries, household bills and supplies for your shop. Understand the cost of borrowing and plan your repayments.', scene: 'A woman checking her phone while working in a local shop.' },
  { id: 'alago', name: 'ALAGO', title: 'For everyday working life.', description: 'Explore the app, loan details and the steps before you apply.', label: 'The expenses between paydays', needs: ['Daily household expenses', 'Transport to and from work', 'Bills between paydays'], body: 'Daily expenses do not always line up with payday. Check your loan information and what you will need to repay.', photo: 'alago-worker-v2.png', scene: 'A man in a navy polo checking his phone during a break in a neighbourhood shop.' },
  { id: 'sulivo', name: 'SULIVO', title: 'For work and everyday expenses.', description: 'Understand borrowing costs and repayments for work and daily needs.', label: 'Work, orders and daily needs', needs: ['Supplies for your work', 'Everyday household bills', 'Small-business orders'], body: 'Work supplies, orders and everyday bills. Review your loan details and fit repayments into your budget.', photo: 'sulivo-seller-v2.png', scene: 'A short-haired woman checking her phone beside parcels on a small packing table.' },
];
const route = brand => siteUrl(`${brand.id}financing/`);
const arrow = '<span aria-hidden="true">↗</span>';
function brandLogo(brand) {
  const { width, height } = brandLockups[brand.id];
  return `<img class="brand-lockup" src="${assetUrl(`assets/${brand.id}-lockup.svg`)}" width="${width}" height="${height}" alt="${brand.name}">`;
}
function flashbitLogo(reverse = false) {
  return `<img class="flashbit-logo" src="${siteUrl(`assets/flashbit-logo${reverse ? '-reverse' : ''}.svg`)}" width="203" height="48" alt="Flashbit">`;
}
function header(brand = null) {
  const logo = brand
    ? `<a class="brand-wordmark" href="${route(brand)}#top" aria-label="${brand.name} home">${brandLogo(brand)}</a>`
    : `<a class="wordmark" href="${siteUrl('#top')}" aria-label="Flashbit home">${flashbitLogo()}</a>`;
  const navigation = brand
    ? '<a href="#features">Loan details</a><a href="#how-it-works">How it works</a><a href="#contact">Contact us</a>'
    : `<a href="${siteUrl('#top')}" aria-current="page">Home</a><a href="${siteUrl('#brands')}">Our Brands</a><a href="#contact">Contact us</a>`;
  return `<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="wrap header-inner">${logo}<nav aria-label="${brand ? brand.name : 'Main'} navigation">${navigation}</nav></div></header>`;
}
function footer(brand = null) {
  if (brand) {
    return `<footer id="contact" class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-company"><a class="brand-wordmark" href="${route(brand)}#top" aria-label="${brand.name} home">${brandLogo(brand)}</a><p>${brand.title}</p><p class="footer-caption">${brand.name} is a Flashbit brand.</p><a class="company-link" href="${siteUrl('#top')}">About Flashbit ${arrow}</a></div><div class="footer-brands"><h2>Explore ${brand.name}</h2><a href="#features">Loan details</a><a href="#how-it-works">How it works</a><a class="other-brands-link" href="${siteUrl('#brands')}">Other Flashbit brands ${arrow}</a></div><div class="footer-contact"><h2>Contact us</h2><dl><dt>Phone</dt><dd><a class="phone-link" href="tel:+639451292500">(0945) 129-2500</a></dd><dt>Address</dt><dd>3/F Prestige Tower, F. Ortigas Jr. Road,<br> Ortigas Center, San Antonio, Pasig City,<br> National Capital Region, 1600</dd></dl></div></div><div class="footer-bottom"><p>© 2026 Flashbit. All rights reserved.</p><p>${brand.name} · Philippines</p></div></div></footer>`;
  }
  return `<footer id="contact" class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-company"><a class="wordmark" href="${siteUrl('#top')}" aria-label="Flashbit home">${flashbitLogo(true)}</a><p>Flashbit Philippines</p><p class="footer-caption">Online lending brands and customer support.</p></div><div class="footer-brands"><h2>Our Brands</h2>${brands.map(b => `<a href="${route(b)}">${b.name} ${arrow}</a>`).join('')}</div><div class="footer-contact"><h2>Contact us</h2><dl><dt>Phone</dt><dd><a class="phone-link" href="tel:+639451292500">(0945) 129-2500</a></dd><dt>Address</dt><dd>3/F Prestige Tower, F. Ortigas Jr. Road,<br> Ortigas Center, San Antonio, Pasig City,<br> National Capital Region, 1600</dd></dl></div></div><div class="footer-bottom"><p>© 2026 Flashbit. All rights reserved.</p><p>Philippines</p></div></div></footer>`;
}
function portrait(brand, cls = '', loading = 'lazy') {
  if (brand.photo) return `<div class="portrait photo ${brand.id} ${cls}"><img src="${siteUrl(`assets/${brand.photo}`)}" alt="${brand.scene}" width="1254" height="1254" loading="${loading}" decoding="async"></div>`;
  return `<div class="portrait ${brand.id} ${cls}"><img src="${siteUrl(`assets/${brand.id}-welcome.png`)}" alt="${brand.scene}" width="1125" height="2436" loading="${loading}" decoding="async"></div>`;
}
function shell(title, description, body, brand = null) {
  const favicon = brand ? siteUrl(`assets/${brandLockups[brand.id].icon}`) : siteUrl('assets/flashbit-symbol.svg');
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#183f42"><title>${title}</title><meta name="description" content="${description}"><link rel="icon" href='${favicon}'><link rel="preload" href="${siteUrl('assets/fonts/Manrope-Variable.woff2')}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${assetUrl('styles.css')}">${brand ? `<link rel="stylesheet" href="${assetUrl('carousel.css')}"><script defer src="${assetUrl('carousel.js')}"></script>` : ''}</head><body id="top" class="${brand ? `brand-page ${brand.id}` : 'home-page'}">${header(brand)}<main id="main">${body}</main>${footer(brand)}</body></html>`;
}
function home() {
  return shell('Flashbit | Online lending brands in the Philippines', 'Get to know Flashbit and our online lending brands in the Philippines. Explore product information and find support.', `
  <section class="company-intro"><div class="wrap company-intro-grid">
    <div><p class="section-label">About our company</p><h1>Flashbit Philippines</h1></div>
    <p>Flashbit brings together LIVAYA, ALAGO and SULIVO. Find information about our online lending brands, their apps and how to contact us.</p>
  </div></section>
  <div class="company-scene"><img src="${siteUrl('assets/flashbit-community-v1.png')}" width="2170" height="725" alt="Everyday community shop scene: a man arranges stock while a woman checks her phone." fetchpriority="high" decoding="async"></div>
  <section id="brands" class="brands-section wrap" aria-labelledby="brands-title"><div class="directory-intro"><h2 id="brands-title">Our brands</h2><p>Visit a product website for loan information, the app guide and support.</p></div><div class="brand-directory">${brands.map(b => `<a class="brand-row ${b.id}" href="${route(b)}" aria-label="Visit ${b.name} website"><span class="directory-logo">${brandLogo(b)}</span><span class="directory-copy"><strong>${b.title}</strong><span>${b.description}</span></span><span class="directory-action">Visit ${b.name}<span aria-hidden="true">→</span></span></a>`).join('')}</div></section>`);
}
await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, 'index.html'), home());
function brandPage(b) {
  const features = [
    ['Amount & loan term', 'Check how much you will borrow and how long you have to repay.'],
    ['Interest, fees & total repayment', 'Review all charges and the full amount you will pay back.'],
    ['Payment dates & amounts', 'Know your first due date and the amount of each payment.'],
  ];
  const steps = [
    ['Open the app', `Start in the ${b.name} app and read the information on the welcome screen.`],
    ['Sign in', 'Use your phone number and follow the instructions in the app.'],
    ['Review & apply', 'Provide the requested details. Read the costs and repayment schedule before accepting an offer.'],
    ['Check your result', 'An application is subject to review. Follow the next steps shown in your app.'],
  ];
  return shell(`${b.name} | Online loans in the Philippines`, `Explore ${b.name}, a Flashbit online lending brand. See the app screens, loan information, repayment guidance and application steps.`, `
  <section class="product-masthead"><div class="wrap"><p class="product-category">Online lending · Philippines</p><h1>${b.name} online loans</h1><p>${b.body}</p></div></section>
  <section class="loan-guide wrap" id="features" aria-labelledby="features-title">
    <aside class="everyday-context" aria-label="Everyday borrowing needs">${portrait(b, '', 'eager')}<div class="everyday-copy"><h2>${b.label}</h2><ul>${b.needs.map(n => `<li>${n}</li>`).join('')}</ul><p>Borrow only what you can plan to repay.</p></div></aside>
    <div class="loan-checklist"><p class="section-label">Before you borrow</p><h2 id="features-title">Check your loan details</h2><p class="guide-intro">Your offer shows the details of your loan. Take a moment to review:</p><dl>${features.map((f,i) => `<div class="loan-check"><dt><span aria-hidden="true">${i+1}</span>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl><div class="guide-support"><p>Need help understanding your loan?</p><a href="#contact">Contact us <span aria-hidden="true">→</span></a></div></div>
    ${renderAppCarousel({ ...b, icon: brandLockups[b.id].icon }, siteUrl)}
  </section>
  <section class="steps-section" id="how-it-works"><div class="wrap"><div class="section-heading"><h2>How to use the ${b.name} app</h2><p>From signing in to reviewing your application.</p></div><ol class="steps-grid">${steps.map((s,i) => `<li class="step"><span class="step-number">${i+1}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></li>`).join('')}</ol><p class="steps-note">The screenshots illustrate the app journey. Amounts, terms and dates shown are examples; review your own offer before borrowing.</p></div></section>`, b);
}

for (const brand of brands) {
  const folder = path.join(dist, `${brand.id}financing`);
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), brandPage(brand));
}
console.log('Rendered Flashbit homepage and LIVAYA, ALAGO, SULIVO product pages.');

export { brands, route, header, footer, portrait, shell, dist };
