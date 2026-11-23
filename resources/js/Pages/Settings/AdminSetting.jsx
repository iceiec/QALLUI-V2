import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, Search, Trash2, Monitor, CheckSquare, User, Ban, Bold, Italic, Link2, Image, List, ListOrdered, AlignLeft, Undo2, Redo2 } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import CustomSelect from '../../Components/CustomSelect';

const IPS = [
    { no: 1, ip: '95.246.132.33', note: 'NordVPN' },
    { no: 2, ip: '92.40.1.1 - 92.40.255.255', note: 'RobMobRange' },
    { no: 3, ip: '195.26.1.1 - 195.26.255.255', note: 'office' },
    { no: 4, ip: '49.230.1.1 - 49.230.255.255', note: 'PalaceRange' },
    { no: 5, ip: '182.232.16.80', note: 'Rob_Bangkok_Tangmo' },
];

const INITIAL_LISTS = {
    titles: ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr'],
    currentInsurers: ['AIG', 'Aviva', 'Legal & General', 'Royal London', 'Vitality'],
    policyAges: ['18-25', '26-35', '36-45', '46-55', '56+'],
    occupations: ['Abattoir Worker', 'Accountant', 'Architect', 'Builder'],
    medicalCondition: ['Abdominal aortic aneurysm', 'Asthma', 'Diabetes', 'Hypertension'],
    medicalConditionParent: ['High blood pressure', 'Heart Disease', 'Stroke'],
    provider: ['Abbey Life', 'AIG', 'Aviva', 'Zurich'],
    employmentStatus: ['Part Time', 'Full Time', 'Self Employed', 'Retired'],
    maritalStatus: ['Divorced', 'Married', 'Single', 'Widowed'],
    medicalConditionStatus: ['Active', 'Controlled', 'Resolved'],
    medicalConditionLastSymptoms: ['Within 6 months', '6-12 months', '1-2 years', '2+ years'],
    lifeInsurer: ['AIG', 'Aviva', 'Legal & General', 'Zurich'],
    lifeCoverType: ['Level Term', 'Decreasing Term', 'Whole of Life'],
    ipDefermentPeriods: ['1', '4', '8', '13', '26', '52'],
    ipPayoutPeriods: ['1 Year', '2 Years', '5 Years', 'Full Term'],
    mobileNumbers: ['+447849868055'],
    statuses: ['Client Documents', 'Submitted', 'In Progress', 'Completed'],
    complianceReportRecipient: ['tricia.pelayo@exm.co.uk'],
    complianceDiscrepancyAlert: ['tricia.pelayo@exm.co.uk'],
    weeklyCommissionReport: ['tricia.pelayo@exm.co.uk'],
};

function SectionHeader({ id, icon: Icon, title }) {
    return (
        <div id={id} className="scroll-mt-24">
            <Card padding="px-4 py-3" hoverable={false}>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                    <Icon className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
                    <span>{title}</span>
                </div>
            </Card>
        </div>
    );
}

