import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@track-any-device/components';

const meta: Meta<typeof Heading> = {
    title: 'Controls/Heading',
    component: Heading,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    args: { children: 'The quick brown fox' },
};
export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = { args: { as: 'h1' } };
export const H2: Story = { args: { as: 'h2' } };
export const H3: Story = { args: { as: 'h3' } };
export const H4: Story = { args: { as: 'h4' } };
export const H5: Story = { args: { as: 'h5' } };
export const H6: Story = { args: { as: 'h6' } };

export const AllLevels: Story = {
    render: () => (
        <div className="space-y-3 max-w-lg">
            <Heading as="h1">H1 — Page title</Heading>
            <Heading as="h2">H2 — Section title</Heading>
            <Heading as="h3">H3 — Sub-section</Heading>
            <Heading as="h4">H4 — Card title</Heading>
            <Heading as="h5">H5 — Widget heading</Heading>
            <Heading as="h6">H6 — Label heading</Heading>
        </div>
    ),
};
