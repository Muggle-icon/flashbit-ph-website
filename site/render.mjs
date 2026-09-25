import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const baseSegments = (process.env.BASE_PATH || '/').split('/').filter(Boolean);
if (baseSegments.some(segment => !/^[A-Za-z0-9._~-]+$/.test(segment) || segment === '.' || segment === '..')) {
  throw new Error('BASE_PATH must be a URL path, such as / or /repository-name/.');
}
const basePath = baseSegments.length ? `/${baseSegments.join('/')}/` : '/';
const siteUrl = relativePath => `${basePath}${relativePath.replace(/^\/+/, '')}`;
const styleVersion = createHash('sha256')
  .update(await readFile(new URL('./dist/styles.css', import.meta.url)))
  .digest('hex').slice(0, 12);
const dist = process.env.OUTPUT_DIR
  ? path.resolve(process.env.OUTPUT_DIR)
  : fileURLToPath(new URL('./dist/', import.meta.url));
const brands = [
  { id: 'livaya', name: 'LIVAYA', title: 'Room for everyday life.', description: 'For the shop, the household, and the days in between.', label: 'Everyday life, a little clearer.', hero: 'A little room<br>for <em>everyday life.</em>', body: 'For everyday expenses and the small business you look after. Get to know LIVAYA, with loan details you can review at your own pace.', scene: 'A woman checking her phone while working in a local shop.' },
  { id: 'alago', name: 'ALAGO', title: 'Clarity for your working day.', description: 'Straightforward information, right on your phone.', label: 'Your day. A clearer next step.', hero: 'Your day.<br><em>A clearer view.</em>', body: 'Between work and the rest of your day, keep your loan information close. Explore ALAGO and see what to review before you apply.', photo: 'alago-worker-v2.png', scene: 'A man in a navy polo checking his phone during a break in a neighbourhood shop.' },
  { id: 'sulivo', name: 'SULIVO', title: 'Keep everyday plans in view.', description: 'A clearer look at borrowing, wherever the day takes you.', label: 'Everyday plans, thoughtfully managed.', hero: 'Your everyday.<br><em>In focus.</em>', body: 'From workdays to running your own business, everyday plans need a little room. Meet SULIVO and take a clear look at borrowing.', photo: 'sulivo-seller-v2.png', scene: 'A short-haired woman checking her phone beside parcels on a small packing table.' },
];
const route = brand => siteUrl(`${brand.id}financing/`);
const arrow = '<span aria-hidden="true">↗</span>';
function brandLogo(brand) {
  return `<img src="${siteUrl(`assets/${brand.id}-icon.png`)}" width="360" height="360" alt=""><span>${brand.name}</span>`;
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
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#183f42"><title>${title}</title><meta name="description" content="${description}"><link rel="icon" href='${favicon}'><link rel="preload" href="${siteUrl('assets/fonts/Manrope-Variable.woff2')}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${siteUrl('styles.css')}?v=${styleVersion}"></head><body id="top" class="${brand ? `brand-page ${brand.id}` : 'home-page'}">${header(brand)}<main id="main">${body}</main>${footer(brand)}</body></html>`;
}
function home() {
  return shell('Flashbit · A little clarity. A brighter way forward.', 'Get to know Flashbit and our three online lending brands in the Philippines: LIVAYA, ALAGO and SULIVO.', `<section class="home-hero wrap" aria-labelledby="home-title"><div class="hero-copy"><p class="eyebrow">FLASHBIT · PHILIPPINES</p><h1 id="home-title">A little clarity.<br>A brighter way<br><em>forward.</em></h1><p class="hero-intro">Get to know Flashbit and our brands.</p><p class="hero-description">Explore LIVAYA, ALAGO and SULIVO, and find product information and contact details in one place.</p><div class="hero-signoff"><span class="small-rule"></span><p>Loan information.<br>All in one place.</p></div></div><div class="home-visual"><div class="visual-caption"><span>Made for the everyday.</span><span>01 / 03</span></div>${portrait(brands[0], 'main-portrait', 'eager')}<div class="portrait-inset">${portrait(brands[1], '', 'eager')}<span>A moment in your day.</span></div><div class="visual-footnote"><span>Work. Home. Your community.</span><span class="brand-dots" aria-hidden="true"><i></i><i></i><i></i></span></div></div></section><section id="brands" class="brands-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">OUR BRANDS</p><h2>Three brands.<br>For everyday needs.</h2></div><p>Discover our online lending brands.<br>Find the details that matter to you.</p></div><div class="brand-grid">${brands.map((b,i) => `<article class="brand-card ${b.id}"><div class="brand-card-top"><a class="brand-icon-link" href="${route(b)}" aria-label="Explore ${b.name}"><img src="${siteUrl(`assets/${b.id}-icon.png`)}" width="360" height="360" alt="${b.name}" loading="lazy"></a><span class="card-number">0${i+1}</span></div><h3><a href="${route(b)}">${b.name} ${arrow}</a></h3><p class="brand-card-title">${b.title}</p><p class="brand-card-desc">${b.description}</p><div class="card-rule"></div><p class="card-parent">A Flashbit brand</p></article>`).join('')}</div></div></section>`);
}
await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, 'index.html'), home());
function brandPage(b) {
  const features = [
    ['Your amount, clearly shown.', 'Review the loan amount and available options in the app.'],
    ['A repayment plan to review.', 'Check the payment amount, first due date and loan term.'],
    ['Look at the whole cost.', 'Read the interest, fees and total repayment before you continue.'],
    ['Help with the next step.', 'Use the support option in the app if you need help understanding a step.'],
  ];
  const steps = [
    ['Find the app', `Look for ${b.name} in your app store and check the app name before downloading.`],
    ['Register your details', 'Start with your phone number and follow the instructions in the app.'],
    ['Complete your application', 'Provide the requested information and review your loan and repayment details.'],
    ['Check the result', 'If approved, follow the instructions in the app for receiving your funds.'],
  ];
  return shell(`${b.name} · ${b.title} | Flashbit`, `Get to know ${b.name}, a Flashbit online lending brand in the Philippines. Explore the app, loan information and application steps.`, `
  <section class="brand-hero"><div class="wrap brand-hero-grid"><div class="brand-hero-copy"><div class="brand-identity"><img src="${siteUrl(`assets/${b.id}-icon.png`)}" width="360" height="360" alt=""><div><p class="brand-name">${b.name}</p><p class="brand-parent">A Flashbit brand</p></div></div><h1>${b.hero}</h1><p class="brand-intro">${b.body}</p><a class="primary-link" href="#features">View loan details</a><p class="hero-small-note">Simple. Clear. At your pace.</p></div><figure class="brand-hero-image">${portrait(b, '', 'eager')}<figcaption><span>${b.label}</span><span class="caption-line" aria-hidden="true"></span></figcaption></figure></div></section>
  <section class="features-section wrap" id="features" aria-labelledby="features-title"><div class="features-copy"><p class="eyebrow">GET TO KNOW ${b.name}</p><h2 id="features-title">A clearer picture.<br>Before you borrow.</h2><p class="section-intro">Take a moment to understand the details.<br>Start with what matters to your repayments.</p><div class="feature-list">${features.map((f,i) => `<article class="feature-item"><span class="feature-number">0${i+1}</span><div><h3>${f[0]}</h3><p>${f[1]}</p></div></article>`).join('')}</div></div><figure class="product-figure"><div class="app-stage"><div class="stage-caption"><img src="${siteUrl(`assets/${b.id}-icon.png`)}" width="360" height="360" alt=""><span>Inside the ${b.name} app</span></div><div class="phone-frame"><img src="${siteUrl(`assets/${b.id}-borrow.png`)}" width="1125" height="2436" loading="lazy" alt="${b.name} Borrow screen showing a loan amount, repayment term options and a first payment due date. Amounts shown are an example."></div></div><figcaption>Illustrative app screen. Review the details of your own offer.</figcaption></figure></section>
  <section class="steps-section" id="how-it-works"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">HOW IT WORKS</p><h2>One step at a time.</h2></div><p>Get familiar with the application process<br>in the ${b.name} app.</p></div><ol class="steps-grid">${steps.map((s,i) => `<li class="step"><div class="step-top"><span class="step-number">0${i+1}</span><span class="step-connector" aria-hidden="true"></span></div><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('')}</ol><p class="steps-note">An application is subject to review. Check the full loan details and repayment schedule before accepting an offer.</p></div></section>`, b);
}
for (const brand of brands) {
  const folder = path.join(dist, `${brand.id}financing`);
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), brandPage(brand));
}
console.log('Rendered Flashbit homepage and LIVAYA, ALAGO, SULIVO product pages.');

export { brands, route, header, footer, portrait, shell, dist };
