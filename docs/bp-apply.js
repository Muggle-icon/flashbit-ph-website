const selectedBrand = new URLSearchParams(window.location.search).get('brand');
const brandLinks = Array.from(document.querySelectorAll('[data-apply-brand]'));
const selectedLink = brandLinks.find(link => link.dataset.applyBrand === selectedBrand);

if (selectedLink) {
  selectedLink.setAttribute('aria-current', 'true');
  document.querySelector('[data-apply-default]').hidden = true;
  for (const link of document.querySelectorAll('[data-apply-destination]')) {
    link.hidden = link.dataset.applyDestination !== selectedBrand;
  }
}
