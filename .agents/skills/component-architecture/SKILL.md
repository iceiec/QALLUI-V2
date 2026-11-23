---
name: component-architecture
description: Component architecture conventions for QALLUIv2 (Inertia.js React + Tailwind CSS v4). Use when designing, splitting, or refactoring UI components, shared primitives, modals, and page-level sections.
---

# Component Architecture (QALLUIv2)

## 1. Layering & Ownership
- **Shared Primitives (`resources/js/Components/`)**: Generic, domain-agnostic UI building blocks (`Card`, `Badge`, `CustomSelect`, `UserAvatar`, `ConfirmModal`, `DonutChart`, `MobileFilterDrawer`).
  - Must not import page-specific data or Inertia page props directly.
  - Accept data and callbacks via props; support theme CSS variables (`var(--bg-surface)`, `var(--border-subtle)`, `var(--text-primary)`, `var(--accent)`).
- **Layout & Navigation (`resources/js/Layouts/`)**: App shell (`AppLayout.jsx`) and navigation partials (`TopNav.jsx`, `SidebarNav.jsx`, `GlobalSearchModal.jsx`).
- **Pages (`resources/js/Pages/<Domain>/`)**: Route-level Inertia components that compose layout, shared primitives, and domain-specific sections.

## 2. Component Sizing & Decomposition
- Keep components focused on a single responsibility.
- Extract a sub-component when:
  - A section or card repeats across views or has independent local state (e.g. expandable mobile card, modal form, filter bar).
  - A JSX file grows past ~250–300 lines and contains distinct UI regions.
- Keep local UI state (`expandedMobileKey`, `openMenuId`, modal open flags) as close to the component that uses it as possible.

## 3. Composition & Props
- Prefer explicit, minimal props over passing entire objects when only 2–3 fields are needed.
- Use `children` for wrapper components (`Card`, `AppLayout`).
- Reuse `CustomSelect` for all dropdowns (passing `e.target.value` in `onChange`), and `createPortal(..., document.body)` for modals/overlays.

## 4. Styling & Responsiveness
- Use Tailwind utility classes with CSS custom properties for theme-aware colors.
- Pair desktop tables (`hidden md:block`) with mobile accordion cards (`md:hidden`) using distinct section-prefixed keys when multiple lists share the same page.
