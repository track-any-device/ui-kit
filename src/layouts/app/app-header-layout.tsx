import type { ReactNode } from 'react';
import { AppShell } from '../../components/app-shell';
import { AppContent } from '../../components/app-content';
import { AppHeader } from '../../components/app-header';
import type { NavItem, BreadcrumbItem } from '../../types/navigation';
import type { User } from '../../types/auth';

export type AppHeaderLayoutProps = {
    breadcrumbs?: BreadcrumbItem[];
    children: ReactNode;
    user?: User | null;
    navItems?: NavItem[];
    unreadCount?: number;
    dashboardHref?: string;
    settingsUrl?: string;
    logoutUrl?: string;
};

export default function AppHeaderLayout({
    breadcrumbs = [],
    children,
    user,
    navItems = [],
    unreadCount = 0,
    dashboardHref = '/dashboard',
    settingsUrl = '/settings/profile',
    logoutUrl = '/logout',
}: AppHeaderLayoutProps) {
    return (
        <AppShell variant="header">
            <AppHeader
                breadcrumbs={breadcrumbs}
                user={user}
                navItems={navItems}
                unreadCount={unreadCount}
                dashboardHref={dashboardHref}
                settingsUrl={settingsUrl}
                logoutUrl={logoutUrl}
            />
            <AppContent variant="header">
                {children}
            </AppContent>
        </AppShell>
    );
}
