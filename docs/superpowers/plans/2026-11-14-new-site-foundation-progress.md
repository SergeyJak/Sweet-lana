# Execution ledger — plan: 2026-11-14-new-site-foundation.md

- Ruling: user approved the concrete scope and said to execute; continue inline without another planning approval.
- Workspace: fresh clone on chore/new-site-foundation, based on 1011433. Existing downloaded review snapshot left unchanged.
- Baseline: reviewed GitHub CI run 43636997488: typecheck passed, unit tests 40 passed / 9 failed, build and E2E skipped. Repairing these checks is explicitly authorized.
- Pre-flight: task 2 consumes feature-gated routes from task 1; task 3 preserves enabled-feature checks and tests default-disabled behavior. No interface conflict.

- Task 1: complete, commit 25edc2e. New default-off regressions failed before guards, then 39/39 targeted tests passed; typecheck passed.
- Task 2: active shared-contact tests failed for five pages before extraction, then 33/33 page/flag tests passed. No visible redesign; contacts and existing copy centralized.

- Task 2: complete. Shared-contact regression tests: 5 failed before extraction, 7 passed after; typecheck passed. Current public copy, locations, review excerpts and business contacts now centralized.
- Task 3: unit suite now 81/81 passing (14 files). Useful tests moved to tests/reusable; obsolete business-specific scenarios preserved as .ts.txt references. Mongo test cleanup uses the renamed global cache. Production build passed.
- Ruling: removed the broken next lint command and unused ESLint config rather than misrepresent typechecking as linting; no dependencies added. Cost: no dedicated lint until explicitly configured later.
- Ruling: consolidate remaining content and test migration into one commit because new scripts depend on new suite paths. Cost: larger but internally consistent review unit.
- Browser plugin not available; using existing Playwright workflow. Flow: localized home → cabinet selection → location-specific contact and gallery → language switch; default-disabled routes remain 404.
- Local runtime is Node 24.22.1; npm ci used engine-strict=false only for local installation. Project/CI remain pinned to Node 24.21.0 with no dependency upgrades.

- Final review: fresh reviewer independently reran 81/81 unit tests and found no runtime regressions. Corrected one documentation issue: editing gallery only needs admin; publishing database images is a separate opt-in. No deferred new-code findings.
- Final verification: test:site 45/45, test:reusable 36/36, typecheck passed, production build passed, Playwright 13 passed / 1 desktop skip of mobile-only navigation. No real external service writes.
