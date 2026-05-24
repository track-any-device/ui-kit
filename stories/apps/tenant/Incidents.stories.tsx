import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { IncidentsPage, IncidentDetailPage } from '../../../src/pages/tenant/IncidentsPage';
import type { Incident, IncidentDetail } from '../../../src/pages/tenant/IncidentsPage';

const MOCK_INCIDENTS: Incident[] = [
    { id: 'INC-0042', device: 'LP-4821', assignee: 'Kamran Arif',    beat: 'Zone A — Gulberg',    rule: 'SOS Triggered',       priority: 'critical', status: 'open',         time: '09:11' },
    { id: 'INC-0041', device: 'LP-5510', assignee: 'Tariq Mahmood',  beat: 'Zone C — Wapda Town', rule: 'Geofence Exit',        priority: 'high',     status: 'acknowledged', time: '08:30' },
    { id: 'INC-0040', device: 'LP-3302', assignee: 'Zeeshan Butt',   beat: 'Zone B — DHA',        rule: 'Speeding > 80 km/h',  priority: 'medium',   status: 'acknowledged', time: '07:55' },
    { id: 'INC-0039', device: 'LP-0091', assignee: 'Usman Malik',    beat: 'Zone A — Gulberg',    rule: 'Device Offline 2h+',  priority: 'low',      status: 'resolved',     time: '23 May' },
    { id: 'INC-0038', device: 'LP-7734', assignee: 'Bilal Chaudhry', beat: 'Zone D — Model Town', rule: 'Low Battery',         priority: 'low',      status: 'resolved',     time: '22 May' },
    { id: 'INC-0037', device: 'LP-2214', assignee: 'Sajid Hussain',  beat: 'Zone B — DHA',        rule: 'Out of Beat > 30 min',priority: 'high',     status: 'open',         time: '22 May' },
];

const MOCK_INCIDENT_DETAIL: IncidentDetail = {
    id:         'INC-0042',
    assignee:   'Kamran Arif',
    device:     'LP-4821',
    beat:       'Zone A — Gulberg III',
    rule:       'SOS Triggered',
    location:   'Gulberg III, Lahore (31.5204° N, 74.3587° E)',
    reported:   '24 May 2026, 09:11',
    assignedTo: 'Ahmad Faryab',
    priority:   'critical',
    status:     'open',
    log: [
        { type: 'sos',          title: 'SOS button pressed',                 datetime: '2026-05-24T09:11:00', variant: 'danger',  description: 'Driver Kamran Arif triggered SOS near Gulberg III.' },
        { type: 'created',      title: 'Incident created automatically',      datetime: '2026-05-24T09:11:05', variant: 'default', description: 'System created INC-0042 from SOS event.' },
        { type: 'notification', title: 'Alert sent to supervisor',            datetime: '2026-05-24T09:11:10', variant: 'info',    description: 'Ahmad Faryab notified via email and push.' },
        { type: 'assignment',   title: 'Assigned to Ahmad Faryab',           datetime: '2026-05-24T09:14:00', variant: 'info',    description: 'Supervisor took ownership of the incident.' },
        { type: 'comment',      title: 'Comment added',                       datetime: '2026-05-24T09:18:00', variant: 'default', description: '"Unit dispatched. ETA 6 minutes." — Ahmad Faryab' },
    ],
};

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Incidents',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Default: Story = {
    render: ({ layout }) => <IncidentsPage key={layout} layout={layout} incidents={MOCK_INCIDENTS} />,
};

export const IncidentDetail: Story = {
    name: 'Incident detail view',
    render: ({ layout }) => <IncidentDetailPage key={layout} layout={layout} incident={MOCK_INCIDENT_DETAIL} />,
};
