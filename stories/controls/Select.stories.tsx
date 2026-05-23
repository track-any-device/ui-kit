import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@trackany-device/components';

const meta: Meta<typeof Select> = {
    title: 'Controls/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [Story => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Select>;

const options = (
    <>
        <option value="">Select a country</option>
        <option value="PK">PK +92</option>
        <option value="US">US +1</option>
        <option value="GB">GB +44</option>
        <option value="AE">AE +971</option>
    </>
);

export const Default: Story = { render: () => <Select>{options}</Select> };
export const WithValue: Story = { render: () => <Select defaultValue="PK">{options}</Select> };
export const WithError: Story = { render: () => <Select error="Please select a country.">{options}</Select> };
export const Disabled: Story = { render: () => <Select disabled defaultValue="PK">{options}</Select> };
