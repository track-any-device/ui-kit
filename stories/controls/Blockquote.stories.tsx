import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from '@track-any-device/components';

const meta: Meta<typeof Blockquote> = {
    title: 'Controls/Blockquote',
    component: Blockquote,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="max-w-md"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {
    args: { children: 'Real-time GPS tracking, beat zone enforcement, and automated incident management — built for fleet, government, and IoT operators.' },
};

export const WithCite: Story = {
    args: {
        children: 'The platform has transformed how we monitor our field teams across 36 districts.',
        cite: 'Environment Protection Dept., Govt. of Punjab',
    },
};
