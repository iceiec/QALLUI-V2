import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import DonutChart from '@/components/DonutChart';
import UserAvatar from '@/components/UserAvatar';
import {
    DASHBOARD_KPIS,
    MOST_LEADS_ADVISORS,
    LEAD_ORIGINS,
    LEAD_STAGES,
    AVERAGE_PREMIUM_MATRIX,
    ON_COVER_GAUGES,
    COMPLIANCE_SUMMARY,
    LEADS_DATASET,
} from '@/core/data/mockData';

const TIMEFRAMES = ['7D', '30D', 'All Time'];

const KPI_SPARKLINES = [
    [18, 24, 21, 30, 28, 36, 42, 39, 48, 54],
    [12, 16, 15, 22, 27, 25, 31, 35, 38, 44],
    [28, 25, 30, 27, 34, 32, 37, 36, 41, 45],
    [14, 18, 20, 19, 26, 29, 34, 37, 43, 50],
];

function KpiSparkline({ data, color = '#0AC28B', id }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 120;
    const height = 36;
    const points = data
        .map((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((val - min) / range) * (height - 6) - 3;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(' ');
    const areaPoints = `0,${height} ${points} ${width},${height}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="h-9 w-28 shrink-0 overflow-visible" preserveAspectRatio="none">
            <defs>
                <linearGradient id={`kpi-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.0" />
                </linearGradient>
            </defs>
            <polygon points={areaPoints} fill={`url(#kpi-grad-${id})`} />
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
}

export default function DashboardIndex() {
    const [timeframe, setTimeframe] = useState('30D');
    const [rescueRange, setRescueRange] = useState('All Time');
    const kpis = DASHBOARD_KPIS[timeframe];

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-5">
                {/* Page Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Dashboard
                        </h1>
                        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                            5 Advisors Ã¢â‚¬Â¢ 22,762 Total Leads
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            Timeframe:
                        </span>
                        <div
                            className="inline-flex rounded-lg border p-0.5"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                        >
                            {TIMEFRAMES.map((tf) => {
                                const active = timeframe === tf;
                                return (
                                    <button
                                        key={tf}
                                        type="button"
                                        onClick={() => setTimeframe(tf)}
                                        className="rounded-md px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer"
                                        style={{
                                            backgroundColor: active ? 'var(--accent)' : 'transparent',
                                            color: active ? '#ffffff' : 'var(--text-secondary)',
                                        }}
                                    >
                                        {tf}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Top KPI Row */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
                    {kpis.map((item, idx) => {
                        const cardColor = item.accent || '#0AC28B';
                        return (
                        <Card
                            key={item.key}
                            className="border-0 shadow-sm"
                            style={{
                                background: `linear-gradient(135deg, color-mix(in srgb, ${cardColor} 12%, var(--bg-surface)) 0%, var(--bg-surface) 100%)`,
                            }}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                    {item.label}
                                </span>
                                <Badge tone={item.badgeTone}>{item.badge}</Badge>
                            </div>
                            <div className="mt-2 flex items-end justify-between gap-2">
                                <div className="font-inter-black text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                    {item.value}
                                </div>
                                <KpiSparkline
                                    id={`${timeframe}-${item.key}`}
                                    data={item.series || KPI_SPARKLINES[idx % KPI_SPARKLINES.length]}
                                    color={item.accent || '#0AC28B'}
                                />
                            </div>
                            <div className="mt-3 flex items-center justify-between pt-2.5 text-[11px]">
                                <span style={{ color: 'var(--text-muted)' }}>{item.subtitle}</span>
                                <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>{item.footer}</span>
                            </div>
                        </Card>
                        );
                    })}
                </div>

                {/* Row 2: Most Leads + Lead Origin */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card>
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Most Leads</h2>
                                <Badge tone="emerald">5.8M LEADS</Badge>
                            </div>
                            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>All time</span>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border p-3 mb-4"
                            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                        >
                            <div>
                                <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>3,068</div>
                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Total assigned leads across 5 advisors</div>
                            </div>
                            <div className="sm:text-right">
                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Top Volume Leader</div>
                                <div className="text-xs font-bold" style={{ color: 'var(--accent-text)' }}>Tom Tovey (38.3%)</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {MOST_LEADS_ADVISORS.map((adv) => (
                                <div key={adv.name} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <div>
                                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{adv.name}</span>
                                            <span className="ml-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>{adv.share}</span>
                                        </div>
                                        <span className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>
                                            {adv.leads.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{ width: `${Math.min(100, adv.pct * 2.4)}%`, backgroundColor: 'var(--accent)' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Lead Origin</h2>
                                <Badge tone="sky">11 CHANNELS</Badge>
                            </div>
                            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>All time</span>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border p-3 mb-4"
                            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                        >
                            <div>
                                <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>22,762</div>
                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Total inbound leads across 11 channels</div>
                            </div>
                            <div className="sm:text-right">
                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Primary Source</div>
                                <div className="text-xs font-bold" style={{ color: 'var(--accent-text)' }}>DGFinity (22.6%)</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            <DonutChart
                                size={144}
                                strokeWidth={18}
                                centerTitle="22,762"
                                centerSubtitle="Total Leads"
                                segments={LEAD_ORIGINS.map((o) => ({ value: o.leads, color: o.color }))}
                            />

                            <div className="w-full flex-1 space-y-2">
                                {LEAD_ORIGINS.map((item) => (
                                    <div key={item.source} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.source}</span>
                                        </div>
                                        <div className="flex items-center gap-3 tabular-nums">
                                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.leads.toLocaleString()}</span>
                                            <span className="w-11 text-right" style={{ color: 'var(--text-muted)' }}>{item.share}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Row 3: Lead Stages + Average Premium */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card>
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Lead Stages</h2>
                                <Badge tone="emerald">54.1% ON COVER</Badge>
                            </div>
                            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>All Advisors</span>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border p-3 mb-4"
                            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                        >
                            <div>
                                <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>18,435</div>
                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Active across the five tracked stages</div>
                            </div>
                            <div className="sm:text-right">
                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Primary Concentration</div>
                                <div className="text-xs font-bold" style={{ color: 'var(--accent-text)' }}>68.7% Partial (12,662)</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                            {LEAD_STAGES.map((st) => (
                                <div
                                    key={st.label}
                                    className="rounded-lg border p-2.5 text-center"
                                    style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                                >
                                    <div className="text-[10px] font-semibold truncate" style={{ color: 'var(--text-muted)' }}>{st.label}</div>
                                    <div className="font-inter-black text-base mt-1" style={{ color: 'var(--text-primary)' }}>
                                        {st.count.toLocaleString()}
                                    </div>
                                    <div className="mt-2 h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
                                        <div className="h-full rounded-full" style={{ width: st.pct, backgroundColor: st.color }} />
                                    </div>
                                    <div className="text-[10px] font-bold mt-1" style={{ color: st.color }}>{st.pct}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Average Premium</h2>
                                <Badge tone="amber">7 TIERS</Badge>
                            </div>
                            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>All time</span>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border p-3 mb-4"
                            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                        >
                            <div>
                                <div className="font-inter-black text-2xl" style={{ color: 'var(--text-primary)' }}>Ã‚Â£782.00</div>
                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Average across approved on-cover policies</div>
                            </div>
                            <div className="sm:text-right">
                                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Highest Avg Band</div>
                                <div className="text-xs font-bold" style={{ color: 'var(--accent-text)' }}>Leanne Devine (Ã‚Â£819.30)</div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-[11px]">
                                <thead>
                                    <tr style={{ color: 'var(--text-muted)' }}>
                                        <th className="pb-2 font-bold uppercase">Advisor</th>
                                        <th className="pb-2 font-bold uppercase text-right">&lt;Ã‚Â£80</th>
                                        <th className="pb-2 font-bold uppercase text-right">Ã‚Â£80-120</th>
                                        <th className="pb-2 font-bold uppercase text-right">Ã‚Â£120-150</th>
                                        <th className="pb-2 font-bold uppercase text-right">Ã‚Â£150-250</th>
                                        <th className="pb-2 font-bold uppercase text-right">Ã‚Â£250+</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AVERAGE_PREMIUM_MATRIX.map((row) => (
                                        <tr key={row.advisor} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="py-2 pr-2">
                                                <div className="flex items-center gap-2">
                                                    <UserAvatar name={row.advisor} />
                                                    <div>
                                                        <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{row.advisor}</div>
                                                        <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{row.policies} policies</div>
                                                    </div>
                                                </div>
                                            </td>
                                            {row.tiers.map((val, idx) => (
                                                <td key={idx} className="py-2 pl-1 text-right font-semibold tabular-nums">
                                                    <span
                                                        className="inline-block rounded px-1.5 py-0.5"
                                                        style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent-text)' }}
                                                    >
                                                        {val}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Row 4: Leads League + Calendar Summary */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card padding="p-0 overflow-hidden" hoverable={false}>
                        <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Leads League</h2>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Lead movement per adviser, today through the last 30 days.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                        <th className="px-4 py-2.5 font-bold uppercase">Name</th>
                                        <th className="px-3 py-2.5 font-bold uppercase text-right">Today</th>
                                        <th className="px-3 py-2.5 font-bold uppercase text-right">Last 7 Days</th>
                                        <th className="px-4 py-2.5 font-bold uppercase text-right">Last 30 Days</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Lawrence Bracken', today: 0, d7: 1, d30: 253 },
                                        { name: 'Gurpreet Barpagga', today: 33, d7: 34, d30: 238 },
                                        { name: 'Tom Tovey', today: 0, d7: 2, d30: 237 },
                                        { name: 'Leanne Devine', today: 0, d7: 0, d30: 195 },
                                        { name: 'Raeez Jassat', today: 0, d7: 0, d30: 5 },
                                    ].map((r) => (
                                        <tr key={r.name} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="px-4 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                <span className="inline-flex items-center gap-2"><UserAvatar name={r.name} /><span>{r.name}</span></span>
                                            </td>
                                            <td className="px-3 py-2.5 text-right tabular-nums">{r.today}</td>
                                            <td className="px-3 py-2.5 text-right tabular-nums">{r.d7}</td>
                                            <td className="px-4 py-2.5 text-right font-inter-black tabular-nums">{r.d30}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Calendar Summary</h2>
                            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>This Week</span>
                        </div>
                        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Active calendar bookings by callback status.</p>
                        <div className="font-inter-black text-3xl" style={{ color: 'var(--text-primary)' }}>7</div>
                        <div className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>active bookings this week</div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                                <span style={{ color: 'var(--text-primary)' }}>New Business</span>
                                <span className="font-inter-black">7</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                <div className="h-full rounded-full" style={{ width: '88%', backgroundColor: 'var(--accent)' }} />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Row 5: On Cover / Dead Percentage */}
                <Card>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                            <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                                On Cover / Dead Percentage
                            </h2>
                            <Badge tone="emerald">55.11% PORTFOLIO ON COVER</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                            <span className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" /> On Cover %
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-rose-500" /> Dead %
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {ON_COVER_GAUGES.map((adv) => (
                            <div
                                key={adv.name}
                                className="rounded-xl border p-3 flex flex-col items-center text-center"
                                style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                            >
                                <div className="flex w-full items-center justify-between text-xs mb-2">
                                    <span className="font-bold truncate" style={{ color: 'var(--text-primary)' }}>{adv.name}</span>
                                    <span className={`font-bold text-[11px] ${adv.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {adv.delta}
                                    </span>
                                </div>
                                <DonutChart
                                    size={96}
                                    strokeWidth={10}
                                    centerTitle={`${adv.onCover}%`}
                                    centerSubtitle="On Cover"
                                    segments={[
                                        { value: adv.onCover, color: '#00B073' },
                                        { value: adv.dead, color: '#EF4444' },
                                        { value: Math.max(0, 100 - adv.onCover - adv.dead), color: '#334155' },
                                    ]}
                                />
                                <div className="mt-2.5 flex w-full justify-between text-[11px] pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <span className="text-emerald-500 font-semibold">{adv.onCover}% Cover</span>
                                    <span className="text-rose-500 font-semibold">{adv.dead}% Dead</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Row 5: Static Lead Net Loss / Gain */}
                <Card>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                            <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                                Static Lead Net Loss / Gain
                            </h2>
                            <Badge tone="emerald">+169 NET RESCUE</Badge>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg border p-0.5 self-start" style={{ borderColor: 'var(--border-subtle)' }}>
                            {['Daily', 'Weekly', 'Monthly', 'All Time'].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRescueRange(r)}
                                    className="rounded-md px-2 py-1 text-[11px] font-semibold cursor-pointer"
                                    style={{
                                        backgroundColor: rescueRange === r ? 'var(--accent)' : 'transparent',
                                        color: rescueRange === r ? '#fff' : 'var(--text-muted)',
                                    }}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div
                            className="rounded-xl border p-4 flex items-end justify-around gap-4 h-44"
                            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                        >
                            <div className="flex flex-col items-center gap-1.5">
                                <span className="text-xs font-bold text-emerald-500">+875</span>
                                <div className="w-12 rounded-t-md bg-emerald-500 h-28" />
                                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Gained</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <span className="text-xs font-bold text-rose-500">-706</span>
                                <div className="w-12 rounded-t-md bg-rose-500 h-20" />
                                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Lost</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <span className="text-xs font-bold text-amber-500">+169</span>
                                <div className="w-12 rounded-t-md bg-amber-500 h-10" />
                                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Net</span>
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                <div className="text-xs font-semibold text-emerald-500">Gained (Rescued)</div>
                                <div className="font-inter-black text-2xl mt-2" style={{ color: 'var(--text-primary)' }}>+875</div>
                                <div className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>Reassigned to advisors</div>
                            </div>
                            <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                <div className="text-xs font-semibold text-rose-500">Lost (Moved)</div>
                                <div className="font-inter-black text-2xl mt-2" style={{ color: 'var(--text-primary)' }}>-706</div>
                                <div className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>Moved from advisors</div>
                            </div>
                            <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                <div className="text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>Net Rescue Balance</div>
                                <div className="font-inter-black text-2xl mt-2" style={{ color: 'var(--accent-text)' }}>+169</div>
                                <div className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>1.24x Gained vs Lost</div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Row 6: Compliance + Compliance Summary */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Compliance</h2>
                            <Badge tone="amber">1 Pending Review</Badge>
                        </div>
                        <div className="font-inter-black text-3xl" style={{ color: 'var(--text-primary)' }}>112</div>
                        <div className="text-xs mt-0.5 mb-4" style={{ color: 'var(--text-muted)' }}>93.8% approved across audited submissions</div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-semibold text-emerald-500">Approved</span>
                                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>105</span>
                                </div>
                                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '93.8%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-semibold text-rose-500">Declined</span>
                                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>7</span>
                                </div>
                                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '6.2%' }} />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Compliance Summary</h2>
                            <Link href="/admin/compliance" className="text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>
                                Open Queue Ã¢â€ â€™
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                        <th className="pb-2 font-bold uppercase">User</th>
                                        <th className="pb-2 font-bold uppercase text-right">Approved</th>
                                        <th className="pb-2 font-bold uppercase text-right">Declined</th>
                                        <th className="pb-2 font-bold uppercase text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPLIANCE_SUMMARY.map((row) => (
                                        <tr key={row.user} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="py-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                <span className="inline-flex items-center gap-2">
                                                    <UserAvatar name={row.user} />
                                                    <span>{row.user}</span>
                                                </span>
                                            </td>
                                            <td className="py-2 text-right font-semibold text-emerald-500">{row.approved}</td>
                                            <td className="py-2 text-right font-semibold text-rose-500">{row.declined}</td>
                                            <td className="py-2 text-right font-inter-black" style={{ color: 'var(--text-primary)' }}>{row.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Row 7: Last 10 Leads */}
                <Card>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                            <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Last 10 Leads</h2>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Most recently touched leads across all channels</p>
                        </div>
                        <Link
                            href="/leads"
                            className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold text-white self-start sm:self-auto"
                            style={{ backgroundColor: 'var(--accent)' }}
                        >
                            View All Leads
                        </Link>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="pb-2.5 font-bold uppercase">Name</th>
                                    <th className="pb-2.5 font-bold uppercase">Source</th>
                                    <th className="pb-2.5 font-bold uppercase">Date Time</th>
                                    <th className="pb-2.5 font-bold uppercase">Assignee</th>
                                    <th className="pb-2.5 font-bold uppercase text-right">Est. Premium</th>
                                    <th className="pb-2.5 font-bold uppercase text-right">Stage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LEADS_DATASET.slice(0, 7).map((lead) => (
                                    <tr key={lead.id} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{lead.clientName}</td>
                                        <td className="py-2.5" style={{ color: 'var(--text-secondary)' }}>{lead.source}</td>
                                        <td className="py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{lead.updatedAt}</td>
                                        <td className="py-2.5" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="inline-flex items-center gap-2">
                                                <UserAvatar name={lead.assignee} />
                                                <span>{lead.assignee}</span>
                                            </span>
                                        </td>
                                        <td className="py-2.5 text-right font-inter-black tabular-nums" style={{ color: 'var(--text-primary)' }}>{lead.premium}</td>
                                        <td className="py-2.5 text-right"><Badge stage={lead.stage}>{lead.stage}</Badge></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid grid-cols-1 gap-2.5 md:hidden">
                        {LEADS_DATASET.slice(0, 5).map((lead) => (
                            <div
                                key={lead.id}
                                className="rounded-lg border p-3 space-y-1.5"
                                style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <span className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>{lead.clientName}</span>
                                    <Badge stage={lead.stage}>{lead.stage}</Badge>
                                </div>
                                <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                    <span>{lead.source} Ã¢â‚¬Â¢ {lead.assignee}</span>
                                    <span className="font-inter-black" style={{ color: 'var(--text-primary)' }}>{lead.premium}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* User Activity Report Link Banner */}
                <Card>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h2 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>User Activity Report</h2>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>View the full User Activity Report with filters and search in Daily Reporting.</p>
                        </div>
                        <Link
                            href="/reports/daily"
                            className="inline-flex items-center justify-center rounded-lg border px-3.5 py-2 text-xs font-semibold self-start sm:self-auto"
                            style={{ borderColor: 'var(--accent)', color: 'var(--accent-text)', backgroundColor: 'var(--accent-soft)' }}
                        >
                            Open Daily Reporting Ã¢â€ â€™
                        </Link>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
