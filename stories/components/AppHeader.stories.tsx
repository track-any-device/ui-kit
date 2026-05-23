import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from '@trackany-device/components';
import { LayoutGrid, MonitorPlay, AlertTriangle } from 'lucide-react';
import { mockUser, mockBreadcrumbs } from '../_mock-data';

const navItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Live Monitoring', href: '/map', icon: MonitorPlay },
    { title: 'Incidents', href: '/incidents', icon: AlertTriangle },
];

const meta: Meta = {
    title: 'Components/App/AppHeader',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <AppHeader user={mockUser} navItems={navItems} /> };
export const WithBreadcrumbs: Story = { render: () => <AppHeader user={mockUser} navItems={navItems} breadcrumbs={mockBreadcrumbs} /> };
export const WithNotifications: Story = { render: () => <AppHeader user={mockUser} navItems={navItems} unreadCount={7} /> };
export const NoUser: Story = { render: () => <AppHeader navItems={navItems} /> };
