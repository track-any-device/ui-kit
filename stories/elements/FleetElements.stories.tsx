import type { Meta, StoryObj } from '@storybook/react';
import { VehicleCard, DriverCard, DeviceStatusBadge, IncidentCard } from '@track-any-device/components';

const meta: Meta = { title: 'Elements/Fleet', parameters: { layout: 'padded' } };
export default meta;

type Story = StoryObj;

export const VehicleCards: Story = {
    render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            <VehicleCard vehicle={{ id: '1', registration: 'LEA-001', make: 'Toyota', model: 'Hilux', status: 'moving', driver: 'Ali Hassan', speed: 62, location: 'GT Road, Lahore' }} />
            <VehicleCard vehicle={{ id: '2', registration: 'LHR-452', make: 'Suzuki', model: 'Bolan', status: 'idle', driver: 'Malik Rashid', speed: 0, location: 'Ring Road, Gujranwala' }} />
            <VehicleCard vehicle={{ id: '3', registration: 'ISB-881', make: 'Honda', model: 'Civic', status: 'offline', lastSeen: 'Last seen 2 hours ago' }} />
            <VehicleCard vehicle={{ id: '4', registration: 'KHI-321', make: 'Datsun', model: 'Go', status: 'online', location: 'M2 Motorway' }} />
            <VehicleCard vehicle={{ id: '5', registration: 'MUL-099', make: 'Mitsubishi', model: 'Canter', status: 'stopped', driver: 'Farhan Malik', speed: 0, location: 'Multan Bypass' }} />
        </div>
    ),
};

export const DriverCards: Story = {
    render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            <DriverCard driver={{ id: '1', name: 'Ali Hassan', licenseNumber: 'LHR-2019-4521', phone: '+92 300 1234567', status: 'on-trip', vehicleRegistration: 'LEA-001' }} />
            <DriverCard driver={{ id: '2', name: 'Malik Rashid', licenseNumber: 'GJW-2021-8833', phone: '+92 321 9876543', status: 'active' }} />
            <DriverCard driver={{ id: '3', name: 'Farhan Malik', licenseNumber: 'MUL-2018-2211', status: 'inactive' }} />
        </div>
    ),
};

export const StatusBadges: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3 items-center">
            <DeviceStatusBadge status="online" />
            <DeviceStatusBadge status="moving" />
            <DeviceStatusBadge status="idle" />
            <DeviceStatusBadge status="stopped" />
            <DeviceStatusBadge status="offline" />
            <DeviceStatusBadge status="error" />
            <DeviceStatusBadge status="unknown" />
            <hr className="w-full" />
            <DeviceStatusBadge status="online" size="sm" />
            <DeviceStatusBadge status="moving" size="sm" />
            <DeviceStatusBadge status="offline" size="sm" showDot={false} />
        </div>
    ),
};

export const IncidentCards: Story = {
    render: () => (
        <div className="space-y-3 max-w-xl">
            <IncidentCard incident={{ id: '1', title: 'Speeding Alert', description: 'Vehicle LEA-001 exceeded 120 km/h on GT Road.', severity: 'critical', vehicle: 'LEA-001', driver: 'Ali Hassan', timestamp: '2 minutes ago' }} />
            <IncidentCard incident={{ id: '2', title: 'Geofence Breach', description: 'Vehicle LHR-452 left assigned zone.', severity: 'high', vehicle: 'LHR-452', location: 'Ring Road, Gujranwala', timestamp: '15 minutes ago' }} />
            <IncidentCard incident={{ id: '3', title: 'Harsh Braking', severity: 'medium', vehicle: 'ISB-881', driver: 'Farhan Malik', timestamp: '1 hour ago' }} />
            <IncidentCard incident={{ id: '4', title: 'Maintenance Due', severity: 'low', vehicle: 'KHI-321', timestamp: 'Today' }} />
            <IncidentCard incident={{ id: '5', title: 'GPS Signal Lost', severity: 'info', vehicle: 'MUL-099', timestamp: '3 hours ago', resolved: true }} />
        </div>
    ),
};
