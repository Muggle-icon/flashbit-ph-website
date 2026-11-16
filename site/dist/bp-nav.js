const header = document.querySelector('.bp-header');
const brandMenu = header.querySelector('.bp-brand-menu');
const brandMenuToggle = brandMenu.querySelector('summary');
let brandHoverTimer;

function closeBrandMenu() {
  clearTimeout(brandHoverTimer);
  brandMenu.open = false;
}

brandMenu.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse' && !brandMenu.open) {
    brandHoverTimer = setTimeout(() => { brandMenu.open = true; }, 120);
  }
});

brandMenu.addEventListener('pointerleave', event => {
  clearTimeout(brandHoverTimer);
  if (event.pointerType === 'mouse' && !brandMenu.querySelector('.bp-brand-menu-links').contains(document.activeElement)) {
    closeBrandMenu();
  }
});

brandMenu.addEventListener('click', event => {
  clearTimeout(brandHoverTimer);
  if (event.target.closest('a')) closeBrandMenu();
});

document.addEventListener('pointerdown', event => {
  if (!brandMenu.contains(event.target)) closeBrandMenu();
});

document.addEventListener('focusin', event => {
  if (!brandMenu.contains(event.target)) closeBrandMenu();
});

brandMenu.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !brandMenu.open) return;
  event.preventDefault();
  closeBrandMenu();
  brandMenuToggle.focus();
});

const menuTrigger = header.querySelector('.bp-menu-trigger');
const mobileMenu = document.getElementById('bp-mobile-menu');

if (typeof mobileMenu.showModal === 'function') {
  menuTrigger.hidden = false;
  menuTrigger.addEventListener('click', () => {
    closeBrandMenu();
    mobileMenu.showModal();
    menuTrigger.setAttribute('aria-expanded', 'true');
  });
  mobileMenu.addEventListener('click', event => {
    if (event.target === mobileMenu || event.target.closest('.bp-menu-close, a')) mobileMenu.close();
  });
  mobileMenu.addEventListener('close', () => menuTrigger.setAttribute('aria-expanded', 'false'));
  matchMedia('(max-width: 960px)').addEventListener('change', event => {
    if (!event.matches && mobileMenu.open) mobileMenu.close();
  });
}

function updateHeaderOffset() {
  document.documentElement.style.setProperty('--bp-header-height', `${header.offsetHeight}px`);
}

updateHeaderOffset();
if (typeof ResizeObserver === 'function') new ResizeObserver(updateHeaderOffset).observe(header);

const legacyLinks = [...header.querySelectorAll('[data-legacy-anchor]')];
if (legacyLinks.length) {
  function followLegacySectionLink() {
    const slug = window.location.hash.slice(1);
    const link = legacyLinks.find(link => link.dataset.legacyAnchor === slug);
    if (link) window.location.replace(link.href);
  }

  window.addEventListener('hashchange', followLegacySectionLink);
  followLegacySectionLink();
}
