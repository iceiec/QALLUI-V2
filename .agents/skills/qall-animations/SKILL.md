---
name: qall-animations
description: Standard QALLUIv2 animation and smooth transition conventions across pages, tabs, modals, popovers, and interactive elements.
---

# QALLUIv2 Animation & Transition Standards

Reference stylesheet: `resources/css/app.css`

## 1. Page & Tab Navigation
- Wrap Inertia page content in `AppLayout.jsx` with `key={url}` and `animate-page-enter` (`320ms cubic-bezier(0.22, 1, 0.36, 1)`).
- Wrap tab panels and section switches (e.g., `LeadEdit.jsx` tabs, Fact Find sections, Compliance sections) with `key={activeTab}` / `key={section}` and `animate-page-enter`.

## 2. Modals, Popovers & Drawers
- Use `animate-popover` (`240ms cubic-bezier(0.22, 1, 0.36, 1)`) for centered modals and dropdown popovers.
- Use `animate-page-enter` for mobile bottom-sheet drawers.

## 3. Interactive Elements
- All `button`, `a`, `input`, `select`, and `textarea` elements inherit `150ms` ease/cubic-bezier transitions for `color`, `background-color`, `border-color`, `box-shadow`, `transform`, and `opacity`.
- Table rows and list items use `.qall-row-hover` (`150ms ease` background transition).
- Always respect `@media (prefers-reduced-motion: reduce)`.
