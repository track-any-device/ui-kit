'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { Navbar } from './partials/Navbar';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';

const HEADER_HEIGHT = 70;

interface TopNavLayoutProps extends BaseAppLayoutProps {
    headerRightSlot?: ReactNode;
    navRightSlot?: ReactNode;
    showToolbar?: boolean;
}

export function TopNavLayout({
    children,
    navItems = [],
    currentUrl = '',
    logo,
    logoHref = '/',
    appName,
    user,
    title,
    breadcrumbs = [],
    toolbarActions,
    stickyHeader = true,
    stickyOffset = HEADER_HEIGHT,
    onLogout,
    settingsUrl,
    logoutUrl,
    unreadCount = 0,
    footerLinks = [],
    copyright,
    headerRightSlot,
    navRightSlot,
    showToolbar = true,
}: TopNavLayoutProps) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        if (!stickyHeader) return;
        const handleScroll = () => setIsSticky(window.scrollY > stickyOffset);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [stickyHeader, stickyOffset]);

    return (
        <div className="flex grow flex-col min-h-screen">
            {/* Header */}
            <header
                className={cn(
                    'flex items-center shrink-0 h-[70px] border-b border-border bg-background transition-shadow',
                    stickyHeader && isSticky && 'fixed z-10 top-0 inset-x-0 shadow-sm backdrop-blur-md bg-background/90',
                )}
            >
                <div className="container mx-auto px-4 flex justify-between items-center gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-3 shrink-0">
                        {logo && <a href={logoHref} className="shrink-0">{logo}</a>}
                        {appName && <span className="text-sm font-medium text-foreground hidden md:inline">{appName}</span>}
                    </div>
                    {/* Right topbar */}
                    <HeaderTopbar
                        user={user}
                        unreadCount={unreadCount}
                        settingsUrl={settingsUrl}
                        logoutUrl={logoutUrl}
                        onLogout={onLogout}
                        extraSlot={headerRightSlot}
                    />
                </div>
            </header>

            {/* Spacer when header is sticky */}
            {stickyHeader && isSticky && <div style={{ height: `${HEADER_HEIGHT}px` }} aria-hidden="true" />}

            {/* Horizontal navbar */}
            <Navbar navItems={navItems} currentUrl={currentUrl} rightSlot={navRightSlot} />

            {/* Content */}
            <main className="grow" role="content">
                {showToolbar && (title || breadcrumbs.length > 0 || toolbarActions) && (
                    <Toolbar
                        title={title}
                        breadcrumbs={breadcrumbs}
                        actions={toolbarActions}
                        currentUrl={currentUrl}
                    />
                )}
                {children}
            </main>

            <Footer links={footerLinks} copyright={copyright} />
        </div>
    );
}
