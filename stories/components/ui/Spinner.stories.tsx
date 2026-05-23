import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@trackany-device/components';

const meta: Meta<typeof Spinner> = {
    title: 'UI/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Spinner className="size-3" />
            <Spinner className="size-4" />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
        </div>
    ),
};

export const Colored: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Spinner className="text-primary" />
            <Spinner className="text-destructive" />
            <Spinner className="text-muted-foreground" />
        </div>
    ),
};
