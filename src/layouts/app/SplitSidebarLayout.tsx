'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import type { NavItem } from '../../types/navigation';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem, AccordionMenuSub, AccordionMenuSubContent, AccordionMenuSubTrigger } from '../../components/ui/accordion-menu';
import { ScrollArea } from '../../components/ui/scroll-area';

/**
 * SplitSidebarLayout (demo4)
 * No horizontal navbar. Left sidebar split into:
 *   - primary panel: icon/section switcher
 *   - secondary panel: full nav items for the active section
 */
interface SplitSidebarLayoutProps extends BaseAppLayoutProps {
    primaryItems?: NavItem[];
    secondaryItems?: NavItem[];
    activePrimary?: string;
    onPrimaryChange?: (value: string) => void;
    showToolbar?: boolean;
}

export function SplitSidebarLayout({
    children, navItems = [], primaryItems = [], secondaryItems = [],
    currentUrl = '', logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions, activePrimary,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true,
}: SplitSidebarLayoutProps) {
    const sideItems = secondaryItems.length > 0 ? secondaryItems : navItems;

    return (
        <div className="flex min-h-screen">
            {/* Primary sidebar (icon strip) */}
            {primaryItems.length > 0 && (
                <aside className="w-16 shrink-0 border-e border-sidebar-border bg-sidebar flex flex-col items-center py-3 gap-1">
                    {logo && <a href={logoHref} className="mb-3">{logo}</a>}
                    {primaryItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => {}}
                            className={cn('w-10 h-10 flex items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-xs', activePrimary === item.title && 'bg-sidebar-accent')}
                            title={item.title}
                        >
                            {item.title.slice(0, 2)}
                        </button>
                    ))}
                </aside>
            )}

            {/* Secondary sidebar (full nav) */}
            <aside className="w-56 shrink-0 border-e border-sidebar-border bg-sidebar flex flex-col">
                {!primaryItems.length && logo && (
                    <div className="flex items-center gap-2 px-4 h-[70px] border-b border-sidebar-border shrink-0">
                        <a href={logoHref}>{logo}</a>
                        {appName && <span className="text-sm font-semibold">{appName}</span>}
                    </div>
                )}
                <ScrollArea className="flex-1 py-3 px-2">
                    <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                        <AccordionMenuGroup>
                            {sideItems.map((item, i) => (
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

            {/* Main area */}
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
