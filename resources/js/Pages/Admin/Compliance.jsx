import React, { useState, useMemo } from 'react';
import CustomSelect from '../../Components/CustomSelect';
import { Head, Link } from '@inertiajs/react';
import { Search, RotateCcw, Eye, Calendar } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';
import UserAvatar from '../../Components/UserAvatar';
import MobileFilterDrawer from '../../Components/MobileFilterDrawer';

const COMPLIANCE_ROWS = [
    { id: 1, clientName: 'Lawrencia Glover', advisor: 'Lawrence Bracken', policyNumber: '901718857', complianceDate: '05-11-2026', approvedDate: '11-11-2026', commission: '£218.40', status: 'On Cover', statusLabel: 'APPROVED', reviewDue: 'Review Complete' },
    { id: 2, clientName: 'Dragos Petre', advisor: 'Lawrence Bracken', policyNumber: '901685107', complianceDate: '03-11-2026', approvedDate: '03-11-2026', commission: '£674.05', status: 'On Cover', statusLabel: 'APPROVED', reviewDue: 'Review Complete' },
    { id: 3, clientName: 'Dragos Petre', advisor: 'Lawrence Bracken', policyNumber: '901685106', complianceDate: '03-11-2026', approvedDate: '03-11-2026', commission: '£425.33', status: 'On Cover', statusLabel: 'APPROVED', reviewDue: 'Review Complete' },
    { id: 4, clientName: 'Kevin Walters', advisor: 'Raeez Jassat', policyNumber: '55786774', complianceDate: '30-10-2026', approvedDate: '30-10-2026', commission: '£218.90', status: 'On Cover', statusLabel: 'APPROVED', reviewDue: 'Review Complete' },
    { id: 5, clientName: 'Michelle Truter Banks', advisor: 'Raeez Jassat', policyNumber: '55786460', complianceDate: '29-10-2026', approvedDate: '30-10-2026', commission: '£338.38', status: 'On Cover', statusLabel: 'APPROVED', reviewDue: 'Review Complete' },
    { id: 6, clientName: 'Anosh Rasool', advisor: 'Raeez Jassat', policyNumber: '901648293', complianceDate: '29-10-2026', approvedDate: '30-10-2026', commission: '£3,475.60', status: 'On Cover', statusLabel: 'APPROVED', reviewDue: 'Review Complete' },
    { id: 7, clientName: 'Amanda Bishop', advisor: 'Lawrence Bracken', policyNumber: '901699340', complianceDate: '29-10-2026', approvedDate: '29-10-2026', commission: '£828.56', status: 'On Cover', statusLabel: 'APPROVED', reviewDue: 'Review Complete' },
    { id: 8, clientName: 'Andrea Bravacz', advisor: 'Leanne Devine', policyNumber: '901695493', complianceDate: '28-10-2026', approvedDate: '28-10-2026', commission: '£799.35', status: 'On Cover', statusLabel: 'APPROVED', reviewDue: 'Review Complete' },
];

