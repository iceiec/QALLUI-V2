import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Plus, Clock, X, Phone, Info, ClipboardCheck, Star, CalendarCheck, PhoneCall, UserCheck } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import UserAvatar from '@/components/UserAvatar';

const WEEK_DAYS = [
    { key: 'mon', dayName: 'MON', dateNum: '16', isToday: false },
    { key: 'tue', dayName: 'TUE', dateNum: '17', isToday: false },
    { key: 'wed', dayName: 'WED', dateNum: '18', isToday: true },
    { key: 'thu', dayName: 'THU', dateNum: '19', isToday: false },
    { key: 'fri', dayName: 'FRI', dateNum: '20', isToday: false },
    { key: 'sat', dayName: 'SAT', dateNum: '21', isToday: false },
    { key: 'sun', dayName: 'SUN', dateNum: '22', isToday: false },
];

const HOURS = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM'];

const ADVISORS = [
    { name: 'Tom Tovey', color: '#00B073', soft: 'rgba(0, 176, 115, 0.14)' },
    { name: 'Leanne Devine', color: '#0EA5E9', soft: 'rgba(14, 165, 233, 0.14)' },
    { name: 'Lawrence Bracken', color: '#8B5CF6', soft: 'rgba(139, 92, 246, 0.14)' },
];

const APPOINTMENT_TYPES = [
    { id: 'Callback', label: 'Callback', color: '#0EA5E9', soft: 'rgba(14, 165, 233, 0.14)', icon: Phone },
    { id: 'Review', label: 'Review', color: '#D97706', soft: 'rgba(245, 158, 11, 0.15)', icon: ClipboardCheck },
    { id: 'New Business', label: 'New Business', color: '#00B073', soft: 'rgba(0, 176, 115, 0.14)', icon: Star },
    { id: 'Annual', label: 'Annual', color: '#8B5CF6', soft: 'rgba(139, 92, 246, 0.14)', icon: CalendarCheck },
    { id: 'VOIP', label: 'VOIP', color: '#EA580C', soft: 'rgba(234, 88, 12, 0.14)', icon: PhoneCall },
    { id: 'Appointment', label: 'Appointment', color: '#64748B', soft: 'rgba(100, 116, 139, 0.14)', icon: UserCheck },
];

const APPOINTMENTS = [
    { id: 1, day: 'mon', dayNum: 16, hour: '9 AM', time: '9:30 â€“ 10:00 AM', client: 'Mathew Kalakkai Chacko', advisor: 'Tom Tovey', color: '#00B073', soft: 'rgba(0, 176, 115, 0.14)', type: 'New Business' },
    { id: 2, day: 'mon', dayNum: 16, hour: '10 AM', time: '10:00 â€“ 10:30 AM', client: 'Ranganai Kambasha', advisor: 'Leanne Devine', color: '#D97706', soft: 'rgba(245, 158, 11, 0.15)', type: 'Review' },
    { id: 3, day: 'tue', dayNum: 17, hour: '9 AM', time: '9:30 â€“ 10:00 AM', client: 'Christopher Daley', advisor: 'Tom Tovey', color: '#0EA5E9', soft: 'rgba(14, 165, 233, 0.14)', type: 'Callback' },
    { id: 4, day: 'wed', dayNum: 18, hour: '10 AM', time: '10:15 â€“ 10:45 AM', client: 'Justin Bennett', advisor: 'Tom Tovey', color: '#EA580C', soft: 'rgba(234, 88, 12, 0.14)', type: 'VOIP' },
    { id: 5, day: 'thu', dayNum: 19, hour: '10 AM', time: '10:30 â€“ 11:00 AM', client: 'Mary Woolmington', advisor: 'Lawrence Bracken', color: '#8B5CF6', soft: 'rgba(139, 92, 246, 0.14)', type: 'Annual' },
];

