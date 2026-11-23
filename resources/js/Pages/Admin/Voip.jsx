import React, { useState, useMemo } from 'react';
import CustomSelect from '../../Components/CustomSelect';
import { Head } from '@inertiajs/react';
import { Search, RotateCcw, PhoneIncoming, PhoneOutgoing, Play, Download, FileText, MoreVertical } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';
import UserAvatar from '../../Components/UserAvatar';

const VOIP_CALLS = [
    { id: 1, dialled: '1000', customer: 'Dr. Gilbert Igboaka', dialling: '07969951731', owner: 'Gurpreet Barpagga', caller: 'Dr. Gilbert Igboaka', contactedAt: '11-11-2026 07:57:43', direction: 'Inbound', status: 'ANSWERED', duration: '15 min 12 sec', hasMedia: true },
    { id: 2, dialled: '07708187473', customer: 'Karen Martey', dialling: '1003', owner: 'Vanessa Timbal', caller: 'Vanessa Amistoso Timbal', contactedAt: '02-11-2026 03:45:56', direction: 'Outbound', status: 'MISSED', duration: '0 sec', hasMedia: false },
    { id: 3, dialled: '07456802800', customer: 'Ieva Kavaliauskaite', dialling: '1003', owner: 'Vanessa Timbal', caller: 'Vanessa Amistoso Timbal', contactedAt: '02-11-2026 03:45:38', direction: 'Outbound', status: 'MISSED', duration: '0 sec', hasMedia: false },
    { id: 4, dialled: '07908026987', customer: 'Carla Grantham', dialling: '1003', owner: 'Vanessa Timbal', caller: 'Vanessa Amistoso Timbal', contactedAt: '02-11-2026 03:45:10', direction: 'Outbound', status: 'MISSED', duration: '0 sec', hasMedia: false },
    { id: 5, dialled: '07724802029', customer: 'Julie Dryden', dialling: '1003', owner: 'Vanessa Timbal', caller: 'Vanessa Amistoso Timbal', contactedAt: '02-11-2026 03:43:44', direction: 'Outbound', status: 'ANSWERED', duration: '2 sec', hasMedia: true },
    { id: 6, dialled: '07980888226', customer: 'Tanveer Nazran', dialling: '1001', owner: 'Gurpreet Barpagga', caller: 'Gurpreet Barpagga', contactedAt: '02-11-2026 03:41:52', direction: 'Outbound', status: 'ANSWERED', duration: '1 min 38 sec', hasMedia: true },
];

