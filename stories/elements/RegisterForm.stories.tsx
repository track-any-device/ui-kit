import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RegisterForm } from '@trackany-device/components';
import type { RegisterFormData } from '@trackany-device/components';

const meta: Meta<typeof RegisterForm> = {
    title: 'Elements/RegisterForm',
    component: RegisterForm,
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
type Story = StoryObj<typeof RegisterForm>;

function Controlled(args: Partial<React.ComponentProps<typeof RegisterForm>>) {
    const [data, setData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    return (
        <RegisterForm
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
            errors={{
                email: 'The email has already been taken.',
                password: 'The password must be at least 8 characters.',
                password_confirmation: 'The password confirmation does not match.',
            }}
            {...args}
        />
    ),
};

export const Processing: Story = {
    render: args => <Controlled processing={true} {...args} />,
};
