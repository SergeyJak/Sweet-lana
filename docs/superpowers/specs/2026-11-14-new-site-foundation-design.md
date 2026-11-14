# Sweet-lana foundation cleanup

Approved in conversation: preserve reusable features from the copied site while developing the new public site. The CMS is deferred.

## Approach

Keep reusable modules in their current locations and disable unused routes by default. Deleting them would lose convenient reuse; relocating everything now would add unnecessary import churn. No redesign, dependency upgrades, business claims, or production deployment.

## Scope

- Preserve CMS/auth, gallery and categories with MongoDB/R2, Telegram booking, consent-aware analytics, theme toggle, reusable sections and UI.
- Add explicit server-side opt-ins for admin, database-backed public gallery, and booking API. Disabled routes return 404 before auth, parsing, or external work, even if credentials exist. Admin and public gallery can be enabled independently.
- Centralize current public copy, locations, and business contacts without changing the visible design. Keep search indexing disabled.
- Remove previous branding from runnable UI/configuration. Preserve neutral components and tests; replace stale business fixtures with new-site assertions.
- Keep current-site checks and reusable-feature checks separately runnable and both in CI. Archive tests of removed business content as reference, not silently skipped tests.
- Document feature inventory, dependencies, flags and future activation requirements. Do not connect real services or reuse old data.

## Validation

Typecheck, current and reusable unit suites, production build, and current-site browser checks. Exercise disabled endpoints without credentials and enabled API/auth behavior using mocks. No real Telegram messages, database writes or storage changes.
