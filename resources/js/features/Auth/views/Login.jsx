import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const ACCOUNTS = [
    { label: 'Ise Admin', email: 'ise.admin@qallhub.com', role: 'Master Admin', href: '/' },
    { label: 'Ise Junior', email: 'ise.junior@qallhub.com', role: 'Junior', href: '/junior' },
    { label: 'Ise Finance', email: 'ise.finance@qallhub.com', role: 'Finance', href: '/finance' },
];

export default function Login() {
    const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
    const [email, setEmail] = useState(ACCOUNTS[0].email);
    const [password, setPassword] = useState('••••••••••');
    const [showPassword, setShowPassword] = useState(false);

    const handleSelectAccount = (acc) => {
        setSelectedAccount(acc);
        setEmail(acc.email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.visit(selectedAccount.href);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900">
            <Head title="Sign In — QALL" />

            {/* Left Brand Panel */}
            <div className="relative hidden lg:flex lg:flex-1 items-center justify-center overflow-hidden bg-slate-50 px-12">
                <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />
                <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="relative z-10 max-w-md text-center space-y-3">
                    <h1 className="font-inter-black text-4xl xl:text-5xl tracking-tight text-slate-900">
                        A <span className="text-blue-600">Better Qall.</span>
                    </h1>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        The high-performance insurance CRM powering the next generation of brokerages.
                    </p>
                </div>
            </div>

            {/* Right Sign-In Panel */}
            <div className="flex w-full lg:w-[440px] xl:w-[480px] shrink-0 flex-col justify-center bg-white px-6 py-12 sm:px-12 shadow-xl lg:border-l border-slate-200/80 min-h-screen">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-amber-500 font-inter-black text-lg text-white shadow-sm">
                            Q
                        </div>
                        <span className="font-inter-black text-xl tracking-[0.2em] text-amber-500">QALL</span>
                    </div>

                    <div>
                        <h2 className="font-inter-black text-2xl tracking-tight text-slate-900">Welcome back</h2>
                        <p className="mt-1 text-xs text-slate-500">Sign in to your account to continue</p>
                    </div>

                    {/* Quick Account Switcher */}
                    <div>
                        <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Select Account
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {ACCOUNTS.map((acc) => {
                                const active = selectedAccount.label === acc.label;
                                return (
                                    <button
                                        key={acc.label}
                                        type="button"
                                        onClick={() => handleSelectAccount(acc)}
                                        className={`rounded-xl border px-2.5 py-2 text-left transition-all cursor-pointer ${
                                            active
                                                ? 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-xs'
                                                : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        <div className="text-[11px] font-bold truncate">{acc.label}</div>
                                        <div className="text-[10px] opacity-75 truncate">{acc.role}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-9 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            <span>Sign In as {selectedAccount.label}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </form>

                    <div className="flex items-center justify-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>All systems operational · Contact admin for account help</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
