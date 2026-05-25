import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { BeatsListPage, BeatEditorPage } from '../../../src/pages/tenant/BeatsPage';
import type { Beat } from '../../../src/pages/tenant/BeatsPage';

const MOCK_BEATS: Beat[] = [
    {
        id: 1,
        name: 'Gulberg Beat',
        zone: 'Zone A — Gulberg',
        description: 'Covers Gulberg I–III commercial and residential areas.',
        status: 'active',
        assignees: 3,
        color: '#22c55e',
        polygon: [
            { lat: 31.530, lng: 74.345 },
            { lat: 31.530, lng: 74.370 },
            { lat: 31.510, lng: 74.370 },
            { lat: 31.510, lng: 74.345 },
        ],
    },
    {
        id: 2,
        name: 'DHA Beat',
        zone: 'Zone B — DHA',
        description: 'DHA Phase 1 through Phase 4.',
        status: 'active',
        assignees: 5,
        color: '#3b82f6',
        polygon: [
            { lat: 31.480, lng: 74.390 },
            { lat: 31.480, lng: 74.425 },
            { lat: 31.458, lng: 74.425 },
            { lat: 31.458, lng: 74.390 },
        ],
    },
    {
        id: 3,
        name: 'Wapda Town Beat',
        zone: 'Zone C — Wapda Town',
        description: 'Wapda Town and surrounding blocks.',
        status: 'active',
        assignees: 2,
        color: '#a855f7',
        polygon: [
            { lat: 31.553, lng: 74.328 },
            { lat: 31.553, lng: 74.358 },
            { lat: 31.535, lng: 74.358 },
            { lat: 31.535, lng: 74.328 },
        ],
    },
    {
        id: 4,
        name: 'Model Town Beat',
        zone: 'Zone D — Model Town',
        description: 'Model Town extension and links.',
        status: 'inactive',
        assignees: 0,
        color: '#f97316',
        polygon: [
            { lat: 31.505, lng: 74.325 },
            { lat: 31.505, lng: 74.350 },
            { lat: 31.488, lng: 74.350 },
            { lat: 31.488, lng: 74.325 },
        ],
    },
    {
        id: 5,
        name: 'Raiwind Road Beat',
        zone: 'Zone E — Raiwind Road',
        description: 'Raiwind Road industrial and logistics corridor.',
        status: 'active',
        assignees: 4,
        color: '#ef4444',
        polygon: [
            { lat: 31.468, lng: 74.305 },
            { lat: 31.468, lng: 74.338 },
            { lat: 31.448, lng: 74.338 },
            { lat: 31.448, lng: 74.305 },
        ],
    },
];

const MOCK_BEAT_EDIT: Beat = {
    id: 1,
    name: 'Gulberg Beat',
    zone: 'Zone A — Gulberg',
    description: 'Covers Gulberg I–III commercial and residential areas.',
    status: 'active',
    assignees: 3,
    color: '#22c55e',
    polygon: [
        { lat: 31.530, lng: 74.345 },
        { lat: 31.530, lng: 74.370 },
        { lat: 31.510, lng: 74.370 },
        { lat: 31.510, lng: 74.345 },
    ],
};

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Beats',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Default: Story = {
    name: 'Beats list + map',
    render: ({ layout }) => (
        <BeatsListPage
            key={layout}
            layout={layout}
            beats={MOCK_BEATS}
            onAdd={fn()}
            onEdit={fn()}
        />
    ),
};

export const Editor: Story = {
    name: 'Beat editor — edit existing',
    render: ({ layout }) => (
        <BeatEditorPage
            key={layout}
            layout={layout}
            beat={MOCK_BEAT_EDIT}
            onSave={fn()}
            onDiscard={fn()}
        />
    ),
};

export const NewBeat: Story = {
    name: 'Beat editor — new beat',
    render: ({ layout }) => (
        <BeatEditorPage
            key={layout}
            layout={layout}
            onSave={fn()}
            onDiscard={fn()}
        />
    ),
};
