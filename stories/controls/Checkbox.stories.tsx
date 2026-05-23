import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@trackany-device/components';

const meta: Meta<typeof Checkbox> = {
    title: 'Controls/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { id: 'cb1', label: 'Accept terms and conditions' } };
export const Checked: Story = { args: { id: 'cb2', label: 'Remember me', defaultChecked: true } };
export const WithError: Story = { args: { id: 'cb3', label: 'I agree to the terms', error: 'You must accept the terms.' } };
export const Disabled: Story = { args: { id: 'cb4', label: 'Disabled option', disabled: true } };
export const NoLabel: Story = { args: { id: 'cb5' } };
