'use client';

import { useState } from 'react';
import type { BaseAppLayoutProps } from './layout-types';
import type { NavItem } from '../../types/navigation';
import { Navbar } from './partials/Navbar';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../controls/Button';

/**
 * MegaMenuNavbarLayout (demo9)
 * Header with logo, search, and mega-menu dropdown nav + horizontal navbar below.
 */
interface MegaMenuNavbarLayoutProps extends BaseAppLayoutProps {
    showToolbar?: boolean;
    onSearchOpen?: () => void;
}

export function MegaMenuNavbarLayout({
    children, navItems = [], currentUrl = '',
    logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true, onSearchOpen,
}: MegaMenuNavbarLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    function isActive(url: string) { return !!url && url !== '#' && currentUrl.startsWith(url); }
    function hasActiveChild(items: NavItem[]): boolean { return items.some((i) => isActive(i.href ?? '') || (i.items ? hasActiveChild(i.items) : false)); }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header with mega menu */}
            <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm shrink-0 relative">
                <div className="flex items-center h-[70px] px-4">
                    <div className="container mx-auto flex items-center gap-4">
                        {logo && <a href={logoHref} className="shrink-0">{logo}</a>}
                        {appName && <span className="text-sm font-medium hidden md:inline">{appName}</span>}

                        {/* Desktop mega menu */}
                        <nav className="hidden lg:flex items-stretch flex-1 overflow-x-auto">
                            {navItems.map((item, i) => {
                                const active = isActive(item.href ?? '') || (item.items ? hasActiveChild(item.items) : false);
                                if (item.items && item.items.length > 0) {
                                    return (
                                        <DropdownMenu key={i}>
                                            <DropdownMenuTrigger asChild>
                                                <button className={cn('flex items-center gap-1 px-3 py-3.5 text-sm border-b-2 transition-colors hover:text-mono bg-transparent text-nowrap', active ? 'text-mono border-mono' : 'text-secondary-foreground border-transparent')}>
                                                    {item.title} <ChevronDown className="size-3" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="min-w-[180px]">
                                                {item.items.map((c, ci) => <DropdownMenuItem key={ci} asChild><a href={c.href}>{c.title}</a></DropdownMenuItem>)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    );
                                }
                                return (
                                    <a key={i} href={item.href} className={cn('flex items-center px-3 py-3.5 text-sm border-b-2 transition-colors hover:text-mono text-nowrap', active ? 'text-mono border-mono' : 'text-secondary-foreground border-transparent')}>
                                        {item.title}
                                    </a>
                                );
                            })}
                        </nav>

                        {/* Mobile hamburger */}
                        <button
                            className="lg:hidden flex items-center justify-center size-9 rounded-md hover:bg-accent transition-colors ml-auto mr-1"
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                        </button>

                        {onSearchOpen && (
                            <Button variant="ghost" size="sm" className="size-9 p-0 rounded-full hidden lg:flex" onClick={onSearchOpen}>
                                <Search className="size-4" />
                            </Button>
                        )}
                        <HeaderTopbar user={user} unreadCount={unreadCount} settingsUrl={settingsUrl} logoutUrl={logoutUrl} onLogout={onLogout} />
                    </div>
                </div>

                {/* Mobile menu dropdown — absolute so it overlays content without shifting layout */}
                {mobileOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 z-50 border-b border-border bg-background shadow-md pb-2">
                        {navItems.map((item, i) =>
                            item.items && item.items.length > 0 ? (
                                <div key={i}>
                                    <div className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{item.title}</div>
                                    {item.items.map((child, ci) => (
                                        <a key={ci} href={child.href} className={cn('block px-6 py-2 text-sm hover:bg-accent transition-colors', isActive(child.href ?? '') && 'text-primary font-medium')} onClick={() => setMobileOpen(false)}>
                                            {child.title}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <a key={i} href={item.href} className={cn('block px-4 py-2.5 text-sm hover:bg-accent transition-colors', isActive(item.href ?? '') && 'text-primary font-medium')} onClick={() => setMobileOpen(false)}>
                                    {item.title}
                                </a>
                            ),
                        )}
                    </div>
                )}
            </header>

            {/* Secondary navbar (desktop only — already hidden on mobile via Navbar itself) */}
            <Navbar navItems={navItems} currentUrl={currentUrl} className="hidden lg:block" />

            <main className="flex-1" role="content">
                {showToolbar && (title || breadcrumbs.length > 0 || toolbarActions) && (
                    <Toolbar title={title} breadcrumbs={breadcrumbs} actions={toolbarActions} currentUrl={currentUrl} />
                )}
                {children}
            </main>
            <Footer links={footerLinks} copyright={copyright} />
        </div>
    );
}
