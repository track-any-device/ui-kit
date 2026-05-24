import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { AssigneesTablePage, AssigneesMapPage } from '../../../src/pages/tenant/AssigneesPage';
import type { Assignee } from '../../../src/pages/tenant/AssigneesPage';

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
    render: ({ layout }) => <AssigneesMapPage key={layout} layout={layout} assignees={MOCK_ASSIGNEES} />,
};
