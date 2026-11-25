import React, { useState } from 'react';
import CustomSelect from '@/components/CustomSelect';
import { Head } from '@inertiajs/react';
import { Download, Search, Eye, Phone, MessageSquare, FileText, Users, Layers, PoundSterling, Filter, BarChart3, Table2 } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import DonutChart from '@/components/DonutChart';
import UserAvatar from '@/components/UserAvatar';

const EXEC_KPIS = [
    { label: 'TOTAL RECORDS ACCESSED', value: '20,632', delta: '-39.17%', positive: false, icon: FileText },
    { label: 'LEADS UPDATED', value: '484', delta: '-81.03%', positive: false, icon: FileText },
    { label: 'TOTAL CALLS', value: '18,297', delta: '+2,285.53%', positive: true, sub: '335:19:53', icon: Phone },
    { label: 'TOTAL SMS', value: '3,342', delta: '-34.55%', positive: false, icon: MessageSquare },
    { label: 'TOTAL NOTES', value: '134,125', delta: '+116.97%', positive: true, icon: FileText },
    { label: 'TOTAL LEADS ACQUIRED', value: '39,603', delta: '+12,314.73%', positive: true, icon: Users },
    { label: 'TOTAL STATIC LEADS', value: '7,351', delta: '0.00%', positive: true, icon: Layers },
    { label: 'TOTAL COMMISSION', value: 'Â£532,620.25', delta: '-12.49%', positive: false, icon: PoundSterling },
];

const RECORDS_PER_USER = [
    { name: 'Lawrence Bracken', count: 8092, color: '#00B073' },
    { name: 'Leanne Devine', count: 5973, color: '#0EA5E9' },
    { name: 'Tom Tovey', count: 2950, color: '#F59E0B' },
    { name: 'Gurpreet Barpagga', count: 2880, color: '#8B5CF6' },
    { name: 'Raeez Jassat', count: 489, color: '#14B8A6' },
    { name: 'Tony Davis', count: 388, color: '#64748B' },
];

const USER_ACTIVITY = [
    { name: 'Gurpreet Barpagga', accessed: 7878, updated: 100, calls: 770, duration: '184.62', sms: 55, notes: 4845, acquired: 693, staticLeads: 213, commission: 'Â£15,472.94' },
    { name: 'Lawrence Bracken', accessed: 8092, updated: 114, calls: 7113, duration: '7482.87', sms: 694, notes: 11033, acquired: 3951, staticLeads: 44, commission: 'Â£159,468.14' },
    { name: 'Leanne Devine', accessed: 5972, updated: 50, calls: 4510, duration: '5923.42', sms: 1712, notes: 15537, acquired: 2621, staticLeads: 135, commission: 'Â£186,044.03' },
    { name: 'Raeez Jassat', accessed: 489, updated: 7, calls: 0, duration: '0', sms: 2, notes: 156, acquired: 155, staticLeads: 24, commission: 'Â£19,308.57' },
    { name: 'Tom Tovey', accessed: 2944, updated: 212, calls: 6404, duration: '6528.98', sms: 489, notes: 13198, acquired: 3015, staticLeads: 185, commission: 'Â£120,620.17' },
];

const SALES_PER_PROVIDER = [
    { name: 'Vitality LIFE', amount: 'Â£362,400', pct: 68, color: '#00B073' },
    { name: 'Aviva', amount: 'Â£64,200', pct: 12, color: '#0EA5E9' },
    { name: 'Vitality Health', amount: 'Â£31,500', pct: 6, color: '#F59E0B' },
    { name: 'L&G', amount: 'Â£18,900', pct: 4, color: '#8B5CF6' },
    { name: 'Royal London', amount: 'Â£14,200', pct: 3, color: '#14B8A6' },
];

const COMMISSION_PER_USER = [
    { name: 'Leanne Devine', amount: 'Â£186,044.03', pct: 92, color: '#00B073' },
    { name: 'Lawrence Bracken', amount: 'Â£159,468.14', pct: 79, color: '#0EA5E9' },
    { name: 'Tom Tovey', amount: 'Â£120,620.17', pct: 60, color: '#F59E0B' },
    { name: 'Raeez Jassat', amount: 'Â£19,308.57', pct: 12, color: '#8B5CF6' },
    { name: 'Gurpreet Barpagga', amount: 'Â£15,472.94', pct: 10, color: '#14B8A6' },
];

