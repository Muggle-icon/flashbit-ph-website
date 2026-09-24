# Flashbit Philippines website

Four informational pages for Flashbit and its brands: LIVAYA, ALAGO and SULIVO.

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
- `site/dist/styles.css`: responsive styles and brand themes.
- `site/dist/assets/`: original supplied brand assets and App screenshots.
- `scripts/build-github-pages.mjs`: copies assets and generates project-relative Pages URLs.
- `docs/`: generated GitHub Pages website.

The four routes are the homepage, `livayafinancing/`, `alagofinancing/` and `sulivofinancing/`. The website contains company and product information only. It does not accept loan applications or process financial transactions. App screenshot amounts are illustrative, not a universal loan offer.
