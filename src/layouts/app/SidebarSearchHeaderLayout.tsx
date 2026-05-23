'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem, AccordionMenuSub, AccordionMenuSubContent, AccordionMenuSubTrigger } from '../../components/ui/accordion-menu';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Search } from 'lucide-react';
import { Input } from './../../controls/Input';
import { useState } from 'react';

/**
 * SidebarSearchHeaderLayout (layout-11)
 * Sidebar with inline search + header with horizontal menu.
 */
interface SidebarSearchHeaderLayoutProps extends BaseAppLayoutProps {
    headerMenuItems?: Array<{ label: string; href: string }>;
    showToolbar?: boolean;
    sidebarSearchPlaceholder?: string;
    headerActions?: ReactNode;
}

export function SidebarSearchHeaderLayout({
    children, navItems = [], currentUrl = '',
    logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true,
    headerMenuItems = [], sidebarSearchPlaceholder = 'Search…', headerActions,
}: SidebarSearchHeaderLayoutProps) {
    const [query, setQuery] = useState('');
    const filtered = query
        ? navItems.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()))
        : navItems;

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 shrink-0 flex flex-col border-e border-sidebar-border bg-sidebar">
                <div className="flex items-center gap-2 px-4 h-[70px] border-b border-sidebar-border shrink-0">
                    {logo && <a href={logoHref}>{logo}</a>}
                    {appName && <span className="text-sm font-semibold text-sidebar-foreground">{appName}</span>}
                </div>
                <div className="px-3 py-2 border-b border-sidebar-border">
                    <div className="relative">
                        <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={sidebarSearchPlaceholder}
                            className="ps-8 h-8 text-sm"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
                <ScrollArea className="flex-1 py-2 px-2">
                    <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                        <AccordionMenuGroup>
                            {filtered.map((item, i) => (
                                item.items ? (
                                    <AccordionMenuSub key={i} value={item.title}>
                                        <AccordionMenuSubTrigger>{item.title}</AccordionMenuSubTrigger>
                                        <AccordionMenuSubContent type="single" collapsible parentValue={item.title}>
                                            {item.items.map((c, ci) => <AccordionMenuItem key={ci} value={c.href ?? c.title} asChild><a href={c.href}>{c.title}</a></AccordionMenuItem>)}
                                        </AccordionMenuSubContent>
                                    </AccordionMenuSub>
                                ) : (
                                    <AccordionMenuItem key={i} value={item.href ?? item.title} asChild><a href={item.href}>{item.title}</a></AccordionMenuItem>
                                )
                            ))}
                        </AccordionMenuGroup>
                    </AccordionMenu>
                </ScrollArea>
            </aside>

            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center h-[70px] border-b border-border bg-background px-4 shrink-0 gap-4">
                    {headerMenuItems.length > 0 && (
                        <nav className="flex items-center gap-1 flex-1">
                            {headerMenuItems.map((item, i) => (
                                <a key={i} href={item.href} className={cn('px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent', currentUrl.startsWith(item.href) && 'bg-accent text-accent-foreground')}>
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    )}
                    <div className="flex-1" />
                    {headerActions}
                    <HeaderTopbar user={user} unreadCount={unreadCount} settingsUrl={settingsUrl} logoutUrl={logoutUrl} onLogout={onLogout} />
                </header>
                <main className="flex-1" role="content">
                    {showToolbar && (title || breadcrumbs.length > 0 || toolbarActions) && (
                        <Toolbar title={title} breadcrumbs={breadcrumbs} actions={toolbarActions} currentUrl={currentUrl} />
                    )}
                    {children}
                </main>
                <Footer links={footerLinks} copyright={copyright} />
            </div>
        </div>
    );
}
