import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout, ForgotPasswordForm } from '@track-any-device/components';
import { useState } from 'react';

const meta: Meta = {
    title: 'Apps/Login/ForgotPassword',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

function ForgotPasswordPage({ status }: { status?: string }) {
    const [data, setData] = useState({ email: '' });
    return (
        <AuthLayout variant="simple" title="Forgot password?" description="We'll email you a reset link">
            <ForgotPasswordForm
                data={data}
                errors={{}}
                processing={false}
                status={status}
                loginUrl="/login"
                onChange={(field, value) => setData((p) => ({ ...p, [field]: value }))}
                onSubmit={(e) => e.preventDefault()}
            />
        </AuthLayout>
    );
}

export const Default: Story = { render: () => <ForgotPasswordPage /> };
export const WithSuccess: Story = { render: () => <ForgotPasswordPage status="A reset link has been sent to your email address." /> };
