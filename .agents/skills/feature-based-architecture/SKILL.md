---
name: feature-based-architecture
description: Feature-based architecture conventions for QALLUIv2. Use when organizing new features, domain modules, Inertia pages, partials, hooks, and API/state boundaries by business domain.
---

# Feature-Based Architecture (QALLUIv2)

## 1. Domain-First Organization
Group code by business feature/domain rather than scattering related files across generic folders:
- `resources/js/Pages/Billing/` — Billing, Ledger, Payment Failures
- `resources/js/Pages/Leads/` — Lead lists, LeadEdit, Static Leads, VoIP
- `resources/js/Pages/Settings/` — Admin Settings
- `resources/js/Pages/Approvals/` — Secondary Approval, etc.

## 2. Feature Module Structure
When a feature grows beyond a single page file, co-locate its pieces inside its domain folder:
- `<Domain>/<FeaturePage>.jsx` — Main Inertia entry page
- `<Domain>/Partials/` — Feature-specific modals, drawers, cards, and table/filter sections that are only used by that domain
- `<Domain>/constants.js` or `<Domain>/utils.js` — Domain-specific statuses, tone mappings, and formatters

Only promote a component to `resources/js/Components/` when **two or more** unrelated domains reuse it.

## 3. Boundaries & Dependencies
- **Unidirectional flow**: `Pages/<Domain>` -> `Components/` & `Layouts/`. Shared `Components/` must never import from `Pages/<Domain>`.
- **Cross-feature isolation**: Avoid importing partials from one domain into another; extract shared UI into `resources/js/Components/` instead.
- **Data & Actions**: Keep Inertia `router` calls, form state, and filter state in the feature page or a co-located hook, passing clean callbacks down to presentational partials.
