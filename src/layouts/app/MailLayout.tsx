'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { ScrollArea } from '../../components/ui/scroll-area';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem } from '../../components/ui/accordion-menu';

/**
 * MailLayout (layout-37)
 * Three-column layout: sidebar nav + mail list panel + mail view panel.
 * Used for email clients, CRM inbox, notification centre.
 */
interface MailLayoutProps extends BaseAppLayoutProps {
    listPanel?: ReactNode;
    viewPanel?: ReactNode;
    sidebarFooter?: ReactNode;
    listPanelWidth?: string;
}

export function MailLayout({
    children, navItems = [], currentUrl = '',
    logo, logoHref = '/', user,
    settingsUrl, logoutUrl, onLogout, unreadCount = 0,
    listPanel, viewPanel, sidebarFooter,
    listPanelWidth = 'w-80',
}: MailLayoutProps) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-60 shrink-0 flex flex-col border-e border-sidebar-border bg-sidebar">
                <div className="flex items-center gap-2 px-4 h-[70px] border-b border-sidebar-border shrink-0">
                    {logo && <a href={logoHref}>{logo}</a>}
                </div>
                <ScrollArea className="flex-1 py-2 px-2">
                    <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                        <AccordionMenuGroup>
                            {navItems.map((item, i) => (
                                <AccordionMenuItem key={i} value={item.href ?? item.title} asChild>
                                    <a href={item.href}>{item.title}</a>
                                </AccordionMenuItem>
                            ))}
                        </AccordionMenuGroup>
                    </AccordionMenu>
                </ScrollArea>
                {sidebarFooter && <div className="p-3 border-t border-sidebar-border">{sidebarFooter}</div>}
            </aside>

            {/* List panel */}
            {listPanel && (
                <aside className={cn('shrink-0 border-e border-border flex flex-col', listPanelWidth)}>
                    {listPanel}
                </aside>
            )}

            {/* View panel / main */}
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center h-[70px] border-b border-border bg-background px-4 shrink-0">
                    <div className="flex-1" />
                    <HeaderTopbar user={user} unreadCount={unreadCount} settingsUrl={settingsUrl} logoutUrl={logoutUrl} onLogout={onLogout} />
                </header>
                <main className="flex-1 overflow-auto" role="content">
                    {viewPanel ?? children}
                </main>
            </div>
        </div>
    );
}
