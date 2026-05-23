'use client';

import type { ReactNode } from 'react';
import type { AppLayoutUser } from '../layout-types';
import { Bell, Search } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../../../controls/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';

interface HeaderTopbarProps {
    user?: AppLayoutUser | null;
    unreadCount?: number;
    onSearchOpen?: () => void;
    settingsUrl?: string;
    logoutUrl?: string;
    onLogout?: () => void;
    className?: string;
    extraSlot?: ReactNode;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export function HeaderTopbar({
    user,
    unreadCount = 0,
    onSearchOpen,
    settingsUrl,
    logoutUrl,
    onLogout,
    className,
    extraSlot,
}: HeaderTopbarProps) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            {extraSlot}

            {onSearchOpen && (
                <Button variant="ghost" size="sm" className="size-9 p-0 rounded-full" onClick={onSearchOpen} aria-label="Search">
                    <Search className="size-4" />
                </Button>
            )}

            <Button variant="ghost" size="sm" className="size-9 p-0 rounded-full relative" aria-label="Notifications">
                <Bell className="size-4" />
                {unreadCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-primary" />
                )}
            </Button>

            {user && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="size-9 rounded-full border border-border overflow-hidden cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="size-full object-cover" />
                            ) : (
                                <span className="size-full flex items-center justify-center bg-muted text-xs font-medium text-muted-foreground">
                                    {getInitials(user.name)}
                                </span>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                        <div className="px-2 py-1.5">
                            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                            {user.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
                        </div>
                        <DropdownMenuSeparator />
                        {settingsUrl && (
                            <DropdownMenuItem asChild>
                                <a href={settingsUrl}>Settings</a>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {logoutUrl ? (
                            <DropdownMenuItem asChild>
                                <a href={logoutUrl} className="text-destructive focus:text-destructive">Sign out</a>
                            </DropdownMenuItem>
                        ) : onLogout ? (
                            <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                                Sign out
                            </DropdownMenuItem>
                        ) : null}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
