import type { Meta, StoryObj } from '@storybook/react';
import { AuthBrandedLayout, AuthClassicLayout } from '@trackany-device/components';

const Logo = () => <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">SP</div>;

const meta: Meta = { title: 'Layouts/Auth Layouts', parameters: { layout: 'fullscreen' } };
export default meta;

type Story = StoryObj;

export const Branded: Story = {
    render: () => (
        <AuthBrandedLayout logo={<Logo />} brandTitle="Secure Fleet Access" brandSubtitle="Sign in to manage your fleet operations.">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-mono">Sign in</h2>
                <div className="space-y-2">
                    <input type="email" placeholder="Email" className="w-full border border-input rounded-md px-3 py-2 text-sm" />
                    <input type="password" placeholder="Password" className="w-full border border-input rounded-md px-3 py-2 text-sm" />
                </div>
                <button className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium">Sign in</button>
            </div>
        </AuthBrandedLayout>
    ),
};

export const Classic: Story = {
    render: () => (
        <AuthClassicLayout logo={<Logo />}>
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-mono">Forgot password</h2>
                <p className="text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
                <input type="email" placeholder="Email" className="w-full border border-input rounded-md px-3 py-2 text-sm" />
                <button className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium">Send reset link</button>
            </div>
        </AuthClassicLayout>
    ),
};
