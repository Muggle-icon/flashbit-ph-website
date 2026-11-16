import { renderBpFaq } from './bp-faq.mjs';

const company = 'FlashBit Financing Corp.';
const tradeNames = 'Livaya Financing, Alago Financing and Sulivo Financing';
const launch = 'December 1, 2026';
const secNumber = '202609066778-02';
const authorityNumber = 'F-26-0144-55';
const amlcNumber = '20260924204248-7';

const navigation = [
  ['Home', ''],
  ['About Us', 'about'],
  ['Our Brands', 'brands'],
  ['Loan Products', 'loan-products'],
  ['How It Works', 'how-it-works'],
  ['FAQs', 'faqs'],
  ['Contact Us', 'contact'],
];

const footerNavigation = [
  ['Company', ['', 'about', 'brands']],
  ['Loans', ['loan-products', 'how-it-works']],
  ['Support', ['faqs', 'contact']],
];

const brandDirectory = {
  livaya: {
    name: 'Livaya Financing',
    title: 'For a Brighter Everyday',
  },
  alago: {
    name: 'Alago Financing',
    title: 'Support for What Matters',
  },
  sulivo: {
    name: 'Sulivo Financing',
    title: 'Grow Further Together',
  },
};

export const loanProducts = [
  ['Salary Loan', 'Short-term financing for employed individuals.'],
  ['General Purpose Loan', 'For everyday personal and household expenses.'],
];

const steps = [
  ['Apply Online', 'Choose a financing product and complete the application when it becomes available.'],
  ['Review and Verification', 'The company reviews your application and verifies the information you provide.'],
  ['Get a Loan Offer', 'If approved, you receive an offer with the amount, costs and repayment schedule.'],
  ['Review and Accept', 'Review the Disclosure Statement and Terms and Conditions before accepting.'],
  ['Receive Funds', 'After acceptance, funds are sent through the disbursement method shown in the offer.'],
];

function legalLinks(siteUrl, currentPage) {
  return [['terms', 'Terms and Conditions'], ['privacy', 'Privacy Notice']]
    .map(([slug, label]) => `<a href="${siteUrl(pagePath(slug))}"${currentPageAttribute(currentPage === slug)}>${label}</a>`)
    .join('');
}

export function borrowingNotice(siteUrl) {
  return `<aside class="bp-notice" aria-label="Borrowing reminder">
    <div><strong>Always read the Terms and Conditions before proceeding in the loan transaction.</strong>
    <p>Review the disclosures, costs and repayment responsibilities before accepting a loan.</p></div>
    <a href="${siteUrl('terms/')}">Read Terms and Conditions</a>
  </aside>`;
}

const pagePath = slug => slug ? `${slug}/` : '';
const currentPageAttribute = active => active ? ' aria-current="page"' : '';

export function bpHeader({ siteUrl, route, brands, flashbitLogo }, currentPage, activeBrand) {
  const navLink = (label, slug, legacy = false) => {
    const legacyHash = legacy && currentPage === '' && slug ? ` data-legacy-anchor="${slug}"` : '';
    return `<a href="${siteUrl(pagePath(slug))}"${currentPageAttribute(currentPage === slug)}${legacyHash}>${label}</a>`;
  };
  const brandLinks = brands.map(brand => `<a href="${route(brand)}"${currentPageAttribute(activeBrand?.id === brand.id)}>${brandDirectory[brand.id].name}</a>`).join('');
  const applyLink = `<a class="bp-header-apply bp-button bp-button-primary" href="${siteUrl('apply/')}"${currentPageAttribute(currentPage === 'apply')}>How to Apply</a>`;

  return `
  <p class="bp-review">BP review draft · Content and product details subject to confirmation</p>
  <header class="site-header bp-header">
    <div class="wrap bp-header-inner">
      <a class="bp-identity" href="${siteUrl('')}" aria-label="${company} home">
        ${flashbitLogo()}
        <span><strong>${company}</strong><small>Operating under the names of ${tradeNames}</small></span>
      </a>
      <div class="bp-mobile-actions">
        ${applyLink}
        <button class="bp-menu-trigger" type="button" aria-controls="bp-mobile-menu" aria-expanded="false" aria-label="Open menu" hidden>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      <nav class="bp-desktop-nav" aria-label="Main navigation">
        ${navigation.map(([label, slug]) => slug === 'brands' ? `
        <details class="bp-brand-menu${currentPage === 'brands' || activeBrand ? ' bp-brand-menu-current' : ''}">
          <summary>${label}</summary>
          <div class="bp-brand-menu-links">
            ${brandLinks}
            ${navLink('View all brands', slug, true)}
          </div>
        </details>` : navLink(label, slug, true)).join('')}
        ${applyLink}
      </nav>
    </div>
  </header>
  <dialog class="bp-mobile-menu" id="bp-mobile-menu" aria-labelledby="bp-mobile-menu-title">
    <div class="bp-mobile-menu-content">
      <div class="bp-mobile-menu-head">
        <h2 id="bp-mobile-menu-title">Menu</h2>
        <button type="button" class="bp-menu-close" aria-label="Close menu">×</button>
      </div>
      <nav class="bp-mobile-links" aria-label="Main navigation">
        ${navigation.map(([label, slug]) => navLink(label, slug) + (slug === 'brands' ? `<div class="bp-mobile-brand-links">${brandLinks}</div>` : '')).join('')}
      </nav>
      <div class="bp-mobile-menu-action">${applyLink}</div>
    </div>
  </dialog>`;
}

