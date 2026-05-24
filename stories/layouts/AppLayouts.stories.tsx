import type { Meta, StoryObj } from '@storybook/react';
import {
    TopNavLayout, SidebarFixedLayout, NavbarCollapsibleLayout,
    SplitSidebarLayout, NavbarSidebarLayout, SidebarTabsLayout,
    MegaMenuLayout, SidebarMinimalLayout, MegaMenuNavbarLayout, SidebarDualMenuLayout,
    WorkspaceSidebarLayout, MailLayout, AIChatLayout, CalendarSidebarLayout, FocusSidebarLayout,
    Card, CardContent, CardHeader, CardTitle, CardDescription,
    Badge, StatCard, Timeline, TimelineItem,
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    Avatar, AvatarFallback, AvatarGroup, AvatarGroupItem,
    Button,
} from '@trackany-device/components';
import type { NavItem } from '@trackany-device/components';
import {
    Activity, AlertTriangle, Battery, Car, ChevronRight,
    Clock, MapPin, MonitorPlay, Route, Settings, Shield,
    TrendingUp, Users, Wifi, WifiOff,
} from 'lucide-react';

// ── Shared nav / user fixtures ────────────────────────────────────────────────

const FLEET_NAV: NavItem[] = [
    { title: 'Dashboard',  url: '/dashboard',  isActive: true },
    { title: 'Vehicles',   url: '/vehicles',
        items: [
            { title: 'All Vehicles', url: '/vehicles' },
            { title: 'Live Map',     url: '/vehicles/map' },
            { title: 'Add Vehicle',  url: '/vehicles/new' },
        ],
    },
    { title: 'Drivers',    url: '/drivers' },
    { title: 'Trips',      url: '/trips' },
    { title: 'Incidents',  url: '/incidents' },
    { title: 'Alerts',     url: '/alerts' },
    { title: 'Reports',    url: '/reports' },
    { title: 'Settings',   url: '/settings' },
];

const USER = { name: 'Ahmad Faryab', email: 'ahmad@tad.io', avatar: '' };

// ── Reusable page content components ─────────────────────────────────────────

function DashboardStats() {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Car}          label="Total Vehicles"    value="312"  description="+4 this month" />
            <StatCard icon={MonitorPlay}  label="Online Now"        value="248"  description="79% of fleet"  />
            <StatCard icon={AlertTriangle} label="Active Incidents" value="6"    description="2 critical"   />
            <StatCard icon={Battery}      label="Low Battery"       value="14"   description="Below 20%"    />
        </div>
    );
}

function RecentActivity() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Last 24 hours across the fleet</CardDescription>
            </CardHeader>
            <CardContent>
                <Timeline>
                    <TimelineItem icon={AlertTriangle} title="Incident reported — Unit 07" datetime="2026-05-26T09:14:00Z" variant="danger">
                        Speeding violation detected on GT Road, Lahore
                    </TimelineItem>
                    <TimelineItem icon={Route} title="Trip completed — Unit 22" datetime="2026-05-26T08:37:00Z">
                        128 km · Lahore → Faisalabad
                    </TimelineItem>
                    <TimelineItem icon={Battery} title="Low battery — Unit 14" datetime="2026-05-26T08:02:00Z" variant="warning">
                        Battery at 15%. Please charge immediately.
                    </TimelineItem>
                    <TimelineItem icon={Shield} title="Geofence entered — Unit 03" datetime="2026-05-26T07:30:00Z" variant="success">
                        Vehicle entered Lahore Central Depot
                    </TimelineItem>
                </Timeline>
            </CardContent>
        </Card>
    );
}

