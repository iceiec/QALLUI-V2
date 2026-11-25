---
name: feature-based-architecture
description: Feature-based architecture conventions for QALLUIv2. Use when organizing new features, domain modules, Inertia pages, partials, hooks, and API/state boundaries by business domain.
---

# Feature-Based Architecture (QALLUIv2)

## 1. Domain-First Organization
Group code by business feature/domain under `resources/js/features/<Feature>/` (PascalCase) and global app config/data/theme under `resources/js/core/`:
- `resources/js/core/` — `config/` (`bootstrap.js`), `data/` (`mockData.js`), `theme/` (`antdTheme.js`)
- `resources/js/features/Admin/` — Compliance, Kanban, SecondaryApproval, Users, Voip
- `resources/js/features/Auth/` — Login
- `resources/js/features/Billing/` — Billing, Ledger, PaymentFailures
- `resources/js/features/Customers/` — Customers
- `resources/js/features/Dashboard/` — Index
- `resources/js/features/Leads/` — LeadsIndex, LeadEdit, AddLead, and lead-specific components (`AddPolicyModal`, `AppointmentsModal`)
- `resources/js/features/Operations/` — Calendar, DailyReporting, Messages
- `resources/js/features/Other/` — Generic fallback `ModulePage`
- `resources/js/features/Reports/` — CommissionVariance, Externals, PoolLeads
- `resources/js/features/Settings/` — AdminSetting, BillTo, DbBackups, LeadSources, Users

## 2. Feature Module Structure
Each feature domain lives in `resources/js/features/<Feature>/` with clear sub-folders:
- `views/` — Route-level Inertia entry views (resolved automatically by `resources/js/app.jsx` from `Inertia::render('Feature/View')`)
- `components/` — Feature-specific modals, drawers, cards, and table/filter sections used only by that domain
- `hooks/` — Domain-specific custom hooks (business logic, filter state, form state)
- `services/` or `utils/` — Domain-specific API helpers, constants, tone mappings, and formatters

Only promote a component to `resources/js/components/` when **two or more** unrelated domains reuse it. Global app shell and navigation live in `resources/js/layouts/`.

## 3. Boundaries & Dependencies
- **Path alias**: Use `@/` (mapped to `resources/js/`) for shared imports (`@/core/*`, `@/components/*`, `@/layouts/*`), and relative imports (`../components/*`) within the same feature.
- **Unidirectional flow**: `features/<Feature>` -> `components/`, `layouts/`, `core/`. Shared `components/` must never import from `features/<Feature>`.
- **Cross-feature isolation**: Avoid importing components from one feature into another; extract shared UI into `resources/js/components/` instead.
- **Data & Actions**: Keep Inertia `router` calls, form state, and filter state in the feature view or a co-located hook (`features/<Feature>/hooks/`), passing clean callbacks down to presentational components.
