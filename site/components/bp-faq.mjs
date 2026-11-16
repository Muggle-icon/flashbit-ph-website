const topics = [
  ['general', 'General'],
  ['application', 'Application'],
  ['payments', 'Payments'],
  ['privacy', 'Data Privacy'],
];

export function renderBpFaq(siteUrl, heading, { phone, phoneHref, dpoEmail, secNumber, authorityNumber, amlcNumber, company, tradeNames, launch }) {
  const questions = [
    ['general', 'What is FlashBit Financing Corp.?', `${company} operates under the names of ${tradeNames}.`],
    ['general', 'Is FlashBit registered with the SEC?', `Yes. ${company} is registered with the SEC (Registration No. ${secNumber}) and holds Certificate of Authority No. ${authorityNumber}. We are also registered with the Anti-Money Laundering Council (Registration No. ${amlcNumber}).`],
    ['general', 'When will loan products be available?', `The planned launch date is ${launch}, subject to confirmation.`],
    ['application', 'Who can apply for a loan?', 'The proposed general requirements include being a Filipino citizen, at least 21 years old, with a valid government-issued ID and a regular source of income. Requirements may vary by product.'],
    ['application', 'What documents should I prepare?', 'You may be asked for a government-issued ID, proof of income and proof of address. Check the requirements for your chosen product before applying.'],
    ['application', 'How long does the review take?', 'Review timing depends on verification and the information needed for your application.'],
    ['payments', 'How will I receive the loan proceeds?', 'Check your loan offer for the available disbursement method and account requirements.'],
    ['payments', 'Where can I see the total cost?', 'Review the interest, fees, charges and total repayment in the Disclosure Statement before accepting a loan offer.'],
    ['privacy', 'Who can I contact about personal data?', `Read the <a href="${siteUrl('privacy/')}">Privacy Notice</a> or contact the Data Protection Officer at <a href="mailto:${dpoEmail}">${dpoEmail}</a>.`],
  ];
  const filters = [['all', 'All'], ...topics];

  return `
    <div data-faq>
      <header class="bp-faq-head bp-tint">
        <div class="wrap">
          ${heading}
          <p class="bp-section-intro">Find answers about applying, loan costs and how to get help.</p>
          <div class="bp-faq-search" data-faq-tools hidden>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.2 15.2 4.3 4.3"/></svg>
            <input type="search" aria-label="Search FAQs" placeholder="Search questions…" data-faq-search>
          </div>
        </div>
      </header>
      <div class="wrap bp-faq-layout">
        <div class="bp-faq-main">
          <div data-faq-tools hidden>
            <div class="bp-faq-filters" role="group" aria-label="FAQ categories">
              ${filters.map(([id, label]) => `<button type="button" data-faq-filter="${id}" aria-pressed="${id === 'all'}">${label}</button>`).join('\n              ')}
            </div>
            <p class="bp-faq-count" role="status">${questions.length} questions shown</p>
          </div>
          <div class="bp-faq-items">
            ${topics.map(([category, label], topicIndex) => `<section class="bp-faq-topic" data-faq-topic="${category}" aria-labelledby="faq-topic-${category}">
              <h2 id="faq-topic-${category}">${label}</h2>
              ${questions.filter(([id]) => id === category).map(([, question, answer], index) => `<details class="bp-faq-question" name="bp-faq"${topicIndex === 0 && index === 0 ? ' open' : ''}>
                <summary>${question}</summary>
                <p class="bp-faq-answer">${answer}</p>
              </details>`).join('\n              ')}
            </section>`).join('\n            ')}
            <p class="bp-faq-empty" data-faq-empty hidden>No questions match. Try a different search or topic.</p>
          </div>
        </div>
        <aside class="bp-faq-contact" aria-labelledby="faq-help-title">
          <h2 id="faq-help-title">Still have questions?</h2>
          <a class="bp-faq-call" href="${phoneHref}" aria-label="Call customer support at ${phone}">${phone}</a>
          <a class="bp-button" href="${siteUrl('contact/')}">Contact Us</a>
        </aside>
      </div>
    </div>`;
}
