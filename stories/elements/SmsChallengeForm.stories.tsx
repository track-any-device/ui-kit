import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SmsChallengeForm } from '@track-any-device/components';

const meta: Meta<typeof SmsChallengeForm> = {
    title: 'Elements/SmsChallengeForm',
    component: SmsChallengeForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SmsChallengeForm>;

function Controlled(args: Partial<React.ComponentProps<typeof SmsChallengeForm>>) {
    const [otp, setOtp] = useState('');
    return (
        <SmsChallengeForm
            otp={otp}
            errors={{}}
            otpPhone="+92 300 1234567"
            otpSent
            onOtpChange={setOtp}
            onSubmit={e => e.preventDefault()}
            onResend={() => {}}
            {...args}
        />
    );
}

export const Default: Story = { render: args => <Controlled {...args} /> };

export const CodeEntered: Story = {
    render: args => <Controlled {...args} />,
    play: async () => {},
};

export const WithError: Story = {
    render: args => (
        <Controlled errors={{ otp: 'The provided two-factor authentication code was invalid.' }} {...args} />
    ),
};

export const SendError: Story = {
    render: args => (
        <Controlled sendError="Failed to send SMS. Please try again." {...args} />
    ),
};

export const ResendProcessing: Story = {
    render: args => <Controlled resendProcessing {...args} />,
};

export const Processing: Story = {
    render: args => <Controlled processing {...args} />,
};
