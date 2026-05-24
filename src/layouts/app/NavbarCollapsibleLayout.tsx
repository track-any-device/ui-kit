'use client';

import { useState } from 'react';
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const hasSidebar = sidebarItems.length > 0;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex items-center h-[70px] border-b border-border bg-background px-4 shrink-0">
                <div className="container mx-auto flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        {/* Mobile hamburger — only when sidebar is present */}
                        {hasSidebar && (
                            <Button
                                variant="ghost" size="sm"
                                className="size-9 p-0 rounded-full lg:hidden"
                                onClick={() => setMobileOpen((o) => !o)}
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                            </Button>
                        )}
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
                {hasSidebar && (
                    <>
                        {/* Desktop sidebar */}
                        <aside className={cn(
                            'w-64 shrink-0 border-e border-border bg-sidebar hidden lg:block',
                            !sidebarOpen && 'hidden',
                        )}>
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

                        {/* Mobile sidebar overlay */}
                        {mobileOpen && (
                            <>
                                <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
                                <aside className="fixed inset-y-0 start-0 z-40 w-72 flex flex-col border-e border-sidebar-border bg-sidebar lg:hidden">
                                    <div className="flex items-center justify-between px-4 h-[70px] border-b border-sidebar-border shrink-0">
                                        {logo && <a href={logoHref}>{logo}</a>}
                                        <Button variant="ghost" size="sm" className="size-8 p-0 ml-auto" onClick={() => setMobileOpen(false)}>
                                            <X className="size-4" />
                                        </Button>
                                    </div>
                                    <ScrollArea className="flex-1 py-3 px-2">
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
