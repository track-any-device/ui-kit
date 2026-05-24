import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { AssigneesTablePage, AssigneesMapPage } from '../../../src/pages/tenant/AssigneesPage';
import type { Assignee, MiniMapDevice } from '../../../src/pages/tenant/AssigneesPage';

const MOCK_ASSIGNEES: Assignee[] = [
    { id: 1, name: 'Kamran Arif',    initials: 'KA', type: 'Worker',  beat: 'Zone A — Gulberg',       status: 'inside',  device: 'LP-4821', signal: 4 },
    { id: 2, name: 'Zeeshan Butt',   initials: 'ZB', type: 'Vehicle', beat: 'Zone B — DHA',           status: 'inside',  device: 'LP-3302', signal: 3 },
    { id: 3, name: 'Tariq Mahmood',  initials: 'TM', type: 'Vehicle', beat: 'Zone C — Wapda Town',    status: 'outside', device: 'LP-5510', signal: 3 },
    { id: 4, name: 'Usman Malik',    initials: 'UM', type: 'Worker',  beat: 'Zone A — Gulberg',       status: 'offline', device: 'LP-0091', signal: 0 },
    { id: 5, name: 'Bilal Chaudhry', initials: 'BC', type: 'Vehicle', beat: 'Zone D — Model Town',    status: 'inside',  device: 'LP-7734', signal: 4 },
    { id: 6, name: 'Sajid Hussain',  initials: 'SH', type: 'Worker',  beat: 'Zone B — DHA',           status: 'outside', device: 'LP-2214', signal: 2 },
    { id: 7, name: 'Nawaz Ahmed',    initials: 'NA', type: 'Vehicle', beat: 'Zone E — Raiwind Road',  status: 'inside',  device: 'LP-9901', signal: 3 },
    { id: 8, name: 'Imran Siddiqui', initials: 'IS', type: 'Worker',  beat: 'Zone C — Wapda Town',    status: 'offline', device: 'LP-1173', signal: 0 },
];

const MOCK_DEVICES: MiniMapDevice[] = [
    { id: 1, name: 'Kamran Arif',    imei: null, last_lat: 31.5204, last_lon: 74.3587, signal: 100, heading: 45  },
    { id: 2, name: 'Zeeshan Butt',   imei: null, last_lat: 31.4697, last_lon: 74.4074, signal: 75,  heading: null },
    { id: 3, name: 'Tariq Mahmood',  imei: null, last_lat: 31.5497, last_lon: 74.3436, signal: 75,  heading: 210 },
    { id: 4, name: 'Usman Malik',    imei: null, last_lat: 31.5150, last_lon: 74.3700, signal: 0,   heading: null },
    { id: 5, name: 'Bilal Chaudhry', imei: null, last_lat: 31.5000, last_lon: 74.3500, signal: 100, heading: 90  },
    { id: 6, name: 'Sajid Hussain',  imei: null, last_lat: 31.4750, last_lon: 74.3900, signal: 40,  heading: 315 },
    { id: 7, name: 'Nawaz Ahmed',    imei: null, last_lat: 31.4600, last_lon: 74.3200, signal: 75,  heading: null },
    { id: 8, name: 'Imran Siddiqui', imei: null, last_lat: 31.5350, last_lon: 74.3300, signal: 0,   heading: null },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Assignees',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Default: Story = {
    render: ({ layout }) => <AssigneesTablePage key={layout} layout={layout} assignees={MOCK_ASSIGNEES} />,
};

export const MapView: Story = {
    name: 'Map view — assignees on map',
    render: ({ layout }) => <AssigneesMapPage key={layout} layout={layout} assignees={MOCK_ASSIGNEES} devices={MOCK_DEVICES} />,
};
