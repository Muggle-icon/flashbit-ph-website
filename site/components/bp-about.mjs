const bars = [36, 58, 30, 74, 45, 56, 84, 59, 39, 68, 46, 88, 62, 42, 77, 51, 92, 54, 36, 77, 60, 92, 68, 53, 75, 43, 79, 57, 88, 48, 74, 56, 37, 64, 47, 33];

const values = [
  ['Customer First', 'We build our services around our customers’ everyday needs.', '<circle cx="9" cy="7" r="3"/><path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2m2-16a3 3 0 0 1 0 6m0 3a5 5 0 0 1 4 5v2"/>'],
  ['Integrity', 'We act openly, honestly and ethically.', '<path d="M12 22s7-4 7-10V5l-7-3-7 3v7c0 6 7 10 7 10Z"/><path d="m9 12 2 2 4-4"/>'],
  ['Responsible Lending', 'We support fair access to credit and clear borrowing decisions.', '<path d="M5 4h14v12H5zM8 20h8M12 16v4M8 8h8m-8 4h5"/>'],
  ['Innovation', 'We use technology to make financing easier to understand and access.', '<path d="M9 18v-2a6 6 0 1 1 6 0v2M9 18h6m-5 3h4"/>'],
  ['Growth Together', 'We aim to support the growth of individuals and businesses in the communities we serve.', '<path d="M4 4v16h16M8 15l4-4 3 2 5-6m-5 0h5v5"/>'],
];

export function renderBpAbout(siteUrl, renderRegistration) {
  return `
    <header class="bp-about-hero">
      <div class="bp-about-bars" aria-hidden="true">${bars.map(height => `<span style="--bar-height: ${height}%"></span>`).join('')}</div>
      <div class="wrap bp-about-hero-inner">
        <div class="bp-about-hero-copy">
          <p class="bp-about-eyebrow">About Us</p>
          <h1 id="about-title">Building Brighter <span>Possibilities Together</span></h1>
          <p class="bp-about-lead">FlashBit Financing Corp. is a newly registered corporation committed to providing simple, secure, and responsible financing solutions for every Filipino.</p>
        </div>
        <p class="bp-about-hero-note">More Opportunities<br>for Every Filipino.</p>
      </div>
    </header>
    <div class="wrap bp-section bp-about-grid">
      <section class="bp-about-company" aria-labelledby="about-company-title">
        <h2 id="about-company-title">Our Company</h2>
        <p>FlashBit Financing Corp. (the “Company”) is a newly registered corporation duly organized and existing under the laws of the Philippines. We are operating under the name of <strong>Livaya Financing</strong>, <strong>Alago Financing</strong> and <strong>Sulivo Financing</strong>, offering accessible and responsible financing solutions tailored to the everyday needs of Filipinos.</p>
        <p>We leverage technology and customer-centric service to provide a simple and transparent lending experience. Our focus is to promote financial inclusion, support individual and business growth, and contribute to a brighter and more inclusive future for our customers and the communities we serve.</p>
      </section>
      <section class="bp-about-ownership" aria-labelledby="about-ownership-title">
        <h2 id="about-ownership-title">Our Ownership</h2>
        <p class="bp-about-ownership-lead"><strong>99.99%</strong> owned by Novolink PTE Ltd.</p>
        <figure class="bp-about-ownership-figure">
          <div class="bp-about-ownership-ring" aria-hidden="true"><span>99.99%</span></div>
          <figcaption>
            <dl class="bp-about-ownership-key">
              <div><dt>Novolink PTE Ltd.</dt><dd>99.99%</dd></div>
              <div><dt>Others</dt><dd>0.01%</dd></div>
            </dl>
          </figcaption>
        </figure>
        <p class="bp-about-ownership-note">Novolink PTE Ltd. is based in Singapore. It provides FlashBit Financing Corp. with strategic direction, financial support and expertise as the company grows in the Philippines.</p>
      </section>
      ${renderRegistration(siteUrl).trim()}
    </div>
    <section class="bp-section bp-tint bp-about-purpose" aria-labelledby="about-purpose-title">
      <div class="wrap">
        <h2 id="about-purpose-title">Our Purpose and Values</h2>
        <p class="bp-section-intro">Our purpose is to expand access to responsible financing for Filipinos through practical, technology-enabled services.</p>
        <ul class="bp-about-value-list">
          ${values.map(([title, description, icon]) => `<li>
            <span class="bp-about-value-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icon}</svg></span>
            <h3>${title}</h3>
            <p>${description}</p>
          </li>`).join('\n          ')}
        </ul>
      </div>
    </section>`;
}
