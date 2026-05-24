import type { Meta, StoryObj } from '@storybook/react';
import type { AuthLayoutVariant } from '@trackany-device/components';
import { useState } from 'react';
import { AUTH_LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import ForgotPasswordPage from '../../../src/pages/login/ForgotPasswordPage';

const meta: Meta<{ authLayout: AuthLayoutVariant }> = {
    title: 'Apps/Login/ForgotPassword',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: AUTH_LAYOUT_ARG_TYPE,
    args: { authLayout: 'simple' },
};
export default meta;
type Story = StoryObj<{ authLayout: AuthLayoutVariant }>;

export const Default: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: '' });
        return (
            <ForgotPasswordPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={false}
            />
        );
    },
};

export const WithSuccess: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: 'ahmad@example.com' });
        return (
            <ForgotPasswordPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={false}
                status="A reset link has been sent to your email address."
            />
        );
    },
};

export const Processing: Story = {
    render: ({ authLayout }) => {
        const [data, setData] = useState({ email: 'ahmad@example.com' });
        return (
            <ForgotPasswordPage
                authLayout={authLayout}
                data={data}
                setData={setData}
                errors={{}}
                processing={true}
            />
        );
    },
};
