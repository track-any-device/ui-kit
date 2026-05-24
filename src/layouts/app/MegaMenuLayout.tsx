'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import type { NavItem } from '../../types/navigation';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { ChevronDown, Menu, X } from 'lucide-react';

/**
 * MegaMenuLayout (demo7)
 * Fixed header with integrated horizontal mega menu. No sidebar.
 */
interface MegaMenuLayoutProps extends BaseAppLayoutProps {
    showToolbar?: boolean;
}

export function MegaMenuLayout({
    children, navItems = [], currentUrl = '',
    logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true,
}: MegaMenuLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    function isActive(url: string) { return !!url && url !== '#' && currentUrl.startsWith(url); }
    function hasActiveChild(items: NavItem[]): boolean { return items.some((i) => isActive(i.href ?? '') || (i.items ? hasActiveChild(i.items) : false)); }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm shrink-0 relative">
                <div className="flex items-center h-[70px] px-4">
                    <div className="container mx-auto flex items-center gap-6">
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
                                                <button className={cn('flex items-center gap-1.5 px-3 py-3.5 text-sm text-nowrap border-b-2 transition-colors hover:text-mono bg-transparent', active ? 'text-mono border-mono' : 'text-secondary-foreground border-transparent')}>
                                                    {item.title} <ChevronDown className="size-3.5" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="min-w-[200px]">
                                                {item.items.map((child, ci) => (
                                                    <DropdownMenuItem key={ci} asChild>
                                                        <a href={child.href} className={cn(isActive(child.href ?? '') && 'bg-accent')}>{child.title}</a>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    );
                                }
                                return (
                                    <a key={i} href={item.href} className={cn('flex items-center px-3 py-3.5 text-sm text-nowrap border-b-2 transition-colors hover:text-mono', active ? 'text-mono border-mono' : 'text-secondary-foreground border-transparent')}>
                                        {item.title}
                                    </a>
                                );
                            })}
                        </nav>

                        {/* Mobile hamburger */}
                        <button
                            className="lg:hidden flex items-center justify-center size-9 rounded-md hover:bg-accent transition-colors ml-auto mr-2"
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                        </button>

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
