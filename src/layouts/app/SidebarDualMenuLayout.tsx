'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import type { NavItem } from '../../types/navigation';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem, AccordionMenuSub, AccordionMenuSubContent, AccordionMenuSubTrigger } from '../../components/ui/accordion-menu';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Button } from '../../controls/Button';
import { Menu } from 'lucide-react';

/**
 * SidebarDualMenuLayout (demo10)
 * Sidebar with primary icon-strip + secondary full-label panel.
 * Same dual structure as SidebarTabsLayout but toolbar is in the sidebar header.
 */
interface SidebarDualMenuLayoutProps extends BaseAppLayoutProps {
    primaryNavItems?: NavItem[];
    sidebarFooter?: ReactNode;
    showToolbar?: boolean;
}

export function SidebarDualMenuLayout({
    children, navItems = [], primaryNavItems = [], currentUrl = '',
    logo, logoHref = '/', appName, user, sidebarFooter,
    title, breadcrumbs = [], toolbarActions,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true,
    defaultSidebarCollapsed = false,
}: SidebarDualMenuLayoutProps) {
    const [collapsed, setCollapsed] = useState(defaultSidebarCollapsed);
    const [activeSection, setActiveSection] = useState(primaryNavItems[0]?.title ?? '');
    const sectionItems = primaryNavItems.find((p) => p.title === activeSection)?.items ?? navItems;

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="flex shrink-0">
                {/* Primary icon strip */}
                {primaryNavItems.length > 0 && (
                    <div className="w-[70px] flex flex-col items-center py-4 gap-1 border-e border-sidebar-border bg-sidebar">
                        {logo && <a href={logoHref} className="mb-4 shrink-0">{logo}</a>}
                        {primaryNavItems.map((item, i) => (
                            <button key={i} onClick={() => setActiveSection(item.title)}
                                className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors', activeSection === item.title ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/70')}
                                title={item.title}
                            >
                                {item.title.slice(0, 2)}
                            </button>
                        ))}
                    </div>
                )}

                {/* Secondary full nav */}
                <div className={cn('flex flex-col border-e border-sidebar-border bg-sidebar transition-all', collapsed ? 'w-0 overflow-hidden' : 'w-56')}>
                    <div className="flex items-center justify-between px-3 h-[70px] border-b border-sidebar-border shrink-0">
                        {!primaryNavItems.length && logo && <a href={logoHref}>{logo}</a>}
                        {activeSection && <span className="text-sm font-semibold text-sidebar-foreground truncate">{activeSection || appName}</span>}
                        <Button variant="ghost" size="sm" className="size-8 p-0 ml-auto" onClick={() => setCollapsed((c) => !c)}>
                            <Menu className="size-4" />
                        </Button>
                    </div>
                    <ScrollArea className="flex-1 py-2 px-2">
                        <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                            <AccordionMenuGroup>
                                {sectionItems.map((item, i) => (
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
                    {sidebarFooter && <div className="p-3 border-t border-sidebar-border">{sidebarFooter}</div>}
                </div>
            </aside>

            {/* Main */}
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center h-[70px] border-b border-border bg-background px-4 shrink-0">
                    <div className="flex-1" />
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
