import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebarLayout } from '@trackany-device/components';
import { Badge } from '@trackany-device/components';
import { mockUser, mockTenant } from '../../_mock-data';
import { MonitorPlay, MapPin } from 'lucide-react';

const meta: Meta = {
    title: 'Apps/Tenant/LiveStream',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <AppSidebarLayout
            user={mockUser}
            tenant={mockTenant}
            breadcrumbs={[{ title: 'Live Monitoring', href: '/map' }]}
            unreadCount={2}
        >
            <div className="relative flex h-[calc(100vh-3.5rem)]">
                {/* Map placeholder */}
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Google Maps renders here</p>
                        <p className="text-xs mt-1">Requires VITE_GOOGLE_MAPS_API_KEY</p>
                    </div>
                </div>
                {/* Status strip */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border bg-background/95 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><MonitorPlay className="h-3.5 w-3.5 text-green-500" />187 online</span>
                        <span>61 idle</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="destructive">6 active incidents</Badge>
                        <span>Last sync 10:24:36 AM</span>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    ),
};
