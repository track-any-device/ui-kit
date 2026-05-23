import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from '@trackany-device/components';

const meta: Meta<typeof AuthLayout> = {
    title: 'Layouts/AuthLayout',
    component: AuthLayout,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['split', 'centered', 'simple', 'card'],
        },
    },
};
export default meta;
type Story = StoryObj<typeof AuthLayout>;

const Form = () => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="you@example.com" />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="••••••••" />
        </div>
        <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Sign in
        </button>
    </div>
);

export const Split: Story = {
    args: { variant: 'split', title: 'Welcome back', description: 'Sign in to your account' },
    render: (args) => <AuthLayout {...args}><Form /></AuthLayout>,
};

export const Centered: Story = {
    args: { variant: 'centered', title: 'Reset password', description: 'Enter your new password below' },
    render: (args) => <AuthLayout {...args}><Form /></AuthLayout>,
};

export const Simple: Story = {
    args: { variant: 'simple', title: 'Sign in', description: 'Enter your credentials to continue' },
    render: (args) => <AuthLayout {...args}><Form /></AuthLayout>,
};

export const CardVariant: Story = {
    args: { variant: 'card', title: 'Create account', description: 'Fill in your details to register' },
    render: (args) => <AuthLayout {...args}><Form /></AuthLayout>,
};
