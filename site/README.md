# Flashbit website design draft

Four static pages: Flashbit, LIVAYA, ALAGO and SULIVO. Based on the supplied September 24, 2026 PDF and original brand PNGs.

## Preview

```sh
node render.mjs
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/.

## Edit

- `render.mjs`: shared header/footer, page copy and brand configuration. Run after editing to regenerate all four HTML files.
- `dist/styles.css`: shared responsive styles and brand tokens.
- `dist/assets/`: unchanged copies of user-supplied PNGs. Portraits are cropped by the webpage layout; no bitmap contents were modified.

This first version is informational. It contains no loan application, account creation, tracking, or financial transaction functions. App screenshots are illustrative, and their values are not advertised as an offer. Contact details follow the supplied prototype; no email address was provided.

From the repository root, run `node scripts/build-github-pages.mjs /flashbit-ph-website/` to generate the GitHub Pages version in `docs/`. `BASE_PATH` controls project-relative URLs; `OUTPUT_DIR` can override the HTML output directory. The Pages builder also copies the stylesheet and original assets.

Internal design notes and previous hosting metadata are not included in the deployment. Official domain changes are outside this draft.
