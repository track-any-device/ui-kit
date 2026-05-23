import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout, RegisterForm } from '@track-any-device/components';
import { useState } from 'react';

const meta: Meta = {
    title: 'Apps/Login/Register',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

function RegisterPage() {
    const [data, setData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [errors] = useState<Record<string, string>>({});
    return (
        <AuthLayout title="Create an account" description="Fill in your details to get started">
            <RegisterForm
                data={data}
                errors={errors}
                processing={false}
                loginUrl="/login"
                onChange={(field, value) => setData((p) => ({ ...p, [field]: value }))}
                onSubmit={(e) => e.preventDefault()}
            />
        </AuthLayout>
    );
}

export const Default: Story = { render: () => <RegisterPage /> };
export const WithErrors: Story = {
    render: () => (
        <AuthLayout title="Create an account" description="Fill in your details to get started">
            <RegisterForm
                data={{ name: 'Ahmad', email: 'not-an-email', password: 'short', password_confirmation: '' }}
                errors={{ email: 'The email must be a valid email address.', password: 'The password must be at least 8 characters.', password_confirmation: 'The password confirmation does not match.' }}
                processing={false}
                loginUrl="/login"
                onChange={() => {}}
                onSubmit={(e) => e.preventDefault()}
            />
        </AuthLayout>
    ),
};
