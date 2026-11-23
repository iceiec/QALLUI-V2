import React from 'react';
import { Head } from '@inertiajs/react';
import { Database, Download } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';

export default function DbBackups() {
    return (
        <AppLayout>
            <Head title="Download Backup DB" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Download Backup DB
                </h1>

                <Card>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                <Database className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Latest Database Snapshot</div>
                                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>qall_production_2026_11_18.sql.gz</div>
                            </div>
                        </div>
                        <button type="button" className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white self-start sm:self-auto cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                            <Download className="h-3.5 w-3.5" /> Download Backup
                        </button>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
