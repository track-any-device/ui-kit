import type { Meta, StoryObj } from '@storybook/react';
import { DevicesMiniMap } from '@trackany-device/components';
import type { MiniMapDevice } from '@trackany-device/components';

const meta: Meta<typeof DevicesMiniMap> = {
    title: 'Components/Devices/DevicesMiniMap',
    component: DevicesMiniMap,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof DevicesMiniMap>;

const devices: MiniMapDevice[] = [
    { id: 1, name: 'Unit 01 – Punjab Police',  imei: '123456789000001', last_lat: 31.5204, last_lon: 74.3587, signal: 90,  heading: 45  },
    { id: 2, name: 'Unit 02 – Patrol East',    imei: '123456789000002', last_lat: 31.5350, last_lon: 74.3420, signal: 60,  heading: 180 },
    { id: 3, name: 'Unit 03 – Field Worker',   imei: '123456789000003', last_lat: 31.5100, last_lon: 74.3700, signal: 30,  heading: null },
    { id: 4, name: 'Unit 04 – Vehicle Alpha',  imei: '123456789000004', last_lat: 31.5250, last_lon: 74.3800, signal: 75,  heading: 270 },
    { id: 5, name: 'Unit 05 – Guard Dog',      imei: '123456789000005', last_lat: 31.5070, last_lon: 74.3550, signal: 10,  heading: null },
    { id: 6, name: 'No GPS yet',               imei: '123456789000006', last_lat: null,    last_lon: null,    signal: null, heading: null },
];

export const Default: Story = {
    name: 'Default (auto style)',
    args: { devices, height: '400px', title: 'Live Device Map' },
};

export const StyleSilver: Story = {
    name: 'Style — Silver (light)',
    render: () => (
        <DevicesMiniMap
            devices={devices}
            height="400px"
            title="Silver — desaturated light"
            mapStyle="silver"
        />
    ),
};

export const StyleNight: Story = {
    name: 'Style — Night (dark)',
    render: () => (
        <div className="dark">
            <DevicesMiniMap
                devices={devices}
                height="400px"
                title="Night — dark navy"
                mapStyle="night"
            />
        </div>
    ),
};

export const StyleRetro: Story = {
    name: 'Style — Retro',
    render: () => (
        <DevicesMiniMap
            devices={devices}
            height="400px"
            title="Retro — cream &amp; beige"
            mapStyle="retro"
        />
    ),
};

export const StyleDefault: Story = {
    name: 'Style — Google Default',
    render: () => (
        <DevicesMiniMap
            devices={devices}
            height="400px"
            title="Google Default"
            mapStyle="default"
        />
    ),
};

export const AllStyleVariants: Story = {
    name: 'All style variants',
    render: () => (
        <div className="grid grid-cols-2 gap-4 p-4">
            {(['default', 'silver', 'retro', 'night'] as const).map((style) => (
                <div key={style} className={style === 'night' ? 'dark' : ''}>
                    <DevicesMiniMap
                        devices={devices.slice(0, 3)}
                        height="260px"
                        title={style.charAt(0).toUpperCase() + style.slice(1)}
                        mapStyle={style}
                    />
                </div>
            ))}
        </div>
    ),
    parameters: { layout: 'fullscreen' },
};

export const NoApiKey: Story = {
    name: 'No API key — fallback',
    render: () => (
        <DevicesMiniMap
            devices={devices}
            height="320px"
            title="Fallback state"
            _forceNoKey
        />
    ),
};

export const EmptyDevices: Story = {
    name: 'No device positions',
    args: {
        devices: [
            { id: 1, name: 'Device A', imei: '111', last_lat: null, last_lon: null },
            { id: 2, name: 'Device B', imei: '222', last_lat: null, last_lon: null },
        ],
        height: '320px',
        title: 'No GPS fixes yet',
    },
};
