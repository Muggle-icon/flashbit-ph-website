const company = 'FlashBit Financing Corp.';
const tradeNames = 'Livaya Financing, Alago Financing and Sulivo Financing';
const phone = '0945-129-2500';
const supportEmail = 'flashbitfinancing@gmail.com';
const dpoEmail = 'dpoflashbit@gmail.com';
const office = '3/F Prestige Tower, F. Ortigas Jr. Road, Ortigas Center, Pasig City 1605, Metro Manila, Philippines';
const launch = 'December 1, 2026';

const navigation = [
  ['Home', 'top'],
  ['About Us', 'about'],
  ['Our Brands', 'brands'],
  ['Loan Products', 'loan-products'],
  ['How It Works', 'how-it-works'],
  ['FAQs', 'faqs'],
  ['Contact Us', 'contact'],
];

const footerNavigation = [
  ['Company', ['about', 'brands']],
  ['Loans', ['loan-products', 'how-it-works']],
  ['Support', ['faqs', 'contact']],
];

const offerings = {
  livaya: {
    name: 'Livaya Financing',
    title: 'For a Brighter Everyday',
    description: 'Personal financing for everyday needs.',
    products: [
      ['Personal Loan', 'For household bills and everyday expenses.'],
      ['Salary Loan', 'Short-term financing for employed individuals.'],
    ],
  },
  alago: {
    name: 'Alago Financing',
    title: 'Support for What Matters',
    description: 'Financing for education expenses and personal goals.',
    products: [
      ['Education Loan', 'For tuition and other school expenses.'],
      ['Personal Goals Loan', 'For planned personal and household expenses.'],
    ],
  },
  sulivo: {
    name: 'Sulivo Financing',
    title: 'Grow Further Together',
    description: 'Business and personal financing for everyday needs.',
    products: [
      ['Business Loan', 'Working capital for micro, small and medium enterprises.'],
      ['Personal Loan', 'Personal financing for entrepreneurs and self-employed individuals.'],
    ],
  },
};

const steps = [
  ['Apply Online', 'Choose a financing product and complete the application when it becomes available.'],
  ['Review and Verification', 'The company reviews your application and verifies the information you provide.'],
  ['Get a Loan Offer', 'If approved, you receive an offer with the amount, costs and repayment schedule.'],
  ['Review and Accept', 'Review the Disclosure Statement and Terms and Conditions before accepting.'],
  ['Receive Funds', 'After acceptance, funds are sent through the disbursement method shown in the offer.'],
];

function legalLinks(siteUrl) {
  return `<a href="${siteUrl('terms/')}">Terms and Conditions</a><a href="${siteUrl('privacy/')}">Privacy Notice</a>`;
}

