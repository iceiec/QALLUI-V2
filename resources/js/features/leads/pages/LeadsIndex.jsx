import React, { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import { Head, Link } from '@inertiajs/react';
import {
    Search,
    RotateCcw,
    Table2,
    LayoutGrid,
    Kanban,
    Eye,
    Edit3,
    Trash2,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    CheckSquare,
    MoreVertical,
} from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import UserAvatar from '@/components/UserAvatar';
import ConfirmModal from '@/components/ConfirmModal';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import { LEADS_DATASET } from '@/data/mockData';

const ADVISOR_OPTIONS = [
    'Angelo Villanueva',
    'Gurpreet Barpagga',
    'Vanessa Timbal',
    'Adelle Cabbig',
    'Lyna Mandera',
    'Tom Tovey',
    'Lawrence Bracken',
    'Unassigned',
];

function ToggleSwitch({ checked, onChange, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={onChange}
            className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
            style={{ backgroundColor: checked ? 'var(--accent)' : 'var(--border-strong)' }}
        >
            <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                    checked ? 'translate-x-4' : 'translate-x-0'
                }`}
            />
        </button>
    );
}

export default function LeadsIndex({ mode = 'all', title = 'All Leads', subtitle = '' }) {
    const [rows, setRows] = useState(LEADS_DATASET);
    const [search, setSearch] = useState('');
    const [excludeOnCover, setExcludeOnCover] = useState(false);
    const [stageFilter, setStageFilter] = useState('All');
    const [assigneeFilter, setAssigneeFilter] = useState('All');
    const [providerFilter, setProviderFilter] = useState('All');
    const [sourceFilter, setSourceFilter] = useState('All');
    const [wonBackFilter, setWonBackFilter] = useState('All');
    const [openMobileMenuId, setOpenMobileMenuId] = useState(null);
    const [productFilter, setProductFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest');
    const [perPage, setPerPage] = useState(20);
    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState('table'); // 'table' | 'card' | 'board'
    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [rescueTarget, setRescueTarget] = useState(null);
    const [stayTarget, setStayTarget] = useState(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [activeFilterCat, setActiveFilterCat] = useState('stage');

    const baseLeads = useMemo(() => {
        if (mode === 'static') return rows.filter((l) => l.poolType === 'static' || l.stage === 'FF Partial');
        if (mode === 'pool') return rows.filter((l) => l.poolType === 'pool' || l.assignee === 'Unassigned');
        return rows;
    }, [rows, mode]);

    const stages = useMemo(() => ['All', ...new Set(LEADS_DATASET.map((l) => l.stage))], []);
    const assignees = useMemo(() => ['All', ...new Set(LEADS_DATASET.map((l) => l.assignee))], []);
    const providers = useMemo(() => ['All', ...new Set(LEADS_DATASET.map((l) => l.provider))], []);
    const sources = useMemo(() => ['All', ...new Set(LEADS_DATASET.map((l) => l.source))], []);

    const filteredLeads = useMemo(() => {
        const q = search.trim().toLowerCase();
        const result = baseLeads.filter((lead) => {
            if (excludeOnCover && lead.stage === 'On Cover') return false;
            if (stageFilter !== 'All' && lead.stage !== stageFilter) return false;
            if (assigneeFilter !== 'All' && lead.assignee !== assigneeFilter) return false;
            if (providerFilter !== 'All' && lead.provider !== providerFilter) return false;
            if (sourceFilter !== 'All' && lead.source !== sourceFilter) return false;
            if (productFilter !== 'All' && (lead.product || 'Life') !== productFilter) return false;
            if (wonBackFilter === 'Yes' && !lead.wonBack) return false;
            if (wonBackFilter === 'No' && lead.wonBack) return false;
            if (
                q &&
                !lead.clientName.toLowerCase().includes(q) &&
                !lead.policyNumber.toLowerCase().includes(q) &&
                !lead.assignee.toLowerCase().includes(q)
            ) {
                return false;
            }
            return true;
        });

        if (sortOrder === 'name') {
            return [...result].sort((a, b) => a.clientName.localeCompare(b.clientName));
        }
        return result;
    }, [baseLeads, search, excludeOnCover, stageFilter, assigneeFilter, providerFilter, sourceFilter, productFilter, wonBackFilter, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(filteredLeads.length / perPage));
    const paginatedLeads = filteredLeads.slice((page - 1) * perPage, page * perPage);

    const toggleWonBack = (id) => {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, wonBack: !r.wonBack } : r)));
    };

    const updateAssignee = (id, newAssignee) => {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, assignee: newAssignee } : r)));
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === paginatedLeads.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(paginatedLeads.map((l) => l.id));
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const resetFilters = () => {
        setSearch('');
        setExcludeOnCover(false);
        setStageFilter('All');
        setAssigneeFilter('All');
        setProviderFilter('All');
        setSourceFilter('All');
        setWonBackFilter('All');
        setProductFilter('All');
        setSortOrder('newest');
        setPage(1);
    };

    const boardStages = ['FF New', 'FF Partial', 'Policy History', 'On Cover', 'Dead'];

    const selectStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    return (
        <AppLayout>
            <Head title={title} />

            <div className="space-y-4">
                {/* Page Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            {title}
                        </h1>
                        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                            {subtitle}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge tone="emerald">{filteredLeads.length} entries</Badge>
                    </div>
                </div>

                {/* Modern Filters Bar */}
                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="space-y-3">
                        {/* Top Row: Search + Sort + Reset + View Mode */}
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1);
                                    }}
                                    placeholder={
                                        mode === 'static'
                                            ? 'Search static leads...'
                                            : mode === 'pool'
                                            ? 'Search leads pool...'
                                            : 'Search client/mobile, policy #, or assignee...'
                                    }
                                    className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs outline-none transition-colors"
                                    style={selectStyle}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {mode === 'all' && (
                                    <button
                                        type="button"
                                        onClick={() => setExcludeOnCover((v) => !v)}
                                        className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                                        style={{
                                            backgroundColor: excludeOnCover ? 'var(--accent-soft)' : 'var(--bg-surface)',
                                            borderColor: excludeOnCover ? 'var(--accent)' : 'var(--border-subtle)',
                                            color: excludeOnCover ? 'var(--accent-text)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        Exclude On-Cover
                                    </button>
                                )}

                                <div className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs" style={selectStyle}>
                                    <ArrowUpDown className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                    <CustomSelect value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={selectStyle} options={[{"label":"Sort: Newest","value":"newest"},{"label":"Sort: Client Name","value":"name"}]} />
                                </div>

                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                                    style={{
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-subtle)',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    <span>Reset</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen((v) => !v)}
                                    className="sm:hidden inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold cursor-pointer"
                                    style={{
                                        backgroundColor: mobileFiltersOpen ? 'var(--accent-soft)' : 'var(--bg-surface)',
                                        borderColor: mobileFiltersOpen ? 'var(--accent)' : 'var(--border-subtle)',
                                        color: mobileFiltersOpen ? 'var(--accent-text)' : 'var(--text-secondary)',
                                    }}
                                >
                                    <span>{mobileFiltersOpen ? 'Hide Filters' : 'Filters'}</span>
                                </button>

                                {/* Table view only */}
                            </div>
                        </div>

                        {/* Second Row: Mode-Specific Filter Dropdowns + Show Entries */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                            <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-2">
                                {mode !== 'pool' && (
                                    <>
                                        <select
                                            value={stageFilter}
                                            onChange={(e) => setStageFilter(e.target.value)}
                                            className="rounded-lg border px-2.5 py-1.5 text-xs outline-none cursor-pointer"
                                            style={selectStyle}
                                        >
                                            {stages.map((s) => (
                                                <option key={s} value={s}>Stage: {s}</option>
                                            ))}
                                        </select>

                                        <select
                                            value={assigneeFilter}
                                            onChange={(e) => setAssigneeFilter(e.target.value)}
                                            className="rounded-lg border px-2.5 py-1.5 text-xs outline-none cursor-pointer"
                                            style={selectStyle}
                                        >
                                            {assignees.map((a) => (
                                                <option key={a} value={a}>{mode === 'static' ? `Assignee: ${a}` : `User: ${a}`}</option>
                                            ))}
                                        </select>
                                    </>
                                )}

                                {mode === 'all' && (
                                    <>
                                        <select
                                            value={providerFilter}
                                            onChange={(e) => setProviderFilter(e.target.value)}
                                            className="rounded-lg border px-2.5 py-1.5 text-xs outline-none cursor-pointer"
                                            style={selectStyle}
                                        >
                                            {providers.map((p) => (
                                                <option key={p} value={p}>Provider: {p}</option>
                                            ))}
                                        </select>

                                        <CustomSelect value={wonBackFilter} onChange={(e) => setWonBackFilter(e.target.value)} style={selectStyle} options={[{"label":"Won Back: All","value":"All"},{"label":"Won Back: Yes","value":"Yes"},{"label":"Won Back: No","value":"No"}]} />
                                    </>
                                )}

                                {mode !== 'pool' && (
                                    <select
                                        value={sourceFilter}
                                        onChange={(e) => setSourceFilter(e.target.value)}
                                        className="rounded-lg border px-2.5 py-1.5 text-xs outline-none cursor-pointer"
                                        style={selectStyle}
                                    >
                                        {sources.map((src) => (
                                            <option key={src} value={src}>Source: {src}</option>
                                        ))}
                                    </select>
                                )}

                                {mode === 'pool' && (
                                    <CustomSelect value={productFilter} onChange={(e) => setProductFilter(e.target.value)} style={selectStyle} options={[{"label":"Product: All","value":"All"},{"label":"Product: Life","value":"Life"},{"label":"Product: Home","value":"Home"},{"label":"Product: Will","value":"Will"},{"label":"Product: Pension","value":"Pension"},{"label":"Product: Sport","value":"Sport"}]} />
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                <span>Show</span>
                                <CustomSelect value={String(perPage)} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} style={selectStyle} options={["10","20","50"]} />
                                <span>Entries</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Bulk Action Bar */}
                {selectedIds.length > 0 && (
                    <div
                        className="animate-popover flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-2.5 text-xs"
                        style={{
                            backgroundColor: 'var(--accent-soft)',
                            borderColor: 'var(--accent)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <div className="flex items-center gap-2 font-bold">
                            <CheckSquare className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                            <span>{selectedIds.length} lead(s) selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="rounded-lg px-2.5 py-1 text-xs font-semibold text-white cursor-pointer"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                Bulk Assign
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedIds([])}
                                className="rounded-lg border px-2.5 py-1 text-xs font-semibold cursor-pointer"
                                style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                )}

                {/* Table View */}
                {viewMode === 'table' && (
                    <Card padding="p-0 overflow-hidden" hoverable={false}>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr
                                        className="border-b"
                                        style={{
                                            backgroundColor: 'var(--bg-surface)',
                                            borderColor: 'var(--border-subtle)',
                                            color: 'var(--text-muted)',
                                        }}
                                    >
                                        <th className="px-3 py-3 font-bold uppercase">Client Name</th>
                                        {mode === 'all' && <th className="px-3 py-3 font-bold uppercase">Policy Number</th>}
                                        {mode !== 'pool' && <th className="px-3 py-3 font-bold uppercase">Stage</th>}
                                        <th className="px-3 py-3 font-bold uppercase">
                                            {mode === 'all' ? 'Assigned To' : mode === 'static' ? 'Assignee' : 'Agent'}
                                        </th>
                                        <th className="px-3 py-3 font-bold uppercase">Lead Source</th>
                                        {mode !== 'pool' && <th className="px-3 py-3 font-bold uppercase">Won Back</th>}
                                        <th className="px-3 py-3 font-bold uppercase">Created at</th>
                                        <th className="px-3 py-3 font-bold uppercase">
                                            {mode === 'all' ? 'Updated at' : 'Last Updated'}
                                        </th>
                                        {mode !== 'pool' && (
                                            <th className="px-3 py-3 font-bold uppercase">
                                                {mode === 'all' ? 'Updated By' : 'Last updated By'}
                                            </th>
                                        )}
                                        {mode === 'pool' && (
                                            <>
                                                <th className="px-2 py-3 font-bold uppercase text-center">Life</th>
                                                <th className="px-2 py-3 font-bold uppercase text-center">Home</th>
                                                <th className="px-2 py-3 font-bold uppercase text-center">Will</th>
                                                <th className="px-2 py-3 font-bold uppercase text-center">Pension</th>
                                                <th className="px-2 py-3 font-bold uppercase text-center">Sport</th>
                                                <th className="px-2 py-3 font-bold uppercase text-right">Days Old</th>
                                            </>
                                        )}
                                        <th className="px-3 py-3 font-bold uppercase text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedLeads.length === 0 ? (
                                        <tr>
                                            <td colSpan={12} className="px-4 py-10 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                                                No data available in table
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedLeads.map((lead) => (
                                            <tr
                                                key={lead.id}
                                                className="qall-row-hover border-b last:border-b-0"
                                                style={{ borderColor: 'var(--border-subtle)' }}
                                            >
                                                <td className="px-3 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                    <span className="inline-flex items-center gap-2">
                                                        <UserAvatar name={lead.clientName} />
                                                        <span>{lead.clientName}</span>
                                                    </span>
                                                </td>
                                                {mode === 'all' && (
                                                    <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>
                                                        {lead.policyNumber}
                                                    </td>
                                                )}
                                                {mode !== 'pool' && (
                                                    <td className="px-3 py-2.5">
                                                        <Badge stage={lead.stage}>{lead.stage}</Badge>
                                                    </td>
                                                )}
                                                <td className="px-3 py-2.5">
                                                    {mode === 'all' ? (
                                                        <select
                                                            value={lead.assignee}
                                                            onChange={(e) => updateAssignee(lead.id, e.target.value)}
                                                            className="rounded-md border px-2 py-1 text-xs outline-none cursor-pointer"
                                                            style={selectStyle}
                                                        >
                                                            {ADVISOR_OPTIONS.map((adv) => (
                                                                <option key={adv} value={adv}>{adv}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                                            <UserAvatar name={lead.assignee} />
                                                            <span>{lead.assignee}</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                                    {lead.source}
                                                </td>
                                                {mode !== 'pool' && (
                                                    <td className="px-3 py-2.5">
                                                        <ToggleSwitch
                                                            checked={Boolean(lead.wonBack)}
                                                            onChange={() => toggleWonBack(lead.id)}
                                                            label={`Toggle Won Back for ${lead.clientName}`}
                                                        />
                                                    </td>
                                                )}
                                                <td className="px-3 py-2.5 tabular-nums whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                                                    {lead.createdAt}
                                                </td>
                                                <td className="px-3 py-2.5 tabular-nums whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                                                    {lead.updatedAt}
                                                </td>
                                                {mode !== 'pool' && (
                                                    <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                                        {lead.updatedBy}
                                                    </td>
                                                )}
                                                {mode === 'pool' && (
                                                    <>
                                                        <td className="px-2 py-2.5 text-center">{lead.life || 'No'}</td>
                                                        <td className="px-2 py-2.5 text-center">{lead.home || 'No'}</td>
                                                        <td className="px-2 py-2.5 text-center">{lead.will || 'No'}</td>
                                                        <td className="px-2 py-2.5 text-center">{lead.pension || 'No'}</td>
                                                        <td className="px-2 py-2.5 text-center">{lead.sport || 'No'}</td>
                                                        <td className="px-2 py-2.5 text-right tabular-nums font-bold">{lead.daysOld ?? 12}</td>
                                                    </>
                                                )}
                                                <td className="px-3 py-2.5 text-center whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-1.5">
                                                        {mode === 'static' && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setRescueTarget(lead)}
                                                                    className="rounded-md bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-500 transition-colors hover:bg-emerald-500/25 cursor-pointer"
                                                                >
                                                                    Rescue
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setStayTarget(lead)}
                                                                    className="rounded-md bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-500 transition-colors hover:bg-rose-500/25 cursor-pointer"
                                                                >
                                                                    Stay
                                                                </button>
                                                                <Link
                                                                    href={`/leads/edit?client=${encodeURIComponent(lead.clientName)}&policy=${encodeURIComponent(lead.policyNumber)}&stage=${encodeURIComponent(lead.stage)}`}
                                                                    className="rounded-md border p-1.5 transition-colors cursor-pointer"
                                                                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                                                    title="View"
                                                                >
                                                                    <Eye className="h-3.5 w-3.5" />
                                                                </Link>
                                                            </>
                                                        )}
                                                        {mode === 'all' && (
                                                            <>
                                                                <Link
                                                                    href={`/leads/edit?client=${encodeURIComponent(lead.clientName)}&policy=${encodeURIComponent(lead.policyNumber)}&stage=${encodeURIComponent(lead.stage)}`}
                                                                    className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 transition-colors hover:bg-amber-500/25 cursor-pointer"
                                                                    title="Edit"
                                                                >
                                                                    <Edit3 className="h-3.5 w-3.5" />
                                                                </Link>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDeleteTarget(lead)}
                                                                    className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 transition-colors hover:bg-rose-500/25 cursor-pointer"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </button>
                                                            </>
                                                        )}
                                                        {mode === 'pool' && (
                                                            <button
                                                                type="button"
                                                                className="rounded-md border p-1.5 transition-colors cursor-pointer"
                                                                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                                                title="View"
                                                            >
                                                                <Eye className="h-3.5 w-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card Fallback */}
                        <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                            {paginatedLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="rounded-2xl border p-4 space-y-3 shadow-sm"
                                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <Link
                                                href={`/leads/edit?client=${encodeURIComponent(lead.clientName)}&policy=${encodeURIComponent(lead.policyNumber)}&stage=${encodeURIComponent(lead.stage)}`}
                                                className="font-inter-black text-sm hover:underline block truncate"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {lead.clientName}
                                            </Link>
                                            <div className="mt-1 inline-flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                                <span className="rounded-md px-1.5 py-0.5 font-semibold tabular-nums" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)' }}>
                                                    {lead.policyNumber || 'No Policy #'}
                                                </span>
                                                <span>â€¢</span>
                                                <span className="truncate">{lead.source}</span>
                                            </div>
                                        </div>
                                        <Badge stage={lead.stage}>{lead.stage}</Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: 'var(--bg-card)' }}>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Assigned To</div>
                                            <div className="text-xs font-semibold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>{lead.assignee}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Won Back</div>
                                            <div className="text-xs font-bold mt-0.5" style={{ color: lead.wonBack ? '#10b981' : 'var(--text-secondary)' }}>
                                                {lead.wonBack ? 'Yes' : 'No'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Created</div>
                                            <div className="text-[11px] tabular-nums mt-0.5" style={{ color: 'var(--text-secondary)' }}>{lead.createdAt}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Updated</div>
                                            <div className="text-[11px] tabular-nums mt-0.5" style={{ color: 'var(--text-secondary)' }}>{lead.updatedAt}</div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Updated By</div>
                                            <div className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>{lead.updatedBy}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Premium</div>
                                            <div className="font-inter-black text-sm tabular-nums" style={{ color: 'var(--accent-text)' }}>{lead.premium}</div>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5">
                                            {(mode === 'retention' || mode === 'static') && (
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenMobileMenuId(openMobileMenuId === lead.id ? null : lead.id)}
                                                        className="rounded-lg border p-1.5 cursor-pointer"
                                                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                                        aria-label="Actions"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </button>
                                                    {openMobileMenuId === lead.id && (
                                                        <div
                                                            className="animate-popover absolute right-0 bottom-full mb-1.5 w-36 z-30 rounded-xl border p-1 shadow-xl text-xs"
                                                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() => { setOpenMobileMenuId(null); setRescueTarget(lead); }}
                                                                className="flex w-full items-center rounded-lg px-2.5 py-2 text-left font-bold text-emerald-500 hover:bg-black/5 cursor-pointer"
                                                            >
                                                                Rescue
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => { setOpenMobileMenuId(null); setStayTarget(lead); }}
                                                                className="flex w-full items-center rounded-lg px-2.5 py-2 text-left font-bold text-rose-500 hover:bg-black/5 cursor-pointer"
                                                            >
                                                                Stay
                                                            </button>
                                                            <Link
                                                                href={`/leads/edit?client=${encodeURIComponent(lead.clientName)}&policy=${encodeURIComponent(lead.policyNumber)}&stage=${encodeURIComponent(lead.stage)}`}
                                                                onClick={() => setOpenMobileMenuId(null)}
                                                                className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-2 text-left font-semibold hover:bg-black/5"
                                                                style={{ color: 'var(--text-primary)' }}
                                                            >
                                                                <Eye className="h-3.5 w-3.5" /> View
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {mode === 'all' && (
                                                <>
                                                    <Link
                                                        href={`/leads/edit?client=${encodeURIComponent(lead.clientName)}&policy=${encodeURIComponent(lead.policyNumber)}&stage=${encodeURIComponent(lead.stage)}`}
                                                        className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 cursor-pointer"
                                                        title="Edit"
                                                    >
                                                        <Edit3 className="h-3.5 w-3.5" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteTarget(lead)}
                                                        className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 cursor-pointer"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </>
                                            )}
                                            {mode === 'pool' && (
                                                <button
                                                    type="button"
                                                    className="rounded-md border p-1.5 cursor-pointer"
                                                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                                    title="View"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Footer */}
                        <div
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t px-4 py-3 text-xs"
                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                        >
                            <span>
                                Showing {filteredLeads.length === 0 ? 0 : (page - 1) * perPage + 1} to{' '}
                                {Math.min(page * perPage, filteredLeads.length)} of {filteredLeads.length} entries
                            </span>
                            <div className="inline-flex items-center gap-1">
                                <button
                                    type="button"
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold disabled:opacity-40 cursor-pointer"
                                    style={selectStyle}
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" /> Previous
                                </button>
                                <span
                                    className="rounded-lg px-2.5 py-1 text-xs font-bold text-white"
                                    style={{ backgroundColor: 'var(--accent)' }}
                                >
                                    {page}
                                </span>
                                <button
                                    type="button"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold disabled:opacity-40 cursor-pointer"
                                    style={selectStyle}
                                >
                                    Next <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    </Card>
                )}

                {viewMode === 'card' && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {paginatedLeads.map((lead) => (
                            <Card key={lead.id}>
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{lead.clientName}</div>
                                        <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                            {lead.id} â€¢ {lead.source}
                                        </div>
                                    </div>
                                    <Badge stage={lead.stage}>{lead.stage}</Badge>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <div>
                                        <div className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Assignee</div>
                                        <div className="mt-1 inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                            <UserAvatar name={lead.assignee} />
                                            <span>{lead.assignee}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Est. Premium</div>
                                        <div className="font-inter-black text-sm" style={{ color: 'var(--accent-text)' }}>{lead.premium}</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {viewMode === 'board' && (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
                        {boardStages.map((stage) => {
                            const items = filteredLeads.filter((l) => l.stage === stage);
                            return (
                                <Card key={stage} padding="p-3">
                                    <div className="flex items-center justify-between mb-3">
                                        <Badge stage={stage}>{stage}</Badge>
                                        <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{items.length}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {items.length === 0 ? (
                                            <p className="text-[11px] py-4 text-center" style={{ color: 'var(--text-muted)' }}>No leads</p>
                                        ) : (
                                            items.map((lead) => (
                                                <div
                                                    key={lead.id}
                                                    className="rounded-lg border p-2.5 text-xs"
                                                    style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                                                >
                                                    <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{lead.clientName}</div>
                                                    <div className="mt-1 flex items-center justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                                        <span>{lead.assignee}</span>
                                                        <span className="font-bold" style={{ color: 'var(--accent-text)' }}>{lead.premium}</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => {
                    setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
                    setDeleteTarget(null);
                }}
                title="Delete Lead"
                description={deleteTarget ? `Are you sure you want to delete "${deleteTarget.clientName}"? This action cannot be undone.` : ''}
                confirmLabel="Delete Lead"
            />
            <ConfirmModal
                open={Boolean(rescueTarget)}
                onClose={() => setRescueTarget(null)}
                onConfirm={() => {
                    setRows((prev) => prev.filter((r) => r.id !== rescueTarget.id));
                    setRescueTarget(null);
                }}
                title="Rescue lead"
                description="Do you want to rescue this lead? It will be assigned to you and will no longer be visible to other users."
                confirmLabel="Continue"
                tone="emerald"
            />
            <ConfirmModal
                open={Boolean(stayTarget)}
                onClose={() => setStayTarget(null)}
                onConfirm={() => {
                    setStayTarget(null);
                }}
                title="Stay"
                description="Do you want to stay for 14 days?"
                confirmLabel="Yes"
                tone="emerald"
            />
            <MobileFilterDrawer
                open={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                resultCount={filteredLeads.length}
                onReset={resetFilters}
                categories={[
                    mode !== 'pool' && { id: 'stage', label: 'Stage', value: stageFilter, options: stages, onChange: setStageFilter },
                    mode !== 'pool' && { id: 'assignee', label: mode === 'static' ? 'Assignee' : 'User', value: assigneeFilter, options: assignees, onChange: setAssigneeFilter },
                    mode === 'all' && { id: 'provider', label: 'Provider', value: providerFilter, options: providers, onChange: setProviderFilter },
                    mode !== 'pool' && { id: 'source', label: 'Source', value: sourceFilter, options: sources, onChange: setSourceFilter },
                ].filter(Boolean)}
            />
        </AppLayout>
    );
}
