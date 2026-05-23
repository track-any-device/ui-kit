import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout, OtpForm } from '@track-any-device/components';
import { useState } from 'react';

const meta: Meta = {
    title: 'Apps/Login/TwoFactorChallenge',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

function TwoFactorPage() {
    const [recovery, setRecovery] = useState(false);
    const [code, setCode] = useState('');
    return (
        <AuthLayout variant="simple" title="Two-factor authentication" description="Verify your identity to continue">
            <OtpForm
                code={code}
                errors={{}}
                processing={false}
                recovery={recovery}
                onCodeChange={setCode}
                onSubmit={(e) => e.preventDefault()}
                onToggleRecovery={() => setRecovery((r) => !r)}
            />
        </AuthLayout>
    );
}

export const Default: Story = { render: () => <TwoFactorPage /> };
