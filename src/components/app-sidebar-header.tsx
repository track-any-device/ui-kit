'use client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SidebarTrigger } from './ui/sidebar';
import { Breadcrumbs } from './breadcrumbs';
import { NotificationBell } from './notification-bell';
import { UserMenuContent } from './user-menu-content';
import { useInitials } from '../hooks/use-initials';
import type { BreadcrumbItem } from '../types/navigation';
import type { User } from '../types/auth';

export function AppSidebarHeader({
    breadcrumbs = [],
    user,
    unreadCount = 0,
    settingsUrl = '/settings/profile',
    logoutUrl = '/logout',
}: {
    breadcrumbs?: BreadcrumbItem[];
    user?: User | null;
    unreadCount?: number;
    settingsUrl?: string;
    logoutUrl?: string;
}) {
    const getInitials = useInitials();

    return (
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-1">
                <NotificationBell unreadCount={unreadCount} />

                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground hover:bg-accent hover:text-accent-foreground">
                                <Avatar className="size-7 overflow-hidden rounded-full">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden max-w-32 truncate font-medium sm:block">
                                    {user.name}
                                </span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent
                                user={user}
                                settingsUrl={settingsUrl}
                                logoutUrl={logoutUrl}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
}
