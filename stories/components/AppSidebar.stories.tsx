import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebar, AppShell } from '@track-any-device/components';
import { mockUser, mockTenant } from '../_mock-data';

const meta: Meta = {
    title: 'Components/App/AppSidebar',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <AppShell variant="sidebar">
                <Story />
                <main className="flex-1 p-8 text-muted-foreground">← Sidebar on the left</main>
            </AppShell>
        ),
    ],
};
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <AppSidebar user={mockUser} tenant={mockTenant} /> };
export const NoTenant: Story = { render: () => <AppSidebar user={mockUser} /> };
export const NoUser: Story = { render: () => <AppSidebar /> };
