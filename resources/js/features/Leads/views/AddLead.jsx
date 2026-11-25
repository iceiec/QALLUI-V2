import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import CustomSelect from '@/components/CustomSelect';

function YesNoToggle({ label, value, onChange }) {
    return (
        <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                {label}
            </label>
            <div className="grid grid-cols-2 gap-2">
                {['Yes', 'No'].map((opt) => {
                    const active = value === opt;
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onChange(opt)}
                            className="rounded-lg border py-2 text-xs font-semibold transition-colors cursor-pointer"
                            style={{
                                backgroundColor: active ? 'var(--accent-soft)' : 'var(--bg-surface)',
                                borderColor: active ? 'var(--accent)' : 'var(--border-subtle)',
                                color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                            }}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function AddLead() {
    const [form, setForm] = useState({
        title: '',
        leadSource: '',
        firstName: '',
        lastName: '',
        mobile: '',
        under60: '',
        currentInsurer: '',
        policyAge: '',
        medicalConditions: '',
        testsInvestigations: '',
        sinceTakingOutPolicy: '',
        heartAttackCancerStroke: '',
        hasDocuments: '',
        optIn: '',
        junior: 'Ise Junior',
    });

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const setField = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

    const handleSubmit = (e) => {
        e.preventDefault();
        router.visit('/junior/leads');
    };

    return (
        <AppLayout>
            <Head title="New Lead" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    New Lead
                </h1>

                <Card padding="p-4 sm:p-6" hoverable={false}>
                    <h2 className="font-inter-black text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                        Customer Info
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Title <span className="text-rose-500">*</span>
                                </label>
                                <CustomSelect
                                    value={form.title}
                                    onChange={(e) => setField('title')(e.target.value)}
                                    style={controlStyle}
                                    options={[{ label: 'Select', value: '' }, 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr']}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Lead Source
                                </label>
                                <CustomSelect
                                    value={form.leadSource}
                                    onChange={(e) => setField('leadSource')(e.target.value)}
                                    style={controlStyle}
                                    options={[{ label: 'Select', value: '' }, 'Web Lead', 'Referral', 'Cold Call', 'Static Lead']}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={form.firstName}
                                    onChange={(e) => setField('firstName')(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 outline-none"
                                    style={controlStyle}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={form.lastName}
                                    onChange={(e) => setField('lastName')(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 outline-none"
                                    style={controlStyle}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    value={form.mobile}
                                    onChange={(e) => setField('mobile')(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 outline-none"
                                    style={controlStyle}
                                />
                            </div>

                            <YesNoToggle label="Customer Under 60" value={form.under60} onChange={setField('under60')} />

                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Current Insurer
                                </label>
                                <CustomSelect
                                    value={form.currentInsurer}
                                    onChange={(e) => setField('currentInsurer')(e.target.value)}
                                    style={controlStyle}
                                    options={[{ label: 'Select', value: '' }, 'AIG', 'Aviva', 'Legal & General', 'Royal London', 'Vitality', 'Zurich']}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Policy Age
                                </label>
                                <CustomSelect
                                    value={form.policyAge}
                                    onChange={(e) => setField('policyAge')(e.target.value)}
                                    style={controlStyle}
                                    options={[{ label: 'Select', value: '' }, '18-25', '26-35', '36-45', '46-55', '56+']}
                                />
                            </div>

                            <YesNoToggle label="Medical Conditions" value={form.medicalConditions} onChange={setField('medicalConditions')} />
                            <YesNoToggle label="Tests / Investigations" value={form.testsInvestigations} onChange={setField('testsInvestigations')} />
                            <YesNoToggle label="Since Taking Out Policy" value={form.sinceTakingOutPolicy} onChange={setField('sinceTakingOutPolicy')} />
                            <YesNoToggle label="Heart Attack, Cancer, Stroke" value={form.heartAttackCancerStroke} onChange={setField('heartAttackCancerStroke')} />
                            <YesNoToggle label="Has Documents" value={form.hasDocuments} onChange={setField('hasDocuments')} />
                            <YesNoToggle label="Opt In" value={form.optIn} onChange={setField('optIn')} />

                            <div>
                                <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    Junior
                                </label>
                                <CustomSelect
                                    value={form.junior}
                                    onChange={(e) => setField('junior')(e.target.value)}
                                    style={controlStyle}
                                    options={['Ise Junior', 'Tricia Junior', 'Angelo Junior']}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                            <button
                                type="submit"
                                className="rounded-lg px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
