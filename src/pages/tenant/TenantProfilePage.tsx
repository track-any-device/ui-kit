import {
    Avatar, AvatarFallback,
    Badge,
    Button,
    Card, CardContent, CardDescription, CardHeader, CardTitle,
    Checkbox,
    Input, Label, Textarea,
    PasswordInput,
    PlanCard,
    RadioGroup,
    Select,
    Separator,
    Switch,
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    Tabs, TabsContent, TabsList, TabsTrigger,
    AppearanceTabs,
} from '@trackany-device/components';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import {
    AlertTriangle, Bell, Building2, Camera, CheckCircle2, ChevronRight,
    Copy, CreditCard, Download, KeyRound, Laptop,
    Link2, Lock, Mail, Palette, Plus,
    Shield, ShieldCheck, Smartphone, Star, Trash2, UserCircle, UserCog, Users,
} from 'lucide-react';
import { useState } from 'react';

export interface TenantUser {
    name: string;
    email: string;
    phone: string;
    role: string;
    initials: string;
}

export interface TenantOrg {
    name: string;
    slug: string;
    email: string;
    phone: string;
    vat: string;
    reg: string;
    website: string;
}

export interface OrgMember {
    name: string;
    email: string;
    role: string;
    twofa: boolean;
    joined: string;
    initials: string;
}

export interface SecurityLogEntry {
    event: string;
    user: string;
    ip: string;
    date: string;
    ok: boolean;
}

export interface TenantInvoice {
    id: string;
    date: string;
    amount: string;
    status: string;
}

const SIDEBAR_NAV = [
    { id: 'info',   label: 'Personal info',    icon: UserCircle  },
    { id: 'auth',   label: 'Email & password', icon: Mail        },
    { id: 'twofa',  label: '2FA',              icon: ShieldCheck },
    { id: 'social', label: 'Social sign-in',   icon: Link2       },
    { id: 'notif',  label: 'Notifications',    icon: Bell        },
    { id: 'appear', label: 'Appearance',       icon: Palette     },
    { id: 'prefs',  label: 'Preferences',      icon: UserCog     },
    { id: 'api',    label: 'API access',        icon: KeyRound    },
    { id: 'delete', label: 'Danger zone',       icon: Trash2      },
];

