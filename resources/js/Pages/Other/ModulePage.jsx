import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';

export default function ModulePage({ section = 'Other', title = 'Module', subtitle = '' }) {
    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent-text)' }}>
                            {section}
                        </div>
                        <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <Badge tone="emerald">Ready for UI Spec</Badge>
                </div>

                <Card>
                    <div className="py-8 text-center space-y-2">
                        <div className="font-inter-black text-base" style={{ color: 'var(--text-primary)' }}>
                            {title} Workspace
                        </div>
                        <p className="text-xs max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                            Route and navigation are wired up. Ready to build out the {title} table, filters, and actions.
                        </p>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
