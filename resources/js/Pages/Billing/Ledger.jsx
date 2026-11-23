import React, { useState } from 'react';
import CustomSelect from '../../Components/CustomSelect';
import { createPortal } from 'react-dom';
import { Head } from '@inertiajs/react';
import { Search, RotateCcw, Upload, Edit3, Trash2, X, ChevronDown } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import UserAvatar from '../../Components/UserAvatar';
import ConfirmModal from '../../Components/ConfirmModal';

const LEDGER_ROWS = [
    { id: 1, client: 'Test Lead #1', partner: '—', provider: 'Vitality LIFE', policy: '3120260701', adviser: 'Tricia Junior', monthly: '£64.56', annual: '—', commission: '£600', negative: false, date: '30-11-2026' },
    { id: 2, client: 'Test Tricia', partner: '—', provider: 'Vitality LIFE', policy: '95114207', adviser: 'Unassigned', monthly: '£64.56', annual: '—', commission: '£-100', negative: true, date: '12-11-2026' },
    { id: 3, client: 'Reza Benigay', partner: '—', provider: 'Aviva', policy: 'BPL047JHJ', adviser: 'Lawrence Bracken', monthly: '£6.56', annual: '—', commission: '£0.16', negative: false, date: '28-10-2026' },
    { id: 4, client: 'Chloe Ireland', partner: '—', provider: 'Aviva', policy: 'BPL04YWB6', adviser: 'Lawrence Bracken', monthly: '£20', annual: '—', commission: '£0.5', negative: false, date: '28-10-2026' },
    { id: 5, client: 'Jacquline Walsh', partner: '—', provider: 'Aviva', policy: 'BPL04VZGN', adviser: 'Ricardo Shilly-Shally', monthly: '£11.09', annual: '—', commission: '£0.28', negative: false, date: '28-10-2026' },
    { id: 6, client: "Gaynor O'Neill", partner: '—', provider: 'Aviva', policy: 'BPL04CC0N', adviser: 'Leanne Devine', monthly: '£32.33', annual: '—', commission: '£0.81', negative: false, date: '28-10-2026' },
];

