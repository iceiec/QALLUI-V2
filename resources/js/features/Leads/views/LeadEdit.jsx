import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head, Link } from '@inertiajs/react';
import { Phone, Calendar, ChevronDown, Plus, Edit3, Trash2, ArrowLeft, Upload, Download, Play, FileText, Send, Mic, X } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import UserAvatar from '@/components/UserAvatar';
import ConfirmModal from '@/components/ConfirmModal';
import AddPolicyModal from '../components/AddPolicyModal';
import AppointmentsModal from '../components/AppointmentsModal';
import CustomSelect from '@/components/CustomSelect';

const TABS = [
    'Summary',
    'Fact Find',
    'Client Notes',
    'Documents',
    'Messages',
    'Policy History',
    'Quoting',
    'Compliance',
    'Customer',
    'Calls',
    'Q/AI',
];

const FF_SECTIONS = [
    { id: 'customer', label: 'Customer Info' },
    { id: 'income', label: 'Income' },
    { id: 'health', label: 'Health Screening' },
    { id: 'medical', label: 'Medical Conditions' },
    { id: 'property', label: 'Property Info' },
    { id: 'outgoings', label: 'Outgoings & Children' },
    { id: 'additional', label: 'Additional Info' },
];

const COMPLIANCE_SECTIONS = [
    { id: 'compliance', label: 'Compliance' },
    { id: 'doc-check', label: 'Document Upload Check' },
    { id: 'commission', label: 'Commission' },
    { id: 'admin-checks', label: 'Administration Checks' },
];

