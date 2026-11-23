import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';
import { MOST_LEADS_ADVISORS } from '../../data/mockData';

export default function Users({ title }) {
    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-4">
                <div>
                    <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {title}
                    </h1>
                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        Active advisors and lead capacity
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {MOST_LEADS_ADVISORS.map((adv) => (
                        <Card key={adv.name}>
                            <div className="flex items-center justify-between">
                                <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{adv.name}</div>
                                <Badge tone="emerald">Active</Badge>
                            </div>
                            <div className="mt-3 font-inter-black text-2xl" style={{ color: 'var(--accent-text)' }}>
                                {adv.leads.toLocaleString()}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{adv.share}</div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
