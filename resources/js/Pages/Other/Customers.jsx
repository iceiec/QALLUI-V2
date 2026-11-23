import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { Search, Eye, Edit3, Users } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';
import UserAvatar from '../../Components/UserAvatar';

const CUSTOMERS = [
    { id: 'ID 2', username: 'bellend', name: 'David Nicholson', email: 'bell@end.net', mobile: '07734214731', address: 'House number - 10, post code - CM15 9ES', dob: '28-01-1961', disclosure: 'COMPLETED', verified: 'VERIFIED' },
    { id: 'ID 9', username: 'rob123', name: 'Robert Johnson', email: 'v.webmanager@gmail.com', mobile: '07488855303', address: '823 7hf', dob: '05-08-1980', disclosure: 'COMPLETED', verified: 'VERIFIED' },
    { id: 'ID 10', username: 'testx.testx', name: 'Test X Test X', email: 'tobeconfirmed@gmail.com', mobile: '38748513762', address: 'House number - tobeconfirmed, post code - TBC', dob: '12-04-1970', disclosure: 'COMPLETED', verified: 'VERIFIED' },
    { id: 'ID 11', username: 'GavinBaker', name: 'Gavin Baker', email: 'whatever@hotmail.com', mobile: '07457413360', address: 'House number - 11, post code - L4 7XG', dob: '05-02-2025', disclosure: 'COMPLETED', verified: 'VERIFIED' },
];

export default function Customers() {
    const [disclosure, setDisclosure] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return CUSTOMERS.filter((c) => {
            if (disclosure !== 'All' && c.disclosure !== disclosure.toUpperCase()) return false;
            if (q && !c.name.toLowerCase().includes(q) && !c.username.toLowerCase().includes(q) && !c.email.toLowerCase().includes(q)) return false;
            return true;
        });
    }, [disclosure, search]);

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    return (
        <AppLayout>
            <Head title="Customers" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Customers
                </h1>

                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    {/* Header & Filter Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                        <div className="flex items-center gap-2.5">
                            <Users className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                            <span className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Customer Listing</span>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Showing {filtered.length} of {CUSTOMERS.length} customers</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                            <div className="flex items-center gap-1.5 text-xs">
                                <span style={{ color: 'var(--text-muted)' }}>Disclosure:</span>
                                <div className="inline-flex rounded-lg border p-0.5" style={controlStyle}>
                                    {['All', 'Completed', 'Pending'].map((d) => (
                                        <button
                                            key={d}
                                            type="button"
                                            onClick={() => setDisclosure(d)}
                                            className="rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer"
                                            style={{
                                                backgroundColor: disclosure === d ? 'var(--accent)' : 'transparent',
                                                color: disclosure === d ? '#fff' : 'var(--text-secondary)',
                                            }}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search name, username, email..."
                                    className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none"
                                    style={controlStyle}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-4 py-3 font-bold uppercase">Customer</th>
                                    <th className="px-4 py-3 font-bold uppercase">Email</th>
                                    <th className="px-4 py-3 font-bold uppercase">Mobile</th>
                                    <th className="px-4 py-3 font-bold uppercase">Address</th>
                                    <th className="px-4 py-3 font-bold uppercase">DOB</th>
                                    <th className="px-4 py-3 font-bold uppercase text-center">Disclosure</th>
                                    <th className="px-4 py-3 font-bold uppercase text-center">Verified</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((c) => (
                                    <tr key={c.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <UserAvatar name={c.name} size="md" />
                                                <div>
                                                    <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{c.name}</div>
                                                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{c.username} • {c.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{c.email}</td>
                                        <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-secondary)' }}>{c.mobile}</td>
                                        <td className="px-4 py-3 max-w-xs truncate" style={{ color: 'var(--text-muted)' }}>{c.address}</td>
                                        <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-muted)' }}>{c.dob}</td>
                                        <td className="px-4 py-3 text-center"><Badge tone="emerald">{c.disclosure}</Badge></td>
                                        <td className="px-4 py-3 text-center"><Badge tone="emerald">{c.verified}</Badge></td>
                                        <td className="px-4 py-3 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5">
                                                <button type="button" className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2 py-1 text-[11px] font-bold text-sky-500 hover:bg-sky-500/25 cursor-pointer">
                                                    <Eye className="h-3 w-3" /> View
                                                </button>
                                                <button type="button" className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-1 text-[11px] font-bold text-amber-500 hover:bg-amber-500/25 cursor-pointer">
                                                    <Edit3 className="h-3 w-3" /> Edit
                                                </button>
                                                <button type="button" className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 px-2 py-1 text-[11px] font-bold text-rose-500 hover:bg-rose-500/25 cursor-pointer">
                                                    Trustee
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Fallback */}
                    <div className="grid grid-cols-1 gap-2.5 p-3 md:hidden">
                        {filtered.map((c) => (
                            <div key={c.id} className="rounded-xl border p-3 space-y-1.5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                                        <UserAvatar name={c.name} />
                                        <span>{c.name}</span>
                                    </span>
                                    <Badge tone="emerald">{c.verified}</Badge>
                                </div>
                                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.email} • {c.mobile}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