function ChartTableToggle({ mode, onChange }) {
    return (
        <div className="inline-flex rounded-lg border p-0.5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            {[
                { id: 'chart', label: 'Chart', icon: BarChart3 },
                { id: 'table', label: 'Table', icon: Table2 },
            ].map((item) => {
                const Icon = item.icon;
                const active = mode === item.id;
                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onChange(item.id)}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold cursor-pointer"
                        style={{
                            backgroundColor: active ? 'var(--accent)' : 'transparent',
                            color: active ? '#fff' : 'var(--text-secondary)',
                        }}
                    >
                        <Icon className="h-3 w-3" />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default function DailyReporting({ title = 'Overall Statistics' }) {
    const [tab, setTab] = useState('executive');
    const [userSearch, setUserSearch] = useState('');
    const [chartModes, setChartModes] = useState({});

    const getMode = (key) => chartModes[key] || 'chart';
    const setMode = (key, val) => setChartModes((prev) => ({ ...prev, [key]: val }));

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const filteredActivity = USER_ACTIVITY.filter(
        (u) => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Daily Reporting" />
            <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            {title}
                        </h1>
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
                            style={{ backgroundColor: 'var(--accent)' }}
                        >
                            <Download className="h-3.5 w-3.5" /> Download Report
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <input type="text" defaultValue="18 Nov 2024 - 18 Nov 2026" className="rounded-lg border px-3 py-1.5 text-xs outline-none" style={controlStyle} />
                        <CustomSelect style={controlStyle} options={["Overall","This Month"]} />
                        <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer" style={controlStyle}>
                            <Filter className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} /> Apply Filters
                        </button>
                    </div>
                </div>

                {/* Report Tabs */}
                <div className="inline-flex flex-wrap rounded-xl border p-1 gap-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    {[
                        { id: 'executive', label: 'Executive Summary' },
                        { id: 'sales', label: 'Sales Report' },
                        { id: 'leadgen', label: 'Lead Generation' },
                        { id: 'accounting', label: 'Accounting' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setTab(t.id)}
                            className="rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                            style={{
                                backgroundColor: tab === t.id ? 'var(--accent)' : 'transparent',
                                color: tab === t.id ? '#fff' : 'var(--text-secondary)',
                            }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {tab === 'executive' ? (
                    <div className="space-y-4">
                        {/* 8 KPI Cards */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {EXEC_KPIS.map((k) => {
                                const Icon = k.icon;
                                return (
                                    <Card key={k.label} padding="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                                    {k.label}
                                                </div>
                                                <div className="mt-1.5 flex items-baseline gap-2">
                                                    <span className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>{k.value}</span>
                                                    <span className={`text-[11px] font-bold ${k.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        {k.delta}
                                                    </span>
                                                </div>
                                                {k.sub && <div className="text-[10px] mt-0.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{k.sub}</div>}
                                            </div>
                                            <div className="rounded-full p-2.5" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* 3 Summary Charts */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            <Card className="flex flex-col items-center justify-between">
                                <div className="w-full flex items-center justify-between mb-3">
                                    <div>
                                        <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Total Records Count</div>
                                        <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>12,613</div>
                                    </div>
                                </div>
                                <DonutChart
                                    size={156}
                                    strokeWidth={20}
                                    centerTitle="12,613"
                                    centerSubtitle="Records"
                                    segments={[
                                        { value: 68, color: '#64748B' },
                                        { value: 18, color: '#EF4444' },
                                        { value: 8, color: '#F59E0B' },
                                        { value: 6, color: '#00B073' },
                                    ]}
                                />
                                <div className="mt-4 flex flex-wrap justify-center gap-3 text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-500" /> FF Partial</span>
                                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> New Leads</span>
                                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Policy History</span>
                                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> On Cover</span>
                                </div>
                            </Card>

                            <Card className="flex flex-col items-center justify-between">
                                <div className="w-full flex items-center justify-between mb-3">
                                    <div>
                                        <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Compliance Records</div>
                                        <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>649</div>
                                    </div>
                                </div>
                                <DonutChart
                                    size={156}
                                    strokeWidth={24}
                                    centerTitle="88.4%"
                                    centerSubtitle="Approved"
                                    segments={[
                                        { value: 88.4, color: '#00B073' },
                                        { value: 11.6, color: '#EF4444' },
                                    ]}
                                />
                                <div className="mt-4 flex justify-center gap-5 text-[11px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Approved (574)</span>
                                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Declined (75)</span>
                                </div>
                            </Card>

                            <Card className="flex flex-col justify-between">
                                <div>
                                    <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Achieved Commission</div>
                                    <div className="font-inter-black text-2xl mt-0.5" style={{ color: 'var(--text-primary)' }}>Â£532,620.25</div>
                                </div>
                                <div className="my-4 flex flex-col items-center">
                                    <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                        <div className="h-full rounded-full" style={{ width: '82%', backgroundColor: 'var(--accent)' }} />
                                    </div>
                                    <div className="mt-2 flex w-full justify-between text-xs">
                                        <span style={{ color: 'var(--text-muted)' }}>Target: Â£650,000.00</span>
                                        <span className="font-bold" style={{ color: 'var(--accent-text)' }}>81.9%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Remaining</span>
                                    <span className="font-inter-black" style={{ color: 'var(--text-primary)' }}>Â£117,379.75</span>
                                </div>
                            </Card>
                        </div>

                        {/* Records Accessed Per User */}
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Records Accessed Per User</div>
                                    <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>20,632</div>
                                </div>
                                <ChartTableToggle mode={getMode('recordsUser')} onChange={(m) => setMode('recordsUser', m)} />
                            </div>
                            {getMode('recordsUser') === 'chart' ? (
                                <div className="space-y-3">
                                    {RECORDS_PER_USER.map((u) => (
                                        <div key={u.name} className="space-y-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                    <UserAvatar name={u.name} />
                                                    <span>{u.name}</span>
                                                </span>
                                                <span className="font-inter-black tabular-nums" style={{ color: 'var(--text-primary)' }}>{u.count.toLocaleString()}</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                                <div className="h-full rounded-full" style={{ width: `${(u.count / 8092) * 100}%`, backgroundColor: u.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                <th className="py-2 font-bold uppercase">User</th>
                                                <th className="py-2 font-bold uppercase text-right">Records Accessed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {RECORDS_PER_USER.map((u) => (
                                                <tr key={u.name} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <td className="py-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                        <span className="inline-flex items-center gap-2"><UserAvatar name={u.name} /><span>{u.name}</span></span>
                                                    </td>
                                                    <td className="py-2 text-right font-inter-black tabular-nums">{u.count.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Card>

                        {/* User Activity Report Table */}
                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>User Activity Report</h2>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        value={userSearch}
                                        onChange={(e) => setUserSearch(e.target.value)}
                                        placeholder="Search by name..."
                                        className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none"
                                        style={controlStyle}
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="px-4 py-3 font-bold uppercase">Name</th>
                                            <th className="px-3 py-3 font-bold uppercase text-right">Accessed</th>
                                            <th className="px-3 py-3 font-bold uppercase text-right">Updated</th>
                                            <th className="px-3 py-3 font-bold uppercase text-right">Calls</th>
                                            <th className="px-3 py-3 font-bold uppercase text-right">Duration (min)</th>
                                            <th className="px-3 py-3 font-bold uppercase text-right">SMS</th>
                                            <th className="px-3 py-3 font-bold uppercase text-right">Notes</th>
                                            <th className="px-3 py-3 font-bold uppercase text-right">Commission</th>
                                            <th className="px-4 py-3 font-bold uppercase text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredActivity.map((u) => (
                                            <tr key={u.name} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className="px-4 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                    <span className="inline-flex items-center gap-2"><UserAvatar name={u.name} /><span>{u.name}</span></span>
                                                </td>
                                                <td className="px-3 py-2.5 text-right tabular-nums">{u.accessed.toLocaleString()}</td>
                                                <td className="px-3 py-2.5 text-right tabular-nums">{u.updated}</td>
                                                <td className="px-3 py-2.5 text-right tabular-nums">{u.calls.toLocaleString()}</td>
                                                <td className="px-3 py-2.5 text-right tabular-nums">{u.duration}</td>
                                                <td className="px-3 py-2.5 text-right tabular-nums">{u.sms}</td>
                                                <td className="px-3 py-2.5 text-right tabular-nums">{u.notes.toLocaleString()}</td>
                                                <td className="px-3 py-2.5 text-right font-inter-black tabular-nums" style={{ color: 'var(--accent-text)' }}>{u.commission}</td>
                                                <td className="px-4 py-2.5 text-right">
                                                    <button type="button" className="rounded-md border p-1.5 cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }} title="View"><Eye className="h-3.5 w-3.5" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                ) : tab === 'sales' ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <Card>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Sales Per Provider</div>
                                        <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>Â£532,620.25</div>
                                    </div>
                                    <ChartTableToggle mode={getMode('salesProv')} onChange={(m) => setMode('salesProv', m)} />
                                </div>
                                {getMode('salesProv') === 'chart' ? (
                                    <div className="space-y-3">
                                        {SALES_PER_PROVIDER.map((p) => (
                                            <div key={p.name} className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                                                    <span className="font-inter-black tabular-nums" style={{ color: 'var(--text-primary)' }}>{p.amount}</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                                    <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                <th className="py-2 font-bold uppercase">Provider</th>
                                                <th className="py-2 font-bold uppercase text-right">Sales</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {SALES_PER_PROVIDER.map((p) => (
                                                <tr key={p.name} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <td className="py-2 font-semibold">{p.name}</td>
                                                    <td className="py-2 text-right font-inter-black tabular-nums">{p.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </Card>

                            <Card>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Commission Per User</div>
                                        <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>Â£532,620.25</div>
                                    </div>
                                    <ChartTableToggle mode={getMode('commUser')} onChange={(m) => setMode('commUser', m)} />
                                </div>
                                {getMode('commUser') === 'chart' ? (
                                    <div className="space-y-3">
                                        {COMMISSION_PER_USER.map((u) => (
                                            <div key={u.name} className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                        <UserAvatar name={u.name} />
                                                        <span>{u.name}</span>
                                                    </span>
                                                    <span className="font-inter-black tabular-nums" style={{ color: 'var(--text-primary)' }}>{u.amount}</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                                    <div className="h-full rounded-full" style={{ width: `${u.pct}%`, backgroundColor: u.color }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                <th className="py-2 font-bold uppercase">User</th>
                                                <th className="py-2 font-bold uppercase text-right">Commission</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {COMMISSION_PER_USER.map((u) => (
                                                <tr key={u.name} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <td className="py-2 font-semibold"><span className="inline-flex items-center gap-2"><UserAvatar name={u.name} /><span>{u.name}</span></span></td>
                                                    <td className="py-2 text-right font-inter-black tabular-nums">{u.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </Card>
                        </div>

                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Provider Report â€” Policies by Provider</div>
                                <ChartTableToggle mode={getMode('provReport')} onChange={(m) => setMode('provReport', m)} />
                            </div>
                            {getMode('provReport') === 'chart' ? (
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 items-center">
                                    <div className="lg:col-span-2 h-36 flex items-end gap-1.5 px-2 pt-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                        {[3, 5, 2, 7, 4, 6, 3, 5, 7, 4, 2, 6, 4, 5, 3, 6].map((v, i) => (
                                            <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${(v / 7) * 100}%`, backgroundColor: i % 3 === 0 ? '#00B073' : '#F59E0B', opacity: 0.85 }} />
                                        ))}
                                    </div>
                                    <div className="space-y-1.5 text-xs">
                                        {[
                                            { name: 'Vitality LIFE', count: 402, pct: '67.8%', color: '#F59E0B' },
                                            { name: 'Aviva', count: 53, pct: '8.9%', color: '#0EA5E9' },
                                            { name: 'Vitality Health', count: 48, pct: '8.1%', color: '#00B073' },
                                            { name: 'L&G', count: 27, pct: '4.6%', color: '#8B5CF6' },
                                        ].map((p) => (
                                            <div key={p.name} className="flex items-center justify-between">
                                                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />{p.name}</span>
                                                <span className="tabular-nums font-bold">{p.count} <span style={{ color: 'var(--text-muted)' }}>({p.pct})</span></span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="py-2 font-bold uppercase">Provider</th>
                                            <th className="py-2 font-bold uppercase text-right">Policies</th>
                                            <th className="py-2 font-bold uppercase text-right">Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: 'Vitality LIFE', count: 402, pct: '67.8%' },
                                            { name: 'Aviva', count: 53, pct: '8.9%' },
                                            { name: 'Vitality Health', count: 48, pct: '8.1%' },
                                            { name: 'L&G', count: 27, pct: '4.6%' },
                                        ].map((p) => (
                                            <tr key={p.name} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className="py-2 font-semibold">{p.name}</td>
                                                <td className="py-2 text-right font-inter-black tabular-nums">{p.count}</td>
                                                <td className="py-2 text-right tabular-nums" style={{ color: 'var(--text-muted)' }}>{p.pct}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </Card>
                    </div>
                ) : tab === 'leadgen' ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <Card>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Received Leads Per Lead Source</div>
                                    <Badge tone="emerald">769 Total</Badge>
                                </div>
                                <div className="space-y-2.5 text-xs">
                                    {[
                                        { src: 'Manila', count: 349, pct: '45.4%', color: '#EF4444' },
                                        { src: 'Exchequer Risk Mgmt', count: 182, pct: '23.7%', color: '#0EA5E9' },
                                        { src: 'Qall Philippines', count: 135, pct: '17.6%', color: '#00B073' },
                                        { src: 'Beckett', count: 53, pct: '6.9%', color: '#F59E0B' },
                                    ].map((s) => (
                                        <div key={s.src} className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{s.src}</span>
                                                <span className="tabular-nums font-bold" style={{ color: 'var(--text-primary)' }}>{s.count} <span style={{ color: 'var(--text-muted)' }}>({s.pct})</span></span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                                <div className="h-full rounded-full" style={{ width: s.pct, backgroundColor: s.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Sold Leads Per Lead Source</div>
                                    <Badge tone="emerald">141 Sold</Badge>
                                </div>
                                <div className="space-y-2.5 text-xs">
                                    {[
                                        { src: 'Exchequer Risk Mgmt', count: 52, pct: '36.9%', color: '#0EA5E9' },
                                        { src: 'Qall Philippines', count: 24, pct: '17.0%', color: '#00B073' },
                                        { src: 'Beckett', count: 18, pct: '12.8%', color: '#F59E0B' },
                                        { src: 'Manila', count: 14, pct: '9.9%', color: '#EF4444' },
                                    ].map((s) => (
                                        <div key={s.src} className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{s.src}</span>
                                                <span className="tabular-nums font-bold" style={{ color: 'var(--text-primary)' }}>{s.count} <span style={{ color: 'var(--text-muted)' }}>({s.pct})</span></span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                                <div className="h-full rounded-full" style={{ width: s.pct, backgroundColor: s.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Sales Conversion by Lead Source</h2>
                                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Lead-based metric â€” each converted lead counts once.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="px-4 py-2.5 font-bold uppercase" rowSpan={2}>Salesperson</th>
                                            {['Beckett', 'Direct Call', 'Exchequer Risk Mgmt', 'Jose Contreras'].map((src) => (
                                                <th key={src} colSpan={3} className="border-l px-3 py-2 text-center font-bold uppercase" style={{ borderColor: 'var(--border-subtle)' }}>{src}</th>
                                            ))}
                                        </tr>
                                        <tr className="border-b text-[10px]" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            {[0, 1, 2, 3].map((i) => (
                                                <React.Fragment key={i}>
                                                    <th className="border-l px-2 py-1.5 text-right font-semibold" style={{ borderColor: 'var(--border-subtle)' }}>Rec.</th>
                                                    <th className="px-2 py-1.5 text-right font-semibold">Conv.</th>
                                                    <th className="px-2 py-1.5 text-right font-semibold">%</th>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: 'Gurpreet Barpagga', cols: [16, 4, '25%', 0, 0, '0%', 11, 3, '27.27%', 0, 0, '0%'] },
                                            { name: 'Lawrence Bracken', cols: [4, 1, '25%', 4, 4, '100%', 37, 16, '43.24%', 0, 0, '0%'] },
                                            { name: 'Leanne Devine', cols: [15, 0, '0%', 0, 0, '0%', 64, 19, '29.69%', 13, 7, '53.85%'] },
                                            { name: 'Raeez Jassat', cols: [0, 0, '0%', 0, 0, '0%', 2, 1, '50%', 0, 0, '0%'] },
                                            { name: 'Tom Tovey', cols: [18, 13, '72.22%', 3, 2, '66.67%', 68, 13, '19.12%', 0, 0, '0%'] },
                                        ].map((row) => (
                                            <tr key={row.name} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className="px-4 py-2.5 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                                                    <span className="inline-flex items-center gap-2"><UserAvatar name={row.name} /><span>{row.name}</span></span>
                                                </td>
                                                {row.cols.map((val, idx) => (
                                                    <td
                                                        key={idx}
                                                        className={`px-2 py-2.5 text-right tabular-nums ${idx % 3 === 0 ? 'border-l' : ''} ${idx % 3 === 2 ? 'font-bold' : ''}`}
                                                        style={idx % 3 === 0 ? { borderColor: 'var(--border-subtle)' } : undefined}
                                                    >
                                                        {val}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                            <Card padding="p-3.5"><div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Total Leads Received</div><div className="font-inter-black text-2xl mt-1" style={{ color: 'var(--text-primary)' }}>769</div></Card>
                            <Card padding="p-3.5"><div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Total Leads Converted</div><div className="font-inter-black text-2xl mt-1 text-emerald-500">141</div></Card>
                            <Card padding="p-3.5"><div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Overall Conversion Rate</div><div className="font-inter-black text-2xl mt-1 text-sky-500">18.34%</div></Card>
                            <Card padding="p-3.5"><div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Lead Sources</div><div className="font-inter-black text-2xl mt-1 text-amber-500">16</div></Card>
                        </div>

                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Won Back by Adviser &amp; Conversion</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="px-4 py-3 font-bold uppercase">Adviser</th>
                                            <th className="px-4 py-3 font-bold uppercase text-right">Won Back</th>
                                            <th className="px-4 py-3 font-bold uppercase text-right">Sales (Approved)</th>
                                            <th className="px-4 py-3 font-bold uppercase text-right">Quotes</th>
                                            <th className="px-4 py-3 font-bold uppercase text-right">Conversion %</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {['gerson junior', 'Vanessa Timbal'].map((adv) => (
                                            <tr key={adv} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className="px-4 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                    <span className="inline-flex items-center gap-2"><UserAvatar name={adv} /><span>{adv}</span></span>
                                                </td>
                                                <td className="px-4 py-2.5 text-right tabular-nums">1</td>
                                                <td className="px-4 py-2.5 text-right tabular-nums">0</td>
                                                <td className="px-4 py-2.5 text-right tabular-nums">0</td>
                                                <td className="px-4 py-2.5 text-right tabular-nums">0%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Clawback Ratio Dedicated Card */}
                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div>
                                    <div className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Clawback Ratio</div>
                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Policies Clawback â€” 102 policies</div>
                                </div>
                                <Badge tone="rose">Overall: 81.46% (Â£73,439.47 / Â£90,154.85)</Badge>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="px-4 py-2.5 font-bold uppercase">Advisor</th>
                                            <th className="px-4 py-2.5 font-bold uppercase text-right">Ratio</th>
                                            <th className="px-4 py-2.5 font-bold uppercase text-right">Sale (Â£)</th>
                                            <th className="px-4 py-2.5 font-bold uppercase text-right">Clawback (Â£)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { advisor: 'Leanne Devine', ratio: '90.44%', sale: 'Â£28,908.51', clawback: 'Â£26,146.23' },
                                            { advisor: 'Lawrence Bracken', ratio: '71.41%', sale: 'Â£26,745.17', clawback: 'Â£19,099.20' },
                                            { advisor: 'Tom Tovey', ratio: '78.86%', sale: 'Â£23,871.57', clawback: 'Â£18,825.43' },
                                            { advisor: 'Gurpreet Barpagga', ratio: '90.30%', sale: 'Â£3,733.68', clawback: 'Â£3,371.45' },
                                            { advisor: 'Total', ratio: '81.46%', sale: 'Â£90,154.85', clawback: 'Â£73,439.47', isTotal: true },
                                        ].map((r) => (
                                            <tr key={r.advisor} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className={`px-4 py-2.5 ${r.isTotal ? 'font-inter-black' : 'font-semibold'}`} style={{ color: 'var(--text-primary)' }}>
                                                    {r.isTotal ? r.advisor : <span className="inline-flex items-center gap-2"><UserAvatar name={r.advisor} /><span>{r.advisor}</span></span>}
                                                </td>
                                                <td className="px-4 py-2.5 text-right tabular-nums font-bold text-rose-500">{r.ratio}</td>
                                                <td className="px-4 py-2.5 text-right tabular-nums">{r.sale}</td>
                                                <td className="px-4 py-2.5 text-right tabular-nums font-bold text-rose-500">{r.clawback}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <Card>
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Sales vs Recorded Revenue</div>
                                        <div className="font-inter-black text-xl" style={{ color: 'var(--text-primary)' }}>Â£532,620.25</div>
                                    </div>
                                    <ChartTableToggle mode={getMode('salesRev')} onChange={(m) => setMode('salesRev', m)} />
                                </div>
                                {getMode('salesRev') === 'chart' ? (
                                    <div className="space-y-3 text-xs">
                                        {[
                                            { provider: 'Vitality LIFE', sales: 'Â£362,400', rev: 'Â£288,150', pct: 80 },
                                            { provider: 'Aviva', sales: 'Â£64,200', rev: 'Â£54,800', pct: 18 },
                                            { provider: 'Vitality Health', sales: 'Â£31,500', rev: 'Â£68,200', pct: 22 },
                                        ].map((r) => (
                                            <div key={r.provider} className="space-y-1">
                                                <div className="flex justify-between">
                                                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{r.provider}</span>
                                                    <span className="tabular-nums" style={{ color: 'var(--text-muted)' }}>Sales {r.sales} â€¢ Rev {r.rev}</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: 'var(--accent)' }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                <th className="py-2 font-bold uppercase">Provider</th>
                                                <th className="py-2 font-bold uppercase text-right">Sales</th>
                                                <th className="py-2 font-bold uppercase text-right">Recorded Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { provider: 'Vitality LIFE', sales: 'Â£362,400', rev: 'Â£288,150' },
                                                { provider: 'Aviva', sales: 'Â£64,200', rev: 'Â£54,800' },
                                                { provider: 'Vitality Health', sales: 'Â£31,500', rev: 'Â£68,200' },
                                            ].map((r) => (
                                                <tr key={r.provider} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <td className="py-2 font-semibold">{r.provider}</td>
                                                    <td className="py-2 text-right tabular-nums">{r.sales}</td>
                                                    <td className="py-2 text-right font-inter-black tabular-nums">{r.rev}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </Card>

                            <Card>
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Revenue vs Clawback</div>
                                        <div className="font-inter-black text-xl text-rose-500">81.46% Clawback Ratio</div>
                                    </div>
                                    <ChartTableToggle mode={getMode('revClaw')} onChange={(m) => setMode('revClaw', m)} />
                                </div>
                                {getMode('revClaw') === 'chart' ? (
                                    <div className="space-y-3 text-xs">
                                        {[
                                            { advisor: 'Leanne Devine', sales: 'Â£28,908.51', claw: 'Â£26,146.23', ratio: '90.44%' },
                                            { advisor: 'Lawrence Bracken', sales: 'Â£26,745.17', claw: 'Â£19,099.20', ratio: '71.41%' },
                                            { advisor: 'Tom Tovey', sales: 'Â£23,871.57', claw: 'Â£18,825.43', ratio: '78.86%' },
                                        ].map((r) => (
                                            <div key={r.advisor} className="space-y-1">
                                                <div className="flex justify-between">
                                                    <span className="inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--text-primary)' }}><UserAvatar name={r.advisor} /><span>{r.advisor}</span></span>
                                                    <span className="tabular-nums font-bold text-rose-500">{r.claw} ({r.ratio})</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                                    <div className="h-full rounded-full bg-rose-500" style={{ width: r.ratio }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                <th className="py-2 font-bold uppercase">Advisor</th>
                                                <th className="py-2 font-bold uppercase text-right">Sale (Â£)</th>
                                                <th className="py-2 font-bold uppercase text-right">Clawback (Â£)</th>
                                                <th className="py-2 font-bold uppercase text-right">Ratio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { advisor: 'Leanne Devine', sales: 'Â£28,908.51', claw: 'Â£26,146.23', ratio: '90.44%' },
                                                { advisor: 'Lawrence Bracken', sales: 'Â£26,745.17', claw: 'Â£19,099.20', ratio: '71.41%' },
                                                { advisor: 'Tom Tovey', sales: 'Â£23,871.57', claw: 'Â£18,825.43', ratio: '78.86%' },
                                            ].map((r) => (
                                                <tr key={r.advisor} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <td className="py-2 font-semibold"><span className="inline-flex items-center gap-2"><UserAvatar name={r.advisor} /><span>{r.advisor}</span></span></td>
                                                    <td className="py-2 text-right tabular-nums">{r.sales}</td>
                                                    <td className="py-2 text-right tabular-nums text-rose-500 font-bold">{r.claw}</td>
                                                    <td className="py-2 text-right tabular-nums font-bold">{r.ratio}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </Card>
                        </div>

                        {/* Provider Clawback Summary Table */}
                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Policies Clawback by Provider</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="px-4 py-3 font-bold uppercase">Provider</th>
                                            <th className="px-4 py-3 font-bold uppercase text-right">Policies Sold</th>
                                            <th className="px-4 py-3 font-bold uppercase text-right">Clawed Back</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { provider: 'Vitality LIFE', sold: 400, clawed: 67 },
                                            { provider: 'Aviva', sold: 51, clawed: 7 },
                                            { provider: 'Vitality Health', sold: 38, clawed: 13 },
                                            { provider: 'L&G', sold: 27, clawed: 7 },
                                            { provider: 'Total', sold: 578, clawed: 102, isTotal: true },
                                        ].map((r) => (
                                            <tr key={r.provider} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className={`px-4 py-2.5 ${r.isTotal ? 'font-inter-black' : 'font-semibold'}`} style={{ color: 'var(--text-primary)' }}>{r.provider}</td>
                                                <td className="px-4 py-2.5 text-right tabular-nums">{r.sold}</td>
                                                <td className="px-4 py-2.5 text-right tabular-nums font-bold text-rose-500">{r.clawed}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Clawback amount by user & provider */}
                        <Card>
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-[11px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Clawback Amount by User &amp; Provider</div>
                                <ChartTableToggle mode={getMode('clawUserProv')} onChange={(m) => setMode('clawUserProv', m)} />
                            </div>
                            {getMode('clawUserProv') === 'chart' ? (
                                <div className="space-y-3 text-xs">
                                    {[
                                        { user: 'Leanne Devine', amount: 'Â£76,146.23', pct: 95 },
                                        { user: 'Tom Tovey', amount: 'Â£33,420.10', pct: 44 },
                                        { user: 'Lawrence Bracken', amount: 'Â£28,910.40', pct: 38 },
                                        { user: 'Talvinder Basra', amount: 'Â£17,240.00', pct: 22 },
                                    ].map((u) => (
                                        <div key={u.user} className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--text-primary)' }}><UserAvatar name={u.user} /><span>{u.user}</span></span>
                                                <span className="tabular-nums font-bold text-rose-500">{u.amount}</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                                <div className="h-full rounded-full bg-rose-500" style={{ width: `${u.pct}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="py-2 font-bold uppercase">User</th>
                                            <th className="py-2 font-bold uppercase text-right">Clawback Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { user: 'Leanne Devine', amount: 'Â£76,146.23' },
                                            { user: 'Tom Tovey', amount: 'Â£33,420.10' },
                                            { user: 'Lawrence Bracken', amount: 'Â£28,910.40' },
                                            { user: 'Talvinder Basra', amount: 'Â£17,240.00' },
                                        ].map((u) => (
                                            <tr key={u.user} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className="py-2 font-semibold"><span className="inline-flex items-center gap-2"><UserAvatar name={u.user} /><span>{u.user}</span></span></td>
                                                <td className="py-2 text-right font-inter-black tabular-nums text-rose-500">{u.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
