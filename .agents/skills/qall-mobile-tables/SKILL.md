---
name: qall-mobile-tables
description: Standard mobile-responsive table pattern for QALLUIv2 using desktop table (`hidden md:block`) + full-parity mobile card fallback (`md:hidden`) with matching actions.
---

# QALLUIv2 Mobile-Responsive Tables

Whenever a page renders a data table (`<table ...>`), wrap the desktop table in `hidden md:block overflow-x-auto` and pair it with a mobile card fallback (`grid grid-cols-1 gap-2.5 p-3 md:hidden`).

## Rules
1. **Full Field Parity**: Every column shown in the desktop table must be visible in the mobile card (typically in a `grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]` metadata grid).
2. **Matching Actions**: The mobile card footer must include the **exact same action buttons** (and handlers/links) as the desktop table's `Action` column (e.g., `Edit`, `Delete`, `View`, `Rescue`, `Stay`). If there are **3 or more actions**, collapse them into a **3-dots (`MoreVertical`)** `animate-popover` menu.
3. **Surface & Borders**: Use `backgroundColor: 'var(--bg-surface)'` and `borderColor: 'var(--border-subtle)'` on mobile cards.
