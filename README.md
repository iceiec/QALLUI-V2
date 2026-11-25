# QALLUIv2

Dashboard built with **Laravel 12**, **Inertia.js (React)**, and **Tailwind CSS v4**.

## Tech Stack
- **Backend**: Laravel 12 (PHP)
- **Frontend**: React + Inertia.js + Vite
- **Styling**: Tailwind CSS v4 with CSS custom properties (`data-theme`)
- **Icons**: Lucide React

## Feature-Based Architecture

```text
resources/js/
├── app.jsx                     # Inertia resolver: 'Domain/Page' -> ./features/<domain>/pages/<Page>.jsx
├── features/                   # Feature/domain-grouped modules
│   ├── admin/
│   │   └── pages/              # Compliance, Kanban, SecondaryApproval, Users, Voip
│   ├── auth/
│   │   └── pages/              # Login (with Admin / Junior / Finance quick switcher)
│   ├── billing/
│   │   └── pages/              # Billing, Ledger, PaymentFailures
│   ├── customers/
│   │   └── pages/              # Customers
│   ├── dashboard/
│   │   └── pages/              # Index
│   ├── leads/
│   │   ├── components/         # AddPolicyModal, AppointmentsModal
│   │   └── pages/              # LeadsIndex, LeadEdit, AddLead
│   ├── operations/
│   │   └── pages/              # Calendar, DailyReporting, Messages
│   ├── other/
│   │   └── pages/              # ModulePage
│   ├── reports/
│   │   └── pages/              # CommissionVariance, Externals, PoolLeads
│   └── settings/
│       └── pages/              # AdminSetting, BillTo, DbBackups, LeadSources, Users
├── components/                 # Shared, domain-agnostic UI primitives
│   ├── Badge.jsx
│   ├── Card.jsx
│   ├── ConfirmModal.jsx
│   ├── CustomSelect.jsx
│   ├── DonutChart.jsx
│   ├── MobileFilterDrawer.jsx
│   └── UserAvatar.jsx
├── layouts/                    # App shell & layout-only components
│   ├── AppLayout.jsx
│   └── components/
│       ├── GlobalSearchModal.jsx
│       ├── NotificationsModal.jsx
│       ├── SidebarNav.jsx
│       ├── ThemeStudioPopover.jsx
│       └── TopNav.jsx
├── data/                       # Mock datasets
└── theme/                      # Theme configuration
```

Imports use the `@/` path alias (mapped to `resources/js/` in `vite.config.js` and `jsconfig.json`) for shared modules and relative paths within the same feature.

## Getting Started

```powershell
# Install dependencies
composer install
npm install

# Run development servers
php artisan serve
npm run dev

# Build for production
npm run build
```

## Account Views & Routes
- **Sign In**: `/login` (`Ise Admin`, `Ise Junior`, `Ise Finance` account switcher)
- **Admin (`Ise Admin`)**: `/` and full navigation
- **Junior (`Ise Junior`)**: `/junior` (Dashboard, My Leads, Add Lead, Static Leads, Payment Failures, Leads Pool, Rejected Pool, Calendar, Kanban Board)
- **Finance (`Ise Finance`)**: `/finance` (Dashboard, Billing -> Payment Failure / Billing / Ledger, Report -> Externals)

## Documentation & Skills
- Daily changelog: `docs/UpdateLog.md`
- Project conventions & skills: `.agents/skills/`
