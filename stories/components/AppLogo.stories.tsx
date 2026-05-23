import type { Meta, StoryObj } from '@storybook/react';
import { AppLogo } from '@track-any-device/components';

const meta: Meta = { title: 'Components/App/AppLogo', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <AppLogo /> };
export const WithClass: Story = { render: () => <AppLogo className="text-primary" /> };
