import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    Repeat,
    Database,
    ShieldCheck,
    UserCog,
    Kanban,
    Calendar,
    MessageSquare,
    FileBarChart2,
    ChevronDown,
    X,
    UserPlus,
    UserCheck,
    Wallet,
    UserX,
} from 'lucide-react';

const JUNIOR_NAV_GROUPS = [
    {
        label: 'Main',
        items: [
            { label: 'Dashboard', href: '/junior', icon: LayoutDashboard },
            { label: 'My Leads', href: '/junior/leads', icon: Users },
            { label: 'Add Lead', href: '/junior/leads/add', icon: UserPlus },
            { label: 'Static Leads', href: '/junior/leads/static', icon: UserCheck },
            { label: 'Payment Failures', href: '/junior/billing/payment-failures', icon: Wallet },
            { label: 'Leads Pool', href: '/junior/leads/pool', icon: Database },
            { label: 'Rejected Pool', href: '/junior/reports/rejected-pool', icon: UserX },
            { label: 'Calendar', href: '/junior/calendar', icon: Calendar },
            { label: 'Kanban Board', href: '/junior/kanban', icon: Kanban },
        ],
    },
];

const NAV_GROUPS = [
    {
        label: 'Main',
        items: [{ label: 'Dashboard', href: '/', icon: LayoutDashboard }],
    },
    {
        label: 'Leads',
        items: [
            { label: 'All Leads', href: '/leads', icon: Users, badge: '22,762', badgeTone: 'neutral' },
            { label: 'Static Leads', href: '/leads/static', icon: Repeat, badge: '+169', badgeTone: 'emerald' },
            { label: 'Leads Pool', href: '/leads/pool', icon: Database },
        ],
    },
    {
        label: 'Admin',
        items: [
            { label: 'Compliance', href: '/admin/compliance', icon: ShieldCheck, badge: '12', badgeTone: 'rose' },
            { label: 'Secondary Approval', href: '/admin/secondary-approval', icon: ShieldCheck, badge: '41', badgeTone: 'emerald' },
            { label: 'VoIP', href: '/admin/voip', icon: FileBarChart2 },
            { label: 'Calendar', href: '/admin/calendar', icon: Calendar },
        ],
    },
    {
        label: 'Others',
        items: [
            {
                label: 'Billing',
                icon: FileBarChart2,
                children: [
                    { label: 'Payment Failures', href: '/billing/payment-failures' },
                    { label: 'Ledger', href: '/billing/ledger' },
                    { label: 'Billing', href: '/billing' },
                ],
            },
            { label: 'Manage Customer', href: '/customers', icon: Users },
            {
                label: 'Report',
                icon: FileBarChart2,
                children: [
                    { label: 'Daily Reporting', href: '/reports/daily' },
                    { label: 'Dead Pool', href: '/reports/dead-pool' },
                    { label: 'Rejected Pool', href: '/reports/rejected-pool' },
                    { label: 'Externals', href: '/reports/externals' },
                    { label: 'Commission Variance', href: '/reports/commission-variance' },
                ],
            },
            {
                label: 'Settings',
                icon: UserCog,
                children: [
                    { label: 'Users', href: '/settings/users' },
                    { label: 'Lead Sources', href: '/settings/lead-sources' },
                    { label: 'DB Backups', href: '/settings/db-backups' },
                    { label: 'Admin Setting', href: '/settings/admin' },
                    { label: 'Bill To', href: '/settings/bill-to' },
                ],
            },
            { label: 'Kanban Board', href: '/kanban', icon: Kanban },
        ],
    },
];

export default function SidebarNav({ mobileOpen, onCloseMobile, desktopVisible }) {
    const { url } = usePage();
    const [openGroup, setOpenGroup] = useState(null);

    const navContent = (
        <div className="flex h-full flex-col justify-between p-3">
            <div className="space-y-5">
                {(url.startsWith('/junior') ? JUNIOR_NAV_GROUPS : NAV_GROUPS).map((group) => (
                    <div key={group.label}>
                        <div className="px-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            {group.label}
                        </div>
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                if (item.children) {
                                    const expanded = openGroup === item.label;
                                    return (
                                        <div key={item.label}>
                                            <button
                                                type="button"
                                                onClick={() => setOpenGroup(expanded ? null : item.label)}
                                                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors cursor-pointer"
                                                style={{ color: 'var(--text-secondary)' }}
                                            >
                                                <span className="flex items-center gap-2.5">
                                                    <Icon className="h-4 w-4" />
                                                    <span>{item.label}</span>
                                                </span>
                                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                                            </button>
                                            {expanded && (
                                                <div className="ml-4 pl-2.5 border-l space-y-0.5 py-1" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            onClick={onCloseMobile}
                                                            className="block rounded-md px-2 py-1.5 text-xs font-medium transition-colors"
                                                            style={{
                                                                backgroundColor: url === child.href ? 'var(--accent-soft)' : 'transparent',
                                                                color: url === child.href ? 'var(--accent-text)' : 'var(--text-secondary)',
                                                            }}
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                const active = url === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onCloseMobile}
                                        className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors"
                                        style={{
                                            backgroundColor: active ? 'var(--accent-soft)' : 'transparent',
                                            color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <Icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </span>
                                        {item.badge && (
                                            <span
                                                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                                    item.badgeTone === 'emerald'
                                                        ? 'bg-emerald-500/15 text-emerald-500'
                                                        : item.badgeTone === 'rose'
                                                        ? 'bg-rose-500/15 text-rose-500'
                                                        : ''
                                                }`}
                                                style={
                                                    item.badgeTone === 'neutral'
                                                        ? { backgroundColor: 'var(--bg-surface-alt)', color: 'var(--text-muted)' }
                                                        : undefined
                                                }
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border p-3 text-xs" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                <div className="font-bold" style={{ color: 'var(--text-primary)' }}>QALL Exchange UI</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Smarkets-inspired theme system</div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar with smooth transition between Topbar & Sidebar modes */}
            <aside
                className={`hidden lg:block shrink-0 border-r min-h-[calc(100vh-3.5rem)] overflow-hidden transition-all duration-300 ease-out ${
                    desktopVisible ? 'w-60 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4 border-r-0 pointer-events-none'
                }`}
                style={{ backgroundColor: 'var(--bg-nav)', borderColor: 'var(--border-subtle)' }}
                aria-hidden={!desktopVisible}
            >
                <div className="w-60 h-full">{navContent}</div>
            </aside>

            {/* Mobile Slide-over Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onCloseMobile} />
                    <aside
                        className="relative z-10 w-72 max-w-[82vw] h-full border-r flex flex-col"
                        style={{ backgroundColor: 'var(--bg-nav)', borderColor: 'var(--border-strong)' }}
                    >
                        <div className="flex h-14 items-center justify-between border-b px-4" style={{ borderColor: 'var(--border-subtle)' }}>
                            <div className="flex items-center gap-2">
                                <div
                                    className="flex h-7 w-7 items-center justify-center rounded-lg font-inter-black text-xs text-white"
                                    style={{ backgroundColor: 'var(--accent)' }}
                                >
                                    Q
                                </div>
                                <span className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>QALL</span>
                            </div>
                            <button type="button" onClick={onCloseMobile} className="p-1 rounded-md cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">{navContent}</div>
                    </aside>
                </div>
            )}
        </>
    );
}
