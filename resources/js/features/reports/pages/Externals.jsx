import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Search, Users, CheckCircle2, XCircle, Zap, Settings, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import UserAvatar from '@/components/UserAvatar';

const PARTNERS = [
    { name: 'Aiden Wood', status: 'INACTIVE', cost: 'Â£0.00/lead', leads: 2, outreach: 0 },
    { name: 'Ashleigh Woodgate', status: 'INACTIVE', cost: 'Â£0.00/lead', leads: 18, outreach: 12 },
    { name: 'Beckett', status: 'INACTIVE', cost: 'Â£0.00/lead', leads: 4059, outreach: 132 },
    { name: 'Craig Robinson', status: 'INACTIVE', cost: 'Â£0.00/lead', leads: 1, outreach: 1 },
    { name: 'DDPenny', status: 'ACTIVE', cost: 'Â£0.00/lead', leads: 4241, outreach: 1204 },
    { name: 'Dean Sykes referral', status: 'INACTIVE', cost: 'Â£0.00/lead', leads: 8, outreach: 1 },
];

export default function Externals() {
    const [tab, setTab] = useState('All');
    const [search, setSearch] = useState('');

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const filtered = PARTNERS.filter((p) => {
        if (tab === 'Active' && p.status !== 'ACTIVE') return false;
        if (tab === 'Inactive' && p.status !== 'INACTIVE') return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <AppLayout>
            <Head title="External Lead Sources" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    External Lead Sources
                </h1>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Card padding="p-4"><div className="flex items-center gap-3"><div className="rounded-lg p-2.5 bg-sky-500/15 text-sky-500"><Users className="h-4 w-4" /></div><div><div className="font-inter-black text-xl">48</div><div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Lead Sources</div></div></div></Card>
                    <Card padding="p-4"><div className="flex items-center gap-3"><div className="rounded-lg p-2.5 bg-emerald-500/15 text-emerald-500"><CheckCircle2 className="h-4 w-4" /></div><div><div className="font-inter-black text-xl">7</div><div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Active</div></div></div></Card>
                    <Card padding="p-4"><div className="flex items-center gap-3"><div className="rounded-lg p-2.5 bg-rose-500/15 text-rose-500"><XCircle className="h-4 w-4" /></div><div><div className="font-inter-black text-xl">41</div><div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Inactive</div></div></div></Card>
                    <Card padding="p-4"><div className="flex items-center gap-3"><div className="rounded-lg p-2.5 bg-amber-500/15 text-amber-500"><Zap className="h-4 w-4" /></div><div><div className="font-inter-black text-xl">16,782</div><div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Total Leads</div></div></div></Card>
                </div>

                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search partner by name..." className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none" style={controlStyle} />
                            </div>
                            <div className="inline-flex rounded-lg border p-0.5" style={controlStyle}>
                                {['All', 'Active', 'Inactive'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setTab(t)}
                                        className="rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer"
                                        style={{ backgroundColor: tab === t ? 'var(--accent)' : 'transparent', color: tab === t ? '#fff' : 'var(--text-secondary)' }}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold self-start sm:self-auto cursor-pointer" style={controlStyle}>
                            <Settings className="h-3.5 w-3.5" /> Source Settings
                        </button>
                    </div>
                </Card>

                <div className="space-y-2.5">
                    {filtered.map((p) => (
                        <Card key={p.name} padding="p-3.5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <UserAvatar name={p.name} size="md" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                                            <Badge tone={p.status === 'ACTIVE' ? 'emerald' : 'neutral'}>{p.status}</Badge>
                                        </div>
                                        <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Cost: {p.cost}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge tone="sky">{p.leads.toLocaleString()} Leads</Badge>
                                    <Badge tone="neutral">{p.outreach.toLocaleString()} Outreach</Badge>
                                    <button type="button" className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                                        View Leads <ArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
