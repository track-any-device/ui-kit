import {
    StatCard, Card, CardContent, CardHeader, CardTitle, CardDescription,
    Badge, Timeline, TimelineItem,
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    Button,
} from '@trackany-device/components';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { AlertTriangle, Battery, Car, ChevronRight, Clock, MapPin, MonitorPlay, Route, Shield, Users } from 'lucide-react';

export type VehicleStatus = 'online' | 'idle' | 'offline';
export type ActivityEventType = 'incident' | 'trip' | 'battery' | 'geofence';

export interface DashboardVehicle {
    reg: string;
    driver: string;
    status: VehicleStatus;
    speed: string;
}

export interface DashboardActivityEvent {
    type: ActivityEventType;
    title: string;
    datetime: string;
    detail: string;
    variant: 'default' | 'danger' | 'warning' | 'success' | 'info';
}

export interface DashboardStats {
    totalVehicles: number;
    onlineNow: number;
    activeIncidents: number;
    lowBattery: number;
}

const vehicleStatusStyle: Record<VehicleStatus, string> = {
    online:  'text-green-600 border-green-200 bg-green-50',
    idle:    'text-amber-600 border-amber-200 bg-amber-50',
    offline: 'text-red-600 border-red-200 bg-red-50',
};

const ACTIVITY_ICON = {
    incident: AlertTriangle,
    trip:     Route,
    battery:  Battery,
    geofence: Shield,
} satisfies Record<ActivityEventType, unknown>;

export function DashboardPage({
    layout,
    stats,
    vehicles,
    recentActivity,
}: {
    layout: LayoutName;
    stats: DashboardStats;
    vehicles: DashboardVehicle[];
    recentActivity: DashboardActivityEvent[];
}) {
    return (
        <LayoutResolved layout={layout} title="Dashboard" currentUrl="/dashboard">
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={Car}           label="Total Vehicles"   value={String(stats.totalVehicles)} description="+4 this month" />
                    <StatCard icon={MonitorPlay}   label="Online Now"       value={String(stats.onlineNow)}     description={`${Math.round((stats.onlineNow / stats.totalVehicles) * 100)}% of fleet`} />
                    <StatCard icon={AlertTriangle} label="Active Incidents" value={String(stats.activeIncidents)} description="2 critical" />
                    <StatCard icon={Battery}       label="Low Battery"      value={String(stats.lowBattery)}    description="Below 20%" />
                </div>

                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle>Live Fleet Map</CardTitle>
                        <CardDescription>Requires VITE_GOOGLE_MAPS_API_KEY</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex h-64 items-center justify-center bg-muted/40">
                            <div className="text-center text-muted-foreground">
                                <MapPin className="mx-auto mb-2 h-8 w-8" />
                                <p className="text-sm font-medium">DevicesMiniMap renders here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Vehicles</CardTitle>
                                <CardDescription>{vehicles.length} of {stats.totalVehicles} shown</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">View all <ChevronRight className="ml-1 h-3.5 w-3.5" /></Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Registration</TableHead>
                                        <TableHead>Driver</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Speed</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vehicles.map((r) => (
                                        <TableRow key={r.reg}>
                                            <TableCell className="font-mono text-xs font-medium">{r.reg}</TableCell>
                                            <TableCell>{r.driver}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={vehicleStatusStyle[r.status]}>{r.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">{r.speed}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Last 24 hours</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Timeline>
                                {recentActivity.map((event, i) => {
                                    const Icon = ACTIVITY_ICON[event.type];
                                    return (
                                        <TimelineItem key={i} icon={Icon} title={event.title} datetime={event.datetime} variant={event.variant}>
                                            {event.detail}
                                        </TimelineItem>
                                    );
                                })}
                            </Timeline>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </LayoutResolved>
    );
}

export interface IncidentAlert {
    title: string;
    detail: string;
}

export interface ExtendedDashboardStats extends DashboardStats {
    avgResponseTime: string;
    assigneesOnDuty: number;
    assigneesEnrolled: number;
    geofenceExits: number;
    activeTrips: number;
}

export function DashboardWithIncidentPage({
    layout,
    stats,
    alert,
}: {
    layout: LayoutName;
    stats: ExtendedDashboardStats;
    alert: IncidentAlert;
}) {
    return (
        <LayoutResolved layout={layout} title="Dashboard" currentUrl="/dashboard">
            <div className="p-6 space-y-6">
                <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-destructive">{alert.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{alert.detail}</p>
                    </div>
                    <Button variant="destructive" size="sm" className="ml-auto shrink-0">Review now</Button>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={Car}           label="Total Vehicles"   value={String(stats.totalVehicles)}    description="+4 this month" />
                    <StatCard icon={MonitorPlay}   label="Online Now"       value={String(stats.onlineNow)}        description={`${Math.round((stats.onlineNow / stats.totalVehicles) * 100)}% of fleet`} />
                    <StatCard icon={AlertTriangle} label="Active Incidents" value={String(stats.activeIncidents)}  description="2 critical" deltaType="down" delta="↑2" />
                    <StatCard icon={Clock}         label="Avg Response"     value={stats.avgResponseTime}          description="vs 5.1m last week" deltaType="up" delta="↓0.9m" />
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={Users}  label="Assignees On Duty" value={String(stats.assigneesOnDuty)}  description={`of ${stats.assigneesEnrolled} enrolled`} />
                    <StatCard icon={Battery} label="Low Battery"      value={String(stats.lowBattery)}       description="Below 20%" />
                    <StatCard icon={Shield}  label="Geofence Exits"   value={String(stats.geofenceExits)}    description="Today" />
                    <StatCard icon={Route}   label="Active Trips"     value={String(stats.activeTrips)}      description="in progress" />
                </div>
            </div>
        </LayoutResolved>
    );
}
