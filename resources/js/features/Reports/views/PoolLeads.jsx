import React, { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import { Head } from '@inertiajs/react';
import { Search, Eye, RotateCcw, ArrowUpDown } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import UserAvatar from '@/components/UserAvatar';

const DEAD_ROWS = [
    { id: 1, client: 'Allister McLean', stage: 'Dead At Fact Find', owner: 'Tom Tovey', created: '03-11-26 15:55', updated: '04-11-26 14:21', updatedBy: 'Tom Tovey', age: '14 days' },
    { id: 2, client: 'Mohammed Delawar Hussain', stage: 'Dead At Fact Find', owner: 'Lawrence Bracken', created: '30-10-26 18:05', updated: '03-11-26 12:07', updatedBy: 'Lawrence Bracken', age: '18 days' },
    { id: 3, client: 'Aazubuike Azuakoemu', stage: 'Dead At Fact Find', owner: 'Lawrence Bracken', created: '30-10-26 16:46', updated: '03-11-26 12:03', updatedBy: 'Lawrence Bracken', age: '18 days' },
    { id: 4, client: 'Ghulam Butt', stage: 'Dead At Fact Find', owner: 'Lawrence Bracken', created: '29-10-26 17:28', updated: '02-11-26 09:05', updatedBy: 'Lawrence Bracken', age: '19 days' },
];

const REJECTED_ROWS = [
    { id: 1, client: 'test June 20', stage: 'Dead At', owner: 'Unassigned', created: '20-07-26 16:59', updated: '20-07-26 17:00', updatedBy: 'Tricia Pelayo', age: '120 days' },
    { id: 2, client: 'Neville Collin Miles', stage: 'Rejected At FF Partial', owner: 'Tom Tovey', created: '08-04-26 18:53', updated: '13-04-26 11:22', updatedBy: 'Tom Tovey', age: '223 days' },
    { id: 3, client: 'Daksha Chauhan', stage: 'Rejected At FF Partial', owner: 'Tom Tovey', created: '06-10-25 01:44', updated: '07-10-25 11:05', updatedBy: 'Tom Tovey', age: '408 days' },
    { id: 4, client: 'Donna Patterson', stage: 'Rejected At FF Partial', owner: 'Tom Tovey', created: '06-10-25 01:43', updated: '07-10-25 10:24', updatedBy: 'Tom Tovey', age: '408 days' },
];

export default function PoolLeads({ mode = 'dead', title = 'Dead Leads' }) {
    const [search, setSearch] = useState('');
    const [owner, setOwner] = useState('All');
    const [ageFilter, setAgeFilter] = useState('All Ages');
    const [sortAsc, setSortAsc] = useState(false);

    const rows = mode === 'dead' ? DEAD_ROWS : REJECTED_ROWS;
    const owners = useMemo(() => ['All', ...new Set(rows.map((r) => r.owner))], [rows]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        const result = rows.filter((r) => {
            if (owner !== 'All' && r.owner !== owner) return false;
            const days = parseInt(r.age, 10) || 0;
            if (ageFilter === '14+ days' && days < 14) return false;
            if (ageFilter === '30+ days' && days < 30) return false;
            if (q && !r.client.toLowerCase().includes(q) && !r.owner.toLowerCase().includes(q)) return false;
            return true;
        });
        return sortAsc ? [...result].sort((a, b) => a.client.localeCompare(b.client)) : result;
    }, [rows, search, owner, ageFilter, sortAsc]);

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {title}
                </h1>

                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <div className="relative flex-1 min-w-[220px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search lead, partner or mobile..."
                                className="w-full rounded-lg border pl-8 pr-3 py-2 text-xs outline-none"
                                style={controlStyle}
                            />
                        </div>
                        <select value={owner} onChange={(e) => setOwner(e.target.value)} className="rounded-lg border px-3 py-2 text-xs outline-none cursor-pointer" style={controlStyle}>
                            {owners.map((o) => (
                                <option key={o} value={o}>{o === 'All' ? 'All Owners' : o}</option>
                            ))}
                        </select>
                        <CustomSelect value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} style={controlStyle} options={["All Ages","14+ days","30+ days"]} />
                        <button type="button" onClick={() => setSortAsc((v) => !v)} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer" style={controlStyle}>
                            <ArrowUpDown className="h-3.5 w-3.5" /> Sort {sortAsc ? '(A-Z)' : ''}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                setOwner('All');
                                setAgeFilter('All Ages');
                                setSortAsc(false);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer"
                            style={controlStyle}
                        >
                            <RotateCcw className="h-3.5 w-3.5" /> Reset
                        </button>
                    </div>
                </Card>

                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-4 py-3 font-bold uppercase">Client Name</th>
                                    <th className="px-4 py-3 font-bold uppercase">Stage</th>
                                    <th className="px-4 py-3 font-bold uppercase">Owner</th>
                                    <th className="px-4 py-3 font-bold uppercase">Created At</th>
                                    <th className="px-4 py-3 font-bold uppercase">Last Updated</th>
                                    <th className="px-4 py-3 font-bold uppercase">Updated By</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Lead Age</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((r) => (
                                    <tr key={r.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="px-4 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            <span className="inline-flex items-center gap-2"><UserAvatar name={r.client} /><span>{r.client}</span></span>
                                        </td>
                                        <td className="px-4 py-2.5"><Badge tone="neutral">{r.stage}</Badge></td>
                                        <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="inline-flex items-center gap-2"><UserAvatar name={r.owner} /><span>{r.owner}</span></span>
                                        </td>
                                        <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.created}</td>
                                        <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.updated}</td>
                                        <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{r.updatedBy}</td>
                                        <td className="px-4 py-2.5 text-right tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.age}</td>
                                        <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5">
                                                <button type="button" className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 hover:bg-amber-500/25 cursor-pointer" title="View"><Eye className="h-3.5 w-3.5" /></button>
                                                <button type="button" className="rounded-md border p-1.5 cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }} title="Restore"><RotateCcw className="h-3.5 w-3.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
