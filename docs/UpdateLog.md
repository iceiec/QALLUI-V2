# QALLUIv2 — Update Log

## 2026-11-24
- Added `/junior` and `/finance` routes in `routes/web.php` sharing the same admin Dashboard UI/UX.

## 2026-11-23
- Added `component-architecture` and `feature-based-architecture` skills under `.agents/skills/`.

## 2026-11-21
- Organized daily work logs into `docs/UpdateLog.md` with dated entries.

## 2026-11-20

### Earlier Session Work
- **Mobile Table Cards & 3-Dots Action Menus**:
  - Added/updated mobile accordion card views and 3-dots (`MoreVertical`) action menus (for 3+ actions) across Secondary Approval, VoIP, and Static Leads, matching web action colors and restoring missing logos.
- **Modals & Forms**:
  - Updated modal footers, New User modal, and `AddPolicyModal` layout.
  - Updated `LeadEdit` inline dropdowns and converted native selects to `CustomSelect` across 15 JSX files.
- **Skills**:
  - Added `qall-mobile-tables` and `qall-dropdowns` skills.

## Mobile UI & Responsive Tables
- **Mobile Accordion Cards & 3-Dots Action Menus**:
  - Updated `PaymentFailures.jsx` with distinct mobile row keys (`na-${r.policy}` for **Needs Your Action**, `pend-${r.policy}` for **Pending - Waiting for Adviser Action**) so expanding or opening the 3-dots (`MoreVertical`) menu on one row does not toggle the matching policy in the other section.
  - Added mobile accordion card views (`md:hidden`) and hid desktop tables below `md` (`hidden md:block`) in `Billing.jsx` and `Ledger.jsx`.
- **Settings Navigation**:
  - Updated `AdminSetting.jsx` to render **Settings Sections** as a `CustomSelect` dropdown on mobile (`lg:hidden`) while preserving the vertical sidebar on desktop (`hidden lg:block`), using `e.target.value` for `CustomSelect` `onChange`.
- **Topbar User Profile**:
  - Made the user profile avatar and dropdown visible on mobile in `TopNav.jsx` while hiding the name/role text below `sm` (`hidden sm:block`) for clean spacing.
- **Mobile Pinch-to-Zoom**:
  - Verified `app.blade.php` and `welcome.blade.php` use `<meta name="viewport" content="width=device-width, initial-scale=1">` with no zoom restrictions in `resources/css/*.css`.

## Verification
- Verified production bundle builds cleanly with `npm run build` (exit code `0`).
