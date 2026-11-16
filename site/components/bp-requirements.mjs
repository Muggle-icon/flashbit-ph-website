const requirements = [
  {
    title: 'Valid government ID',
    description: 'Any one (1) valid government-issued ID.',
    icon: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="2"/><path d="M5 16c.4-1.7 1.6-2.5 3.5-2.5s3.1.8 3.5 2.5M14.5 10h4M14.5 14h4"/>',
  },
  {
    title: 'Proof of income',
    description: 'Payslips, certificate of employment, or business documents.',
    icon: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 10h2M8 14h8M8 17h8"/>',
  },
  {
    title: 'Bank or e-wallet account',
    description: 'A supported account in your name to receive loan proceeds.',
    icon: '<path d="M3 8l9-5 9 5zM6 11v7m4-7v7m4-7v7m4-7v7M3 21h18"/>',
  },
  {
    title: 'Eligibility',
    description: 'Filipino citizen living in the Philippines, aged 21 or older.',
    icon: '<path d="m12 2.5 3 2 3.5.5 1 3.5 2 3.5-2 3.5-1 3.5-3.5.5-3 2-3-2-3.5-.5-1-3.5-2-3.5 2-3.5 1-3.5L9 4.5z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  },
];

export function renderBpRequirements(siteUrl) {
  return `
  <section class="bp-section bp-tint bp-requirements" id="what-you-need" aria-labelledby="bp-requirements-title">
    <div class="wrap">
      <h2 id="bp-requirements-title">What you'll need</h2>
      <p class="bp-section-intro">Prepare these before you start. Additional documents may be requested depending on the product.</p>
      <ul class="bp-requirements-grid" role="list">
        ${requirements.map(({ title, description, icon }) => `<li>
          <svg class="bp-requirements-icon" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg>
          <h3>${title}</h3>
          <p>${description}</p>
        </li>`).join('\n        ')}
      </ul>
      <a class="bp-button bp-button-primary bp-requirements-action" href="${siteUrl('loan-products/')}">Explore Loan Products <span aria-hidden="true">→</span></a>
    </div>
  </section>`;
}