function VehiclesTable() {
    const rows = [
        { reg: 'LEA-3412', driver: 'Ali Hassan',     status: 'online',  battery: 88, location: 'Lahore',      speed: '42 km/h' },
        { reg: 'LZB-7721', driver: 'Kamran Arif',    status: 'idle',    battery: 62, location: 'Gujranwala',  speed: '0 km/h'  },
        { reg: 'RXB-9901', driver: 'Zeeshan Butt',   status: 'offline', battery: 11, location: 'Faisalabad',  speed: '—'       },
        { reg: 'MNB-5543', driver: 'Usman Malik',    status: 'online',  battery: 74, location: 'Multan',      speed: '67 km/h' },
        { reg: 'QRT-2218', driver: 'Adil Chaudhry',  status: 'idle',    battery: 51, location: 'Rawalpindi',  speed: '0 km/h'  },
    ];

    const statusBadge = (s: string) => {
        if (s === 'online')  return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Online</Badge>;
        if (s === 'idle')    return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Idle</Badge>;
        return                      <Badge variant="outline" className="text-red-600   border-red-200   bg-red-50">Offline</Badge>;
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Vehicles</CardTitle>
                    <CardDescription>5 of 312 vehicles</CardDescription>
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
                            <TableHead>Battery</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Speed</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((r) => (
                            <TableRow key={r.reg}>
                                <TableCell className="font-mono text-xs font-medium">{r.reg}</TableCell>
                                <TableCell>{r.driver}</TableCell>
                                <TableCell>{statusBadge(r.status)}</TableCell>
                                <TableCell>
                                    <span className={r.battery < 20 ? 'text-red-600 font-medium' : ''}>{r.battery}%</span>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">{r.location}</TableCell>
                                <TableCell className="text-sm">{r.speed}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function AssigneesOverview() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Active Assignees</CardTitle>
                    <CardDescription>On duty right now</CardDescription>
                </div>
                <AvatarGroup max={5}>
                    {['Ali', 'Kamran', 'Zeeshan', 'Usman', 'Adil', 'Bilal', 'Salman'].map((n) => (
                        <AvatarGroupItem key={n} fallback={n[0]} />
                    ))}
                </AvatarGroup>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-green-500" />
                        <span className="font-semibold">187</span>
                        <span className="text-muted-foreground">online</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <WifiOff className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">61</span>
                        <span className="text-muted-foreground">offline</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="font-semibold">12</span>
                        <span className="text-muted-foreground">idle</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function MapPlaceholder() {
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>Live Fleet Map</CardTitle>
                <CardDescription>Real-time vehicle positions · Google Maps API required</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex h-64 items-center justify-center bg-muted/40">
                    <div className="text-center text-muted-foreground">
                        <MapPin className="mx-auto mb-2 h-8 w-8" />
                        <p className="text-sm font-medium">Configure VITE_GOOGLE_MAPS_API_KEY</p>
                        <p className="text-xs mt-1">DevicesMiniMap renders here</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function DashboardPage() {
    return (
        <div className="p-6 space-y-6">
            <DashboardStats />
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2"><MapPlaceholder /></div>
                <AssigneesOverview />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <VehiclesTable />
                <RecentActivity />
            </div>
        </div>
    );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'Layouts/App Layouts',
    parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

// ── Layout stories ────────────────────────────────────────────────────────────

export const TopNav: Story = {
    name: 'Top Nav',
    render: () => (
        <TopNavLayout
            navItems={FLEET_NAV} currentUrl="/dashboard" user={USER}
            title="Dashboard" appName="Track Any Device" logoHref="/"
            copyright="© 2026 Track Any Device" footerLinks={[{ label: 'Support', href: '#' }, { label: 'Privacy', href: '#' }]}
        >
            <DashboardPage />
        </TopNavLayout>
    ),
};

export const SidebarFixed: Story = {
    name: 'Sidebar Fixed',
    render: () => (
        <SidebarFixedLayout navItems={FLEET_NAV} currentUrl="/dashboard" user={USER} title="Dashboard" appName="Track Any Device">
            <DashboardPage />
        </SidebarFixedLayout>
    ),
};

export const NavbarCollapsible: Story = {
    name: 'Navbar Collapsible',
    render: () => (
        <NavbarCollapsibleLayout navItems={FLEET_NAV} currentUrl="/dashboard" user={USER} title="Dashboard" appName="Track Any Device">
            <DashboardPage />
        </NavbarCollapsibleLayout>
    ),
};

export const SplitSidebar: Story = {
    name: 'Split Sidebar',
    render: () => (
        <SplitSidebarLayout navItems={FLEET_NAV} currentUrl="/dashboard" user={USER} title="Dashboard">
            <DashboardPage />
        </SplitSidebarLayout>
    ),
};

export const NavbarSidebar: Story = {
    name: 'Navbar + Sidebar',
    render: () => (
        <NavbarSidebarLayout navItems={FLEET_NAV} currentUrl="/dashboard" user={USER} title="Dashboard">
            <DashboardPage />
        </NavbarSidebarLayout>
    ),
};

export const SidebarTabs: Story = {
    name: 'Sidebar Tabs',
    render: () => (
        <SidebarTabsLayout
            primaryNavItems={[
                { title: 'Fleet',  url: '/fleet',  items: FLEET_NAV.slice(0, 4) },
                { title: 'Admin',  url: '/admin',  items: FLEET_NAV.slice(4) },
            ]}
            navItems={FLEET_NAV}
            currentUrl="/dashboard"
            user={USER}
        >
            <DashboardPage />
        </SidebarTabsLayout>
    ),
};

export const MegaMenu: Story = {
    name: 'Mega Menu',
    render: () => (
        <MegaMenuLayout navItems={FLEET_NAV} currentUrl="/dashboard" user={USER} title="Dashboard">
            <DashboardPage />
        </MegaMenuLayout>
    ),
};

export const SidebarMinimal: Story = {
    name: 'Sidebar Minimal',
    render: () => (
        <SidebarMinimalLayout navItems={FLEET_NAV} currentUrl="/dashboard" user={USER} title="Dashboard">
            <DashboardPage />
        </SidebarMinimalLayout>
    ),
};

export const MegaMenuNavbar: Story = {
    name: 'Mega Menu Navbar',
    render: () => (
        <MegaMenuNavbarLayout navItems={FLEET_NAV} currentUrl="/dashboard" user={USER} title="Dashboard">
            <DashboardPage />
        </MegaMenuNavbarLayout>
    ),
};

export const SidebarDualMenu: Story = {
    name: 'Sidebar Dual Menu',
    render: () => (
        <SidebarDualMenuLayout
            primaryNavItems={[
                { title: 'Fleet',  url: '/fleet',  items: FLEET_NAV.slice(0, 4) },
                { title: 'Admin',  url: '/admin',  items: FLEET_NAV.slice(4) },
            ]}
            navItems={FLEET_NAV}
            currentUrl="/dashboard"
            user={USER}
        >
            <DashboardPage />
        </SidebarDualMenuLayout>
    ),
};

export const WorkspaceSidebar: Story = {
    name: 'Workspace Sidebar',
    render: () => (
        <WorkspaceSidebarLayout
            navItems={FLEET_NAV}
            workspaces={[
                { id: 'fleet',  name: 'Track Any Device',    href: '/' },
                { id: 'admin',  name: 'Admin Console',    href: '/admin' },
                { id: 'epacc',  name: 'EPA Climate Dept', href: '/epacc' },
            ]}
            activeWorkspace="fleet"
            currentUrl="/dashboard"
            user={USER}
        >
            <DashboardPage />
        </WorkspaceSidebarLayout>
    ),
};

export const Mail: Story = {
    name: 'Mail Layout',
    render: () => (
        <MailLayout
            navItems={[
                { title: 'Inbox',   url: '/mail/inbox',   isActive: true },
                { title: 'Sent',    url: '/mail/sent' },
                { title: 'Drafts',  url: '/mail/drafts' },
                { title: 'Archive', url: '/mail/archive' },
                { title: 'Trash',   url: '/mail/trash' },
            ]}
            currentUrl="/mail/inbox"
            user={USER}
            listPanel={
                <div className="divide-y divide-border">
                    {[
                        { from: 'Ali Hassan',    subject: 'Vehicle LEA-3412 — speeding alert', preview: 'Unit was clocked at 97 km/h on the GT Road…', time: '9:14 AM', unread: true  },
                        { from: 'System Alert',  subject: 'Low battery — Unit 14 (11%)',        preview: 'Vehicle RXB-9901 battery is critically low…',  time: '8:30 AM', unread: true  },
                        { from: 'Kamran Arif',   subject: 'Trip completed — 128 km',             preview: 'Lahore to Faisalabad route wrapped up OK…',  time: 'Yesterday', unread: false },
                        { from: 'Adil Chaudhry', subject: 'Geofence exit — Rawalpindi depot',   preview: 'QRT-2218 left the Rawalpindi depot at 7:45…',  time: 'Yesterday', unread: false },
                    ].map((m) => (
                        <div key={m.subject} className={`p-4 cursor-pointer hover:bg-muted/50 ${m.unread ? 'bg-muted/20' : ''}`}>
                            <div className="flex items-start justify-between gap-2">
                                <p className={`text-sm ${m.unread ? 'font-semibold' : 'font-medium'}`}>{m.from}</p>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{m.time}</span>
                            </div>
                            <p className={`text-sm mt-0.5 ${m.unread ? 'font-medium' : ''} truncate`}>{m.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{m.preview}</p>
                        </div>
                    ))}
                </div>
            }
        >
            <div className="p-8 space-y-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-base">Vehicle LEA-3412 — speeding alert</CardTitle>
                                <CardDescription>From: Ali Hassan · To: Fleet Manager · 9:14 AM</CardDescription>
                            </div>
                            <Badge variant="destructive">Urgent</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <p>Unit was clocked at 97 km/h on the GT Road, exceeding the 80 km/h limit. Driver has been notified. Please review and take appropriate action.</p>
                        <p className="mt-3 text-muted-foreground text-xs">Location: 31.5204°N 74.3587°E · Speed: 97 km/h · Limit: 80 km/h</p>
                    </CardContent>
                </Card>
            </div>
        </MailLayout>
    ),
};

export const AIChat: Story = {
    name: 'AI Chat Layout',
    render: () => (
        <AIChatLayout
            chatHistory={[
                { id: '1', title: 'Fleet efficiency analysis',      href: '/ai/1', date: 'Today'     },
                { id: '2', title: 'Route optimisation — Lahore',    href: '/ai/2', date: 'Today'     },
                { id: '3', title: 'Monthly fuel cost report',       href: '/ai/3', date: 'Yesterday' },
                { id: '4', title: 'Driver performance comparison',  href: '/ai/4', date: 'Yesterday' },
                { id: '5', title: 'Incident pattern insights',      href: '/ai/5', date: 'Mon'       },
            ]}
            currentUrl="/ai/1"
            user={USER}
        >
            <div className="flex flex-1 flex-col items-center justify-end p-6 gap-4 max-w-3xl mx-auto w-full">
                <div className="w-full space-y-4 mb-4">
                    <Card className="ml-auto max-w-[70%]">
                        <CardContent className="py-3 px-4 text-sm">
                            Analyse fuel efficiency for the Lahore fleet this month and compare with last month.
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/30 max-w-[80%]">
                        <CardContent className="py-3 px-4 text-sm">
                            <p className="font-medium mb-2 flex items-center gap-2"><Activity className="h-4 w-4" /> Fleet Fuel Efficiency — May 2026</p>
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div><p className="text-2xl font-bold text-green-600">12.4</p><p className="text-xs text-muted-foreground">km/L avg</p></div>
                                <div><p className="text-2xl font-bold">11.8</p><p className="text-xs text-muted-foreground">last month</p></div>
                                <div><p className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1"><TrendingUp className="h-5 w-5" />5%</p><p className="text-xs text-muted-foreground">improvement</p></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full flex gap-2">
                    <input
                        className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Ask about your fleet…"
                        readOnly
                    />
                    <Button>Send</Button>
                </div>
            </div>
        </AIChatLayout>
    ),
};

export const CalendarSidebar: Story = {
    name: 'Calendar Sidebar',
    render: () => (
        <CalendarSidebarLayout
            categories={[
                { name: 'Maintenance Due',  color: '#ef4444' },
                { name: 'Scheduled Trips',  color: '#3b82f6' },
                { name: 'Driver Shifts',    color: '#16a34a' },
                { name: 'Public Holidays',  color: '#f59e0b' },
            ]}
            currentUrl="/calendar"
            user={USER}
            title="Fleet Calendar"
        >
            <div className="p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>May 2026</CardTitle>
                        <CardDescription>4 events scheduled this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-2">
                            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => <div key={d}>{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                            {Array.from({ length: 31 }, (_, i) => {
                                const day = i + 1;
                                const events = day === 7 ? 'bg-blue-500 text-white' : day === 14 ? 'bg-red-500 text-white' : day === 24 ? 'ring-2 ring-primary font-semibold' : '';
                                return (
                                    <div key={day} className={`rounded-full p-1.5 cursor-pointer hover:bg-muted ${events}`}>{day}</div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CalendarSidebarLayout>
    ),
};

export const FocusSidebar: Story = {
    name: 'Focus Sidebar',
    render: () => (
        <FocusSidebarLayout
            navItems={[
                { title: 'Today',     url: '/tasks/today',    isActive: true },
                { title: 'Upcoming',  url: '/tasks/upcoming' },
                { title: 'All Tasks', url: '/tasks' },
                { title: 'Completed', url: '/tasks/done' },
            ]}
            tags={[
                { name: 'Urgent',      count: 3,  href: '/tasks?tag=urgent'  },
                { name: 'Fleet',       count: 7,  href: '/tasks?tag=fleet'   },
                { name: 'Maintenance', count: 2,  href: '/tasks?tag=maint'   },
                { name: 'Reports',     count: 5,  href: '/tasks?tag=reports' },
            ]}
            currentUrl="/tasks/today"
            user={USER}
        >
            <div className="p-6 space-y-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Today — 5 tasks</CardTitle>
                        <CardDescription>Monday, 26 May 2026</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                            { done: true,  tag: 'Fleet',       label: 'Review daily fleet status report' },
                            { done: false, tag: 'Urgent',      label: 'Investigate speeding incident — LEA-3412' },
                            { done: false, tag: 'Maintenance', label: 'Schedule quarterly service — 8 vehicles due' },
                            { done: false, tag: 'Fleet',       label: 'Onboard 3 new drivers — induction docs' },
                            { done: false, tag: 'Reports',     label: 'Send May fuel efficiency report to management' },
                        ].map((t) => (
                            <div key={t.label} className="flex items-center gap-3 rounded-lg border border-border p-3">
                                <input type="checkbox" defaultChecked={t.done} className="rounded border-input" readOnly />
                                <span className={`flex-1 text-sm ${t.done ? 'line-through text-muted-foreground' : ''}`}>{t.label}</span>
                                <Badge variant="secondary" className="text-xs">{t.tag}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </FocusSidebarLayout>
    ),
};

export const SettingsPage: Story = {
    name: 'Sidebar Fixed — Settings',
    render: () => (
        <SidebarFixedLayout
            navItems={FLEET_NAV} currentUrl="/settings" user={USER}
            title="Settings" appName="Track Any Device"
        >
            <div className="p-6 max-w-3xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your profile and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-xl">A</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">Ahmad Faryab</p>
                                <p className="text-sm text-muted-foreground">ahmad@tad.io · Administrator</p>
                                <Button variant="outline" size="sm" className="mt-2">Change photo</Button>
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[['Full Name', 'Ahmad Faryab'], ['Email', 'ahmad@tad.io'], ['Phone', '+92 300 0000000'], ['Timezone', 'Asia/Karachi (PKT +5)']].map(([label, val]) => (
                                <div key={label} className="space-y-1.5">
                                    <label className="text-sm font-medium">{label}</label>
                                    <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={val} readOnly />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save changes</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Two-factor authentication and password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { label: 'Password', detail: 'Last changed 30 days ago',   action: 'Change password', icon: Shield },
                            { label: 'Two-factor auth', detail: 'Not enabled',         action: 'Enable 2FA',      icon: Shield },
                            { label: 'Active sessions', detail: '2 sessions · 1 device', action: 'Manage sessions', icon: Settings },
                        ].map((row) => (
                            <div key={row.label} className="flex items-center justify-between rounded-lg border border-border p-3">
                                <div className="flex items-center gap-3">
                                    <row.icon className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{row.label}</p>
                                        <p className="text-xs text-muted-foreground">{row.detail}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">{row.action}</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </SidebarFixedLayout>
    ),
};

export const IncidentsPage: Story = {
    name: 'Sidebar Fixed — Incidents',
    render: () => (
        <SidebarFixedLayout
            navItems={FLEET_NAV} currentUrl="/incidents" user={USER}
            title="Incidents" appName="Track Any Device"
        >
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={AlertTriangle} label="Open"       value="6"   description="2 critical"  />
                    <StatCard icon={Clock}         label="Pending"    value="14"  description="Needs review"/>
                    <StatCard icon={Users}         label="Assigned"   value="9"   description="In progress" />
                    <StatCard icon={Shield}        label="Closed today" value="23" description="↑ 8 vs yesterday" />
                </div>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Active Incidents</CardTitle>
                            <CardDescription>Sorted by severity</CardDescription>
                        </div>
                        <Button size="sm">Report incident</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Assignee</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { id: 'INC-0041', vehicle: 'LEA-3412', type: 'Speeding',    severity: 'high',   location: 'GT Road, Lahore',     time: '09:14', assignee: 'Ali H.' },
                                    { id: 'INC-0040', vehicle: 'RXB-9901', type: 'Battery',     severity: 'medium', location: 'Faisalabad',          time: '08:30', assignee: 'Unassigned' },
                                    { id: 'INC-0039', vehicle: 'MNB-5543', type: 'Geofence',    severity: 'low',    location: 'Multan Industrial',   time: 'Yesterday', assignee: 'Usman M.' },
                                    { id: 'INC-0038', vehicle: 'QRT-2218', type: 'Harsh braking', severity: 'medium', location: 'Rawalpindi',        time: 'Yesterday', assignee: 'Adil C.' },
                                ].map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="font-mono text-xs">{row.id}</TableCell>
                                        <TableCell className="font-mono text-xs font-medium">{row.vehicle}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                row.severity === 'high'   ? 'text-red-600 border-red-200 bg-red-50' :
                                                row.severity === 'medium' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                                                'text-green-600 border-green-200 bg-green-50'
                                            }>{row.severity}</Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{row.location}</TableCell>
                                        <TableCell className="text-sm">{row.time}</TableCell>
                                        <TableCell className="text-sm">{row.assignee}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </SidebarFixedLayout>
    ),
};
