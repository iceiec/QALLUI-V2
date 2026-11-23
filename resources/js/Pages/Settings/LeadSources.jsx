import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head } from '@inertiajs/react';
import { Search, Plus, Copy, Edit3, Trash2, X } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';
import ConfirmModal from '../../Components/ConfirmModal';

const SOURCES = [
    { name: 'Aiden Wood', url: 'https://leadtest.qalltransfer.com/company/6e169ef9-1306-4e06-bbe1-bb96bde86b92/ZXhjaGF9xYWxsaVI', cost: '£0', status: 'Inactive' },
    { name: 'Ashleigh Woodgate', url: 'https://leadtest.qalltransfer.com/company/bcbe2df8-30d4-47a9-8c7a-06e65cb2cac2/ZXhjaGF9xYWxsaVI', cost: '£0', status: 'Inactive' },
    { name: 'Asigurare', url: 'https://leadtest.qalltransfer.com/company/4be63ff2-0320-4a02-9fe6-402a56cf6a61/ZXhjaGF9xYWxsaVI', cost: '£0', status: 'Active' },
    { name: 'Beckett', url: 'https://leadtest.qalltransfer.com/company/d4faf303-7b9b-48a1-ad43-204c8b1d0c1b/ZXhjaGF9xYWxsaVI', cost: '£0', status: 'Inactive' },
    { name: 'DDPenny', url: 'https://leadtest.qalltransfer.com/company/a708fb86-5c42-46ee-ab7b-2c937a2c4bd5/ZXhjaGF9xYWxsaVI', cost: '£0', status: 'Inactive' },
];

export default function LeadSources() {
    const [sources, setSources] = useState(SOURCES);
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const [editSource, setEditSource] = useState(null);
    const [deleteSource, setDeleteSource] = useState(null);
    const [form, setForm] = useState({ name: '', cost: '0', status: 'Active' });

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const filtered = sources.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()));

    const openAddModal = () => {
        setForm({ name: '', cost: '', status: 'Active' });
        setAddOpen(true);
    };

    const openEditModal = (s) => {
        setForm({
            name: s.name,
            cost: s.cost.replace(/[^0-9.]/g, '') || '0',
            status: s.status,
        });
        setEditSource(s);
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        setSources((prev) => [
            {
                name: form.name.trim(),
                url: `https://leadtest.qalltransfer.com/company/${Math.random().toString(36).slice(2, 10)}`,
                cost: `£${form.cost || '0'}`,
                status: form.status,
            },
            ...prev,
        ]);
        setAddOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editSource || !form.name.trim()) return;
        setSources((prev) =>
            prev.map((s) =>
                s.name === editSource.name
                    ? { ...s, name: form.name.trim(), cost: `£${form.cost || '0'}`, status: form.status }
                    : s
            )
        );
        setEditSource(null);
    };

    const handleConfirmDelete = () => {
        if (!deleteSource) return;
        setSources((prev) => prev.filter((s) => s.name !== deleteSource.name));
        setDeleteSource(null);
    };

    return (
        <AppLayout>
            <Head title="All Sources" />
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        All Sources
                    </h1>
                    <button type="button" onClick={openAddModal} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white self-start sm:self-auto cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                        <Plus className="h-3.5 w-3.5" /> Add Source
                    </button>
                </div>

                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search source..." className="w-full rounded-lg border pl-8 pr-3 py-2 text-xs outline-none" style={controlStyle} />
                    </div>
                </Card>

                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-4 py-3 font-bold uppercase">Name</th>
                                    <th className="px-4 py-3 font-bold uppercase">URL</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Cost per lead</th>
                                    <th className="px-4 py-3 font-bold uppercase text-center">Status</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((s) => (
                                    <tr key={s.name} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="px-4 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</td>
                                        <td className="px-4 py-2.5">
                                            <div className="flex items-center gap-2 max-w-md">
                                                <span className="truncate text-sky-500">{s.url}</span>
                                                <button type="button" onClick={() => navigator.clipboard?.writeText(s.url)} className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-semibold shrink-0 cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                                                    <Copy className="h-2.5 w-2.5" /> Copy!
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5 text-right tabular-nums">{s.cost}</td>
                                        <td className="px-4 py-2.5 text-center"><Badge tone={s.status === 'Active' ? 'emerald' : 'rose'}>{s.status}</Badge></td>
                                        <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5">
                                                <button type="button" onClick={() => openEditModal(s)} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 hover:bg-amber-500/25 cursor-pointer" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                                                <button type="button" onClick={() => setDeleteSource(s)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 hover:bg-rose-500/25 cursor-pointer" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 p-3 md:hidden">
                        {filtered.map((s) => (
                            <div key={s.name} className="rounded-xl border p-3.5 space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{s.name}</div>
                                    <Badge tone={s.status === 'Active' ? 'emerald' : 'rose'}>{s.status}</Badge>
                                </div>
                                <div className="flex items-center gap-2 text-[11px]">
                                    <span className="truncate text-sky-500">{s.url}</span>
                                    <button type="button" onClick={() => navigator.clipboard?.writeText(s.url)} className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-semibold shrink-0 cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                                        <Copy className="h-2.5 w-2.5" /> Copy!
                                    </button>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <span><span style={{ color: 'var(--text-muted)' }}>Cost/Lead: </span><span className="font-semibold tabular-nums">{s.cost}</span></span>
                                    <div className="inline-flex items-center gap-1.5">
                                        <button type="button" onClick={() => openEditModal(s)} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 cursor-pointer" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                                        <button type="button" onClick={() => setDeleteSource(s)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 cursor-pointer" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {(addOpen || editSource) && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[3px] p-4"
                    onClick={() => {
                        setAddOpen(false);
                        setEditSource(null);
                    }}
                >
                    <div
                        className="animate-popover w-full max-w-md rounded-xl border shadow-2xl overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                                {editSource ? 'Edit Source' : 'Add a New Source'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setAddOpen(false);
                                    setEditSource(null);
                                }}
                                className="rounded-lg p-1 hover:bg-black/10 cursor-pointer"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <form onSubmit={editSource ? handleEditSubmit : handleAddSubmit} className="p-5 space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Source Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full rounded-lg border px-3 py-2 text-xs outline-none"
                                    style={controlStyle}
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Cost Per Lead</label>
                                <input
                                    type="number"
                                    value={form.cost}
                                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                                    className="w-full rounded-lg border px-3 py-2 text-xs outline-none"
                                    style={controlStyle}
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Status</label>
                                <div className="inline-flex items-center gap-2">
                                    {['Active', 'Inactive'].map((st) => (
                                        <button
                                            key={st}
                                            type="button"
                                            onClick={() => setForm({ ...form, status: st })}
                                            className="rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-colors"
                                            style={{
                                                backgroundColor: form.status === st ? '#4b5563' : 'var(--bg-card)',
                                                color: form.status === st ? '#ffffff' : 'var(--text-secondary)',
                                                border: '1px solid var(--border-subtle)',
                                            }}
                                        >
                                            {st}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAddOpen(false);
                                        setEditSource(null);
                                    }}
                                    className="rounded-xl border px-5 py-2.5 text-xs font-bold cursor-pointer transition-colors"
                                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="rounded-xl px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
                                    {editSource ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            <ConfirmModal
                open={Boolean(deleteSource)}
                onClose={() => setDeleteSource(null)}
                onConfirm={handleConfirmDelete}
                title="Are you sure?"
                message="Do you want to delete this source?"
                confirmText="Yes, Delete it!"
                cancelText="Cancel"
                tone="warning"
            />
        </AppLayout>
    );
}
