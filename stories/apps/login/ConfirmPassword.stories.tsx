import type { Meta, StoryObj } from '@storybook/react';
import type { AuthLayoutVariant } from '@trackany-device/components';
import { useState } from 'react';
import { AUTH_LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import ConfirmPasswordPage from '../../../src/pages/login/ConfirmPasswordPage';


const meta: Meta<{ authLayout: AuthLayoutVariant }> = {
    title: 'Apps/Login/ConfirmPassword',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: AUTH_LAYOUT_ARG_TYPE,
    args: { authLayout: 'simple' },
};
export default meta;
type Story = StoryObj<{ authLayout: AuthLayoutVariant }>;

export const Default: Story = {
    render: ({ authLayout }) => {
        const [password, setPassword] = useState('');
        return (
            <ConfirmPasswordPage
                authLayout={authLayout}
                password={password}
                setPassword={setPassword}
                errors={{}}
                processing={false}
                title="Confirm password"
                description="This is a secure area — please re-enter your password"
            />
        );
    },
};

export const WithError: Story = {
    render: ({ authLayout }) => {
        const [password, setPassword] = useState('');
        return (
            <ConfirmPasswordPage
                authLayout={authLayout}
                password={password}
                setPassword={setPassword}
                errors={{ password: 'The password is incorrect.' }}
                processing={false}
                title="Confirm password"
                description="This is a secure area — please re-enter your password"
            />
        );
    },
};

export const Processing: Story = {
    render: ({ authLayout }) => {
        const [password, setPassword] = useState('');
        return (
            <ConfirmPasswordPage
                authLayout={authLayout}
                password={password}
                setPassword={setPassword}
                errors={{}}
                processing={true}
                title="Confirm password"
                description="This is a secure area — please re-enter your password"
            />
        );
    },
};
