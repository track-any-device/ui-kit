'use client';

import type { BaseAppLayoutProps } from './layout-types';
import type { NavItem } from '../../types/navigation';
import { Navbar } from './partials/Navbar';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';
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
    function isActive(url: string) { return !!url && url !== '#' && currentUrl.startsWith(url); }
    function hasActiveChild(items: NavItem[]): boolean { return items.some((i) => isActive(i.href ?? '') || (i.items ? hasActiveChild(i.items) : false)); }

    // Split navItems: top-level as mega menu triggers, sub-items go in dropdown
    const megaItems = navItems;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header with mega menu */}
            <header className="sticky top-0 z-20 flex items-center h-[70px] border-b border-border bg-background/95 backdrop-blur-sm px-4 shrink-0">
                <div className="container mx-auto flex items-center gap-4">
                    {logo && <a href={logoHref} className="shrink-0">{logo}</a>}
                    {appName && <span className="text-sm font-medium hidden md:inline">{appName}</span>}

                    {/* Mega menu */}
                    <nav className="flex items-stretch flex-1 overflow-x-auto">
                        {megaItems.map((item, i) => {
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

                    {onSearchOpen && (
                        <Button variant="ghost" size="sm" className="size-9 p-0 rounded-full" onClick={onSearchOpen}>
                            <Search className="size-4" />
                        </Button>
                    )}
                    <HeaderTopbar user={user} unreadCount={unreadCount} settingsUrl={settingsUrl} logoutUrl={logoutUrl} onLogout={onLogout} />
                </div>
            </header>

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
