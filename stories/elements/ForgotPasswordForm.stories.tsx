import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ForgotPasswordForm } from '@track-any-device/components';
import type { ForgotPasswordFormData } from '@track-any-device/components';

const meta: Meta<typeof ForgotPasswordForm> = {
    title: 'Elements/ForgotPasswordForm',
    component: ForgotPasswordForm,
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
type Story = StoryObj<typeof ForgotPasswordForm>;

function Controlled(args: Partial<React.ComponentProps<typeof ForgotPasswordForm>>) {
    const [data, setData] = useState<ForgotPasswordFormData>({ email: '' });
    return (
        <ForgotPasswordForm
            data={data}
            errors={{}}
            onChange={(field, value) => setData(prev => ({ ...prev, [field]: value }))}
            onSubmit={e => e.preventDefault()}
            {...args}
        />
    );
}

export const Default: Story = {
    render: args => <Controlled {...args} />,
};

export const LinkSent: Story = {
    render: args => (
        <Controlled status="A password reset link has been sent to your email address." {...args} />
    ),
};

export const WithError: Story = {
    render: args => (
        <Controlled errors={{ email: 'We could not find a user with that email address.' }} {...args} />
    ),
};

export const Processing: Story = {
    render: args => <Controlled processing={true} {...args} />,
};
