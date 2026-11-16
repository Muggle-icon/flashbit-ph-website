const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  const messageField = contactForm.elements.message;
  const nameField = contactForm.elements.fullName;

  for (const field of [nameField, messageField]) {
    field.addEventListener('input', () => field.setCustomValidity(''));
  }

  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameField.value.trim();
    const message = messageField.value.trim();
    nameField.setCustomValidity(name ? '' : 'Enter your full name.');
    messageField.setCustomValidity(message ? '' : 'Enter a message.');
    if (!contactForm.reportValidity()) return;

    const fields = new FormData(contactForm);
    const subject = encodeURIComponent(`FlashBit inquiry: ${fields.get('topic')}`);
    const body = encodeURIComponent([
      `Full name: ${name}`,
      `Email address: ${fields.get('email')}`,
      `Mobile number: ${fields.get('mobile')}`,
      '',
      message.replace(/\r?\n/g, '\r\n'),
      '',
      'I consent to FlashBit Financing Corp. using these details to respond to my inquiry.',
    ].join('\r\n'));

    window.location.href = `mailto:${contactForm.dataset.recipient}?subject=${subject}&body=${body}`;
  });

  contactForm.hidden = false;
}
