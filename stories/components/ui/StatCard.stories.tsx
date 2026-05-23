import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '@trackany-device/components';
import { ActivityIcon, AlertTriangleIcon, UsersIcon } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
    title: 'UI/StatCard',
    component: StatCard,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
    render: () => (
        <div className="p-8 w-64">
            <StatCard label="Total Assignees" value={12458} />
        </div>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <div className="p-8 w-64">
            <StatCard label="Active Devices" value={342} icon={ActivityIcon} />
        </div>
    ),
};

export const WithDelta: Story = {
    render: () => (
        <div className="p-8 flex gap-4 flex-wrap">
            <div className="w-56">
                <StatCard
                    label="Online Devices"
                    value={312}
                    delta="+12%"
                    deltaType="up"
                    icon={UsersIcon}
                    description="vs. last week"
                />
            </div>
            <div className="w-56">
                <StatCard
                    label="Incidents"
                    value={8}
                    delta="-3"
                    deltaType="down"
                    icon={AlertTriangleIcon}
                    description="since yesterday"
                />
            </div>
            <div className="w-56">
                <StatCard
                    label="Avg Response"
                    value="4.2m"
                    delta="no change"
                    deltaType="neutral"
                    description="same as last week"
                />
            </div>
        </div>
    ),
};
