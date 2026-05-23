import type { Meta, StoryObj } from '@storybook/react';
import { UserInfo } from '@track-any-device/components';
import { mockUser } from '../_mock-data';

const meta: Meta<typeof UserInfo> = { title: 'Components/App/UserInfo', component: UserInfo, tags: ['autodocs'], parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj<typeof UserInfo>;

export const Default: Story = { args: { user: mockUser } };
export const WithEmail: Story = { args: { user: mockUser, showEmail: true } };
