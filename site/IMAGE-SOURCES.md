# Lifestyle image sources

Updated: 2026-11-13

These three images are AI-generated illustrative everyday-life scenes for the website. They are not photographs of identified customers, testimonials, or evidence of actual users' nationality, occupation, or borrowing history. They were made with the built-in OpenAI `image_gen` tool (not a CLI/API fallback or stock-image service).

LIVAYA uses the supplied App welcome screen. ALAGO and SULIVO use the lifestyle imagery below. The twelve published App screenshots retain every decoded pixel and their original dimensions in lossless WebP. Published favicon PNGs are optimized without changing their decoded pixels. Original PNGs are available in the repository history at commit `6f2f711`.

| Asset | Exact dimensions | Intended use | Source |
| --- | --- | --- | --- |
| `dist/assets/alago-worker-v2.webp` | 1254 × 1254 px | ALAGO lifestyle photo featuring a retail worker during a phone break | Built-in image_gen, 2026-09-25 |
| `dist/assets/flashbit-community-v1.webp` | 2170 × 725 px | Company homepage hero background with two adults at a community shop | Built-in image_gen, 2026-09-25 |
| `dist/assets/sulivo-seller-v2.webp` | 1254 × 1254 px | SULIVO lifestyle photo featuring an online seller packing orders | Built-in image_gen, 2026-09-25 |

## Visual inspection

Both outputs were inspected at generation. Each is a single square full photograph with complete head, visible natural phone-use hands, ordinary clothing and natural skin texture. ALAGO has a seated man in navy at the back of a small shop. SULIVO has a short-haired woman in lilac at a home packing table. Web copies are encoded as WebP at their original dimensions.

## Final prompt: ALAGO

```text
Use case: photorealistic-natural.
Asset type: a single square website lifestyle photograph, 1024 x 1024. No collage, no page layout.
Primary request: candid documentary photograph of an ordinary Filipino male community retail employee, about 29 years old, quietly checking a smartphone during a normal work break.
Scene: the modest tidy back area of a neighborhood retail shop in an ordinary Philippine city. Practical shelves of plain supplies and one work table, realistic lived-in density, neither luxurious nor run-down. Soft neutral blue-gray tones and daylight. No tourist symbols.
Subject: one man, natural medium brown skin and visible normal skin texture, short simple black hair, ordinary build, understated navy blue polo without a logo, plain trousers. Everyday face and normal proportions, not a fashion model or executive. He is seated and angled slightly three-quarter, naturally holding his phone with one hand and interacting with the other, looking at its screen. Relaxed focused expression, mouth closed with only a slight natural smile. Phone screen faces him.
Composition: one coherent eye-level medium environmental portrait, head to lap visible, complete head and both hands comfortably inside the frame. Subject occupies around two-thirds of the image. Natural believable fingers. Gentle background detail with moderate depth of field, authentic ambient daylight, natural color rendition, restrained photographic finish.
No typography, logos, visible company badges, watermark, user interface overlay, cash, coins, thumbs-up, confetti, flags, landmark, beach, palm tree, exaggerated grin, slick advertising pose, studio lighting, beauty retouching or poverty narrative. This is a generated everyday life illustration, not a real customer endorsement.
```

## Final prompt: SULIVO

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

Compress new raster images before adding them to `site/dist/assets/`. Use WebP for photographs and retain lossless encoding for App screenshots and brand artwork. Verify that the published image decodes, fits its intended dimensions and weighs less than its source. Compare decoded pixels for lossless assets. Keep master files and unused images outside the Pages asset directory.

Prompt direction: candid, eye-level, natural-daylight Philippine community shop; normal clothing, skin and expressions; practical stock and everyday phone use; no direct-to-camera posing, cash, loan UI, flags, Jeepneys, tourism, luxury or poverty framing.
