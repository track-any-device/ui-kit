import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebarLayout } from '@trackany-device/components';
import { mockUser, mockTenant, mockBreadcrumbs } from '../_mock-data';

const meta: Meta = {
    title: 'Layouts/AppSidebarLayout',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const PageContent = () => (
    <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">Page Content</h1>
        <p className="text-muted-foreground">This area represents the main page body inside the sidebar layout.</p>
    </div>
);

export const Default: Story = {
    render: () => (
        <AppSidebarLayout user={mockUser} tenant={mockTenant}>
            <PageContent />
        </AppSidebarLayout>
    ),
};

export const WithBreadcrumbs: Story = {
    render: () => (
        <AppSidebarLayout user={mockUser} tenant={mockTenant} breadcrumbs={mockBreadcrumbs}>
            <PageContent />
        </AppSidebarLayout>
    ),
};

export const WithNotifications: Story = {
    render: () => (
        <AppSidebarLayout user={mockUser} tenant={mockTenant} unreadCount={4}>
            <PageContent />
        </AppSidebarLayout>
    ),
};

export const NoTenant: Story = {
    render: () => (
        <AppSidebarLayout user={mockUser}>
            <PageContent />
        </AppSidebarLayout>
    ),
};
