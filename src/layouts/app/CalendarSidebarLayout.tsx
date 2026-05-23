'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Toolbar } from './partials/Toolbar';

/**
 * CalendarSidebarLayout (layout-36)
 * Sidebar with mini calendar + category list + main calendar area.
 */
interface CalendarSidebarLayoutProps extends BaseAppLayoutProps {
    miniCalendar?: ReactNode;
    categories?: Array<{ name: string; color: string; visible?: boolean }>;
    showToolbar?: boolean;
    sidebarFooter?: ReactNode;
}

export function CalendarSidebarLayout({
    children, currentUrl = '',
    logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions,
    settingsUrl, logoutUrl, onLogout, unreadCount = 0,
    miniCalendar, categories = [], sidebarFooter,
    showToolbar = true,
}: CalendarSidebarLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 shrink-0 flex flex-col border-e border-sidebar-border bg-sidebar">
                <div className="flex items-center gap-2 px-4 h-[70px] border-b border-sidebar-border shrink-0">
                    {logo && <a href={logoHref}>{logo}</a>}
                    {appName && <span className="text-sm font-semibold text-sidebar-foreground">{appName}</span>}
                </div>
                <ScrollArea className="flex-1">
                    {miniCalendar && <div className="p-3 border-b border-sidebar-border">{miniCalendar}</div>}
                    {categories.length > 0 && (
                        <div className="p-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Calendars</p>
                            <div className="space-y-1">
                                {categories.map((cat, i) => (
                                    <label key={i} className="flex items-center gap-2 px-1 py-1 rounded text-sm cursor-pointer hover:bg-sidebar-accent">
                                        <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                                        <span className="text-sidebar-foreground">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </ScrollArea>
                {sidebarFooter && <div className="p-3 border-t border-sidebar-border">{sidebarFooter}</div>}
            </aside>

            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center h-[70px] border-b border-border bg-background px-4 shrink-0">
                    <div className="flex-1" />
                    <HeaderTopbar user={user} unreadCount={unreadCount} settingsUrl={settingsUrl} logoutUrl={logoutUrl} onLogout={onLogout} />
                </header>
                <main className="flex-1 overflow-hidden flex flex-col" role="content">
                    {showToolbar && (title || breadcrumbs.length > 0 || toolbarActions) && (
                        <Toolbar title={title} breadcrumbs={breadcrumbs} actions={toolbarActions} currentUrl={currentUrl} />
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
