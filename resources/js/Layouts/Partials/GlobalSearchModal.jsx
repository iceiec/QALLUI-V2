import React, { useState, useMemo, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { LEADS_DATASET, MOST_LEADS_ADVISORS } from '../../data/mockData';
import Badge from '../../Components/Badge';

export default function GlobalSearchModal({ open, onClose }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 20);
        }
    }, [open]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) {
            return {
                leads: LEADS_DATASET.slice(0, 4),
                advisors: MOST_LEADS_ADVISORS.slice(0, 3),
            };
        }
        return {
            leads: LEADS_DATASET.filter(
                (l) =>
                    l.clientName.toLowerCase().includes(q) ||
                    l.policyNumber.toLowerCase().includes(q) ||
                    l.assignee.toLowerCase().includes(q) ||
                    l.source.toLowerCase().includes(q)
            ).slice(0, 5),
            advisors: MOST_LEADS_ADVISORS.filter((a) => a.name.toLowerCase().includes(q)),
        };
    }, [query]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 sm:pt-24 backdrop-blur-xs" onClick={onClose}>
            <div
                className="w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                    <Search className="h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search leads, policy numbers, or advisors..."
                        className="w-full bg-transparent text-sm outline-none"
                        style={{ color: 'var(--text-primary)' }}
                    />
                    <button type="button" onClick={onClose} className="rounded-md p-1 hover:opacity-80 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="max-h-96 overflow-y-auto p-3 space-y-4">
                    <div>
                        <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            Leads
                        </div>
                        {results.leads.length === 0 ? (
                            <p className="px-2 py-2 text-xs" style={{ color: 'var(--text-muted)' }}>No matching leads.</p>
                        ) : (
                            <div className="space-y-1">
                                {results.leads.map((lead) => (
                                    <button
                                        key={lead.id}
                                        type="button"
                                        onClick={() => {
                                            onClose();
                                            router.visit('/leads');
                                        }}
                                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors cursor-pointer"
                                        style={{ color: 'var(--text-primary)' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        <div>
                                            <div className="text-sm font-semibold">{lead.clientName}</div>
                                            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                {lead.source} • {lead.assignee}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge stage={lead.stage}>{lead.stage}</Badge>
                                            <ArrowRight className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            Advisors
                        </div>
                        <div className="space-y-1">
                            {results.advisors.map((adv) => (
                                <button
                                    key={adv.name}
                                    type="button"
                                    onClick={() => {
                                        onClose();
                                        router.visit('/');
                                    }}
                                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors cursor-pointer"
                                    style={{ color: 'var(--text-primary)' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    <span className="text-sm font-medium">{adv.name}</span>
                                    <span className="text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>
                                        {adv.leads.toLocaleString()} leads
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
