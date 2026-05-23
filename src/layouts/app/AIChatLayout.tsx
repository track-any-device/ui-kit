'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { BaseAppLayoutProps } from './layout-types';
import { HeaderTopbar } from './partials/HeaderTopbar';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Button } from '../../controls/Button';
import { Plus } from 'lucide-react';

/**
 * AIChatLayout (layout-38)
 * AI chat interface: thin sidebar with chat history + main chat area.
 */
interface AIChatLayoutProps extends BaseAppLayoutProps {
    chatHistory?: Array<{ id: string; title: string; href: string; date?: string }>;
    onNewChat?: () => void;
    sidebarFooter?: ReactNode;
    headerActions?: ReactNode;
}

export function AIChatLayout({
    children, currentUrl = '',
    logo, logoHref = '/', user,
    settingsUrl, logoutUrl, onLogout, unreadCount = 0,
    chatHistory = [], onNewChat, sidebarFooter, headerActions,
}: AIChatLayoutProps) {
    return (
        <div className="flex min-h-screen">
            {/* Chat sidebar */}
            <aside className="w-64 shrink-0 flex flex-col border-e border-sidebar-border bg-sidebar">
                <div className="flex items-center justify-between px-4 h-[70px] border-b border-sidebar-border shrink-0">
                    {logo && <a href={logoHref}>{logo}</a>}
                    {onNewChat && (
                        <Button size="sm" variant="ghost" className="size-8 p-0" onClick={onNewChat}>
                            <Plus className="size-4" />
                        </Button>
                    )}
                </div>
                <ScrollArea className="flex-1 py-2 px-2">
                    <div className="space-y-0.5">
                        {chatHistory.map((chat) => (
                            <a
                                key={chat.id}
                                href={chat.href}
                                className={cn(
                                    'flex flex-col gap-0.5 px-2 py-2 rounded-lg text-sm transition-colors hover:bg-sidebar-accent',
                                    currentUrl.includes(chat.id) && 'bg-sidebar-accent',
                                )}
                            >
                                <span className="text-sidebar-foreground truncate">{chat.title}</span>
                                {chat.date && <span className="text-xs text-muted-foreground">{chat.date}</span>}
                            </a>
                        ))}
                    </div>
                </ScrollArea>
                {sidebarFooter && <div className="p-3 border-t border-sidebar-border">{sidebarFooter}</div>}
            </aside>

            {/* Chat area */}
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center h-[70px] border-b border-border bg-background px-4 shrink-0">
                    {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
                    <div className="flex-1" />
                    <HeaderTopbar user={user} unreadCount={unreadCount} settingsUrl={settingsUrl} logoutUrl={logoutUrl} onLogout={onLogout} />
                </header>
                <main className="flex-1 flex flex-col overflow-hidden" role="content">
                    {children}
                </main>
            </div>
        </div>
    );
}
