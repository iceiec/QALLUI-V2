import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Send, Search, Circle } from 'lucide-react';
import AppLayout from '../../Layouts/AppLayout';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';

const INITIAL_THREADS = [
    {
        id: 't1',
        name: 'Justin Bennett',
        source: 'DGFinity',
        stage: 'On Cover',
        unread: 2,
        lastMessage: 'Thanks, I have uploaded the signed policy schedule.',
        time: '18:42',
        messages: [
            { id: 1, sender: 'client', text: 'Hi, I received the quote for £248.50/mo.', time: '18:30' },
            { id: 2, sender: 'advisor', text: 'Great! Please confirm your direct debit start date.', time: '18:36' },
            { id: 3, sender: 'client', text: 'Thanks, I have uploaded the signed policy schedule.', time: '18:42' },
        ],
    },
    {
        id: 't2',
        name: 'Lisa Bennett',
        source: 'Sealeed',
        stage: 'FF Partial',
        unread: 0,
        lastMessage: 'Can we finish the medical questions tomorrow morning?',
        time: '17:15',
        messages: [
            { id: 1, sender: 'advisor', text: 'Hi Lisa, just checking in on your fact find.', time: '17:02' },
            { id: 2, sender: 'client', text: 'Can we finish the medical questions tomorrow morning?', time: '17:15' },
        ],
    },
    {
        id: 't3',
        name: 'Robert Doughty',
        source: 'DGFinity',
        stage: 'On Cover',
        unread: 0,
        lastMessage: 'Policy AV988910 is now active.',
        time: '14:22',
        messages: [
            { id: 1, sender: 'advisor', text: 'Policy AV988910 is now active.', time: '14:22' },
        ],
    },
];

export default function Messages({ title = 'Messages' }) {
    const [threads, setThreads] = useState(INITIAL_THREADS);
    const [activeId, setActiveId] = useState('t1');
    const [draft, setDraft] = useState('');
    const [filter, setFilter] = useState('');

    const activeThread = threads.find((t) => t.id === activeId) || threads[0];
    const filteredThreads = threads.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase()));

    const sendMessage = (e) => {
        e.preventDefault();
        if (!draft.trim()) return;
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setThreads((prev) =>
            prev.map((t) =>
                t.id === activeThread.id
                    ? {
                          ...t,
                          lastMessage: draft.trim(),
                          time: timeStr,
                          messages: [...t.messages, { id: Date.now(), sender: 'advisor', text: draft.trim(), time: timeStr }],
                      }
                    : t
            )
        );
        setDraft('');
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="space-y-4">
                <div>
                    <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {title}
                    </h1>
                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        Live client message threads and advisor replies
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Thread List */}
                    <Card padding="p-3" hoverable={false} className="lg:col-span-1">
                        <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder="Filter conversations..."
                                className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none"
                                style={{
                                    backgroundColor: 'var(--bg-surface-alt)',
                                    borderColor: 'var(--border-subtle)',
                                    color: 'var(--text-primary)',
                                }}
                            />
                        </div>

                        <div className="space-y-1">
                            {filteredThreads.map((thread) => {
                                const active = thread.id === activeThread.id;
                                return (
                                    <button
                                        key={thread.id}
                                        type="button"
                                        onClick={() => setActiveId(thread.id)}
                                        className="w-full rounded-lg border p-2.5 text-left transition-colors cursor-pointer"
                                        style={{
                                            backgroundColor: active ? 'var(--accent-soft)' : 'transparent',
                                            borderColor: active ? 'var(--accent)' : 'transparent',
                                        }}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-bold text-xs truncate" style={{ color: 'var(--text-primary)' }}>
                                                {thread.name}
                                            </span>
                                            <span className="text-[10px] tabular-nums" style={{ color: 'var(--text-muted)' }}>
                                                {thread.time}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center justify-between gap-2">
                                            <span className="text-[11px] truncate" style={{ color: 'var(--text-secondary)' }}>
                                                {thread.lastMessage}
                                            </span>
                                            {thread.unread > 0 && (
                                                <span
                                                    className="rounded-full px-1.5 py-0.2 text-[10px] font-bold text-white"
                                                    style={{ backgroundColor: 'var(--accent)' }}
                                                >
                                                    {thread.unread}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Live Message Thread */}
                    <Card padding="p-0 overflow-hidden flex flex-col min-h-[420px]" hoverable={false} className="lg:col-span-2">
                        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{activeThread.name}</span>
                                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                                        <Circle className="h-2 w-2 fill-emerald-500" /> Live
                                    </span>
                                </div>
                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Source: {activeThread.source}</div>
                            </div>
                            <Badge stage={activeThread.stage}>{activeThread.stage}</Badge>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto p-4">
                            {activeThread.messages.map((msg) => {
                                const isAdvisor = msg.sender === 'advisor';
                                return (
                                    <div key={msg.id} className={`flex ${isAdvisor ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className="max-w-[80%] rounded-xl px-3.5 py-2 text-xs"
                                            style={{
                                                backgroundColor: isAdvisor ? 'var(--accent)' : 'var(--bg-surface-alt)',
                                                color: isAdvisor ? '#ffffff' : 'var(--text-primary)',
                                            }}
                                        >
                                            <div>{msg.text}</div>
                                            <div className={`mt-1 text-[10px] text-right ${isAdvisor ? 'text-white/75' : ''}`} style={!isAdvisor ? { color: 'var(--text-muted)' } : undefined}>
                                                {msg.time}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <form onSubmit={sendMessage} className="flex items-center gap-2 border-t p-3" style={{ borderColor: 'var(--border-subtle)' }}>
                            <input
                                type="text"
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                placeholder="Type a reply..."
                                className="flex-1 rounded-lg border px-3 py-2 text-xs outline-none"
                                style={{
                                    backgroundColor: 'var(--bg-surface-alt)',
                                    borderColor: 'var(--border-subtle)',
                                    color: 'var(--text-primary)',
                                }}
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-white cursor-pointer"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                <Send className="h-3.5 w-3.5" />
                                <span>Send</span>
                            </button>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
