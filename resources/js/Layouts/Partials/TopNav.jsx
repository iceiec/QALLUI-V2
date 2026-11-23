import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Layers,
    ChevronDown,
    Search,
    Menu,
    PanelLeftClose,
    PanelLeftOpen,
    Kanban,
    UserCog,
    Bell,
    User,
    Settings,
    LogOut,
    X,
} from 'lucide-react';
import ThemeStudioPopover from './ThemeStudioPopover';
import NotificationsModal from '../../Components/NotificationsModal';

export default function TopNav({
    theme,
    setTheme,
    navMode,
    setNavMode,
    sidebarVisible,
    onToggleSidebar,
    onOpenSearch,
    onOpenMobileMenu,
}) {
    const { url } = usePage();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [profileTab, setProfileTab] = useState('About');
    const [profileForm, setProfileForm] = useState({
        jobTitle: 'Master Admin',
        department: 'Administration',
        extNumber: '101',
        workEmail: 'angelo@qallhub.com',
        startDate: '2025-01-01',
        profileImage: '',
        bankName: '',
        accountName: 'Angelo Villanueva',
        sortCode: '',
        accountNumber: '',
        agentCommission: '0',
    });
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const [openMenu, setOpenMenu] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    const isLeadsActive = url.startsWith('/leads');
    const isAdminActive = url.startsWith('/admin');

    return (
        <header
            className="sticky top-0 z-40 border-b backdrop-blur-md"
            style={{
                backgroundColor: 'var(--bg-nav)',
                borderColor: 'var(--border-subtle)',
                boxShadow: 'var(--header-shadow)',
            }}
        >
            <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-3 sm:px-6" ref={navRef}>
                {/* Left: Mobile Hamburger + Brand + Desktop Nav */}
                <div className="flex items-center gap-2 sm:gap-5">
                    <button
                        type="button"
                        onClick={onOpenMobileMenu}
                        className="inline-flex lg:hidden items-center justify-center rounded-lg border p-1.5 cursor-pointer"
                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                        aria-label="Open navigation menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    {navMode === 'sidebar' && (
                        <button
                            type="button"
                            onClick={onToggleSidebar}
                            className="hidden lg:inline-flex items-center justify-center rounded-lg border p-1.5 transition-colors cursor-pointer"
                            style={{
                                backgroundColor: 'var(--bg-surface-alt)',
                                borderColor: 'var(--border-subtle)',
                                color: 'var(--text-secondary)',
                            }}
                            title={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
                            aria-label={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
                        >
                            {sidebarVisible ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
                        </button>
                    )}

                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg font-inter-black text-sm text-white shadow-xs"
                            style={{ backgroundColor: 'var(--accent)' }}
                        >
                            Q
                        </div>
                        <span className="font-inter-black text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            QALL
                        </span>
                    </Link>

                    <nav
                        className={`hidden lg:flex items-center gap-1 ml-2 transition-all duration-300 ease-out origin-left ${
                            navMode === 'topbar'
                                ? 'opacity-100 scale-100 max-w-2xl'
                                : 'opacity-0 scale-95 max-w-0 overflow-hidden pointer-events-none'
                        }`}
                        aria-hidden={navMode !== 'topbar'}
                    >
                            <Link
                                href="/"
                                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                                style={{
                                    backgroundColor: url === '/' ? 'var(--accent-soft)' : 'transparent',
                                    color: url === '/' ? 'var(--accent-text)' : 'var(--text-secondary)',
                                }}
                            >
                                <LayoutDashboard className="h-3.5 w-3.5" />
                                <span>Dashboard</span>
                            </Link>

                            {/* Leads Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenMenu(openMenu === 'leads' ? null : 'leads')}
                                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                                    style={{
                                        backgroundColor: isLeadsActive ? 'var(--accent-soft)' : 'transparent',
                                        color: isLeadsActive ? 'var(--accent-text)' : 'var(--text-secondary)',
                                    }}
                                >
                                    <Users className="h-3.5 w-3.5" />
                                    <span>Leads</span>
                                    <ChevronDown className="h-3 w-3 opacity-70" />
                                </button>

                                {openMenu === 'leads' && (
                                    <div
                                        className="animate-popover absolute left-0 mt-2 w-72 rounded-xl border p-2 shadow-xl z-50"
                                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                                    >
                                        <div className="flex items-center justify-between px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                            <span>Lead Management</span>
                                            <span>3 Routes</span>
                                        </div>
                                        <Link
                                            href="/leads"
                                            onClick={() => setOpenMenu(null)}
                                            className="flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors hover:opacity-95"
                                            style={{ backgroundColor: url === '/leads' ? 'var(--accent-soft)' : 'transparent' }}
                                        >
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>All Leads</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Master exchange book</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/leads/static"
                                            onClick={() => setOpenMenu(null)}
                                            className="flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors hover:opacity-95"
                                            style={{ backgroundColor: url === '/leads/static' ? 'var(--accent-soft)' : 'transparent' }}
                                        >
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Static Leads</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Static rescue pool</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/leads/pool"
                                            onClick={() => setOpenMenu(null)}
                                            className="flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors hover:opacity-95"
                                            style={{ backgroundColor: url === '/leads/pool' ? 'var(--accent-soft)' : 'transparent' }}
                                        >
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Leads Pool</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Unassigned & shared</div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Admin Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenMenu(openMenu === 'admin' ? null : 'admin')}
                                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                                    style={{
                                        backgroundColor: isAdminActive ? 'var(--accent-soft)' : 'transparent',
                                        color: isAdminActive ? 'var(--accent-text)' : 'var(--text-secondary)',
                                    }}
                                >
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    <span>Admin</span>
                                    {12 > 0 && (
                                        <Bell className="h-3.5 w-3.5 text-rose-500" title="Notifications" />
                                    )}
                                    <ChevronDown className="h-3 w-3 opacity-70" />
                                </button>

                                {openMenu === 'admin' && (
                                    <div
                                        className="animate-popover absolute left-0 mt-2 w-72 rounded-xl border p-2 shadow-xl z-50"
                                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                                    >
                                        <div className="mb-1.5 flex items-center justify-between px-2.5 pt-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                            <span>Administration</span>
                                            <span>4 Routes</span>
                                        </div>
                                        <Link
                                            href="/admin/compliance"
                                            onClick={() => setOpenMenu(null)}
                                            className="flex items-center justify-between rounded-lg px-2.5 py-2 qall-row-hover"
                                        >
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Compliance</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Audited policy submissions</div>
                                            </div>
                                            {12 > 0 && (
                                                <Bell className="h-3.5 w-3.5 text-rose-500" title="Notifications" />
                                            )}
                                        </Link>
                                        <Link
                                            href="/admin/secondary-approval"
                                            onClick={() => setOpenMenu(null)}
                                            className="flex items-center justify-between rounded-lg px-2.5 py-2 qall-row-hover"
                                        >
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Secondary Approval</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Pending second-sign queue</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/admin/voip"
                                            onClick={() => setOpenMenu(null)}
                                            className="flex items-center justify-between rounded-lg px-2.5 py-2 qall-row-hover"
                                        >
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>VoIP</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Call routing &amp; extensions</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/admin/calendar"
                                            onClick={() => setOpenMenu(null)}
                                            className="flex items-center justify-between rounded-lg px-2.5 py-2 qall-row-hover"
                                        >
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Calendar</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Callbacks &amp; schedules</div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Other Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenMenu(openMenu === 'other' ? null : 'other')}
                                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                                    style={{
                                        backgroundColor:
                                            url.startsWith('/billing') ||
                                            url.startsWith('/customers') ||
                                            url.startsWith('/reports') ||
                                            url.startsWith('/settings') ||
                                            url === '/kanban'
                                                ? 'var(--accent-soft)'
                                                : 'transparent',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    <Layers className="h-3.5 w-3.5" />
                                    <span>Other</span>
                                    <ChevronDown className="h-3 w-3 opacity-70" />
                                </button>

                                {openMenu === 'other' && (
                                    <div
                                        className="animate-popover absolute left-0 mt-2 w-72 rounded-xl border p-2 shadow-xl z-50 space-y-0.5"
                                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
                                    >
                                        <div className="mb-1.5 flex items-center justify-between px-2.5 pt-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                            <span>Workspace &amp; Tools</span>
                                            <span>5 Sections</span>
                                        </div>
                                        {/* Billing Sub-dropdown */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setOpenSubmenu(openSubmenu === 'billing' ? null : 'billing')}
                                                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left qall-row-hover cursor-pointer"
                                            >
                                                <div>
                                                    <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Billing</div>
                                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Failures, ledger &amp; invoices</div>
                                                </div>
                                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openSubmenu === 'billing' ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                            </button>
                                            {openSubmenu === 'billing' && (
                                                <div className="ml-3 pl-2.5 border-l space-y-0.5 pb-1" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <Link href="/billing/payment-failures" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Payment Failures</Link>
                                                    <Link href="/billing/ledger" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Ledger</Link>
                                                    <Link href="/billing" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Billing</Link>
                                                </div>
                                            )}
                                        </div>

                                        <Link href="/customers" onClick={() => setOpenMenu(null)} className="flex items-center justify-between rounded-lg px-2.5 py-2 qall-row-hover">
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Manage Customer</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Client directory &amp; profiles</div>
                                            </div>
                                        </Link>

                                        {/* Report Sub-dropdown */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setOpenSubmenu(openSubmenu === 'report' ? null : 'report')}
                                                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left qall-row-hover cursor-pointer"
                                            >
                                                <div>
                                                    <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Report</div>
                                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Daily, pools &amp; variance</div>
                                                </div>
                                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openSubmenu === 'report' ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                            </button>
                                            {openSubmenu === 'report' && (
                                                <div className="ml-3 pl-2.5 border-l space-y-0.5 pb-1" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <Link href="/reports/daily" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Daily Reporting</Link>
                                                    <Link href="/reports/dead-pool" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Dead Pool</Link>
                                                    <Link href="/reports/rejected-pool" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Rejected Pool</Link>
                                                    <Link href="/reports/externals" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Externals</Link>
                                                    <Link href="/reports/commission-variance" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Commission Variance</Link>
                                                </div>
                                            )}
                                        </div>

                                        {/* Settings Sub-dropdown */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setOpenSubmenu(openSubmenu === 'settings' ? null : 'settings')}
                                                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left qall-row-hover cursor-pointer"
                                            >
                                                <div>
                                                    <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Settings</div>
                                                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Users, sources &amp; backups</div>
                                                </div>
                                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openSubmenu === 'settings' ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                            </button>
                                            {openSubmenu === 'settings' && (
                                                <div className="ml-3 pl-2.5 border-l space-y-0.5 pb-1" style={{ borderColor: 'var(--border-subtle)' }}>
                                                    <Link href="/settings/users" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Users</Link>
                                                    <Link href="/settings/lead-sources" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Lead Sources</Link>
                                                    <Link href="/settings/db-backups" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>DB Backups</Link>
                                                    <Link href="/settings/admin" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Admin Setting</Link>
                                                    <Link href="/settings/bill-to" onClick={() => setOpenMenu(null)} className="block rounded-md px-2 py-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>Bill To</Link>
                                                </div>
                                            )}
                                        </div>

                                        <Link href="/kanban" onClick={() => setOpenMenu(null)} className="flex items-center justify-between rounded-lg px-2.5 py-2 qall-row-hover">
                                            <div>
                                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Kanban Board</div>
                                                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Visual pipeline &amp; tasks</div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                </div>

                {/* Right: Search + Theme Studio + Profile */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={onOpenSearch}
                        className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors cursor-pointer"
                        style={{
                            backgroundColor: 'var(--bg-surface-alt)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-muted)',
                        }}
                    >
                        <Search className="h-3.5 w-3.5" />
                        <span className="hidden md:inline">Search leads, advisors...</span>
                        <kbd
                            className="hidden md:inline rounded border px-1.5 py-0.5 text-[10px] font-semibold"
                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                        >
                            Ctrl+K
                        </kbd>
                    </button>

                    <ThemeStudioPopover
                        theme={theme}
                        setTheme={setTheme}
                        navMode={navMode}
                        setNavMode={setNavMode}
                    />

                    <button
                        type="button"
                        onClick={() => setNotificationsOpen(true)}
                        className="relative flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer"
                        style={{
                            backgroundColor: 'var(--bg-surface-alt)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-secondary)',
                        }}
                        title="User Notifications"
                    >
                        <Bell className="h-4 w-4" />
                    </button>
                    <NotificationsModal open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />

                    <div ref={userMenuRef} className="relative pl-1.5 sm:pl-2 border-l" style={{ borderColor: 'var(--border-subtle)' }}>
                        <button
                            type="button"
                            onClick={() => setUserMenuOpen((prev) => !prev)}
                            className="flex items-center gap-2 rounded-lg px-1 sm:px-1.5 py-1 hover:bg-black/5 cursor-pointer transition-colors"
                        >
                            <div className="hidden sm:block text-right leading-tight">
                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Angelo Villanueva</div>
                                <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Master Admin</div>
                            </div>
                            <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-inter-black text-xs text-white"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                AV
                            </div>
                        </button>

                        {userMenuOpen && (
                            <div
                                className="animate-popover absolute right-0 mt-2 w-48 rounded-xl border shadow-xl py-1.5 z-50 text-xs"
                                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        setProfileTab('About');
                                        setProfileModalOpen(true);
                                    }}
                                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left hover:bg-black/5 cursor-pointer"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    <User className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                    <span>My Profile</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        router.visit('/settings/admin');
                                    }}
                                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left hover:bg-black/5 cursor-pointer"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    <Settings className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                    <span>Settings</span>
                                </button>
                                <div className="my-1 border-t" style={{ borderColor: 'var(--border-subtle)' }} />
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen(false)}
                                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left hover:bg-black/5 cursor-pointer"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {profileModalOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[3px] p-4" onClick={() => setProfileModalOpen(false)}>
                    <div className="animate-popover w-full max-w-4xl rounded-xl border shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>User Profile</h3>
                            <button type="button" onClick={() => setProfileModalOpen(false)} className="rounded-lg p-1 hover:bg-black/10 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                            <div className="md:col-span-4 rounded-xl border p-5 flex flex-col items-center text-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div
                                    className="flex h-16 w-16 items-center justify-center rounded-full font-inter-black text-lg text-white"
                                    style={{ backgroundColor: 'var(--accent)' }}
                                >
                                    AV
                                </div>
                                <div className="mt-3 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Angelo Villanueva</div>
                                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{profileForm.jobTitle}</div>
                            </div>

                            <div className="md:col-span-8 rounded-xl border p-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-center gap-4 border-b pb-2.5 mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
                                    {['About', 'Bank Details'].map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setProfileTab(tab)}
                                            className="text-xs font-bold pb-1 border-b-2 transition-colors cursor-pointer"
                                            style={{
                                                borderColor: profileTab === tab ? 'var(--accent)' : 'transparent',
                                                color: profileTab === tab ? 'var(--accent)' : 'var(--text-muted)',
                                            }}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setProfileModalOpen(false);
                                    }}
                                    className="space-y-3"
                                >
                                    {profileTab === 'About' ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Job Title</label>
                                                <input type="text" value={profileForm.jobTitle} onChange={(e) => setProfileForm({ ...profileForm, jobTitle: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Department</label>
                                                <input type="text" value={profileForm.department} onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Ext. Number</label>
                                                <input type="text" value={profileForm.extNumber} onChange={(e) => setProfileForm({ ...profileForm, extNumber: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Work Email</label>
                                                <input type="email" value={profileForm.workEmail} onChange={(e) => setProfileForm({ ...profileForm, workEmail: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Start Date</label>
                                                <input type="date" value={profileForm.startDate} onChange={(e) => setProfileForm({ ...profileForm, startDate: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Profile Image</label>
                                                <input type="file" accept="image/*" onChange={(e) => setProfileForm({ ...profileForm, profileImage: e.target.files?.[0]?.name || '' })} className="w-full rounded-lg border px-2.5 py-1.5 text-xs outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-400 file:px-2 file:py-1 file:text-[11px] file:font-bold file:text-slate-900" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Bank Name</label>
                                                <input type="text" value={profileForm.bankName} onChange={(e) => setProfileForm({ ...profileForm, bankName: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Account Name</label>
                                                <input type="text" value={profileForm.accountName} onChange={(e) => setProfileForm({ ...profileForm, accountName: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Sort Code</label>
                                                <input type="text" value={profileForm.sortCode} onChange={(e) => setProfileForm({ ...profileForm, sortCode: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Account Number</label>
                                                <input type="text" value={profileForm.accountNumber} onChange={(e) => setProfileForm({ ...profileForm, accountNumber: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Agent Commission %</label>
                                                <input type="number" value={profileForm.agentCommission} onChange={(e) => setProfileForm({ ...profileForm, agentCommission: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-end gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <button type="button" onClick={() => setProfileModalOpen(false)} className="rounded-xl border px-5 py-2.5 text-xs font-bold cursor-pointer transition-colors" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                                            Back
                                        </button>
                                        <button type="submit" className="rounded-xl px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
                                            {profileTab === 'About' ? 'Submit' : 'Save Bank Details'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
}