function bpFooterDisclosures(assetUrl, { phone, supportEmail, dpoEmail, office }) {
  return `
      <section class="bp-footer-disclosures" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Company and regulatory information</h2>
        <div class="bp-disclosures">
          <div class="bp-disclosure-group">
            <div class="bp-disclosure">
              <img class="bp-disclosure-mark" src="${assetUrl('assets/bp-sec.webp')}" width="49" height="80" alt="" loading="lazy" decoding="async">
              <div><h3>Securities and Exchange Commission</h3><dl>
                <div><dt>Date of incorporation</dt><dd>September 14, 2026</dd></div>
                <div><dt>SEC Registration No.</dt><dd>${secNumber}</dd></div>
                <div><dt>Certificate of Authority No.</dt><dd>${authorityNumber}</dd></div>
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
                <div><dt>Registration No.</dt><dd>${amlcNumber}</dd></div>
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

export function bpFooter({ siteUrl, assetUrl, flashbitLogo, contactInfo }, currentPage) {
  return `
  <footer class="bp-footer" id="site-footer">
    <div class="wrap bp-footer-inner">
      <a class="bp-footer-brand" href="${siteUrl('')}" aria-label="${company} home">${flashbitLogo(true)}</a>
      ${footerNavigation.map(([title, ids]) => `
      <nav class="bp-footer-group" aria-label="${title}">
        <p class="bp-footer-group-title" aria-hidden="true">${title}</p>
        ${navigation.filter(([, id]) => ids.includes(id)).map(([label, slug]) => {
          const legacyAnchor = currentPage === '' && ['about', 'faqs'].includes(slug) ? ` id="${slug}"` : '';
          return `<a href="${siteUrl(pagePath(slug))}"${currentPageAttribute(currentPage === slug)}${legacyAnchor}>${label}</a>`;
        }).join('')}
      </nav>`).join('').trimStart()}${bpFooterDisclosures(assetUrl, contactInfo)}
      <div class="bp-footer-bottom">
        <p class="bp-copyright">© 2026 ${company} All rights reserved. Operating under the names of ${tradeNames}.</p>
        <nav class="bp-footer-legal" aria-label="Legal information">${legalLinks(siteUrl, currentPage)}</nav>
      </div>
    </div>
  </footer>`;
}

export function renderBpHome(site) {
  const { siteUrl, assetUrl } = site;
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
        <p class="bp-lede">Financing for everyday expenses through Livaya, Alago and Sulivo.</p>
        <div class="bp-actions"><a class="bp-button bp-button-primary" href="${siteUrl('apply/')}">How to Apply</a><a class="bp-button" id="loan-products" href="${siteUrl('loan-products/')}">Explore Loan Products</a></div>
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

  ${renderBpSection('brands', site)}
  ${renderBpSection('how-it-works', site)}
  <section class="wrap bp-section bp-help" aria-labelledby="home-help-title">
    <h2 id="home-help-title">Questions about applying?</h2>
    <div class="bp-actions"><a class="bp-button bp-button-primary" href="${siteUrl('apply/')}">How to Apply</a><a class="bp-button" href="${siteUrl('contact/')}">Contact Us</a></div>
  </section>`;
}

