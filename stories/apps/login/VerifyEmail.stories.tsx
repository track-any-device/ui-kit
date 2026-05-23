import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout, VerifyEmailForm } from '@trackany-device/components';

const meta: Meta = {
    title: 'Apps/Login/VerifyEmail',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <AuthLayout variant="simple" title="Verify your email" description="Check your inbox for a verification link">
            <VerifyEmailForm processing={false} logoutUrl="/logout" onSubmit={(e) => e.preventDefault()} />
        </AuthLayout>
    ),
};
export const WithStatus: Story = {
    render: () => (
        <AuthLayout variant="simple" title="Verify your email" description="Check your inbox for a verification link">
            <VerifyEmailForm processing={false} status="A fresh verification link has been sent." logoutUrl="/logout" onSubmit={(e) => e.preventDefault()} />
        </AuthLayout>
    ),
};