export default function LeadEdit() {
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const leadClient = searchParams?.get('client') || 'Gavin Testing Baker2 & GavinTest2 Partner2';
    const leadPolicy = searchParams?.get('policy') || '01230123';
    const leadStage = searchParams?.get('stage') || 'Quoting';
    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            const tabParam = new URLSearchParams(window.location.search).get('tab');
            if (tabParam && TABS.includes(tabParam)) return tabParam;
        }
        return 'Summary';
    });
    const [ffSection, setFfSection] = useState('customer');
    const [historyRange, setHistoryRange] = useState('All dates');
    const [historyDropdownOpen, setHistoryDropdownOpen] = useState(false);
    const [complianceSection, setComplianceSection] = useState('compliance');
    const [docChecks, setDocChecks] = useState({
        'Provider Quote': true,
        Comparison: true,
        Acceptance: true,
        'Copy Application': true,
        'Trust Form': true,
    });
    const [adminChecks, setAdminChecks] = useState({
        'Have You Marked The Policy As Active?': true,
        'Is The Call Recording Available If Required?': true,
        'Have You Updated The Commission Amount?': true,
        'Quotes Completed?': true,
        'Are The Client Notes Completed In Full?': true,
        'Is The Record Stage Marked As On Cover?': true,
        'Have You Updated The Clients Budget Amount?': true,
    });
    const [commissionSchedule, setCommissionSchedule] = useState('single');
    const [jointAccount, setJointAccount] = useState(true);
    const [showMovements, setShowMovements] = useState(false);
    const [hasChildren, setHasChildren] = useState('Yes');
    const [msgChannel, setMsgChannel] = useState('SMS');
    const [noteText, setNoteText] = useState('');
    const [noteFilterTag, setNoteFilterTag] = useState('All');
    const [noteSearch, setNoteSearch] = useState('');
    const [noteDate, setNoteDate] = useState('');
    const [mobileFfSectionsOpen, setMobileFfSectionsOpen] = useState(false);
    const [mobileComplianceSectionsOpen, setMobileComplianceSectionsOpen] = useState(false);
    const [mobileTabsOpen, setMobileTabsOpen] = useState(false);
    const [addPolicyOpen, setAddPolicyOpen] = useState(null); // null | 'add' | 'edit'
    const [deletePolicyOpen, setDeletePolicyOpen] = useState(false);
    const [quoteModalOpen, setQuoteModalOpen] = useState(null); // null | 'add' | 'edit'
    const [deleteQuoteOpen, setDeleteQuoteOpen] = useState(false);
    const [appointmentsOpen, setAppointmentsOpen] = useState(false);
    const [callModalOpen, setCallModalOpen] = useState(false);
    const [callProvider, setCallProvider] = useState('CircleLoop');
    const [medicalModal, setMedicalModal] = useState(null); // null | 'add' | 'edit'
    const [deleteMedicalOpen, setDeleteMedicalOpen] = useState(false);
    const [propertyModal, setPropertyModal] = useState(null); // null | 'add' | 'edit'
    const [deletePropertyOpen, setDeletePropertyOpen] = useState(false);

    const inputStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    return (
        <AppLayout>
            <Head title="Gavin Testing Baker2 â€” Lead" />
            <div className="space-y-4">
                {/* Top Lead Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            href="/leads"
                            className="mt-1 rounded-lg border p-1.5 transition-colors"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                            title="Back to Leads"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <UserAvatar name={leadClient} size="md" />
                                <h1 className="font-inter-black text-lg sm:text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                    {leadClient} : {leadPolicy}
                                </h1>
                                <Badge tone="sky">{leadStage}</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2.5 rounded-xl border px-3 py-2 sm:rounded-none sm:border-0 sm:p-0 sm:!bg-transparent" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}>
                        <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                            <input type="checkbox" checked={jointAccount} onChange={() => setJointAccount((v) => !v)} className="rounded cursor-pointer" />
                            <span>Joint Account</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={() => setCallModalOpen(true)} className="rounded-lg border p-2 cursor-pointer" style={inputStyle} title="Call"><Phone className="h-4 w-4" style={{ color: 'var(--accent)' }} /></button>
                            <button type="button" onClick={() => setAppointmentsOpen(true)} className="rounded-lg border p-2 cursor-pointer" style={inputStyle} title="Schedule"><Calendar className="h-4 w-4" style={{ color: 'var(--accent)' }} /></button>
                        </div>
                    </div>
                </div>

                {/* Mobile Tab Dropdown */}
                <div className="relative sm:hidden">
                    <button
                        type="button"
                        onClick={() => {
                            setMobileTabsOpen((v) => !v);
                            setMobileFfSectionsOpen(false);
                            setMobileComplianceSectionsOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-bold cursor-pointer"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                    >
                        <span>Tab: {activeTab}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileTabsOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                    </button>

                    {mobileTabsOpen && (
                        <div
                            className="animate-popover absolute left-0 right-0 mt-1.5 z-40 rounded-xl border p-1.5 shadow-xl max-h-72 overflow-y-auto"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                        >
                            {TABS.map((tab) => {
                                const active = activeTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => {
                                            setActiveTab(tab);
                                            setMobileTabsOpen(false);
                                        }}
                                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold cursor-pointer transition-colors"
                                        style={{
                                            backgroundColor: active ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
                                            color: active ? 'var(--accent)' : 'var(--text-primary)',
                                        }}
                                    >
                                        <span>{tab}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Sub-navigation Tabs */}
                <div className="hidden sm:flex items-center gap-1 overflow-x-auto pb-1 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                    {TABS.map((tab) => {
                        const active = activeTab === tab;
                        const isCompliance = tab === 'Compliance';
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className="rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
                                style={{
                                    backgroundColor: active
                                        ? 'var(--accent)'
                                        : isCompliance
                                        ? 'rgba(245, 158, 11, 0.16)'
                                        : 'transparent',
                                    color: active
                                        ? '#fff'
                                        : isCompliance
                                        ? '#D97706'
                                        : 'var(--text-secondary)',
                                }}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                <div key={activeTab} className="animate-page-enter">
                {activeTab === 'Summary' && (
                    <div className="space-y-4">
                        <Card hoverable={false}>
                            <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Client Summary</h2>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div><div className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Title</div><div className="mt-1 font-semibold">Mr</div></div>
                                <div><div className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>First Name</div><div className="mt-1 font-semibold">Gavin Testing</div></div>
                                <div><div className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Last Name</div><div className="mt-1 font-semibold">Baker2</div></div>
                                <div><div className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Mobile</div><div className="mt-1 font-semibold tabular-nums">7412764478</div></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-xs pt-4">
                                <div><div className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Policy Number</div><div className="mt-1 font-semibold tabular-nums">01230123</div></div>
                                <div><div className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Lead Origin</div><div className="mt-1 font-semibold">Qall Vietnam</div></div>
                                <div><div className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Date Created</div><div className="mt-1 font-semibold tabular-nums">25/10/2024</div></div>
                            </div>
                        </Card>

                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <button
                                type="button"
                                onClick={() => setShowMovements((v) => !v)}
                                className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
                            >
                                <div>
                                    <div className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Lead Movements</div>
                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>31 movements â€¢ latest 12/06/2026</div>
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMovements ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                            </button>

                            {showMovements && (
                                <div className="border-t p-4 space-y-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Show</span>
                                        <CustomSelect style={inputStyle} options={["All movements","Reassigned","Accepted"]} />
                                        <button type="button" className="rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer" style={inputStyle}>Reset</button>
                                    </div>
                                    <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                                        {[
                                            { title: 'Reassigned', sub: 'Tricia Junior â†’ gerson junior', date: '12/06/2026 11:25', color: '#8B5CF6' },
                                            { title: 'Lead Accepted from the leads pool', sub: 'By gerson junior', date: '12/06/2026 11:25', color: '#00B073' },
                                            { title: 'Reassigned', sub: 'Lapsed Clients â†’ Tricia Junior', date: '13/05/2026 12:00', color: '#8B5CF6' },
                                            { title: 'Lead Accepted from the leads pool', sub: 'By Tricia Junior', date: '13/05/2026 12:00', color: '#00B073' },
                                        ].map((m, i) => (
                                            <div key={i} className="flex items-center justify-between py-2.5 text-xs">
                                                <div className="flex items-center gap-3">
                                                    <span className="h-6 w-6 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                                                    <div>
                                                        <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{m.title}</div>
                                                        <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{m.sub}</div>
                                                    </div>
                                                </div>
                                                <span className="text-[11px] tabular-nums" style={{ color: 'var(--text-muted)' }}>{m.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>

                        <Card hoverable={false}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                <div>
                                    <div className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Lead History</div>
                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>62 activity entries • latest 16/11/2026</div>
                                </div>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setHistoryDropdownOpen((v) => !v)}
                                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer"
                                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                                    >
                                        <span>{historyRange}</span>
                                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${historyDropdownOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                    </button>
                                    {historyDropdownOpen && (
                                        <div
                                            className="animate-popover absolute left-0 sm:left-auto sm:right-0 mt-1.5 w-36 z-30 rounded-xl border p-1 shadow-xl"
                                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                        >
                                            {['All dates', 'Last 7 days'].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => {
                                                        setHistoryRange(opt);
                                                        setHistoryDropdownOpen(false);
                                                    }}
                                                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold cursor-pointer transition-colors"
                                                    style={{
                                                        backgroundColor: historyRange === opt ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
                                                        color: historyRange === opt ? 'var(--accent)' : 'var(--text-primary)',
                                                    }}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Badge tone="rose">16/11/2026</Badge>
                                <div className="rounded-xl border p-3 text-xs flex items-center justify-between" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                    <div>
                                        <div className="text-[10px] tabular-nums" style={{ color: 'var(--text-muted)' }}>16:43 - 16:43</div>
                                        <div className="mt-0.5 font-medium" style={{ color: 'var(--text-primary)' }}>Lead tagged as Won Back by angelo villanueva</div>
                                    </div>
                                    <Badge tone="sky">UPDATE</Badge>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'Fact Find' && (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-start">
                        {/* Mobile Inline Section Dropdown */}
                        <div className="relative lg:hidden">
                            <button
                                type="button"
                                onClick={() => {
                                    setMobileFfSectionsOpen((v) => !v);
                                    setMobileTabsOpen(false);
                                    setMobileComplianceSectionsOpen(false);
                                }}
                                className="flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-bold cursor-pointer"
                                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                            >
                                <span className="flex items-center gap-2">
                                    <span
                                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                        style={{ backgroundColor: 'var(--accent)' }}
                                    >
                                        {FF_SECTIONS.findIndex((s) => s.id === ffSection) + 1}
                                    </span>
                                    <span>{FF_SECTIONS.find((s) => s.id === ffSection)?.label}</span>
                                </span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${mobileFfSectionsOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                            </button>

                            {mobileFfSectionsOpen && (
                                <div
                                    className="animate-popover absolute left-0 right-0 mt-1.5 z-40 rounded-xl border p-1.5 shadow-xl"
                                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                >
                                    {FF_SECTIONS.map((sec, idx) => {
                                        const active = ffSection === sec.id;
                                        return (
                                            <button
                                                key={sec.id}
                                                type="button"
                                                onClick={() => {
                                                    setFfSection(sec.id);
                                                    setMobileFfSectionsOpen(false);
                                                }}
                                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold cursor-pointer transition-colors"
                                                style={{
                                                    backgroundColor: active ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
                                                    color: active ? 'var(--accent)' : 'var(--text-primary)',
                                                }}
                                            >
                                                <span
                                                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                                                    style={{
                                                        backgroundColor: active ? 'var(--accent)' : 'var(--bg-surface-alt)',
                                                        color: active ? '#fff' : 'var(--text-muted)',
                                                    }}
                                                >
                                                    {idx + 1}
                                                </span>
                                                <span>{sec.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Sticky Section Navigator */}
                        <Card className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20" padding="p-3" hoverable={false}>
                            <div className="text-[10px] font-bold uppercase tracking-wider px-2 pb-2" style={{ color: 'var(--text-muted)' }}>
                                Fact Find Sections
                            </div>
                            <div className="space-y-1">
                                {FF_SECTIONS.map((sec, idx) => {
                                    const active = ffSection === sec.id;
                                    return (
                                        <button
                                            key={sec.id}
                                            type="button"
                                            onClick={() => setFfSection(sec.id)}
                                            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-left transition-colors cursor-pointer"
                                            style={{
                                                backgroundColor: active ? 'var(--accent-soft)' : 'transparent',
                                                color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                                            }}
                                        >
                                            <span
                                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                                                style={{
                                                    backgroundColor: active ? 'var(--accent)' : 'var(--bg-surface-alt)',
                                                    color: active ? '#fff' : 'var(--text-muted)',
                                                }}
                                            >
                                                {idx + 1}
                                            </span>
                                            <span>{sec.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Clean Focused Section Content */}
                        <div className="lg:col-span-9 space-y-4">
                            {ffSection === 'customer' && (
                                <div className={`grid grid-cols-1 gap-4 ${jointAccount ? 'xl:grid-cols-2' : ''}`}>
                                <Card hoverable={false}>
                                    <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Customer Information</h2>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                                        <div><label className="block font-semibold mb-1">Title *</label><CustomSelect defaultValue="Mr" options={['', 'Mr', 'Mrs', 'Miss', 'Dr', 'Prof', 'Rev', 'Ms']} placeholder="Select" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Marital Status *</label><CustomSelect defaultValue="Single" options={['', 'Single', 'Married', 'Widowed', 'Living With Partner', 'Divorced']} placeholder="Select" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Gender *</label><CustomSelect style={inputStyle} options={["Female","Male"]} /></div>
                                        <div><label className="block font-semibold mb-1">First Name</label><input type="text" defaultValue="Gavin Testing" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Middle Name</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Last Name</label><input type="text" defaultValue="Baker2" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Date Of Birth</label><input type="date" defaultValue="1996-02-09" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div className="sm:col-span-2"><label className="block font-semibold mb-1">Age</label><input type="text" readOnly value="30 years, 2 months, 16 days" className="w-full rounded-lg border px-3 py-2 outline-none opacity-80" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Email</label><input type="email" defaultValue="whatever@hotmail.com" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Mobile</label><input type="text" defaultValue="+44 7412764478" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Company Postcode</label><input type="text" defaultValue="sw1v3ay" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                    </div>
                                </Card>
                                {jointAccount && (
                                    <Card hoverable={false}>
                                        <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Customer Information (Partner)</h2>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                                            <div><label className="block font-semibold mb-1">Title *</label><CustomSelect defaultValue="Mr" options={['', 'Mr', 'Mrs', 'Miss', 'Dr', 'Prof', 'Rev', 'Ms']} placeholder="Select" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Marital Status *</label><CustomSelect defaultValue="Single" options={['', 'Single', 'Married', 'Widowed', 'Living With Partner', 'Divorced']} placeholder="Select" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Partner&apos;s Gender *</label><CustomSelect style={inputStyle} options={["Female","Male"]} /></div>
                                            <div><label className="block font-semibold mb-1">First Name</label><input type="text" defaultValue="GavinTest2" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Middle Name</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Last Name</label><input type="text" defaultValue="Partner2" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Date Of Birth</label><input type="date" defaultValue="2000-08-15" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                            <div className="sm:col-span-2"><label className="block font-semibold mb-1">Age</label><input type="text" readOnly value="26 years, 3 months, 4 days" className="w-full rounded-lg border px-3 py-2 outline-none opacity-80" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Email</label><input type="email" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Mobile</label><input type="text" placeholder="+44" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Company Name</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Company Postcode</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                        </div>
                                    </Card>
                                )}
                                </div>
                            )}

                            {ffSection === 'income' && (
                                <div className={`grid grid-cols-1 gap-4 ${jointAccount ? 'xl:grid-cols-2' : ''}`}>
                                <Card hoverable={false}>
                                    <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Income</h2>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                                        <div><label className="block font-semibold mb-1">Employment Status</label><CustomSelect defaultValue="Employed" style={inputStyle} options={["None","Employed","Self-Employed","Carer","Retired","Unemployed","Disabled"]} /></div>
                                        <div><label className="block font-semibold mb-1">Occupation</label><input type="text" defaultValue="company" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Emp Sector</label><CustomSelect style={inputStyle} options={["Private","Public"]} /></div>
                                        <div><label className="block font-semibold mb-1">Income Per Annum</label><input type="text" defaultValue="Â£ 50,000" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Income Per Month</label><input type="text" defaultValue="Â£ 4,167" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Income Per Week</label><input type="text" defaultValue="Â£ 962" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                    </div>
                                </Card>
                                {jointAccount && (
                                    <Card hoverable={false}>
                                        <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Income (Partner)</h2>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                                            <div><label className="block font-semibold mb-1">Employment Status</label><CustomSelect defaultValue="Employed" style={inputStyle} options={["None","Employed","Self-Employed","Carer","Retired","Unemployed","Disabled"]} /></div>
                                            <div><label className="block font-semibold mb-1">Occupation</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Emp Sector</label><CustomSelect style={inputStyle} options={["Private","Public"]} /></div>
                                            <div><label className="block font-semibold mb-1">Income Per Annum</label><input type="text" placeholder="Â£" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Income Per Month</label><input type="text" placeholder="Â£" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                            <div><label className="block font-semibold mb-1">Income Per Week</label><input type="text" placeholder="Â£" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        </div>
                                    </Card>
                                )}
                                </div>
                            )}

                            {ffSection === 'health' && (
                                <Card hoverable={false}>
                                    <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Health Screening</h2>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                                        <div><label className="block font-semibold mb-1">Smoker</label><CustomSelect style={inputStyle} options={["No","Yes"]} /></div>
                                        <div><label className="block font-semibold mb-1">Waist (IN)</label><input type="text" defaultValue="36" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Height (CM)</label><input type="text" defaultValue="188" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Weight (KG)</label><input type="text" defaultValue="110" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Mother Age</label><input type="number" defaultValue={77} className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Alive</label><CustomSelect style={inputStyle} options={["Yes","No"]} /></div>
                                        <div><label className="block font-semibold mb-1">Medical Condition</label><CustomSelect style={inputStyle} options={["None"]} /></div>
                                        <div><label className="block font-semibold mb-1">Cond. Age</label><input type="number" defaultValue={1} className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Father Age</label><input type="number" defaultValue={0} className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Alive</label><CustomSelect style={inputStyle} options={["No","Yes"]} /></div>
                                        <div><label className="block font-semibold mb-1">Medical Condition</label><CustomSelect style={inputStyle} options={["None"]} /></div>
                                        <div><label className="block font-semibold mb-1">Cond. Age</label><input type="number" defaultValue={1} className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                    </div>
                                </Card>
                            )}

                            {ffSection === 'medical' && (
                                <Card padding="p-0 overflow-hidden" hoverable={false}>
                                    <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Medical Conditions</h2>
                                        <button type="button" onClick={() => setMedicalModal('add')} className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}><Plus className="h-3.5 w-3.5" /> Add Medical Condition</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead>
                                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                    <th className="px-4 py-2.5 font-bold uppercase">Condition</th>
                                                    <th className="px-3 py-2.5 font-bold uppercase">Diagnosed</th>
                                                    <th className="px-3 py-2.5 font-bold uppercase">Status</th>
                                                    <th className="px-3 py-2.5 font-bold uppercase">Client</th>
                                                    <th className="px-4 py-2.5 font-bold uppercase text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { cond: 'Knee Injury', diag: 'Jan 2022', client: 'Gavin' },
                                                    { cond: 'Acute lymphoblastic leukaemia: Children', diag: 'Feb 2025', client: 'GavinTest2' },
                                                ].map((m, i) => (
                                                    <tr key={i} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                        <td className="px-4 py-2.5 font-semibold">{m.cond}</td>
                                                        <td className="px-3 py-2.5 tabular-nums">{m.diag}</td>
                                                        <td className="px-3 py-2.5"><Badge tone="emerald">ONGOING</Badge></td>
                                                        <td className="px-3 py-2.5"><span className="inline-flex items-center gap-1.5"><UserAvatar name={m.client} /><span>{m.client}</span></span></td>
                                                        <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-1.5">
                                                                <button type="button" onClick={() => setMedicalModal('edit')} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 cursor-pointer"><Edit3 className="h-3.5 w-3.5" /></button>
                                                                <button type="button" onClick={() => setDeleteMedicalOpen(true)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            )}

                            {ffSection === 'property' && (
                                <Card padding="p-0 overflow-hidden" hoverable={false}>
                                    <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Property Information</h2>
                                        <button type="button" onClick={() => setPropertyModal('add')} className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}><Plus className="h-3.5 w-3.5" /> Add Property</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead>
                                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                    <th className="px-4 py-2.5 font-bold uppercase">H-No</th>
                                                    <th className="px-3 py-2.5 font-bold uppercase">Postcode</th>
                                                    <th className="px-3 py-2.5 font-bold uppercase text-right">Value</th>
                                                    <th className="px-3 py-2.5 font-bold uppercase text-right">M Balance</th>
                                                    <th className="px-3 py-2.5 font-bold uppercase">Status</th>
                                                    <th className="px-4 py-2.5 font-bold uppercase text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="qall-row-hover">
                                                    <td className="px-4 py-2.5 tabular-nums">11</td>
                                                    <td className="px-3 py-2.5">L4 7XG</td>
                                                    <td className="px-3 py-2.5 text-right tabular-nums">Â£1,000</td>
                                                    <td className="px-3 py-2.5 text-right tabular-nums">Â£500</td>
                                                    <td className="px-3 py-2.5">Previous</td>
                                                    <td className="px-4 py-2.5 text-right">
                                                        <div className="inline-flex items-center gap-1.5">
                                                            <button type="button" onClick={() => setPropertyModal('edit')} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 cursor-pointer"><Edit3 className="h-3.5 w-3.5" /></button>
                                                            <button type="button" onClick={() => setDeletePropertyOpen(true)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            )}

                            {ffSection === 'outgoings' && (
                                <Card hoverable={false}>
                                    <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Outgoings &amp; Children</h2>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs mb-4">
                                        <div>
                                            <label className="block font-semibold mb-1">Children</label>
                                            <CustomSelect value={hasChildren} onChange={(e) => setHasChildren(e.target.value)} style={inputStyle} options={["Yes","No"]} />
                                        </div>
                                        <div><label className="block font-semibold mb-1">Financially Dependent</label><CustomSelect style={inputStyle} options={["No","Yes"]} /></div>
                                        <div><label className="block font-semibold mb-1">Lone Parent</label><CustomSelect style={inputStyle} options={["Yes","No"]} /></div>
                                        <div><label className="block font-semibold mb-1">Cost To 18</label><input type="text" defaultValue="Â£ 0" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                    </div>

                                    {hasChildren === 'Yes' && (
                                        <div className="animate-popover rounded-xl border p-3.5 mb-4 space-y-3" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                            <div>
                                                <div className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>Children Information &amp; Birthday Entry</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Fill out the details below. Entering the Date of Birth automatically calculates age and updates Cost To 18.</div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-4 text-xs items-end">
                                                <div><label className="block font-semibold mb-1">Child #</label><CustomSelect style={inputStyle} options={["1","2"]} /></div>
                                                <div><label className="block font-semibold mb-1">Child Name *</label><input type="text" placeholder="E.G. LEO" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                                <div><label className="block font-semibold mb-1">Date Of Birth *</label><input type="text" placeholder="mm/dd/yyyy" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                                <button type="button" className="rounded-lg py-2 px-3 font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>+ Add Child</button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                                        <div><label className="block font-semibold mb-1">Food</label><input type="text" defaultValue="Â£ 300" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">C Tax</label><input type="text" defaultValue="Â£ 120" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Utilities</label><input type="text" defaultValue="Â£ 200" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={inputStyle} /></div>
                                        <div><label className="block font-semibold mb-1">Total Per Month</label><input type="text" readOnly value="Â£ 620" className="w-full rounded-lg border px-3 py-2 outline-none font-bold tabular-nums" style={inputStyle} /></div>
                                    </div>
                                </Card>
                            )}

                            {ffSection === 'additional' && (
                                <Card hoverable={false}>
                                    <h2 className="font-inter-black text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Additional Info</h2>
                                    <textarea rows={4} defaultValue="test" className="w-full rounded-lg border p-3 text-xs outline-none" style={inputStyle} />
                                </Card>
                            )}

                            {/* Sticky Bottom Action Bar */}
                            <Card padding="p-3" hoverable={false}>
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <button type="button" className="rounded-lg bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-500/25 cursor-pointer">Reject</button>
                                        <button type="button" className="rounded-lg bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-500/25 cursor-pointer">Dead</button>
                                    </div>
                                    <button type="button" className="rounded-lg px-4 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                                        FF Complete
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {activeTab === 'Client Notes' && (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                        {/* Left Sidebar: Pinned & Recent Notes */}
                        <Card padding="p-3" hoverable={false} className="lg:col-span-4 h-fit">
                            <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                Pinned Notes
                            </div>
                            <div className="space-y-1">
                                {[
                                    { title: 'Client Follow-up', tag: 'GPR', time: 'Today' },
                                    { title: 'WhatsApp Confirmation', tag: 'INFO', time: '6 Nov' },
                                    { title: 'Document Received', tag: 'CLAW', time: '5 Nov' },
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs qall-row-hover cursor-pointer"
                                    >
                                        <div>
                                            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</div>
                                            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.tag}</div>
                                        </div>
                                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.time}</span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Right Main Area: Feed + Floating Composer */}
                        <Card padding="p-4" hoverable={false} className="lg:col-span-8 flex flex-col justify-between min-h-[420px]">
                            <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2.5" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div className="flex flex-wrap items-center gap-1">
                                    {['All', 'GPR', 'CLAW', 'INFO', 'ISSUE'].map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setNoteFilterTag(t)}
                                            className="rounded-full px-2.5 py-1 text-[10px] font-bold cursor-pointer"
                                            style={{
                                                backgroundColor: noteFilterTag === t ? 'var(--accent)' : 'var(--bg-surface-alt)',
                                                color: noteFilterTag === t ? '#fff' : 'var(--text-secondary)',
                                            }}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                    <input
                                        type="date"
                                        value={noteDate}
                                        onChange={(e) => setNoteDate(e.target.value)}
                                        className="rounded-lg border px-2.5 py-1 text-xs outline-none w-full sm:w-auto"
                                        style={inputStyle}
                                    />
                                    <input
                                        type="text"
                                        value={noteSearch}
                                        onChange={(e) => setNoteSearch(e.target.value)}
                                        placeholder="Search notes..."
                                        className="rounded-lg border px-2.5 py-1 text-xs outline-none w-full sm:w-40"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                                {[
                                    { author: 'gerson junior', time: 'Fri 6th November 2026 - 11:34', isoDate: '2026-11-06', text: 'Hiya', tag: 'GPR' },
                                    { author: 'WhatsApp message to client', time: 'Fri 6th November 2026 - 11:34', isoDate: '2026-11-06', text: 'hey Rob', tag: 'INFO' },
                                    { author: 'WhatsApp message to client', time: 'Fri 6th November 2026 - 11:32', isoDate: '2026-11-06', text: 'did you receive it?', tag: 'CLAW' },
                                    { author: 'WhatsApp message to client', time: 'Fri 6th November 2026 - 11:32', isoDate: '2026-11-06', text: 'yeah, let me show you this', tag: 'INFO' },
                                ]
                                    .filter((n) => (noteFilterTag === 'All' || n.tag === noteFilterTag) && (!noteDate || n.isoDate === noteDate) && (!noteSearch.trim() || n.text.toLowerCase().includes(noteSearch.toLowerCase()) || n.author.toLowerCase().includes(noteSearch.toLowerCase())))
                                    .map((n, i) => (
                                    <div key={i} className="flex items-start gap-2.5 rounded-xl border p-3 text-xs" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                        <UserAvatar name={n.author} />
                                        <div>
                                            <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{n.author}</div>
                                            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{n.time}</div>
                                            <div className="mt-1" style={{ color: 'var(--text-secondary)' }}>{n.text}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Rounded Composer */}
                            <div className="mt-4 rounded-2xl border p-3" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-strong)' }}>
                                <div className="mb-2 flex flex-wrap gap-1.5">
                                    {['GPR', 'CLAW', 'AMRA', 'WC', 'ISSUE', 'INFO', 'COMPLAINT', 'CLAIM', 'ANNIVERSARY'].map((tag) => (
                                        <span key={tag} className="rounded-md px-2 py-0.5 text-[10px] font-bold cursor-pointer" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent-text)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <textarea
                                    rows={2}
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Write a client note, @ to mention, / for tags..."
                                    className="w-full bg-transparent text-xs outline-none resize-none"
                                    style={{ color: 'var(--text-primary)' }}
                                />
                                <div className="mt-2 flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <div className="flex items-center gap-1.5">
                                        <button type="button" className="rounded-lg p-1.5 cursor-pointer" style={{ color: 'var(--text-muted)' }} title="Attach">
                                            <Plus className="h-4 w-4" />
                                        </button>
                                        <button type="button" className="rounded-lg p-1.5 cursor-pointer" style={{ color: 'var(--text-muted)' }} title="Voice Note">
                                            <Mic className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setNoteText('')}
                                        className="flex h-8 w-8 items-center justify-center rounded-full text-white cursor-pointer"
                                        style={{ backgroundColor: 'var(--accent)' }}
                                        title="Submit Note"
                                    >
                                        <Send className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'Documents' && (
                    <div className="space-y-4">
                        <Card hoverable={false}>
                            <div className="text-center text-xs mb-2 font-bold" style={{ color: 'var(--text-primary)' }}>
                                Add New Document <span className="font-normal" style={{ color: 'var(--text-muted)' }}>(Only up to 5 documents can be added at once)</span>
                            </div>
                            <div className="rounded-xl border border-dashed p-8 text-center text-xs cursor-pointer" style={{ borderColor: 'var(--border-strong)', backgroundColor: 'var(--bg-surface-alt)' }}>
                                <Upload className="h-5 w-5 mx-auto mb-2" style={{ color: 'var(--accent)' }} />
                                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Drop Your Files Here Or <span style={{ color: 'var(--accent-text)' }}>Browse</span></div>
                                <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Maximum Size: 50MB</div>
                            </div>
                        </Card>

                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Current Documents</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="px-4 py-2.5 font-bold uppercase">Document</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Description</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Created at</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Client</th>
                                            <th className="px-4 py-2.5 font-bold uppercase text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { doc: 'signature.pdf', desc: 'test upload', date: '2026/07/01 05:25', client: 'Gavin Testing Baker2' },
                                            { doc: 'OneFamily.xlsx', desc: 'Test', date: '2026/03/06 12:16', client: 'Gavin Testing Baker2' },
                                            { doc: 'ESD_95191993.pdf', desc: 'Testing', date: '2025/11/25 11:02', client: 'GavinTest2 Partner2' },
                                        ].map((d, i) => (
                                            <tr key={i} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className="px-4 py-2.5 font-semibold">{d.doc}</td>
                                                <td className="px-3 py-2.5" style={{ color: 'var(--text-muted)' }}>{d.desc}</td>
                                                <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{d.date}</td>
                                                <td className="px-3 py-2.5"><span className="inline-flex items-center gap-2"><UserAvatar name={d.client} /><span>{d.client}</span></span></td>
                                                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <button type="button" className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 cursor-pointer"><Download className="h-3.5 w-3.5" /></button>
                                                        <button type="button" className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'Messages' && (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                        <Card padding="p-0 overflow-hidden" hoverable={false} className={msgChannel === 'WhatsApp' ? 'lg:col-span-8' : 'lg:col-span-12'}>
                            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-center gap-2.5">
                                    <UserAvatar name="Gavin Testing Baker2" size="md" />
                                    <div>
                                        <div className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>Gavin Testing Baker2</div>
                                        <div className="text-[10px] tabular-nums" style={{ color: 'var(--text-muted)' }}>+44 7412764478</div>
                                    </div>
                                </div>
                                <div className="inline-flex rounded-lg border p-0.5" style={inputStyle}>
                                    {['SMS', 'WhatsApp'].map((ch) => (
                                        <button
                                            key={ch}
                                            type="button"
                                            onClick={() => setMsgChannel(ch)}
                                            className="rounded-md px-3 py-1 text-xs font-semibold cursor-pointer"
                                            style={{ backgroundColor: msgChannel === ch ? 'var(--accent)' : 'transparent', color: msgChannel === ch ? '#fff' : 'var(--text-secondary)' }}
                                        >
                                            {ch}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 space-y-2.5 min-h-[260px]" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                <div className="text-center"><Badge tone="neutral">Fri 6 Nov 2026</Badge></div>
                                <div className="flex justify-end"><div className="rounded-xl px-3 py-2 text-xs text-white max-w-md" style={{ backgroundColor: 'var(--accent)' }}>Dear Gavin Testing Baker2, please let us know a convenient time for us to call you.</div></div>
                                <div className="flex justify-start"><div className="rounded-xl border px-3 py-2 text-xs max-w-xs" style={inputStyle}>Sure?</div></div>
                                <div className="flex justify-start"><div className="rounded-xl border px-3 py-2 text-xs max-w-xs" style={inputStyle}>Hiya</div></div>
                            </div>

                            <div className="flex items-center gap-2 border-t p-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <input type="text" placeholder="Type a message..." className="flex-1 rounded-lg border px-3 py-2 text-xs outline-none" style={inputStyle} />
                                <button type="button" className="rounded-lg p-2 text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}><Send className="h-4 w-4" /></button>
                            </div>
                        </Card>

                        {msgChannel === 'WhatsApp' && (
                            <Card className="lg:col-span-4" hoverable={false}>
                                <h2 className="font-inter-black text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Message Templates</h2>
                                <div className="rounded-xl border p-3 text-xs space-y-2" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold" style={{ color: 'var(--accent-text)' }}>Appointment booked</span>
                                        <Badge tone="neutral">GENERAL</Badge>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)' }}>Hi {'{{1}}'}, your appointment is booked for {'{{2}}'}. Your adviser, {'{{3}}'}, will be in touch shortly.</p>
                                    <button type="button" className="w-full rounded-lg py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>Use Template</button>
                                </div>
                            </Card>
                        )}
                    </div>
                )}

                {activeTab === 'Calls' && (
                    <Card padding="p-0 overflow-hidden" hoverable={false}>
                        <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Calls</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                        <th className="px-4 py-2.5 font-bold uppercase">Dialled Number</th>
                                        <th className="px-3 py-2.5 font-bold uppercase">Advisor/Called By</th>
                                        <th className="px-3 py-2.5 font-bold uppercase">Caller</th>
                                        <th className="px-3 py-2.5 font-bold uppercase">Contacted At</th>
                                        <th className="px-3 py-2.5 font-bold uppercase">Call Duration</th>
                                        <th className="px-3 py-2.5 font-bold uppercase">Direction</th>
                                        <th className="px-4 py-2.5 font-bold uppercase text-right">Recording / Transcript</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { num: '918904534045', adv: 'Lapsed Clients', caller: 'Tricia Pelayo', at: '27-04-2026 05:20:35', dur: '1 min 4 sec', dir: 'Outbound', media: true },
                                        { num: '07412764478', adv: 'Lapsed Clients', caller: 'Tom Tovey', at: '12-09-2025 02:27:14', dur: '0 sec', dir: 'Outbound', media: false },
                                    ].map((c, i) => (
                                        <tr key={i} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <td className="px-4 py-2.5 tabular-nums">{c.num}</td>
                                            <td className="px-3 py-2.5">{c.adv}</td>
                                            <td className="px-3 py-2.5"><span className="inline-flex items-center gap-2"><UserAvatar name={c.caller} /><span>{c.caller}</span></span></td>
                                            <td className="px-3 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{c.at}</td>
                                            <td className="px-3 py-2.5 tabular-nums">{c.dur}</td>
                                            <td className="px-3 py-2.5 font-semibold text-emerald-500">{c.dir}</td>
                                            <td className="px-4 py-2.5 text-right">
                                                {c.media ? (
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <button type="button" className="rounded-md bg-sky-500/15 p-1.5 text-sky-500 cursor-pointer"><Play className="h-3 w-3" /></button>
                                                        <button type="button" className="rounded-md bg-emerald-500/15 p-1.5 text-emerald-500 cursor-pointer"><Download className="h-3 w-3" /></button>
                                                        <button type="button" className="rounded-md border p-1.5 cursor-pointer" style={{ borderColor: 'var(--border-subtle)' }}><FileText className="h-3 w-3" /></button>
                                                    </div>
                                                ) : 'â€”'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {activeTab === 'Q/AI' && (
                    <Card hoverable={false}>
                        <h2 className="font-inter-black text-base mb-4" style={{ color: 'var(--accent-text)' }}>QI BOARD</h2>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 text-xs">
                            <div className="space-y-3">
                                <div className="rounded-xl border p-3" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                    <div className="font-bold">Interest Level: <span style={{ color: 'var(--accent-text)' }}>0</span></div>
                                    <div className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>Caller Notes: asked if the other person is vulnerable or appear vulnerable</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="rounded-xl border p-3" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                    <div className="font-bold mb-1">Chance of death over 20 Yrs: <span className="text-rose-500">8%</span></div>
                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Top 5 potential causes: 1. Lung cancer, 2. Heart disease, 3. Stroke, 4. Chronic respiratory disease, 5. Accidents</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 rounded-xl border p-3 text-xs" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                            <div className="font-bold mb-1">Call Summary</div>
                            <p style={{ color: 'var(--text-secondary)' }}>AI-generated call transcript summary and compliance highlights.</p>
                        </div>
                    </Card>
                )}

                {activeTab === 'Policy History' && (
                    <div className="space-y-4">
                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Policy History</h2>
                                <button type="button" onClick={() => setAddPolicyOpen('add')} className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}><Plus className="h-3.5 w-3.5" /> Add Policy</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="px-3 py-2.5 font-bold uppercase">Insurer</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Policy #</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Start Date</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Product</th>
                                            <th className="px-3 py-2.5 font-bold uppercase text-right">Sum Assured</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Type</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Term</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Owner</th>
                                            <th className="px-3 py-2.5 font-bold uppercase text-right">Prem</th>
                                            <th className="px-3 py-2.5 font-bold uppercase text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { ins: 'Aviva', pol: '64839575', start: '10/10/2015', prod: 'LIFE', sum: 'Â£100,000', type: 'DTA', term: '10/10/2020', owner: 'Gavin Baker', prem: 'Â£22' },
                                            { ins: 'Aviva', pol: '78FG89DR', start: '2025-08-07', prod: 'PHI', sum: 'Â£1,000,000', type: 'LTA', term: '2031-11-13', owner: 'Gavin Testing Baker2', prem: 'Â£5000' },
                                            { ins: 'Royal London', pol: '213411', start: '24/11/2025', prod: 'LIFE', sum: 'Â£60,000', type: 'INC', term: '24/11/2025', owner: 'Gavin Testing Baker2', prem: 'Â£14.45' },
                                        ].map((p, i) => (
                                            <tr key={i} className="qall-row-hover border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className="px-3 py-2.5 font-semibold">{p.ins}</td>
                                                <td className="px-3 py-2.5 tabular-nums">{p.pol}</td>
                                                <td className="px-3 py-2.5 tabular-nums">{p.start}</td>
                                                <td className="px-3 py-2.5">{p.prod}</td>
                                                <td className="px-3 py-2.5 text-right tabular-nums">{p.sum}</td>
                                                <td className="px-3 py-2.5">{p.type}</td>
                                                <td className="px-3 py-2.5 tabular-nums">{p.term}</td>
                                                <td className="px-3 py-2.5"><span className="inline-flex items-center gap-1.5"><UserAvatar name={p.owner} /><span>{p.owner}</span></span></td>
                                                <td className="px-3 py-2.5 text-right tabular-nums font-bold">{p.prem}</td>
                                                <td className="px-3 py-2.5 text-right whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <button type="button" onClick={() => setAddPolicyOpen('edit')} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 cursor-pointer"><Edit3 className="h-3.5 w-3.5" /></button>
                                                        <button type="button" onClick={() => setDeletePolicyOpen(true)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                            <td colSpan={8} className="px-3 py-2.5 font-inter-black">Total</td>
                                            <td className="px-3 py-2.5 text-right font-inter-black tabular-nums">Â£11,455.45</td>
                                            <td />
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                        <div className="flex items-center justify-between">
                            <button type="button" className="rounded-lg bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-500 cursor-pointer">Dead</button>
                            <button type="button" className="rounded-lg px-4 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>PH Complete</button>
                        </div>
                    </div>
                )}

                {activeTab === 'Quoting' && (
                    <div className="space-y-4">
                        <Card padding="p-0 overflow-hidden" hoverable={false}>
                            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Quoting</h2>
                                <button type="button" onClick={() => setQuoteModalOpen('add')} className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}><Plus className="h-3.5 w-3.5" /> Add Quote</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th className="px-3 py-2.5 font-bold uppercase">Insurer</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Policy #</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Product</th>
                                            <th className="px-3 py-2.5 font-bold uppercase text-right">Sum Assured</th>
                                            <th className="px-3 py-2.5 font-bold uppercase">Owner</th>
                                            <th className="px-3 py-2.5 font-bold uppercase text-right">Prem</th>
                                            <th className="px-3 py-2.5 font-bold uppercase text-center">Quote Status</th>
                                            <th className="px-3 py-2.5 font-bold uppercase text-right">Edit / Del</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { ins: 'Aviva', pol: '12312312', prod: 'LIFE & CIC', sum: 'Â£1,020,000', owner: 'GavinTest2 Partner2', prem: 'Â£76', status: 'Pending' },
                                            { ins: 'Aviva', pol: '01230123', prod: 'ACCIDENT', sum: 'Â£100,000', owner: 'Gavin Testing Baker2', prem: 'Â£25', status: 'Approved' },
                                            { ins: 'L&G', pol: 'SEV3218888', prod: 'LIFE', sum: 'Â£321', owner: 'Gavin Testing Baker2', prem: 'Â£12', status: 'Approved' },
                                        ].map((q, i) => (
                                            <tr key={i} className="qall-row-hover border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <td className="px-3 py-2.5 font-semibold">{q.ins}</td>
                                                <td className="px-3 py-2.5 tabular-nums">{q.pol}</td>
                                                <td className="px-3 py-2.5">{q.prod}</td>
                                                <td className="px-3 py-2.5 text-right tabular-nums">{q.sum}</td>
                                                <td className="px-3 py-2.5"><span className="inline-flex items-center gap-1.5"><UserAvatar name={q.owner} /><span>{q.owner}</span></span></td>
                                                <td className="px-3 py-2.5 text-right tabular-nums font-bold">{q.prem}</td>
                                                <td className="px-3 py-2.5 text-center"><Badge tone={q.status === 'Approved' ? 'emerald' : 'amber'}>{q.status}</Badge></td>
                                                <td className="px-3 py-2.5 text-right whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <button type="button" onClick={() => setAddPolicyOpen('edit')} className="rounded-md bg-amber-500/15 p-1.5 text-amber-500 cursor-pointer"><Edit3 className="h-3.5 w-3.5" /></button>
                                                        <button type="button" onClick={() => setDeletePolicyOpen(true)} className="rounded-md bg-rose-500/15 p-1.5 text-rose-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
                                            <td colSpan={5} className="px-3 py-2.5 font-inter-black">Total</td>
                                            <td className="px-3 py-2.5 text-right font-inter-black tabular-nums">Â£5,752</td>
                                            <td colSpan={2} />
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                        <div className="flex items-center justify-between">
                            <button type="button" className="rounded-lg bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-500 cursor-pointer">Dead</button>
                            <div className="text-right">
                                <button type="button" className="rounded-lg px-4 py-1.5 text-xs font-bold text-white opacity-70 cursor-not-allowed" style={{ backgroundColor: 'var(--accent)' }}>On Cover</button>
                                <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>On Cover is locked until compliance is approved.</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Compliance' && (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                        {/* Mobile Inline Section Dropdown */}
                        <div className="relative lg:hidden">
                            <button
                                type="button"
                                onClick={() => {
                                    setMobileComplianceSectionsOpen((v) => !v);
                                    setMobileTabsOpen(false);
                                    setMobileFfSectionsOpen(false);
                                }}
                                className="flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-bold cursor-pointer"
                                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                            >
                                <span className="flex items-center gap-2">
                                    <span
                                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                        style={{ backgroundColor: 'var(--accent)' }}
                                    >
                                        {COMPLIANCE_SECTIONS.findIndex((s) => s.id === complianceSection) + 1}
                                    </span>
                                    <span>{COMPLIANCE_SECTIONS.find((s) => s.id === complianceSection)?.label}</span>
                                </span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${mobileComplianceSectionsOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                            </button>

                            {mobileComplianceSectionsOpen && (
                                <div
                                    className="animate-popover absolute left-0 right-0 mt-1.5 z-40 rounded-xl border p-1.5 shadow-xl max-h-72 overflow-y-auto"
                                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                >
                                    {COMPLIANCE_SECTIONS.map((sec, idx) => {
                                        const active = complianceSection === sec.id;
                                        return (
                                            <button
                                                key={sec.id}
                                                type="button"
                                                onClick={() => {
                                                    setComplianceSection(sec.id);
                                                    setMobileComplianceSectionsOpen(false);
                                                }}
                                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold cursor-pointer transition-colors"
                                                style={{
                                                    backgroundColor: active ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
                                                    color: active ? 'var(--accent)' : 'var(--text-primary)',
                                                }}
                                            >
                                                <span
                                                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                                                    style={{
                                                        backgroundColor: active ? 'var(--accent)' : 'var(--bg-surface-alt)',
                                                        color: active ? '#fff' : 'var(--text-muted)',
                                                    }}
                                                >
                                                    {idx + 1}
                                                </span>
                                                <span>{sec.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <Card className="hidden lg:block lg:col-span-3 h-fit p-3" hoverable={false}>
                            <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                Compliance Sections
                            </div>
                            <div className="space-y-1">
                                {COMPLIANCE_SECTIONS.map((s, idx) => {
                                    const active = complianceSection === s.id;
                                    return (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => setComplianceSection(s.id)}
                                            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-left transition-colors cursor-pointer"
                                            style={{
                                                backgroundColor: active ? 'var(--accent-soft)' : 'transparent',
                                                color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                                            }}
                                        >
                                            <span
                                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                                                style={{
                                                    backgroundColor: active ? 'var(--accent)' : 'var(--bg-surface-alt)',
                                                    color: active ? '#fff' : 'var(--text-muted)',
                                                }}
                                            >
                                                {idx + 1}
                                            </span>
                                            {s.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </Card>

                        <div key={complianceSection} className="lg:col-span-9 animate-page-enter space-y-4">
                        {complianceSection === 'compliance' && (
                            <div className="space-y-4">
                                <Card hoverable={false}>
                                    <h3 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Compliance</h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
                                        <div>
                                            <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Client Name</label>
                                            <input type="text" readOnly defaultValue="Lawrencia Glover" className="w-full rounded-lg border px-3 py-2 outline-none opacity-80" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Advisor</label>
                                            <input type="text" readOnly defaultValue="Lawrence Bracken" className="w-full rounded-lg border px-3 py-2 outline-none opacity-80" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Compliance Date</label>
                                            <input type="text" readOnly defaultValue="05-11-2026" className="w-full rounded-lg border px-3 py-2 outline-none opacity-80" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Client Entered On Qall</label>
                                            <input type="text" readOnly defaultValue="01-05-2023" className="w-full rounded-lg border px-3 py-2 outline-none opacity-80" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Policy Number</label>
                                            <CustomSelect defaultValue="901718857" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} options={["901718857","901685107"]} />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Fact Find Completed?</label>
                                            <CustomSelect defaultValue="Yes" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} options={["Yes","No"]} />
                                        </div>
                                    </div>
                                </Card>

                                <Card hoverable={false} className="p-0 overflow-hidden">
                                    <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <h3 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Compliance Records</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead>
                                                <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                    <th className="px-4 py-2.5 font-bold">Client Name</th>
                                                    <th className="px-4 py-2.5 font-bold">Policy Number</th>
                                                    <th className="px-4 py-2.5 font-bold">Advisor</th>
                                                    <th className="px-4 py-2.5 font-bold">Provider</th>
                                                    <th className="px-4 py-2.5 font-bold">Compliance Date</th>
                                                    <th className="px-4 py-2.5 font-bold">Type</th>
                                                    <th className="px-4 py-2.5 font-bold">Total Commission</th>
                                                    <th className="px-4 py-2.5 font-bold">Status</th>
                                                    <th className="px-4 py-2.5 font-bold text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b qall-row-hover" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <td className="px-4 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>Lawrencia Glover</td>
                                                    <td className="px-4 py-2.5 font-mono">901718857</td>
                                                    <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>Lawrence Bracken</td>
                                                    <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>Vitality LIFE</td>
                                                    <td className="px-4 py-2.5" style={{ color: 'var(--text-muted)' }}>2026-11-05 10:25:44</td>
                                                    <td className="px-4 py-2.5">INC</td>
                                                    <td className="px-4 py-2.5 font-bold tabular-nums">Â£ 218.4</td>
                                                    <td className="px-4 py-2.5"><Badge tone="emerald">Approved</Badge></td>
                                                    <td className="px-4 py-2.5 text-right">
                                                        <button type="button" className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-500 hover:bg-rose-500/25 cursor-pointer">
                                                            <Trash2 className="h-3 w-3" /> Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr style={{ backgroundColor: 'var(--bg-hover)' }}>
                                                    <td colSpan={6} className="px-4 py-2.5 font-bold" style={{ color: 'var(--text-primary)' }}>Total</td>
                                                    <td colSpan={3} className="px-4 py-2.5 font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>Â£ 218.40</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {complianceSection === 'doc-check' && (
                            <Card hoverable={false}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Doc Upload Check</h3>
                                    <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                                        <input
                                            type="checkbox"
                                            checked={Object.values(docChecks).every(Boolean)}
                                            onChange={(e) => {
                                                const next = e.target.checked;
                                                setDocChecks((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, next])));
                                            }}
                                            className="rounded accent-blue-600 cursor-pointer"
                                        />
                                        Check All
                                    </label>
                                </div>
                                <div className="space-y-2.5">
                                    {Object.entries(docChecks).map(([label, checked]) => (
                                        <label
                                            key={label}
                                            className="flex items-center justify-between rounded-xl border px-4 py-3 text-xs cursor-pointer qall-row-hover"
                                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                                        >
                                            <span className="font-medium">{label}</span>
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => setDocChecks((prev) => ({ ...prev, [label]: !prev[label] }))}
                                                className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {complianceSection === 'commission' && (
                            <Card hoverable={false}>
                                <h3 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Commission</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                                    <div>
                                        <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Selected Provider</label>
                                        <CustomSelect defaultValue="Vitality LIFE" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} options={["Vitality LIFE","Aviva","Legal & General"]} />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Is This A New Client?</label>
                                        <CustomSelect defaultValue="Yes" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} options={["Yes","No"]} />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>New Provider?</label>
                                        <CustomSelect defaultValue="No" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} options={["No","Yes"]} />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Total Commission</label>
                                        <input type="text" defaultValue="Â£ 218.4" className="w-full rounded-lg border px-3 py-2 outline-none tabular-nums" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Commission Type?</label>
                                        <CustomSelect defaultValue="Indemnity" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} options={["Indemnity","Non-Indemnity"]} />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Advisor Expected Payment Date</label>
                                        <input type="text" defaultValue="30/11/2026" className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                    </div>
                                    <div className="sm:col-span-2 space-y-2.5 pt-1">
                                        <label className="block font-semibold" style={{ color: 'var(--text-secondary)' }}>Commission Payment Schedule?</label>
                                        <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                                            <input type="radio" name="commissionSchedule" checked={commissionSchedule === 'single'} onChange={() => setCommissionSchedule('single')} className="accent-blue-600 cursor-pointer" />
                                            <span>Single Commission Payment</span>
                                        </label>
                                        {commissionSchedule === 'single' && (
                                            <div className="pl-6 max-w-sm">
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Expected Commission Arrival Date</label>
                                                <input type="text" defaultValue="30/11/2026" className="w-full rounded-lg border px-3 py-2 outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                        )}
                                        <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                                            <input type="radio" name="commissionSchedule" checked={commissionSchedule === 'dispersed'} onChange={() => setCommissionSchedule('dispersed')} className="accent-blue-600 cursor-pointer" />
                                            <span>Dispersed Commission Payment</span>
                                        </label>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {complianceSection === 'admin-checks' && (
                            <Card hoverable={false}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>Administration Checks</h3>
                                    <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                                        <input
                                            type="checkbox"
                                            checked={Object.values(adminChecks).every(Boolean)}
                                            onChange={(e) => {
                                                const next = e.target.checked;
                                                setAdminChecks((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, next])));
                                            }}
                                            className="rounded accent-blue-600 cursor-pointer"
                                        />
                                        Check All
                                    </label>
                                </div>
                                <div className="space-y-2.5">
                                    {Object.entries(adminChecks).map(([label, checked]) => (
                                        <label
                                            key={label}
                                            className="flex items-center justify-between rounded-xl border px-4 py-3 text-xs cursor-pointer qall-row-hover"
                                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                                        >
                                            <span className="font-medium">{label}</span>
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => setAdminChecks((prev) => ({ ...prev, [label]: !prev[label] }))}
                                                className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                                            />
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
                                    <button type="button" className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-500 hover:bg-emerald-500/20 cursor-pointer">
                                        Approve
                                    </button>
                                    <button type="button" className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-500/20 cursor-pointer">
                                        Reject
                                    </button>
                                    <button type="button" className="rounded-lg border px-4 py-1.5 text-xs font-bold cursor-pointer" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
                                        Delete
                                    </button>
                                </div>
                            </Card>
                        )}
                        </div>
                    </div>
                )}

                {activeTab === 'Customer' && (
                    <Card hoverable={false}>
                        <h3 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
                            Customer Disclosure Form
                        </h3>
                        <button
                            type="button"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
                        >
                            Disclosure Form
                        </button>
                        <p className="mt-3 text-xs font-medium text-rose-500">
                            Please complete disclosure form of customer.
                        </p>
                    </Card>
                )}

                {!['Summary', 'Fact Find', 'Client Notes', 'Documents', 'Messages', 'Policy History', 'Quoting', 'Compliance', 'Customer', 'Calls', 'Q/AI'].includes(activeTab) && (
                    <Card>
                        <div className="py-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{activeTab}</span> tab workspace â€” ready for module details.
                        </div>
                    </Card>
                )}
                </div>
            </div>
            {medicalModal &&
                createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]" onClick={() => setMedicalModal(null)}>
                        <div className="animate-popover my-auto w-full max-w-2xl rounded-2xl border p-5 shadow-2xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>
                                    {medicalModal === 'add' ? 'Add Medical Condition' : 'Update Medical Condition'}
                                </h3>
                                <button type="button" onClick={() => setMedicalModal(null)} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                                <div>
                                    <label className="block font-semibold mb-1">Medical Condition</label>
                                    <CustomSelect defaultValue={medicalModal === 'edit' ? 'Knee Injury' : ''} style={inputStyle} options={["","Knee Injury","Asthma","Diabetes"]} />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Year Diagnosed</label>
                                    <input type="text" defaultValue={medicalModal === 'edit' ? '2022' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Month Diagnosed</label>
                                    <CustomSelect defaultValue={medicalModal === 'edit' ? 'Jan' : ''} style={inputStyle} options={["","Jan","Feb","Mar"]} />
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                                <div><label className="block font-semibold mb-1">Test / Investigation</label><CustomSelect defaultValue={medicalModal === 'edit' ? 'Yes' : 'No'} style={inputStyle} options={["Yes","No"]} /></div>
                                <div><label className="block font-semibold mb-1">Status</label><CustomSelect defaultValue={medicalModal === 'edit' ? 'Ongoing' : 'Resolved'} style={inputStyle} options={["Ongoing","Resolved"]} /></div>
                                <div><label className="block font-semibold mb-1">Last Symptoms</label><CustomSelect defaultValue={medicalModal === 'edit' ? '0-6 M' : 'None'} style={inputStyle} options={["0-6 M","6-12 M","None"]} /></div>
                                <div><label className="block font-semibold mb-1">On Medication</label><CustomSelect defaultValue={medicalModal === 'edit' ? 'Yes' : 'No'} style={inputStyle} options={["Yes","No"]} /></div>
                            </div>
                            <div className="mt-3 text-xs">
                                <label className="block font-semibold mb-1">Additional Info</label>
                                <textarea rows={3} placeholder="Type Message ..." className="w-full rounded-lg border px-3 py-2 outline-none resize-none" style={inputStyle} />
                            </div>
                            <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t pt-3 text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Client</label>
                                    <CustomSelect defaultValue="Gavin Testing" style={inputStyle} options={["Gavin Testing","GavinTest2 Partner2"]} />
                                </div>
                                <button type="button" onClick={() => setMedicalModal(null)} className="rounded-lg bg-slate-900 px-5 py-2 text-xs font-bold text-white cursor-pointer">
                                    {medicalModal === 'add' ? 'Add' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            {propertyModal &&
                createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]" onClick={() => setPropertyModal(null)}>
                        <div className="animate-popover my-auto w-full max-w-2xl rounded-2xl border p-5 shadow-2xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
                                <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>
                                    {propertyModal === 'add' ? 'Add Property' : 'Update Property'}
                                </h3>
                                <button type="button" onClick={() => setPropertyModal(null)} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                                <div><label className="block font-semibold mb-1">House Number</label><input type="text" defaultValue={propertyModal === 'edit' ? '11' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Post Code</label><input type="text" defaultValue={propertyModal === 'edit' ? 'L4 7XG' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Occupant</label><input type="text" defaultValue={propertyModal === 'edit' ? 'Previous' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Current Property</label><input type="text" defaultValue={propertyModal === 'edit' ? 'Yes' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Value</label><input type="text" defaultValue={propertyModal === 'edit' ? 'Â£ 1000' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Mortgage Balance</label><input type="text" defaultValue={propertyModal === 'edit' ? 'Â£ 500' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Term Remaining</label><input type="text" defaultValue={propertyModal === 'edit' ? '2' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Payment Type</label><CustomSelect defaultValue={propertyModal === 'edit' ? 'Repay' : ''} style={inputStyle} options={["","Repay","Interest Only"]} /></div>
                                <div><label className="block font-semibold mb-1">Monthly Payment</label><input type="text" defaultValue={propertyModal === 'edit' ? 'Â£ 400' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Int Rate</label><input type="text" defaultValue={propertyModal === 'edit' ? '20' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Teaser Rate</label><input type="text" defaultValue={propertyModal === 'edit' ? 'Yes' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">End Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Mortgage Provider</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Remortgaged</label><input type="text" defaultValue={propertyModal === 'edit' ? 'Yes' : ''} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div className="col-span-2"><label className="block font-semibold mb-1">Remort Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            </div>
                            <div className="mt-3 text-xs">
                                <label className="block font-semibold mb-1">Additional Info</label>
                                <textarea rows={2} placeholder="Add your text here ..." className="w-full rounded-lg border px-3 py-2 outline-none resize-none" style={inputStyle} />
                            </div>
                            <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t pt-3 text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Client</label>
                                    <CustomSelect defaultValue="Gavin Testing" style={inputStyle} options={["Gavin Testing","GavinTest2 Partner2"]} />
                                </div>
                                <button type="button" onClick={() => setPropertyModal(null)} className="rounded-lg bg-slate-900 px-5 py-2 text-xs font-bold text-white cursor-pointer">
                                    {propertyModal === 'add' ? 'Add' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            <ConfirmModal
                open={deleteMedicalOpen}
                onClose={() => setDeleteMedicalOpen(false)}
                onConfirm={() => setDeleteMedicalOpen(false)}
                title="Delete Medical Condition"
                description="Are you sure you want to delete this medical conditions?"
                confirmLabel="Delete"
            />

            <ConfirmModal
                open={deletePropertyOpen}
                onClose={() => setDeletePropertyOpen(false)}
                onConfirm={() => setDeletePropertyOpen(false)}
                title="Delete Property Information"
                description="Are you sure you want to delete this property information?"
                confirmLabel="Delete"
            />

            <AddPolicyModal open={Boolean(addPolicyOpen)} mode={addPolicyOpen || 'add'} onClose={() => setAddPolicyOpen(null)} />
            <ConfirmModal
                open={deletePolicyOpen}
                onClose={() => setDeletePolicyOpen(false)}
                onConfirm={() => setDeletePolicyOpen(false)}
                title="Are you sure?"
                description="This will remove the policy"
                confirmLabel="Yes, Remove it!"
            />
            <AddPolicyModal open={Boolean(quoteModalOpen)} mode={quoteModalOpen || 'add'} entity="Quote" onClose={() => setQuoteModalOpen(null)} />
            <ConfirmModal
                open={deleteQuoteOpen}
                onClose={() => setDeleteQuoteOpen(false)}
                onConfirm={() => setDeleteQuoteOpen(false)}
                title="Are you sure?"
                description="This will remove the quote"
                confirmLabel="Yes, Remove it!"
            />
            <AppointmentsModal open={appointmentsOpen} onClose={() => setAppointmentsOpen(false)} onOpenClientFile={() => setActiveTab('Quoting')} />

            {callModalOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]"
                        onClick={() => setCallModalOpen(false)}
                    >
                        <div
                            className="animate-popover my-auto w-full max-w-md rounded-2xl border p-5 shadow-2xl text-xs space-y-4"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div>
                                    <h3 className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>Call Customer</h3>
                                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Gavin Testing Baker2</p>
                                </div>
                                <button type="button" onClick={() => setCallModalOpen(false)} className="rounded-md p-1 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border px-3.5 py-3" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-center gap-2.5">
                                    <Phone className="h-4 w-4 text-blue-600" />
                                    <span className="font-inter-black text-sm tabular-nums" style={{ color: 'var(--text-primary)' }}>+44 741 276 4478</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigator.clipboard?.writeText('+44 741 276 4478')}
                                    className="rounded-md px-2 py-1 text-[11px] font-bold text-blue-600 hover:bg-blue-500/10 cursor-pointer"
                                >
                                    Copy
                                </button>
                            </div>

                            <div className="space-y-2">
                                <div className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Call using</div>
                                {['CircleLoop', '8x8 Work'].map((prov) => {
                                    const active = callProvider === prov;
                                    return (
                                        <label
                                            key={prov}
                                            className="flex items-center gap-3 rounded-xl border px-3.5 py-2.5 cursor-pointer"
                                            style={{
                                                borderColor: active ? '#2563EB' : 'var(--border-subtle)',
                                                backgroundColor: active ? 'rgba(37, 99, 235, 0.06)' : 'transparent',
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="callProvider"
                                                checked={active}
                                                onChange={() => setCallProvider(prov)}
                                                className="accent-blue-600 cursor-pointer"
                                            />
                                            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{prov}</span>
                                        </label>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-end gap-2 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                <button type="button" onClick={() => setCallModalOpen(false)} className="rounded-lg border px-4 py-2 font-semibold cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                                    Cancel
                                </button>
                                <button type="button" onClick={() => setCallModalOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 cursor-pointer">
                                    Call
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </AppLayout>
    );
}
