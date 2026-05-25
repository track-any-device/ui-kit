import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { Building2, ChevronRight } from 'lucide-react';

export interface Tenant {
    id: number;
    slug: string;
    display_name: string;
    sub_brand: string | null;
    devices: number;
    role: string;
}

export function TenantsListContent({ tenants }: { tenants: Tenant[] }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">My Tenants</h1>
            <div className="space-y-3">
                {tenants.map((tenant) => (
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
    );
}

export function TenantsList({ layout, tenants }: { layout: LayoutName; tenants: Tenant[] }) {
    return (
        <LayoutResolved layout={layout} title="My Tenants" currentUrl="/my-tenants">
            <TenantsListContent tenants={tenants} />
        </LayoutResolved>
    );
}
