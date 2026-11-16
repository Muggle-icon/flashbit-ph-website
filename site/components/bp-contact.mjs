const iconPaths = {
  phone: '<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  privacy: '<circle cx="10" cy="8" r="4"/><path d="M3 20v-2a5 5 0 0 1 5-5h4m2 4 2.5 2.5L21 15"/>',
  address: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
};

export function renderBpContact(siteUrl, { phone, phoneHref, supportEmail, dpoEmail, office }) {
  const mapUrl = 'https://www.google.com/maps/search/?api=1&amp;query=Prestige+Tower+F.+Ortigas+Jr.+Road+Pasig+City';
  const contactMethods = [
    ['phone', 'Call us', phone, phoneHref],
    ['email', 'Email us', supportEmail.replace('@', '@<wbr>'), `mailto:${supportEmail}`],
    ['privacy', 'Data Protection Officer', dpoEmail, `mailto:${dpoEmail}`],
  ];
  const contactIcon = icon => `<span class="bp-contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[icon]}</svg></span>`;

  return `
  <header class="bp-contact-head">
    <div class="wrap"><h1>Contact Us</h1><p class="bp-section-intro">For questions about loans, repayments or your personal data.</p></div>
  </header>
  <div class="wrap bp-section bp-contact">
    <ul class="bp-contact-methods" aria-label="Contact details">
      ${contactMethods.map(([icon, title, value, href]) => `<li><a class="bp-contact-method" href="${href}">
        ${contactIcon(icon)}<div><h2>${title}</h2><span class="bp-contact-value">${value}</span></div>
      </a></li>`).join('\n      ')}
      <li class="bp-contact-method bp-contact-address">
        ${contactIcon('address')}<div><h2>Principal Address</h2><address>${office}</address>
        <a href="${mapUrl}" target="_blank" rel="noopener noreferrer">View on map</a></div>
      </li>
    </ul>
    <form class="bp-contact-form" data-contact-form data-recipient="${supportEmail}" method="post" aria-labelledby="contact-form-title" hidden>
      <div>
        <h2 id="contact-form-title">Send us a message</h2>
        <p>Fields marked with an asterisk (*) are required.</p>
      </div>
      <div class="bp-contact-field">
        <label for="contact-name">Full name <span aria-hidden="true">*</span></label>
        <input id="contact-name" name="fullName" autocomplete="name" required>
      </div>
      <div class="bp-contact-field-row">
        <div class="bp-contact-field">
          <label for="contact-email">Email address <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" autocomplete="email" required>
        </div>
        <div class="bp-contact-field">
          <label for="contact-mobile">Mobile number <span aria-hidden="true">*</span></label>
          <input id="contact-mobile" name="mobile" type="tel" autocomplete="tel" pattern="(?:0|\\+?63)[\\s\\-]?9(?:[\\s\\-]?[0-9]){9}" aria-describedby="contact-mobile-hint" required>
          <small id="contact-mobile-hint">e.g. 09171234567 or +639171234567</small>
        </div>
      </div>
      <div class="bp-contact-field">
        <label for="contact-topic">Topic <span aria-hidden="true">*</span></label>
        <select id="contact-topic" name="topic" required>
          <option value="">Select a topic</option>
          <option>General inquiry</option>
          <option>Loan products</option>
          <option>Application status</option>
          <option>Data privacy</option>
          <option>Partnership</option>
        </select>
      </div>
      <div class="bp-contact-field">
        <label for="contact-message">Message <span aria-hidden="true">*</span></label>
        <textarea id="contact-message" name="message" rows="5" required></textarea>
      </div>
      <div class="bp-contact-consent">
        <input id="contact-consent" name="consent" type="checkbox" aria-describedby="contact-privacy" required>
        <div><label for="contact-consent">I consent to FlashBit Financing Corp. using these details to respond to my inquiry.</label>
        <a id="contact-privacy" href="${siteUrl('privacy/')}">Read the Privacy Notice</a></div>
      </div>
      <div class="bp-contact-submit">
        <p id="contact-submit-hint">This opens a draft in your email app. You can review it there before sending.</p>
        <button class="bp-button bp-button-primary" type="submit" aria-describedby="contact-submit-hint">Open email draft</button>
      </div>
    </form>
  </div>`;
}
