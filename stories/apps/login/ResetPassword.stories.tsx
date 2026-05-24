import type { Meta, StoryObj } from '@storybook/react';
import type { AuthLayoutVariant } from '@trackany-device/components';
import { useState } from 'react';
import { AUTH_LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import ResetPasswordPage from '../../../src/pages/login/ResetPasswordPage';

const meta: Meta<{ authLayout: AuthLayoutVariant }> = {
    title: 'Apps/Login/ResetPassword',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: AUTH_LAYOUT_ARG_TYPE,
    args: { authLayout: 'simple' },
};
export default meta;
type Story = StoryObj<{ authLayout: AuthLayoutVariant }>;

export const Default: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: 'ahmad@example.com', password: '', password_confirmation: '' });
        return (
            <ResetPasswordPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={false}
            />
        );
    },
};

export const WithErrors: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: 'ahmad@example.com', password: 'short', password_confirmation: 'mismatch' });
        return (
            <ResetPasswordPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{
                    password: 'The password must be at least 8 characters.',
                    password_confirmation: 'The password confirmation does not match.',
                }}
                processing={false}
            />
        );
    },
};

export const Processing: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: 'ahmad@example.com', password: '••••••••', password_confirmation: '••••••••' });
        return (
            <ResetPasswordPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={true}
            />
        );
    },
};
