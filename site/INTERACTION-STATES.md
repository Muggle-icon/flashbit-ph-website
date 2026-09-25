# Website interaction rules

Applies to the company homepage and all three product pages. User feedback on 2026-09-25 requires calm interaction states and a complete state review before publishing.

## Component rules

| Component | Default and hover | Selected/current | Keyboard focus |
| --- | --- | --- | --- |
| Carousel playback | Transparent text button; no underline, fill change, shadow or movement on hover. Visible label describes the next action: Start autoplay / Pause autoplay. | No selected appearance; its label changes with the requested playback state. | Visible focus outline. It is the first focusable control inside the carousel. |
| App guide step selectors | Transparent, no hover fill or underline. | The current step has a persistent light fill and colored number, with `aria-current`; its description and the screenshot stay synchronized. | Visible focus outline; native button keyboard activation. |
| Previous/next | Transparent arrow buttons, no hover fill change or movement. | No selected state. | Visible focus outline. |
| Page navigation | Stable layout; hover changes text color only. | The company Home link has a persistent current-page marker. Product anchor links are not marked as separate current pages. | Visible focus outline. |
| Primary link | Filled action, restrained background change; no scale, shadow or outline on mouse hover. | Not a selection control. | Visible focus outline. |
| Secondary/content/footer links | Text-link affordance and restrained underline feedback. | Not selection controls. | Visible focus outline. |
| Brand cards | Entire card is one link, with a restrained background change. No nested links or lifting animation. | Not selection controls. | Visible outline around the card. |

The project's touch target is at least 44 CSS px high for controls and navigation. This is a project convention, not a claim that WCAG requires every target to be 44px. Text and icons must not shift when a state changes. Logo combinations scale as a complete asset.

## Carousel behavior

- Start on Welcome, then Sign in, Home, Loan details.
- The four step buttons are the only named screenshot selector set. Desktop shows descriptions inside them; mobile uses the same buttons plus one synchronized description. Reserve mobile description height so rotation does not move the screenshot.
- Hide the dynamic mobile description without JavaScript; it must not remain stuck on Welcome while a user swipes other screenshots.
- Only autoplay while the screenshot viewport is sufficiently visible and the document is active.
- Mouse hover temporarily pauses rotation; removing its visual effect must not remove this behavior.
- Keyboard focus and manual navigation pause rotation persistently. Only an explicit Start action resumes it.
- Respect reduced-motion preferences; preserve manual navigation.
- The playback button's native text is its accessible name. Do not replace it with different wording in `aria-label`.
- Without JavaScript, hide the controls and retain scrollable screenshots and the fallback instruction. Without visibility observation, hide autoplay and retain manual controls.

## Release checks

Review each current interaction type in default, actual pointer hover, pointer activation, keyboard focus, keyboard activation and selected states. For the carousel, also verify start/pause, manual navigation and the order/count of screenshots. Check all four routes at desktop and narrow mobile widths, missing assets, internal destinations, text contrast, target size and overflow. Check the built GitHub Pages path and the deployed resource versions.

Do not equate a screenshot or automated contrast check with a complete accessibility certification. Record the scope and actual results in the project QA log; do not claim untested states passed.

## Sources checked on 2026-09-25

- [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/): controllable rotation, focus/hover pause, rotation control early in the keyboard sequence.
- [W3C Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html): preserve a visible keyboard focus indicator.
- [W3C Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html): the accessible name includes the visible control label.

These sources support accessibility behavior. The absence of decorative hover fills is this project's design decision and the user's explicit preference.
