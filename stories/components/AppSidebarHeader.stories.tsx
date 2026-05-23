import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebarHeader, AppShell, AppSidebar } from '@track-any-device/components';
import { mockUser, mockBreadcrumbs } from '../_mock-data';

const meta: Meta = {
    title: 'Components/App/AppSidebarHeader',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <AppShell variant="sidebar">
                <AppSidebar user={mockUser} />
                <Story />
            </AppShell>
        ),
    ],
};
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <AppSidebarHeader user={mockUser} /> };
export const WithBreadcrumbs: Story = { render: () => <AppSidebarHeader user={mockUser} breadcrumbs={mockBreadcrumbs} /> };
export const WithNotifications: Story = { render: () => <AppSidebarHeader user={mockUser} unreadCount={5} /> };
