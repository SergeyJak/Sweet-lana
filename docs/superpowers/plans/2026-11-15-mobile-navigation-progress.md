# Execution ledger: mobile navigation

- Base: ab58f97, isolated existing worktree, branch fix/mobile-navigation.
- Reproduced on current production build: header toggle right edge 388px at 320/360/375 widths; long RU title text extends to x399 at 320–390; same-page menu selection leaves details open.
- Root causes: inherited 48px anchor minima plus fixed single-row header; h1 has fixed 48px text and no emergency wrapping; native details has no navigation-close handler. Body overflow-x-hidden utility also creates a scroll container and defeats sticky header behavior.
- User authorized all reported fixes and asked to restructure menu for two galleries. Proceed with grouped location/result links as recommended default; optional preference question pending.

- Regression RED: 5 browser failures (320/360/375 header clipping, long title, menu stays open); 390/430 baseline already fit.
- Implemented one shared header with two per-cabinet treatment/gallery groups, localized labels and hash-preserving languages. Mobile language choices moved into scrollable panel; links, Escape and outside pointer dismiss it.
- Restored sticky positioning by removing body overflow-x-hidden utility; existing overflow clip remains. Long title uses responsive size with emergency wrapping.
- Unit suite 81/81 and production build passed. First mobile pass 16/17; landscape geometry exposed a 10px overlap with the fixed contact bar (panel bottom238 vs bar top228). Increased medium-viewport reserved space to 15rem, to retest.

- Final browser run:25 passed /9 intentional mobile-only skips on desktop, including all17 mobile tests. Landscape menu and contact bar no longer overlap; sticky header and both location-gallery flows pass.
-96 route/locale/viewport checks passed with no clipped controls, broken anchors/images or runtime errors; final smaller title and landscape reservation separately covered by passing regression suite.
- Current screenshots checked at320/390 and desktop1280. RU long heading now fits at32px on320 without an awkward one-letter break. New menu shows both cabinets and their result links.
- Fresh code reviewer found no introduced issues. Browser runtime evidence is from parent; reviewer's browser launch was unavailable.
- Final verification:81/81 unit tests, typecheck and production build passed; no dependency changes or external service activation. Existing client-side cabinet switching also verified to update language hrefs without a stale gallery hash.
- Optional preference question received no answer during implementation; used the proposed grouped cabinet/results structure under the user's instruction to restructure navigation.
