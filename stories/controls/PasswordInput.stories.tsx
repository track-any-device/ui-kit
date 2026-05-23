import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '@trackany-device/components';

const meta: Meta<typeof PasswordInput> = {
    title: 'Controls/PasswordInput',
    component: PasswordInput,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
    args: { placeholder: '••••••••' },
};
export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'secretpassword' } };
export const WithError: Story = { args: { error: 'The password must be at least 8 characters.' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'secretpassword' } };
