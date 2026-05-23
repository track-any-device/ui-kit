import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBell } from '@trackany-device/components';

const meta: Meta<typeof NotificationBell> = {
    title: 'Components/App/NotificationBell',
    component: NotificationBell,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof NotificationBell>;

export const NoUnread: Story = { args: { unreadCount: 0 } };
export const WithUnread: Story = { args: { unreadCount: 3 } };
export const ManyUnread: Story = { args: { unreadCount: 142 } };
