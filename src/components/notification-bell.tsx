'use client';

import { Bell, CheckCheck, ExternalLink } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface NotificationData {
    incident_id: number;
    event_label: string;
    priority_label: string;
    message: string;
    url: string;
}

interface Notification {
    id: string;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
}

export interface NotificationBellProps {
    unreadCount?: number;
    fetchUrl?: string;
    markReadUrl?: (id: string) => string;
    markAllReadUrl?: string;
    viewAllUrl?: string;
}

export function NotificationBell({
    unreadCount = 0,
    fetchUrl = '/api/v1/notifications',
    markReadUrl = (id) => `/api/v1/notifications/${id}/read`,
    markAllReadUrl = '/api/v1/notifications/read-all',
    viewAllUrl = '/incidents',
}: NotificationBellProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [localCount, setLocalCount] = useState(unreadCount);
    const fetchedRef = useRef(false);

    useEffect(() => { setLocalCount(unreadCount); }, [unreadCount]);

    const fetchNotifications = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetch(fetchUrl, {
                headers: { Accept: 'application/json' },
                credentials: 'same-origin',
            });
            if (res.ok) {
                const json = await res.json();
                setNotifications(json.notifications);
            }
        } finally {
            setLoading(false);
            fetchedRef.current = true;
        }
    }, [loading, fetchUrl]);

    useEffect(() => {
        if (open && !fetchedRef.current) fetchNotifications();
    }, [open, fetchNotifications]);

    const markRead = async (id: string) => {
        await fetch(markReadUrl(id), {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': getCsrfToken(), Accept: 'application/json' },
            credentials: 'same-origin',
        });
        setNotifications((prev) =>
            prev.map((n) => n.id === id ? { ...n, read_at: new Date().toISOString() } : n),
        );
        setLocalCount((c) => Math.max(0, c - 1));
    };

    const markAllRead = async () => {
        await fetch(markAllReadUrl, {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': getCsrfToken(), Accept: 'application/json' },
            credentials: 'same-origin',
        });
        setNotifications((prev) => prev.map((n) => ({ ...n, read_at: new Date().toISOString() })));
        setLocalCount(0);
    };

    const navigateTo = (notification: Notification) => {
        if (!notification.read_at) markRead(notification.id);
        setOpen(false);
        window.location.href = notification.data.url;
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9"
                    aria-label={`Notifications${localCount > 0 ? `, ${localCount} unread` : ''}`}
                >
                    <Bell className="h-5 w-5" />
                    {localCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] leading-none font-bold text-white">
                            {localCount > 99 ? '99+' : localCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0" sideOffset={8}>
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <span className="text-sm font-semibold">Notifications</span>
                    {localCount > 0 && (
                        <button
                            onClick={markAllRead}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                        >
                            <CheckCheck className="h-3.5 w-3.5" />
                            Mark all read
                        </button>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {loading && (
                        <div className="space-y-2 p-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-14 animate-pulse rounded bg-neutral-100" />
                            ))}
                        </div>
                    )}
                    {!loading && notifications.length === 0 && (
                        <div className="py-8 text-center text-sm text-neutral-500">No notifications</div>
                    )}
                    {!loading && notifications.map((notification) => (
                        <button
                            key={notification.id}
                            onClick={() => navigateTo(notification)}
                            className={`flex w-full items-start gap-3 border-b border-neutral-100 px-4 py-3 text-left text-sm last:border-0 hover:bg-neutral-50 ${!notification.read_at ? 'bg-blue-50' : ''}`}
                        >
                            <div className="mt-0.5 min-w-0 flex-1">
                                <p className={`truncate ${!notification.read_at ? 'font-medium' : 'text-neutral-700'}`}>
                                    {notification.data.message}
                                </p>
                                <p className="mt-0.5 text-xs text-neutral-400">
                                    {formatRelativeTime(notification.created_at)}
                                </p>
                            </div>
                            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
                        </button>
                    ))}
                </div>

                {notifications.length > 0 && (
                    <div className="border-t px-4 py-2 text-center">
                        <button
                            onClick={() => { setOpen(false); window.location.href = viewAllUrl; }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                        >
                            View all incidents
                        </button>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function getCsrfToken(): string {
    return (
        (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? ''
    );
}

function formatRelativeTime(isoString: string): string {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}