export function bpHeader(siteUrl, flashbitLogo, isHome) {
  return `
  <p class="bp-review">BP review draft · Content and product details subject to confirmation</p>
  <header class="site-header bp-header">
    <div class="wrap">
      <a class="bp-identity" href="${siteUrl('#top')}" aria-label="${company} home">
        ${flashbitLogo()}
        <span><strong>${company}</strong><small>Operating under the names of ${tradeNames}</small></span>
      </a>
      <nav aria-label="Main navigation">
        ${navigation.map(([label, id]) => `<a href="${siteUrl(`#${id}`)}"${isHome && id === 'top' ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      </nav>
    </div>
  </header>`;
}

function bpFooterDisclosures(assetUrl) {
  return `
      <section class="bp-footer-disclosures" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Company and regulatory information</h2>
        <div class="bp-disclosures">
          <div class="bp-disclosure-group">
            <div class="bp-disclosure">
              <img class="bp-disclosure-mark" src="${assetUrl('assets/bp-sec.webp')}" width="49" height="80" alt="" loading="lazy" decoding="async">
              <div><h3>Securities and Exchange Commission</h3><dl>
                <div><dt>Date of incorporation</dt><dd>September 14, 2026</dd></div>
                <div><dt>SEC Registration No.</dt><dd>202609066778-02</dd></div>
                <div><dt>Certificate of Authority No.</dt><dd>F-26-0144-55</dd></div>
              </dl></div>
            </div>
            <div class="bp-disclosure">
              <img class="bp-disclosure-mark" src="${assetUrl('assets/bp-bir.webp')}" width="72" height="71" alt="" loading="lazy" decoding="async">
              <div><h3>Bureau of Internal Revenue</h3><dl>
                <div><dt>BIR Registration No.</dt><dd>815-972-116-000</dd></div>
              </dl></div>
            </div>
          </div>
          <div class="bp-disclosure-group">
            <div class="bp-disclosure">
              <img class="bp-disclosure-mark" src="${assetUrl('assets/bp-amlc.webp')}" width="72" height="49" alt="" loading="lazy" decoding="async">
              <div><h3>Anti-Money Laundering Council</h3><dl>
                <div><dt>Registration No.</dt><dd>20260924204248-7</dd></div>
              </dl></div>
            </div>
          </div>
          <div class="bp-disclosure-group">
            <div class="bp-disclosure">
              <svg class="bp-disclosure-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.500C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
              <div><h3>Principal Address</h3><address>${office}</address></div>
            </div>
          </div>
          <div class="bp-disclosure-group">
            <div class="bp-disclosure">
              <svg class="bp-disclosure-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>
              <div><h3>Contact Us</h3><dl>
                <div><dt>Customer support</dt><dd><a href="tel:+639451292500">${phone}</a><br><a href="mailto:${supportEmail}">${supportEmail.replace('@', '@<wbr>')}</a></dd></div>
                <div><dt>Data Protection Officer (DPO)</dt><dd><a href="mailto:${dpoEmail}">${dpoEmail.replace('@', '@<wbr>')}</a></dd></div>
              </dl></div>
            </div>
          </div>
        </div>
      </section>`;
}

export function bpFooter(siteUrl, assetUrl, flashbitLogo, isHome) {
  return `
  <footer class="bp-footer" id="site-footer">
    <div class="wrap bp-footer-inner">
      <a class="bp-footer-brand" href="${siteUrl('#top')}" aria-label="${company} home">${flashbitLogo(true)}</a>
      ${footerNavigation.map(([title, ids]) => `
      <nav class="bp-footer-group" aria-label="${title}">
        <p class="bp-footer-group-title" aria-hidden="true">${title}</p>
        ${navigation.filter(([, id]) => ids.includes(id)).map(([label, id]) => `<a href="${siteUrl(`#${id}`)}">${label}</a>`).join('')}
      </nav>`).join('').trimStart()}${isHome ? bpFooterDisclosures(assetUrl) : ''}
      <div class="bp-footer-bottom">
        <p class="bp-copyright">© 2026 ${company} All rights reserved. Operating under the names of ${tradeNames}.</p>
        <nav class="bp-footer-legal" aria-label="Legal information">${legalLinks(siteUrl)}</nav>
      </div>
    </div>
  </footer>`;
}

function reviewQuestions(siteUrl) {
  return [
    ['What is FlashBit Financing Corp.?', `${company} operates under the names of ${tradeNames}.`],
    ['Where can I find registration details?', 'See Company and regulatory information below for the SEC registration and Certificate of Authority details.'],
    ['When will loan products be available?', `The planned launch date is ${launch}, subject to confirmation.`],
    ['Who can apply for a loan?', 'The proposed general requirements include being a Filipino citizen, at least 21 years old, with a valid government-issued ID and a regular source of income. Requirements may vary by product.'],
    ['What documents should I prepare?', 'You may be asked for a government-issued ID, proof of income and proof of address. Check the requirements for your chosen product before applying.'],
    ['How long does the review take?', 'Review timing depends on verification and the information needed for your application.'],
    ['How will I receive the loan proceeds?', 'Check your loan offer for the available disbursement method and account requirements.'],
    ['Where can I see the total cost?', 'Review the interest, fees, charges and total repayment in the Disclosure Statement before accepting a loan offer.'],
    ['Who can I contact about personal data?', `Read the <a href="${siteUrl('privacy/')}">Privacy Notice</a> or contact the Data Protection Officer at <a href="mailto:${dpoEmail}">${dpoEmail}</a>.`],
  ].map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('');
}

export function renderBpHome(brands, { siteUrl, assetUrl, route, brandLogo }) {
  const heroFull = assetUrl('assets/flashbit-community-v1.webp');
  const heroMedium = assetUrl('assets/flashbit-community-v1-mobile.webp');
  const heroSmall = assetUrl('assets/flashbit-community-v1-small.webp');
  return `
  <section class="bp-hero" aria-labelledby="home-title">
    <picture class="bp-hero-photo" aria-hidden="true">
      <source media="(max-width: 680px)" srcset="${heroSmall} 800w, ${heroMedium} 1240w" sizes="(max-width: 515px) 515px, 100vw">
      <img src="${heroFull}" srcset="${heroMedium} 1240w, ${heroFull} 2170w" sizes="100vw" width="2170" height="725" alt="" fetchpriority="high">
    </picture>
    <div class="wrap bp-hero-content">
      <div class="bp-hero-copy">
        <p class="bp-eyebrow">${company}</p>
        <h1 id="home-title">Your Partner in Financial Growth</h1>
        <p class="bp-lede">Financing for everyday expenses, personal goals and small businesses through Livaya, Alago and Sulivo.</p>
        <div class="bp-actions"><a class="bp-button bp-button-primary" href="#loan-products">Explore Loan Products</a><a class="bp-button" href="#contact">Contact Us</a></div>
      </div>
      <aside class="bp-glance" aria-labelledby="glance-title">
        <h2 id="glance-title">Loan terms at a glance</h2>
        <table aria-labelledby="glance-title">
          <tbody>
            <tr class="bp-glance-amount"><th scope="row">Loan amount</th><td>Up to <strong>₱50,000</strong></td></tr>
            <tr><th scope="row">Repayment</th><td>4, 6 or 8 installments</td></tr>
            <tr class="bp-glance-disclosure"><th scope="row">Interest, fees and charges</th><td>Review the <strong>Disclosure Statement</strong> before accepting.</td></tr>
            <tr><th scope="row">Planned launch</th><td>${launch}</td></tr>
          </tbody>
        </table>
      </aside>
    </div>
  </section>

  <section class="wrap bp-section" id="brands" aria-labelledby="brands-title">
    <h2 id="brands-title">Our Brands</h2>
    <p class="bp-section-intro">Explore the three financing brands of ${company}</p>
    <div class="brand-directory">
      ${brands.map(brand => {
        const info = offerings[brand.id];
        return `<a class="brand-row bp-brand ${brand.id}" href="${route(brand)}" aria-label="Learn more about ${info.name}">
          <span class="directory-logo">${brandLogo(brand)}</span>
          <span class="bp-trade-name">${info.name}</span>
          <span class="directory-copy"><strong>${info.title}</strong><span>${info.description}</span></span>
          <span class="directory-action">Learn more <span aria-hidden="true">→</span></span>
        </a>`;
      }).join('')}
    </div>
    <aside class="bp-notice" aria-label="Borrowing reminder">
      <div><strong>Always read the Terms and Conditions before proceeding in the loan transaction.</strong>
      <p>Review the disclosures, costs and repayment responsibilities before accepting a loan.</p></div>
      <a href="${siteUrl('terms/')}">Read Terms and Conditions</a>
    </aside>
  </section>

  <section class="bp-section bp-tint" id="how-it-works" aria-labelledby="process-title">
    <div class="wrap">
      <h2 id="process-title">Get financing in five simple steps</h2>
      <ol class="bp-steps">${steps.map(([title, copy], index) => `<li><span aria-hidden="true">${index + 1}</span><h3>${title}</h3><p>${copy}</p></li>`).join('')}</ol>
    </div>
  </section>

  <section class="wrap bp-section" id="loan-products" aria-labelledby="loans-title">
    <h2 id="loans-title">Loan Products</h2>
    <p class="bp-section-intro">Planned products by brand. Check the loan offer for the amount, terms and costs that apply.</p>
    <div class="bp-products">${brands.map(brand => {
      const info = offerings[brand.id];
      return `<div class="bp-product-group ${brand.id}">
        <h3><a class="bp-product-link" href="${route(brand)}#top">${info.name}<span aria-hidden="true">→</span></a></h3>
        <dl>${info.products.map(([name, copy]) => `<div><dt>${name}</dt><dd>${copy}</dd></div>`).join('')}</dl>
      </div>`;
    }).join('')}</div>
  </section>

  <section class="bp-section bp-tint" id="about" aria-labelledby="about-title">
    <div class="wrap">
      <div class="bp-about">
        <h2 id="about-title">About Us</h2>
        <p>${company} is a Philippine financing company operating under the names of ${tradeNames}.</p>
        <p class="bp-ownership"><strong>99.99% owned by Novolink PTE Ltd.</strong></p>
      </div>
      <dl class="bp-values">
        <div><dt>Customer-Centric</dt><dd>Financing for everyday needs.</dd></div>
        <div><dt>Responsible Lending</dt><dd>Clear costs and repayment information.</dd></div>
        <div><dt>Data Privacy</dt><dd>A Privacy Notice and a dedicated DPO contact.</dd></div>
        <div><dt>Financial Inclusion</dt><dd>Financing options for individuals and small businesses.</dd></div>
      </dl>
    </div>
  </section>

  <section class="wrap bp-section bp-faq" id="faqs" aria-labelledby="faq-title">
    <div><h2 id="faq-title">Frequently Asked Questions</h2><p class="bp-section-intro">About our brands, loan terms and where to get help.</p></div>
    <div class="bp-questions">${reviewQuestions(siteUrl)}</div>
  </section>`;
}

export function renderBpPolicy(title, content, siteUrl) {
  const headings = [...content.matchAll(/<h2 id="([a-z0-9-]+)">([^<]+)<\/h2>/g)];
  return `
  <header class="bp-policy-head bp-tint"><div class="wrap"><a href="${siteUrl('')}">← Back to homepage</a><h1>${title}</h1><p>Draft for BP review</p></div></header>
  <div class="wrap bp-section bp-policy-grid">
    <nav aria-label="On this page"><strong>On this page</strong><ul>${headings.map(([, id, heading]) => `<li><a href="#${id}">${heading}</a></li>`).join('')}</ul></nav>
    <article class="bp-policy-text">${content}</article>
  </div>`;
}
