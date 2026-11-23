---
name: qall-tables-filters-actions
description: Standard QALLUIv2 patterns for data tables, filter bars, bulk actions, pagination, and row action buttons. Use when building or updating any table/list screen (Leads, Compliance, Reporting, Admin).
---

# QALLUIv2 Tables, Filters & Action Buttons

Reference implementation: `resources/js/Pages/Leads/LeadsIndex.jsx`

## 1. Filter Bar Pattern
- Wrap the filter bar in `<Card padding="p-3 sm:p-4" hoverable={false}>`.
- **Surface & Borders:** Always use `var(--bg-surface)` (crisp white in Light mode, never gray `var(--bg-surface-alt)`) with `var(--border-subtle)` hairline borders on inputs, selects, and buttons.
- **Row 1 (Primary Controls):**
  - Search input on the left (`max-w-md`) with `Search` icon.
  - Right cluster: optional toggle pills (e.g. `Exclude On-Cover` using `var(--accent-soft)` when active), `Sort` dropdown, `Reset` button, and `Table` / `Card` / `Board` view switcher.
- **Row 2 (Secondary Filters & Page Size):**
  - Separated by `border-t` (`var(--border-subtle)`).
  - Filter `<select>` dropdowns on the left; `Show [10 / 20 / 50] Entries` on the right.
- **Bulk Action Bar:**
  - Shown conditionally when `selectedIds.length > 0` using `animate-popover`, `var(--accent-soft)` background, and `var(--accent)` border.

## 2. Data Table Pattern
- Wrap in `<Card padding="p-0 overflow-hidden" hoverable={false}>`.
- **Desktop Table (`hidden md:block overflow-x-auto`):**
  - `<thead>` uses `backgroundColor: 'var(--bg-surface)'`, `borderColor: 'var(--border-subtle)'`, and `color: 'var(--text-muted)'`.
  - **Never use `divide-y` on `<tbody>`** (it defaults to dark `currentColor` borders). Instead, apply `className="qall-row-hover border-b last:border-b-0"` with `style={{ borderColor: 'var(--border-subtle)' }}` on each `<tr>`.
  - Use `tabular-nums` on dates, IDs, policy numbers, and numeric columns.
- **Mobile Fallback (`grid grid-cols-1 gap-2.5 p-3 md:hidden`):**
  - Render compact cards with Client Name, Stage `<Badge>`, Assignee, and key metric.
- **Pagination Footer:**
  - `Showing X to Y of Z entries` on the left; `Previous` / active page pill (`var(--accent)`) / `Next` on the right.

## 3. Row Action Buttons
Keep action buttons compact, right-aligned (`text-right whitespace-nowrap`), and styled with soft-tinted `bg-*-500/15` pills/icons (hover `/25`):
- **Positive / Rescue Action (e.g. `Rescue`):** `rounded-md bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-500 transition-colors hover:bg-emerald-500/25`.
- **Hold / Negative Text Action (e.g. `Stay`):** `rounded-md bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-500 transition-colors hover:bg-rose-500/25`.
- **Edit Icon Button:** `rounded-md bg-amber-500/15 p-1.5 text-amber-500 transition-colors hover:bg-amber-500/25` (`Edit3` icon `h-3.5 w-3.5`).
- **Delete Icon Button:** `rounded-md bg-rose-500/15 p-1.5 text-rose-500 transition-colors hover:bg-rose-500/25` (`Trash2` icon `h-3.5 w-3.5`).
- **View Icon Button:** `rounded-md border p-1.5` with `borderColor: 'var(--border-subtle)'` and `color: 'var(--text-secondary)'` (`Eye` icon `h-3.5 w-3.5`).

## 4. User Initials in Tables & Cards
- Always display a user/advisor's initials badge next to their name in tables and cards using `<UserAvatar name={userName} />` (`resources/js/Components/UserAvatar.jsx`), which extracts first + last initials (e.g. `Tom Tovey` → `TT`) with `var(--accent-soft)` background and `var(--accent-text)` text.
