import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@trackany-device/components';

const meta: Meta<typeof Separator> = {
    title: 'UI/Separator',
    component: Separator,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
    render: () => (
        <div className="p-8 w-64">
            <p className="text-sm">Above the separator</p>
            <Separator className="my-4" />
            <p className="text-sm">Below the separator</p>
        </div>
    ),
};

export const Vertical: Story = {
    render: () => (
        <div className="p-8 flex items-center gap-4 h-16">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Right</span>
        </div>
    ),
};
