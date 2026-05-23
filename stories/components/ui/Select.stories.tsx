import type { Meta, StoryObj } from '@storybook/react';
import {
    RadixSelect,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@track-any-device/components';

const meta: Meta = {
    title: 'UI/Select',
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <RadixSelect>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
        </RadixSelect>
    ),
};

export const WithGroups: Story = {
    render: () => (
        <RadixSelect>
            <SelectTrigger className="w-56">
                <SelectValue placeholder="Select device type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>GPS Trackers</SelectLabel>
                    <SelectItem value="p901">P901 Smart ID Card</SelectItem>
                    <SelectItem value="aot120">AOT120 Vehicle</SelectItem>
                    <SelectItem value="gf07">GF07 Mini</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Universal</SelectLabel>
                    <SelectItem value="tad101">TAD101 Universal</SelectItem>
                </SelectGroup>
            </SelectContent>
        </RadixSelect>
    ),
};

export const Small: Story = {
    render: () => (
        <RadixSelect>
            <SelectTrigger size="sm" className="w-40">
                <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
        </RadixSelect>
    ),
};
