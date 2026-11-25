import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';

const COLUMNS = [
    { id: 'todo', title: 'To Do', color: '#0EA5E9' },
    { id: 'inprogress', title: 'In Progress', color: '#14B8A6' },
    { id: 'done', title: 'Done', color: '#00B073' },
];

export default function Kanban() {
    const [cards, setCards] = useState({
        todo: [{ id: 1, text: 'Review pending Vitality LIFE compliance queue' }],
        inprogress: [{ id: 2, text: 'Follow up with static rescue leads' }],
        done: [{ id: 3, text: 'Export October commission variance report' }],
    });
    const [drafts, setDrafts] = useState({ todo: '', inprogress: '', done: '' });

    const addCard = (colId) => {
        const text = drafts[colId].trim().slice(0, 250);
        if (!text) return;
        setCards((prev) => ({
            ...prev,
            [colId]: [...prev[colId], { id: Date.now(), text }],
        }));
        setDrafts((prev) => ({ ...prev, [colId]: '' }));
    };

    const removeCard = (colId, cardId) => {
        setCards((prev) => ({
            ...prev,
            [colId]: prev[colId].filter((c) => c.id !== cardId),
        }));
    };

    const moveCard = (fromCol, toCol, card) => {
        setCards((prev) => ({
            ...prev,
            [fromCol]: prev[fromCol].filter((c) => c.id !== card.id),
            [toCol]: [...prev[toCol], card],
        }));
    };

    return (
        <AppLayout>
            <Head title="My Kanban" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    My Kanban
                </h1>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 items-start">
                    {COLUMNS.map((col, colIdx) => (
                        <Card key={col.id} accentColor={col.color} padding="p-4" hoverable={false}>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-inter-black text-sm" style={{ color: 'var(--text-primary)' }}>{col.title}</h2>
                                <span
                                    className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                                    style={{ backgroundColor: 'var(--bg-surface-alt)', color: 'var(--text-muted)' }}
                                >
                                    {cards[col.id].length}
                                </span>
                            </div>

                            <div className="space-y-2 mb-3">
                                {cards[col.id].map((card) => (
                                    <div
                                        key={card.id}
                                        className="rounded-lg border p-3 text-xs space-y-2"
                                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                                    >
                                        <p style={{ color: 'var(--text-primary)' }}>{card.text}</p>
                                        <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <div className="inline-flex items-center gap-1">
                                                {colIdx > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => moveCard(col.id, COLUMNS[colIdx - 1].id, card)}
                                                        className="rounded p-1 hover:opacity-80 cursor-pointer"
                                                        style={{ color: 'var(--text-muted)' }}
                                                        title="Move left"
                                                    >
                                                        <ArrowLeft className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                                {colIdx < COLUMNS.length - 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => moveCard(col.id, COLUMNS[colIdx + 1].id, card)}
                                                        className="rounded p-1 hover:opacity-80 cursor-pointer"
                                                        style={{ color: 'var(--text-muted)' }}
                                                        title="Move right"
                                                    >
                                                        <ArrowRight className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeCard(col.id, card.id)}
                                                className="rounded p-1 text-rose-500 hover:bg-rose-500/15 cursor-pointer"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <textarea
                                    rows={3}
                                    maxLength={250}
                                    value={drafts[col.id]}
                                    onChange={(e) => setDrafts((prev) => ({ ...prev, [col.id]: e.target.value }))}
                                    placeholder="Enter data for this card. Max 250 characters"
                                    className="w-full rounded-lg border p-2.5 text-xs outline-none resize-none"
                                    style={{
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-subtle)',
                                        color: 'var(--text-primary)',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => addCard(col.id)}
                                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                                    style={{
                                        borderColor: col.color,
                                        color: col.color,
                                        backgroundColor: 'var(--bg-surface)',
                                    }}
                                >
                                    <Plus className="h-3.5 w-3.5" /> Add New Card
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
