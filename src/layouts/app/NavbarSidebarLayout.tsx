'use client';

import { useState } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import type { NavItem } from '../../types/navigation';
import { Navbar } from './partials/Navbar';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem, AccordionMenuSub, AccordionMenuSubContent, AccordionMenuSubTrigger } from '../../components/ui/accordion-menu';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Button } from '../../controls/Button';
import { Menu } from 'lucide-react';

/**
 * NavbarSidebarLayout (demo5)
 * Header (logo + topbar) + horizontal navbar + collapsible sidebar.
 * Sidebar nav changes based on the active navbar section.
 */
interface NavbarSidebarLayoutProps extends BaseAppLayoutProps {
    sidebarItems?: NavItem[];
    showToolbar?: boolean;
}

export function NavbarSidebarLayout({
    children, navItems = [], sidebarItems = [], currentUrl = '',
    logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true,
    defaultSidebarCollapsed = false,
}: NavbarSidebarLayoutProps) {
    const [collapsed, setCollapsed] = useState(defaultSidebarCollapsed);
    const effectiveSidebarItems = sidebarItems.length > 0 ? sidebarItems : [];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex items-center h-[70px] border-b border-border bg-background px-4 shrink-0">
                <div className="container mx-auto flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        {logo && <a href={logoHref}>{logo}</a>}
                        {appName && <span className="text-sm font-medium hidden md:inline">{appName}</span>}
                    </div>
                    <HeaderTopbar user={user} unreadCount={unreadCount} settingsUrl={settingsUrl} logoutUrl={logoutUrl} onLogout={onLogout} />
                </div>
            </header>

            {/* Navbar */}
            <Navbar navItems={navItems} currentUrl={currentUrl} />

            {/* Body */}
            <div className="flex flex-1">
                {effectiveSidebarItems.length > 0 && (
                    <aside className={cn('shrink-0 border-e border-sidebar-border bg-sidebar transition-all', collapsed ? 'w-0 overflow-hidden' : 'w-60')}>
                        <div className="flex items-center justify-between px-3 py-2 border-b border-sidebar-border">
                            <Button variant="ghost" size="sm" className="size-8 p-0" onClick={() => setCollapsed((c) => !c)}>
                                <Menu className="size-4" />
                            </Button>
                        </div>
                        <ScrollArea className="py-2 px-2">
                            <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                                <AccordionMenuGroup>
                                    {effectiveSidebarItems.map((item, i) => (
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
                )}
                <main className="flex-1 min-w-0" role="content">
                    {showToolbar && (title || breadcrumbs.length > 0 || toolbarActions) && (
                        <Toolbar title={title} breadcrumbs={breadcrumbs} actions={toolbarActions} currentUrl={currentUrl} />
                    )}
                    {children}
                </main>
            </div>
            <Footer links={footerLinks} copyright={copyright} />
        </div>
    );
}
