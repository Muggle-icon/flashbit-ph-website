import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderAppCarousel } from './components/app-carousel.mjs';
import { bpFooter, bpHeader, renderBpHome, renderBpPolicy, renderBpSection, borrowingNotice, loanProducts } from './components/bp-home.mjs';
import { renderBpContact } from './components/bp-contact.mjs';
import { renderBpApply } from './components/bp-apply.mjs';

const baseSegments = (process.env.BASE_PATH || '/').split('/').filter(Boolean);
if (baseSegments.some(segment => !/^[A-Za-z0-9._~-]+$/.test(segment) || segment === '.' || segment === '..')) {
  throw new Error('BASE_PATH must be a URL path, such as / or /repository-name/.');
}
const basePath = baseSegments.length ? `/${baseSegments.join('/')}/` : '/';
const siteUrl = relativePath => `${basePath}${relativePath.replace(/^\/+/, '')}`;
const brandLockups = JSON.parse(await readFile(new URL('./brand-lockups.json', import.meta.url), 'utf8'));
const imageAssets = (await readdir(new URL('./dist/assets/', import.meta.url)))
  .filter(file => /\.(webp|png|jpg|svg)$/.test(file))
  .map(file => `assets/${file}`);
const assetVersions = Object.fromEntries(await Promise.all(
  ['styles.css', 'carousel.css', 'carousel.js', 'bp-review.css', 'bp-nav.js', 'bp-faq.js', 'bp-apply.js', 'contact.js', ...imageAssets].map(async file => [file,
    createHash('sha256').update(await readFile(new URL(`./dist/${file}`, import.meta.url))).digest('hex').slice(0, 12),
  ])
));
const assetUrl = file => `${siteUrl(file)}?v=${assetVersions[file]}`;
const dist = process.env.OUTPUT_DIR
  ? path.resolve(process.env.OUTPUT_DIR)
  : fileURLToPath(new URL('./dist/', import.meta.url));
