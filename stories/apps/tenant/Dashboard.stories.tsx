import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { DashboardPage, DashboardWithIncidentPage } from '../../../src/pages/tenant/DashboardPage';
import type {
    DashboardStats, DashboardVehicle, DashboardActivityEvent,
    ExtendedDashboardStats, IncidentAlert,
} from '../../../src/pages/tenant/DashboardPage';

const MOCK_STATS: DashboardStats = {
    totalVehicles:    312,
    onlineNow:        247,
    activeIncidents:  6,
    lowBattery:       14,
};

const MOCK_VEHICLES: DashboardVehicle[] = [
    { reg: 'LP-4821', driver: 'Kamran Arif',   status: 'online',  speed: '62 km/h' },
    { reg: 'LP-3302', driver: 'Zeeshan Butt',  status: 'idle',    speed: '0 km/h'  },
    { reg: 'LP-5510', driver: 'Tariq Mahmood', status: 'online',  speed: '78 km/h' },
    { reg: 'LP-0091', driver: 'Usman Malik',   status: 'offline', speed: '—'       },
    { reg: 'LP-7734', driver: 'Bilal Chaudhry',status: 'online',  speed: '45 km/h' },
];

const MOCK_ACTIVITY: DashboardActivityEvent[] = [
    { type: 'incident', title: 'SOS triggered — LP-4821',      datetime: '2026-05-24T09:11:00', detail: 'Kamran Arif pressed SOS near Gulberg.',   variant: 'danger'  },
    { type: 'trip',     title: 'Trip completed — LP-3302',      datetime: '2026-05-24T08:50:00', detail: 'Route: DHA → Wapda Town, 34 km.',         variant: 'success' },
    { type: 'geofence', title: 'Geofence exit — LP-5510',       datetime: '2026-05-24T08:30:00', detail: 'Left Zone A (Punjab South Boundary).',    variant: 'warning' },
    { type: 'battery',  title: 'Low battery — Device D-4912',   datetime: '2026-05-24T07:55:00', detail: 'Battery at 17%. Replace soon.',           variant: 'warning' },
    { type: 'incident', title: 'Incident resolved — INC-0039',  datetime: '2026-05-23T22:10:00', detail: 'Speeding violation acknowledged & closed.', variant: 'success' },
];

const MOCK_EXTENDED_STATS: ExtendedDashboardStats = {
    ...MOCK_STATS,
    avgResponseTime:    '4m 12s',
    assigneesOnDuty:    89,
    assigneesEnrolled:  124,
    geofenceExits:      3,
    activeTrips:        31,
};

const MOCK_ALERT: IncidentAlert = {
    title:  'Critical: SOS triggered on LP-4821',
    detail: 'Kamran Arif pressed SOS near Gulberg III, Lahore. Unit dispatched.',
};

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Dashboard',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Default: Story = {
    render: ({ layout }) => (
        <DashboardPage key={layout} layout={layout} stats={MOCK_STATS} vehicles={MOCK_VEHICLES} recentActivity={MOCK_ACTIVITY} />
    ),
};

export const WithIncidentAlert: Story = {
    render: ({ layout }) => (
        <DashboardWithIncidentPage key={layout} layout={layout} stats={MOCK_EXTENDED_STATS} alert={MOCK_ALERT} />
    ),
};
