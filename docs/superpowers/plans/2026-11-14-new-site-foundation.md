# Sweet-lana Foundation Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Make the new public site maintainable while retaining reusable features for later activation.
**Architecture:** Keep current module paths. Explicit server-side feature switches isolate dormant routes; shared site content supplies active pages. Tests distinguish active behavior from reusable capability.
**Tech Stack:** Existing Next.js, React, TypeScript, Vitest and Playwright; no added runtime dependencies.
**Spec:** docs/superpowers/specs/2026-11-14-new-site-foundation-design.md

## Global Constraints

- Preserve reusable implementations; no redesign or dependency upgrades.
- CMS, public database gallery and Telegram booking default off.
- Keep indexing disabled and independent data credentials required.
- No production deployment or writes to external business services.

## Review Focus

- Existing credentials must not activate disabled routes.
- Direct route handlers must reject disabled requests before external work.
- Public database gallery must remain independent of admin activation.
- All locale links, contacts and cabinet destinations must keep working.
- Reusable tests must remain executable and must not require production credentials.

### Task 1: Isolate optional features

**Files:** src/lib/features.ts; src/proxy.ts; src/app/api/**/route.ts; src/app/login/page.tsx; src/app/admin/page.tsx; src/app/[locale]/gallery/page.tsx; tests/unit/features.test.ts and route tests.
**Interfaces:** isAdminEnabled(), isGalleryEnabled(), isBookingEnabled(): boolean, reading exact `true` from server environment flags.
- [ ] Add tests for off-by-default, independent opt-ins, proxy and direct handler rejection, and existing enabled auth/booking/category behavior. Run targeted tests and observe failures.
- [ ] Implement ENABLE_ADMIN, ENABLE_PUBLIC_GALLERY, ENABLE_BOOKING_API guards before route side effects. Keep CMS client UI in a component behind a server page guard.
- [ ] Run relevant unit tests and typecheck. Commit feature isolation.

### Task 2: Centralize current site content

**Files:** src/content/site.ts; src/lib/business.ts; src/app/[locale]/{page,layout}.tsx; src/app/[locale]/cabinet/[slug]/page.tsx; public gallery page and old brand references.
**Interfaces:** shared locale copy, cabinet content and BUSINESS contacts consumed by current pages; preserved reusable components keep their interfaces.
- [ ] Add active-page rendering tests for three locales, real contacts and cabinet links; verify regressions are detectable.
- [ ] Extract existing copy and cabinet data, replace duplicated contacts with BUSINESS and buildWhatsAppUrl. Replace obsolete brand literals and obsolete package name. Keep existing layout and indexing policy.
- [ ] Run unit suites and typecheck. Commit content cleanup.

### Task 3: Align checks and document retained features

**Files:** tests/{unit,reusable,e2e}; vitest.config.ts; playwright.config.ts; package.json; .env.example; README.md; docs/features.md; docs/reference-tests; .github/workflows/ci.yml.
**Interfaces:** test:site, test:reusable, test:unit (both), test:e2e (current-site browser suite).
- [ ] Keep useful unit tests runnable; fix renamed MongoDB global cleanup. Archive obsolete content/image-script tests as documented reference files without test extensions.
- [ ] Replace stale E2E expectations with multilingual home/cabinet/gallery navigation, mobile layout/menu, disabled API/auth access and indexing-policy checks. Keep future feature browser scenarios as documented references.
- [ ] Document inventory, flags and activation prerequisites. Correct lint script to an executable supported check without adding dependencies.
- [ ] Run both unit suites, typecheck, production build and Playwright. Review diff, commit and prepare a draft PR without merging or deploying.
