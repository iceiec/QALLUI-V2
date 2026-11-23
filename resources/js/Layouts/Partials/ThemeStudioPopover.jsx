import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sparkles, PanelTop, PanelLeft, Palette } from 'lucide-react';

const THEMES = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'qall', label: 'QALL', icon: Sparkles },
];

const NAV_MODES = [
    { id: 'topbar', label: 'Topbar', icon: PanelTop },
    { id: 'sidebar', label: 'Sidebar', icon: PanelLeft },
];

const TOKEN_CONTROLS = [
    { key: '--bg-canvas', label: 'Background', fallback: '#f7f7f7' },
    { key: '--bg-surface', label: 'Card Surface', fallback: '#ffffff' },
    { key: '--accent', label: 'Accent', fallback: '#00b073' },
    { key: '--text-primary', label: 'Primary Text', fallback: '#333333' },
    { key: '--text-secondary', label: 'Secondary Text', fallback: '#4d4d4d' },
    { key: '--border-subtle', label: 'Border', fallback: '#eeeeee' },
];

export default function ThemeStudioPopover({ theme, setTheme, navMode, setNavMode }) {
    const [open, setOpen] = useState(false);
    const [customTokens, setCustomTokens] = useState(() => {
        if (typeof window === 'undefined') return {};
        try {
            return JSON.parse(localStorage.getItem('qall_custom_tokens') || '{}');
        } catch {
            return {};
        }
    });
    const ref = useRef(null);

    useEffect(() => {
        TOKEN_CONTROLS.forEach(({ key }) => {
            const val = customTokens[key];
            if (val) {
                document.documentElement.style.setProperty(key, val);
                if (key === '--accent') document.documentElement.style.setProperty('--accent-text', val);
            } else {
                document.documentElement.style.removeProperty(key);
                if (key === '--accent') document.documentElement.style.removeProperty('--accent-text');
            }
        });
        if (Object.keys(customTokens).length > 0) {
            localStorage.setItem('qall_custom_tokens', JSON.stringify(customTokens));
        } else {
            localStorage.removeItem('qall_custom_tokens');
        }
    }, [customTokens]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer"
                style={{
                    backgroundColor: 'var(--bg-surface-alt)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                }}
                title="Theme & Navigation"
            >
                {theme === 'light' ? (
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                ) : theme === 'dark' ? (
                    <Moon className="h-3.5 w-3.5 text-sky-400" />
                ) : (
                    <span
                        className="inline-flex h-4 w-4 items-center justify-center rounded font-inter-black text-[10px] text-white"
                        style={{ backgroundColor: 'var(--accent)' }}
                    >
                        Q
                    </span>
                )}
                <span className="hidden sm:inline">{theme}</span>
            </button>

            {open && (
                <div
                    className="animate-popover absolute right-0 mt-2 w-64 rounded-xl border p-3.5 shadow-xl z-50"
                    style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-strong)',
                    }}
                >
                    <div className="mb-3">
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                            Theme
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                            {THEMES.map((t) => {
                                const Icon = t.icon;
                                const active = theme === t.id;
                                return (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setTheme(t.id)}
                                        className="flex flex-col items-center gap-1 rounded-lg border py-2 px-1 text-xs font-semibold transition-all cursor-pointer"
                                        style={{
                                            backgroundColor: active ? 'var(--accent-soft)' : 'var(--bg-surface-alt)',
                                            borderColor: active ? 'var(--accent)' : 'var(--border-subtle)',
                                            color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        {t.id === 'qall' ? (
                                            <span
                                                className="inline-flex h-4 w-4 items-center justify-center rounded font-inter-black text-[10px] text-white"
                                                style={{ backgroundColor: 'var(--accent)' }}
                                            >
                                                Q
                                            </span>
                                        ) : (
                                            <Icon className="h-3.5 w-3.5" />
                                        )}
                                        <span>{t.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                            Navigation
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                            {NAV_MODES.map((m) => {
                                const Icon = m.icon;
                                const active = navMode === m.id;
                                return (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setNavMode(m.id)}
                                        className="flex items-center justify-center gap-1.5 rounded-lg border py-1.5 px-2 text-xs font-semibold transition-all cursor-pointer"
                                        style={{
                                            backgroundColor: active ? 'var(--accent-soft)' : 'var(--bg-surface-alt)',
                                            borderColor: active ? 'var(--accent)' : 'var(--border-subtle)',
                                            color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                        <span>{m.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                Theme Studio
                            </span>
                            {Object.keys(customTokens).length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setCustomTokens({})}
                                    className="text-[10px] font-semibold cursor-pointer"
                                    style={{ color: 'var(--accent-text)' }}
                                >
                                    Reset All
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {TOKEN_CONTROLS.map(({ key, label, fallback }) => (
                                <label
                                    key={key}
                                    className="flex items-center justify-between rounded-lg border px-2 py-1 text-[11px] cursor-pointer"
                                    style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                >
                                    <span className="truncate">{label}</span>
                                    <input
                                        type="color"
                                        value={customTokens[key] || fallback}
                                        onChange={(e) => setCustomTokens((prev) => ({ ...prev, [key]: e.target.value }))}
                                        className="h-4 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
