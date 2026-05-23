import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@trackany-device/components';

const meta: Meta<typeof Skeleton> = {
    title: 'UI/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
    render: () => (
        <div className="p-8 space-y-3 w-80">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    ),
};

export const Card: Story = {
    render: () => (
        <div className="p-8 w-80 space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    ),
};

export const Avatar: Story = {
    render: () => (
        <div className="p-8 flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
    ),
};
