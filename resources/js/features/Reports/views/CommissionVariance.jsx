import React from 'react';
import CustomSelect from '@/components/CustomSelect';
import { Head } from '@inertiajs/react';
import { Send, Lock, Calendar } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

const PERIODS = [
    { period: 'October 01 - October 15', locked: true, expected: '18,674.79', actual: '33,922.83', variance: '15,248.04', positive: true },
    { period: 'October 16 - October 31', locked: false, expected: '26,892.56', actual: '2,051.81', variance: '-24,840.75', positive: false },
];

export default function CommissionVariance() {
    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    return (
        <AppLayout>
            <Head title="Commission Variance Report" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Commission Variance Report
                </h1>

                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                            <CustomSelect style={controlStyle} options={["2026"]} />
                            <CustomSelect style={controlStyle} options={["October 2026"]} />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs" style={controlStyle}>
                                <Calendar className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} /> Report period: October 1, 2026 - October 31, 2026
                            </span>
                            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                                <Send className="h-3.5 w-3.5" /> Send Report Now
                            </button>
                        </div>
                    </div>
                </Card>

                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-4 py-3 font-bold uppercase">Period</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Expected (Â£)</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Actual (Â£)</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Variance (Â£)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PERIODS.map((p) => (
                                    <tr key={p.period} className="qall-row-hover border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            <span className="inline-flex items-center gap-2">
                                                <span>{p.period}</span>
                                                {p.locked && <Badge tone="neutral"><Lock className="h-2.5 w-2.5" /> FINAL</Badge>}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right tabular-nums">{p.expected}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{p.actual}</td>
                                        <td className={`px-4 py-3 text-right tabular-nums font-inter-black ${p.positive ? 'text-emerald-500' : 'text-rose-500'}`}>{p.variance}</td>
                                    </tr>
                                ))}
                                <tr style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                    <td className="px-4 py-3 font-inter-black" style={{ color: 'var(--text-primary)' }}>Total for Visible Period</td>
                                    <td className="px-4 py-3 text-right tabular-nums font-inter-black">45,567.35</td>
                                    <td className="px-4 py-3 text-right tabular-nums font-inter-black">35,974.64</td>
                                    <td className="px-4 py-3 text-right tabular-nums font-inter-black text-rose-500">-9,592.71</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
