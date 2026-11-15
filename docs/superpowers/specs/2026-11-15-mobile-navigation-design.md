# Mobile navigation and two location galleries

User request: fix all reported mobile regressions and restructure navigation around two location-specific galleries. The user delegated the menu structure; an optional preference question was offered while authorized fixes proceed.

## Approach

Use one shared header on current public pages, with a grouped "Locations & results" destination. Each location has separate treatments/address and before/after links, the latter targeting `/{locale}/cabinet/{slug}#gallery`. This matches the existing two cabinet galleries and avoids reintroducing a combined gallery. A flat list of two gallery links is the alternative if the user prefers it.

Mobile: keep brand and a 48px menu toggle in the header; put language selection inside the panel. Panel scrolls within the available viewport above the booking bar. Desktop: show section links, a locations/results disclosure and language selection. Use localized labels on all pages, preserve route and hash on language switch.

Close disclosures after navigation, Escape or outside pointer click. Keep native summary/link semantics. Existing visual style, contact destinations, carousel, disabled optional services and both cabinet galleries remain intact.

Fix the long cabinet title with responsive typography and overflow wrapping. Remove the inherited body overflow utility that defeats sticky positioning while retaining the existing overflow clipping rule. Update existing tests to current content and two gallery destinations; add geometry assertions that catch clipped controls/text rather than only document overflow.

No CMS/storage activation or real external writes. Validate mobile widths 320–767, phone landscape, desktop navigation, three locales, gallery deep links and language switches. Production build, full unit suite, Playwright and independent code review before draft PR. No main merge/deployment.
