import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LoginForm } from '@track-any-device/components';
import type { LoginFormData } from '@track-any-device/components';

const meta: Meta<typeof LoginForm> = {
    title: 'Elements/LoginForm',
    component: LoginForm,
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
type Story = StoryObj<typeof LoginForm>;

function Controlled(args: Partial<React.ComponentProps<typeof LoginForm>>) {
    const [data, setData] = useState<LoginFormData>({ email: '', password: '', remember: false });
    return (
        <LoginForm
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

export const WithErrors: Story = {
    render: args => (
        <Controlled
            errors={{ email: 'These credentials do not match our records.', password: 'The password field is required.' }}
            {...args}
        />
    ),
};

export const Processing: Story = {
    render: args => <Controlled processing={true} {...args} />,
};

export const WithStatus: Story = {
    render: args => <Controlled status="Password reset link sent to your email." {...args} />,
};

export const NoLinks: Story = {
    render: args => <Controlled canResetPassword={false} canRegister={false} {...args} />,
};
