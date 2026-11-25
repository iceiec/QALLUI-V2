import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head } from '@inertiajs/react';
import { Search, Plus, Users as UsersIcon, CheckCircle2, XCircle, Clock, Edit3, User, X, UserPlus, Mail, Lock, Shield, AtSign } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import UserAvatar from '@/components/UserAvatar';
import CustomSelect from '@/components/CustomSelect';

const USERS_LIST = [
    { name: 'angelo villanueva', username: 'angelo_admin', email: 'angelo@qallhub.com', role: 'ADMIN', status: 'ACTIVE', login: '18-11-2026 09:28', logout: '18-11-2026 12:33', hours: '1h 34m' },
    { name: 'Lyana Mandera', username: 'lianamandera', email: 'lianamandera@qallhub.com', role: 'JUNIOR', status: 'ACTIVE', login: '04-11-2026 21:29', logout: '04-11-2026 21:29', hours: '0m' },
    { name: 'Cabrito Aljin', username: 'aljincabrito', email: 'aljincabrito@qallhub.com', role: 'JUNIOR', status: 'ACTIVE', login: '03-11-2026 09:04', logout: '03-11-2026 09:05', hours: '0m' },
    { name: 'Rosalia Pabalate', username: 'rosaliapabalate', email: 'rosaliapabalate@qallhub.com', role: 'JUNIOR', status: 'ACTIVE', login: '05-11-2026 09:09', logout: '04-11-2026 17:48', hours: '0m' },
    { name: 'Adelfa Cabidog', username: 'adelfacabidog', email: 'adelfa@qallhub.com', role: 'JUNIOR', status: 'ACTIVE', login: '05-11-2026 09:04', logout: '05-11-2026 12:56', hours: '0m' },
    { name: 'Vanessa Timbal', username: 'vanessatimbal', email: 'vanessatimbal@qallhub.com', role: 'JUNIOR', status: 'ACTIVE', login: '05-11-2026 10:01', logout: '05-11-2026 12:59', hours: '0m' },
];

