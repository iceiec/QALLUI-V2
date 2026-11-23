import React, { useState } from 'react';
import CustomSelect from './CustomSelect';
import { createPortal } from 'react-dom';
import { X, Plus, Calendar, Phone, MessageSquare, FolderOpen } from 'lucide-react';

const INITIAL_APPOINTMENTS = [
    {
        id: 1,
        date: '2026-06-17',
        displayDate: 'Wed, 17 Jun 2026',
        timeRange: '8:11 PM - 8:30 PM',
        startTime: '20:11',
        endTime: '20:30',
        status: 'New Business',
        badge: 'Past',
        title: 'Gavin Testing Baker2 & GavinTest2 Partner2',
        note: 'Initial discovery call completed.',
    },
];

export default function AppointmentsModal({ open, onClose, onOpenClientFile, clientName = 'Gavin Testing Baker2 & GavinTest2 Partner2' }) {
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
    const [selectedId, setSelectedId] = useState(null); // null = creating new
    const [title, setTitle] = useState(clientName);
    const [date, setDate] = useState('2026-11-19');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [status, setStatus] = useState('');
    const [note, setNote] = useState('');
    const [smsOpen, setSmsOpen] = useState(false);

    if (!open) return null;

    const inputStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const handleNew = () => {
        setSelectedId(null);
        setTitle(clientName);
        setDate('2026-11-19');
        setStartTime('');
        setEndTime('');
        setStatus('');
        setNote('');
    };

    const handleSelect = (appt) => {
        setSelectedId(appt.id);
        setTitle(appt.title);
        setDate(appt.date);
        setStartTime(appt.startTime);
        setEndTime(appt.endTime);
        setStatus(appt.status);
        setNote(appt.note);
    };

    const handleCreate = () => {
        if (selectedId === null) {
            setAppointments((prev) => [
                {
                    id: Date.now(),
                    date,
                    displayDate: date,
                    timeRange: startTime && endTime ? `${startTime} - ${endTime}` : 'Scheduled',
                    startTime,
                    endTime,
                    status: status || 'New Business',
                    badge: 'Upcoming',
                    title,
                    note,
                },
                ...prev,
            ]);
        }
        onClose();
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]"
            onClick={onClose}
        >
            <div
                className="animate-popover my-auto w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                        <h3 className="font-inter-black text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                            Appointments <span className="font-normal" style={{ color: 'var(--text-muted)' }}>— {clientName}</span>
                        </h3>
                    </div>
                    <button type="button" onClick={onClose} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* 2-Pane Body */}
                <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12">
                    {/* Left Pane: Appointments List */}
                    <div className="md:col-span-5 border-b md:border-b-0 md:border-r p-4 space-y-3" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface-alt)' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-inter-black text-xs" style={{ color: 'var(--text-primary)' }}>Appointments</span>
                                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                                    {appointments.length}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleNew}
                                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-blue-700 cursor-pointer"
                            >
                                <Plus className="h-3.5 w-3.5" /> New
                            </button>
                        </div>

                        <div className="space-y-2">
                            {appointments.map((appt) => {
                                const active = selectedId === appt.id;
                                return (
                                    <button
                                        key={appt.id}
                                        type="button"
                                        onClick={() => handleSelect(appt)}
                                        className="w-full rounded-xl border p-3 text-left transition-colors cursor-pointer"
                                        style={{
                                            backgroundColor: 'var(--bg-surface)',
                                            borderColor: active ? 'var(--accent)' : 'var(--border-subtle)',
                                        }}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{appt.displayDate}</div>
                                            <span className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: 'var(--bg-surface-alt)', color: 'var(--text-muted)' }}>
                                                {appt.badge}
                                            </span>
                                        </div>
                                        <div className="mt-0.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>{appt.timeRange}</div>
                                        <span className="mt-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: 'var(--bg-surface-alt)', color: 'var(--text-secondary)' }}>
                                            {appt.status}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Pane: Appointment Details */}
                    <div className="md:col-span-7 p-4 sm:p-5 space-y-3.5 text-xs">
                        <div className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Appointment details</div>

                        {selectedId === null && (
                            <div className="rounded-xl border p-3" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                                    <Plus className="h-3.5 w-3.5" /> Creating a new appointment
                                </div>
                                <p className="mt-0.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                    Adds a new entry. The existing appointments on this lead are untouched.
                                </p>
                            </div>
                        )}

                        <div>
                            <label className="block font-semibold mb-1">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block font-semibold mb-1">Start Time</label>
                                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">End Time</label>
                                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Status</label>
                            <CustomSelect value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle} options={[{"label":"Select Status","value":""},{"label":"New Business","value":"New Business"},{"label":"Follow Up","value":"Follow Up"},{"label":"Completed","value":"Completed"},{"label":"Cancelled","value":"Cancelled"}]} />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Note</label>
                            <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note" className="w-full rounded-lg border px-3 py-2 outline-none resize-none" style={inputStyle} />
                            <div className="mt-1 text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                                Last note: {appointments[0]?.note || 'None'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t px-5 py-3 text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex flex-wrap items-center gap-1.5">
                        <button type="button" onClick={() => setSmsOpen(true)} className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-semibold cursor-pointer" style={inputStyle}>
                            <MessageSquare className="h-3.5 w-3.5" /> Send SMS
                        </button>
                        <button type="button" className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-semibold cursor-pointer" style={inputStyle}>
                            <Phone className="h-3.5 w-3.5" /> Call
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (onOpenClientFile) onOpenClientFile();
                                onClose();
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-semibold cursor-pointer"
                            style={inputStyle}
                        >
                            <FolderOpen className="h-3.5 w-3.5" /> Open Client File
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={onClose} className="rounded-lg border border-amber-500/40 px-3.5 py-1.5 font-bold text-amber-500 hover:bg-amber-500/10 cursor-pointer">
                            Save draft
                        </button>
                        <button type="button" onClick={handleCreate} className="rounded-lg bg-blue-600 px-4 py-1.5 font-bold text-white hover:bg-blue-700 cursor-pointer">
                            {selectedId === null ? 'Create Appointment' : 'Update Appointment'}
                        </button>
                    </div>
                </div>
            </div>

            {smsOpen && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-[3px]"
                    onClick={() => setSmsOpen(false)}
                >
                    <div
                        className="animate-popover w-full max-w-md rounded-2xl border p-5 shadow-2xl text-xs space-y-4"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h4 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>Send SMS</h4>
                            <button type="button" onClick={() => setSmsOpen(false)} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Send Message To</label>
                            <CustomSelect defaultValue="7412764478" style={inputStyle} options={["7412764478"]} />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Description</label>
                            <textarea rows={3} className="w-full rounded-lg border px-3 py-2 outline-none resize-none" style={inputStyle} />
                        </div>
                        <div>
                            <button type="button" onClick={() => setSmsOpen(false)} className="rounded-lg bg-amber-400 px-5 py-2 text-xs font-bold text-slate-900 hover:bg-amber-500 cursor-pointer">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}
