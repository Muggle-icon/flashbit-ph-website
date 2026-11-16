const topics = [
  ['general', 'General'],
  ['application', 'Application'],
  ['payments', 'Payments'],
  ['privacy', 'Data Privacy'],
];

export function renderBpFaq(siteUrl, heading, { phone, phoneHref, dpoEmail, secNumber, authorityNumber, amlcNumber, company, tradeNames, launch }) {
  const questions = [
    ['general', 'What is FlashBit Financing Corp.?', `${company} is a Philippine financing company operating under the names of ${tradeNames}.`],
    ['general', 'Is FlashBit registered with the SEC?', `Yes. ${company} is registered with the SEC (Registration No. ${secNumber}) and holds Certificate of Authority No. ${authorityNumber}. We are also registered with the Anti-Money Laundering Council (Registration No. ${amlcNumber}).`],
    ['general', 'When will loan products be available?', `The planned launch date is ${launch}, subject to confirmation.`],
    ['application', 'Who can apply for a loan?', 'The proposed general requirements include Filipino citizenship, residence in the Philippines, age 21 or older, a valid government-issued ID and a regular source of income. Requirements may vary by product.'],
    ['application', 'What documents should I prepare?', `You may need a government-issued ID, proof of address and proof of income, such as payslips, a certificate of employment or business documents. Additional documents may be requested depending on the product. See <a href="${siteUrl('how-it-works/#what-you-need')}">What you’ll need</a>.`],
    ['application', 'How long does the review take?', 'Review timing depends on verification and the information needed for your application. If approved, you will receive an offer with the loan amount, costs and repayment schedule.'],
    ['payments', 'How will I receive the loan proceeds?', 'After you accept a loan offer, proceeds can be sent to a bank account or supported e-wallet in your name. Check your offer for the available disbursement method.'],
    ['payments', 'Where can I see the total cost?', `Before accepting, review the interest, fees, charges and total amount to repay in your offer and Disclosure Statement. See <a href="${siteUrl('terms/#terms-3')}">Interest, Fees and Charges</a> in the Terms and Conditions.`],
    ['privacy', 'How is my personal information protected?', `FlashBit limits the personal data it collects to what is needed for the stated purposes and uses safeguards to protect it. Read the <a href="${siteUrl('privacy/')}">Privacy Notice</a> or contact the Data Protection Officer at <a href="mailto:${dpoEmail}">${dpoEmail}</a>.`],
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
