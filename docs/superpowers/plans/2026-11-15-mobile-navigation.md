# Mobile Navigation Implementation Plan

**Goal:** Fit mobile navigation and headings, close the menu correctly, and expose both cabinet galleries clearly.
**Architecture:** Shared client SiteHeader with native disclosures; lightweight localized navigation copy. Existing cabinet pages own their gallery anchors.
**Tech Stack:** Existing Next.js, React, TypeScript, Playwright and Vitest; no dependency upgrades.
**Spec:** docs/superpowers/specs/2026-11-15-mobile-navigation-design.md

## Tasks

- [x] Reproduce header clipping, long-title clipping and menu persistence with browser geometry/interaction tests. Baseline already documented in the mobile QA report.
- [x] Add shared SiteHeader and navigation copy. Mobile brand/toggle row, language selector inside bounded panel, grouped cabinet/gallery links. Desktop disclosure. Close on selection, outside interaction and Escape; preserve current route/hash for language links.
- [x] Use the shared header on home, both cabinet pages and retained standalone gallery. Wrap long cabinet titles; restore sticky behavior by removing conflicting body overflow utility. Add direct local gallery shortcut on cabinet pages.
- [x] Replace stale homepage/gallery assertions with current hero content and two cabinet gallery deep links. Test controls and text inside viewport, mobile panel scrolling in landscape and desktop dropdown.
- [x] Run unit/typecheck/build/browser suites, inspect mobile screenshots, request independent review, address findings and create draft PR.

## Review focus

- A 320px screen must expose usable brand/menu controls and language choices.
- Both gallery links must lead to their own cabinet, not the old combined gallery.
- Menu is reachable and dismissible by touch and keyboard on all public pages.
- Landscape panels remain scrollable above fixed booking buttons.
- Translations and current cabinet/hash survive language changes.
