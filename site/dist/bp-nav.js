const brandMenu = document.querySelector('.bp-brand-menu');
const brandMenuToggle = brandMenu.querySelector('summary');

document.addEventListener('click', event => {
  if (brandMenu.open && !brandMenu.contains(event.target)) brandMenu.open = false;
});

document.addEventListener('focusin', event => {
  if (brandMenu.open && !brandMenu.contains(event.target)) brandMenu.open = false;
});

brandMenu.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !brandMenu.open) return;
  brandMenu.open = false;
  brandMenuToggle.focus();
});

function followLegacySectionLink() {
  const link = document.getElementById(window.location.hash.slice(1));
  if (link?.hasAttribute('data-legacy-section')) window.location.replace(link.href);
}

window.addEventListener('hashchange', followLegacySectionLink);
followLegacySectionLink();
