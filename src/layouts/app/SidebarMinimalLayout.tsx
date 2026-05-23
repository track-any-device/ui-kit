'use client';

import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { Toolbar } from './partials/Toolbar';
import { Footer } from './partials/Footer';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { AccordionMenu, AccordionMenuGroup, AccordionMenuItem, AccordionMenuSub, AccordionMenuSubContent, AccordionMenuSubTrigger } from '../../components/ui/accordion-menu';
import { ScrollArea } from '../../components/ui/scroll-area';

/**
 * SidebarMinimalLayout (demo8)
 * Clean single sidebar with no secondary panel. Sidebar has header + menu + footer area.
 */
interface SidebarMinimalLayoutProps extends BaseAppLayoutProps {
    sidebarFooter?: React.ReactNode;
    showToolbar?: boolean;
}

export function SidebarMinimalLayout({
    children, navItems = [], currentUrl = '',
    logo, logoHref = '/', appName, user,
    title, breadcrumbs = [], toolbarActions, sidebarFooter,
    onLogout, settingsUrl, logoutUrl, unreadCount = 0,
    footerLinks = [], copyright, showToolbar = true,
}: SidebarMinimalLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 shrink-0 flex flex-col border-e border-sidebar-border bg-sidebar">
                <div className="flex items-center gap-2 px-4 h-[70px] border-b border-sidebar-border shrink-0">
                    {logo && <a href={logoHref}>{logo}</a>}
                    {appName && <span className="text-sm font-semibold text-sidebar-foreground">{appName}</span>}
                </div>
                <ScrollArea className="flex-1 py-3 px-2">
                    <AccordionMenu type="single" collapsible matchPath={(href) => !!href && currentUrl.startsWith(href)} selectedValue={currentUrl}>
                        <AccordionMenuGroup>
                            {navItems.map((item, i) => (
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
