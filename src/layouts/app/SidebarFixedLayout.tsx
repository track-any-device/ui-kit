'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps, AppLayoutUser } from './layout-types';
import type { NavItem } from '../../types/navigation';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem, AccordionMenuSub, AccordionMenuSubContent, AccordionMenuSubTrigger, AccordionMenuIndicator } from '../../components/ui/accordion-menu';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Menu, X } from 'lucide-react';
import { Button } from '../../controls/Button';

interface SidebarFixedLayoutProps extends BaseAppLayoutProps {
    showToolbar?: boolean;
    headerRightSlot?: ReactNode;
}

function SidebarNav({ navItems, currentUrl }: { navItems: NavItem[]; currentUrl: string }) {
    function isActive(url: string): boolean {
        return !!url && url !== '#' && currentUrl.startsWith(url);
    }
    function hasActive(items: NavItem[]): boolean {
        return items.some((i) => isActive(i.href ?? '') || (i.items ? hasActive(i.items) : false));
    }

    return (
        <AccordionMenu type="single" collapsible matchPath={(href) => isActive(href)} selectedValue={currentUrl}>
            <AccordionMenuGroup>
                {navItems.map((item, i) => {
                    if (item.items && item.items.length > 0) {
                        return (
                            <AccordionMenuSub key={i} value={item.title}>
                                <AccordionMenuSubTrigger>
                                    {item.title}
                                    {hasActive(item.items) && <AccordionMenuIndicator className="size-1.5 rounded-full bg-primary" />}
                                </AccordionMenuSubTrigger>
                                <AccordionMenuSubContent type="single" collapsible parentValue={item.title}>
                                    {item.items.map((child, ci) => (
                                        <AccordionMenuItem key={ci} value={child.href ?? child.title} asChild>
                                            <a href={child.href}>{child.title}</a>
                                        </AccordionMenuItem>
                                    ))}
                                </AccordionMenuSubContent>
                            </AccordionMenuSub>
                        );
                    }
                    return (
                        <AccordionMenuItem key={i} value={item.href ?? item.title} asChild>
                            <a href={item.href}>{item.title}</a>
                        </AccordionMenuItem>
                    );
                })}
            </AccordionMenuGroup>
        </AccordionMenu>
    );
}

export function SidebarFixedLayout({
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
    defaultSidebarCollapsed = false,
    onLogout,
    settingsUrl,
    logoutUrl,
    unreadCount = 0,
    footerLinks = [],
    copyright,
    showToolbar = true,
    headerRightSlot,
}: SidebarFixedLayoutProps) {
    const [collapsed, setCollapsed] = useState(defaultSidebarCollapsed);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setInitialized(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cn('sidebar-fixed-layout header-fixed flex min-h-screen', collapsed && 'sidebar-collapse', initialized && 'layout-initialized')}>
            {/* Sidebar */}
            <aside className={cn(
                'layout-sidebar fixed inset-y-0 start-0 z-40 flex flex-col bg-sidebar border-e border-sidebar-border',
                'transition-transform lg:translate-x-0',
                mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
            )}>
                {/* Sidebar header / logo */}
                <div className="sidebar-header flex items-center gap-3 px-4 shrink-0 border-b border-sidebar-border">
                    {logo && (
                        <a href={logoHref} className="default-logo flex items-center gap-2 overflow-hidden">
                            {logo}
                            {appName && <span className="text-sm font-semibold text-sidebar-foreground whitespace-nowrap">{appName}</span>}
                        </a>
                    )}
                </div>
                {/* Nav */}
                <ScrollArea className="flex-1 py-3 px-2">
                    <SidebarNav navItems={navItems} currentUrl={currentUrl} />
                </ScrollArea>
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}

            {/* Wrapper (header + content + footer) */}
            <div className={cn('layout-wrapper flex flex-col flex-1 min-h-screen')}>
                {/* Fixed header */}
                <header className="layout-header fixed top-0 inset-x-0 z-20 flex items-center border-b border-border bg-background/95 backdrop-blur-sm px-4 gap-4">
                    <Button
                        variant="ghost" size="sm"
                        className="size-9 p-0 rounded-full lg:hidden"
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        className="size-9 p-0 rounded-full hidden lg:flex"
                        onClick={() => setCollapsed((c) => !c)}
                        aria-label="Collapse sidebar"
                    >
                        <Menu className="size-4" />
                    </Button>
                    <div className="flex-1" />
                    <HeaderTopbar
                        user={user}
                        unreadCount={unreadCount}
                        settingsUrl={settingsUrl}
                        logoutUrl={logoutUrl}
                        onLogout={onLogout}
                        extraSlot={headerRightSlot}
                    />
                </header>

                {/* Main content */}
                <main className="grow pt-5" role="content">
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
        </div>
    );
}
