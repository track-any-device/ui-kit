import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@track-any-device/components';

const meta: Meta<typeof Textarea> = {
    title: 'Controls/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
    args: { placeholder: 'Write something here…' },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'This is some pre-filled content that spans multiple lines.\n\nIt has paragraphs too.' } };
export const WithError: Story = { args: { error: 'This field is required.' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Read-only content.' } };
export const TallRows: Story = { args: { rows: 8, placeholder: 'Write a longer message…' } };