export default function Ledger() {
    const [rows, setRows] = useState(LEDGER_ROWS);
    const [provider, setProvider] = useState('All');
    const [search, setSearch] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [uploadOpen, setUploadOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [deleteRow, setDeleteRow] = useState(null);
    const [expandedMobileKey, setExpandedMobileKey] = useState(null);

    const toIso = (val) => {
        const parts = val.trim().split(/[-/]/);
        return parts.length === 3 ? `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}` : '';
    };

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const filtered = rows.filter((r) => {
        if (provider !== 'All' && r.provider !== provider) return false;
        if (search && !r.client.toLowerCase().includes(search.toLowerCase()) && !r.policy.toLowerCase().includes(search.toLowerCase())) return false;
        const rowIso = toIso(r.date);
        const fromIso = toIso(fromDate);
        const toIsoVal = toIso(toDate);
        if (fromIso && rowIso < fromIso) return false;
        if (toIsoVal && rowIso > toIsoVal) return false;
        return true;
    });

    return (
        <AppLayout>
            <Head title="Ledger" />
            <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Ledger
                    </h1>
                    <button type="button" onClick={() => setUploadOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-2 text-xs font-bold text-amber-500 hover:bg-amber-500/25 self-start sm:self-auto cursor-pointer">
                        <Upload className="h-3.5 w-3.5" /> Upload Statement
                    </button>
                </div>

                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                        <input type="text" value={fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder="From: DD/MM/YYYY" className="rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                        <input type="text" value={toDate} onChange={(e) => setToDate(e.target.value)} placeholder="To: DD/MM/YYYY" className="rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                        <CustomSelect value={provider} onChange={(e) => setProvider(e.target.value)} style={controlStyle} options={[{"label":"Select Provider","value":"All"},{"label":"Vitality LIFE","value":"Vitality LIFE"},{"label":"Aviva","value":"Aviva"}]} />
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search client or policy..."
                                className="w-full rounded-lg border pl-8 pr-3 py-2 text-xs outline-none"
                                style={controlStyle}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setProvider('All');
                                setSearch('');
                                setFromDate('');
                                setToDate('');
                            }}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer"
                            style={controlStyle}
                        >
                            <RotateCcw className="h-3.5 w-3.5" /> Reset
                        </button>
                    </div>
                </Card>

                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-3 py-3 font-bold uppercase">Client Name</th>
                                    <th className="px-3 py-3 font-bold uppercase">Partner Name</th>
                                    <th className="px-3 py-3 font-bold uppercase">Provider</th>
                                    <th className="px-3 py-3 font-bold uppercase">Policy Number</th>
                                    <th className="px-3 py-3 font-bold uppercase">Adviser</th>
                                    <th className="px-3 py-3 font-bold uppercase text-right">Monthly Premium</th>
                                    <th className="px-3 py-3 font-bold uppercase text-right">Annual Premium</th>
                                    <th className="px-3 py-3 font-bold uppercase text-right">Commission / Amount</th>
                                    <th className="px-3 py-3 font-bold uppercase">Statement Date</th>
                                    <th className="px-3 py-3 font-bold uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((r) => (
                                    <tr key={r.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="px-3 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            <span className="inline-flex items-center gap-2"><UserAvatar name={r.client} /><span>{r.client}</span></span>
                                        </td>
                                        <td className="px-3 py-2.5" style={{ color: 'var(--text-muted)' }}>{r.partner}</td>
                                        <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{r.provider}</td>
                                        <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.policy}</td>
                                        <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="inline-flex items-center gap-2"><UserAvatar name={r.adviser} /><span>{r.adviser}</span></span>
                                        </td>
                                        <td className="px-3 py-2.5 text-right tabular-nums" style={{ color: 'var(--text-primary)' }}>{r.monthly}</td>
                                        <td className="px-3 py-2.5 text-right tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.annual}</td>
                                        <td className={`px-3 py-2.5 text-right tabular-nums font-bold ${r.negative ? 'text-rose-500' : ''}`} style={!r.negative ? { color: 'var(--text-primary)' } : undefined}>
                                            {r.commission}
                                        </td>
                                        <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                                        <td className="px-3 py-2.5 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5">
                                                <button type="button" onClick={() => setEditRow(r)} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 hover:bg-amber-500/25 cursor-pointer" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                                                <button type="button" onClick={() => setDeleteRow(r)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 hover:bg-rose-500/25 cursor-pointer" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="divide-y divide-slate-200/80 md:hidden">
                        {filtered.map((r) => {
                            const isOpen = expandedMobileKey === r.id;
                            return (
                                <div key={r.id} className="p-3 text-xs">
                                    <button
                                        type="button"
                                        onClick={() => setExpandedMobileKey(isOpen ? null : r.id)}
                                        className="flex w-full items-center justify-between gap-2 text-left cursor-pointer"
                                    >
                                        <div className="min-w-0">
                                            <div className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{r.client}</div>
                                            <div className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>{r.provider} • {r.policy}</div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={`font-bold tabular-nums ${r.negative ? 'text-rose-500' : ''}`} style={!r.negative ? { color: 'var(--text-primary)' } : undefined}>
                                                {r.commission}
                                            </span>
                                            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <div className="mt-3 space-y-2 border-t pt-2.5" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <div className="flex items-center justify-between gap-2">
                                                <span style={{ color: 'var(--text-muted)' }}>Adviser</span>
                                                <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                                                    <UserAvatar name={r.adviser} />
                                                    <span>{r.adviser}</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between gap-2">
                                                <span style={{ color: 'var(--text-muted)' }}>Partner</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>{r.partner}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-2">
                                                <span style={{ color: 'var(--text-muted)' }}>Monthly / Annual</span>
                                                <span className="tabular-nums" style={{ color: 'var(--text-primary)' }}>{r.monthly} / {r.annual}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-2">
                                                <span style={{ color: 'var(--text-muted)' }}>Statement Date</span>
                                                <span className="tabular-nums" style={{ color: 'var(--text-secondary)' }}>{r.date}</span>
                                            </div>
                                            <div className="flex items-center justify-end gap-2 pt-1">
                                                <button type="button" onClick={() => setEditRow(r)} className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-500 hover:bg-amber-500/25 cursor-pointer">
                                                    <Edit3 className="h-3 w-3" /> Edit
                                                </button>
                                                <button type="button" onClick={() => setDeleteRow(r)} className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-500 hover:bg-rose-500/25 cursor-pointer">
                                                    <Trash2 className="h-3 w-3" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
            {uploadOpen &&
                createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]" onClick={() => setUploadOpen(false)}>
                        <div className="animate-popover my-auto w-full max-w-lg rounded-2xl border p-5 shadow-2xl text-xs space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>Upload Ledger</h3>
                                <button type="button" onClick={() => setUploadOpen(false)} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="block font-semibold mb-1">Select Provider : <span className="text-rose-500">*</span></label>
                                    <CustomSelect style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} options={[{"label":"--- Select Provider ----","value":""},{"label":"Vitality LIFE","value":"Vitality LIFE"},{"label":"Aviva","value":"Aviva"}]} />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Select Date : <span className="text-rose-500">*</span></label>
                                    <input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1.5">Upload Your File Here : <span className="text-rose-500">*</span></label>
                                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-500/60 py-8 px-4 text-center cursor-pointer" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                    <Upload className="h-7 w-7 text-blue-600 mb-2" />
                                    <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Drop your file here</span>
                                </div>
                                <div className="mt-2 rounded-lg py-2 text-center font-semibold" style={{ backgroundColor: 'var(--bg-surface-alt)', color: 'var(--text-muted)' }}>
                                    Not Uploaded File
                                </div>
                            </div>
                            <div className="flex justify-end border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <button type="button" onClick={() => setUploadOpen(false)} className="rounded-lg bg-amber-400 px-5 py-2 font-bold text-slate-900 hover:bg-amber-500 cursor-pointer">Submit</button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            {editRow &&
                createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]" onClick={() => setEditRow(null)}>
                        <div className="animate-popover my-auto w-full max-w-2xl rounded-2xl border p-5 shadow-2xl text-xs space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>Edit Ledger</h3>
                                <button type="button" onClick={() => setEditRow(null)} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                <div><label className="block font-semibold mb-1">Provider</label><CustomSelect defaultValue={editRow.provider} style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} options={["Vitality LIFE","Aviva"]} /></div>
                                <div><label className="block font-semibold mb-1">Policy Number</label><input type="text" defaultValue={editRow.policy} className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} /></div>
                                <div><label className="block font-semibold mb-1">Client Name</label><input type="text" defaultValue={editRow.client} className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} /></div>
                                <div><label className="block font-semibold mb-1">Partner Name</label><input type="text" defaultValue={editRow.partner === '—' ? '' : editRow.partner} className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} /></div>
                                <div><label className="block font-semibold mb-1">Monthly Premium</label><input type="text" defaultValue={editRow.monthly.replace('£', '')} className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} /></div>
                                <div><label className="block font-semibold mb-1">Annual Premium</label><input type="text" defaultValue={editRow.annual === '—' ? '' : editRow.annual} className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} /></div>
                                <div><label className="block font-semibold mb-1">Commission</label><input type="text" defaultValue={editRow.commission.replace('£', '')} className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} /></div>
                                <div><label className="block font-semibold mb-1">Created At</label><input type="date" defaultValue="2026-11-30" className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} /></div>
                            </div>
                            <div className="flex justify-start border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <button type="button" onClick={() => setEditRow(null)} className="rounded-lg bg-amber-400 px-5 py-2 font-bold text-slate-900 hover:bg-amber-500 cursor-pointer">Submit</button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            <ConfirmModal
                open={Boolean(deleteRow)}
                onClose={() => setDeleteRow(null)}
                onConfirm={() => {
                    if (deleteRow) setRows((prev) => prev.filter((r) => r.id !== deleteRow.id));
                    setDeleteRow(null);
                }}
                title="Are you sure?"
                description="This will remove the row"
                confirmLabel="Yes, Remove it!"
            />
        </AppLayout>
    );
}
