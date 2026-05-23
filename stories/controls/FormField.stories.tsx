import type { Meta, StoryObj } from '@storybook/react';
import { FormField, Input, PasswordInput } from '@track-any-device/components';

const meta: Meta<typeof FormField> = {
    title: 'Controls/FormField',
    component: FormField,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const WithTextInput: Story = {
    render: () => (
        <FormField label="Full name" htmlFor="name">
            <Input id="name" type="text" placeholder="Jane Doe" />
        </FormField>
    ),
};

export const WithEmailInput: Story = {
    render: () => (
        <FormField label="Email address" htmlFor="email" required>
            <Input id="email" type="email" placeholder="you@example.com" />
        </FormField>
    ),
};

export const WithPasswordInput: Story = {
    render: () => (
        <FormField label="Password" htmlFor="password" required>
            <PasswordInput id="password" placeholder="••••••••" />
        </FormField>
    ),
};

export const WithError: Story = {
    render: () => (
        <FormField label="Email address" htmlFor="email-err">
            <Input id="email-err" type="email" defaultValue="not-an-email" error="Please enter a valid email address." />
        </FormField>
    ),
};

export const WithHint: Story = {
    render: () => (
        <FormField label="Phone number" htmlFor="phone" hint="Used for SMS verification and 2FA.">
            <Input id="phone" type="tel" placeholder="300 1234567" />
        </FormField>
    ),
};
