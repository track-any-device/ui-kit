import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmPasswordForm } from '@track-any-device/components';

const meta: Meta<typeof ConfirmPasswordForm> = {
    title: 'Elements/ConfirmPasswordForm',
    component: ConfirmPasswordForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ConfirmPasswordForm>;

function Controlled(args: Partial<React.ComponentProps<typeof ConfirmPasswordForm>>) {
    const [password, setPassword] = useState('');
    return (
        <ConfirmPasswordForm
            password={password}
            errors={{}}
            onChange={setPassword}
            onSubmit={e => e.preventDefault()}
            {...args}
        />
    );
}

export const Default: Story = { render: args => <Controlled {...args} /> };
export const WithError: Story = {
    render: args => <Controlled errors={{ password: 'The provided password was incorrect.' }} {...args} />,
};
export const Processing: Story = { render: args => <Controlled processing {...args} /> };
