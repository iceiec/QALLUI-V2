import React, { useState, useMemo } from 'react';
import CustomSelect from '../../Components/CustomSelect';
import { createPortal } from 'react-dom';
import { Head, Link } from '@inertiajs/react';
import { Search, Eye, ExternalLink, Filter, X, Check, ClipboardCheck } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import UserAvatar from '../../Components/UserAvatar';

const APPROVAL_ROWS = [
    { id: 1, clientName: 'Lawrencia Glover', policyNumber: '901718857', provider: 'Vitality LIFE', advisor: 'Lawrence Bracken', commission: '£218.40', approvedDate: '11-11-2026' },
    { id: 2, clientName: 'Dragos Petre', policyNumber: '901685106', provider: 'Vitality LIFE', advisor: 'Lawrence Bracken', commission: '£425.33', approvedDate: '03-11-2026' },
    { id: 3, clientName: 'Dragos Petre', policyNumber: '901685107', provider: 'Vitality LIFE', advisor: 'Lawrence Bracken', commission: '£674.05', approvedDate: '03-11-2026' },
    { id: 4, clientName: 'Kevin Walters', policyNumber: '55786774', provider: 'Vitality Health', advisor: 'Raeez Jassat', commission: '£218.90', approvedDate: '30-10-2026' },
    { id: 5, clientName: 'Anosh Rasool', policyNumber: '901648293', provider: 'Vitality LIFE', advisor: 'Raeez Jassat', commission: '£3,475.60', approvedDate: '30-10-2026' },
    { id: 6, clientName: 'Michelle Truter Banks', policyNumber: '55786460', provider: 'Vitality Health', advisor: 'Raeez Jassat', commission: '£338.38', approvedDate: '30-10-2026' },
    { id: 7, clientName: 'Amanda Bishop', policyNumber: '901699340', provider: 'Vitality LIFE', advisor: 'Lawrence Bracken', commission: '£828.56', approvedDate: '29-10-2026' },
    { id: 8, clientName: 'Mario Trichkov', policyNumber: '901695493', provider: 'Vitality LIFE', advisor: 'Leanne Devine', commission: '£799.35', approvedDate: '28-10-2026' },
];

