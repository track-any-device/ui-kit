import type { Meta, StoryObj } from '@storybook/react';
import { AppHeaderLayout } from '@track-any-device/components';
import { LayoutGrid, MonitorPlay, AlertTriangle, MapPin } from 'lucide-react';
import { mockUser, mockBreadcrumbs } from '../_mock-data';

const navItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Live Monitoring', href: '/map', icon: MonitorPlay },
    { title: 'Incidents', href: '/incidents', icon: AlertTriangle },
    { title: 'Beats', href: '/beats', icon: MapPin },
];

const meta: Meta = {
    title: 'Layouts/AppHeaderLayout',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const PageContent = () => (
    <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">Page Content</h1>
        <p className="text-muted-foreground">This area represents the main page body inside the header layout.</p>
    </div>
);

export const Default: Story = {
    render: () => (
        <AppHeaderLayout user={mockUser} navItems={navItems}>
            <PageContent />
        </AppHeaderLayout>
    ),
};

export const WithBreadcrumbs: Story = {
    render: () => (
        <AppHeaderLayout user={mockUser} navItems={navItems} breadcrumbs={mockBreadcrumbs}>
            <PageContent />
        </AppHeaderLayout>
    ),
};

export const WithNotifications: Story = {
    render: () => (
        <AppHeaderLayout user={mockUser} navItems={navItems} unreadCount={9}>
            <PageContent />
        </AppHeaderLayout>
    ),
};