export default function Users() {
    const [users, setUsers] = useState(USERS_LIST);
    const [range, setRange] = useState('Day');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [roleFilter, setRoleFilter] = useState('All Roles');

    const [addUserOpen, setAddUserOpen] = useState(false);
    const [newUserForm, setNewUserForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
    });

    const [editUser, setEditUser] = useState(null);
    const [editForm, setEditForm] = useState({
        username: '',
        lastName: '',
        firstName: '',
        email: '',
        role: 'admin',
        password: '',
        isAdvisor: false,
    });

    const [profileUser, setProfileUser] = useState(null);
    const [profileTab, setProfileTab] = useState('About');
    const [profileForm, setProfileForm] = useState({
        jobTitle: '',
        department: '',
        extNumber: '',
        workEmail: '',
        startDate: '',
        profileImage: '',
        bankName: '',
        accountName: '',
        sortCode: '',
        accountNumber: '',
    });

    const controlStyle = {
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
    };

    const filtered = users.filter((u) => {
        const matchesSearch =
            !search ||
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All Statuses' || u.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesRole = roleFilter === 'All Roles' || u.role.toLowerCase() === roleFilter.toLowerCase();
        return matchesSearch && matchesStatus && matchesRole;
    });

    const openEditModal = (u) => {
        const parts = u.name.trim().split(/\s+/);
        const firstName = parts[0] || '';
        const lastName = parts.slice(1).join(' ') || '';
        setEditUser(u);
        setEditForm({
            username: u.username,
            lastName,
            firstName,
            email: u.email,
            role: u.role.toLowerCase(),
            password: '',
            isAdvisor: u.role === 'ADVISOR' || Boolean(u.isAdvisor),
        });
    };

    const openProfileModal = (u) => {
        setProfileUser(u);
        setProfileTab('About');
        setProfileForm({
            jobTitle: u.jobTitle || (u.role === 'ADMIN' ? 'System Administrator' : 'Junior Adviser'),
            department: u.department || 'Operations',
            extNumber: u.extNumber || '104',
            workEmail: u.email,
            startDate: u.startDate || '2025-03-01',
            profileImage: '',
            bankName: u.bankName || '',
            accountName: u.accountName || u.name,
            sortCode: u.sortCode || '',
            accountNumber: u.accountNumber || '',
        });
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUserForm.username.trim() && !newUserForm.firstName.trim()) return;
        const fullName = `${newUserForm.firstName} ${newUserForm.lastName}`.trim() || newUserForm.username;
        setUsers((prev) => [
            {
                name: fullName,
                username: newUserForm.username || fullName.toLowerCase().replace(/\s+/g, '_'),
                email: newUserForm.email || `${fullName.toLowerCase().replace(/\s+/g, '')}@qallhub.com`,
                role: (newUserForm.role || 'JUNIOR').toUpperCase(),
                status: 'ACTIVE',
                login: 'Just now',
                logout: 'â€”',
                hours: '0m',
            },
            ...prev,
        ]);
        setNewUserForm({ username: '', firstName: '', lastName: '', email: '', role: '', password: '', confirmPassword: '' });
        setAddUserOpen(false);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (!editUser) return;
        const fullName = `${editForm.firstName} ${editForm.lastName}`.trim() || editUser.name;
        setUsers((prev) =>
            prev.map((u) =>
                u.username === editUser.username
                    ? {
                          ...u,
                          name: fullName,
                          username: editForm.username || u.username,
                          email: editForm.email || u.email,
                          role: editForm.role.toUpperCase(),
                          isAdvisor: editForm.isAdvisor,
                      }
                    : u
            )
        );
        setEditUser(null);
    };

    const handleToggleDeactivate = () => {
        if (!editUser) return;
        setUsers((prev) =>
            prev.map((u) =>
                u.username === editUser.username
                    ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
                    : u
            )
        );
        setEditUser(null);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!profileUser) return;
        setUsers((prev) =>
            prev.map((u) =>
                u.username === profileUser.username
                    ? { ...u, ...profileForm, email: profileForm.workEmail || u.email }
                    : u
            )
        );
        setProfileUser(null);
    };

    return (
        <AppLayout>
            <Head title="All Users" />
            <div className="space-y-4">
                <h1 className="font-inter-black text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    All Users
                </h1>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Card padding="p-4"><div className="flex items-center gap-3"><div className="rounded-lg p-2.5 bg-sky-500/15 text-sky-500"><UsersIcon className="h-4 w-4" /></div><div><div className="font-inter-black text-xl">145</div><div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Team Members</div></div></div></Card>
                    <Card padding="p-4"><div className="flex items-center gap-3"><div className="rounded-lg p-2.5 bg-emerald-500/15 text-emerald-500"><CheckCircle2 className="h-4 w-4" /></div><div><div className="font-inter-black text-xl">36</div><div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Active</div></div></div></Card>
                    <Card padding="p-4"><div className="flex items-center gap-3"><div className="rounded-lg p-2.5 bg-rose-500/15 text-rose-500"><XCircle className="h-4 w-4" /></div><div><div className="font-inter-black text-xl">109</div><div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Inactive</div></div></div></Card>
                    <Card padding="p-4"><div className="flex items-center gap-3"><div className="rounded-lg p-2.5 bg-amber-500/15 text-amber-500"><Clock className="h-4 w-4" /></div><div><div className="font-inter-black text-xl">1h 34m</div><div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Team Login Time</div></div></div></Card>
                </div>

                <Card padding="p-3 sm:p-4" hoverable={false}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex rounded-lg border p-0.5" style={controlStyle}>
                                {['Day', 'Week', 'Month'].map((r) => (
                                    <button key={r} type="button" onClick={() => setRange(r)} className="rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer" style={{ backgroundColor: range === r ? 'var(--accent)' : 'transparent', color: range === r ? '#fff' : 'var(--text-secondary)' }}>{r}</button>
                                ))}
                            </div>
                            <CustomSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={['All Statuses', 'Active', 'Inactive']} className="w-32" style={controlStyle} />
                            <CustomSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} options={['All Roles', 'ADMIN', 'ADVISOR', 'JUNIOR']} className="w-28" style={controlStyle} />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative w-full sm:w-52">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full rounded-lg border pl-8 pr-3 py-1.5 text-xs outline-none" style={controlStyle} />
                            </div>
                            <button type="button" onClick={() => setAddUserOpen(true)} className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                                <Plus className="h-3.5 w-3.5" /> Add User
                            </button>
                        </div>
                    </div>
                </Card>

                <Card padding="p-0 overflow-hidden" hoverable={false}>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                    <th className="px-4 py-3 font-bold uppercase">Name / Username</th>
                                    <th className="px-4 py-3 font-bold uppercase">Email</th>
                                    <th className="px-4 py-3 font-bold uppercase text-center">Role</th>
                                    <th className="px-4 py-3 font-bold uppercase text-center">Status</th>
                                    <th className="px-4 py-3 font-bold uppercase">Last Login</th>
                                    <th className="px-4 py-3 font-bold uppercase">Last Logout</th>
                                    <th className="px-4 py-3 font-bold uppercase text-right">Hours Logged In</th>
                                    <th className="px-4 py-3 font-bold uppercase text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((u) => (
                                    <tr key={u.username} className="qall-row-hover border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <td className="px-4 py-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <UserAvatar name={u.name} size="md" />
                                                <div>
                                                    <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{u.name}</div>
                                                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{u.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                                        <td className="px-4 py-2.5 text-center"><Badge tone={u.role === 'ADMIN' ? 'sky' : 'amber'}>{u.role}</Badge></td>
                                        <td className="px-4 py-2.5 text-center"><Badge tone={u.status === 'ACTIVE' ? 'emerald' : 'rose'}>{u.status}</Badge></td>
                                        <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{u.login}</td>
                                        <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--text-muted)' }}>{u.logout}</td>
                                        <td className="px-4 py-2.5 text-right tabular-nums">{u.hours}</td>
                                        <td className="px-4 py-2.5 text-center whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5">
                                                <button type="button" onClick={() => openEditModal(u)} className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-1 text-[11px] font-bold text-amber-500 hover:bg-amber-500/25 cursor-pointer"><Edit3 className="h-3 w-3" /> Edit</button>
                                                <button type="button" onClick={() => openProfileModal(u)} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}><User className="h-3 w-3" /> Profile</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                        {filtered.map((u) => (
                            <div key={u.username} className="rounded-2xl border p-4 space-y-3 shadow-sm" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <UserAvatar name={u.name} size="md" />
                                        <div className="min-w-0">
                                            <div className="font-inter-black text-sm truncate" style={{ color: 'var(--text-primary)' }}>{u.name}</div>
                                            <div className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>{u.username} â€¢ {u.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <Badge tone={u.role === 'ADMIN' ? 'sky' : 'amber'}>{u.role}</Badge>
                                        <Badge tone={u.status === 'ACTIVE' ? 'emerald' : 'rose'}>{u.status}</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: 'var(--bg-card)' }}>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Last Login</div>
                                        <div className="text-[11px] tabular-nums mt-0.5" style={{ color: 'var(--text-secondary)' }}>{u.login}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Last Logout</div>
                                        <div className="text-[11px] tabular-nums mt-0.5" style={{ color: 'var(--text-secondary)' }}>{u.logout}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Hours Logged In</div>
                                        <div className="text-xs font-inter-black tabular-nums mt-0.5" style={{ color: 'var(--accent-text)' }}>{u.hours}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-1.5 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                    <button type="button" onClick={() => openEditModal(u)} className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-500 cursor-pointer"><Edit3 className="h-3 w-3" /> Edit</button>
                                    <button type="button" onClick={() => openProfileModal(u)} className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-semibold cursor-pointer" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}><User className="h-3 w-3" /> Profile</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {addUserOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[3px] p-4" onClick={() => setAddUserOpen(false)}>
                    <div className="animate-popover w-full max-w-2xl rounded-xl border shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent)' }}>
                                    <UserPlus className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>New User</h3>
                                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Create a new team member account</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => setAddUserOpen(false)} className="rounded-lg p-1 hover:bg-black/10 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <form onSubmit={handleAddUser} className="p-5 space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                        <input type="text" placeholder="e.g. John" value={newUserForm.firstName} onChange={(e) => setNewUserForm({ ...newUserForm, firstName: e.target.value })} className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs outline-none" style={controlStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Last Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                        <input type="text" placeholder="e.g. Doe" value={newUserForm.lastName} onChange={(e) => setNewUserForm({ ...newUserForm, lastName: e.target.value })} className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs outline-none" style={controlStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Username</label>
                                    <div className="relative">
                                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                        <input type="text" placeholder="e.g. johndoe" value={newUserForm.username} onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })} className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs outline-none" style={controlStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                        <input type="email" placeholder="john@qallhub.com" value={newUserForm.email} onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })} className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs outline-none" style={controlStyle} />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Role</label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                        <CustomSelect value={newUserForm.role} onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })} style={controlStyle} options={[{"label":"Select Role","value":""},{"label":"ADMIN","value":"ADMIN"},{"label":"JUNIOR","value":"JUNIOR"},{"label":"ADVISOR","value":"ADVISOR"}]} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                        <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" value={newUserForm.password} onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })} className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs outline-none" style={controlStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Re-Enter Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                                        <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" value={newUserForm.confirmPassword} onChange={(e) => setNewUserForm({ ...newUserForm, confirmPassword: e.target.value })} className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs outline-none" style={controlStyle} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                <button type="button" onClick={() => setAddUserOpen(false)} className="rounded-xl border px-5 py-2.5 text-xs font-bold cursor-pointer transition-colors" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                                    Cancel
                                </button>
                                <button type="submit" className="rounded-xl px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {editUser && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[3px] p-4" onClick={() => setEditUser(null)}>
                    <div className="animate-popover w-full max-w-2xl rounded-xl border shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Edit User</h3>
                            <button type="button" onClick={() => setEditUser(null)} className="rounded-lg p-1 hover:bg-black/10 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>User Name</label>
                                    <input type="text" value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Last Name</label>
                                    <input type="text" value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>First Name</label>
                                    <input type="text" value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
                                    <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Role</label>
                                    <CustomSelect value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} style={controlStyle} options={["admin","junior","advisor"]} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Password</label>
                                    <input type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Is Advisor</label>
                                    <label className="inline-flex items-center gap-2 pt-1.5 cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                                        <input type="checkbox" checked={editForm.isAdvisor} onChange={(e) => setEditForm({ ...editForm, isAdvisor: e.target.checked })} className="h-4 w-4 rounded accent-sky-600 cursor-pointer" />
                                        <span>Advisor</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                <button type="button" onClick={handleToggleDeactivate} className="rounded-xl bg-rose-500 hover:bg-rose-600 px-4 py-2.5 text-xs font-bold text-white cursor-pointer transition-colors">
                                    {editUser.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                                </button>
                                <div className="flex items-center gap-2.5">
                                    <button type="button" onClick={() => setEditUser(null)} className="rounded-xl border px-5 py-2.5 text-xs font-bold cursor-pointer transition-colors" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="rounded-xl px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {profileUser && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[3px] p-4" onClick={() => setProfileUser(null)}>
                    <div className="animate-popover w-full max-w-4xl rounded-xl border shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>User Profile</h3>
                            <button type="button" onClick={() => setProfileUser(null)} className="rounded-lg p-1 hover:bg-black/10 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                            <div className="md:col-span-4 rounded-xl border p-5 flex flex-col items-center text-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <UserAvatar name={profileUser.name} size="lg" />
                                <div className="mt-3 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{profileUser.name}</div>
                                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{profileForm.jobTitle}</div>
                                <div className="mt-3">
                                    <Badge tone={profileUser.status === 'ACTIVE' ? 'emerald' : 'rose'}>{profileUser.status}</Badge>
                                </div>
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

                                <form onSubmit={handleSaveProfile} className="space-y-3">
                                    {profileTab === 'About' ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Job Title</label>
                                                <input type="text" value={profileForm.jobTitle} onChange={(e) => setProfileForm({ ...profileForm, jobTitle: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Department</label>
                                                <input type="text" value={profileForm.department} onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Ext. Number</label>
                                                <input type="text" value={profileForm.extNumber} onChange={(e) => setProfileForm({ ...profileForm, extNumber: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Work Email</label>
                                                <input type="email" value={profileForm.workEmail} onChange={(e) => setProfileForm({ ...profileForm, workEmail: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Start Date</label>
                                                <input type="date" value={profileForm.startDate} onChange={(e) => setProfileForm({ ...profileForm, startDate: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Profile Image</label>
                                                <input type="file" accept="image/*" onChange={(e) => setProfileForm({ ...profileForm, profileImage: e.target.files?.[0]?.name || '' })} className="w-full rounded-lg border px-2.5 py-1.5 text-xs outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-400 file:px-2 file:py-1 file:text-[11px] file:font-bold file:text-slate-900" style={controlStyle} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Bank Name</label>
                                                <input type="text" value={profileForm.bankName} onChange={(e) => setProfileForm({ ...profileForm, bankName: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Account Name</label>
                                                <input type="text" value={profileForm.accountName} onChange={(e) => setProfileForm({ ...profileForm, accountName: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Sort Code</label>
                                                <input type="text" value={profileForm.sortCode} onChange={(e) => setProfileForm({ ...profileForm, sortCode: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Account Number</label>
                                                <input type="text" value={profileForm.accountNumber} onChange={(e) => setProfileForm({ ...profileForm, accountNumber: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-xs outline-none" style={controlStyle} />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-end gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <button type="button" onClick={() => setProfileUser(null)} className="rounded-xl border px-5 py-2.5 text-xs font-bold cursor-pointer transition-colors" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                                            Back
                                        </button>
                                        <button type="submit" className="rounded-xl px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </AppLayout>
    );
}
