import React, { useState } from 'react';
import CustomSelect from '@/components/CustomSelect';
import { Head } from '@inertiajs/react';
import { Search, Edit3 } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';

const BILL_TO_ROWS = [
    { id: 2, name: 'Sportshield Limited', address: '3 Siskin Drive', city: 'Coventry', county: 'West Midlands', postcode: 'CV3 4FJ', country: 'United Kingdom' },
    { id: 1, name: 'Mrs Kuxi', address: '14 High Street', city: 'Kuxi Village', county: 'KuxiTown', postcode: 'KT3 4GH', country: 'United Kingdom' },
];

const EMPTY_FORM = { name: '', address: '', city: '', county: '', postcode: '', country: 'United Kingdom' };

export default function BillTo() {
    const [rows, setRows] = useState(BILL_TO_ROWS);
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const filtered = rows.filter((r) => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.city.toLowerCase().includes(search.toLowerCase()));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        if (editingId !== null) {
            setRows((prev) => prev.map((r) => (r.id === editingId ? { ...r, ...form } : r)));
            setEditingId(null);
        } else {
            const nextId = rows.reduce((max, r) => Math.max(max, r.id), 0) + 1;
            setRows((prev) => [{ id: nextId, ...form }, ...prev]);
        }
        setForm(EMPTY_FORM);
    };

    const startEdit = (row) => {
        setEditingId(row.id);
        setForm({
            name: row.name,
            address: row.address,
            city: row.city,
            county: row.county || '',
            postcode: row.postcode,
            country: row.country || 'United Kingdom',
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
    };

    return (
        <AppLayout>
            <Head title="Bill To" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Bill To
                </h1>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <Card className="lg:col-span-4" hoverable={false}>
                        <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
                            {editingId !== null ? 'Edit Bill To' : 'Add New Bill To'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                            <div><label className="block font-semibold mb-1">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} /></div>
                            <div><label className="block font-semibold mb-1">Address</label><textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} /></div>
                            <div><label className="block font-semibold mb-1">City</label><input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} /></div>
                            <div><label className="block font-semibold mb-1">County</label><input type="text" value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} /></div>
                            <div><label className="block font-semibold mb-1">Postcode</label><input type="text" value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })} className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} /></div>
                            <div><label className="block font-semibold mb-1">Country</label><CustomSelect value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} style={controlStyle} options={["United Kingdom"]} /></div>
                            <div className="flex items-center gap-2">
                                <button type="submit" className="flex-1 rounded-lg py-2 font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                                    {editingId !== null ? 'Update' : 'Submit'}
                                </button>
                                {editingId !== null && (
                                    <button type="button" onClick={cancelEdit} className="rounded-lg border px-4 py-2 font-semibold cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </Card>

                    <Card className="lg:col-span-8" padding="p-0 overflow-hidden" hoverable={false}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Bill To Entries</h2>
                            <div className="relative w-full sm:w-52">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none" style={controlStyle} />
                            </div>
                        </div>

                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                        <th className="px-3 py-3 font-bold uppercase">ID</th>
                                        <th className="px-3 py-3 font-bold uppercase">Name</th>
                                        <th className="px-3 py-3 font-bold uppercase">Address</th>
                                        <th className="px-3 py-3 font-bold uppercase">City</th>
                                        <th className="px-3 py-3 font-bold uppercase">Postcode</th>
                                        <th className="px-3 py-3 font-bold uppercase">Country</th>
                                        <th className="px-3 py-3 font-bold uppercase text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((r) => (
                                        <tr key={r.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="px-3 py-2.5 font-bold">{r.id}</td>
                                            <td className="px-3 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</td>
                                            <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{r.address}</td>
                                            <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{r.city}</td>
                                            <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{r.postcode}</td>
                                            <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{r.country}</td>
                                            <td className="px-3 py-2.5 text-right">
                                                <button type="button" onClick={() => startEdit(r)} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 hover:bg-amber-500/25 cursor-pointer" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5 p-3 md:hidden">
                            {filtered.map((r) => (
                                <div key={r.id} className="rounded-xl border p-3.5 space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{r.name}</div>
                                            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>ID #{r.id}</div>
                                        </div>
                                        <button type="button" onClick={() => startEdit(r)} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 cursor-pointer" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <div><span style={{ color: 'var(--text-muted)' }}>Address: </span><span style={{ color: 'var(--text-secondary)' }}>{r.address}</span></div>
                                        <div><span style={{ color: 'var(--text-muted)' }}>City: </span><span style={{ color: 'var(--text-secondary)' }}>{r.city}</span></div>
                                        <div><span style={{ color: 'var(--text-muted)' }}>Postcode: </span><span className="tabular-nums" style={{ color: 'var(--text-secondary)' }}>{r.postcode}</span></div>
                                        <div><span style={{ color: 'var(--text-muted)' }}>Country: </span><span style={{ color: 'var(--text-secondary)' }}>{r.country}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
