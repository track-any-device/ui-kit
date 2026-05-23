import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OtpForm } from '@track-any-device/components';

const meta: Meta<typeof OtpForm> = {
    title: 'Elements/OtpForm',
    component: OtpForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [
        Story => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
};
export default meta;
type Story = StoryObj<typeof OtpForm>;

function Controlled(args: Partial<React.ComponentProps<typeof OtpForm>>) {
    const [code, setCode] = useState('');
    const [recovery, setRecovery] = useState(args.recovery ?? false);
    return (
        <OtpForm
            code={code}
            errors={{}}
            recovery={recovery}
            onCodeChange={setCode}
            onSubmit={e => e.preventDefault()}
            onToggleRecovery={() => setRecovery(r => !r)}
            {...args}
        />
    );
}

export const Default: Story = {
    render: args => <Controlled {...args} />,
};

export const RecoveryMode: Story = {
    render: args => <Controlled recovery={true} {...args} />,
};

export const WithError: Story = {
    render: args => (
        <Controlled errors={{ code: 'The provided two-factor authentication code was invalid.' }} {...args} />
    ),
};

export const Processing: Story = {
    render: args => <Controlled processing={true} {...args} />,
};
