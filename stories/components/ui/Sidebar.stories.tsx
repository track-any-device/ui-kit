import type { Meta, StoryObj } from '@storybook/react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@trackany-device/components';
import { Home, LayoutDashboard, MapPin, Settings, Users } from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
    title: 'UI/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const navItems = [
    { title: 'Dashboard', href: '#', icon: LayoutDashboard },
    { title: 'Live Map', href: '#', icon: MapPin },
    { title: 'Assignees', href: '#', icon: Users },
    { title: 'Settings', href: '#', icon: Settings },
];

export const Default: Story = {
    render: () => (
        <SidebarProvider defaultOpen={true}>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2 py-1">
                        <Home className="size-5 text-sidebar-foreground" />
                        <span className="font-semibold text-sidebar-foreground">Fleet Tracking</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={item.title === 'Dashboard'}
                                        >
                                            <a href={item.href}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <div className="px-2 py-1 text-xs text-sidebar-foreground/60">
                        v1.0.0
                    </div>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-14 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                    <h1 className="font-semibold">Dashboard</h1>
                </header>
                <div className="flex-1 p-6">
                    <p className="text-sm text-muted-foreground">
                        Page content goes here. Toggle the sidebar with the button above or ⌘B.
                    </p>
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
};

export const Collapsed: Story = {
    render: () => (
        <SidebarProvider defaultOpen={false}>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2 py-1">
                        <Home className="size-5 text-sidebar-foreground" />
                        <span className="font-semibold text-sidebar-foreground">Fleet Tracking</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                        >
                                            <a href={item.href}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-14 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                    <h1 className="font-semibold">Dashboard</h1>
                </header>
                <div className="flex-1 p-6">
                    <p className="text-sm text-muted-foreground">
                        Sidebar is collapsed to icon-only mode.
                    </p>
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
};
