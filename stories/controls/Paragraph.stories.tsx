import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '@trackany-device/components';

const meta: Meta<typeof Paragraph> = {
    title: 'Controls/Paragraph',
    component: Paragraph,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="max-w-md"><Story /></div>],
    args: { children: 'The platform serves five distinct buyer segments — hardware engineers, IoT providers, fleet operators, corporate buyers, and government organisations.' },
};
export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {};
export const Muted: Story = { args: { variant: 'muted' } };
export const Lead: Story = { args: { variant: 'lead' } };
export const Error: Story = { args: { variant: 'error', children: 'Something went wrong. Please try again.' } };
export const Success: Story = { args: { variant: 'success', children: 'Your changes have been saved successfully.' } };
export const Small: Story = { args: { size: 'sm', variant: 'muted' } };
export const ExtraSmall: Story = { args: { size: 'xs', variant: 'muted' } };
