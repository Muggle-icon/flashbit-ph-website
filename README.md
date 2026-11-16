# Flashbit Philippines website

Company and brand pages share the FlashBit header and footer. Each product page retains its own brand logo, imagery and app preview.

Asset provenance: [font licenses and official sources](site/FONT-LICENSES.md), [lifestyle image sources](site/IMAGE-SOURCES.md). Web fonts are self-hosted under SIL OFL 1.1. App screenshots remain unchanged. Each product shows all four supplied screens in Welcome, Sign in, Home, Loan details order in a swipeable carousel, with six-second autoplay, previous/next controls and explicit pause/play. Manual interaction pauses playback; reduced-motion preferences disable initial autoplay.

The homepage displays the BP review draft based on Rosh's HTML prototype. Its three brand cards link to their product pages. Flashbit uses an SVG symbol and outlined wordmark. See [brand asset provenance](site/BRAND-ASSETS.md).

The BP review site has standalone About Us, Our Brands, Loan Products, How It Works, FAQs, Contact Us and How to Apply pages, along with Terms and Conditions and Privacy Notice drafts. The Contact Us form opens a draft in the visitor's email app. How to Apply provides brand-specific guidance without collecting application data.

## GitHub Pages

Repository: `Muggle-icon/flashbit-ph-website`.

Build the deployable files:

```sh
node scripts/build-github-pages.mjs /flashbit-ph-website/
```

GitHub Pages publishes the `docs/` folder on `main`. Commit the regenerated files and push to update the website. No external dependencies or application server are required.

## Local preview

```sh
node site/render.mjs
python3 -m http.server 4173 --bind 127.0.0.1 --directory site/dist
```

## Structure

- `site/render.mjs`: page content, shared navigation, footer and route generation.
- `site/dist/styles.css`: responsive styles, Manrope typography and brand themes.
- `site/components/app-carousel.mjs`: shared four-screen product module.
- `site/dist/carousel.css` and `carousel.js`: native horizontal scrolling and accessible autoplay controls.
- `site/dist/assets/`: original supplied brand assets and App screenshots.
- `scripts/build-github-pages.mjs`: copies assets and generates project-relative Pages URLs.
- `docs/`: generated GitHub Pages website.

Company routes are the homepage, `about/`, `brands/`, `loan-products/`, `how-it-works/`, `faqs/`, `contact/`, `apply/`, `terms/` and `privacy/`. Brand routes are `brands/livaya/`, `brands/alago/` and `brands/sulivo/`. The earlier `livayafinancing/`, `alagofinancing/` and `sulivofinancing/` URLs remain available as aliases. App screenshots show example loan offers.
