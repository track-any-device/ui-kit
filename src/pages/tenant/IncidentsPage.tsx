import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { StatCard } from '../../components/ui/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Timeline, TimelineItem } from '../../components/ui/timeline';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { AlertTriangle, Battery, CheckCircle, Clock, Shield, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { DevicesMiniMap } from '../../components/devices/devices-mini-map';
import { incidentFlagUrl } from '../../lib/map-markers';

export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus  = 'open' | 'acknowledged' | 'resolved';

export interface Incident {
    id: string;
    device: string;
    assignee: string;
    beat: string;
    rule: string;
    priority: IncidentPriority;
    status: IncidentStatus;
    time: string;
}

export type LogEventType = 'sos' | 'created' | 'notification' | 'assignment' | 'resolution' | 'comment';
export type TimelineVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

export interface IncidentLogEntry {
    type: LogEventType;
    title: string;
    datetime: string;
    variant?: TimelineVariant;
    description: string;
}

export interface IncidentDetail {
    id: string;
    assignee: string;
    device: string;
    beat: string;
    rule: string;
    location: string;
    reported: string;
    assignedTo: string;
    priority: IncidentPriority;
    status: IncidentStatus;
    log: IncidentLogEntry[];
    lat?: number;
    lng?: number;
}

const priorityStyle: Record<IncidentPriority, string> = {
    critical: 'text-red-700 border-red-300 bg-red-50',
    high:     'text-orange-600 border-orange-200 bg-orange-50',
    medium:   'text-amber-600 border-amber-200 bg-amber-50',
    low:      'text-green-600 border-green-200 bg-green-50',
};

const statusStyle: Record<IncidentStatus, string> = {
    open:         'text-red-600',
    acknowledged: 'text-blue-600',
    resolved:     'text-green-600',
};

const LOG_ICON: Record<LogEventType, LucideIcon> = {
    sos:        AlertTriangle,
    created:    Battery,
    notification: Shield,
    assignment: Users,
    resolution: CheckCircle,
    comment:    Clock,
};

export function IncidentsPage({ layout, incidents }: { layout: LayoutName; incidents: Incident[] }) {
    return (
        <LayoutResolved layout={layout} title="Incidents" currentUrl="/incidents">
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={AlertTriangle} label="Open"         value="6"  description="2 critical"       />
                    <StatCard icon={Clock}         label="Pending"      value="14" description="Needs review"     />
                    <StatCard icon={Users}         label="Assigned"     value="9"  description="In progress"      />
                    <StatCard icon={CheckCircle}   label="Closed today" value="23" description="↑ 8 vs yesterday" deltaType="up" delta="↑8" />
                </div>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Active Incidents</CardTitle>
                            <CardDescription>Sorted by priority · {incidents.length} of 23 shown</CardDescription>
                        </div>
                        <Button size="sm">Report incident</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Device</TableHead>
                                    <TableHead>Assignee</TableHead>
                                    <TableHead>Rule</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incidents.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="font-mono text-xs">{row.id}</TableCell>
                                        <TableCell className="font-mono text-xs font-medium">{row.device}</TableCell>
                                        <TableCell>{row.assignee}</TableCell>
                                        <TableCell>{row.rule}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={priorityStyle[row.priority]}>{row.priority}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`text-xs font-medium ${statusStyle[row.status]}`}>{row.status}</span>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{row.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </LayoutResolved>
    );
}

export function IncidentDetailPage({ layout, incident }: { layout: LayoutName; incident: IncidentDetail }) {
    return (
        <LayoutResolved layout={layout} title={`Incident ${incident.id}`} currentUrl={`/incidents/${incident.id}`}>
            <div className="p-6 max-w-4xl space-y-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="destructive" className="capitalize">{incident.priority}</Badge>
                            <Badge variant="outline" className="capitalize">{incident.status}</Badge>
                        </div>
                        <h1 className="text-xl font-semibold">{incident.rule} — {incident.assignee}</h1>
                        <p className="text-muted-foreground text-sm mt-1">{incident.id} · {incident.beat} · {incident.device}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <Button variant="outline">Assign</Button>
                        <Button variant="destructive">Escalate</Button>
                        <Button>Resolve</Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-4">
                        <Card>
                            <CardHeader><CardTitle>Incident details</CardTitle></CardHeader>
                            <CardContent className="space-y-0 text-sm">
                                {([
                                    ['Assignee',    incident.assignee],
                                    ['Device',      incident.device],
                                    ['Beat',        incident.beat],
                                    ['Rule',        incident.rule],
                                    ['Location',    incident.location],
                                    ['Reported',    incident.reported],
                                    ['Assigned to', incident.assignedTo],
                                ] as [string, string][]).map(([label, value]) => (
                                    <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0">
                                        <span className="text-muted-foreground">{label}</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Location</CardTitle></CardHeader>
                            <CardContent className="p-0">
                                <DevicesMiniMap
                                    devices={incident.lat != null && incident.lng != null ? [{
                                        id: incident.id,
                                        name: incident.assignee,
                                        imei: incident.device,
                                        last_lat: incident.lat,
                                        last_lon: incident.lng,
                                        signal: null,
                                        heading: null,
                                    }] : []}
                                    incidents={incident.lat != null && incident.lng != null ? [{
                                        id: incident.id,
                                        lat: incident.lat,
                                        lon: incident.lng,
                                        flagUrl: incidentFlagUrl(incident.priority),
                                        title: `${incident.priority} — ${incident.rule}`,
                                    }] : []}
                                    fallbackCenter={incident.lat != null && incident.lng != null
                                        ? { lat: incident.lat, lng: incident.lng }
                                        : undefined}
                                    height="192px"
                                    className="rounded-none border-0 rounded-b-lg"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader><CardTitle>Activity log</CardTitle></CardHeader>
                        <CardContent>
                            <Timeline>
                                {incident.log.map((entry, i) => {
                                    const Icon = LOG_ICON[entry.type];
                                    return (
                                        <TimelineItem key={i} icon={Icon} title={entry.title} datetime={entry.datetime} variant={entry.variant}>
                                            {entry.description}
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
