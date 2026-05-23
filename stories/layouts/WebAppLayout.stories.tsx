import type { Meta, StoryObj } from '@storybook/react';
import { WebAppLayout } from '@track-any-device/components';
import { MockPage } from '../../.storybook/mocks/inertia-react';
import { mockPageProps } from '../_mock-data';

const meta: Meta = {
    title: 'Layouts/WebAppLayout',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <MockPage props={mockPageProps} url="/my-devices">
                <Story />
            </MockPage>
        ),
    ],
};
export default meta;
type Story = StoryObj;

const PageContent = () => (
    <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">Authenticated web-host user area — orders, devices, tenant picker.</p>
    </div>
);

export const Default: Story = { render: () => <WebAppLayout><PageContent /></WebAppLayout> };
export const Settings: Story = {
    decorators: [(Story) => <MockPage props={mockPageProps} url="/settings/profile"><Story /></MockPage>],
    render: () => <WebAppLayout><PageContent /></WebAppLayout>,
};