export default function SecondaryApproval({ title = 'Secondary Approval' }) {
    const [pendingRows, setPendingRows] = useState(APPROVAL_ROWS);
    const [historyRows, setHistoryRows] = useState([]);
    const [tab, setTab] = useState('pending');
    const [search, setSearch] = useState('');
    const [month, setMonth] = useState('All months');
    const [reviewTarget, setReviewTarget] = useState(null);
    const [decision, setDecision] = useState('approve');
    const [comments, setComments] = useState('');

    const filtered = useMemo(() => {
        const source = tab === 'history' ? historyRows : pendingRows;
        const q = search.trim().toLowerCase();
        return source.filter((r) => {
            if (month === 'Nov 2026' && !r.date?.includes('-11-2026') && !r.date?.includes('Nov')) return false;
            if (month === 'Oct 2026' && !r.date?.includes('-10-2026') && !r.date?.includes('Oct')) return false;
            if (q && !r.clientName.toLowerCase().includes(q) && !r.policyNumber.toLowerCase().includes(q)) return false;
            return true;
        });
    }, [tab, pendingRows, historyRows, search, month]);

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
                        Secondary sign-off queue for approved policies
                    </p>
                </div>

                {/* Tabs */}
                <div className="inline-flex rounded-xl border p-1 gap-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <button
                        type="button"
                        onClick={() => setTab('pending')}
                        className="inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                        style={{
                            backgroundColor: tab === 'pending' ? 'var(--accent)' : 'transparent',
                            color: tab === 'pending' ? '#fff' : 'var(--text-secondary)',
                        }}
                    >
                        <span>Pending</span>
                        <span className="rounded-md bg-black/15 px-1.5 py-0.5 text-[10px]">{pendingRows.length}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('history')}
                        className="inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                        style={{
                            backgroundColor: tab === 'history' ? 'var(--accent)' : 'transparent',
                            color: tab === 'history' ? '#fff' : 'var(--text-secondary)',
                        }}
                    >
                        <span>History</span>
                        <span className="rounded-md bg-black/10 px-1.5 py-0.5 text-[10px]">{historyRows.length}</span>
                    </button>
                </div>

                {/* Filter Bar */}
                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search client name or policy number..."
                                className="w-full rounded-lg border pl-8 pr-3 py-2 text-xs outline-none"
                                style={controlStyle}
                            />
                        </div>
                        <CustomSelect value={month} onChange={(e) => setMonth(e.target.value)} style={controlStyle} options={["All months","Nov 2026","Oct 2026"]} />
                        <button type="button" className="inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer" style={controlStyle}>
                            <Filter className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
                            <span>Apply</span>
                        </button>
                    </div>
                </Card>

                {/* Table */}
                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-4 py-3 font-bold uppercase">Client Name</th>
                                    <th className="px-4 py-3 font-bold uppercase">Policy Number</th>
                                    <th className="px-4 py-3 font-bold uppercase">Provider</th>
                                    <th className="px-4 py-3 font-bold uppercase">Advisor</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Total Commission</th>
                                    <th className="px-4 py-3 font-bold uppercase">Approved Date</th>
                                    <th className="px-4 py-3 font-bold uppercase text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-10 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                                            No records in {tab}
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((row) => (
                                        <tr key={row.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                <span className="inline-flex items-center gap-2">
                                                    <UserAvatar name={row.clientName} />
                                                    <span>{row.clientName}</span>
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-muted)' }}>{row.policyNumber}</td>
                                            <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{row.provider}</td>
                                            <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="inline-flex items-center gap-2">
                                                    <UserAvatar name={row.advisor} />
                                                    <span>{row.advisor}</span>
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-inter-black tabular-nums" style={{ color: 'var(--text-primary)' }}>{row.commission}</td>
                                            <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-muted)' }}>{row.approvedDate}</td>
                                            <td className="px-4 py-3 text-center whitespace-nowrap">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setReviewTarget(row);
                                                            setDecision('approve');
                                                            setComments('');
                                                        }}
                                                        className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-500 hover:bg-emerald-500/25 cursor-pointer"
                                                    >
                                                        <Eye className="h-3 w-3" /> Review
                                                    </button>
                                                    <Link
                                                        href="/leads/edit?tab=Customer"
                                                        className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-semibold cursor-pointer"
                                                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                                    >
                                                        <ExternalLink className="h-3 w-3" /> View
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                        {filtered.map((row) => (
                            <div key={row.id} className="rounded-2xl border p-4 space-y-3 shadow-sm" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="font-inter-black text-sm truncate" style={{ color: 'var(--text-primary)' }}>{row.clientName}</div>
                                    <span className="font-inter-black text-xs tabular-nums" style={{ color: 'var(--accent-text)' }}>{row.commission}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: 'var(--bg-card)' }}>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Provider</div>
                                        <div className="text-xs font-semibold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>{row.provider}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Advisor</div>
                                        <div className="text-xs font-semibold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>{row.advisor}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-1.5 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setReviewTarget(row);
                                            setDecision('approve');
                                            setComments('');
                                        }}
                                        className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-500 cursor-pointer"
                                    >
                                        <ClipboardCheck className="h-3 w-3" /> Review
                                    </button>
                                    <Link href="/leads/edit?tab=Customer" className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-semibold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                                        <ExternalLink className="h-3 w-3" /> View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            {reviewTarget &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]"
                        onClick={() => setReviewTarget(null)}
                    >
                        <div
                            className="animate-popover my-auto w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-3.5 text-white" style={{ backgroundColor: '#0F172A' }}>
                                <div className="flex items-center gap-2">
                                    <ClipboardCheck className="h-4 w-4" />
                                    <h3 className="font-inter-black text-sm">Review Compliance</h3>
                                </div>
                                <button type="button" onClick={() => setReviewTarget(null)} className="rounded-md p-1 text-slate-300 hover:text-white cursor-pointer">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="p-5 space-y-4 text-xs">
                                {/* Summary Grid */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-xl border p-4" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Client Name</div>
                                        <div className="mt-0.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{reviewTarget.clientName}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Policy Number</div>
                                        <div className="mt-0.5 font-semibold font-mono" style={{ color: 'var(--text-primary)' }}>{reviewTarget.policyNumber}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Provider</div>
                                        <div className="mt-0.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{reviewTarget.provider}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Advisor</div>
                                        <div className="mt-0.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{reviewTarget.advisor}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Total Commission</div>
                                        <div className="mt-0.5 font-inter-black" style={{ color: 'var(--text-primary)' }}>{reviewTarget.commission}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Compliance Date</div>
                                        <div className="mt-0.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{reviewTarget.approvedDate} 10:25</div>
                                    </div>
                                </div>

                                {/* Decision Toggle */}
                                <div>
                                    <label className="block font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        Secondary QC Decision
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setDecision('approve')}
                                            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold cursor-pointer ${
                                                decision === 'approve' ? 'bg-emerald-500 text-white' : 'border'
                                            }`}
                                            style={decision !== 'approve' ? { borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' } : undefined}
                                        >
                                            <Check className="h-3.5 w-3.5" /> Approve
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDecision('reject')}
                                            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold cursor-pointer ${
                                                decision === 'reject' ? 'bg-rose-500 text-white' : 'border'
                                            }`}
                                            style={decision !== 'reject' ? { borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' } : undefined}
                                        >
                                            <X className="h-3.5 w-3.5" /> Reject
                                        </button>
                                    </div>
                                    <p className="mt-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                        <strong style={{ color: 'var(--text-secondary)' }}>Approve</strong> confirms the payout. <strong style={{ color: 'var(--text-secondary)' }}>Reject</strong> returns it for correction and a comment is required.
                                    </p>
                                </div>

                                {/* Comments */}
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Comments</label>
                                    <textarea
                                        rows={3}
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        placeholder="Add your comments here..."
                                        className="w-full rounded-lg border px-3 py-2 text-xs outline-none resize-none"
                                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                                    />
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <button
                                        type="button"
                                        onClick={() => setReviewTarget(null)}
                                        className="w-full sm:w-auto rounded-lg border px-4 py-2 text-xs font-semibold cursor-pointer"
                                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        disabled={decision === 'reject' && !comments.trim()}
                                        onClick={() => {
                                            if (reviewTarget) {
                                                setPendingRows((prev) => prev.filter((r) => r.id !== reviewTarget.id));
                                                setHistoryRows((prev) => [{ ...reviewTarget, decision, comments }, ...prev]);
                                            }
                                            setReviewTarget(null);
                                        }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                                    >
                                        <Check className="h-3.5 w-3.5" /> Submit Decision
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </AppLayout>
    );
}