export default function Calendar({ title = 'Calendar' }) {
    const [viewMode, setViewMode] = useState('Week');
    const [enabledAdvisors, setEnabledAdvisors] = useState(ADVISORS.map((a) => a.name));
    const [activeType, setActiveType] = useState('All');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const toggleAdvisor = (name) => {
        setEnabledAdvisors((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        );
    };

    const visibleAppointments = APPOINTMENTS.filter(
        (a) => enabledAdvisors.includes(a.advisor) && (activeType === 'All' || a.type === activeType)
    );
    const displayedDays = viewMode === 'Day' ? WEEK_DAYS.filter((d) => d.isToday) : WEEK_DAYS;

    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-4">
                {/* Google Calendar Top Toolbar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h1 className="font-inter-black text-2xl tracking-tight mr-1" style={{ color: 'var(--text-primary)' }}>
                            {title}
                        </h1>
                        <button
                            type="button"
                            className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                        >
                            Today
                        </button>
                        <div className="inline-flex items-center gap-1">
                            <button type="button" className="rounded-lg border p-1.5 transition-colors cursor-pointer" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                                <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                            <button type="button" className="rounded-lg border p-1.5 transition-colors cursor-pointer" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                                <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                        <span className="ml-1 font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>
                            November 2026
                        </span>
                    </div>

                    <div className="inline-flex rounded-lg border p-0.5 self-start sm:self-auto" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                        {['Day', 'Week', 'Month'].map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setViewMode(m)}
                                className="rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer"
                                style={{
                                    backgroundColor: viewMode === m ? 'var(--accent)' : 'transparent',
                                    color: viewMode === m ? '#fff' : 'var(--text-secondary)',
                                }}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Appointment Types Legend / Filter */}
                <Card padding="px-3.5 py-2.5" hoverable={false}>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 font-bold mr-1" style={{ color: 'var(--text-primary)' }}>
                            <Info className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                            Appointment types:
                        </span>
                        {APPOINTMENT_TYPES.map((t) => {
                            const Icon = t.icon;
                            const isActive = activeType === t.id;
                            return (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setActiveType(isActive ? 'All' : t.id)}
                                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer"
                                    style={{
                                        backgroundColor: t.soft,
                                        color: t.color,
                                        outline: isActive ? `2px solid ${t.color}` : 'none',
                                    }}
                                >
                                    <Icon className="h-3 w-3" />
                                    <span>{t.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Google Calendar 2-Column Layout */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    {/* Right Mini Sidebar */}
                    <div className="lg:col-span-3 lg:order-2 space-y-4">
                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 cursor-pointer"
                            style={{ backgroundColor: 'var(--accent)' }}
                        >
                            <Plus className="h-4 w-4" /> Create Appointment
                        </button>

                        <Card padding="p-3.5" hoverable={false}>
                            <div className="flex items-center justify-between mb-2.5">
                                <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>November 2026</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold mb-1" style={{ color: 'var(--text-muted)' }}>
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                    <span key={i}>{d}</span>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-[11px] tabular-nums">
                                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                                    const isToday = day === 18;
                                    return (
                                        <span
                                            key={day}
                                            className="flex h-6 w-6 mx-auto items-center justify-center rounded-full font-semibold cursor-pointer transition-colors"
                                            style={{
                                                backgroundColor: isToday ? 'var(--accent)' : 'transparent',
                                                color: isToday ? '#fff' : 'var(--text-secondary)',
                                            }}
                                        >
                                            {day}
                                        </span>
                                    );
                                })}
                            </div>
                        </Card>

                        <Card padding="p-3.5" hoverable={false}>
                            <div className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-muted)' }}>
                                Advisors
                            </div>
                            <div className="space-y-2.5">
                                {ADVISORS.map((adv) => {
                                    const checked = enabledAdvisors.includes(adv.name);
                                    return (
                                        <label key={adv.name} className="flex items-center gap-2.5 text-xs cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => toggleAdvisor(adv.name)}
                                                className="rounded cursor-pointer"
                                                style={{ accentColor: adv.color }}
                                            />
                                            <UserAvatar name={adv.name} />
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{adv.name}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* Main Calendar Surface */}
                    <Card padding="p-0 overflow-hidden" hoverable={false} className="lg:col-span-9 lg:order-1">
                        {viewMode === 'Month' ? (
                            <div className="p-3">
                                <div className="grid grid-cols-7 border-b pb-2 text-center text-[11px] font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
                                        <div key={d}>{d}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7">
                                    {Array.from({ length: 30 }, (_, i) => i + 1).map((dayNum) => {
                                        const dayEvents = visibleAppointments.filter((a) => a.dayNum === dayNum);
                                        const isToday = dayNum === 18;
                                        return (
                                            <div
                                                key={dayNum}
                                                className="min-h-[88px] border-b border-r p-1.5"
                                                style={{ borderColor: 'var(--border-subtle)' }}
                                            >
                                                <span
                                                    className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold tabular-nums"
                                                    style={{
                                                        backgroundColor: isToday ? 'var(--accent)' : 'transparent',
                                                        color: isToday ? '#fff' : 'var(--text-muted)',
                                                    }}
                                                >
                                                    {dayNum}
                                                </span>
                                                <div className="mt-1 space-y-1">
                                                    {dayEvents.map((ev) => (
                                                        <button
                                                            key={ev.id}
                                                            type="button"
                                                            onClick={() => setSelectedEvent(ev)}
                                                            className="w-full truncate rounded px-1.5 py-0.5 text-left text-[10px] font-semibold cursor-pointer"
                                                            style={{ backgroundColor: ev.soft, color: ev.color, borderLeft: `2px solid ${ev.color}` }}
                                                        >
                                                            {ev.client}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <div className={viewMode === 'Day' ? 'min-w-[420px]' : 'min-w-[1120px]'}>
                                    {/* Day Headers */}
                                    <div
                                        className={`grid border-b ${viewMode === 'Day' ? 'grid-cols-2' : 'grid-cols-8'}`}
                                        style={{ borderColor: 'var(--border-subtle)' }}
                                    >
                                        <div className="px-2 py-3 text-[10px] font-bold uppercase text-center" style={{ color: 'var(--text-muted)' }}>
                                            GMT+0
                                        </div>
                                        {displayedDays.map((day) => (
                                            <div
                                                key={day.key}
                                                className="border-l py-2 text-center"
                                                style={{ borderColor: 'var(--border-subtle)' }}
                                            >
                                                <div className="text-[10px] font-bold" style={{ color: day.isToday ? 'var(--accent)' : 'var(--text-muted)' }}>
                                                    {day.dayName}
                                                </div>
                                                <div
                                                    className="mx-auto mt-0.5 flex h-7 w-7 items-center justify-center rounded-full font-inter-black text-sm"
                                                    style={{
                                                        backgroundColor: day.isToday ? 'var(--accent)' : 'transparent',
                                                        color: day.isToday ? '#fff' : 'var(--text-primary)',
                                                    }}
                                                >
                                                    {day.dateNum}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Hour Rows */}
                                    {HOURS.map((hour) => (
                                        <div
                                            key={hour}
                                            className={`grid border-b last:border-b-0 min-h-[78px] ${viewMode === 'Day' ? 'grid-cols-2' : 'grid-cols-8'}`}
                                            style={{ borderColor: 'var(--border-subtle)' }}
                                        >
                                            <div className="px-2 py-2 text-[11px] font-semibold text-right tabular-nums" style={{ color: 'var(--text-muted)' }}>
                                                {hour}
                                            </div>
                                            {displayedDays.map((day) => {
                                                const cellEvents = visibleAppointments.filter((a) => a.day === day.key && a.hour === hour);
                                                return (
                                                    <div
                                                        key={day.key}
                                                        className="relative border-l p-1.5 space-y-1 transition-colors hover:bg-black/[0.015]"
                                                        style={{ borderColor: 'var(--border-subtle)' }}
                                                    >
                                                        {day.isToday && hour === '10 AM' && (
                                                            <div className="absolute inset-x-0 top-3 flex items-center pointer-events-none z-10">
                                                                <span className="h-2 w-2 -ml-1 rounded-full bg-rose-500" />
                                                                <div className="h-[2px] w-full bg-rose-500" />
                                                            </div>
                                                        )}
                                                        {cellEvents.map((ev) => (
                                                            <button
                                                                key={ev.id}
                                                                type="button"
                                                                onClick={() => setSelectedEvent(ev)}
                                                                className="w-full text-left rounded-lg px-2.5 py-2 text-[11px] transition-all hover:-translate-y-0.5 hover:shadow-sm cursor-pointer space-y-1.5"
                                                                style={{
                                                                    backgroundColor: `color-mix(in srgb, ${ev.color} 13%, var(--bg-surface))`,
                                                                    color: 'var(--text-primary)',
                                                                }}
                                                            >
                                                                <div className="flex items-center gap-1.5">
                                                                    <UserAvatar name={ev.client} />
                                                                    <span className="font-bold truncate">{ev.client}</span>
                                                                </div>
                                                                <div className="text-[10px] tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                                                                    {ev.time}
                                                                </div>
                                                                <div className="flex items-center justify-between gap-1 pt-0.5">
                                                                    <span className="text-[9px] font-bold uppercase" style={{ color: ev.color }}>
                                                                        {ev.type}
                                                                    </span>
                                                                    <UserAvatar name={ev.advisor} />
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* Event Detail Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs" onClick={() => setSelectedEvent(null)}>
                    <div
                        className="animate-popover w-full max-w-sm rounded-2xl border p-4 shadow-2xl"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                                <UserAvatar name={selectedEvent.client} size="md" />
                                <div>
                                    <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{selectedEvent.client}</div>
                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{selectedEvent.type}</div>
                                </div>
                            </div>
                            <button type="button" onClick={() => setSelectedEvent(null)} className="p-1 rounded-md cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-2 text-xs border-t pt-3" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                            <div className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
                                <span>{selectedEvent.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UserAvatar name={selectedEvent.advisor} />
                                <span>Advisor: <strong style={{ color: 'var(--text-primary)' }}>{selectedEvent.advisor}</strong></span>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedEvent(null)}
                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white cursor-pointer"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                <Phone className="h-3.5 w-3.5" /> Start Call
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
