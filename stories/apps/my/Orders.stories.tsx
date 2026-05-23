import type { Meta, StoryObj } from '@storybook/react';
import { WebAppLayout } from '@track-any-device/components';
import { MockPage } from '../../../.storybook/mocks/inertia-react';
import { mockPageProps } from '../../_mock-data';
import { Package } from 'lucide-react';

const meta: Meta = {
    title: 'Apps/My/Orders',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [(Story) => <MockPage props={mockPageProps} url="/my-orders"><Story /></MockPage>],
};
export default meta;
type Story = StoryObj;

const mockOrders = [
    { id: 'ORD-001', date: '2026-05-01', items: 3, total: 'PKR 14,997', status: 'Delivered' },
    { id: 'ORD-002', date: '2026-05-10', items: 1, total: 'PKR 6,999', status: 'Processing' },
    { id: 'ORD-003', date: '2026-05-20', items: 5, total: 'PKR 24,995', status: 'Pending' },
];

const statusColor: Record<string, string> = {
    Delivered: 'text-green-600 bg-green-50',
    Processing: 'text-blue-600 bg-blue-50',
    Pending: 'text-amber-600 bg-amber-50',
};

export const Default: Story = {
    render: () => (
        <WebAppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
                <div className="rounded-xl border border-border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/40 border-b border-border">
                            <tr>
                                {['Order', 'Date', 'Items', 'Total', 'Status'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {mockOrders.map((order) => (
                                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                                    <td className="px-4 py-3 font-medium">{order.id}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                                    <td className="px-4 py-3">{order.items} items</td>
                                    <td className="px-4 py-3">{order.total}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[order.status]}`}>{order.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </WebAppLayout>
    ),
};
