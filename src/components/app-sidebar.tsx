import { PlatformLink } from '../platform/context';
import {
    AlertTriangle, History, LayoutGrid, MapPin, MonitorPlay,
    Settings, Shield, Smartphone, Terminal, Users, UserSquare2, Workflow,
} from 'lucide-react';
import AppLogo from './app-logo';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from './ui/sidebar';
import type { NavItem } from '../types/navigation';
import type { User } from '../types/auth';

export const DEFAULT_TENANT_NAV: NavItem[] = [
    { title: 'Live Monitoring', href: '/map', icon: MonitorPlay },
    { title: 'Assignees', href: '/assignees', icon: Users },
    { title: 'Alerts & Incidents', href: '/incidents', icon: AlertTriangle },
    { title: 'Beats & Boundaries', href: '/beats', icon: MapPin },
    { title: 'Assignments', href: '/assignments', icon: Shield },
    { title: 'Playback History', href: '/playback', icon: History },
    { title: 'Devices', href: '/devices', icon: Smartphone },
    { title: 'Supervisors & Teams', href: '/supervisors', icon: UserSquare2 },
    { title: 'Workflows', href: '/workflows', icon: Workflow },
    { title: 'Device Logs', href: '/device-logs', icon: Terminal },
    { title: 'Settings', href: '/settings/organization', icon: Settings },
];

export function AppSidebar({
    navItems,
    dashboardItem,
    user,
    tenant,
    settingsUrl = '/settings/profile',
    logoutUrl = '/logout',
    dashboardHref = '/dashboard',
}: {
    navItems?: NavItem[];
    dashboardItem?: NavItem;
    user?: User | null;
    tenant?: { display_name?: string | null; sub_brand?: string | null } | null;
    settingsUrl?: string;
    logoutUrl?: string;
    dashboardHref?: string;
}) {
    const items = navItems ?? DEFAULT_TENANT_NAV;
    const dashboard: NavItem = dashboardItem ?? { title: 'Dashboard', href: dashboardHref, icon: LayoutGrid };
    const allItems = [dashboard, ...items];

    const appName =
        (typeof window !== 'undefined' && (window as any).AppConfig?.appName) || 'Fleet Tracking';
    const displayName = tenant?.display_name ?? appName;
    const subBrand = tenant?.sub_brand ?? null;

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className="mb-4 pt-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar-accent">
                            <PlatformLink
                                href={dashboardHref}
                                className="flex-direction-col mx-auto h-[120px] max-w-[240px] items-center justify-center gap-2 rounded-lg bg-white/100 px-3 py-4 text-sm font-medium group-data-[collapsible=icon]:hidden hover:bg-white/90"
                            >
                                <AppLogo />
                            </PlatformLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={allItems} />
            </SidebarContent>

            <SidebarFooter>
                <div className="border-t border-sidebar-border px-3 py-3 group-data-[collapsible=icon]:hidden">
                    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-sidebar-foreground/60">
                        {[['Terms', '/terms'], ['Privacy', '/privacy'], ['Cookies', '/cookies']].map(([label, href]) => (
                            <li key={label}>
                                <a href={href} className="hover:text-sidebar-foreground" target="_blank" rel="noopener noreferrer">
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 text-[11px] text-sidebar-foreground/40">
                        © {new Date().getFullYear()} {appName}. All rights reserved.
                    </p>
                </div>

                <div className="border-t border-sidebar-border px-3 py-3 group-data-[collapsible=icon]:hidden">
                    <p className="text-[11px] leading-tight text-sidebar-foreground/60">{displayName}</p>
                    {subBrand && (
                        <p className="mt-0.5 text-[11px] text-sidebar-foreground/40">{subBrand}</p>
                    )}
                </div>

                {user && (
                    <NavUser user={user} settingsUrl={settingsUrl} logoutUrl={logoutUrl} />
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
