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
├── Components/              # Shared, domain-agnostic UI primitives & modals
│   ├── AddPolicyModal.jsx
│   ├── AppointmentsModal.jsx
│   ├── Badge.jsx
│   ├── Card.jsx
│   ├── ConfirmModal.jsx
│   ├── CustomSelect.jsx
│   ├── DonutChart.jsx
│   ├── MobileFilterDrawer.jsx
│   ├── NotificationsModal.jsx
│   └── UserAvatar.jsx
├── Layouts/                 # App shell & navigation partials
│   ├── AppLayout.jsx
│   └── Partials/
│       ├── GlobalSearchModal.jsx
│       ├── SidebarNav.jsx
│       └── TopNav.jsx
├── Pages/                   # Feature/domain-grouped Inertia pages
│   ├── Admin/               # Compliance, Kanban, SecondaryApproval, Users, Voip
│   ├── Auth/                # Login (with Admin / Junior / Finance quick switcher)
│   ├── Billing/             # Billing, Ledger, PaymentFailures
│   ├── Dashboard/           # Index
│   ├── Leads/               # LeadsIndex, LeadEdit, AddLead
│   ├── Operations/          # Calendar, DailyReporting, Messages
│   ├── Other/               # Customers, ModulePage
│   ├── Reports/             # CommissionVariance, Externals, PoolLeads
│   └── Settings/            # AdminSetting, BillTo, DbBackups, LeadSources, Users
├── data/                    # Mock datasets
└── theme/                   # Theme configuration
```

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
