import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '@track-any-device/components';
import { DatabaseIcon, InboxIcon, SearchIcon } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
    title: 'UI/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    render: () => (
        <div className="p-8 max-w-md">
            <EmptyState title="No results found" />
        </div>
    ),
};

export const WithDescription: Story = {
    render: () => (
        <div className="p-8 max-w-md">
            <EmptyState
                icon={InboxIcon}
                title="No incidents yet"
                description="When devices trigger alert rules, incidents will appear here."
            />
        </div>
    ),
};

export const WithAction: Story = {
    render: () => (
        <div className="p-8 max-w-md">
            <EmptyState
                icon={DatabaseIcon}
                title="No devices registered"
                description="Register your first device to start tracking."
                actionLabel="Register Device"
                actionHref="/devices/create"
            />
        </div>
    ),
};

export const CustomIcon: Story = {
    render: () => (
        <div className="p-8 max-w-md">
            <EmptyState
                icon={SearchIcon}
                title="No search results"
                description="Try adjusting your filters or search term."
            />
        </div>
    ),
};
