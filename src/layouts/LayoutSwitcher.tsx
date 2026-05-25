/**
 * Shared layout switcher for app stories.
 *
 * App layouts:  add `args: { layout: 'SidebarFixed' }` + `argTypes: LAYOUT_ARG_TYPE`,
 *               then wrap content with <LayoutResolved {...args}>.
 *
 * Auth layouts: add `args: { authLayout: 'split' }` + `argTypes: AUTH_LAYOUT_ARG_TYPE`,
 *               then wrap content with <AuthLayoutResolved variant={args.authLayout} ...>.
 */
import React from 'react';
import logoUrl from '../assets/logo.png';
import { AuthLayout } from './AuthLayout';
import type { AuthLayoutVariant } from '../types';
import { TopNavLayout } from './app/TopNavLayout';
import { SidebarFixedLayout } from './app/SidebarFixedLayout';
import { NavbarCollapsibleLayout } from './app/NavbarCollapsibleLayout';
import { SplitSidebarLayout } from './app/SplitSidebarLayout';
import { NavbarSidebarLayout } from './app/NavbarSidebarLayout';
import { SidebarTabsLayout } from './app/SidebarTabsLayout';
import { MegaMenuLayout } from './app/MegaMenuLayout';
import { SidebarMinimalLayout } from './app/SidebarMinimalLayout';
import { MegaMenuNavbarLayout } from './app/MegaMenuNavbarLayout';
import { SidebarDualMenuLayout } from './app/SidebarDualMenuLayout';
import { WorkspaceSidebarLayout } from './app/WorkspaceSidebarLayout';
import type { NavItem } from '../types/navigation';

export type LayoutName =
    | 'SidebarFixed'
    | 'TopNav'
    | 'NavbarCollapsible'
    | 'SplitSidebar'
    | 'NavbarSidebar'
    | 'SidebarTabs'
    | 'MegaMenu'
    | 'SidebarMinimal'
    | 'MegaMenuNavbar'
    | 'SidebarDualMenu'
    | 'WorkspaceSidebar';

export const LAYOUT_OPTIONS: LayoutName[] = [
    'SidebarFixed',
    'TopNav',
    'NavbarCollapsible',
    'SplitSidebar',
    'NavbarSidebar',
    'SidebarTabs',
    'MegaMenu',
    'SidebarMinimal',
    'MegaMenuNavbar',
    'SidebarDualMenu',
    'WorkspaceSidebar',
];

export const LAYOUT_ARG_TYPE = {
    layout: {
        control: 'select' as const,
        options: LAYOUT_OPTIONS,
        description: 'Swap the surrounding app layout',
        table: { category: 'Layout' },
    },
};

const DEFAULT_NAV: NavItem[] = [
    { title: 'Dashboard',  href: '/dashboard' },
    { title: 'Vehicles',   href: '/vehicles', items: [{ title: 'All Vehicles', href: '/vehicles' }, { title: 'Live Map', href: '/vehicles/map' }] },
    { title: 'Drivers',    href: '/drivers' },
    { title: 'Trips',      href: '/trips' },
    { title: 'Incidents',  href: '/incidents' },
    { title: 'Alerts',     href: '/alerts' },
    { title: 'Reports',    href: '/reports' },
    { title: 'Settings',   href: '/settings' },
];

const DEFAULT_USER = { name: 'Ahmad Faryab', email: 'ahmad@tad.io', avatar: '' };

const DEFAULT_LOGO = <img src={logoUrl} alt="Logo" className="h-8 w-auto" />;

type LayoutResolvedProps = {
    layout?: LayoutName;
    navItems?: NavItem[];
    user?: typeof DEFAULT_USER;
    title?: string;
    currentUrl?: string;
    logo?: React.ReactNode;
    children: React.ReactNode;
};