const brands = [
  { id: 'livaya', name: 'Livaya', screenWidth: 1125, screenHeight: 2436, title: 'For home and everyday life.', description: 'Loan information for household and everyday expenses.', label: 'Home and everyday life', needs: ['Household bills', 'Groceries', 'Everyday expenses'], body: 'Plan for groceries and household bills. Review the cost of borrowing and when repayments are due.', photo: 'livaya-shop-portrait.webp', photoHeight: 764, scene: 'A woman checking her phone while working in a local shop.' },
  { id: 'alago', name: 'Alago', screenWidth: 750, screenHeight: 1624, title: 'For everyday working life.', description: 'Explore the app, loan details and the steps before you apply.', label: 'The expenses between paydays', needs: ['Daily household expenses', 'Transport to and from work', 'Bills between paydays'], body: 'Daily expenses do not always line up with payday. Check your loan information and what you will need to repay.', photo: 'alago-market-portrait.webp', scene: 'A woman holding fruit at a market stall.' },
  { id: 'sulivo', name: 'Sulivo', screenWidth: 1125, screenHeight: 2436, title: 'For work and everyday expenses.', description: 'Understand borrowing costs and repayments for work and daily needs.', label: 'Work and daily needs', needs: ['Transport to work', 'Everyday household bills', 'Other personal expenses'], body: 'Plan for transport, everyday bills and other personal expenses. Review your loan details and fit repayments into your budget.', photo: 'sulivo-seller-v2.webp', scene: 'A short-haired woman checking her phone beside parcels on a small packing table.' },
];
const brandPath = brand => `brands/${brand.id}/`;
const route = brand => siteUrl(brandPath(brand));
const contactInfo = {
  phone: '0945-129-2500',
  supportEmail: 'flashbitfinancing@gmail.com',
  dpoEmail: 'dpoflashbit@gmail.com',
  office: '3/F Prestige Tower, F. Ortigas Jr. Road, Ortigas Center, Pasig City 1605, Metro Manila, Philippines',
};
const bpSite = { siteUrl, assetUrl, route, brandLogo, flashbitLogo, brands, contactInfo };
const arrow = '<span aria-hidden="true">→</span>';
function brandLogo(brand) {
  const { width, height } = brandLockups[brand.id];
  return `<img class="brand-lockup" src="${assetUrl(`assets/${brand.id}-lockup.svg`)}" width="${width}" height="${height}" alt="${brand.name}">`;
}
function flashbitLogo(reverse = false) {
  return `<img class="flashbit-logo" src="${assetUrl(`assets/flashbit-logo${reverse ? '-reverse' : ''}.svg`)}" width="203" height="48" alt="Flashbit">`;
}
function portrait(brand) {
  const full = assetUrl(`assets/${brand.photo}`);
  const small = assetUrl(`assets/${brand.photo.replace('.webp', '-small.webp')}`);
  return `<div class="portrait photo ${brand.id}"><img src="${full}" srcset="${small} 420w, ${full} 840w" sizes="(max-width: 420px) calc(100vw - 40px), (max-width: 760px) 380px, (max-width: 1050px) 280px, 340px" alt="${brand.scene}" width="840" height="${brand.photoHeight ?? 840}" fetchpriority="high" decoding="async"></div>`;
}
function shell(title, description, body, { brand, slug = '' } = {}) {
  const favicon = brand ? assetUrl(`assets/${brandLockups[brand.id].icon}`) : assetUrl('assets/flashbit-symbol.svg');
  const head = `<meta name="robots" content="noindex"><link rel="stylesheet" href="${assetUrl('bp-review.css')}"><script defer src="${assetUrl('bp-nav.js')}"></script>`;
  const pageScript = { contact: 'contact.js', faqs: 'bp-faq.js', apply: 'bp-apply.js' }[slug];
  const scripts = pageScript ? `<script defer src="${assetUrl(pageScript)}"></script>` : '';
  const brandHead = brand ? `<link rel="canonical" href="${route(brand)}"><link rel="stylesheet" href="${assetUrl('carousel.css')}"><script defer src="${assetUrl('carousel.js')}"></script>` : '';
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#183f42"><title>${title}</title><meta name="description" content="${description}"><link rel="icon" href='${favicon}'><link rel="preload" href="${siteUrl('assets/fonts/Manrope-Variable.woff2')}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${assetUrl('styles.css')}">${head}${scripts}${brandHead}</head><body id="top" class="bp-page"><a class="skip" href="#main">Skip to content</a>${bpHeader(bpSite, slug, brand)}<main id="main" tabindex="-1"${brand ? ` class="${brand.id}"` : ''}>${body}</main>${bpFooter(bpSite, slug)}</body></html>`;
}
await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, 'index.html'), shell(
  'FlashBit Financing Corp. | BP Review Draft',
  'FlashBit Financing Corp. homepage draft for BP review.',
  renderBpHome(bpSite),
));
const specialPages = {
  contact: () => renderBpContact(siteUrl, contactInfo),
  apply: () => renderBpApply(bpSite),
};
for (const [slug, title, description] of [
  ['about', 'About Us', 'About FlashBit Financing Corp. and its financing brands.'],
  ['brands', 'Our Brands', 'Explore Livaya Financing, Alago Financing and Sulivo Financing.'],
  ['loan-products', 'Loan Products', 'Explore Salary Loan and General Purpose Loan by FlashBit financing brand.'],
  ['how-it-works', 'How It Works', 'See the steps from applying for financing to reviewing an offer and receiving funds.'],
  ['faqs', 'Frequently Asked Questions', 'Answers about FlashBit Financing Corp., its loan products and customer support.'],
  ['contact', 'Contact Us', 'Find FlashBit customer support, the Data Protection Officer and the principal office address.'],
  ['apply', 'How to Apply', 'Find application information for Livaya, Alago and Sulivo.'],
]) {
  const folder = path.join(dist, slug);
  await mkdir(folder, { recursive: true });
  const body = specialPages[slug] ? specialPages[slug]() : renderBpSection(slug, bpSite, true);
  await writeFile(path.join(folder, 'index.html'), shell(`${title} | FlashBit Financing Corp.`, description, body, { slug }));
}
for (const [slug, title] of [['terms', 'Terms and Conditions'], ['privacy', 'Privacy Notice']]) {
  const content = await readFile(new URL(`./content/bp-${slug}.html`, import.meta.url), 'utf8');
  const folder = path.join(dist, slug);
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), shell(
    `${title} | FlashBit Financing Corp.`,
    `${title} draft for BP review.`,
    renderBpPolicy(title, content, siteUrl),
    { slug },
  ));
}
function brandPage(b) {
  const features = [
    ['Amount and term', 'Check how much you will borrow and how long you have to repay.'],
    ['Total cost', 'Review the interest, fees and total amount you will pay back.'],
    ['Repayment schedule', 'Know your first due date and the amount of each payment.'],
  ];
  return shell(`${b.name} | Online loans in the Philippines`, `Explore ${b.name}, a Flashbit online lending brand. See the app screens, loan information, repayment guidance and application steps.`, `
  <div class="wrap bp-brand-tools"><a href="${siteUrl('brands/')}">← All brands</a>${brandLogo(b)}</div>
  <section class="product-intro"><div class="wrap product-intro-grid"><div class="product-intro-copy"><p class="product-category">${b.name} online loans · Philippines</p><h1>${b.title}</h1><p class="product-description">${b.body}</p><div class="bp-brand-actions"><a class="primary-link" href="${siteUrl(`apply/?brand=${b.id}`)}">How to Apply</a><a class="bp-brand-process" href="${siteUrl('how-it-works/')}">How It Works ${arrow}</a></div></div>${portrait(b)}</div></section>
  <section class="wrap bp-section bp-brand-products" aria-labelledby="brand-products-title"><h2 id="brand-products-title">Loan Products</h2><dl>${loanProducts.map(([title, copy]) => `<div><dt>${title}</dt><dd>${copy}</dd></div>`).join('')}</dl>${borrowingNotice(siteUrl)}</section>
  <section class="loan-information wrap" id="features" aria-labelledby="features-title"><div class="loan-information-intro"><div class="section-heading"><h2 id="features-title">Before you borrow</h2><p>Review these details in your own loan offer.</p></div><p class="borrowing-note">Borrow only what you can plan to repay.</p></div><dl class="loan-facts">${features.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl></section>
  <section class="app-guide" id="how-it-works" aria-labelledby="app-guide-title"><div class="wrap">${renderAppCarousel(b, assetUrl)}</div>
  </section>
  `, { brand: b, slug: 'brand' });
}

for (const brand of brands) {
  const html = brandPage(brand);
  for (const slug of [brandPath(brand), `${brand.id}financing/`]) {
    const folder = path.join(dist, slug);
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, 'index.html'), html);
  }
}
console.log('Rendered the FlashBit company, policy, and product pages.');
