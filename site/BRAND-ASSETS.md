# Brand identity assets

On 2026-09-25 the user supplied Alago.png, Livaya.png and Sulivo.png and requested that they be used when composing the brand logos.

| Brand | Website asset | Original dimensions | SHA-256 |
| --- | --- | --- | --- |
| Alago | `dist/assets/alago-wordmark.png` in `6f2f711` | 390 × 201 | `cb8ec4b330ac5db4a828f97eae5b68e747135ef46a0bc3a55c387941d507c701` |
| Livaya | `dist/assets/livaya-wordmark.png` in `6f2f711` | 447 × 201 | `c7019bb023e776bd720777c73c53a7492d6be1251353581affb3012c246475e6` |
| Sulivo | `dist/assets/sulivo-wordmark.png` in `6f2f711` | 417 × 201 | `b2c2f3363208d11dac69451dba1bcd4c590d5ddbd41fdffa35de4edba32e8fc9` |

The original PNG wordmarks are retained byte-for-byte as supplied reference artwork. On 2026-09-25, the user subsequently authorized redesigning all three website logos while keeping the established names and colors. The old independent PNG icon/wordmark layout is superseded by the fixed combinations below. App screenshot pixels are not changed.

## Current product website logos

- `dist/assets/livaya-lockup.svg`, `alago-lockup.svg`, `sulivo-lockup.svg` are single, self-contained horizontal compositions. Each embeds the supplied icon PNG without pixel changes and contains Manrope 700 lettering converted to paths.
- On 2026-11-13 the user supplied replacement marks for ALAGO, LIVAYA and SULIVO. The published PNGs retain the supplied 240 × 240 dimensions, decoded RGBA pixels and sRGB color space. Each lockup embeds the same optimized PNG used for its favicon.
- The three PNGs use indexed palettes with exact RGBA values. The five SVG wordmarks round outline coordinates to one thousandth of a font unit.
- Lettering colors are sampled from the opaque primary colors in the user-supplied wordmarks: LIVAYA `#165962`; ALAGO and SULIVO `#0151C5`. The blue SULIVO wordmark is intentional: it preserves the supplied artwork even though its app icon has a violet background.
- Website names use the supplied spelling and title case for Livaya, Alago and Sulivo.
- The local Manrope 700 outlines are licensed under SIL OFL 1.1; see `FONT-LICENSES.md`. SVGs require no installed font or external asset request. Icons remain raster images within the SVG, so these are not wholly vector redrawings.
- `scripts/build-product-logos.py` creates the committed assets and `brand-lockups.json`. Requires Python fonttools and brotli only when regenerating; the regular website build does not need them.

| Brand | Published PNG under `dist/assets/` | Supplied PNG SHA-256 | Published PNG SHA-256 |
| --- | --- | --- | --- |
| Alago | `alago-icon.png` | `c430a3ba58b35dea9c43cd9d4a8a0a3becd687cab6d8fb14d9f6000468857cfa` | `ccca24b9fde11b2c80139c958c85d722b335f694ddbee8d04267160c36de5653` |
| Livaya | `livaya-icon-v2.png` | `3dc8c74d26885a2432ab2bf04ef2123abef1093e640721c9ca735aac9e63a5b9` | `edccaa6e5135ecdcd8d5739185d40fa75608b1db0151c8a5e8c16788c4569f88` |
| Sulivo | `sulivo-icon.png` | `89d0b2f65e0fa7e9f43881963fa37ec8750b5b29cdff41bb5c285142ba13153e` | `7f699841fc33f22874ae0cce269c89a3d2f7af55b97198a47daa521706398fb6` |

### Fixed geometry and usage

The master icon is 44 units tall; actual capital height is 20 units; icon-to-lettering gap is 10 units, with a shared baseline at 30 units. The 2026-09-25 review reduced the lettering's cap height from 24 to 20 units (16.7%) while preserving the icon size, weight, names, and colors. These are this project's optical design decisions, **not an industry-standard ratio**. Shared cap height and baseline retain consistent lettering across names with and without descenders. Full master dimensions are Livaya 134×44, Alago 128×44, Sulivo 134×44.

Scale the complete asset, never its components separately. Desktop headers use 44px height; mobile headers and product footers use 40px; cards use 48px, or 40px in the narrower three-column layout. At the smallest deployed size, cap height is about 18.2px. Keep at least 11/44 of the rendered icon height clear around the composition; current website containers exceed this. Do not distort, recolor with CSS, stretch to a shared width, or introduce a different icon/text ratio at a breakpoint.

The same master per brand appears on its company card, product header and product footer. Each product favicon uses the standalone mark. App screenshots preserve the artwork in the original captures.

Product footers now use a light neutral surface so the established full-color logos display without white badge containers or recoloring. The Flashbit company footer keeps its existing dark treatment. Product logo links continue returning to their own product; company return links remain separate.

### Design sources and their limits

- [Spotify Design & Branding Guidelines](https://developer.spotify.com/documentation/design): use a fixed icon/wordmark combination; preserve proportions and clear space. Its minimum sizes and spacing values belong to Spotify, not this project.
- [IBM Design Language — 8-Bar](https://www.ibm.com/design/language/ibm-logos/8-bar/): uses actual cap height to relate a wordmark and symbol, and documents optical adjustments and multiple size relationships.

These official sources, checked on 2026-09-25, support fixed composition and optical measurement. They do not establish a universal icon-to-wordmark ratio. This document records website identity usage, not a trademark-availability determination.

## Flashbit website identity

The website uses an original geometric F symbol with a separated square element, paired with Manrope 750 lettering converted to SVG paths. The design is intended to make the company identity recognizable at navigation size. It does not claim a financial guarantee or a lending speed.

- `dist/assets/flashbit-logo.svg`: full-color horizontal logo.
- `dist/assets/flashbit-logo-reverse.svg`: light logo for the dark company footer.
- `dist/assets/flashbit-symbol.svg`: standalone mark and favicon.
- `scripts/build-flashbit-logo.py`: optional asset-generation script; requires Python `fonttools` and `brotli`. The normal website build uses the committed SVGs and does not require these packages.
