import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Timeline, TimelineItem } from '../../components/ui/timeline';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { Download, Filter, Search, type LucideIcon } from 'lucide-react';

export type ActivityVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

export interface ActivityItem {
    icon: LucideIcon;
    title: string;
    detail: string;
    datetime: string;
    variant: ActivityVariant;
}

export interface LoginEntry {
    device: string;
    location: string;
    ip: string;
    date: string;
    ok: boolean;
}

export interface FeedItem {
    initials: string;
    name: string;
    action: string;
    time: string;
    badge: { label: string; cls: string };
}

export function ActivityTimelineContent({ items }: { items: ActivityItem[] }) {
    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Activity</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5 mr-1.5" />Filter</Button>
                    <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" />Export</Button>
                </div>
            </div>
            <Card>
                <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
                <CardContent>
                    <Timeline>
                        {items.map((item, i) => (
                            <TimelineItem key={i} icon={item.icon} title={item.title} datetime={item.datetime} variant={item.variant}>
                                {item.detail}
                            </TimelineItem>
                        ))}
                    </Timeline>
                </CardContent>
            </Card>
        </div>
    );
}

export function ActivityTimelinePage({ layout, items }: { layout: LayoutName; items: ActivityItem[] }) {
    return (
        <LayoutResolved layout={layout} title="Activity" currentUrl="/activity">
            <ActivityTimelineContent items={items} />
        </LayoutResolved>
    );
}

export function LoginHistoryContent({ logins }: { logins: LoginEntry[] }) {
    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Login history</h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <input placeholder="Search…" className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border bg-background" />
                    </div>
                    <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" />Export</Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Device</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>IP address</TableHead>
                                <TableHead>Date &amp; time</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logins.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className="text-sm font-medium">{row.device}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{row.location}</TableCell>
                                    <TableCell className="text-xs font-mono text-muted-foreground">{row.ip}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{row.date}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`text-xs ${row.ok ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                                            {row.ok ? 'Success' : 'Failed'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Login statistics</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {[
                            { label: 'Total logins',    value: String(logins.length * 30), sub: 'Last 90 days'    },
                            { label: 'Failed attempts', value: String(logins.filter((l) => !l.ok).length), sub: 'Last 90 days', warn: true },
                            { label: 'Unique devices',  value: String(new Set(logins.map((l) => l.device)).size), sub: 'Across sessions' },
                        ].map(({ label, value, sub, warn }) => (
                            <div key={label} className="rounded-lg border border-border p-4">
                                <p className={`text-2xl font-bold ${warn ? 'text-destructive' : ''}`}>{value}</p>
                                <p className="text-sm font-medium mt-0.5">{label}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function LoginHistoryPage({ layout, logins }: { layout: LayoutName; logins: LoginEntry[] }) {
    return (
        <LayoutResolved layout={layout} title="Login History" currentUrl="/activity/login">
            <LoginHistoryContent logins={logins} />
        </LayoutResolved>
    );
}

export function AccountActivityFeedContent({ items }: { items: FeedItem[] }) {
    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Activity feed</h1>
            <Card>
                <CardContent className="p-0">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 px-5 py-4 border-b border-border last:border-0">
                            <Avatar className="h-8 w-8 mt-0.5 shrink-0">
                                <AvatarFallback className="text-xs">{item.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm"><span className="font-medium">{item.name}</span> {item.action}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                            </div>
                            <Badge variant="outline" className={`text-xs shrink-0 ${item.badge.cls}`}>{item.badge.label}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export function AccountActivityFeedPage({ layout, items }: { layout: LayoutName; items: FeedItem[] }) {
    return (
        <LayoutResolved layout={layout} title="Activity Feed" currentUrl="/activity/feed">
            <AccountActivityFeedContent items={items} />
        </LayoutResolved>
    );
}
