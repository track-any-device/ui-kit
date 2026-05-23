'use client';
import { PlatformLink, usePlatformUrl } from '../platform/context';
import {
    AlertTriangle,
    LayoutDashboard,
    MapPin,
    Package,
    Shield,
    Smartphone,
    User,
} from 'lucide-react';

import SiteHeader from '../components/web/SiteHeader';

type SidebarItem = {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    matchPrefixes: string[];
};

const SIDEBAR: SidebarItem[] = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        matchPrefixes: ['/dashboard'],
    },
    {
        label: 'Live Tracking',
        href: '/live-tracking',
        icon: MapPin,
        matchPrefixes: ['/live-tracking'],
    },
    {
        label: 'My Devices',
        href: '/devices',
        icon: Smartphone,
        matchPrefixes: ['/devices', '/my-devices'],
    },
    {
        label: 'My Beats',
        href: '/beats',
        icon: Shield,
        matchPrefixes: ['/beats', '/my-beats'],
    },
    {
        label: 'My Incidents',
        href: '/incidents',
        icon: AlertTriangle,
        matchPrefixes: ['/incidents', '/my-incidents'],
    },
    {
        label: 'My Orders',
        href: '/orders',
        icon: Package,
        matchPrefixes: ['/orders', '/my-orders'],
    },
    {
        label: 'Profile',
        href: '/settings/profile',
        icon: User,
        matchPrefixes: ['/settings'],
    },
];

/**
 * WebAppLayout — used for authenticated web-host user-area pages.
 *
 * Composition:
 *   ┌───────────────────────────────────┐
 *   │           SiteHeader              │  (public web header, with auth menu)
 *   ├──────────┬────────────────────────┤
 *   │ Sidebar  │   Main page content    │
 *   │ (Dash,   │                        │
 *   │  My Dev, │                        │
 *   │  Orders, │                        │
 *   │  Profile)│                        │
 *   ├──────────┴────────────────────────┤
 *   │           SiteFooter              │
 *   └───────────────────────────────────┘
 *
 * Distinct from the tenant-portal AppLayout, which uses an app-style sidebar
 * + breadcrumbs and no public footer.
 *
 */
export default function WebAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const url = usePlatformUrl();
    const appName =
        (typeof window !== 'undefined' && window.AppConfig?.appName) ||
        'Fleet Tracking';

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />

            <div className="mt-16 flex-1 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
                    <aside className="border-b border-border bg-muted/30 lg:w-56 lg:shrink-0 lg:rounded-l-xl lg:border-r lg:border-b-0">
                        <nav className="sticky top-16 flex gap-1 overflow-x-auto p-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:p-4">
                            {SIDEBAR.map((item) => {
                                const isActive = item.matchPrefixes.some(
                                    (prefix) =>
                                        url === prefix ||
                                        url.startsWith(prefix + '/') ||
                                        url.startsWith(prefix + '?'),
                                );
                                const Icon = item.icon;

                                return (
                                    <PlatformLink
                                        key={item.href}
                                        href={item.href}
                                        className={
                                            'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors lg:shrink ' +
                                            (isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')
                                        }
                                    >
                                        <Icon className="size-4" />
                                        <span>{item.label}</span>
                                    </PlatformLink>
                                );
                            })}
                        </nav>
                    </aside>

                    <main className="min-w-0 flex-1 py-6 lg:px-6 lg:py-8">
                        {children}
                    </main>
                </div>
            </div>

            <footer className="mt-8 border-t border-border bg-card">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
                    <span>
                        © {new Date().getFullYear()} {appName}
                    </span>
                    <nav className="flex flex-wrap items-center gap-3">
                        <PlatformLink href="/terms" className="hover:text-foreground">
                            Terms
                        </PlatformLink>
                        <PlatformLink href="/privacy" className="hover:text-foreground">
                            Privacy
                        </PlatformLink>
                        <PlatformLink href="/cookies" className="hover:text-foreground">
                            Cookies
                        </PlatformLink>
                        <PlatformLink href="/contact" className="hover:text-foreground">
                            Contact
                        </PlatformLink>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
