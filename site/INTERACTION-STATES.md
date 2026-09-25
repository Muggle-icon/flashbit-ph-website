# Website interaction rules

Applies to the company homepage and all three product pages. User feedback on 2026-09-25 requires calm interaction states and a complete state review before publishing.

## Component rules

| Component | Default and hover | Selected/current | Keyboard focus | Pressed |
| --- | --- | --- | --- | --- |
| Carousel playback | Transparent text button; hover changes text color only. No underline, fill change, shadow or movement. Visible label describes the next action: Start autoplay / Pause autoplay. | No selected appearance; its label changes with the requested playback state. | Visible brand-color focus outline. It is the first focusable control inside the carousel. | Text color changes, with no fill or movement. |
| App guide step selectors | Transparent; hover changes the title color only, with no fill or underline. The section instruction identifies these as screen selectors. | The current step has a persistent white fill and colored number, with `aria-current`; its description and the screenshot stay synchronized. | Visible brand-color focus outline; native button keyboard activation. | Text color changes without changing selection fill, layout or position. |
| Previous/next | Transparent arrow buttons; hover changes icon color only, with no fill or movement. | No selected state. | Visible brand-color focus outline. | Icon color changes, with no movement. |
| Page navigation | Stable layout; hover changes text color only. | The company Home link has a persistent current-page marker. Product anchor links are not marked as separate current pages. | Visible focus outline. | Text color changes, with no movement. |
| Primary link | Filled action, restrained background change; no scale, shadow or outline on mouse hover. | Not a selection control. | A 3px `var(--hero-ink)` outline with a 4px offset, distinct from the button text color and checked against the surrounding Hero background. | Background changes independently of hover, with no movement. |
| Secondary/content/footer links | Text-link affordance and restrained underline feedback. The phone link has a persistent 1px underline, increasing to 2px on hover. | Not selection controls. | Visible focus outline. | Footer link text changes color, with no movement. |
| Brand cards | Entire card is one link, with a restrained brand-tint background change. No nested links or lifting animation. | Not selection controls. | Visible outline around the card. | The same brand-tint background provides feedback on press, including touch. |

The project's touch target is at least 44 CSS px high for controls and navigation. This is a project convention, not a claim that WCAG requires every target to be 44px. Text and icons must not shift when a state changes. Logo combinations scale as a complete asset.

Visual hover rules are guarded by `@media (hover:hover)`. Pressed feedback uses `:active` and does not depend on hover capability. Browser tap feedback is retained using `-webkit-tap-highlight-color: rgba(23,47,59,.15)` on links and buttons; it is not suppressed with a transparent highlight. Static headings, loan information, photographs and section containers do not receive interactive hover effects.

App screen selectors use a stable 8px gap with no row separators. Selection changes only the existing fill and colors, never margins, padding, text size or font weight. The heading and playback control belong to the guide column; the screenshot has no outer white card. Its controls and example caption align to the same 280px width as the phone.

## Carousel behavior

- Start on Welcome, then Sign in, Home, Loan details.
- The four step buttons are the only named screenshot selector set. Desktop shows descriptions inside them; mobile uses the same buttons plus one synchronized description below the phone and its previous/next toolbar. This placement keeps changing descriptions from shifting the screenshot above them. The description also has a 112px minimum height to reduce movement in the content below; longer text may still grow naturally.
- Hide the dynamic mobile description without JavaScript; it must not remain stuck on Welcome while a user swipes other screenshots.
- Only autoplay while the screenshot viewport is sufficiently visible and the document is active.
- Mouse hover temporarily pauses rotation; removing its visual effect must not remove this behavior.
- Keyboard focus and manual navigation pause rotation persistently. Only an explicit Start action resumes it.
- Respect reduced-motion preferences; preserve manual navigation.
- The playback button's native text is its accessible name. Do not replace it with different wording in `aria-label`.
- Without JavaScript, hide the controls and retain scrollable screenshots and the fallback instruction. Without visibility observation, hide autoplay and retain manual controls.

## Release checks

Review each current interaction type in default, actual pointer hover, held press and release, keyboard focus, keyboard activation and selected states. Include touch feedback rather than inferring it from desktop hover. Check the primary link's focus ring against each brand's actual Hero background. For the carousel, also verify start/pause, manual navigation, synchronized descriptions below the mobile preview and the order/count of screenshots. Check all four routes at desktop and narrow mobile widths, missing assets, internal destinations, text contrast, target size and overflow. Check the built GitHub Pages path and the deployed resource versions.

Do not equate a screenshot or automated contrast check with a complete accessibility certification. Record the scope and actual results in the project QA log; do not claim untested states passed.

## Sources checked on 2026-09-25

- [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/): controllable rotation, focus/hover pause, rotation control early in the keyboard sequence.
- [W3C Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html): preserve a visible keyboard focus indicator.
- [W3C Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): custom focus indicators must contrast with adjacent backgrounds; additional visual hover effects are not universally required.
- [W3C Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html): the accessible name includes the visible control label.
- [Carbon button states](https://carbondesignsystem.com/components/button/style/): distinguish hover, focus and active states rather than treating them as one appearance.
- [Fluent 2 links](https://fluent2.microsoft.design/components/web/react/core/link/usage): provide recognizable link cues while allowing quieter styling within familiar navigation groups.

These sources support accessibility behavior and the distinction between interaction states. The specific colors, spacing, tap-highlight tint and absence of decorative carousel hover fills are project decisions; the latter also preserves the user's explicit preference. This document records intended and implemented rules, not a claim that every state has passed live-browser or assistive-technology testing. Record actual verification separately in the QA log.
