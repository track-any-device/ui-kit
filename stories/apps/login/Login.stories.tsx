import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout, LoginForm } from '@trackany-device/components';
import { useState } from 'react';

const meta: Meta = {
    title: 'Apps/Login/Login',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

function LoginPage({ status, canResetPassword = true, canRegister = true }: { status?: string; canResetPassword?: boolean; canRegister?: boolean }) {
    const [data, setData] = useState({ email: '', password: '', remember: false as boolean });
    const [errors] = useState<Record<string, string>>({});
    return (
        <AuthLayout title="Sign in" description="Enter your credentials to continue">
            <LoginForm
                data={data}
                errors={errors}
                processing={false}
                status={status}
                canResetPassword={canResetPassword}
                canRegister={canRegister}
                forgotPasswordUrl="/forgot-password"
                registerUrl="/register"
                onChange={(field, value) => setData((p) => ({ ...p, [field]: value }))}
                onSubmit={(e) => e.preventDefault()}
            />
        </AuthLayout>
    );
}

export const Default: Story = { render: () => <LoginPage /> };
export const WithStatus: Story = { render: () => <LoginPage status="Your session has expired. Please sign in again." /> };
export const NoRegister: Story = { render: () => <LoginPage canRegister={false} canResetPassword={false} /> };
export const Processing: Story = {
    render: () => (
        <AuthLayout title="Sign in" description="Enter your credentials to continue">
            <LoginForm
                data={{ email: 'ahmad@example.com', password: '••••••••', remember: false }}
                errors={{}}
                processing={true}
                canResetPassword
                canRegister
                forgotPasswordUrl="/forgot-password"
                registerUrl="/register"
                onChange={() => {}}
                onSubmit={(e) => e.preventDefault()}
            />
        </AuthLayout>
    ),
};
export const WithErrors: Story = {
    render: () => (
        <AuthLayout title="Sign in" description="Enter your credentials to continue">
            <LoginForm
                data={{ email: 'ahmad@example.com', password: 'wrong', remember: false }}
                errors={{ email: 'These credentials do not match our records.' }}
                processing={false}
                canResetPassword
                canRegister
                forgotPasswordUrl="/forgot-password"
                registerUrl="/register"
                onChange={() => {}}
                onSubmit={(e) => e.preventDefault()}
            />
        </AuthLayout>
    ),
};
