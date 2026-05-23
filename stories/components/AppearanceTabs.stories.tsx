import type { Meta, StoryObj } from '@storybook/react';
import { AppearanceTabs } from '@track-any-device/components';

const meta: Meta = { title: 'Components/App/AppearanceTabs', tags: ['autodocs'], parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <AppearanceTabs /> };
