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
const assetVersions = Object.fromEntries(await Promise.all(
  ['styles.css', 'carousel.css', 'carousel.js'].map(async file => [file,
    createHash('sha256').update(await readFile(new URL(`./dist/${file}`, import.meta.url))).digest('hex').slice(0, 12),
  ])
));
const assetUrl = file => `${siteUrl(file)}?v=${assetVersions[file]}`;
const dist = process.env.OUTPUT_DIR
  ? path.resolve(process.env.OUTPUT_DIR)
  : fileURLToPath(new URL('./dist/', import.meta.url));
const brands = [
  { id: 'livaya', name: 'LIVAYA', title: 'For everyday needs.', description: 'Explore loan information for household expenses and small-business cash flow.', label: 'Home, your shop, and the everyday in between.', hero: 'Online loans for<br><span>everyday needs.</span>', body: 'Household expenses, shop supplies, or a gap between payments. Get to know LIVAYA and review the amount, costs and repayment dates before you decide.', scene: 'A woman checking her phone while working in a local shop.' },
  { id: 'alago', name: 'ALAGO', title: 'Loan information, on your phone.', description: 'Get familiar with the app, loan details and the steps before you apply.', label: 'Everyday working life. Information on your phone.', hero: 'Online loans.<br><span>Clear next steps.</span>', body: 'For the expenses between one payday and the next. Explore the ALAGO app, check your loan details and understand the repayment schedule before you apply.', photo: 'alago-worker-v2.png', scene: 'A man in a navy polo checking his phone during a break in a neighbourhood shop.' },
  { id: 'sulivo', name: 'SULIVO', title: 'For work and everyday plans.', description: 'A closer look at borrowing for daily expenses and self-employed life.', label: 'Daily expenses, orders, and your next working day.', hero: 'Everyday plans.<br><span>Online loan options.</span>', body: 'Work, orders and daily expenses do not always follow the same schedule. Explore SULIVO and review your loan options, costs and repayment dates.', photo: 'sulivo-seller-v2.png', scene: 'A short-haired woman checking her phone beside parcels on a small packing table.' },
];
const route = brand => siteUrl(`${brand.id}financing/`);
const arrow = '<span aria-hidden="true">↗</span>';
function brandLogo(brand) {
  const width = { alago: 390, livaya: 447, sulivo: 417 }[brand.id];
  return `<span class="brand-lockup"><img class="brand-symbol" src="${siteUrl(`assets/${brand.id}-icon.png`)}" width="360" height="360" alt=""><img class="brand-lettering" src="${siteUrl(`assets/${brand.id}-wordmark.png`)}" width="${width}" height="201" alt="${brand.name}"></span>`;
}
function header(brand = null) {
  const logo = brand
    ? `<a class="brand-wordmark" href="${route(brand)}#top" aria-label="${brand.name} home">${brandLogo(brand)}</a>`
    : `<a class="wordmark" href="${siteUrl('#top')}" aria-label="Flashbit home">Flashbit<span class="wordmark-period">.</span></a>`;
  const navigation = brand
    ? '<a href="#features">Loan details</a><a href="#how-it-works">How it works</a><a href="#contact">Contact us</a>'
    : `<a href="${siteUrl('#top')}" aria-current="page">Home</a><a href="${siteUrl('#brands')}">Our Brands</a><a href="#contact">Contact us</a>`;
  return `<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="wrap header-inner">${logo}<nav aria-label="${brand ? brand.name : 'Main'} navigation">${navigation}</nav></div></header>`;
}
function footer(brand = null) {
  if (brand) {
    return `<footer id="contact" class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-company"><a class="brand-wordmark" href="${route(brand)}#top" aria-label="${brand.name} home">${brandLogo(brand)}</a><p>${brand.title}</p><p class="footer-caption">${brand.name} is a Flashbit brand.</p><a class="company-link" href="${siteUrl('#top')}">About Flashbit ${arrow}</a></div><div class="footer-brands"><h2>Explore ${brand.name}</h2><a href="#features">Loan details</a><a href="#how-it-works">How it works</a><a class="other-brands-link" href="${siteUrl('#brands')}">Other Flashbit brands ${arrow}</a></div><div class="footer-contact"><h2>Contact us</h2><dl><dt>Phone</dt><dd>(0945) 129-2500</dd><dt>Address</dt><dd>3/F Prestige Tower, F. Ortigas Jr. Road,<br>Ortigas Center, San Antonio, Pasig City,<br>National Capital Region, 1600</dd></dl></div></div><div class="footer-bottom"><p>© 2026 Flashbit. All rights reserved.</p><p>${brand.name} · Philippines</p></div></div></footer>`;
  }
  return `<footer id="contact" class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-company"><p class="wordmark">Flashbit<span class="wordmark-period">.</span></p><p>One shared vision.<br>Three distinct brands.</p><p class="footer-caption">Get to know Flashbit in the Philippines.</p></div><div class="footer-brands"><h2>Our Brands</h2>${brands.map(b => `<a href="${route(b)}">${b.name} ${arrow}</a>`).join('')}</div><div class="footer-contact"><h2>Contact us</h2><dl><dt>Phone</dt><dd>(0945) 129-2500</dd><dt>Address</dt><dd>3/F Prestige Tower, F. Ortigas Jr. Road,<br>Ortigas Center, San Antonio, Pasig City,<br>National Capital Region, 1600</dd></dl></div></div><div class="footer-bottom"><p>© 2026 Flashbit. All rights reserved.</p><p>Philippines</p></div></div></footer>`;
}
function portrait(brand, cls = '', loading = 'lazy') {
  if (brand.photo) return `<div class="portrait photo ${brand.id} ${cls}"><img src="${siteUrl(`assets/${brand.photo}`)}" alt="${brand.scene}" width="1254" height="1254" loading="${loading}" decoding="async"></div>`;
  return `<div class="portrait ${brand.id} ${cls}"><img src="${siteUrl(`assets/${brand.id}-welcome.png`)}" alt="${brand.scene}" width="1125" height="2436" loading="${loading}" decoding="async"></div>`;
}
function shell(title, description, body, brand = null) {
  const favicon = brand ? siteUrl(`assets/${brand.id}-icon.png`) : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect width="64" height="64" rx="16" fill="%23183F42"/%3E%3Cpath d="M23 49V28H17V21H23V18Q23 8 34 8H43V16H36Q32 16 32 20V21H42V28H32V49Z" fill="white"/%3E%3C/svg%3E';
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#183f42"><title>${title}</title><meta name="description" content="${description}"><link rel="icon" href='${favicon}'><link rel="preload" href="${siteUrl('assets/fonts/Manrope-Variable.woff2')}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${assetUrl('styles.css')}">${brand ? `<link rel="stylesheet" href="${assetUrl('carousel.css')}"><script defer src="${assetUrl('carousel.js')}"></script>` : ''}</head><body id="top" class="${brand ? `brand-page ${brand.id}` : 'home-page'}">${header(brand)}<main id="main">${body}</main>${footer(brand)}</body></html>`;
}
function home() {
  return shell('Flashbit | Online lending brands in the Philippines', 'Meet LIVAYA, ALAGO and SULIVO. Explore our online lending brands, their apps, loan information and contact details.', `
  <section class="home-hero"><div class="wrap home-hero-grid">
    <div class="hero-copy"><p class="product-category">Flashbit Philippines</p><h1>Online lending.<br>For everyday needs.</h1><p class="hero-intro">Meet LIVAYA, ALAGO and SULIVO.</p><p class="hero-description">Three brands for everyday financial needs. Explore the apps, learn what to check before borrowing, and find the support you need.</p><div class="home-brand-line">${brands.map(b=>`<span class="home-brand-badge">${brandLogo(b)}</span>`).join('')}</div></div>
    <div class="home-visual">${portrait(brands[0], 'main-portrait', 'eager')}<div class="portrait-inset">${portrait(brands[1], '', 'eager')}</div><p class="home-photo-note">For work, home and everyday life.</p></div>
  </div></section>
  <section id="brands" class="brands-section"><div class="wrap"><div class="section-heading"><div><h2>Find your brand.<br>Get to know your loan.</h2></div><p>Start with the app and product information.<br>Make time to understand the details.</p></div><div class="brand-grid">${brands.map(b => `<article class="brand-card ${b.id}"><div class="brand-card-top"><h3>${brandLogo(b)}</h3><p class="card-parent">Online lending</p></div><p class="brand-card-title">${b.title}</p><p class="brand-card-desc">${b.description}</p><a class="brand-card-link" href="${route(b)}">Explore ${b.name}</a></article>`).join('')}</div></div></section>`);
}
await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, 'index.html'), home());
function brandPage(b) {
  const features = [
    ['Loan amount & term', 'Review the amount and available term. Borrow only what you can plan to repay.'],
    ['Interest, fees & total cost', 'Check all charges and the total repayment in your own offer before accepting.'],
    ['Repayment schedule', 'Know the first due date and each payment amount. Plan them around your budget.'],
    ['Questions & support', 'Use the app support option or the contact details below if you need help.'],
  ];
  const steps = [
    ['Find the app', `Look for ${b.name} in your app store and check the app name before downloading.`],
    ['Register your details', 'Start with your phone number and follow the instructions in the app.'],
    ['Complete your application', 'Provide the requested information and review your loan and repayment details.'],
    ['Check the result', 'If approved, follow the instructions in the app for receiving your funds.'],
  ];
  return shell(`${b.name} | Online loans in the Philippines`, `Explore ${b.name}, a Flashbit online lending brand. See the app screens, loan information, repayment guidance and application steps.`, `
  <section class="brand-hero"><div class="wrap brand-hero-grid"><div class="brand-hero-copy"><p class="product-category">Online lending in the Philippines</p><h1>${b.hero}</h1><p class="brand-intro">${b.body}</p><div class="hero-actions"><a class="primary-link" href="#features">View loan details</a><a class="secondary-link" href="#how-it-works">How it works</a></div><p class="hero-small-note">Check the full cost and repayment schedule before you borrow.</p></div><figure class="brand-hero-image">${portrait(b, '', 'eager')}<figcaption>${b.label}</figcaption></figure></div></section>
  <div class="loan-basics"><div class="wrap loan-basics-grid"><p class="basics-intro">Before you decide</p><p><strong>Loan amount</strong><span>What you will borrow</span></p><p><strong>Total repayment</strong><span>What you will pay back</span></p><p><strong>Payment dates</strong><span>When each payment is due</span></p></div></div>
  <section class="features-section wrap" id="features" aria-labelledby="features-title"><div class="features-copy"><p class="section-label">Get to know ${b.name}</p><h2 id="features-title">A clearer picture.<br>Before you borrow.</h2><p class="section-intro">See the actual app screens and get familiar with the details that matter to your loan.</p><div class="feature-list">${features.map(f => `<article class="feature-item"><h3>${f[0]}</h3><p>${f[1]}</p></article>`).join('')}</div><a class="support-link" href="#contact">Have a question? Contact us</a></div>${renderAppCarousel(b, siteUrl)}</section>
  <section class="steps-section" id="how-it-works"><div class="wrap"><div class="section-heading"><h2>How to get started.</h2><p>Four steps to get familiar<br>with the ${b.name} app.</p></div><ol class="steps-grid">${steps.map((s,i) => `<li class="step"><span class="step-number">${i+1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('')}</ol><p class="steps-note">An application is subject to review. Check the full loan details and repayment schedule before accepting an offer.</p></div></section>`, b);
}

for (const brand of brands) {
  const folder = path.join(dist, `${brand.id}financing`);
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), brandPage(brand));
}
console.log('Rendered Flashbit homepage and LIVAYA, ALAGO, SULIVO product pages.');

export { brands, route, header, footer, portrait, shell, dist };
