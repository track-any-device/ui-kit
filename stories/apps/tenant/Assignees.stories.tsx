import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebarLayout } from '@track-any-device/components';
import { Badge, Avatar, AvatarFallback } from '@track-any-device/components';
import { mockUser, mockTenant } from '../../_mock-data';

const meta: Meta = {
    title: 'Apps/Tenant/Assignees',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const assignees = [
    { id: 1, name: 'Raheel Ahmed', type: 'Worker', beat: 'North Lahore', status: 'Inside Beat', device: 'P901 #012' },
    { id: 2, name: 'Asif Raza', type: 'Worker', beat: 'Central Faisalabad', status: 'Out of Beat', device: 'P901 #007' },
    { id: 3, name: 'Vehicle 003', type: 'Vehicle', beat: 'South Ring Road', status: 'Offline', device: 'AOT120 #003' },
    { id: 4, name: 'Tariq Mahmood', type: 'Worker', beat: 'East Gulberg', status: 'Inside Beat', device: 'P901 #019' },
];

const statusVariant: Record<string, 'default' | 'destructive' | 'secondary'> = {
    'Inside Beat': 'default',
    'Out of Beat': 'destructive',
    'Offline': 'secondary',
};

export const Default: Story = {
    render: () => (
        <AppSidebarLayout user={mockUser} tenant={mockTenant} breadcrumbs={[{ title: 'Assignees', href: '/assignees' }]}>
            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">Assignees</h1>
                <div className="rounded-xl border border-border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/40 border-b border-border">
                            <tr>
                                {['Assignee', 'Type', 'Beat', 'Device', 'Status'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {assignees.map((a) => (
                                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7">
                                                <AvatarFallback className="text-xs">{a.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{a.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{a.type}</td>
                                    <td className="px-4 py-3">{a.beat}</td>
                                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{a.device}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={statusVariant[a.status] ?? 'default'}>{a.status}</Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    ),
};