const sections = {
  brands: {
    title: 'Our Brands',
    className: 'wrap',
    body: ({ brands, siteUrl, route, brandLogo }, heading) => `
    ${heading}
    <p class="bp-section-intro">Explore the three financing brands of ${company}</p>
    <div class="brand-directory">
      ${brands.map(brand => {
        const info = brandDirectory[brand.id];
        return `<a class="brand-row bp-brand ${brand.id}" href="${route(brand)}" aria-label="Learn more about ${info.name}">
          <span class="directory-logo">${brandLogo(brand)}</span>
          <span class="bp-trade-name">${info.name}</span>
          <span class="directory-copy"><strong>${info.title}</strong></span>
          <span class="directory-action">Learn more <span aria-hidden="true">→</span></span>
        </a>`;
      }).join('')}
    </div>
    ${borrowingNotice(siteUrl)}
  `,
  },
  'how-it-works': {
    title: 'How It Works',
    homeTitle: 'Get financing in five simple steps',
    className: 'bp-tint',
    body: ({ siteUrl }, heading, standalone) => {
      const stepHeading = standalone ? 'h2' : 'h3';
      return `
    <div class="wrap">
      ${heading}
      <ol class="bp-steps">${steps.map(([title, copy], index) => `<li><span aria-hidden="true">${index + 1}</span><${stepHeading}>${title}</${stepHeading}><p>${copy}</p></li>`).join('')}</ol>
      ${standalone ? `${borrowingNotice(siteUrl)}
      <div class="bp-process-prep"><h2>What you may need</h2><p>Have a government-issued ID, proof of income and proof of address ready. Check your chosen product for its requirements.</p></div>
      <a class="bp-content-link" href="${siteUrl('apply/')}">How to Apply <span aria-hidden="true">→</span></a>` : `<a class="bp-content-link" href="${siteUrl('how-it-works/')}">See the full process <span aria-hidden="true">→</span></a>`}
    </div>
  `;
    },
  },
  'loan-products': {
    title: 'Loan Products',
    className: 'wrap',
    body: ({ siteUrl, brands, route }, heading) => `
    ${heading}
    <p class="bp-section-intro">Two planned loan types across our three brands. Check your loan offer for the amount, terms and costs.</p>
    <div class="bp-products">
      ${brands.map(brand => `<div class="bp-product-group ${brand.id}">
        <h2><a class="bp-product-link" href="${route(brand)}">${brandDirectory[brand.id].name}<span aria-hidden="true">→</span></a></h2>
        <dl>${loanProducts.map(([name, description]) => `<div><dt>${name}</dt><dd>${description}</dd></div>`).join('')}</dl>
      </div>`).join('\n      ')}
    </div>
    ${borrowingNotice(siteUrl)}
    <a class="bp-content-link" href="${siteUrl('apply/')}">How to Apply <span aria-hidden="true">→</span></a>
  `,
  },
  about: {
    title: 'About Us',
    className: 'bp-tint',
    body: (_, heading) => `
    <div class="wrap">
      <div class="bp-about">
        ${heading}
        <p>${company} is a Philippine financing company operating under the names of ${tradeNames}.</p>
        <p class="bp-ownership"><strong>99.99% owned by Novolink PTE Ltd.</strong></p>
      </div>
      <dl class="bp-values">
        <div><dt>Customer-Centric</dt><dd>Financing for everyday needs.</dd></div>
        <div><dt>Responsible Lending</dt><dd>Clear costs and repayment information.</dd></div>
        <div><dt>Data Privacy</dt><dd>A Privacy Notice and a dedicated DPO contact.</dd></div>
        <div><dt>Financial Inclusion</dt><dd>Financing options for everyday needs.</dd></div>
      </dl>
    </div>
  `,
  },
  faqs: {
    title: 'Frequently Asked Questions',
    className: 'wrap',
    body: ({ siteUrl, contactInfo }, heading) => renderBpFaq(siteUrl, heading, {
      company, tradeNames, launch, secNumber, authorityNumber, amlcNumber, dpoEmail: contactInfo.dpoEmail,
    }),
  },
};

export function renderBpSection(slug, site, standalone = false) {
  const { title, homeTitle, className, body } = sections[slug];
  const headingTag = standalone ? 'h1' : 'h2';
  const titleId = `${slug}-title`;
  const heading = `<${headingTag} id="${titleId}">${standalone ? title : homeTitle ?? title}</${headingTag}>`;
  return `<section class="bp-section ${className}${standalone ? ' bp-standalone' : ''}" id="${slug}" aria-labelledby="${titleId}">${body(site, heading, standalone)}</section>`;
}

export function renderBpPolicy(title, content, siteUrl) {
  const headings = [...content.matchAll(/<h2 id="([a-z0-9-]+)">([^<]+)<\/h2>/g)];
  return `
  <header class="bp-policy-head bp-tint"><div class="wrap"><h1>${title}</h1><a href="${siteUrl('')}">← Back to homepage</a></div></header>
  <div class="wrap bp-section bp-policy-grid">
    <nav aria-label="On this page"><strong>On this page</strong><ul>${headings.map(([, id, heading]) => `<li><a href="#${id}">${heading}</a></li>`).join('')}</ul></nav>
    <article class="bp-policy-text">${content}</article>
  </div>`;
}
