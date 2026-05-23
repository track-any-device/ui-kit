import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@track-any-device/components';

const meta: Meta<typeof Label> = {
    title: 'Controls/Label',
    component: Label,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    args: { children: 'Email address' },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const WithHtmlFor: Story = {
    render: () => (
        <div>
            <Label htmlFor="demo">Email address</Label>
            <input id="demo" type="email" className="mt-1 w-64 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
    ),
};
