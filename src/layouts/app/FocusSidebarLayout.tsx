'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { ScrollArea } from '../../components/ui/scroll-area';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem } from '../../components/ui/accordion-menu';
import { Button } from '../../controls/Button';
import { Search } from 'lucide-react';

/**
 * FocusSidebarLayout (layout-39)
 * Todo/task-focused sidebar: focus card + tag list + task groups + toolbar search.
 */
interface FocusSidebarLayoutProps extends BaseAppLayoutProps {
    focusCard?: ReactNode;
    tags?: Array<{ name: string; count?: number; href: string }>;
    headerSearchPlaceholder?: string;
    sidebarFooter?: ReactNode;
}

export function FocusSidebarLayout({
    children, navItems = [], currentUrl = '',
    logo, logoHref = '/', user,
    settingsUrl, logoutUrl, onLogout, unreadCount = 0,
    focusCard, tags = [], sidebarFooter,
}: FocusSidebarLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 shrink-0 flex flex-col border-e border-sidebar-border bg-sidebar">
                <div className="flex items-center justify-between px-4 h-[70px] border-b border-sidebar-border shrink-0">
                    {logo && <a href={logoHref}>{logo}</a>}
                    <Button variant="ghost" size="sm" className="size-8 p-0 ms-auto">
                        <Search className="size-4" />
                    </Button>
                </div>
                <ScrollArea className="flex-1 py-2 px-2">
                    {focusCard && <div className="mb-3 p-2 rounded-lg bg-primary/10 border border-primary/20">{focusCard}</div>}
                    <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                        <AccordionMenuGroup>
                            {navItems.map((item, i) => (
                                <AccordionMenuItem key={i} value={item.href ?? item.title} asChild>
                                    <a href={item.href}>{item.title}</a>
                                </AccordionMenuItem>
                            ))}
                        </AccordionMenuGroup>
                        {tags.length > 0 && (
                            <AccordionMenuGroup>
                                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Tags</div>
                                {tags.map((tag, i) => (
                                    <AccordionMenuItem key={i} value={tag.href} asChild>
                                        <a href={tag.href} className="flex justify-between">
                                            <span>{tag.name}</span>
                                            {tag.count !== undefined && <span className="text-muted-foreground text-xs">{tag.count}</span>}
                                        </a>
                                    </AccordionMenuItem>
                                ))}
                            </AccordionMenuGroup>
                        )}
                    </AccordionMenu>
                </ScrollArea>
                {sidebarFooter && <div className="p-3 border-t border-sidebar-border">{sidebarFooter}</div>}
            </aside>

            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center h-[70px] border-b border-border bg-background px-4 shrink-0">
                    <div className="flex-1" />
                    <HeaderTopbar user={user} unreadCount={unreadCount} settingsUrl={settingsUrl} logoutUrl={logoutUrl} onLogout={onLogout} />
                </header>
                <main className="flex-1" role="content">{children}</main>
            </div>
        </div>
    );
}
