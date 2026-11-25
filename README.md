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
├── core/                       # Global configurations, datasets, and theme
│   ├── config/
│   │   └── bootstrap.js
│   ├── data/
│   │   └── mockData.js
│   └── theme/
│       └── antdTheme.js
├── components/                 # Shared, domain-agnostic UI primitives
│   ├── Badge.jsx
│   ├── Card.jsx
│   ├── ConfirmModal.jsx
│   ├── CustomSelect.jsx
│   ├── DonutChart.jsx
│   ├── MobileFilterDrawer.jsx
│   └── UserAvatar.jsx
├── layouts/                    # Application-level layouts
│   ├── AppLayout.jsx
│   └── components/
│       ├── GlobalSearchModal.jsx
│       ├── NotificationsModal.jsx
│       ├── SidebarNav.jsx
│       ├── ThemeStudioPopover.jsx
│       └── TopNav.jsx
├── features/                   # Feature/domain-grouped modules (PascalCase)
│   ├── Admin/
│   │   └── views/              # Compliance, Kanban, SecondaryApproval, Users, Voip
│   ├── Auth/
│   │   └── views/              # Login (with Admin / Junior / Finance quick switcher)
│   ├── Billing/
│   │   └── views/              # Billing, Ledger, PaymentFailures
│   ├── Customers/
│   │   └── views/              # Customers
│   ├── Dashboard/
│   │   └── views/              # Index
│   ├── Leads/
│   │   ├── components/         # AddPolicyModal, AppointmentsModal
│   │   └── views/              # LeadsIndex, LeadEdit, AddLead
│   ├── Operations/
│   │   └── views/              # Calendar, DailyReporting, Messages
│   ├── Other/
│   │   └── views/              # ModulePage
│   ├── Reports/
│   │   └── views/              # CommissionVariance, Externals, PoolLeads
│   └── Settings/
│       └── views/              # AdminSetting, BillTo, DbBackups, LeadSources, Users
├── app.js
└── app.jsx                     # Inertia entry point: 'Feature/View' -> ./features/<Feature>/views/<View>.jsx
```

Imports use the `@/` path alias (mapped to `resources/js/` in `vite.config.js` and `jsconfig.json`) for shared modules (`@/core/*`, `@/components/*`, `@/layouts/*`) and relative paths within the same feature.

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
