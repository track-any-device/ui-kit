import type { Meta, StoryObj } from '@storybook/react';
import { InputError } from '@track-any-device/components';

const meta: Meta<typeof InputError> = { title: 'Components/App/InputError', component: InputError, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof InputError>;

export const WithMessage: Story = { args: { message: 'This field is required.' } };
export const Empty: Story = { args: { message: undefined } };
