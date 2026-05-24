import type { Meta, StoryObj } from '@storybook/react';
import type { AuthLayoutVariant } from '@trackany-device/components';
import { AUTH_LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import VerifyEmailPage from '../../../src/pages/login/VerifyEmailPage';

const meta: Meta<{ authLayout: AuthLayoutVariant }> = {
    title: 'Apps/Login/VerifyEmail',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: AUTH_LAYOUT_ARG_TYPE,
    args: { authLayout: 'simple' },
};
export default meta;
type Story = StoryObj<{ authLayout: AuthLayoutVariant }>;

export const Default: Story = {
    render: ({ authLayout }) => (
        <VerifyEmailPage authLayout={authLayout} processing={false} />
    ),
};

export const WithStatus: Story = {
    render: ({ authLayout }) => (
        <VerifyEmailPage
            authLayout={authLayout}
            processing={false}
            status="A fresh verification link has been sent to your email address."
        />
    ),
};

export const Processing: Story = {
    render: ({ authLayout }) => (
        <VerifyEmailPage authLayout={authLayout} processing={true} />
    ),
};
