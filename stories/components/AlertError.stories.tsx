import type { Meta, StoryObj } from '@storybook/react';
import { AlertError } from '@trackany-device/components';

const meta: Meta<typeof AlertError> = { title: 'Components/App/AlertError', component: AlertError, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof AlertError>;

export const Single: Story = { args: { errors: ['The email field is required.'] } };
export const Multiple: Story = { args: { errors: ['Email is invalid.', 'Password must be at least 8 characters.', 'Name is required.'] } };
export const CustomTitle: Story = { args: { title: 'Validation failed', errors: ['Something went wrong.'] } };
