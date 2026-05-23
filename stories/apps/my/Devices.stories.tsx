import type { Meta, StoryObj } from '@storybook/react';
import { WebAppLayout } from '@trackany-device/components';
import { MockPage } from '../../../.storybook/mocks/inertia-react';
import { mockPageProps } from '../../_mock-data';
import { Smartphone, MapPin, Battery } from 'lucide-react';

const meta: Meta = {
    title: 'Apps/My/Devices',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [(Story) => <MockPage props={mockPageProps} url="/my-devices"><Story /></MockPage>],
};
export default meta;
type Story = StoryObj;

const mockDevices = [
    { id: 1, name: 'P901 #001', imei: '860000000000001', battery: 78, status: 'online', location: 'Lahore, Punjab', lastSeen: '2 min ago' },
    { id: 2, name: 'GF-07 #002', imei: '860000000000002', battery: 42, status: 'idle', location: 'Faisalabad, Punjab', lastSeen: '15 min ago' },
    { id: 3, name: 'AOT120 #003', imei: '860000000000003', battery: 12, status: 'offline', location: 'Multan, Punjab', lastSeen: '3 hours ago' },
];

const statusColor: Record<string, string> = {
    online: 'text-green-600 bg-green-50',
    idle: 'text-amber-600 bg-amber-50',
    offline: 'text-red-600 bg-red-50',
};

export const Default: Story = {
    render: () => (
        <WebAppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">My Devices</h1>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mockDevices.map((device) => (
                        <div key={device.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-lg bg-primary/10 p-2"><Smartphone className="h-4 w-4 text-primary" /></div>
                                    <div>
                                        <p className="font-medium text-sm">{device.name}</p>
                                        <p className="text-xs text-muted-foreground">{device.imei}</p>
                                    </div>
                                </div>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[device.status]}`}>
                                    {device.status}
                                </span>
                            </div>
                            <div className="space-y-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{device.location}</div>
                                <div className="flex items-center gap-1.5"><Battery className="h-3.5 w-3.5" />{device.battery}% battery</div>
                                <p className="text-[11px]">Last seen {device.lastSeen}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </WebAppLayout>
    ),
};

export const Empty: Story = {
    render: () => (
        <WebAppLayout>
            <div className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <Smartphone className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-lg font-semibold mb-2">No devices yet</h2>
                <p className="text-muted-foreground text-sm">Purchase a device from the store to get started.</p>
            </div>
        </WebAppLayout>
    ),
};
