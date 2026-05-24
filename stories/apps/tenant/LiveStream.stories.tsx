import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { LiveStreamPage, LiveStreamWithSidebarPage } from '../../../src/pages/tenant/LiveStreamPage';
import type { LiveStats, LiveIncident, LiveVehicle, MiniMapDevice } from '../../../src/pages/tenant/LiveStreamPage';

const MOCK_DEVICES: MiniMapDevice[] = [
    { id: 1, name: 'LP-4821', imei: null, last_lat: 31.5204, last_lon: 74.3587, signal: 90,  heading: 45  },
    { id: 2, name: 'LP-3302', imei: null, last_lat: 31.4697, last_lon: 74.4074, signal: 60,  heading: 180 },
    { id: 3, name: 'LP-5510', imei: null, last_lat: 31.5497, last_lon: 74.3436, signal: 40,  heading: null },
    { id: 4, name: 'LP-7734', imei: null, last_lat: 31.5000, last_lon: 74.3500, signal: 15,  heading: 270 },
    { id: 5, name: 'LP-9901', imei: null, last_lat: 31.4800, last_lon: 74.3200, signal: 75,  heading: null },
];

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
    render: ({ layout }) => <LiveStreamPage key={layout} layout={layout} stats={MOCK_LIVE_STATS} devices={MOCK_DEVICES} />,
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
            devices={MOCK_DEVICES}
        />
    ),
};
