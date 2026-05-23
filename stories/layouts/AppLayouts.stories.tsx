import type { Meta, StoryObj } from '@storybook/react';
import {
    TopNavLayout, SidebarFixedLayout, NavbarCollapsibleLayout,
    SplitSidebarLayout, NavbarSidebarLayout, SidebarTabsLayout,
    MegaMenuLayout, SidebarMinimalLayout, MegaMenuNavbarLayout, SidebarDualMenuLayout,
    WorkspaceSidebarLayout, MailLayout, AIChatLayout, CalendarSidebarLayout, FocusSidebarLayout,
} from '@trackany-device/components';
import type { NavItem } from '@trackany-device/components';

const MOCK_NAV: NavItem[] = [
    { title: 'Dashboard', url: '/dashboard', isActive: true },
    { title: 'Vehicles', url: '/vehicles', items: [
        { title: 'All Vehicles', url: '/vehicles' },
        { title: 'Live Map', url: '/vehicles/map' },
        { title: 'Add Vehicle', url: '/vehicles/new' },
    ]},
    { title: 'Drivers', url: '/drivers' },
    { title: 'Trips', url: '/trips' },
    { title: 'Alerts', url: '/alerts' },
    { title: 'Reports', url: '/reports' },
    { title: 'Settings', url: '/settings' },
];

const MOCK_USER = { name: 'Ahmad Faryab', email: 'ahmad@suthra.pk', avatar: '' };

const Page = () => <div className="p-6"><h1 className="text-xl font-semibold text-mono">Page Content</h1><p className="text-muted-foreground mt-2">This is where the page content renders.</p></div>;

const meta: Meta = { title: 'Layouts/App Layouts', parameters: { layout: 'fullscreen' } };
export default meta;

type Story = StoryObj;

export const TopNav: Story = {
    render: () => (
        <TopNavLayout navItems={MOCK_NAV} currentUrl="/vehicles" user={MOCK_USER} title="Vehicles" appName="Suthra Punjab" logoHref="/" copyright="Suthra Punjab Fleet" footerLinks={[{ label: 'Support', href: '#' }]}>
            <Page />
        </TopNavLayout>
    ),
};

export const SidebarFixed: Story = {
    render: () => (
        <SidebarFixedLayout navItems={MOCK_NAV} currentUrl="/dashboard" user={MOCK_USER} title="Dashboard" appName="Suthra Punjab">
            <Page />
        </SidebarFixedLayout>
    ),
};

export const NavbarCollapsible: Story = {
    render: () => (
        <NavbarCollapsibleLayout navItems={MOCK_NAV} currentUrl="/trips" user={MOCK_USER} title="Trips" appName="Suthra Punjab">
            <Page />
        </NavbarCollapsibleLayout>
    ),
};

export const SplitSidebar: Story = {
    render: () => (
        <SplitSidebarLayout navItems={MOCK_NAV} currentUrl="/drivers" user={MOCK_USER} title="Drivers">
            <Page />
        </SplitSidebarLayout>
    ),
};

export const NavbarSidebar: Story = {
    render: () => (
        <NavbarSidebarLayout navItems={MOCK_NAV} currentUrl="/alerts" user={MOCK_USER} title="Alerts">
            <Page />
        </NavbarSidebarLayout>
    ),
};

export const SidebarTabs: Story = {
    render: () => (
        <SidebarTabsLayout
            primaryNavItems={[
                { title: 'Fleet', url: '/fleet', items: MOCK_NAV.slice(0, 4) },
                { title: 'Admin', url: '/admin', items: MOCK_NAV.slice(4) },
            ]}
            navItems={MOCK_NAV}
            currentUrl="/dashboard"
            user={MOCK_USER}
        >
            <Page />
        </SidebarTabsLayout>
    ),
};

export const MegaMenu: Story = {
    render: () => (
        <MegaMenuLayout navItems={MOCK_NAV} currentUrl="/reports" user={MOCK_USER} title="Reports">
            <Page />
        </MegaMenuLayout>
    ),
};

