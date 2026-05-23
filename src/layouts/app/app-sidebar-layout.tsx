import type { ReactNode } from 'react';
import { AppShell } from '../../components/app-shell';
import { AppContent } from '../../components/app-content';
import { AppSidebar } from '../../components/app-sidebar';
import { AppSidebarHeader } from '../../components/app-sidebar-header';
import type { NavItem, BreadcrumbItem } from '../../types/navigation';
import type { User } from '../../types/auth';

export type AppSidebarLayoutProps = {
    breadcrumbs?: BreadcrumbItem[];
    children: ReactNode;
    user?: User | null;
    navItems?: NavItem[];
    tenant?: { display_name?: string | null; sub_brand?: string | null } | null;
    unreadCount?: number;
    dashboardHref?: string;
    settingsUrl?: string;
    logoutUrl?: string;
    defaultOpen?: boolean;
};

export default function AppSidebarLayout({
    breadcrumbs = [],
    children,
    user,
    navItems,
    tenant,
    unreadCount = 0,
    dashboardHref = '/dashboard',
    settingsUrl = '/settings/profile',
    logoutUrl = '/logout',
    defaultOpen = true,
}: AppSidebarLayoutProps) {
    return (
        <AppShell variant="sidebar" defaultOpen={defaultOpen}>
            <AppSidebar
                navItems={navItems}
                user={user}
                tenant={tenant}
                dashboardHref={dashboardHref}
                settingsUrl={settingsUrl}
                logoutUrl={logoutUrl}
            />
            <AppContent variant="sidebar">
                <AppSidebarHeader
                    breadcrumbs={breadcrumbs}
                    user={user}
                    unreadCount={unreadCount}
                    settingsUrl={settingsUrl}
                    logoutUrl={logoutUrl}
                />
                {children}
            </AppContent>
        </AppShell>
    );
}
