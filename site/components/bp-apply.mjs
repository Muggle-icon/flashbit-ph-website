export function renderBpApply({ brands, siteUrl, route, brandLogo }) {
  const applyUrl = siteUrl('apply/');
  return `
  <section class="wrap bp-section bp-standalone bp-apply" aria-labelledby="apply-title">
    <h1 id="apply-title">How to Apply</h1>
    <p class="bp-section-intro">Applications are planned through the financing apps. Choose a brand to review its loan information.</p>

    <section class="bp-apply-choice" aria-labelledby="apply-choose-title">
      <h2 id="apply-choose-title">Choose a brand</h2>
      <ul class="bp-apply-brands">
        ${brands.map(brand => `<li><a class="bp-apply-brand ${brand.id}" href="${applyUrl}?brand=${brand.id}#apply-next" data-apply-brand="${brand.id}" aria-label="Choose ${brand.name} Financing">${brandLogo(brand)}<span aria-hidden="true">→</span></a></li>`).join('\n        ')}
      </ul>
    </section>

    <section class="bp-apply-next" id="apply-next" aria-labelledby="apply-next-title">
      <h2 id="apply-next-title">Before applying</h2>
      <p>Review the loan amount, fees and repayment schedule in your offer before accepting.</p>
      <div class="bp-actions">
        <a class="bp-button bp-button-primary" data-apply-default href="${siteUrl('loan-products/')}">Explore Loan Products</a>
        ${brands.map(brand => `<a class="bp-button bp-button-primary" data-apply-destination="${brand.id}" href="${route(brand)}" hidden>View ${brand.name} Financing</a>`).join('\n        ')}
        <a class="bp-button" href="${siteUrl('how-it-works/')}">How It Works</a>
      </div>
      <div class="bp-apply-support">
        <a href="${siteUrl('terms/')}">Read Terms and Conditions</a>
        <a href="${siteUrl('contact/')}">Contact Us</a>
      </div>
    </section>
  </section>`;
}
