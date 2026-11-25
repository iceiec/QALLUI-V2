import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@inertiajs/react';
import { Bell, X, ArrowUpRight, CheckCheck } from 'lucide-react';

const LEGEND_ITEMS = [
    { id: 'all', label: 'All', dot: 'bg-slate-400', route: null },
    { id: 'compliance', label: 'Compliance', dot: 'bg-emerald-500', route: '/admin/compliance' },
    { id: 'leads', label: 'Leads', dot: 'bg-sky-500', route: '/leads' },
    { id: 'billing', label: 'Billing', dot: 'bg-rose-500', route: '/billing/payment-failures' },
    { id: 'callbacks', label: 'Callbacks', dot: 'bg-amber-500', route: '/admin/calendar' },
];

const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        category: 'compliance',
        title: 'Compliance Review Approved',
        message: 'Lawrencia Glover (Policy #901718857) was approved by Compliance.',
        time: '5 mins ago',
        unread: true,
        href: '/leads/edit?tab=Compliance',
        location: 'Admin → Compliance',
    },
    {
        id: 2,
        category: 'leads',
        title: 'Lead Moved to Quoting',
        message: 'Gavin Testing Baker2 & GavinTest2 Partner2 moved to Quoting stage.',
        time: '22 mins ago',
        unread: true,
        href: '/leads/edit',
        location: 'Leads → All Leads',
    },
    {
        id: 3,
        category: 'billing',
        title: 'Payment Failure Alert',
        message: 'Direct debit failed for Policy #901685107 (£674.05).',
        time: '1 hr ago',
        unread: true,
        href: '/billing/payment-failures',
        location: 'Billing → Payment Failures',
    },
    {
        id: 4,
        category: 'callbacks',
        title: 'Callback Scheduled',
        message: 'Follow-up call scheduled with Kevin Walters at 14:30.',
        time: '2 hrs ago',
        unread: false,
        href: '/admin/calendar',
        location: 'Admin → Calendar',
    },
    {
        id: 5,
        category: 'compliance',
        title: 'Secondary Approval Pending',
        message: 'Michelle Truter Banks (Policy #55786460) awaits second sign-off.',
        time: 'Yesterday',
        unread: false,
        href: '/admin/secondary-approval',
        location: 'Admin → Secondary Approval',
    },
    {
        id: 6,
        category: 'leads',
        title: 'Static Lead Rescued',
        message: 'Justin Bennett & Catherine Bennett was rescued from Static Leads.',
        time: 'Yesterday',
        unread: false,
        href: '/leads/static',
        location: 'Leads → Static Leads',
    },
];

export default function NotificationsModal({ open, onClose }) {
    const [activeLegend, setActiveLegend] = useState('all');
    const [items, setItems] = useState(INITIAL_NOTIFICATIONS);

    if (!open) return null;

    const filtered = activeLegend === 'all' ? items : items.filter((n) => n.category === activeLegend);
    const unreadCount = items.filter((n) => n.unread).length;

    const markAllRead = () => {
        setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    };

    const getLegend = (category) => LEGEND_ITEMS.find((l) => l.id === category) || LEGEND_ITEMS[0];

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]"
            onClick={onClose}
        >
            <div
                className="animate-popover my-auto w-full max-w-xl rounded-2xl border p-4 sm:p-5 shadow-2xl"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex items-center gap-2.5">
                        <div className="rounded-xl p-2" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent-text)' }}>
                            <Bell className="h-4 w-4" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>
                                    Notifications
                                </h3>
                                {unreadCount > 0 && (
                                    <span className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent-text)' }}>
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                Use legends below to filter or jump directly to the record
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllRead}
                                className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold cursor-pointer"
                                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                            >
                                <CheckCheck className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Mark all read</span>
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md p-1 cursor-pointer"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Legends */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {LEGEND_ITEMS.map((leg) => {
                        const active = activeLegend === leg.id;
                        return (
                            <button
                                key={leg.id}
                                type="button"
                                onClick={() => setActiveLegend(leg.id)}
                                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold cursor-pointer"
                                style={{
                                    backgroundColor: active ? 'var(--accent-soft)' : 'var(--bg-surface-alt)',
                                    borderColor: active ? 'var(--accent)' : 'var(--border-subtle)',
                                    color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                                }}
                            >
                                <span className={`h-2 w-2 rounded-full ${leg.dot}`} />
                                <span>{leg.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Notification List */}
                <div className="mt-3 max-h-[55vh] space-y-2 overflow-y-auto pr-1">
                    {filtered.map((item) => {
                        const leg = getLegend(item.category);
                        return (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border p-3 qall-row-hover"
                                style={{
                                    borderColor: item.unread ? 'var(--accent)' : 'var(--border-subtle)',
                                    backgroundColor: item.unread ? 'var(--bg-surface-alt)' : 'transparent',
                                }}
                            >
                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${leg.dot}`} />
                                        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                                            {item.title}
                                        </span>
                                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                            • {item.time}
                                        </span>
                                    </div>
                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        {item.message}
                                    </p>
                                    <div className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                                        Location: {item.location}
                                    </div>
                                </div>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="inline-flex shrink-0 items-center gap-1 self-start sm:self-center rounded-lg border px-2.5 py-1.5 text-[11px] font-bold"
                                    style={{
                                        borderColor: 'var(--border-subtle)',
                                        color: 'var(--accent-text)',
                                        backgroundColor: 'var(--bg-surface)',
                                    }}
                                >
                                    <span>View</span>
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>,
        document.body
    );
}
