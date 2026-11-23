---
name: qall-ui-conventions
description: Design tokens, typography, responsive layout patterns, and Laravel + Inertia React conventions for QALLUIv2. Use when adding or modifying pages, components, or themes in QALLUIv2.
---

# QALLUIv2 UI & Architecture Conventions

## 1. Tech Stack & Commands
- **PHP Binary:** Always use `C:\xampp\php\php.exe` (PHP 8.2+) for `artisan` and `composer` commands (default `php` in PATH may be 7.4).
- **Frontend:** Inertia.js React (`@inertiajs/react`) + Tailwind CSS v4 (`@tailwindcss/vite`).
- **Build:** Run `npm run build` after frontend edits to update `public/build/` for `artisan serve`.

## 2. Theme Tokens & Typography
- **Default Font:** `Roboto` via `@fontsource/roboto`. Use `.font-inter-black` (weight `900`, tight tracking) for KPI numbers, page titles, and the `QALL` wordmark.
- **CSS Variables:** Never hardcode light-only or dark-only background/text colors on cards or layouts. Always use the CSS custom properties defined in `resources/css/app.css`:
  - `var(--bg-canvas)`, `var(--bg-surface)`, `var(--bg-surface-alt)`, `var(--bg-hover)`, `var(--bg-nav)`
  - `var(--border-subtle)`, `var(--border-strong)`
  - `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`
  - `var(--accent)` (`#00B073`), `var(--accent-soft)`, `var(--accent-text)`

## 3. Responsive Patterns (Mobile & Web)
- Wrap all Inertia pages in `AppLayout` (`resources/js/Layouts/AppLayout.jsx`) so Topbar/Sidebar switching, `Ctrl+K` global search, and mobile drawer navigation work consistently.
- Data-dense tables must provide a mobile card fallback (`hidden md:block` for table, `grid md:hidden` for cards) so mobile viewports remain readable without horizontal overflow.

## 4. Animations & UX Polish
- **Page Transitions:** `AppLayout` wraps page content in `animate-page-enter` keyed by `url` (`220ms cubic-bezier(0.16, 1, 0.3, 1)`).
- **Popovers & Modals:** Use `animate-popover` on dropdowns and modals.
- **Navigation Switching:** `TopNav` and `SidebarNav` animate smoothly (`duration-300 ease-out`) when toggling between `Topbar` and `Sidebar` modes.
- **Micro-Interactions:** `Card` uses `hover:-translate-y-0.5 hover:shadow-lg`, table rows use `qall-row-hover`, buttons have `active:scale-[0.98]`, and form controls use `var(--accent)` focus rings.
