import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import TopNav from './Partials/TopNav';
import SidebarNav from './Partials/SidebarNav';
import GlobalSearchModal from './Partials/GlobalSearchModal';

export default function AppLayout({ children }) {
    const { url } = usePage();
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('qall_theme') || 'qall';
        }
        return 'qall';
    });

    const [navMode, setNavMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('qall_nav_mode') || 'topbar';
        }
        return 'topbar';
    });

    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('qall_theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('qall_nav_mode', navMode);
    }, [navMode]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setSearchOpen((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--text-primary)' }}>
            <TopNav
                theme={theme}
                setTheme={setTheme}
                navMode={navMode}
                setNavMode={setNavMode}
                sidebarVisible={sidebarVisible}
                onToggleSidebar={() => setSidebarVisible((v) => !v)}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenMobileMenu={() => setMobileMenuOpen(true)}
            />

            <div className="flex flex-1">
                <SidebarNav
                    mobileOpen={mobileMenuOpen}
                    onCloseMobile={() => setMobileMenuOpen(false)}
                    desktopVisible={navMode === 'sidebar' && sidebarVisible}
                />

                <main className="flex-1 min-w-0">
                    <div key={url} className="animate-page-enter mx-auto max-w-[1440px] px-3 py-4 sm:px-6 sm:py-6">
                        {children}
                    </div>
                </main>
            </div>

            <GlobalSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>
    );
}
