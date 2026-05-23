import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebarLayout } from '@trackany-device/components';
import { Badge } from '@trackany-device/components';
import { mockUser, mockTenant } from '../../_mock-data';
import { AlertTriangle } from 'lucide-react';

const meta: Meta = {
    title: 'Apps/Tenant/Incidents',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const mockIncidents = [
    { id: 1, device: 'P901 #012', assignee: 'Raheel Ahmed', beat: 'North Lahore', rule: 'Out of Beat', priority: 'High', status: 'Open', time: '09:42 AM' },
    { id: 2, device: 'P901 #007', assignee: 'Asif Raza', beat: 'Central Faisalabad', rule: 'SOS Pressed', priority: 'Critical', status: 'Acknowledged', time: '09:31 AM' },
    { id: 3, device: 'GF-07 #003', assignee: 'Vehicle 003', beat: 'South Ring Road', rule: 'Device Offline', priority: 'Medium', status: 'Open', time: '08:55 AM' },
    { id: 4, device: 'P901 #019', assignee: 'Tariq Mahmood', beat: 'East Gulberg', rule: 'Low Battery', priority: 'Low', status: 'Resolved', time: '08:12 AM' },
];

const priorityVariant: Record<string, 'destructive' | 'default' | 'secondary' | 'outline'> = {
    Critical: 'destructive',
    High: 'outline',
    Medium: 'default',
    Low: 'secondary',
};

export const Default: Story = {
    render: () => (
        <AppSidebarLayout
            user={mockUser}
            tenant={mockTenant}
            breadcrumbs={[{ title: 'Alerts & Incidents', href: '/incidents' }]}
            unreadCount={2}
        >
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <h1 className="text-xl font-semibold">Alerts & Incidents</h1>
                    <Badge variant="destructive">6 open</Badge>
                </div>
                <div className="rounded-xl border border-border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/40 border-b border-border">
                            <tr>
                                {['Device', 'Assignee', 'Beat', 'Rule', 'Priority', 'Status', 'Time'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {mockIncidents.map((incident) => (
                                <tr key={incident.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                                    <td className="px-4 py-3 font-medium">{incident.device}</td>
                                    <td className="px-4 py-3">{incident.assignee}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{incident.beat}</td>
                                    <td className="px-4 py-3">{incident.rule}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={priorityVariant[incident.priority] ?? 'default'}>{incident.priority}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs ${incident.status === 'Open' ? 'text-destructive' : incident.status === 'Resolved' ? 'text-green-600' : 'text-blue-600'}`}>
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{incident.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    ),
};
