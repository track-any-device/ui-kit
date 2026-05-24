import { Badge, StatCard, Card, CardContent, CardHeader, CardTitle } from '@trackany-device/components';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { AlertTriangle, MapPin, MonitorPlay, Users, Wifi } from 'lucide-react';

export type LiveIncidentPriority = 'critical' | 'high' | 'medium';

export interface LiveIncident {
    id: string;
    assignee: string;
    rule: string;
    priority: LiveIncidentPriority;
}

export interface LiveVehicle {
    reg: string;
    location: string;
    speed: string;
}

export interface LiveStats {
    online: number;
    offline: number;
    activeTrips: number;
    activeIncidents: number;
    lastSync: string;
}

const priorityStyle: Record<LiveIncidentPriority, string> = {
    critical: 'text-red-600 border-red-200 bg-red-50 text-xs',
    high:     'text-orange-600 border-orange-200 bg-orange-50 text-xs',
    medium:   'text-amber-600 border-amber-200 bg-amber-50 text-xs',
};

export function LiveStreamPage({ layout, stats }: { layout: LayoutName; stats: LiveStats }) {
    return (
        <LayoutResolved layout={layout} title="Live Monitoring" currentUrl="/map">
            <div className="relative flex h-[calc(100vh-3.5rem)] flex-col">
                <div className="flex-1 relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">Google Maps renders here</p>
                        <p className="text-xs mt-1">Requires VITE_GOOGLE_MAPS_API_KEY</p>
                    </div>
                </div>
                <div className="flex items-center justify-between border-t border-border bg-background/95 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5 text-green-500" />{stats.online} online</span>
                        <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{stats.offline} offline</span>
                        <span className="flex items-center gap-1.5"><MonitorPlay className="h-3.5 w-3.5 text-blue-500" />{stats.activeTrips} active trips</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="destructive">{stats.activeIncidents} active incidents</Badge>
                        <span>Last sync {stats.lastSync}</span>
                    </div>
                </div>
            </div>
        </LayoutResolved>
    );
}

export function LiveStreamWithSidebarPage({
    layout,
    stats,
    incidents,
    vehicles,
}: {
    layout: LayoutName;
    stats: Pick<LiveStats, 'online' | 'activeIncidents'>;
    incidents: LiveIncident[];
    vehicles: LiveVehicle[];
}) {
    return (
        <LayoutResolved layout={layout} title="Live Monitoring" currentUrl="/map">
            <div className="flex h-[calc(100vh-3.5rem)]">
                <div className="flex-1 relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">Live Fleet Map</p>
                        <p className="text-xs mt-1">Requires VITE_GOOGLE_MAPS_API_KEY</p>
                    </div>
                </div>
                <div className="w-80 border-l border-border bg-background flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-border space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            <StatCard icon={Wifi}          label="Online"    value={String(stats.online)} />
                            <StatCard icon={AlertTriangle} label="Incidents" value={String(stats.activeIncidents)} />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-border">
                        <div className="px-4 py-2 bg-muted/30">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Active Incidents</p>
                        </div>
                        {incidents.map((inc) => (
                            <div key={inc.id} className="p-3 hover:bg-muted/30 cursor-pointer">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-mono text-muted-foreground">{inc.id}</span>
                                    <Badge variant="outline" className={priorityStyle[inc.priority]}>{inc.priority}</Badge>
                                </div>
                                <p className="text-sm font-medium">{inc.assignee}</p>
                                <p className="text-xs text-muted-foreground">{inc.rule}</p>
                            </div>
                        ))}
                        <div className="px-4 py-2 bg-muted/30 mt-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Online Vehicles</p>
                        </div>
                        {vehicles.map((v) => (
                            <div key={v.reg} className="p-3 hover:bg-muted/30 cursor-pointer">
                                <p className="text-sm font-mono font-medium">{v.reg}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-0.5">
                                    <span>{v.location}</span>
                                    <span>{v.speed}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutResolved>
    );
}
