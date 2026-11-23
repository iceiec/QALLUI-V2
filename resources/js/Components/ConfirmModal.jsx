import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    description = 'Are you sure you want to proceed?',
    confirmLabel = 'Delete',
    tone = 'rose',
}) {
    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]"
            onClick={onClose}
        >
            <div
                className="animate-popover my-auto w-full max-w-md rounded-2xl border p-4 sm:p-5 shadow-2xl"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className={`rounded-xl p-2.5 ${
                            tone === 'rose'
                                ? 'bg-rose-500/15 text-rose-500'
                                : tone === 'emerald'
                                  ? 'bg-emerald-500/15 text-emerald-500'
                                  : 'bg-amber-500/15 text-amber-500'
                        }`}>
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>
                                {title}
                            </h3>
                            <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                                {description}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1 cursor-pointer"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto rounded-lg border px-3.5 py-2 sm:py-1.5 text-xs font-semibold cursor-pointer"
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`w-full sm:w-auto rounded-lg px-4 py-2 sm:py-1.5 text-xs font-bold text-white cursor-pointer ${
                            tone === 'rose'
                                ? 'bg-rose-500 hover:bg-rose-600'
                                : tone === 'emerald'
                                  ? 'bg-emerald-500 hover:bg-emerald-600'
                                  : ''
                        }`}
                        style={tone !== 'rose' && tone !== 'emerald' ? { backgroundColor: 'var(--accent)' } : undefined}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