export default function Voip({ title = 'VoIP' }) {
    const [tab, setTab] = useState('calls');
    const [direction, setDirection] = useState('All');
    const [mediaFilter, setMediaFilter] = useState('All');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [callerSearch, setCallerSearch] = useState('');

    const filtered = useMemo(() => {
        if (tab === 'requests') return [];
        const q = callerSearch.trim().toLowerCase();
        return VOIP_CALLS.filter((c) => {
            if (direction !== 'All' && c.direction !== direction) return false;
            if (mediaFilter !== 'All' && !c.hasMedia) return false;
            if (q && !c.customer.toLowerCase().includes(q) && !c.dialled.includes(q) && !c.caller.toLowerCase().includes(q)) return false;
            return true;
        });
    }, [tab, direction, mediaFilter, callerSearch]);

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
                        Inbound & outbound call logs, recordings, and transcripts
                    </p>
                </div>

                {/* Tabs */}
                <div className="inline-flex rounded-xl border p-1 gap-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <button
                        type="button"
                        onClick={() => setTab('calls')}
                        className="rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                        style={{
                            backgroundColor: tab === 'calls' ? 'var(--accent)' : 'transparent',
                            color: tab === 'calls' ? '#fff' : 'var(--text-secondary)',
                        }}
                    >
                        VOIP Calls
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('requests')}
                        className="rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                        style={{
                            backgroundColor: tab === 'requests' ? 'var(--accent)' : 'transparent',
                            color: tab === 'requests' ? '#fff' : 'var(--text-secondary)',
                        }}
                    >
                        Call History Requests
                    </button>
                </div>

                {/* Filter Bar */}
                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                value={callerSearch}
                                onChange={(e) => setCallerSearch(e.target.value)}
                                placeholder="Search number or customer..."
                                className="w-full rounded-lg border pl-8 pr-3 py-2 text-xs outline-none"
                                style={controlStyle}
                            />
                        </div>

                        <CustomSelect value={direction} onChange={(e) => setDirection(e.target.value)} style={controlStyle} options={[{"label":"Direction: All","value":"All"},{"label":"Inbound","value":"Inbound"},{"label":"Outbound","value":"Outbound"}]} />

                        <CustomSelect value={mediaFilter} onChange={(e) => setMediaFilter(e.target.value)} style={controlStyle} options={[{"label":"Action / Media: All Media","value":"All"},{"label":"Has Recording","value":"Has Recording"},{"label":"Has Transcript","value":"Has Transcript"}]} />

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setDirection('All');
                                    setMediaFilter('All');
                                    setCallerSearch('');
                                }}
                                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer"
                                style={controlStyle}
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Table */}
                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-3 py-3 font-bold uppercase">Dialled Number</th>
                                    <th className="px-3 py-3 font-bold uppercase">Customer</th>
                                    <th className="px-3 py-3 font-bold uppercase">Dialling Number</th>
                                    <th className="px-3 py-3 font-bold uppercase">Owner</th>
                                    <th className="px-3 py-3 font-bold uppercase">Caller</th>
                                    <th className="px-3 py-3 font-bold uppercase">Contacted At</th>
                                    <th className="px-3 py-3 font-bold uppercase">Direction</th>
                                    <th className="px-3 py-3 font-bold uppercase">Call Status</th>
                                    <th className="px-3 py-3 font-bold uppercase">Total Duration</th>
                                    <th className="px-3 py-3 font-bold uppercase text-right">Recording / Transcript</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="px-4 py-10 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                                            No call records found
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((c) => (
                                        <tr key={c.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-primary)' }}>{c.dialled}</td>
                                            <td className="px-3 py-2.5 font-semibold" style={{ color: 'var(--accent-text)' }}>{c.customer}</td>
                                            <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{c.dialling}</td>
                                            <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="inline-flex items-center gap-2">
                                                    <UserAvatar name={c.owner} />
                                                    <span>{c.owner}</span>
                                                </span>
                                            </td>
                                            <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{c.caller}</td>
                                            <td className="px-3 py-2.5 tabular-nums whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{c.contactedAt}</td>
                                            <td className="px-3 py-2.5">
                                                <span className={`inline-flex items-center gap-1 font-semibold ${c.direction === 'Inbound' ? 'text-sky-500' : 'text-emerald-500'}`}>
                                                    {c.direction === 'Inbound' ? <PhoneIncoming className="h-3 w-3" /> : <PhoneOutgoing className="h-3 w-3" />}
                                                    {c.direction}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2.5">
                                                <Badge tone={c.status === 'ANSWERED' ? 'emerald' : 'amber'}>{c.status}</Badge>
                                            </td>
                                            <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-secondary)' }}>{c.duration}</td>
                                            <td className="px-3 py-2.5 text-right whitespace-nowrap">
                                                {c.hasMedia ? (
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <button type="button" className="rounded-md bg-sky-500/15 p-1.5 text-sky-500 hover:bg-sky-500/25 cursor-pointer" title="Play">
                                                            <Play className="h-3 w-3" />
                                                        </button>
                                                        <button type="button" className="rounded-md bg-emerald-500/15 p-1.5 text-emerald-500 hover:bg-emerald-500/25 cursor-pointer" title="Download">
                                                            <Download className="h-3 w-3" />
                                                        </button>
                                                        <button type="button" className="rounded-md border p-1.5 cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }} title="Transcript">
                                                            <FileText className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                        {filtered.map((c) => (
                            <div key={c.id} className="rounded-2xl border p-4 space-y-3 shadow-sm" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="font-inter-black text-sm truncate" style={{ color: 'var(--accent-text)' }}>{c.customer}</div>
                                    <Badge tone={c.status === 'ANSWERED' ? 'emerald' : 'amber'}>{c.status}</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: 'var(--bg-card)' }}>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Direction</div>
                                        <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>{c.direction}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Owner</div>
                                        <div className="text-xs font-semibold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>{c.owner}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Duration</div>
                                        <div className="text-xs font-semibold tabular-nums mt-0.5" style={{ color: 'var(--text-secondary)' }}>{c.duration}</div>
                                    </div>
                                </div>
                                <div className="relative flex justify-end pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                    {c.hasMedia ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setOpenMenuId(openMenuId === c.id ? null : c.id)}
                                                className="rounded-lg border p-1.5 cursor-pointer"
                                                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                                aria-label="Actions"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                            {openMenuId === c.id && (
                                                <div
                                                    className="animate-popover absolute right-0 bottom-full mb-1.5 w-44 z-30 rounded-xl border p-1 shadow-xl text-xs"
                                                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                                >
                                                    <button type="button" onClick={() => setOpenMenuId(null)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-medium hover:bg-black/5 cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                                                        <Play className="h-3.5 w-3.5 text-sky-500" /> Play Recording
                                                    </button>
                                                    <button type="button" onClick={() => setOpenMenuId(null)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-medium hover:bg-black/5 cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                                                        <Download className="h-3.5 w-3.5 text-emerald-500" /> Download Audio
                                                    </button>
                                                    <button type="button" onClick={() => setOpenMenuId(null)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-medium hover:bg-black/5 cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                                                        <FileText className="h-3.5 w-3.5 text-amber-500" /> View Transcript
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>—</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