export default function Compliance({ title = 'Compliance' }) {
    const [statusFilter, setStatusFilter] = useState('All');
    const [advisorFilter, setAdvisorFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('All dates');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [search, setSearch] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const advisors = useMemo(() => ['All', ...new Set(COMPLIANCE_ROWS.map((r) => r.advisor))], []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return COMPLIANCE_ROWS.filter((r) => {
            if (statusFilter !== 'All' && r.statusLabel !== statusFilter) return false;
            if (advisorFilter !== 'All' && r.advisor !== advisorFilter) return false;
            if (dateFilter === 'Last 7 days' || dateFilter === 'Last 30 days') {
                const [dd, mm, yyyy] = r.complianceDate.split('-');
                const rowTime = new Date(`${yyyy}-${mm}-${dd}T00:00:00`).getTime();
                const days = dateFilter === 'Last 7 days' ? 7 : 30;
                const cutoff = Date.now() - days * 86400000;
                if (rowTime < cutoff) return false;
            }
            if (dateFilter === 'Custom' && (dateFrom || dateTo)) {
                const [dd, mm, yyyy] = r.complianceDate.split('-');
                const iso = `${yyyy}-${mm}-${dd}`;
                if (dateFrom && iso < dateFrom) return false;
                if (dateTo && iso > dateTo) return false;
            }
            if (q && !r.clientName.toLowerCase().includes(q) && !r.policyNumber.includes(q)) return false;
            return true;
        });
    }, [statusFilter, advisorFilter, dateFilter, dateFrom, dateTo, search]);

    const reset = () => {
        setStatusFilter('All');
        setAdvisorFilter('All');
        setDateFilter('All dates');
        setDateFrom('');
        setDateTo('');
        setSearch('');
    };

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-4">
                <div>
                    <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {title}
                    </h1>
                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        Audited policy submissions and compliance review status
                    </p>
                </div>

                {/* Filter Bar */}
                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                        <CustomSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={controlStyle} options={[{"label":"Status: All","value":"All"},{"label":"Status: APPROVED","value":"APPROVED"},{"label":"Status: PENDING","value":"PENDING"}]} />

                        <select value={advisorFilter} onChange={(e) => setAdvisorFilter(e.target.value)} className="hidden sm:block rounded-lg border px-3 py-2 text-xs outline-none cursor-pointer" style={controlStyle}>
                            {advisors.map((a) => (
                                <option key={a} value={a}>Advisor: {a}</option>
                            ))}
                        </select>

                        <div className="relative hidden sm:block">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                            <CustomSelect value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={controlStyle} options={[{"label":"All dates","value":"All dates"},{"label":"Last 7 days","value":"Last 7 days"},{"label":"Last 30 days","value":"Last 30 days"},{"label":"Custom date","value":"Custom"}]} />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full rounded-lg border pl-8 pr-3 py-2 text-xs outline-none"
                                    style={controlStyle}
                                />
                            </div>
                            <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer" style={controlStyle}>
                                <RotateCcw className="h-3.5 w-3.5" />
                                <span>Reset</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="sm:hidden inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer"
                                style={controlStyle}
                            >
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>
                    {dateFilter === 'Custom' && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t pt-2.5 text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                            <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Custom Range:</span>
                            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg border px-2.5 py-1.5 text-xs outline-none" style={controlStyle} />
                            <span style={{ color: 'var(--text-muted)' }}>to</span>
                            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-lg border px-2.5 py-1.5 text-xs outline-none" style={controlStyle} />
                        </div>
                    )}
                </Card>

                {/* Table */}
                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-4 py-3 font-bold uppercase">Client Name</th>
                                    <th className="px-4 py-3 font-bold uppercase">Advisor</th>
                                    <th className="px-4 py-3 font-bold uppercase">Policy Number</th>
                                    <th className="px-4 py-3 font-bold uppercase">Compliance Date</th>
                                    <th className="px-4 py-3 font-bold uppercase">Approved Date</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Total Commission</th>
                                    <th className="px-4 py-3 font-bold uppercase text-center">Status</th>
                                    <th className="px-4 py-3 font-bold uppercase">Review Due</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((row) => (
                                    <tr key={row.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            <span className="inline-flex items-center gap-2">
                                                <UserAvatar name={row.clientName} />
                                                <span>{row.clientName}</span>
                                            </span>
                                        </td>
                                        <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="inline-flex items-center gap-2">
                                                <UserAvatar name={row.advisor} />
                                                <span>{row.advisor}</span>
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-muted)' }}>{row.policyNumber}</td>
                                        <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-muted)' }}>{row.complianceDate}</td>
                                        <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-muted)' }}>{row.approvedDate}</td>
                                        <td className="px-4 py-3 text-right font-inter-black tabular-nums" style={{ color: 'var(--text-primary)' }}>{row.commission}</td>
                                        <td className="px-4 py-3 text-center"><Badge tone="emerald">{row.statusLabel}</Badge></td>
                                        <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{row.reviewDue}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Link href="/leads/edit?tab=Compliance" className="inline-flex rounded-md border p-1.5 cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }} title="View">
                                                <Eye className="h-3.5 w-3.5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                        {filtered.map((row) => (
                            <div key={row.id} className="rounded-2xl border p-4 space-y-3 shadow-sm" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <div className="font-inter-black text-sm truncate" style={{ color: 'var(--text-primary)' }}>{row.clientName}</div>
                                        <div className="mt-1 inline-flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                            <span className="rounded-md px-1.5 py-0.5 font-semibold tabular-nums" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)' }}>{row.policyNumber}</span>
                                        </div>
                                    </div>
                                    <Badge tone="emerald">{row.statusLabel}</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: 'var(--bg-card)' }}>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Advisor</div>
                                        <div className="text-xs font-semibold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>{row.advisor}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Commission</div>
                                        <div className="text-xs font-inter-black tabular-nums mt-0.5" style={{ color: 'var(--accent-text)' }}>{row.commission}</div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <Link href="/leads/edit?tab=Compliance" className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-semibold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }} title="View">
                                        <Eye className="h-3.5 w-3.5" /> View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {dateFilter === 'Custom' && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t pt-2.5 text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                            <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Custom Range:</span>
                            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg border px-2.5 py-1.5 text-xs outline-none" style={controlStyle} />
                            <span style={{ color: 'var(--text-muted)' }}>to</span>
                            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-lg border px-2.5 py-1.5 text-xs outline-none" style={controlStyle} />
                        </div>
                    )}
                </Card>
            </div>
            <MobileFilterDrawer
                open={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                resultCount={filtered.length}
                onReset={reset}
                categories={[
                    { id: 'status', label: 'Status', value: statusFilter, options: ['All', 'APPROVED', 'PENDING'], onChange: setStatusFilter },
                    { id: 'advisor', label: 'Advisor', value: advisorFilter, options: advisors, onChange: setAdvisorFilter },
                    {
                        id: 'date',
                        label: 'Date',
                        value: dateFilter,
                        options: ['All dates', 'Last 7 days', 'Last 30 days', 'Custom'],
                        onChange: setDateFilter,
                        customContent: dateFilter === 'Custom' ? (
                            <div className="flex items-center gap-2 text-xs">
                                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full rounded-lg border px-2.5 py-1.5 text-xs outline-none" style={controlStyle} />
                                <span style={{ color: 'var(--text-muted)' }}>to</span>
                                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full rounded-lg border px-2.5 py-1.5 text-xs outline-none" style={controlStyle} />
                            </div>
                        ) : null,
                    },
                ]}
            />
        </AppLayout>
    );
}
