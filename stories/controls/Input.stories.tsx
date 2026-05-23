import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@track-any-device/components';

const meta: Meta<typeof Input> = {
    title: 'Controls/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
    args: { placeholder: 'you@example.com' },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = { args: { type: 'text', placeholder: 'Enter text' } };
export const Email: Story = { args: { type: 'email' } };
export const WithValue: Story = { args: { type: 'email', defaultValue: 'user@example.com' } };
export const WithError: Story = { args: { type: 'email', error: 'Please enter a valid email address.' } };
export const Disabled: Story = { args: { type: 'email', disabled: true, defaultValue: 'user@example.com' } };
export const Tel: Story = { args: { type: 'tel', placeholder: '300 1234567' } };
