import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '@trackany-device/components';

const meta: Meta<typeof Breadcrumbs> = { title: 'Components/App/Breadcrumbs', component: Breadcrumbs, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Single: Story = { args: { breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }] } };
export const Deep: Story = { args: { breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Settings', href: '/settings' }, { title: 'Profile', href: '/settings/profile' }] } };
export const Empty: Story = { args: { breadcrumbs: [] } };
