import type { Meta, StoryObj } from '@storybook/react';
import type { AuthLayoutVariant } from '@trackany-device/components';
import { useState } from 'react';
import { AUTH_LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import TwoFactorChallengePage from '../../../src/pages/login/TwoFactorChallengePage';

const meta: Meta<{ authLayout: AuthLayoutVariant }> = {
    title: 'Apps/Login/TwoFactorChallenge',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: AUTH_LAYOUT_ARG_TYPE,
    args: { authLayout: 'simple' },
};
export default meta;
type Story = StoryObj<{ authLayout: AuthLayoutVariant }>;

export const Default: Story = {
    render: ({ authLayout }) => {
        const [code, setCode] = useState('');
        const [recovery, setRecovery] = useState(false);
        return (
            <TwoFactorChallengePage
                authLayout={authLayout}
                code={code}
                setCode={setCode}
                recovery={recovery}
                setRecovery={setRecovery}
                errors={{}}
                processing={false}
            />
        );
    },
};

export const RecoveryMode: Story = {
    render: ({ authLayout }) => {
        const [code, setCode] = useState('');
        const [recovery, setRecovery] = useState(true);
        return (
            <TwoFactorChallengePage
                authLayout={authLayout}
                code={code}
                setCode={setCode}
                recovery={recovery}
                setRecovery={setRecovery}
                errors={{}}
                processing={false}
                title="Two-factor authentication"
                description="Enter a recovery code"
            />
        );
    },
};

export const WithError: Story = {
    render: ({ authLayout }) => {
        const [code, setCode] = useState('123456');
        const [recovery, setRecovery] = useState(false);
        return (
            <TwoFactorChallengePage
                authLayout={authLayout}
                code={code}
                setCode={setCode}
                recovery={recovery}
                setRecovery={setRecovery}
                errors={{ code: 'The provided two factor authentication code was invalid.' }}
                processing={false}
            />
        );
    },
};

export const Processing: Story = {
    render: ({ authLayout }) => {
        const [code, setCode] = useState('123456');
        const [recovery, setRecovery] = useState(false);
        return (
            <TwoFactorChallengePage
                authLayout={authLayout}
                code={code}
                setCode={setCode}
                recovery={recovery}
                setRecovery={setRecovery}
                errors={{}}
                processing={true}
            />
        );
    },
};
