import type { Meta, StoryObj } from '@storybook/react';
import { VerifyEmailForm } from '@trackany-device/components';

const meta: Meta<typeof VerifyEmailForm> = {
    title: 'Elements/VerifyEmailForm',
    component: VerifyEmailForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof VerifyEmailForm>;

export const Default: Story = {
    args: { onSubmit: e => e.preventDefault() },
};

export const LinkSent: Story = {
    args: {
        status: 'verification-link-sent',
        onSubmit: e => e.preventDefault(),
    },
};

export const Processing: Story = {
    args: { processing: true, onSubmit: e => e.preventDefault() },
};
