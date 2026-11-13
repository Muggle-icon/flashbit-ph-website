import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderAppCarousel } from './components/app-carousel.mjs';
import { bpFooter, bpHeader, renderBpHome, renderBpPolicy } from './components/bp-home.mjs';

const baseSegments = (process.env.BASE_PATH || '/').split('/').filter(Boolean);
if (baseSegments.some(segment => !/^[A-Za-z0-9._~-]+$/.test(segment) || segment === '.' || segment === '..')) {
  throw new Error('BASE_PATH must be a URL path, such as / or /repository-name/.');
}
const basePath = baseSegments.length ? `/${baseSegments.join('/')}/` : '/';
const siteUrl = relativePath => `${basePath}${relativePath.replace(/^\/+/, '')}`;
const brandLockups = JSON.parse(await readFile(new URL('./brand-lockups.json', import.meta.url), 'utf8'));
const assetVersions = Object.fromEntries(await Promise.all(
  ['styles.css', 'carousel.css', 'carousel.js', 'bp-review.css', ...Object.keys(brandLockups).map(id => `assets/${id}-lockup.svg`)].map(async file => [file,
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
const arrow = '<span aria-hidden="true">→</span>';
function brandLogo(brand) {
  const { width, height } = brandLockups[brand.id];
  return `<img class="brand-lockup" src="${assetUrl(`assets/${brand.id}-lockup.svg`)}" width="${width}" height="${height}" alt="${brand.name}">`;
}
function flashbitLogo(reverse = false) {
  return `<img class="flashbit-logo" src="${siteUrl(`assets/flashbit-logo${reverse ? '-reverse' : ''}.svg`)}" width="203" height="48" alt="Flashbit">`;
}
function brandHeader(brand) {
  return `<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="wrap header-inner"><a class="brand-wordmark" href="${route(brand)}#top" aria-label="${brand.name} home">${brandLogo(brand)}</a><nav aria-label="${brand.name} navigation"><a href="#features">Loan details</a><a href="#how-it-works">How it works</a><a href="#contact">Contact us</a></nav></div></header>`;
}
function brandFooter(brand) {
  return `<footer id="contact" class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-company"><a class="brand-wordmark" href="${route(brand)}#top" aria-label="${brand.name} home">${brandLogo(brand)}</a><p>${brand.title}</p><p class="footer-caption">${brand.name} is a Flashbit brand.</p><a class="company-link" href="${siteUrl('#top')}">About Flashbit ${arrow}</a></div><div class="footer-brands"><h2>Explore ${brand.name}</h2><a href="#features">Loan details</a><a href="#how-it-works">How it works</a><a class="other-brands-link" href="${siteUrl('#brands')}">Other Flashbit brands ${arrow}</a></div><div class="footer-contact"><h2>Contact us</h2><dl><dt>Phone</dt><dd><a class="phone-link" href="tel:+639451292500">(0945) 129-2500</a></dd><dt>Address</dt><dd>3/F Prestige Tower, F. Ortigas Jr. Road,<br> Ortigas Center, San Antonio, Pasig City,<br> National Capital Region, 1600</dd></dl></div></div><div class="footer-bottom"><p>© 2026 Flashbit. All rights reserved.</p><p>${brand.name} · Philippines</p></div></div></footer>`;
}
function portrait(brand, cls = '', loading = 'lazy') {
  if (brand.photo) return `<div class="portrait photo ${brand.id} ${cls}"><img src="${siteUrl(`assets/${brand.photo}`)}" alt="${brand.scene}" width="1254" height="1254" loading="${loading}" decoding="async"></div>`;
  return `<div class="portrait ${brand.id} ${cls}"><img src="${siteUrl(`assets/${brand.id}-welcome.png`)}" alt="${brand.scene}" width="1125" height="2436" loading="${loading}" decoding="async"></div>`;
}
function shell(title, description, body, brand = null, policy = false) {
  const favicon = brand ? siteUrl(`assets/${brandLockups[brand.id].icon}`) : siteUrl('assets/flashbit-symbol.svg');
  const review = !brand;
  const head = review ? `<meta name="robots" content="noindex"><link rel="stylesheet" href="${assetUrl('bp-review.css')}">` : '';
  const masthead = review ? `<a class="skip" href="#main">Skip to content</a>${bpHeader(siteUrl, flashbitLogo, !policy)}` : brandHeader(brand);
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#183f42"><title>${title}</title><meta name="description" content="${description}"><link rel="icon" href='${favicon}'><link rel="preload" href="${siteUrl('assets/fonts/Manrope-Variable.woff2')}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${assetUrl('styles.css')}">${head}${brand ? `<link rel="stylesheet" href="${assetUrl('carousel.css')}"><script defer src="${assetUrl('carousel.js')}"></script>` : ''}</head><body id="top" class="${brand ? `brand-page ${brand.id}` : 'bp-page'}">${masthead}<main id="main">${body}</main>${review ? bpFooter(siteUrl) : brandFooter(brand)}</body></html>`;
}
await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, 'index.html'), shell(
  'FlashBit Financing Corp. | BP Review Draft',
  'FlashBit Financing Corp. homepage draft for BP review.',
  renderBpHome(brands, { siteUrl, route, brandLogo }),
));
for (const [slug, title] of [['terms', 'Terms and Conditions'], ['privacy', 'Privacy Notice']]) {
  const content = await readFile(new URL(`./content/bp-${slug}.html`, import.meta.url), 'utf8');
  const folder = path.join(dist, slug);
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), shell(
    `${title} | FlashBit Financing Corp.`,
    `${title} draft for BP review.`,
    renderBpPolicy(title, content, siteUrl),
    null,
    true,
  ));
}
function brandPage(b) {
  const features = [
    ['Amount and term', 'Check how much you will borrow and how long you have to repay.'],
    ['Total cost', 'Review the interest, fees and total amount you will pay back.'],
    ['Repayment schedule', 'Know your first due date and the amount of each payment.'],
  ];
  return shell(`${b.name} | Online loans in the Philippines`, `Explore ${b.name}, a Flashbit online lending brand. See the app screens, loan information, repayment guidance and application steps.`, `
  <section class="product-intro"><div class="wrap product-intro-grid"><div class="product-intro-copy"><p class="product-category">${b.name} online loans · Philippines</p><h1>${b.title}</h1><p class="product-description">${b.body}</p><a class="primary-link" href="#features">View loan details</a></div>${portrait(b, '', 'eager')}</div></section>
  <section class="loan-information wrap" id="features" aria-labelledby="features-title"><div class="loan-information-intro"><div class="section-heading"><h2 id="features-title">Before you borrow</h2><p>Review these details in your own loan offer.</p></div><p class="borrowing-note">Borrow only what you can plan to repay.</p></div><dl class="loan-facts">${features.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl></section>
  <section class="app-guide" id="how-it-works" aria-labelledby="app-guide-title"><div class="wrap">${renderAppCarousel(b, siteUrl)}</div>
  </section>
  `, b);
}

for (const brand of brands) {
  const folder = path.join(dist, `${brand.id}financing`);
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), brandPage(brand));
}
console.log('Rendered the FlashBit BP review homepage, policy pages, and three product pages.');
