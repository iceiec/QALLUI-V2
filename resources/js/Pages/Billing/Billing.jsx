import React, { useState } from 'react';
import CustomSelect from '../../Components/CustomSelect';
import { Head } from '@inertiajs/react';
import { Search, Download, Edit3, ChevronDown } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';
import UserAvatar from '../../Components/UserAvatar';

const INVOICES = [
    { id: 'Q20240819-13', advisor: 'Leanne Devine', status: 'Due', date: '19-08-2024 14:47', amount: '£7,597.46' },
    { id: 'Q20240819-12', advisor: 'Leanne Devine', status: 'Due', date: '19-08-2024 14:19', amount: '£9,822.35' },
    { id: 'Q20240313-11', advisor: 'Richard Hadley', status: 'Due', date: '19-08-2024 14:21', amount: '£1,252.54' },
    { id: 'Q20231120-10', advisor: 'Pru Admin', status: 'Due', date: '11-03-2024 10:33', amount: '£130.98' },
    { id: 'Q20230616-9', advisor: 'Pru Admin', status: 'Due', date: '16-06-2023 12:12', amount: '£97.20' },
];

export default function Billing() {
    const [clawFund, setClawFund] = useState('No');
    const [search, setSearch] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [expandedMobileKey, setExpandedMobileKey] = useState(null);

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const filtered = INVOICES.filter(
        (inv) => !search || inv.id.toLowerCase().includes(search.toLowerCase()) || inv.advisor.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Billing & Invoices" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Billing &amp; Invoices
                </h1>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    {/* Left: Invoice Details Form */}
                    <Card key={selectedInvoice?.id || 'new'} className="lg:col-span-4" hoverable={false}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>
                                {selectedInvoice ? `Edit Invoice #${selectedInvoice.id}` : 'Invoice Details'}
                            </h2>
                            {selectedInvoice && (
                                <button type="button" onClick={() => setSelectedInvoice(null)} className="text-[11px] font-semibold cursor-pointer" style={{ color: 'var(--accent-text)' }}>
                                    New Invoice
                                </button>
                            )}
                        </div>
                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Advisor</label>
                                <CustomSelect defaultValue={selectedInvoice?.advisor || 'Leanne Devine'} style={controlStyle} options={["Leanne Devine","Richard Hadley","Pru Admin","Tom Tovey","Lawrence Bracken"]} />
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Start Date</label>
                                    <input type="text" placeholder="mm/dd/yyyy" className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>End Date</label>
                                    <input type="text" placeholder="mm/dd/yyyy" className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Bill To</label>
                                <CustomSelect style={controlStyle} options={["Mrs Kusi - 14 High Street"]} />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Claw Fund Deduction</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Yes', 'No'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setClawFund(opt)}
                                            className="rounded-lg border py-1.5 font-semibold cursor-pointer"
                                            style={{
                                                backgroundColor: clawFund === opt ? 'var(--accent-soft)' : 'var(--bg-surface)',
                                                borderColor: clawFund === opt ? 'var(--accent)' : 'var(--border-subtle)',
                                                color: clawFund === opt ? 'var(--accent-text)' : 'var(--text-secondary)',
                                            }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Claw Fund Brought Forward</label>
                                <input type="number" defaultValue={0} className="w-full rounded-lg border px-3 py-2 outline-none" style={controlStyle} />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Status</label>
                                <CustomSelect defaultValue={selectedInvoice?.status || 'Due'} style={controlStyle} options={["Due","Paid"]} />
                            </div>
                            <button type="button" onClick={() => setSelectedInvoice(null)} className="w-full rounded-lg py-2 font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                                {selectedInvoice ? 'Update Invoice' : 'Generate'}
                            </button>
                        </div>
                    </Card>

                    {/* Right: Recent Invoices Table */}
                    <Card className="lg:col-span-8" padding="p-0 overflow-hidden" hoverable={false}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Recent Invoices</h2>
                            <div className="relative w-full sm:w-56">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none"
                                    style={controlStyle}
                                />
                            </div>
                        </div>

                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                        <th className="px-4 py-3 font-bold uppercase">Invoice #</th>
                                        <th className="px-4 py-3 font-bold uppercase">Advisor</th>
                                        <th className="px-4 py-3 font-bold uppercase text-center">Status</th>
                                        <th className="px-4 py-3 font-bold uppercase">Invoice Date</th>
                                        <th className="px-4 py-3 font-bold uppercase text-right">Amount</th>
                                        <th className="px-4 py-3 font-bold uppercase text-right">Action</th>
                                        <th className="px-4 py-3 font-bold uppercase text-right">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((inv) => (
                                        <tr key={inv.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="px-4 py-2.5 tabular-nums font-semibold" style={{ color: 'var(--text-primary)' }}>{inv.id}</td>
                                            <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="inline-flex items-center gap-2"><UserAvatar name={inv.advisor} /><span>{inv.advisor}</span></span>
                                            </td>
                                            <td className="px-4 py-2.5 text-center"><Badge tone="rose">{inv.status}</Badge></td>
                                            <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{inv.date}</td>
                                            <td className="px-4 py-2.5 text-right tabular-nums font-inter-black" style={{ color: 'var(--text-primary)' }}>{inv.amount}</td>
                                            <td className="px-4 py-2.5 text-right">
                                                <button type="button" onClick={() => setSelectedInvoice(inv)} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 hover:bg-amber-500/25 cursor-pointer" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                                            </td>
                                            <td className="px-4 py-2.5 text-right">
                                                <button type="button" className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2.5 py-1 text-[11px] font-bold text-sky-500 hover:bg-sky-500/25 cursor-pointer">
                                                    <Download className="h-3 w-3" /> PDF
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="divide-y divide-slate-200/80 md:hidden">
                            {filtered.map((inv) => {
                                const isOpen = expandedMobileKey === inv.id;
                                return (
                                    <div key={inv.id} className="p-3 text-xs">
                                        <button
                                            type="button"
                                            onClick={() => setExpandedMobileKey(isOpen ? null : inv.id)}
                                            className="flex w-full items-center justify-between gap-2 text-left cursor-pointer"
                                        >
                                            <div className="min-w-0">
                                                <div className="font-semibold tabular-nums truncate" style={{ color: 'var(--text-primary)' }}>{inv.id}</div>
                                                <div className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>{inv.advisor} • {inv.date}</div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="font-inter-black tabular-nums" style={{ color: 'var(--text-primary)' }}>{inv.amount}</span>
                                                <Badge tone="rose">{inv.status}</Badge>
                                                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                            </div>
                                        </button>
                                        {isOpen && (
                                            <div className="mt-3 space-y-2 border-t pt-2.5" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <div className="flex items-center justify-between gap-2">
                                                    <span style={{ color: 'var(--text-muted)' }}>Advisor</span>
                                                    <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                                                        <UserAvatar name={inv.advisor} />
                                                        <span>{inv.advisor}</span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between gap-2">
                                                    <span style={{ color: 'var(--text-muted)' }}>Invoice Date</span>
                                                    <span className="tabular-nums" style={{ color: 'var(--text-secondary)' }}>{inv.date}</span>
                                                </div>
                                                <div className="flex items-center justify-end gap-2 pt-1">
                                                    <button type="button" onClick={() => setSelectedInvoice(inv)} className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-500 hover:bg-amber-500/25 cursor-pointer">
                                                        <Edit3 className="h-3 w-3" /> Edit
                                                    </button>
                                                    <button type="button" className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2.5 py-1 text-[11px] font-bold text-sky-500 hover:bg-sky-500/25 cursor-pointer">
                                                        <Download className="h-3 w-3" /> PDF
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
            </div>
        </AppLayout>
    );
}
