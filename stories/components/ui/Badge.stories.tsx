import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@track-any-device/components';

const meta: Meta<typeof Badge> = {
    title: 'UI/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    args: { children: 'Badge' },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { variant: 'default' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Destructive' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } };

export const AllVariants: Story = {
    render: () => (
        <div className="flex items-center gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    ),
};