export const SidebarMinimal: Story = {
    render: () => (
        <SidebarMinimalLayout navItems={MOCK_NAV} currentUrl="/settings" user={MOCK_USER} title="Settings">
            <Page />
        </SidebarMinimalLayout>
    ),
};

export const MegaMenuNavbar: Story = {
    render: () => (
        <MegaMenuNavbarLayout navItems={MOCK_NAV} currentUrl="/dashboard" user={MOCK_USER} title="Dashboard">
            <Page />
        </MegaMenuNavbarLayout>
    ),
};

export const SidebarDualMenu: Story = {
    render: () => (
        <SidebarDualMenuLayout
            primaryNavItems={[
                { title: 'Fleet', url: '/fleet', items: MOCK_NAV.slice(0, 4) },
                { title: 'Admin', url: '/admin', items: MOCK_NAV.slice(4) },
            ]}
            navItems={MOCK_NAV}
            currentUrl="/dashboard"
            user={MOCK_USER}
        >
            <Page />
        </SidebarDualMenuLayout>
    ),
};

export const WorkspaceSidebar: Story = {
    render: () => (
        <WorkspaceSidebarLayout
            navItems={MOCK_NAV}
            workspaces={[{ id: 'fleet', name: 'Fleet', href: '/' }, { id: 'admin', name: 'Admin', href: '/admin' }]}
            activeWorkspace="fleet"
            currentUrl="/dashboard"
            user={MOCK_USER}
        >
            <Page />
        </WorkspaceSidebarLayout>
    ),
};

export const Mail: Story = {
    render: () => (
        <MailLayout
            navItems={[{ title: 'Inbox', url: '/mail/inbox' }, { title: 'Sent', url: '/mail/sent' }, { title: 'Drafts', url: '/mail/drafts' }]}
            currentUrl="/mail/inbox"
            user={MOCK_USER}
            listPanel={<div className="p-4 space-y-2">{Array.from({ length: 5 }, (_, i) => <div key={i} className="p-3 rounded-lg border bg-background hover:bg-accent cursor-pointer"><p className="text-sm font-medium">Message {i + 1}</p><p className="text-xs text-muted-foreground">Preview text…</p></div>)}</div>}
        >
            <div className="p-6"><p className="text-muted-foreground">Select a message</p></div>
        </MailLayout>
    ),
};

export const AIChat: Story = {
    render: () => (
        <AIChatLayout
            chatHistory={[{ id: '1', title: 'Fleet analysis', href: '/ai/1', date: 'Today' }, { id: '2', title: 'Route optimisation', href: '/ai/2', date: 'Yesterday' }]}
            currentUrl="/ai/1"
            user={MOCK_USER}
        >
            <div className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Chat area</p></div>
        </AIChatLayout>
    ),
};

export const CalendarSidebar: Story = {
    render: () => (
        <CalendarSidebarLayout
            categories={[{ name: 'Fleet Events', color: '#16a34a' }, { name: 'Maintenance', color: '#ef4444' }, { name: 'Holidays', color: '#3b82f6' }]}
            currentUrl="/calendar"
            user={MOCK_USER}
            title="Calendar"
        >
            <div className="p-6"><p className="text-muted-foreground">Calendar grid</p></div>
        </CalendarSidebarLayout>
    ),
};

export const FocusSidebar: Story = {
    render: () => (
        <FocusSidebarLayout
            navItems={[{ title: 'Today', url: '/tasks/today' }, { title: 'Upcoming', url: '/tasks/upcoming' }, { title: 'All Tasks', url: '/tasks' }, { title: 'Completed', url: '/tasks/done' }]}
            tags={[{ name: 'Urgent', count: 3, href: '/tasks?tag=urgent' }, { name: 'Fleet', count: 7, href: '/tasks?tag=fleet' }]}
            currentUrl="/tasks/today"
            user={MOCK_USER}
        >
            <div className="p-6"><p className="text-muted-foreground">Task list</p></div>
        </FocusSidebarLayout>
    ),
};
