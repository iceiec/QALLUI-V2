import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function MobileFilterDrawer({
    open,
    onClose,
    resultCount,
    onReset,
    categories = [],
}) {
    if (!open || categories.length === 0) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center sm:hidden backdrop-blur-[3px]"
            onClick={onClose}
        >
            <div
                className="animate-page-enter w-full max-h-[85vh] flex flex-col rounded-t-2xl border-t shadow-2xl"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative flex items-center justify-center border-b px-4 py-3.5" style={{ borderColor: 'var(--border-subtle)' }}>
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute left-4 rounded-md p-1 cursor-pointer"
                        style={{ color: 'var(--text-primary)' }}
                        aria-label="Close filters"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Filter</span>
                </div>

                {/* Scrollable Pill-Chip Sections */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                    {categories.map((cat) => {
                        const isDropdown = cat.type === 'select' || /user|assignee|advisor/i.test(cat.id || cat.label || '');
                        return (
                        <div key={cat.id}>
                            <div className="mb-2.5 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                                {cat.label}
                            </div>
                            {isDropdown ? (
                                <CustomSelect
                                    value={cat.value}
                                    onChange={(e) => cat.onChange(e.target.value)}
                                    options={cat.options}
                                    style={{
                                        backgroundColor: 'var(--bg-surface-alt)',
                                        borderColor: 'var(--border-subtle)',
                                        color: 'var(--text-primary)',
                                    }}
                                />
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {cat.options.map((opt) => {
                                        const active = cat.value === opt;
                                        return (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => cat.onChange(opt)}
                                                className="rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                                                style={{
                                                    backgroundColor: active ? 'var(--accent-soft)' : 'var(--bg-surface-alt)',
                                                    borderColor: active ? 'var(--accent)' : 'transparent',
                                                    color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {cat.customContent && <div className="mt-2.5">{cat.customContent}</div>}
                        </div>
                        );
                    })}
                </div>

                {/* Sticky Footer */}
                <div className="flex items-center justify-between border-t px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                    <button
                        type="button"
                        onClick={onReset}
                        className="text-xs font-semibold underline underline-offset-2 cursor-pointer"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
                        style={{ backgroundColor: 'var(--accent)' }}
                    >
                        See {resultCount} results
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
