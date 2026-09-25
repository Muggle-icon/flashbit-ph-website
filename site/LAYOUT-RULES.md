# Layout and grouping

These rules record the 2026-09-25 review of Flashbit and its three product pages.

- A module groups one topic and its related controls, rather than placing every paragraph in a card.
- Company page: introduction and community image; then a brand directory. Each brand row is one link.
- Product pages: everyday purpose; borrowing information; app guide. Preserve this reading order at every width.
- Borrowing information shares one boundary. Thin vertical dividers become horizontal item dividers on mobile.
- The app guide has one set of step selectors, synchronized with the original screenshots. Do not stretch steps into equally tall rows to match the phone image.
- Use a consistent content width and spacing hierarchy. Current project values: 1120px maximum width, 32px module gap/padding, 24px internal groups, 8px title/body spacing. Mobile uses smaller named values. These are project decisions, not universal rules.
- Borders group content or separate related items. Do not restore a decorative stripe below the header, underline selected controls, or add nested cards without a distinct purpose.
- Preserve brand assets, colors, natural local imagery, financial information boundaries, visible keyboard focus and reduced-motion support.

Sources: [IBM Carbon spacing](https://carbondesignsystem.com/elements/spacing/overview/), [Microsoft Fluent card](https://fluent2.microsoft.design/components/web/react/core/card/usage/), [Microsoft Fluent divider](https://fluent2.microsoft.design/components/web/react/core/divider/usage).

Before release, review all four pages at desktop and mobile sizes, including section transitions and real carousel states. Check the deployed GitHub Pages version. Passing dimensions and contrast checks alone does not establish visual quality or local user validation.
