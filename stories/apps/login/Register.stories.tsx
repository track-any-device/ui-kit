import type { Meta, StoryObj } from '@storybook/react';
import type { AuthLayoutVariant } from '@trackany-device/components';
import { useState } from 'react';
import { AUTH_LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import RegisterPage from '../../../src/pages/login/RegisterPage';

const meta: Meta<{ authLayout: AuthLayoutVariant }> = {
    title: 'Apps/Login/Register',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: AUTH_LAYOUT_ARG_TYPE,
    args: { authLayout: 'split' },
};
export default meta;
type Story = StoryObj<{ authLayout: AuthLayoutVariant }>;

export const Default: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
        return (
            <RegisterPage
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
        const [data, setData] = useState({ name: 'Ahmad', email: 'not-an-email', password: 'short', password_confirmation: '' });
        return (
            <RegisterPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{
                    email: 'The email must be a valid email address.',
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
        const [data, setData] = useState({ name: 'Ahmad Faryab', email: 'ahmad@example.com', password: '••••••••', password_confirmation: '••••••••' });
        return (
            <RegisterPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={true}
            />
        );
    },
};
