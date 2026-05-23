import type { ReactNode } from 'react';
import type { NavItem, BreadcrumbItem } from '../../types/navigation';

export interface AppLayoutUser {
    name: string;
    email?: string;
    avatar?: string;
}

export interface AppLayoutFooterLink {
    label: string;
    href: string;
}

export interface BaseAppLayoutProps {
    children: ReactNode;

    // Navigation
    navItems?: NavItem[];
    currentUrl?: string;

    // Identity
    logo?: ReactNode;
    logoHref?: string;
    appName?: string;
    user?: AppLayoutUser | null;

    // Page context
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
    toolbarActions?: ReactNode;

    // Behaviour
    stickyHeader?: boolean;
    stickyOffset?: number;
    defaultSidebarCollapsed?: boolean;

    // Actions
    onLogout?: () => void;
    settingsUrl?: string;
    logoutUrl?: string;
    unreadCount?: number;

    // Footer
    footerLinks?: AppLayoutFooterLink[];
    copyright?: string;
}
