# Website font licenses

Verified on 2026-09-25 against the font projects' official repositories and the SIL Open Font License documentation.

## Fonts supplied with this website

| Font | Intended use | Local file | Official version / axes | License |
| --- | --- | --- | --- | --- |
| Manrope | HTML body text, headings, navigation and live text wordmarks | `dist/assets/fonts/Manrope-Variable.woff2` | 4.505; normal; weight 200–800 | SIL Open Font License 1.1 |
| Source Serif 4 | Retained asset from the previous revision; not loaded by current CSS | `dist/assets/fonts/SourceSerif4-Italic-Variable.woff2` | 4.005; italic; weight 200–900; optical size 8–60 | SIL Open Font License 1.1 |

These are the official complete WOFF2 builds, downloaded without subsetting, conversion or modification. The local filenames are simplified for URLs; the internal font names and copyright metadata are unchanged. Both files include the Philippine peso character `₱` (U+20B1), verified from their Unicode character maps, and the printable basic Latin characters used by these English-language pages.

Manrope is the sole active website typeface after the lending-focused visual revision. Source Serif 4 and its complete license are retained for provenance; the current CSS does not load or use it.

The fonts are self-hosted alongside the website. CSS must use relative font URLs so GitHub Pages repository subpaths remain valid. The build copies the fonts and the complete license texts into `docs/assets/fonts/`.

## Official sources and notices

### Manrope

- Project: [googlefonts/manrope](https://github.com/googlefonts/manrope).
- Original binary: [fonts/webfonts/Manrope[wght].woff2](https://raw.githubusercontent.com/googlefonts/manrope/master/fonts/webfonts/Manrope%5Bwght%5D.woff2).
- Original license: [OFL.txt](https://raw.githubusercontent.com/googlefonts/manrope/master/OFL.txt).
- Complete local license: [`dist/assets/fonts/Manrope-OFL.txt`](dist/assets/fonts/Manrope-OFL.txt).
- The license file states: Copyright 2018 The Manrope Project Authors. The font's internal metadata states Copyright 2019 The Manrope Project Authors. Both original notices are retained unchanged.

### Source Serif 4

- Project: [adobe-fonts/source-serif](https://github.com/adobe-fonts/source-serif/tree/release).
- Original binary: [WOFF2/VAR/SourceSerif4Variable-Italic.ttf.woff2](https://raw.githubusercontent.com/adobe-fonts/source-serif/release/WOFF2/VAR/SourceSerif4Variable-Italic.ttf.woff2).
- Original license: [LICENSE.md](https://raw.githubusercontent.com/adobe-fonts/source-serif/release/LICENSE.md).
- Complete local license: [`dist/assets/fonts/SourceSerif4-OFL.txt`](dist/assets/fonts/SourceSerif4-OFL.txt).
- Copyright 2014–2023 Adobe. The reserved font name is `Source`. The copyright, trademark notice and license are preserved in the original license file and font metadata.

## Permitted use and conditions

Both fonts are copyrighted open-source font software, licensed for commercial use. They should be described as **open-source fonts permitted for commercial use under SIL OFL 1.1**, not as fonts with no copyright.

SIL OFL 1.1 permits use, embedding, redistribution and modification, including use on a commercial website. The principal conditions relevant to this project are:

- Retain the copyright notices and complete license with redistributed font files. The adjacent `*-OFL.txt` files do this and must remain in the deployed assets.
- Do not sell the font software by itself.
- Keep redistributed font software under SIL OFL 1.1.
- Observe reserved font names when making modified font versions. This website uses the official unmodified binaries.
- Do not use the font authors' names to imply endorsement.

Using these fonts does not require the website's original code, content or graphics to be licensed under the OFL. The full license files, rather than this summary, govern the fonts. See the official [OFL FAQ](https://openfontlicense.org/ofl-faq/) for additional explanation.

## Previous implementation and limits of this audit

Before this revision, CSS requested `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Arial`, `Georgia` and `Times New Roman`, with generic fallbacks. These are platform-dependent choices and cannot collectively be described as open-source fonts. Merely requesting a locally installed system font in CSS is not evidence of infringement, but it did not meet the requirement to identify and document the website's open-source typefaces.

The new local font files control live HTML text. Generic browser fallbacks can still be used temporarily while fonts load or if loading fails; the browser's locally chosen fallback is not a font distributed by this project.

**This audit does not establish the font licenses inside the user-supplied PNG logos or App screenshots.** Their lettering is already rasterized and is not affected by CSS `font-family`. Pixels alone do not identify the original typeface or prove its license. The source designers' font records and applicable permissions are needed to confirm those assets; this document must not be used to claim that every embedded image's typography has been cleared.

## File integrity

SHA-256 of the downloaded, unmodified files:

| File in `dist/assets/fonts/` | Bytes | SHA-256 |
| --- | ---: | --- |
| `Manrope-Variable.woff2` | 53,892 | `30b83738add8c9edd9e3450b98036a9a8fb5668d0cbd4eb0ce5fe6761197f21f` |
| `Manrope-OFL.txt` | 4,387 | `58172e0c0fac2cda8a37b348164bb55e44b0e69051e557e92b1d3f6910141f7b` |
| `SourceSerif4-Italic-Variable.woff2` | 346,688 | `9d28b5749a1ad096a295cb607c521bd1af4cd9979b6f37332daf70143149fb44` |
| `SourceSerif4-OFL.txt` | 4,491 | `c21d7293d87b6d7ab1d0229a2f55b77f33a7613a6a4e66f6693d68d7d8d09464` |

CSS integration:

```css
@font-face {
  font-family: "Manrope";
  src: url("./assets/fonts/Manrope-Variable.woff2") format("woff2");
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
}
```