export function UserProfileTabsPage({ layout, user }: { layout: LayoutName; user: TenantUser }) {
    const [name, setName] = useState(user.name);
    return (
        <LayoutResolved layout={layout} title="My Profile" currentUrl="/profile">
            <div className="p-6 max-w-2xl space-y-6">
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        <Avatar className="h-16 w-16"><AvatarFallback className="text-xl">{user.initials}</AvatarFallback></Avatar>
                        <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                            <Camera className="h-3.5 w-3.5" />
                        </button>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">{name}</h1>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex gap-1.5 mt-1">
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="profile">
                    <TabsList>
                        <TabsTrigger value="profile"><UserCircle className="h-4 w-4 mr-1.5" />Profile</TabsTrigger>
                        <TabsTrigger value="password"><Lock className="h-4 w-4 mr-1.5" />Password</TabsTrigger>
                        <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-1.5" />Notifications</TabsTrigger>
                        <TabsTrigger value="security"><Shield className="h-4 w-4 mr-1.5" />Security</TabsTrigger>
                        <TabsTrigger value="appearance"><Palette className="h-4 w-4 mr-1.5" />Appearance</TabsTrigger>
                    </TabsList>

                    <Card className="mt-4">
                        <TabsContent value="profile" className="m-0">
                            <CardHeader><CardTitle>Profile information</CardTitle><CardDescription>Update your name, phone and bio.</CardDescription></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5"><Label>Full name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
                                    <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue={user.phone} /></div>
                                    <div className="space-y-1.5"><Label>Email</Label><Input value={user.email} disabled className="opacity-60" /></div>
                                    <div className="space-y-1.5"><Label>Role</Label><Input value={user.role} disabled className="opacity-60" /><p className="text-xs text-muted-foreground">Assigned by your administrator.</p></div>
                                </div>
                                <div className="space-y-1.5"><Label>Bio</Label><Textarea rows={2} defaultValue="Fleet supervisor at Track Any Device." /></div>
                                <div className="flex justify-end"><Button size="sm">Save changes</Button></div>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="password" className="m-0">
                            <CardHeader><CardTitle>Change password</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1.5"><Label>Current password</Label><PasswordInput /></div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5"><Label>New password</Label><PasswordInput /></div>
                                    <div className="space-y-1.5"><Label>Confirm</Label><PasswordInput /></div>
                                </div>
                                <div className="flex justify-end"><Button size="sm">Update password</Button></div>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="notifications" className="m-0">
                            <CardHeader><CardTitle>Notification preferences</CardTitle></CardHeader>
                            <CardContent>
                                {[
                                    { label: 'Critical incidents', desc: 'SOS and high-priority violations', on: true  },
                                    { label: 'Device offline',      desc: 'When a device stops reporting',   on: true  },
                                    { label: 'Geofence violations', desc: 'Zone entry/exit alerts',          on: true  },
                                    { label: 'Low battery',         desc: 'Below 20% on any device',         on: false },
                                    { label: 'Weekly email digest', desc: 'Fleet summary every Monday',      on: true  },
                                ].map(({ label, desc, on }) => (
                                    <div key={label} className="flex items-start justify-between py-2.5 border-b border-border last:border-0">
                                        <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div>
                                        <Switch defaultChecked={on} />
                                    </div>
                                ))}
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="security" className="m-0">
                            <CardHeader><CardTitle>Security</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                                    <div><p className="text-sm font-medium">Two-factor authentication</p><p className="text-xs text-muted-foreground mt-0.5">Not enabled</p></div>
                                    <Button size="sm">Enable 2FA</Button>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-3">Active sessions</p>
                                    {[
                                        { d: 'MacBook Pro — Chrome', t: 'Current session', current: true  },
                                        { d: 'iPhone 15 — Safari',   t: '2 hours ago',     current: false },
                                    ].map((s) => (
                                        <div key={s.d} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                            <div><p className="text-sm">{s.d}</p><p className="text-xs text-muted-foreground">{s.t}</p></div>
                                            {s.current
                                                ? <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">This device</Badge>
                                                : <Button variant="ghost" size="sm" className="text-destructive h-7 px-2 text-xs">Revoke</Button>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="appearance" className="m-0">
                            <CardHeader><CardTitle>Appearance</CardTitle><CardDescription>Personalise how the app looks for you.</CardDescription></CardHeader>
                            <CardContent><AppearanceTabs /></CardContent>
                        </TabsContent>
                    </Card>
                </Tabs>
            </div>
        </LayoutResolved>
    );
}

export function UserSettingsSidebarPage({ layout, user, orgName }: {
    layout: LayoutName;
    user: TenantUser;
    orgName: string;
}) {
    const [active, setActive] = useState('info');
    return (
        <LayoutResolved layout={layout} title="Settings" currentUrl="/settings/profile">
            <div className="flex min-h-full">
                <aside className="hidden md:flex flex-col gap-0.5 w-52 shrink-0 sticky top-0 self-start max-h-screen overflow-y-auto border-r border-border p-3">
                    <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">My Settings</p>
                    {SIDEBAR_NAV.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => setActive(id)}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-left transition-colors ${active === id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground'}`}>
                            <Icon className="h-4 w-4 shrink-0" />{label}
                        </button>
                    ))}
                </aside>

                <div className="flex-1 p-6 space-y-6 max-w-xl">
                    <Card>
                        <CardHeader><CardTitle>Personal information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12"><AvatarFallback>{user.initials}</AvatarFallback></Avatar>
                                <Button variant="outline" size="sm"><Camera className="h-3.5 w-3.5 mr-1.5" />Change photo</Button>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue={user.name} /></div>
                                <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue={user.phone} /></div>
                                <div className="space-y-1.5"><Label>Country</Label><Select defaultValue="pk"><option value="pk">Pakistan</option></Select></div>
                                <div className="space-y-1.5"><Label>Timezone</Label><Select defaultValue="pkt"><option value="pkt">PKT (UTC+5)</option></Select></div>
                            </div>
                            <div className="space-y-1.5"><Label>Bio</Label><Textarea rows={2} defaultValue={`Fleet supervisor at ${orgName}.`} /></div>
                            <div className="flex justify-end"><Button size="sm">Save changes</Button></div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Email &amp; password</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1.5"><Label>Email address</Label><Input type="email" defaultValue={user.email} /></div>
                            <Separator />
                            <div className="space-y-1.5"><Label>Current password</Label><PasswordInput /></div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-1.5"><Label>New password</Label><PasswordInput /></div>
                                <div className="space-y-1.5"><Label>Confirm</Label><PasswordInput /></div>
                            </div>
                            <div className="flex justify-end"><Button size="sm">Update</Button></div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Two-factor authentication</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />2FA is currently disabled. Enable it to secure your account.
                            </div>
                            <RadioGroup name="2fa" defaultValue="app" options={[
                                { value: 'app', label: 'Authenticator app', description: 'Google Authenticator or Authy' },
                                { value: 'sms', label: 'SMS code',          description: user.phone },
                            ]} />
                            <Button size="sm">Enable 2FA</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Social sign-in</CardTitle></CardHeader>
                        <CardContent>
                            {[{ name: 'Google', connected: true, account: 'ahmad@gmail.com' }, { name: 'Microsoft', connected: false }, { name: 'Apple', connected: false }].map(({ name, connected, account }) => (
                                <div key={name} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                                    <div><p className="text-sm font-medium">{name}</p>{account && <p className="text-xs text-muted-foreground">{account}</p>}</div>
                                    {connected
                                        ? <Button variant="outline" size="sm" className="text-destructive border-destructive/30">Disconnect</Button>
                                        : <Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />Connect</Button>
                                    }
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
                        <CardContent>
                            {[
                                { label: 'Critical incidents', on: true  },
                                { label: 'Device offline',      on: true  },
                                { label: 'Geofence alerts',     on: true  },
                                { label: 'Low battery',         on: false },
                                { label: 'Weekly digest email', on: true  },
                            ].map(({ label, on }) => (
                                <div key={label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                                    <p className="text-sm">{label}</p>
                                    <Switch defaultChecked={on} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <AppearanceTabs />
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div><p className="text-sm font-medium">Compact sidebar</p><p className="text-xs text-muted-foreground">Icon-only sidebar</p></div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-1.5"><Label>Language</Label><Select defaultValue="en"><option value="en">English</option><option value="ur">Urdu</option></Select></div>
                                <div className="space-y-1.5"><Label>Date format</Label><Select defaultValue="dmy"><option value="dmy">DD/MM/YYYY</option></Select></div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Email visibility</p>
                                <RadioGroup name="vis" defaultValue="team" options={[
                                    { value: 'public',  label: 'Public' },
                                    { value: 'team',    label: 'Team members only' },
                                    { value: 'private', label: 'Private' },
                                ]} />
                            </div>
                            <div className="flex justify-end"><Button size="sm">Save</Button></div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>API access</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-1.5">
                                <Label>Personal access token</Label>
                                <div className="flex gap-2">
                                    <Input value="tad_live_••••••••••••••••••••••••" readOnly className="font-mono text-xs" />
                                    <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                                </div>
                                <p className="text-xs text-muted-foreground">Expires 15 Jan 2027</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive/30">
                        <CardHeader><CardTitle className="text-destructive">Danger zone</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-2">
                                <p className="text-sm font-semibold text-destructive flex gap-1.5 items-center"><AlertTriangle className="h-4 w-4" />Leave organisation</p>
                                <p className="text-xs text-muted-foreground">You will lose access to all fleet data in {orgName}. This cannot be undone.</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="text-destructive border-destructive/40">Leave {orgName}</Button>
                                <Button variant="destructive" size="sm"><Trash2 className="h-3.5 w-3.5 mr-1.5" />Delete account</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </LayoutResolved>
    );
}

export function CompanyProfilePage({ layout, org, members }: {
    layout: LayoutName;
    org: TenantOrg;
    members: OrgMember[];
}) {
    return (
        <LayoutResolved layout={layout} title="Organisation" currentUrl="/settings/organisation">
            <div className="p-6 max-w-4xl space-y-6">
                <h1 className="text-xl font-semibold">Organisation settings</h1>

                <Tabs defaultValue="general">
                    <TabsList>
                        <TabsTrigger value="general"><Building2 className="h-4 w-4 mr-1.5" />General</TabsTrigger>
                        <TabsTrigger value="branding"><Palette className="h-4 w-4 mr-1.5" />Branding</TabsTrigger>
                        <TabsTrigger value="members"><Users className="h-4 w-4 mr-1.5" />Members</TabsTrigger>
                        <TabsTrigger value="account"><UserCog className="h-4 w-4 mr-1.5" />Account</TabsTrigger>
                    </TabsList>

                    <Card className="mt-4">
                        <TabsContent value="general" className="m-0">
                            <CardHeader><CardTitle>General information</CardTitle><CardDescription>Legal and contact details of your organisation.</CardDescription></CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5"><Label>Organisation name</Label><Input defaultValue={org.name} /></div>
                                    <div className="space-y-1.5"><Label>Slug / subdomain</Label><Input defaultValue={org.slug} /></div>
                                    <div className="space-y-1.5"><Label>Contact email</Label><Input type="email" defaultValue={org.email} /></div>
                                    <div className="space-y-1.5"><Label>Phone number</Label><Input defaultValue={org.phone} /></div>
                                    <div className="space-y-1.5"><Label>Website</Label><Input type="url" defaultValue={org.website} /></div>
                                    <div className="space-y-1.5"><Label>Country</Label><Select defaultValue="pk"><option value="pk">Pakistan</option></Select></div>
                                </div>
                                <Separator className="my-4" />
                                <p className="text-sm font-medium mb-3">Registration details</p>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5"><Label>VAT / NTN number</Label>
                                        <div className="flex gap-2"><Input defaultValue={org.vat} /><Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button></div>
                                    </div>
                                    <div className="space-y-1.5"><Label>Registration number</Label><Input defaultValue={org.reg} /></div>
                                </div>
                                <div className="flex justify-end mt-4"><Button size="sm">Save changes</Button></div>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="branding" className="m-0">
                            <CardHeader><CardTitle>Branding</CardTitle><CardDescription>Logo, brand colour and white-label settings.</CardDescription></CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium mb-2">Organisation logo</p>
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/40">
                                            <Building2 className="h-7 w-7 text-muted-foreground" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Button variant="outline" size="sm"><Camera className="h-3.5 w-3.5 mr-1.5" />Upload logo</Button>
                                            <p className="text-xs text-muted-foreground">PNG or SVG, min 200×200px, max 1 MB</p>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-1.5">
                                    <Label>Brand colour</Label>
                                    <div className="flex items-center gap-3">
                                        <input type="color" defaultValue="#2563eb" className="h-10 w-14 cursor-pointer rounded-lg border border-border p-1" />
                                        <Input defaultValue="#2563EB" className="w-32 font-mono text-sm" />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-3">
                                    <p className="text-sm font-medium">White-label options</p>
                                    <Checkbox id="wl-emails"  label="Apply branding to system emails" defaultChecked />
                                    <Checkbox id="wl-reports" label="Apply branding to PDF reports"   defaultChecked />
                                    <Checkbox id="wl-portal"  label="Use custom login portal URL" />
                                </div>
                                <div className="flex justify-end"><Button size="sm">Save branding</Button></div>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="members" className="m-0">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div><CardTitle>Team members</CardTitle><CardDescription>{members.length} members · 2FA required for admins</CardDescription></div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-muted-foreground">Enforce 2FA</span>
                                        <Switch defaultChecked />
                                    </div>
                                    <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1" />Invite</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Member</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>2FA</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead />
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {members.map((m) => (
                                            <TableRow key={m.email}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2.5">
                                                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{m.initials}</AvatarFallback></Avatar>
                                                        <div>
                                                            <p className="text-sm font-medium">{m.name}</p>
                                                            <p className="text-xs text-muted-foreground">{m.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell><Badge variant="outline" className="text-xs">{m.role}</Badge></TableCell>
                                                <TableCell>
                                                    {m.twofa
                                                        ? <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">Enabled</Badge>
                                                        : <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-xs">Disabled</Badge>
                                                    }
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">{m.joined}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="h-7 px-2"><ChevronRight className="h-4 w-4" /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="account" className="m-0">
                            <CardHeader><CardTitle>Account settings</CardTitle><CardDescription>Login, social accounts and referral settings.</CardDescription></CardHeader>
                            <CardContent>
                                <table className="w-full text-sm">
                                    <tbody>
                                        {[
                                            { label: 'Login email',    value: org.email,                           action: 'Change'    },
                                            { label: 'Password',       value: '••••••••••',                        action: 'Change'    },
                                            { label: 'Sign-in options',value: 'Google, Microsoft',                 action: 'Manage'    },
                                            { label: 'Team account',   value: 'Enabled',                           action: 'Configure' },
                                            { label: 'Referral link',  value: `https://tad.io/ref/${org.slug}`,   action: 'Copy'      },
                                        ].map(({ label, value, action }) => (
                                            <tr key={label} className="border-b border-border last:border-0">
                                                <td className="py-3 pr-4 text-muted-foreground w-36">{label}</td>
                                                <td className="py-3 pr-4 font-medium truncate max-w-xs">{value}</td>
                                                <td className="py-3 text-right"><Button variant="ghost" size="sm" className="text-primary h-6 px-1.5 text-xs">{action}</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </TabsContent>
                    </Card>
                </Tabs>
            </div>
        </LayoutResolved>
    );
}

export function SecuritySettingsPage({ layout, securityLog }: { layout: LayoutName; securityLog: SecurityLogEntry[] }) {
    return (
        <LayoutResolved layout={layout} title="Security" currentUrl="/settings/security">
            <div className="p-6 max-w-3xl space-y-6">
                <h1 className="text-xl font-semibold">Security settings</h1>

                <Card>
                    <CardHeader><CardTitle>Two-factor authentication</CardTitle><CardDescription>Manage 2FA requirements for your organisation.</CardDescription></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                            <div>
                                <p className="text-sm font-semibold">Enforce 2FA for all members</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Members without 2FA will be prompted to enable it on next login.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                            <div>
                                <p className="text-sm font-semibold">Require 2FA for admin roles</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Admins and supervisors must use 2FA.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-1">
                            {[
                                { label: 'Members with 2FA',   value: '3 / 5',    color: 'text-green-600' },
                                { label: 'Admin 2FA coverage', value: '2 / 2',    color: 'text-green-600' },
                                { label: 'At risk',            value: '2 members', color: 'text-amber-600' },
                            ].map(({ label, value, color }) => (
                                <div key={label} className="rounded-lg border border-border p-3 text-center">
                                    <p className={`text-base font-bold ${color}`}>{value}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Session policy</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label>Session timeout</Label>
                                <Select defaultValue="8h">
                                    <option value="1h">1 hour</option>
                                    <option value="8h">8 hours</option>
                                    <option value="24h">24 hours</option>
                                    <option value="7d">7 days</option>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label>Max concurrent sessions</Label>
                                <Select defaultValue="3"><option value="1">1</option><option value="3">3</option><option value="10">Unlimited</option></Select>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div><p className="text-sm font-medium">Restrict login to Pakistan only</p><p className="text-xs text-muted-foreground">Block sign-in attempts from foreign IPs</p></div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex justify-end"><Button size="sm">Save policy</Button></div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div><CardTitle>IP whitelist</CardTitle><CardDescription>Only these IPs can access the admin panel.</CardDescription></div>
                        <Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />Add IP</Button>
                    </CardHeader>
                    <CardContent>
                        {['203.128.1.44 — Lahore office', '182.180.64.0/24 — Punjab data centre'].map((ip) => (
                            <div key={ip} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                                <p className="text-sm font-mono">{ip}</p>
                                <Button variant="ghost" size="sm" className="text-destructive h-7 px-2"><Trash2 className="h-3.5 w-3.5" /></Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Security log</CardTitle><CardDescription>Recent security-relevant events in your organisation.</CardDescription></CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader><TableRow><TableHead>Event</TableHead><TableHead>User</TableHead><TableHead>IP</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {securityLog.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="text-sm font-medium">{row.event}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{row.user}</TableCell>
                                        <TableCell className="text-xs font-mono text-muted-foreground">{row.ip}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{row.date}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`text-xs ${row.ok ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                                                {row.ok ? 'Success' : 'Warning'}
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

export function TenantBillingPage({ layout, org, invoices }: {
    layout: LayoutName;
    org: TenantOrg;
    invoices: TenantInvoice[];
}) {
    return (
        <LayoutResolved layout={layout} title="Billing" currentUrl="/settings/billing">
            <div className="p-6 max-w-3xl space-y-6">
                <h1 className="text-xl font-semibold">Billing &amp; plan</h1>

                <PlanCard
                    name="Enterprise Plan"
                    status="Active"
                    price="PKR 24,500 / month · Up to 1,000 devices · Unlimited users"
                    renewal={`Renews 1 June 2026 · Billed to ${org.name} · NTN ${org.vat}`}
                    action={<Button variant="outline" size="sm"><Star className="h-3.5 w-3.5 mr-1.5 text-amber-500" />Upgrade</Button>}
                    columns={4}
                    usage={[
                        { label: 'Devices',   used: 312, limit: 1000 },
                        { label: 'Users',     used: 5,   limit: 999  },
                        { label: 'Storage',   used: 28,  limit: 100  },
                        { label: 'API calls', used: 142, limit: 500  },
                    ]}
                />

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Payment method</CardTitle>
                        <Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />Add</Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { label: 'Meezan Bank — •••• 4242', exp: '09/2028', primary: true  },
                            { label: 'HBL — •••• 8881',         exp: '03/2027', primary: false },
                        ].map(({ label, exp, primary }) => (
                            <div key={label} className="flex items-center justify-between rounded-lg border border-border p-3.5">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-muted p-2"><CreditCard className="h-4 w-4 text-muted-foreground" /></div>
                                    <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">Expires {exp}</p></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {primary && <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">Default</Badge>}
                                    {!primary && <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Set default</Button>}
                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Invoice history</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Date</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader>
                            <TableBody>
                                {invoices.map((inv) => (
                                    <TableRow key={inv.id}>
                                        <TableCell className="font-mono text-xs font-medium">{inv.id}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                                        <TableCell className="text-sm font-medium">{inv.amount}</TableCell>
                                        <TableCell><Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">{inv.status}</Badge></TableCell>
                                        <TableCell className="text-right"><Button variant="ghost" size="sm" className="h-7 px-2"><Download className="h-3.5 w-3.5" /></Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="border-destructive/30">
                    <CardHeader><CardTitle className="text-destructive">Cancel subscription</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Cancelling will disable device tracking at the end of the billing period. Historical data is retained for 60 days.</p>
                        <Button variant="outline" size="sm" className="text-destructive border-destructive/40">Cancel Enterprise plan</Button>
                    </CardContent>
                </Card>
            </div>
        </LayoutResolved>
    );
}