export function LayoutResolved({
    layout = 'SidebarFixed',
    navItems = DEFAULT_NAV,
    user = DEFAULT_USER,
    title = 'Dashboard',
    currentUrl = '/dashboard',
    logo = DEFAULT_LOGO,
    children,
}: LayoutResolvedProps) {
    const shared = { navItems, user, title, currentUrl, appName: 'Track Any Device', logo };

    switch (layout) {
        case 'TopNav':
            return (
                <TopNavLayout {...shared} logoHref="/" copyright="© 2026 Track Any Device" footerLinks={[{ label: 'Support', href: '#' }]}>
                    {children}
                </TopNavLayout>
            );
        case 'NavbarCollapsible':
            return <NavbarCollapsibleLayout {...shared}>{children}</NavbarCollapsibleLayout>;
        case 'SplitSidebar':
            return <SplitSidebarLayout {...shared}>{children}</SplitSidebarLayout>;
        case 'NavbarSidebar':
            return <NavbarSidebarLayout {...shared}>{children}</NavbarSidebarLayout>;
        case 'SidebarTabs':
            return (
                <SidebarTabsLayout
                    {...shared}
                    primaryNavItems={[
                        { title: 'Fleet', href: '/fleet', items: navItems.slice(0, 4) },
                        { title: 'Admin', href: '/admin', items: navItems.slice(4) },
                    ]}
                >
                    {children}
                </SidebarTabsLayout>
            );
        case 'MegaMenu':
            return <MegaMenuLayout {...shared}>{children}</MegaMenuLayout>;
        case 'SidebarMinimal':
            return <SidebarMinimalLayout {...shared}>{children}</SidebarMinimalLayout>;
        case 'MegaMenuNavbar':
            return <MegaMenuNavbarLayout {...shared}>{children}</MegaMenuNavbarLayout>;
        case 'SidebarDualMenu':
            return (
                <SidebarDualMenuLayout
                    {...shared}
                    primaryNavItems={[
                        { title: 'Fleet', href: '/fleet', items: navItems.slice(0, 4) },
                        { title: 'Admin', href: '/admin', items: navItems.slice(4) },
                    ]}
                >
                    {children}
                </SidebarDualMenuLayout>
            );
        case 'WorkspaceSidebar':
            return (
                <WorkspaceSidebarLayout
                    {...shared}
                    workspaces={[{ id: 'fleet', name: 'Track Any Device', href: '/' }, { id: 'admin', name: 'Admin', href: '/admin' }]}
                    activeWorkspace="fleet"
                >
                    {children}
                </WorkspaceSidebarLayout>
            );
        default:
            return <SidebarFixedLayout {...shared}>{children}</SidebarFixedLayout>;
    }
}

/** @deprecated Use LayoutResolved */
export const StoryLayout = LayoutResolved;

// ── Auth layout switcher ──────────────────────────────────────────────────────

export const AUTH_LAYOUT_OPTIONS: AuthLayoutVariant[] = [
    'split', 'branded', 'classic', 'centered', 'simple', 'card',
];

export const AUTH_LAYOUT_ARG_TYPE = {
    authLayout: {
        control: 'select' as const,
        options: AUTH_LAYOUT_OPTIONS,
        description: 'Swap the surrounding auth layout',
        table: { category: 'Layout' },
    },
};

type AuthLayoutResolvedProps = {
    variant?: AuthLayoutVariant;
    title?: string;
    description?: string;
    logo?: React.ReactNode;
    appName?: string;
    backgroundImage?: string;
    backgroundImageDark?: string;
    brandImage?: string;
    brandImageDark?: string;
    children: React.ReactNode;
};

export function AuthLayoutResolved({
    variant = 'split',
    title,
    description,
    logo = DEFAULT_LOGO,
    appName = 'Track Any Device',
    backgroundImage,
    backgroundImageDark,
    brandImage,
    brandImageDark,
    children,
}: AuthLayoutResolvedProps) {
    return (
        <AuthLayout
            variant={variant}
            title={title}
            description={description}
            logo={logo}
            appName={appName}
            backgroundImage={backgroundImage}
            backgroundImageDark={backgroundImageDark}
            brandImage={brandImage}
            brandImageDark={brandImageDark}
        >
            {children}
        </AuthLayout>
    );
}

/** @deprecated Use AuthLayoutResolved */
export const AuthStoryLayout = AuthLayoutResolved;
