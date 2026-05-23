import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@track-any-device/components';

const meta: Meta<typeof Button> = {
    title: 'Controls/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    args: { children: 'Click me', onClick: () => {} },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete' } };

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
};

export const Loading: Story = { args: { loading: true, children: 'Signing in…' } };
export const FullWidth: Story = {
    decorators: [Story => <div className="w-80"><Story /></div>],
    args: { fullWidth: true },
};
export const Disabled: Story = { args: { disabled: true } };
