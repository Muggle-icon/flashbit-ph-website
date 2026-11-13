# Lifestyle image sources

Updated: 2026-11-13

The homepage and Sulivo photographs are AI-generated everyday-life scenes created with OpenAI ImageGen. They are illustrative scenes.

The Livaya portrait uses the same crop as before, exported from the supplied App welcome image as a separate lightweight asset. The Alago portrait uses the user-supplied market photo. Sulivo uses the generated lifestyle photo below. The twelve App screenshots keep their original dimensions. The nine sign-in, home, and loan-detail screenshots use lossless WebP. The three photographic welcome screens use quality-78 WebP. Published favicon PNGs are optimized without changing their decoded pixels. The earlier original PNGs are available in the repository history at commit `6f2f711`.

The four current Alago App screens come from the PNG attachments supplied on 2026-11-13. Each measures 750 × 1624 px. The published copies total 255,852 bytes, down from 2,030,037 bytes in the attachments.

| Asset | Exact dimensions | Intended use | Source |
| --- | --- | --- | --- |
| `dist/assets/alago-market-portrait.webp` | 840 × 840 px | Alago hero photo of a woman holding fruit at a market stall | User attachment, 2026-11-13 |
| `dist/assets/livaya-shop-portrait.webp` | 840 × 764 px | Livaya hero portrait | User-supplied Livaya App welcome PNG |
| `dist/assets/flashbit-community-v1.webp` | 2170 × 725 px | Company homepage hero background with two adults at a community shop | Built-in image_gen, 2026-09-25 |
| `dist/assets/flashbit-community-v1-mobile.webp` | 1240 × 414 px | Medium rendition of the homepage hero photo | Same source as `flashbit-community-v1.webp` |
| `dist/assets/flashbit-community-v1-small.webp` | 800 × 267 px | Small rendition of the homepage hero photo | Same source as `flashbit-community-v1.webp` |
| `dist/assets/sulivo-seller-v2.webp` | 840 × 840 px | Sulivo lifestyle photo featuring an online seller packing orders | Built-in image_gen, 2026-09-25 |

## Visual inspection

Each product portrait has a 420px-wide variant. The homepage chooses between 800px, 1240px and 2170px images based on viewport width and pixel density. The regulatory marks from the BP prototype are published as lossless WebP at their display sizes.

## Final prompt: Sulivo

```text
Use case: photorealistic-natural.
Asset type: a single square website lifestyle photograph, 1024 x 1024. No collage, no page layout.
Primary request: candid documentary photograph of an ordinary Filipino female self-employed online seller, about 25 years old, checking an order on a smartphone at her small packing work table in a regular Philippine urban neighborhood.
Scene: a practical, tidy small room used for packing online orders, with a plain wooden work table, only two small unbranded brown cardboard parcels, folded plain fabric goods and a roll of packing tape. A simple storage shelf in the background, natural daylight from a nearby window. Ordinary room with realistic lived-in density, neither luxury home nor dilapidated poverty setting.
Subject: one woman with a distinct rounder face, naturally warm medium-brown skin with real pores and small imperfections, a simple short straight black bob ending at the jaw, ordinary build, no styled makeup. Plain muted light lilac T-shirt and casual trousers. She stands slightly angled beside the table, holds an ordinary smartphone naturally in her left hand with its screen facing her, and rests her relaxed right hand on the top of a parcel. Her expression is quietly focused with a subtle closed-mouth smile. She is looking down at her phone, not at the camera. An everyday young adult, not a fashion model, influencer or business executive.
Composition: one coherent eye-level medium environmental portrait, from head to upper thigh with complete head and both hands inside the frame. Person fills about two-thirds of the image, a modest amount of the workbench and room visible. Natural skin texture, believable anatomy and fingers, moderate depth of field, daylight, restrained documentary color, no beauty retouching.
Must feel clearly different from a long-haired woman in a retail grocery setting: short jaw-length haircut, distinct face, younger self-employed packing activity and room.
No typography, logo, watermark, interface overlay, conspicuous shipping label, money, coins, flags, tourist landmarks, palm trees, beach, exaggerated smile, thumbs-up, glamorous clothing, studio advertising pose, poverty narrative or luxurious styling. This is a generated everyday life illustration, not a real customer endorsement.
```


## Company homepage scene

An ordinary man arranges stock at a community shop while a woman checks her phone. The compressed image is used as the homepage hero background. The original `flashbit-community-v1.png` has SHA-256 `e91e44a8c9151e6a8bbd9fddb93b04328e3c1b64f22899a430dac3a8ee4da8f7`.

## Publishing image assets

Compress new raster images before adding them to `site/dist/assets/`. Use WebP for photographs and photographic App welcome screens. Retain lossless encoding for text-focused App screenshots and brand artwork. Verify that the published image decodes, fits its intended dimensions and weighs less than its source. Compare decoded pixels for lossless assets. Keep master files and unused images outside the Pages asset directory.

Prompt direction: candid, eye-level, natural-daylight Philippine community shop; normal clothing, skin and expressions; practical stock and everyday phone use; no direct-to-camera posing, cash, loan UI, flags, Jeepneys, tourism, luxury or poverty framing.
