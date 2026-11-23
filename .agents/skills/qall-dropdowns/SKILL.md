---
name: qall-dropdowns
description: Standard custom dropdown (`CustomSelect`) pattern for QALLUIv2 to prevent oversized native `<select>` OS popups and overlapping menus on mobile.
---

# QALLUIv2 Custom Dropdowns

Always use `CustomSelect` (`resources/js/Components/CustomSelect.jsx`) instead of native `<select>` elements across pages and modals.

## Rules
1. **No Native `<select>`**: Native `<select>` triggers oversized OS-level popups on mobile that overflow narrow viewports.
2. **Width & Alignment**: `CustomSelect` renders an `animate-popover` menu constrained to `left-0 right-0` (matching the trigger width) with `max-h-56 overflow-y-auto`.
3. **Consistent Styling**: Uses `var(--bg-surface)`, `var(--border-subtle)`, and `var(--accent)` for the active option.