function ListSettingCard({ title, items, onAdd, onDelete, placeholder = 'New item...', showDelete = true, controlStyle }) {
    const [inputVal, setInputVal] = useState('');
    const [selected, setSelected] = useState(items[0] || '');

    const handleAdd = () => {
        const val = inputVal.trim();
        if (!val) return;
        onAdd(val);
        setSelected(val);
        setInputVal('');
    };

    const handleDelete = () => {
        if (!selected) return;
        onDelete(selected);
        const remaining = items.filter((item) => item !== selected);
        setSelected(remaining[0] || '');
    };

    return (
        <Card padding="p-4" hoverable={false}>
            <div className="text-xs font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</div>
            <div className="flex items-start gap-2.5">
                <div className="flex-1 space-y-2">
                    <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
                        placeholder={placeholder}
                        className="w-full rounded-lg border px-3 py-1.5 text-xs outline-none"
                        style={controlStyle}
                    />
                    <select
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        className="w-full rounded-lg border px-3 py-1.5 text-xs outline-none cursor-pointer"
                        style={controlStyle}
                    >
                        {items.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="rounded-md bg-emerald-500 hover:bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white cursor-pointer transition-colors"
                    >
                        Add
                    </button>
                    {showDelete && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="rounded-md bg-rose-500 hover:bg-rose-600 px-3 py-1.5 text-xs font-bold text-white cursor-pointer transition-colors"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
}

const NAV_SECTIONS = [
    { id: 'ip-settings', label: 'IP Settings' },
    { id: 'internal-add-lead', label: 'Internal Add Lead' },
    { id: 'fact-find', label: 'Fact Find' },
    { id: 'add-new-policy', label: 'Add New Policy' },
    { id: 'admin-setting', label: 'Admin Setting' },
    { id: 'compliance-head', label: 'Compliance Head' },
    { id: 'panic-mode', label: 'Panic Mode' },
];

export default function AdminSetting() {
    const [activeSection, setActiveSection] = useState('ip-settings');
    const [search, setSearch] = useState('');
    const [lists, setLists] = useState(INITIAL_LISTS);
    const [adminMobile, setAdminMobile] = useState('');
    const [emailTemplate, setEmailTemplate] = useState(
        `Dear <customer_name>,\nThis is an automated alert regarding your <provider> policy reference number ending <pr>. There appears to be an issue with your Direct Debit and we would like to discuss this to ensure you have the cover in place, if required. When would be an ideal time to call you to discuss this?\n\nBest regards,\nExchequer Customer Care Team`
    );

    const addItem = (key, value) => {
        setLists((prev) => ({
            ...prev,
            [key]: prev[key].includes(value) ? prev[key] : [...prev[key], value],
        }));
    };

    const deleteItem = (key, value) => {
        setLists((prev) => ({
            ...prev,
            [key]: prev[key].filter((item) => item !== value),
        }));
    };

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const filtered = IPS.filter((i) => !search || i.ip.includes(search) || i.note.toLowerCase().includes(search.toLowerCase()));

    return (
        <AppLayout>
            <Head title="Settings" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Settings
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    <aside className="lg:col-span-3 lg:sticky lg:top-20">
                        <div className="lg:hidden">
                            <Card padding="p-3" hoverable={false}>
                                <div className="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                    Settings Sections
                                </div>
                                <CustomSelect
                                    value={activeSection}
                                    onChange={(e) => setActiveSection(e.target.value)}
                                    options={NAV_SECTIONS.map((sec, idx) => ({
                                        value: sec.id,
                                        label: `${idx + 1}. ${sec.label}`,
                                    }))}
                                />
                            </Card>
                        </div>
                        <div className="hidden lg:block">
                            <Card padding="p-3" hoverable={false}>
                            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                Settings Sections
                            </div>
                            <div className="mt-1 space-y-1">
                                {NAV_SECTIONS.map((sec, idx) => {
                                    const active = activeSection === sec.id;
                                    return (
                                        <button
                                            key={sec.id}
                                            type="button"
                                            onClick={() => {
                                                setActiveSection(sec.id);
                                                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold cursor-pointer transition-colors"
                                            style={{
                                                backgroundColor: active ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
                                                color: active ? 'var(--accent)' : 'var(--text-primary)',
                                            }}
                                        >
                                            <span
                                                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                                                style={{
                                                    backgroundColor: active ? 'var(--accent)' : 'var(--bg-card)',
                                                    color: active ? '#ffffff' : 'var(--text-muted)',
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
                        </div>
                    </aside>

                    <div className="lg:col-span-9 space-y-4">
                {activeSection === 'ip-settings' && (
                <div id="ip-settings" className="scroll-mt-24 space-y-4">
                <Card padding="p-4" hoverable={false}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                            Your IP Address: <span className="tabular-nums" style={{ color: 'var(--accent-text)' }}>119.94.70.106</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative w-48">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none" style={controlStyle} />
                            </div>
                            <button type="button" className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                                <Plus className="h-3.5 w-3.5" /> Add IP
                            </button>
                        </div>
                    </div>
                </Card>

                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-4 py-3 font-bold uppercase">No</th>
                                    <th className="px-4 py-3 font-bold uppercase">IP Address</th>
                                    <th className="px-4 py-3 font-bold uppercase">Note</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((row) => (
                                    <tr key={row.no} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="px-4 py-2.5 font-bold">{row.no}</td>
                                        <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-primary)' }}>{row.ip}</td>
                                        <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.note}</td>
                                        <td className="px-4 py-2.5 text-right">
                                            <button type="button" className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-500 hover:bg-rose-500/25 cursor-pointer">
                                                <Trash2 className="h-3 w-3" /> Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 p-3 md:hidden">
                        {filtered.map((row) => (
                            <div key={row.no} className="rounded-xl border p-3.5 flex items-center justify-between gap-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div>
                                    <div className="font-bold text-xs tabular-nums" style={{ color: 'var(--text-primary)' }}>#{row.no} • {row.ip}</div>
                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{row.note}</div>
                                </div>
                                <button type="button" className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-500 cursor-pointer">
                                    <Trash2 className="h-3 w-3" /> Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>
                </div>
                )}

                {/* Internal Add Lead */}
                {activeSection === 'internal-add-lead' && (
                <div className="space-y-4">
                <SectionHeader id="internal-add-lead" icon={Monitor} title="Internal Add Lead" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ListSettingCard title="Titles" items={lists.titles} onAdd={(v) => addItem('titles', v)} onDelete={(v) => deleteItem('titles', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Current Insurers" items={lists.currentInsurers} onAdd={(v) => addItem('currentInsurers', v)} onDelete={(v) => deleteItem('currentInsurers', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Policy Ages" items={lists.policyAges} onAdd={(v) => addItem('policyAges', v)} onDelete={(v) => deleteItem('policyAges', v)} controlStyle={controlStyle} />
                </div>
                </div>
                )}

                {/* Fact Find */}
                {activeSection === 'fact-find' && (
                <div className="space-y-4">
                <SectionHeader id="fact-find" icon={Monitor} title="Fact Find" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ListSettingCard title="Occupations" items={lists.occupations} onAdd={(v) => addItem('occupations', v)} onDelete={(v) => deleteItem('occupations', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Medical Condition" items={lists.medicalCondition} onAdd={(v) => addItem('medicalCondition', v)} onDelete={(v) => deleteItem('medicalCondition', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Medical Condition for Parent" items={lists.medicalConditionParent} onAdd={(v) => addItem('medicalConditionParent', v)} onDelete={(v) => deleteItem('medicalConditionParent', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Provider" items={lists.provider} onAdd={(v) => addItem('provider', v)} onDelete={(v) => deleteItem('provider', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Employment Status" items={lists.employmentStatus} onAdd={(v) => addItem('employmentStatus', v)} onDelete={(v) => deleteItem('employmentStatus', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Marital Status" items={lists.maritalStatus} onAdd={(v) => addItem('maritalStatus', v)} onDelete={(v) => deleteItem('maritalStatus', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Medical Condition Status" items={lists.medicalConditionStatus} onAdd={(v) => addItem('medicalConditionStatus', v)} onDelete={(v) => deleteItem('medicalConditionStatus', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Medical Condition Last Symptoms" items={lists.medicalConditionLastSymptoms} onAdd={(v) => addItem('medicalConditionLastSymptoms', v)} onDelete={(v) => deleteItem('medicalConditionLastSymptoms', v)} controlStyle={controlStyle} />
                </div>
                </div>
                )}

                {/* Add New Policy */}
                {activeSection === 'add-new-policy' && (
                <div className="space-y-4">
                <SectionHeader id="add-new-policy" icon={Monitor} title="Add New Policy" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ListSettingCard title="Life Insurer" items={lists.lifeInsurer} onAdd={(v) => addItem('lifeInsurer', v)} onDelete={(v) => deleteItem('lifeInsurer', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Life Cover Type" items={lists.lifeCoverType} onAdd={(v) => addItem('lifeCoverType', v)} onDelete={(v) => deleteItem('lifeCoverType', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="IP Deferment Periods" items={lists.ipDefermentPeriods} onAdd={(v) => addItem('ipDefermentPeriods', v)} onDelete={(v) => deleteItem('ipDefermentPeriods', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="IP Payout Periods" items={lists.ipPayoutPeriods} onAdd={(v) => addItem('ipPayoutPeriods', v)} onDelete={(v) => deleteItem('ipPayoutPeriods', v)} controlStyle={controlStyle} />
                    <ListSettingCard title="Mobile Numbers" items={lists.mobileNumbers} onAdd={(v) => addItem('mobileNumbers', v)} onDelete={(v) => deleteItem('mobileNumbers', v)} placeholder="Mobile Number 1" controlStyle={controlStyle} />
                    <ListSettingCard title="Statuses" items={lists.statuses} onAdd={(v) => addItem('statuses', v)} onDelete={(v) => deleteItem('statuses', v)} placeholder="lead status" showDelete={false} controlStyle={controlStyle} />
                </div>
                </div>
                )}

                {/* Admin Setting */}
                {activeSection === 'admin-setting' && (
                <div className="space-y-4">
                <SectionHeader id="admin-setting" icon={User} title="Admin Setting" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <Card padding="p-4" hoverable={false}>
                        <div className="text-xs font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Mobile Number</div>
                        <div className="flex items-center gap-2.5">
                            <input
                                type="text"
                                value={adminMobile}
                                onChange={(e) => setAdminMobile(e.target.value)}
                                className="flex-1 rounded-lg border px-3 py-1.5 text-xs outline-none"
                                style={controlStyle}
                            />
                            <button type="button" className="rounded-md bg-emerald-500 hover:bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white cursor-pointer transition-colors">
                                Save
                            </button>
                        </div>
                    </Card>

                    <Card padding="p-4" hoverable={false}>
                        <div className="text-xs font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Payment Failure Email Template</div>
                        <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
                            <div className="flex flex-wrap items-center gap-1 border-b px-2.5 py-1.5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                <Undo2 className="h-3.5 w-3.5 mx-1" />
                                <Redo2 className="h-3.5 w-3.5 mx-1" />
                                <span className="text-[11px] px-2 border-x" style={{ borderColor: 'var(--border-subtle)' }}>Paragraph</span>
                                <Bold className="h-3.5 w-3.5 mx-1" />
                                <Italic className="h-3.5 w-3.5 mx-1" />
                                <Link2 className="h-3.5 w-3.5 mx-1" />
                                <Image className="h-3.5 w-3.5 mx-1" />
                                <List className="h-3.5 w-3.5 mx-1" />
                                <ListOrdered className="h-3.5 w-3.5 mx-1" />
                                <AlignLeft className="h-3.5 w-3.5 mx-1" />
                            </div>
                            <textarea
                                rows={8}
                                value={emailTemplate}
                                onChange={(e) => setEmailTemplate(e.target.value)}
                                className="w-full p-3 text-xs outline-none resize-y"
                                style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                            />
                        </div>
                        <div className="mt-3">
                            <button type="button" className="rounded-md bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white cursor-pointer transition-colors">
                                Save
                            </button>
                        </div>
                    </Card>
                </div>
                </div>
                )}

                {/* Compliance Head */}
                {activeSection === 'compliance-head' && (
                <div className="space-y-4">
                <SectionHeader id="compliance-head" icon={CheckSquare} title="Compliance Head" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ListSettingCard title="Compliance Report recipient" items={lists.complianceReportRecipient} onAdd={(v) => addItem('complianceReportRecipient', v)} onDelete={(v) => deleteItem('complianceReportRecipient', v)} placeholder="New email..." controlStyle={controlStyle} />
                    <ListSettingCard title="Email recipient for Compliance Discrepancy Alert" items={lists.complianceDiscrepancyAlert} onAdd={(v) => addItem('complianceDiscrepancyAlert', v)} onDelete={(v) => deleteItem('complianceDiscrepancyAlert', v)} placeholder="New email..." controlStyle={controlStyle} />
                    <ListSettingCard title="Email recipient for Weekly Commission Report" items={lists.weeklyCommissionReport} onAdd={(v) => addItem('weeklyCommissionReport', v)} onDelete={(v) => deleteItem('weeklyCommissionReport', v)} placeholder="New email..." controlStyle={controlStyle} />
                </div>
                </div>
                )}

                {/* Panic Mode */}
                {activeSection === 'panic-mode' && (
                <div className="space-y-4">
                <SectionHeader id="panic-mode" icon={Ban} title="Panic Mode" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card padding="p-4" hoverable={false}>
                        <div className="text-xs font-bold mb-2.5" style={{ color: 'var(--text-primary)' }}>Panic Mode</div>
                        <p className="text-xs text-rose-500 leading-relaxed">
                            Upon activating panic mode, the website will be removed from the server, and both the database and source code will be backed up on AWS. Additionally, all user accounts will be deactivated, preventing any further access to the site.
                        </p>
                        <p className="text-[11px] text-amber-500 mt-3">
                            Kindly save your mobile number first so that we can send the OTP to that number.
                        </p>
                    </Card>
                </div>
                </div>
                )}
                </div>
                </div>
            </div>
        </AppLayout>
    );
}
