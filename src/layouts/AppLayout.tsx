import type { BaseAppLayoutProps } from './app/layout-types';
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

export type AppVariant =
    // Demo layouts
    | 'top-nav'                 // demo2 — horizontal navbar, no sidebar (default)
    | 'sidebar-fixed'           // demo1 — fixed collapsible sidebar + fixed header
    | 'navbar-collapsible'      // demo3 — navbar + optional collapsible sidebar
    | 'split-sidebar'           // demo4 — primary + secondary sidebar panels
    | 'navbar-sidebar'          // demo5 — navbar + collapsible sidebar
    | 'sidebar-tabs'            // demo6 — sidebar with primary tabs + secondary menu
    | 'mega-menu'               // demo7 — inline mega-menu header, no sidebar
    | 'sidebar-minimal'         // demo8 — clean single sidebar
    | 'mega-menu-navbar'        // demo9 — mega-menu header + horizontal navbar
    | 'sidebar-dual-menu'       // demo10 — icon strip + secondary menu sidebar
    // Backwards compat aliases
    | 'sidebar'                 // → sidebar-fixed
    | 'header';                 // → top-nav

interface AppLayoutProps extends BaseAppLayoutProps {
    variant?: AppVariant;
    [key: string]: unknown;
}

export function AppLayout({ variant = 'top-nav', ...props }: AppLayoutProps) {
    switch (variant) {
        case 'sidebar-fixed':
        case 'sidebar':
            return <SidebarFixedLayout {...(props as Parameters<typeof SidebarFixedLayout>[0])} />;
        case 'navbar-collapsible':
            return <NavbarCollapsibleLayout {...(props as Parameters<typeof NavbarCollapsibleLayout>[0])} />;
        case 'split-sidebar':
            return <SplitSidebarLayout {...(props as Parameters<typeof SplitSidebarLayout>[0])} />;
        case 'navbar-sidebar':
            return <NavbarSidebarLayout {...(props as Parameters<typeof NavbarSidebarLayout>[0])} />;
        case 'sidebar-tabs':
            return <SidebarTabsLayout {...(props as Parameters<typeof SidebarTabsLayout>[0])} />;
        case 'mega-menu':
            return <MegaMenuLayout {...(props as Parameters<typeof MegaMenuLayout>[0])} />;
        case 'sidebar-minimal':
            return <SidebarMinimalLayout {...(props as Parameters<typeof SidebarMinimalLayout>[0])} />;
        case 'mega-menu-navbar':
            return <MegaMenuNavbarLayout {...(props as Parameters<typeof MegaMenuNavbarLayout>[0])} />;
        case 'sidebar-dual-menu':
            return <SidebarDualMenuLayout {...(props as Parameters<typeof SidebarDualMenuLayout>[0])} />;
        case 'top-nav':
        case 'header':
        default:
            return <TopNavLayout {...(props as Parameters<typeof TopNavLayout>[0])} />;
    }
}
