import type { Meta, StoryObj } from '@storybook/react';
import type { AuthLayoutVariant } from '@trackany-device/components';
import { useState } from 'react';
import { AUTH_LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import LoginPage from '../../../src/pages/login/LoginPage';

const meta: Meta<{ authLayout: AuthLayoutVariant }> = {
    title: 'Apps/Login/Login',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: AUTH_LAYOUT_ARG_TYPE,
    args: { authLayout: 'split' },
};
export default meta;
type Story = StoryObj<{ authLayout: AuthLayoutVariant }>;

export const Default: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: '', password: '', remember: false as boolean });
        return (
            <LoginPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={false}
            />
        );
    },
};

export const WithStatus: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: '', password: '', remember: false as boolean });
        return (
            <LoginPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={false}
                status="Your session has expired. Please sign in again."
            />
        );
    },
};

export const WithErrors: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: 'ahmad@example.com', password: 'wrong', remember: false as boolean });
        return (
            <LoginPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{ email: 'These credentials do not match our records.' }}
                processing={false}
            />
        );
    },
};

export const Processing: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: 'ahmad@example.com', password: '••••••••', remember: false as boolean });
        return (
            <LoginPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={true}
            />
        );
    },
};

export const NoRegister: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: '', password: '', remember: false as boolean });
        return (
            <LoginPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={false}
                canResetPassword={false}
                canRegister={false}
            />
        );
    },
};
