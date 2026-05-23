import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout, ResetPasswordForm } from '@trackany-device/components';
import { useState } from 'react';

const meta: Meta = {
    title: 'Apps/Login/ResetPassword',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

function ResetPasswordPage() {
    const [data, setData] = useState({ token: 'abc123', email: 'ahmad@example.com', password: '', password_confirmation: '' });
    return (
        <AuthLayout variant="simple" title="Reset password" description="Enter your new password below">
            <ResetPasswordForm
                data={data}
                errors={{}}
                processing={false}
                onChange={(field, value) => setData((p) => ({ ...p, [field as string]: value }))}
                onSubmit={(e) => e.preventDefault()}
            />
        </AuthLayout>
    );
}

export const Default: Story = { render: () => <ResetPasswordPage /> };
