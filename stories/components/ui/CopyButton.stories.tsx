import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from '@trackany-device/components';

const meta: Meta<typeof CopyButton> = { title: 'UI/CopyButton', component: CopyButton, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = { args: { value: 'P901-IMEI-00042' } };
export const WithLabel: Story = { args: { value: 'tci_graphql_abc123', label: 'Copy API key' } };
