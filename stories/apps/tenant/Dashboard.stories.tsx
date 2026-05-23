import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebarLayout } from '@trackany-device/components';
import { StatCard } from '@trackany-device/components';
import { mockUser, mockTenant } from '../../_mock-data';
import { MonitorPlay, Users, AlertTriangle, Battery } from 'lucide-react';

const meta: Meta = {
    title: 'Apps/Tenant/Dashboard',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <AppSidebarLayout
            user={mockUser}
            tenant={mockTenant}
            breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}
        >
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={Users} label="Total Assignees" value="248" description="12 divisions" />
                    <StatCard icon={MonitorPlay} label="Online Now" value="187" description="75% of fleet" />
                    <StatCard icon={AlertTriangle} label="Active Incidents" value="6" description="2 critical" />
                    <StatCard icon={Battery} label="Low Battery" value="14" description="Below 20%" />
                </div>
                <div className="rounded-xl border border-border bg-card p-4 h-64 flex items-center justify-center text-muted-foreground">
                    Live map placeholder — Google Maps renders here
                </div>
            </div>
        </AppSidebarLayout>
    ),
};

export const WithNotifications: Story = {
    render: () => (
        <AppSidebarLayout user={mockUser} tenant={mockTenant} unreadCount={7} breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={Users} label="Total Assignees" value="248" description="12 divisions" />
                    <StatCard icon={MonitorPlay} label="Online Now" value="187" description="75% of fleet" />
                    <StatCard icon={AlertTriangle} label="Active Incidents" value="6" description="2 critical" />
                    <StatCard icon={Battery} label="Low Battery" value="14" description="Below 20%" />
                </div>
            </div>
        </AppSidebarLayout>
    ),
};
