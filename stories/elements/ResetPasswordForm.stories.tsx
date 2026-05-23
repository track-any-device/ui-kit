import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ResetPasswordForm } from '@trackany-device/components';
import type { ResetPasswordFormData } from '@trackany-device/components';

const meta: Meta<typeof ResetPasswordForm> = {
    title: 'Elements/ResetPasswordForm',
    component: ResetPasswordForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

function Controlled(args: Partial<React.ComponentProps<typeof ResetPasswordForm>>) {
    const [data, setData] = useState<ResetPasswordFormData>({
        email: 'user@example.com',
        password: '',
        password_confirmation: '',
    });
    return (
        <ResetPasswordForm
            data={data}
            errors={{}}
            onChange={(field, value) => setData(prev => ({ ...prev, [field]: value }))}
            onSubmit={e => e.preventDefault()}
            {...args}
        />
    );
}

export const Default: Story = { render: args => <Controlled {...args} /> };

export const WithErrors: Story = {
    render: args => (
        <Controlled
            errors={{
                password: 'The password must be at least 8 characters.',
                password_confirmation: 'The password confirmation does not match.',
            }}
            {...args}
        />
    ),
};

export const Processing: Story = { render: args => <Controlled processing {...args} /> };
