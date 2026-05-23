import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout, ConfirmPasswordForm } from '@track-any-device/components';
import { useState } from 'react';

const meta: Meta = {
    title: 'Apps/Login/ConfirmPassword',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

function ConfirmPasswordPage() {
    const [password, setPassword] = useState('');
    return (
        <AuthLayout variant="simple" title="Confirm password" description="This is a secure area — please re-enter your password">
            <ConfirmPasswordForm
                password={password}
                errors={{}}
                processing={false}
                onChange={setPassword}
                onSubmit={(e) => e.preventDefault()}
            />
        </AuthLayout>
    );
}

export const Default: Story = { render: () => <ConfirmPasswordPage /> };
