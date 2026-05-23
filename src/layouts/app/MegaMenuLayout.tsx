'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import type { NavItem } from '../../types/navigation';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

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
    function isActive(url: string) { return !!url && url !== '#' && currentUrl.startsWith(url); }
    function hasActiveChild(items: NavItem[]): boolean { return items.some((i) => isActive(i.href ?? '') || (i.items ? hasActiveChild(i.items) : false)); }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-20 flex items-center h-[70px] border-b border-border bg-background/95 backdrop-blur-sm px-4 shrink-0">
                <div className="container mx-auto flex items-center gap-6">
                    {logo && <a href={logoHref} className="shrink-0">{logo}</a>}
                    {appName && <span className="text-sm font-medium hidden md:inline">{appName}</span>}

                    {/* Mega menu inline */}
                    <nav className="flex items-stretch flex-1 overflow-x-auto">
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
