import React, { useState } from 'react';
import CustomSelect from './CustomSelect';
import { createPortal } from 'react-dom';
import { X, FileText } from 'lucide-react';

const POLICY_TYPES = ['LIFE', 'CIC', 'PMI', 'IP', 'FIB', 'WOL', 'WILL', 'PENSION', 'HOME', 'ACCIDENT'];

export default function AddPolicyModal({ open, onClose, mode = 'add', entity = 'Policy' }) {
    const [policyType, setPolicyType] = useState('LIFE');
    const [pmiSubTab, setPmiSubTab] = useState('Personal');

    if (!open) return null;

    const inputStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const readOnlyStyle = {
        backgroundColor: 'var(--bg-surface-alt)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-muted)',
    };

    const YesNo = ({ label, defaultValue = 'Yes' }) => (
        <div>
            <label className="block font-semibold mb-1">{label}</label>
            <CustomSelect defaultValue={defaultValue} style={inputStyle} options={["Yes","No"]} />
        </div>
    );

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-[3px]"
            onClick={onClose}
        >
            <div
                className="animate-popover my-auto w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent)' }}>
                            <FileText className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="font-inter-black text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
                                {mode === 'edit' ? `Update ${entity}` : `Add ${entity}`}
                            </h3>
                            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                Select a product type and complete the {entity.toLowerCase()} details
                            </p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="rounded-md p-1 hover:bg-black/10 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Product Type Pills */}
                <div className="flex flex-wrap gap-1.5 border-b px-5 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                    {POLICY_TYPES.map((type) => {
                        const active = policyType === type;
                        return (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setPolicyType(type)}
                                className="rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors"
                                style={{
                                    backgroundColor: active ? 'var(--accent)' : 'var(--bg-surface-alt)',
                                    color: active ? '#FFFFFF' : 'var(--text-secondary)',
                                }}
                            >
                                {type}
                            </button>
                        );
                    })}
                </div>

                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                    <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                        <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            {policyType} Details
                        </div>
                    {policyType === 'PMI' && (
                        <div className="grid grid-cols-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)' }}>
                            {['Personal', 'Business'].map((sub) => (
                                <button
                                    key={sub}
                                    type="button"
                                    onClick={() => setPmiSubTab(sub)}
                                    className="py-2 text-center border-b-2 cursor-pointer"
                                    style={{
                                        borderColor: pmiSubTab === sub ? '#2563EB' : 'transparent',
                                        color: pmiSubTab === sub ? '#2563EB' : 'var(--text-muted)',
                                    }}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Common Insurer & Policy No */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="block font-semibold mb-1">Insurer</label>
                            <CustomSelect style={inputStyle} options={["","Aviva","Vitality LIFE","Legal & General","Scottish Widows","AIG","Canada Life","Royal London"]} />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">{policyType === 'LIFE' || policyType === 'PMI' ? 'Policy Number' : 'Policy No'}</label>
                            <input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} />
                        </div>
                    </div>

                    {/* LIFE */}
                    {policyType === 'LIFE' && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div><label className="block font-semibold mb-1">Start Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">End Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Pol Age</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                                <div><label className="block font-semibold mb-1">Term Remaining</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                                <div><label className="block font-semibold mb-1">Sum Assured</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Cover Type</label><CustomSelect style={inputStyle} options={["","LTA","DTA","INC"]} /></div>
                                <div><label className="block font-semibold mb-1">Premium</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <YesNo label="Trust?" />
                                <YesNo label="Smoker?" />
                                <YesNo label="Loading?" />
                                <YesNo label="Exclusions?" />
                                <YesNo label="Global Treatment?" />
                                <YesNo label="Fracture Cover?" />
                                <YesNo label="Increasing Cover?" />
                                <YesNo label="Conversion Option?" />
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <YesNo label="Renewal Option?" />
                                <div><label className="block font-semibold mb-1">Premium Frequency</label><CustomSelect defaultValue="Weekly" style={inputStyle} options={["Weekly","Monthly","Annually"]} /></div>
                            </div>
                            <div><label className="block font-semibold mb-1">Additional Info</label><textarea rows={2} className="w-full rounded-lg border px-3 py-2 outline-none resize-none" style={inputStyle} /></div>
                        </>
                    )}

                    {/* CIC */}
                    {policyType === 'CIC' && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div><label className="block font-semibold mb-1">Start Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">End Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Pol Age</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                                <div><label className="block font-semibold mb-1">Term Remaining</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                                <div><label className="block font-semibold mb-1">Sum Assured CIC</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Premium CIC</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Cover Type CIC</label><CustomSelect style={inputStyle} options={["","LTA","DTA"]} /></div>
                                <div><label className="block font-semibold mb-1">CIC Type</label><CustomSelect defaultValue="Core" style={inputStyle} options={["Core","Enhanced"]} /></div>
                                <YesNo label="Trust?" />
                                <YesNo label="Smoker?" />
                                <YesNo label="Fracture Cover?" />
                                <YesNo label="Loading?" />
                            </div>
                            <div><label className="block font-semibold mb-1">Additional Info</label><textarea rows={2} className="w-full rounded-lg border px-3 py-2 outline-none resize-none" style={inputStyle} /></div>
                        </>
                    )}

                    {/* PMI (Personal & Business) */}
                    {policyType === 'PMI' && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div><label className="block font-semibold mb-1">{pmiSubTab === 'Personal' ? 'No. Of People Covered' : 'Members Covered'}</label><input type="number" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Start Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">End Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Premium</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <div><label className="block font-semibold mb-1">Excess Type</label><CustomSelect style={inputStyle} options={[{"label":"Select Type","value":""},{"label":"Annual","value":"Annual"},{"label":"Per Claim","value":"Per Claim"}]} /></div>
                                <div><label className="block font-semibold mb-1">Excess Amount</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                {pmiSubTab === 'Personal' ? (
                                    <div><label className="block font-semibold mb-1">Underwriting Type</label><CustomSelect style={inputStyle} options={[{"label":"Select Type","value":""},{"label":"Moratorium","value":"Moratorium"},{"label":"FMU","value":"FMU"}]} /></div>
                                ) : (
                                    <>
                                        <div><label className="block font-semibold mb-1">Underwriting Method</label><CustomSelect style={inputStyle} options={[{"label":"Select Type","value":""},{"label":"MHD","value":"MHD"},{"label":"Moratorium","value":"Moratorium"}]} /></div>
                                        <div><label className="block font-semibold mb-1">Product Tier</label><CustomSelect style={inputStyle} options={[{"label":"Select Type","value":""},{"label":"Core","value":"Core"},{"label":"Comprehensive","value":"Comprehensive"}]} /></div>
                                        <div><label className="block font-semibold mb-1">Payment Frequency</label><CustomSelect style={inputStyle} options={[{"label":"Select Type","value":""},{"label":"Monthly","value":"Monthly"},{"label":"Annually","value":"Annually"}]} /></div>
                                    </>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <YesNo label="Outpatient Cover?" />
                                <div><label className="block font-semibold mb-1">Outpatient Cover Amount</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                                <YesNo label="Therapies?" />
                                <YesNo label="Mental Health?" />
                                <YesNo label="Optical,Dental,Audiological?" />
                                <YesNo label="Travel Cover?" />
                                <YesNo label="Personal Health Fund?" />
                                <YesNo label="Employee Assistance?" />
                            </div>
                        </>
                    )}

                    {/* IP */}
                    {policyType === 'IP' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div><label className="block font-semibold mb-1">Start Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">End Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Pol Age</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                            <div><label className="block font-semibold mb-1">Term Remaining</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                            <div><label className="block font-semibold mb-1">Sum Assured</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">PM/PA</label><CustomSelect defaultValue="Month" style={inputStyle} options={["Month","Annum"]} /></div>
                            <div><label className="block font-semibold mb-1">Cover Type</label><CustomSelect style={inputStyle} options={["","Full Term","Limited"]} /></div>
                            <div><label className="block font-semibold mb-1">Premium</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Deferment Period</label><CustomSelect style={inputStyle} options={["","4 Weeks","8 Weeks","13 Weeks"]} /></div>
                            <div><label className="block font-semibold mb-1">W/M</label><CustomSelect style={inputStyle} options={["","Weeks","Months"]} /></div>
                            <div><label className="block font-semibold mb-1">Payout Period</label><CustomSelect style={inputStyle} options={["","1 Year","2 Years","Full Term"]} /></div>
                            <div><label className="block font-semibold mb-1">Salary Disclosed</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Occupation Disclosed</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <YesNo label="Smoker?" />
                            <YesNo label="Loading?" />
                            <YesNo label="Exclusions?" />
                        </div>
                    )}

                    {/* FIB & WOL */}
                    {(policyType === 'FIB' || policyType === 'WOL') && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div><label className="block font-semibold mb-1">Start Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">End Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Pol Age</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                            <div><label className="block font-semibold mb-1">Term Remaining</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                            <div><label className="block font-semibold mb-1">Sum Assured</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Cover Type</label><CustomSelect style={inputStyle} options={["","LTA","DTA"]} /></div>
                            <div><label className="block font-semibold mb-1">Premium</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">CIC</label><CustomSelect style={inputStyle} options={["","Yes","No"]} /></div>
                            <YesNo label="Trust?" />
                            <YesNo label="Smoker?" />
                            <YesNo label="Loading?" />
                            <YesNo label="Exclusions?" />
                        </div>
                    )}

                    {/* WILL */}
                    {policyType === 'WILL' && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div><label className="block font-semibold mb-1">Start Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <YesNo label="Updated Since?" />
                            <div className="sm:col-span-2"><label className="block font-semibold mb-1">Cost/Payment Scheme For Writing Service</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                        </div>
                    )}

                    {/* PENSION */}
                    {policyType === 'PENSION' && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <YesNo label="Still With Original Provider?" />
                            <div><label className="block font-semibold mb-1">Scheme</label><CustomSelect defaultValue="Private" style={inputStyle} options={["Private","Workplace"]} /></div>
                            <div><label className="block font-semibold mb-1">Established Since</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Estimated Year Of Retirement?</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Monthly Contribution?</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Approximate Pot Size</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                        </div>
                    )}

                    {/* HOME */}
                    {policyType === 'HOME' && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <YesNo label="Buildings?" />
                            <YesNo label="Contents?" />
                            <YesNo label="Accidental Cover?" />
                            <div><label className="block font-semibold mb-1">Month Of Renewal</label><CustomSelect style={inputStyle} options={["","January","February","March"]} /></div>
                            <div><label className="block font-semibold mb-1">Claim Limits/Exclusions?</label><input type="text" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Premium?</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                        </div>
                    )}

                    {/* ACCIDENT */}
                    {policyType === 'ACCIDENT' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div><label className="block font-semibold mb-1">Start Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">End Date</label><input type="date" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Pol Age</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                            <div><label className="block font-semibold mb-1">Term Remaining</label><input type="text" readOnly className="w-full rounded-lg border px-3 py-2 outline-none" style={readOnlyStyle} /></div>
                            <div><label className="block font-semibold mb-1">Core Cover Units</label><CustomSelect style={inputStyle} options={["","1 Unit","2 Units"]} /></div>
                            <div><label className="block font-semibold mb-1">Optional Cover Type</label><CustomSelect defaultValue="None" style={inputStyle} options={["None","Fracture"]} /></div>
                            <div className="col-span-2"><label className="block font-semibold mb-1">No. Of Units</label><input type="number" defaultValue={1} className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Premium</label><input type="text" placeholder="£" className="w-full rounded-lg border px-3 py-2 outline-none" style={inputStyle} /></div>
                            <div><label className="block font-semibold mb-1">Payment Frequency</label><CustomSelect style={inputStyle} options={["","Monthly","Annually"]} /></div>
                        </div>
                    )}
                    </div>

                    {/* Purchase & Client Info */}
                    <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                        <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            Client & Purchase Info
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block font-semibold mb-1">Client</label>
                                <CustomSelect defaultValue="Gavin Testing Baker2" style={inputStyle} options={["Gavin Testing Baker2","GavinTest2 Partner2"]} />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">How Was This Bought</label>
                                <CustomSelect style={inputStyle} options={["","Direct","Broker"]} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2.5 border-t px-5 py-3.5" style={{ borderColor: 'var(--border-subtle)' }}>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border px-5 py-2.5 text-xs font-bold cursor-pointer transition-colors"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition-opacity hover:opacity-90"
                        style={{ backgroundColor: 'var(--accent)' }}
                    >
                        {mode === 'edit' ? `Update ${entity}` : `Add ${entity}`}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
