import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { LiveStreamPage, LiveStreamWithSidebarPage } from '../../../src/pages/tenant/LiveStreamPage';
import type { LiveStats, LiveIncident, LiveVehicle } from '../../../src/pages/tenant/LiveStreamPage';

const MOCK_LIVE_STATS: LiveStats = {
    online:           247,
    offline:          65,
    activeTrips:      31,
    activeIncidents:  6,
    lastSync:         '2s ago',
};

const MOCK_LIVE_INCIDENTS: LiveIncident[] = [
    { id: 'INC-0042', assignee: 'Kamran Arif',    rule: 'SOS Triggered',        priority: 'critical' },
    { id: 'INC-0041', assignee: 'Tariq Mahmood',  rule: 'Geofence Exit',        priority: 'high'     },
    { id: 'INC-0040', assignee: 'Zeeshan Butt',   rule: 'Speeding > 80 km/h',  priority: 'high'     },
    { id: 'INC-0037', assignee: 'Sajid Hussain',  rule: 'Out of Beat > 30 min', priority: 'medium'   },
];

const MOCK_LIVE_VEHICLES: LiveVehicle[] = [
    { reg: 'LP-4821', location: 'Gulberg III, Lahore',  speed: '0 km/h'  },
    { reg: 'LP-3302', location: 'DHA Phase 4, Lahore',  speed: '45 km/h' },
    { reg: 'LP-5510', location: 'Wapda Town, Lahore',   speed: '62 km/h' },
    { reg: 'LP-7734', location: 'Model Town, Lahore',   speed: '38 km/h' },
    { reg: 'LP-9901', location: 'Raiwind Road, Lahore', speed: '71 km/h' },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/LiveStream',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Default: Story = {
    render: ({ layout }) => <LiveStreamPage key={layout} layout={layout} stats={MOCK_LIVE_STATS} />,
};

export const WithSidebar: Story = {
    name: 'With status sidebar',
    render: ({ layout }) => (
        <LiveStreamWithSidebarPage
            key={layout}
            layout={layout}
            stats={MOCK_LIVE_STATS}
            incidents={MOCK_LIVE_INCIDENTS}
            vehicles={MOCK_LIVE_VEHICLES}
        />
    ),
};
