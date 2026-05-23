'use client';
// layout-14/20: workspace sidebar — primary nav + workspace switcher + secondary panel
// Used for multi-workspace apps (similar to Notion, Linear, Slack)
import { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem, AccordionMenuSub, AccordionMenuSubContent, AccordionMenuSubTrigger } from '../../components/ui/accordion-menu';
import { ScrollArea } from '../../components/ui/scroll-area';

interface WorkspaceSidebarLayoutProps extends BaseAppLayoutProps {
    workspaces?: Array<{ id: string; name: string; icon?: string; href: string }>;
    activeWorkspace?: string;
    communities?: Array<{ name: string; href: string }>;
    secondaryItems?: import('../../types/navigation').NavItem[];
    sidebarFooter?: ReactNode;
    showToolbar?: boolean;
}

export function WorkspaceSidebarLayout({
    children, navItems = [], currentUrl = '',
    logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions,
    workspaces = [], activeWorkspace, communities = [],
    secondaryItems = [], sidebarFooter,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true,
}: WorkspaceSidebarLayoutProps) {
    const allNavItems = [...navItems, ...secondaryItems];
    return (
        <div className="flex min-h-screen">
            {/* Workspace strip */}
            {workspaces.length > 0 && (
                <div className="w-[52px] flex flex-col items-center py-3 gap-1.5 border-e border-sidebar-border bg-sidebar shrink-0">
                    {logo && <a href={logoHref} className="mb-2">{logo}</a>}
                    {workspaces.map((ws, i) => (
                        <a key={i} href={ws.href} className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors', activeWorkspace === ws.id ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80')}>
                            {ws.icon ?? ws.name.slice(0, 2)}
                        </a>
                    ))}
                </div>
            )}

            {/* Main sidebar */}
            <aside className="w-56 shrink-0 flex flex-col border-e border-sidebar-border bg-sidebar">
                {!workspaces.length && logo && (
                    <div className="flex items-center gap-2 px-4 h-[70px] border-b border-sidebar-border shrink-0">
                        <a href={logoHref}>{logo}</a>
                        {appName && <span className="text-sm font-semibold">{appName}</span>}
                    </div>
                )}
                <ScrollArea className="flex-1 py-2 px-2">
                    <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                        <AccordionMenuGroup>
                            {allNavItems.map((item, i) => (
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
                        {communities.length > 0 && (
                            <AccordionMenuGroup>
                                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Communities</div>
                                {communities.map((c, i) => (
                                    <AccordionMenuItem key={i} value={c.href} asChild><a href={c.href}>{c.name}</a></AccordionMenuItem>
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
