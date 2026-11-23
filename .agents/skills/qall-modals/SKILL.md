---
name: qall-modals
description: Standard QALLUIv2 modal and confirmation dialog patterns. Use when adding delete confirmations, detail popovers, or form modals.
---

# QALLUIv2 Modal & Confirmation Patterns

Reference component: `resources/js/Components/ConfirmModal.jsx`

## 1. Backdrop & Container
- **Backdrop:** `fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]` (blur-only without darkening the background; clicking backdrop closes the modal).
- **Dialog Box:** `animate-popover my-auto w-full max-w-md rounded-2xl border p-4 sm:p-5 shadow-2xl` using `backgroundColor: 'var(--bg-surface)'` and `borderColor: 'var(--border-strong)'` (stop propagation on click).

## 2. Destructive Confirmations (e.g. Delete Lead)
- Include an `AlertTriangle` icon inside `rounded-xl p-2.5 bg-rose-500/15 text-rose-500`.
- Display a clear `font-inter-black text-base` title and `text-xs` description naming the target record.
- Footer actions: `flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2` with `w-full sm:w-auto` buttons (`Cancel` with `var(--border-subtle)` + `Delete` with `bg-rose-500 hover:bg-rose-600 text-white`).
