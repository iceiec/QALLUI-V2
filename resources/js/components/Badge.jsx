import React from 'react';

const STAGE_STYLES = {
    'On Cover': 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    Dealt: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'FF Partial': 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    'Policy Partial': 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    'FF New': 'bg-sky-500/15 text-sky-500 border-sky-500/30',
    'Policy History': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    Dead: 'bg-rose-500/15 text-rose-500 border-rose-500/30',
    Declined: 'bg-rose-500/15 text-rose-500 border-rose-500/30',
};

const TONE_STYLES = {
    emerald: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25',
    sky: 'bg-sky-500/15 text-sky-500 border-sky-500/25',
    amber: 'bg-amber-500/15 text-amber-500 border-amber-500/25',
    rose: 'bg-rose-500/15 text-rose-500 border-rose-500/25',
    neutral: 'bg-slate-500/15 text-slate-400 border-slate-500/25',
};

export default function Badge({ children, stage = null, tone = 'neutral', className = '' }) {
    const resolved = stage ? STAGE_STYLES[stage] || TONE_STYLES.neutral : TONE_STYLES[tone] || TONE_STYLES.neutral;
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-semibold leading-none tracking-wide whitespace-nowrap ${resolved} ${className}`}
        >
            {children}
        </span>
    );
}
