import type { Meta, StoryObj } from '@storybook/react';
import { Badge, DataList, DataListItem } from '@trackany-device/components';

const meta: Meta<typeof DataList> = {
    title: 'UI/DataList',
    component: DataList,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataList>;

export const WithItemsProp: Story = {
    render: () => (
        <div className="max-w-md p-6">
            <DataList
                items={[
                    { label: 'Serial', value: 'P901-00042', mono: true },
                    { label: 'Status', value: <Badge>Active</Badge> },
                    { label: 'Battery', value: '87%' },
                    { label: 'Last Seen', value: '2 minutes ago' },
                    { label: 'Assignee', value: 'Muhammad Ali' },
                ]}
            />
        </div>
    ),
};

export const ComposedChildren: Story = {
    render: () => (
        <div className="max-w-md p-6">
            <DataList>
                <DataListItem label="IMEI" mono>
                    359072062432827
                </DataListItem>
                <DataListItem label="SIM Number" mono>
                    92312XXXXXXX
                </DataListItem>
                <DataListItem label="Model">
                    P901 Smart ID Card GPS
                </DataListItem>
                <DataListItem label="Status">
                    <Badge variant="outline">In Service</Badge>
                </DataListItem>
            </DataList>
        </div>
    ),
};

export const Empty: Story = {
    render: () => (
        <div className="max-w-md p-6">
            <DataList items={[]} />
        </div>
    ),
};
