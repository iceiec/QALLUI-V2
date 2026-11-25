import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({
    value,
    defaultValue = '',
    onChange,
    options = [],
    placeholder = 'Select',
    className = '',
    style = {},
}) {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const ref = useRef(null);

    const current = value !== undefined ? value : internalValue;

    useEffect(() => {
        const handleOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    const handleSelect = (optValue) => {
        if (value === undefined) setInternalValue(optValue);
        onChange?.({ target: { value: optValue } });
        setOpen(false);
    };

    const normalized = options.map((o) =>
        typeof o === 'string' ? { label: o || placeholder, value: o } : o
    );
    const activeLabel = normalized.find((o) => o.value === current)?.label || current || placeholder;

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs outline-none cursor-pointer text-left"
                style={style}
            >
                <span className="truncate">{activeLabel}</span>
                <ChevronDown className={`h-3.5 w-3.5 shrink-0 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
            </button>
            {open && (
                <div
                    className="animate-popover absolute left-0 right-0 mt-1 z-40 max-h-56 overflow-y-auto rounded-xl border p-1 shadow-xl"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                >
                    {normalized.map((opt) => {
                        const active = current === opt.value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => handleSelect(opt.value)}
                                className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-xs font-medium cursor-pointer transition-colors"
                                style={{
                                    backgroundColor: active ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
                                    color: active ? 'var(--accent)' : 'var(--text-primary)',
                                }}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
