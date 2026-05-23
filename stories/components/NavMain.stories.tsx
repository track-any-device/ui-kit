import type { Meta, StoryObj } from '@storybook/react';
import { NavMain, SidebarProvider } from '@trackany-device/components';
import { AlertTriangle, LayoutGrid, MapPin, MonitorPlay, Smartphone } from 'lucide-react';

const items = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Live Monitoring', href: '/map', icon: MonitorPlay },
    { title: 'Alerts & Incidents', href: '/incidents', icon: AlertTriangle },
    { title: 'Beats & Boundaries', href: '/beats', icon: MapPin },
    { title: 'Devices', href: '/devices', icon: Smartphone },
];

const meta: Meta = {
    title: 'Components/App/NavMain',
    tags: ['autodocs'],
    decorators: [(Story) => <SidebarProvider><Story /></SidebarProvider>],
};
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <NavMain items={items} /> };
export const Minimal: Story = { render: () => <NavMain items={[{ title: 'Dashboard', href: '/dashboard', icon: LayoutGrid }]} /> };
