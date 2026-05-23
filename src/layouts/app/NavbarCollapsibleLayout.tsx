'use client';

import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { Navbar } from './partials/Navbar';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem, AccordionMenuSub, AccordionMenuSubContent, AccordionMenuSubTrigger } from '../../components/ui/accordion-menu';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Button } from '../../controls/Button';
import { Menu, X } from 'lucide-react';
import type { NavItem } from '../../types/navigation';

/**
 * NavbarCollapsibleLayout (demo3)
 * Header (logo + topbar) + horizontal navbar + optional collapsible sidebar.
 * Sidebar contains section-specific sub-navigation driven by the active navbar item.
 */
interface NavbarCollapsibleLayoutProps extends BaseAppLayoutProps {
    sidebarItems?: NavItem[];
    showToolbar?: boolean;
}

export function NavbarCollapsibleLayout({
    children, navItems = [], sidebarItems = [], currentUrl = '',
    logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true,
    defaultSidebarCollapsed = false,
}: NavbarCollapsibleLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(!defaultSidebarCollapsed);

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

            {/* Body: optional sidebar + content */}
            <div className="flex flex-1">
                {sidebarItems.length > 0 && (
                    <>
                        <aside className={cn('w-64 shrink-0 border-e border-border bg-sidebar hidden lg:block', !sidebarOpen && 'hidden')}>
                            <ScrollArea className="h-full py-3 px-2">
                                <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                                    <AccordionMenuGroup>
                                        {sidebarItems.map((item, i) => (
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
                    </>
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
