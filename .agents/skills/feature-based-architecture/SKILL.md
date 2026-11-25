---
name: feature-based-architecture
description: Feature-based architecture conventions for QALLUIv2. Use when organizing new features, domain modules, Inertia pages, partials, hooks, and API/state boundaries by business domain.
---

# Feature-Based Architecture (QALLUIv2)

## 1. Domain-First Organization
Group code by business feature/domain under `resources/js/features/<domain>/`:
- `resources/js/features/admin/` — Compliance, Kanban, SecondaryApproval, Users, Voip
- `resources/js/features/auth/` — Login
- `resources/js/features/billing/` — Billing, Ledger, PaymentFailures
- `resources/js/features/customers/` — Customers
- `resources/js/features/dashboard/` — Index
- `resources/js/features/leads/` — LeadsIndex, LeadEdit, AddLead, and lead-specific components (`AddPolicyModal`, `AppointmentsModal`)
- `resources/js/features/operations/` — Calendar, DailyReporting, Messages
- `resources/js/features/other/` — Generic fallback `ModulePage`
- `resources/js/features/reports/` — CommissionVariance, Externals, PoolLeads
- `resources/js/features/settings/` — AdminSetting, BillTo, DbBackups, LeadSources, Users

## 2. Feature Module Structure
Each feature domain lives in `resources/js/features/<domain>/` with clear sub-folders:
- `pages/` — Route-level Inertia entry pages (resolved automatically by `resources/js/app.jsx` from `Inertia::render('Domain/Page')`)
- `components/` — Feature-specific modals, drawers, cards, and table/filter sections used only by that domain
- `hooks/` — Domain-specific custom hooks (business logic, filter state, form state)
- `services/` or `utils/` — Domain-specific API helpers, constants, tone mappings, and formatters

Only promote a component to `resources/js/components/` when **two or more** unrelated domains reuse it. Global app shell and navigation live in `resources/js/layouts/`.

## 3. Boundaries & Dependencies
- **Path alias**: Use `@/` (mapped to `resources/js/`) for shared imports (`@/components/*`, `@/layouts/*`, `@/data/*`), and relative imports (`../components/*`) within the same feature.
- **Unidirectional flow**: `features/<domain>` -> `components/` & `layouts/`. Shared `components/` must never import from `features/<domain>`.
- **Cross-feature isolation**: Avoid importing components from one feature into another; extract shared UI into `resources/js/components/` instead.
- **Data & Actions**: Keep Inertia `router` calls, form state, and filter state in the feature page or a co-located hook (`features/<domain>/hooks/`), passing clean callbacks down to presentational components.
