import React, { useState } from 'react';
import CustomSelect from '@/components/CustomSelect';
import { createPortal } from 'react-dom';
import { Head, Link } from '@inertiajs/react';
import { Search, RotateCcw, Download, Plus, Mail, Eye, Trash2, ChevronDown, X, MoreVertical } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import UserAvatar from '@/components/UserAvatar';
import ConfirmModal from '@/components/ConfirmModal';

const NEEDS_ACTION_ROWS = [
    { policy: '95114207', client: 'Kathleen Sheridan', assignee: 'Tom Tovey', amount: 'Â£-83.12', date: '05/11/2026', type: 'Direct Debit 1' },
    { policy: 'BPL08D5WH', client: 'Luke Hemmings', assignee: 'Leanne Devine', amount: 'Â£0.00', date: '05/11/2026', type: 'DD Rejection' },
    { policy: '95848115', client: 'Daniel Bannon', assignee: 'Tom Tovey', amount: 'Â£-47.60', date: '30/10/2026', type: 'Direct Debit 1' },
    { policy: '900308181', client: 'Amy Drury', assignee: 'Tom Tovey', amount: 'Â£-565.10', date: '19/10/2026', type: 'Policy Cancellation' },
    { policy: '95140683', client: 'Alexander Nenov', assignee: 'Tom Tovey', amount: 'Â£-39.59', date: '19/10/2026', type: 'Direct Debit 1' },
];

const PENDING_ADVISER_ROWS = [
    { policy: '97496611', client: 'Daniel Addy', assignee: 'Leanne Devine', amount: 'Â£-1.00', date: '19/10/2040', type: 'Direct Debit 1' },
    { policy: '95114207', client: 'Kathleen Sheridan', assignee: 'Tom Tovey', amount: 'Â£-1,500.00', date: '12/11/2026', type: 'DD Rejection' },
    { policy: '99025221', client: 'Hayle Johnson', assignee: 'Leanne Devine', amount: 'Â£-20.27', date: '05/11/2026', type: 'Direct Debit 1' },
];

const HISTORY_ROWS = [
    { id: 4112, policy: '95114207', amount: 'Â£-300.00', failedDate: '12/11/2026', type: 'Policy Cancellation', createdDate: '12/11/2026', clearedBy: 'Tricia Pelayo', clearedDate: '2026-11-12 13:38', result: 'RESOLVED' },
    { id: 4098, policy: '95884703', amount: 'Â£-25.05', failedDate: '04/11/2026', type: 'Direct Debit 1', createdDate: '05/11/2026', clearedBy: 'Tricia Pelayo', clearedDate: '2026-11-05 11:47', result: 'RESOLVED' },
    { id: 4040, policy: '96976655', amount: 'Â£-333.28', failedDate: '05/10/2026', type: 'Policy Cancellation', createdDate: '12/10/2026', clearedBy: 'Tricia Pelayo', clearedDate: '2026-10-19 16:11', result: 'PERMANENT FAULT' },
];

