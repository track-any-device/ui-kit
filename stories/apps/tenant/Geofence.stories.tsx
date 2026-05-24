import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { GeofenceListPage, GeofenceEditorPage } from '../../../src/pages/tenant/GeofencePage';
import type { Geofence } from '../../../src/pages/tenant/GeofencePage';

const MOCK_GEOFENCES: Geofence[] = [
    {
        id: 1,
        name: 'Lahore City Limits',
        type: 'inclusion',
        status: 'active',
        triggers: 4,
        polygon: [
            { lat: 31.580, lng: 74.270 },
            { lat: 31.580, lng: 74.450 },
            { lat: 31.410, lng: 74.450 },
            { lat: 31.410, lng: 74.270 },
        ],
    },
    {
        id: 2,
        name: 'Airport Exclusion Zone',
        type: 'exclusion',
        status: 'active',
        triggers: 11,
        polygon: [
            { lat: 31.526, lng: 74.385 },
            { lat: 31.526, lng: 74.415 },
            { lat: 31.508, lng: 74.415 },
            { lat: 31.508, lng: 74.385 },
        ],
    },
    {
        id: 3,
        name: 'DHA Operational Zone',
        type: 'inclusion',
        status: 'active',
        triggers: 2,
        polygon: [
            { lat: 31.480, lng: 74.388 },
            { lat: 31.480, lng: 74.428 },
            { lat: 31.456, lng: 74.428 },
            { lat: 31.456, lng: 74.388 },
        ],
    },
    {
        id: 4,
        name: 'Industrial Area — No Entry',
        type: 'exclusion',
        status: 'inactive',
        triggers: 0,
        polygon: [
            { lat: 31.555, lng: 74.290 },
            { lat: 31.555, lng: 74.320 },
            { lat: 31.538, lng: 74.320 },
            { lat: 31.538, lng: 74.290 },
        ],
    },
    {
        id: 5,
        name: 'Gulberg Operations',
        type: 'inclusion',
        status: 'active',
        triggers: 7,
        polygon: [
            { lat: 31.532, lng: 74.343 },
            { lat: 31.532, lng: 74.372 },
            { lat: 31.508, lng: 74.372 },
            { lat: 31.508, lng: 74.343 },
        ],
    },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Geofence',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Default: Story = {
    name: 'Geofence list + map',
    render: ({ layout }) => <GeofenceListPage key={layout} layout={layout} geofences={MOCK_GEOFENCES} />,
};

export const Editor: Story = {
    name: 'Geofence editor — draw & manage',
    render: ({ layout }) => <GeofenceEditorPage key={layout} layout={layout} geofences={MOCK_GEOFENCES} />,
};
