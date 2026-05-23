import type { Meta, StoryObj } from '@storybook/react';
import { WebAppLayout } from '@track-any-device/components';
import { MockPage } from '../../../.storybook/mocks/inertia-react';
import { mockPageProps } from '../../_mock-data';
import { Building2, ChevronRight } from 'lucide-react';

const meta: Meta = {
    title: 'Apps/My/Tenants',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [(Story) => <MockPage props={mockPageProps} url="/my-tenants"><Story /></MockPage>],
};
export default meta;
type Story = StoryObj;

const mockTenants = [
    { id: 1, slug: 'suthra-punjab', display_name: 'Suthra Punjab', sub_brand: 'Environment Protection & Climate Change Dept.', devices: 42, role: 'Supervisor' },
    { id: 2, slug: 'city-logistics', display_name: 'City Logistics Co.', sub_brand: null, devices: 18, role: 'Staff' },
];

export const Default: Story = {
    render: () => (
        <WebAppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">My Tenants</h1>
                <div className="space-y-3">
                    {mockTenants.map((tenant) => (
                        <a key={tenant.id} href={`https://${tenant.slug}.track-any-device.com`} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-primary/10 p-2.5"><Building2 className="h-5 w-5 text-primary" /></div>
                                <div>
                                    <p className="font-medium">{tenant.display_name}</p>
                                    {tenant.sub_brand && <p className="text-xs text-muted-foreground">{tenant.sub_brand}</p>}
                                    <p className="text-xs text-muted-foreground mt-0.5">{tenant.devices} devices · {tenant.role}</p>
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </a>
                    ))}
                </div>
            </div>
        </WebAppLayout>
    ),
};