export default function PaymentFailures() {
    const [tab, setTab] = useState('active');
    const [search, setSearch] = useState('');
    const [monthFilter, setMonthFilter] = useState('All months');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [assigneeFilter, setAssigneeFilter] = useState('All Assignees');
    const [showNeedsAction, setShowNeedsAction] = useState(true);
    const [showPending, setShowPending] = useState(true);
    const [expandedMobileKey, setExpandedMobileKey] = useState(null);
    const [openActionKey, setOpenActionKey] = useState(null);
    const [manualFailureOpen, setManualFailureOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [declineModalOpen, setDeclineModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const matchesFilters = (r) => {
        const q = search.trim().toLowerCase();
        if (q && !r.policy?.toLowerCase().includes(q) && !r.client?.toLowerCase().includes(q)) return false;
        const dateStr = r.failedDate || r.createdDate || '';
        if (monthFilter === 'Nov 2026' && !dateStr.includes('/11/2026')) return false;
        if (monthFilter === 'Oct 2026' && !dateStr.includes('/10/2026')) return false;
        if (typeFilter !== 'All Types' && r.type !== typeFilter) return false;
        if (assigneeFilter !== 'All Assignees' && r.assignee && r.assignee !== assigneeFilter) return false;
        return true;
    };

    const filteredNeedsAction = NEEDS_ACTION_ROWS.filter(matchesFilters);
    const filteredPending = PENDING_ADVISER_ROWS.filter(matchesFilters);
    const filteredHistory = HISTORY_ROWS.filter(matchesFilters);

    return (
        <AppLayout>
            <Head title="Payment Failures" />
            <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Payment Failures
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-500 hover:bg-emerald-500/25 cursor-pointer">
                            <Download className="h-3.5 w-3.5" /> Export {tab === 'active' ? 'Active Failures' : 'Failure History'}
                        </button>
                        <button type="button" onClick={() => setManualFailureOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                            <Plus className="h-3.5 w-3.5" /> Add Manual Failure
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="inline-flex rounded-xl border p-1 gap-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <button
                        type="button"
                        onClick={() => setTab('active')}
                        className="inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                        style={{ backgroundColor: tab === 'active' ? 'var(--accent)' : 'transparent', color: tab === 'active' ? '#fff' : 'var(--text-secondary)' }}
                    >
                        <span>Active Failures</span>
                        <span className="rounded-md bg-black/15 px-1.5 py-0.5 text-[10px]">145</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('history')}
                        className="inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                        style={{ backgroundColor: tab === 'history' ? 'var(--accent)' : 'transparent', color: tab === 'history' ? '#fff' : 'var(--text-secondary)' }}
                    >
                        <span>History</span>
                        <span className="rounded-md bg-black/10 px-1.5 py-0.5 text-[10px]">156</span>
                    </button>
                </div>

                {/* Filter Bar */}
                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Policy number or client name..."
                                className="w-full rounded-lg border pl-8 pr-3 py-2 text-xs outline-none"
                                style={controlStyle}
                            />
                        </div>
                        <CustomSelect value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} style={controlStyle} options={["All months","Nov 2026","Oct 2026"]} />
                        <CustomSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={controlStyle} options={["All Types","Direct Debit 1","DD Rejection","Policy Cancellation"]} />
                        <CustomSelect value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)} style={controlStyle} options={["All Assignees","Tom Tovey","Leanne Devine"]} />
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                setMonthFilter('All months');
                                setTypeFilter('All Types');
                                setAssigneeFilter('All Assignees');
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer"
                            style={controlStyle}
                        >
                            <RotateCcw className="h-3.5 w-3.5" /> Clear
                        </button>
                    </div>
                </Card>

                {tab === 'active' ? (
                    <div className="space-y-4">
                        {/* Needs Your Action */}
                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <button
                                type="button"
                                onClick={() => setShowNeedsAction((v) => !v)}
                                className="flex w-full items-center justify-between border-b px-4 py-3 text-left cursor-pointer"
                                style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', borderColor: 'var(--border-subtle)' }}
                            >
                                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                                    <span>Needs Your Action</span>
                                    <Badge tone="amber">12</Badge>
                                    <span className="font-normal" style={{ color: 'var(--text-muted)' }}>confirm or decline</span>
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform ${showNeedsAction ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                            </button>

                            {showNeedsAction && (
                                <>
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                <th className="px-4 py-3 font-bold uppercase">Policy Number</th>
                                                <th className="px-4 py-3 font-bold uppercase">Client Name</th>
                                                <th className="px-4 py-3 font-bold uppercase">Assignee</th>
                                                <th className="px-4 py-3 font-bold uppercase text-right">Amount</th>
                                                <th className="px-4 py-3 font-bold uppercase">Payment Failed Date</th>
                                                <th className="px-4 py-3 font-bold uppercase">Failure Type</th>
                                                <th className="px-4 py-3 font-bold uppercase text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredNeedsAction.map((r) => (
                                                <tr key={r.policy} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <td className="px-4 py-2.5 tabular-nums font-semibold" style={{ color: 'var(--text-primary)' }}>{r.policy}</td>
                                                    <td className="px-4 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                        <span className="inline-flex items-center gap-2"><UserAvatar name={r.client} /><span>{r.client}</span></span>
                                                    </td>
                                                    <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                                        <span className="inline-flex items-center gap-2"><UserAvatar name={r.assignee} /><span>{r.assignee}</span></span>
                                                    </td>
                                                    <td className="px-4 py-2.5 text-right tabular-nums font-bold text-rose-500">{r.amount}</td>
                                                    <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                                                    <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{r.type}</td>
                                                    <td className="px-4 py-2.5 text-center whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-1.5">
                                                            <button type="button" onClick={() => setEmailModalOpen(true)} className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-1 text-[11px] font-bold text-amber-500 hover:bg-amber-500/25 cursor-pointer"><Mail className="h-3 w-3" /> Email</button>
                                                            <button type="button" onClick={() => setConfirmModalOpen(true)} className="rounded-md bg-emerald-500/15 px-2 py-1 text-[11px] font-bold text-emerald-500 hover:bg-emerald-500/25 cursor-pointer">Confirm</button>
                                                            <button type="button" onClick={() => setDeclineModalOpen(true)} className="rounded-md bg-rose-500/15 px-2 py-1 text-[11px] font-bold text-rose-500 hover:bg-rose-500/25 cursor-pointer">Decline</button>
                                                            <Link href="/leads/edit?tab=Client%20Notes" className="inline-flex rounded-md border p-1.5 cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }} title="View"><Eye className="h-3 w-3" /></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="divide-y divide-slate-200/80 md:hidden">
                                    {filteredNeedsAction.map((r) => {
                                        const key = `na-${r.policy}`;
                                        const isOpen = expandedMobileKey === key;
                                        return (
                                            <div key={r.policy} className="p-3 text-xs">
                                                <button
                                                    type="button"
                                                    onClick={() => setExpandedMobileKey(isOpen ? null : key)}
                                                    className="flex w-full items-center justify-between gap-2 text-left cursor-pointer"
                                                >
                                                    <div className="min-w-0">
                                                        <div className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{r.client}</div>
                                                        <div className="text-[11px] tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.policy} â€¢ {r.date}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <span className="font-bold tabular-nums text-rose-500">{r.amount}</span>
                                                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                                    </div>
                                                </button>
                                                {isOpen && (
                                                    <div className="mt-2.5 pt-2.5 border-t space-y-2.5" style={{ borderColor: 'var(--border-subtle)' }}>
                                                        <div className="grid grid-cols-2 gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: 'var(--bg-card)' }}>
                                                            <div>
                                                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Assignee</div>
                                                                <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>{r.assignee}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Type</div>
                                                                <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>{r.type}</div>
                                                            </div>
                                                        </div>
                                                        <div className="relative flex justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionKey(openActionKey === key ? null : key)}
                                                                className="rounded-lg border p-1.5 cursor-pointer"
                                                                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                                                aria-label="Actions"
                                                            >
                                                                <MoreVertical className="h-4 w-4" />
                                                            </button>
                                                            {openActionKey === key && (
                                                                <div
                                                                    className="animate-popover absolute right-0 bottom-full mb-1.5 w-36 z-30 rounded-xl border p-1 shadow-xl text-xs"
                                                                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                                                >
                                                                    <button type="button" onClick={() => { setOpenActionKey(null); setEmailModalOpen(true); }} className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-2 text-left font-bold text-amber-500 hover:bg-black/5 cursor-pointer">
                                                                        <Mail className="h-3.5 w-3.5" /> Email
                                                                    </button>
                                                                    <button type="button" onClick={() => { setOpenActionKey(null); setConfirmModalOpen(true); }} className="flex w-full items-center rounded-lg px-2.5 py-2 text-left font-bold text-emerald-500 hover:bg-black/5 cursor-pointer">
                                                                        Confirm
                                                                    </button>
                                                                    <button type="button" onClick={() => { setOpenActionKey(null); setDeclineModalOpen(true); }} className="flex w-full items-center rounded-lg px-2.5 py-2 text-left font-bold text-rose-500 hover:bg-black/5 cursor-pointer">
                                                                        Decline
                                                                    </button>
                                                                    <Link href="/leads/edit?tab=Client%20Notes" onClick={() => setOpenActionKey(null)} className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-2 text-left font-semibold hover:bg-black/5" style={{ color: 'var(--text-primary)' }}>
                                                                        <Eye className="h-3.5 w-3.5" /> View
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                </>
                            )}
                        </Card>

                        {/* Pending - Waiting for Adviser Action */}
                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <button
                                type="button"
                                onClick={() => setShowPending((v) => !v)}
                                className="flex w-full items-center justify-between border-b px-4 py-3 text-left cursor-pointer"
                                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                            >
                                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                                    <span>Pending - Waiting for Adviser Action</span>
                                    <Badge tone="neutral">133</Badge>
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform ${showPending ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                            </button>

                            {showPending && (
                                <>
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                <th className="px-4 py-3 font-bold uppercase">Policy Number</th>
                                                <th className="px-4 py-3 font-bold uppercase">Client Name</th>
                                                <th className="px-4 py-3 font-bold uppercase">Assignee</th>
                                                <th className="px-4 py-3 font-bold uppercase text-right">Amount</th>
                                                <th className="px-4 py-3 font-bold uppercase">Payment Failed Date</th>
                                                <th className="px-4 py-3 font-bold uppercase">Failure Type</th>
                                                <th className="px-4 py-3 font-bold uppercase text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPending.map((r, i) => (
                                                <tr key={i} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <td className="px-4 py-2.5 tabular-nums font-semibold" style={{ color: 'var(--text-primary)' }}>{r.policy}</td>
                                                    <td className="px-4 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                        <span className="inline-flex items-center gap-2"><UserAvatar name={r.client} /><span>{r.client}</span></span>
                                                    </td>
                                                    <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                                        <span className="inline-flex items-center gap-2"><UserAvatar name={r.assignee} /><span>{r.assignee}</span></span>
                                                    </td>
                                                    <td className="px-4 py-2.5 text-right tabular-nums font-bold" style={{ color: 'var(--text-primary)' }}>{r.amount}</td>
                                                    <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                                                    <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{r.type}</td>
                                                    <td className="px-4 py-2.5 text-center whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-1.5">
                                                            <button type="button" onClick={() => setEmailModalOpen(true)} className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-1 text-[11px] font-bold text-amber-500 hover:bg-amber-500/25 cursor-pointer"><Mail className="h-3 w-3" /> Email</button>
                                                            <Link href="/leads/edit?tab=Client%20Notes" className="inline-flex rounded-md border p-1.5 cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }} title="View"><Eye className="h-3 w-3" /></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="divide-y divide-slate-200/80 md:hidden">
                                    {filteredPending.map((r) => {
                                        const key = `pend-${r.policy}`;
                                        const isOpen = expandedMobileKey === key;
                                        return (
                                            <div key={r.policy} className="p-3 text-xs">
                                                <button
                                                    type="button"
                                                    onClick={() => setExpandedMobileKey(isOpen ? null : key)}
                                                    className="flex w-full items-center justify-between gap-2 text-left cursor-pointer"
                                                >
                                                    <div className="min-w-0">
                                                        <div className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{r.client}</div>
                                                        <div className="text-[11px] tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.policy} â€¢ {r.date}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <span className="font-bold tabular-nums text-rose-500">{r.amount}</span>
                                                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                                    </div>
                                                </button>
                                                {isOpen && (
                                                    <div className="mt-2.5 pt-2.5 border-t space-y-2.5" style={{ borderColor: 'var(--border-subtle)' }}>
                                                        <div className="grid grid-cols-2 gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: 'var(--bg-card)' }}>
                                                            <div>
                                                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Assignee</div>
                                                                <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>{r.assignee}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Type</div>
                                                                <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>{r.type}</div>
                                                            </div>
                                                        </div>
                                                        <div className="relative flex justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionKey(openActionKey === key ? null : key)}
                                                                className="rounded-lg border p-1.5 cursor-pointer"
                                                                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                                                aria-label="Actions"
                                                            >
                                                                <MoreVertical className="h-4 w-4" />
                                                            </button>
                                                            {openActionKey === key && (
                                                                <div
                                                                    className="animate-popover absolute right-0 bottom-full mb-1.5 w-36 z-30 rounded-xl border p-1 shadow-xl text-xs"
                                                                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                                                >
                                                                    <button type="button" onClick={() => { setOpenActionKey(null); setEmailModalOpen(true); }} className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-2 text-left font-bold text-amber-500 hover:bg-black/5 cursor-pointer">
                                                                        <Mail className="h-3.5 w-3.5" /> Email
                                                                    </button>
                                                                    <button type="button" onClick={() => { setOpenActionKey(null); setConfirmModalOpen(true); }} className="flex w-full items-center rounded-lg px-2.5 py-2 text-left font-bold text-emerald-500 hover:bg-black/5 cursor-pointer">
                                                                        Confirm
                                                                    </button>
                                                                    <button type="button" onClick={() => { setOpenActionKey(null); setDeclineModalOpen(true); }} className="flex w-full items-center rounded-lg px-2.5 py-2 text-left font-bold text-rose-500 hover:bg-black/5 cursor-pointer">
                                                                        Decline
                                                                    </button>
                                                                    <Link href="/leads/edit?tab=Client%20Notes" onClick={() => setOpenActionKey(null)} className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-2 text-left font-semibold hover:bg-black/5" style={{ color: 'var(--text-primary)' }}>
                                                                        <Eye className="h-3.5 w-3.5" /> View
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                </>
                            )}
                        </Card>
                    </div>
                ) : (
                    <Card padding="p-0 overflow-hidden" hoverable={false}>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                        <th className="px-4 py-3 font-bold uppercase">Id</th>
                                        <th className="px-4 py-3 font-bold uppercase">Policy Number</th>
                                        <th className="px-4 py-3 font-bold uppercase text-right">Amount</th>
                                        <th className="px-4 py-3 font-bold uppercase">Payment Failed Date</th>
                                        <th className="px-4 py-3 font-bold uppercase">Failure Type</th>
                                        <th className="px-4 py-3 font-bold uppercase">Cleared By</th>
                                        <th className="px-4 py-3 font-bold uppercase">Cleared Date</th>
                                        <th className="px-4 py-3 font-bold uppercase text-center">Result</th>
                                        <th className="px-4 py-3 font-bold uppercase text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHistory.map((r) => (
                                        <tr key={r.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="px-4 py-2.5 tabular-nums font-bold" style={{ color: 'var(--text-primary)' }}>{r.id}</td>
                                            <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-secondary)' }}>{r.policy}</td>
                                            <td className="px-4 py-2.5 text-right tabular-nums font-bold text-rose-500">{r.amount}</td>
                                            <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.failedDate}</td>
                                            <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{r.type}</td>
                                            <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="inline-flex items-center gap-2"><UserAvatar name={r.clearedBy} /><span>{r.clearedBy}</span></span>
                                            </td>
                                            <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.clearedDate}</td>
                                            <td className="px-4 py-2.5 text-center"><Badge tone={r.result === 'RESOLVED' ? 'emerald' : 'rose'}>{r.result}</Badge></td>
                                            <td className="px-4 py-2.5 text-center">
                                                <button type="button" onClick={() => setDeleteModalOpen(true)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 hover:bg-rose-500/25 cursor-pointer" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="divide-y divide-slate-200/80 md:hidden">
                            {filteredHistory.map((r) => {
                                const key = `hist-${r.id}`;
                                const isOpen = expandedMobileKey === key;
                                return (
                                    <div key={r.id} className="p-3 text-xs">
                                        <button
                                            type="button"
                                            onClick={() => setExpandedMobileKey(isOpen ? null : key)}
                                            className="flex w-full items-center justify-between gap-2 text-left cursor-pointer"
                                        >
                                            <div className="min-w-0">
                                                <div className="font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>#{r.id} â€¢ {r.policy}</div>
                                                <div className="text-[11px] tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.failedDate} â€¢ {r.type}</div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <Badge tone={r.result === 'RESOLVED' ? 'emerald' : 'rose'}>{r.result}</Badge>
                                                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                            </div>
                                        </button>
                                        {isOpen && (
                                            <div className="mt-2.5 pt-2.5 border-t space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <div className="grid grid-cols-2 gap-2 text-[11px]">
                                                    <div><span style={{ color: 'var(--text-muted)' }}>Amount: </span><span className="font-bold text-rose-500 tabular-nums">{r.amount}</span></div>
                                                    <div><span style={{ color: 'var(--text-muted)' }}>Cleared By: </span><span style={{ color: 'var(--text-secondary)' }}>{r.clearedBy}</span></div>
                                                    <div><span style={{ color: 'var(--text-muted)' }}>Cleared Date: </span><span className="tabular-nums" style={{ color: 'var(--text-secondary)' }}>{r.clearedDate}</span></div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button type="button" onClick={() => setDeleteModalOpen(true)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 cursor-pointer" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                )}
            </div>
            {manualFailureOpen &&
                createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]" onClick={() => setManualFailureOpen(false)}>
                        <div className="animate-popover my-auto w-full max-w-md rounded-2xl border p-5 shadow-2xl text-xs space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>Add Manual Failure</h3>
                                <button type="button" onClick={() => setManualFailureOpen(false)} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}><X className="h-4 w-4" /></button>
                            </div>
                            <div><label className="block font-semibold mb-1">Policy Number</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} /></div>
                            <div><label className="block font-semibold mb-1">Amount</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} /></div>
                            <div><label className="block font-semibold mb-1">Payment Failure Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} /></div>
                            <div>
                                <label className="block font-semibold mb-1">Failure Type</label>
                                <CustomSelect style={controlStyle} options={["","Direct Debit 1","DD Rejection","DD Cancelled"]} />
                            </div>
                            <div className="flex items-center justify-end gap-2 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <button type="button" onClick={() => setManualFailureOpen(false)} className="rounded-lg border px-4 py-2 font-semibold cursor-pointer" style={controlStyle}>Cancel</button>
                                <button type="button" onClick={() => setManualFailureOpen(false)} className="rounded-lg bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-600 cursor-pointer">Submit</button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            {declineModalOpen &&
                createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]" onClick={() => setDeclineModalOpen(false)}>
                        <div className="animate-popover my-auto w-full max-w-md rounded-2xl border p-5 shadow-2xl text-xs space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>Decline Reason</h3>
                                <button type="button" onClick={() => setDeclineModalOpen(false)} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}><X className="h-4 w-4" /></button>
                            </div>
                            <textarea rows={3} placeholder="Add a comment explaining why this action is declined" className="w-full rounded-lg border px-3 py-2 outline-none resize-none" style={controlStyle} />
                            <div className="flex justify-end border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <button type="button" onClick={() => setDeclineModalOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 cursor-pointer">Submit</button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            <ConfirmModal
                open={emailModalOpen}
                onClose={() => setEmailModalOpen(false)}
                onConfirm={() => setEmailModalOpen(false)}
                title="Are you sure?"
                description="Are you sure you want to send a payment failure email to this client?"
                confirmLabel="Yes, send email"
            />
            <ConfirmModal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={() => setConfirmModalOpen(false)}
                title="Are you sure?"
                description="Are you sure you want to confirm this payment failure record?"
                confirmLabel="Yes, confirm it!"
                tone="emerald"
            />
            <ConfirmModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => setDeleteModalOpen(false)}
                title="Are you sure?"
                description="This payment failure record will be permanently deleted."
                confirmLabel="Yes, delete it!"
            />
        </AppLayout>
    );
}
