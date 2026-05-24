import {
    Badge, StatCard, Avatar, AvatarFallback,
    Card, CardContent, CardHeader, CardTitle, CardDescription,
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    Button,
} from '@trackany-device/components';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { MapPin, Users, Wifi, WifiOff } from 'lucide-react';

export type AssigneeStatus = 'inside' | 'outside' | 'offline';
export type AssigneeType   = 'Worker' | 'Vehicle';

export interface Assignee {
    id: number;
    name: string;
    initials: string;
    type: AssigneeType;
    beat: string;
    status: AssigneeStatus;
    device: string;
    signal: number;
}

const statusMeta: Record<AssigneeStatus, { label: string; style: string }> = {
    inside:  { label: 'Inside Beat', style: 'text-green-600 border-green-200 bg-green-50' },
    outside: { label: 'Out of Beat', style: 'text-red-600 border-red-200 bg-red-50'       },
    offline: { label: 'Offline',     style: 'text-gray-500 border-gray-200 bg-gray-50'    },
};

export function AssigneesTablePage({ layout, assignees }: { layout: LayoutName; assignees: Assignee[] }) {
    const online  = assignees.filter((a) => a.status !== 'offline').length;
    const offline = assignees.filter((a) => a.status === 'offline').length;
    return (
        <LayoutResolved layout={layout} title="Assignees" currentUrl="/assignees">
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                    <StatCard icon={Users}   label="Total Assignees" value={String(assignees.length)} description="12 divisions" />
                    <StatCard icon={Wifi}    label="Online"          value={String(online)}           description={`${Math.round((online / assignees.length) * 100)}% of total`} />
                    <StatCard icon={WifiOff} label="Offline"         value={String(offline)}          description={`${Math.round((offline / assignees.length) * 100)}% of total`} />
                </div>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Assignees</CardTitle>
                            <CardDescription>{assignees.length} of 248 shown</CardDescription>
                        </div>
                        <Button size="sm">Add assignee</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Assignee</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Beat</TableHead>
                                    <TableHead>Device</TableHead>
                                    <TableHead>Signal</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assignees.map((a) => (
                                    <TableRow key={a.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarFallback className="text-xs">{a.initials}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-sm">{a.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">{a.type}</TableCell>
                                        <TableCell className="text-sm">{a.beat}</TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">{a.device}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${a.signal > 60 ? 'bg-green-500' : a.signal > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                        style={{ width: `${a.signal}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground">{a.signal}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={statusMeta[a.status].style}>
                                                {statusMeta[a.status].label}
                                            </Badge>
                                        </TableCell>
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

export function AssigneesMapPage({ layout, assignees }: { layout: LayoutName; assignees: Assignee[] }) {
    const online  = assignees.filter((a) => a.status !== 'offline').length;
    const offline = assignees.filter((a) => a.status === 'offline').length;
    return (
        <LayoutResolved layout={layout} title="Assignees — Map" currentUrl="/assignees/map">
            <div className="flex h-[calc(100vh-3.5rem)]">
                <div className="flex-1 relative bg-muted/30 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">Live assignee positions</p>
                        <p className="text-xs mt-1">Google Maps renders here</p>
                    </div>
                </div>
                <div className="w-72 border-l border-border bg-background overflow-y-auto">
                    <div className="p-4 border-b border-border">
                        <p className="text-sm font-semibold">Assignees</p>
                        <p className="text-xs text-muted-foreground">{online} online · {offline} offline</p>
                    </div>
                    <div className="divide-y divide-border">
                        {assignees.map((a) => (
                            <div key={a.id} className="p-3 hover:bg-muted/30 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-xs">{a.initials}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{a.name}</span>
                                    </div>
                                    <Badge variant="outline" className={`text-xs ${statusMeta[a.status].style}`}>
                                        {statusMeta[a.status].label}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 ml-8">{a.beat}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutResolved>
    );
}
