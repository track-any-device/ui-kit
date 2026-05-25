import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../controls/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Checkbox } from '../../controls/Checkbox';
import { Input } from '../../controls/Input';
import { Label } from '../../controls/Label';
import { PlanCard } from '../../components/ui/plan-card';
import { RadioGroup } from '../../controls/RadioGroup';
import { Select } from '../../controls/Select';
import { Separator } from '../../components/ui/separator';
import { SettingsSection } from '../../components/ui/settings-section';
import { Switch } from '../../controls/Switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Textarea } from '../../controls/Textarea';
import { PasswordInput } from '../../controls/PasswordInput';
import AppearanceTabs from '../../components/appearance-tabs';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import {
    AlertTriangle, Bell, Boxes, Camera, CheckCircle2,
    Copy, CreditCard, Download, Globe, KeyRound, Laptop,
    Link2, Lock, Mail, Palette,
    Plus, ShieldCheck, Smartphone,
    Trash2, UserCircle, UserCog, Wifi,
} from 'lucide-react';
import { useState } from 'react';

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    role: string;
    org: string;
    initials: string;
}

export interface Session {
    device: string;
    location: string;
    time: string;
    current: boolean;
}

export interface LoginEvent {
    event: string;
    device: string;
    date: string;
    ok: boolean;
}

export interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: string;
}

const SIDEBAR_SECTIONS = [
    { id: 'basic',         label: 'Basic info',        icon: UserCircle  },
    { id: 'email',         label: 'Email',             icon: Mail        },
    { id: 'password',      label: 'Password',          icon: Lock        },
    { id: 'twofa',         label: 'Two-factor auth',   icon: ShieldCheck },
    { id: 'social',        label: 'Social sign-in',    icon: Link2       },
    { id: 'notifications', label: 'Notifications',     icon: Bell        },
    { id: 'appearance',    label: 'Appearance',        icon: Palette     },
    { id: 'preferences',   label: 'Preferences',       icon: UserCog     },
    { id: 'api',           label: 'API keys',          icon: KeyRound    },
    { id: 'delete',        label: 'Delete account',    icon: Trash2      },
];

export function UserProfileContent({ user }: { user: UserProfile }) {
    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="relative shrink-0">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="" alt={user.name} />
                                <AvatarFallback className="text-2xl">{user.initials}</AvatarFallback>
                            </Avatar>
                            <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                                <Camera className="h-3.5 w-3.5" />
                            </button>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-xl font-semibold">{user.name}</h1>
                                <Badge variant="outline">{user.role}</Badge>
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{user.email} · {user.org}</p>
                            <p className="text-xs text-muted-foreground mt-1">Member since March 2024 · Punjab, Pakistan</p>
                        </div>
                        <Button variant="outline" size="sm"><UserCog className="h-4 w-4 mr-1.5" />Edit profile</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-base">Personal information</CardTitle>
                        <Button variant="ghost" size="sm" className="text-primary h-7 px-2">Edit</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <tbody>
                                {[
                                    ['Full name',     user.name],
                                    ['Phone',         user.phone],
                                    ['Date of birth', '12 Apr 1990'],
                                    ['Gender',        'Male'],
                                    ['Address',       'House 14, Street 7, Gulberg III, Lahore'],
                                    ['City',          'Lahore, Punjab'],
                                ].map(([label, value]) => (
                                    <tr key={label} className="border-b border-border last:border-0">
                                        <td className="px-5 py-2.5 text-muted-foreground w-36">{label}</td>
                                        <td className="px-5 py-2.5 font-medium">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-base">Work &amp; skills</CardTitle>
                        <Button variant="ghost" size="sm" className="text-primary h-7 px-2">Edit</Button>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        {[
                            ['Organisation', user.org],
                            ['Role',         user.role],
                            ['Language',     'Urdu, English'],
                            ['Timezone',     'PKT (UTC+5)'],
                        ].map(([label, value]) => (
                            <div key={label} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                                <span className="text-muted-foreground">{label}</span>
                                <span className="font-medium">{value}</span>
                            </div>
                        ))}
                        <div className="pt-1">
                            <p className="text-muted-foreground mb-2">Skills</p>
                            <div className="flex flex-wrap gap-1.5">
                                {['Fleet Management', 'GPS Tracking', 'Incident Response', 'Team Supervision', 'Route Planning'].map((s) => (
                                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Account settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <tbody>
                                {[
                                    { label: 'Email',           value: user.email,       action: 'Change' },
                                    { label: 'Password',        value: '••••••••••',     action: 'Change' },
                                    { label: 'Two-factor auth', value: 'Not enabled',    action: 'Enable' },
                                    { label: 'Notifications',   value: 'Email + Push',   action: 'Manage' },
                                ].map(({ label, value, action }) => (
                                    <tr key={label} className="border-b border-border last:border-0">
                                        <td className="px-5 py-2.5 text-muted-foreground w-40">{label}</td>
                                        <td className="px-5 py-2.5">{value}</td>
                                        <td className="px-5 py-2.5 text-right"><Button variant="ghost" size="sm" className="text-primary h-6 px-1.5 text-xs">{action}</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: ShieldCheck, label: 'Safety Champion',  desc: 'Zero incidents Q1',      color: 'text-green-600 bg-green-50'   },
                                { icon: Boxes,       label: 'Fleet Expert',      desc: '300+ vehicles',          color: 'text-blue-600 bg-blue-50'     },
                                { icon: Globe,       label: 'Province Coverage', desc: 'All Punjab districts',   color: 'text-purple-600 bg-purple-50' },
                                { icon: Wifi,        label: 'Always Connected',  desc: '99.2% uptime',           color: 'text-amber-600 bg-amber-50'   },
                            ].map(({ icon: Icon, label, desc, color }) => (
                                <div key={label} className="rounded-lg border border-border p-3 flex items-start gap-2.5">
                                    <div className={`rounded-lg p-2 shrink-0 ${color}`}><Icon className="h-4 w-4" /></div>
                                    <div>
                                        <p className="text-xs font-semibold">{label}</p>
                                        <p className="text-xs text-muted-foreground">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export function UserProfilePage({ layout, user }: { layout: LayoutName; user: UserProfile }) {
    return (
        <LayoutResolved layout={layout} title="Profile" currentUrl="/settings/profile">
            <UserProfileContent user={user} />
        </LayoutResolved>
    );
}

export function SettingsPlainContent({ user }: { user: UserProfile }) {
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [bio, setBio] = useState(`Fleet supervisor at ${user.org}, managing 300+ GPS-tracked vehicles across Punjab province.`);
    const [saved, setSaved] = useState(false);
    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Account settings</h1>

            {saved && (
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />Profile updated successfully.
                </div>
            )}

            <Card>
                <CardHeader><CardTitle>Profile photo</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-xl">{user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1.5">
                            <Button variant="outline" size="sm"><Camera className="h-3.5 w-3.5 mr-1.5" />Upload photo</Button>
                            <p className="text-xs text-muted-foreground">JPG or PNG, max 2 MB</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Personal details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="sp-name">Full name</Label>
                            <Input id="sp-name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sp-email">Email address</Label>
                            <Input id="sp-email" value={user.email} disabled className="opacity-60" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sp-phone">Phone number</Label>
                            <Input id="sp-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sp-dob">Date of birth</Label>
                            <Input id="sp-dob" type="date" defaultValue="1990-04-12" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sp-country">Country</Label>
                            <Select id="sp-country" defaultValue="pk">
                                <option value="pk">Pakistan</option>
                                <option value="ae">UAE</option>
                                <option value="gb">United Kingdom</option>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sp-city">City</Label>
                            <Input id="sp-city" defaultValue="Lahore" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="sp-bio">Bio</Label>
                        <Textarea id="sp-bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Change password</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="sp-cur">Current password</Label>
                        <PasswordInput id="sp-cur" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="sp-new">New password</Label>
                            <PasswordInput id="sp-new" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sp-cnf">Confirm password</Label>
                            <PasswordInput id="sp-cnf" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => setSaved(true)}>Save changes</Button>
            </div>
        </div>
    );
}

export function SettingsPlainPage({ layout, user }: { layout: LayoutName; user: UserProfile }) {
    return (
        <LayoutResolved layout={layout} title="Account Settings" currentUrl="/settings/profile">
            <SettingsPlainContent user={user} />
        </LayoutResolved>
    );
}

export function SettingsSidebarContent({ user }: { user: UserProfile }) {
    const [active, setActive] = useState('basic');
    return (
        <div className="flex min-h-full">
            <aside className="hidden lg:flex flex-col gap-1 w-56 shrink-0 sticky top-0 self-start h-screen overflow-y-auto border-r border-border p-4">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Settings</p>
                {SIDEBAR_SECTIONS.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActive(id)}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-left transition-colors ${active === id ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'}`}
                    >
                        <Icon className="h-4 w-4 shrink-0" />{label}
                    </button>
                ))}
            </aside>

            <div className="flex-1 p-6 space-y-6 max-w-2xl">
                <SettingsSection id="basic" title="Basic information" description="Update your name, photo and contact details.">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14"><AvatarFallback>{user.initials}</AvatarFallback></Avatar>
                            <Button variant="outline" size="sm"><Camera className="h-3.5 w-3.5 mr-1.5" />Change photo</Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue={user.name} /></div>
                            <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue={user.phone} /></div>
                            <div className="space-y-1.5"><Label>Country</Label><Select defaultValue="pk"><option value="pk">Pakistan</option></Select></div>
                            <div className="space-y-1.5"><Label>Timezone</Label><Select defaultValue="pkt"><option value="pkt">PKT (UTC+5)</option></Select></div>
                        </div>
                        <div className="space-y-1.5"><Label>Bio</Label><Textarea rows={2} defaultValue={`Fleet supervisor at ${user.org}.`} /></div>
                        <div className="flex justify-end"><Button size="sm">Save</Button></div>
                    </div>
                </SettingsSection>

                <SettingsSection id="email" title="Email address" description="Your email is used for login and notifications.">
                    <div className="space-y-4">
                        <div className="space-y-1.5"><Label>Email address</Label><Input type="email" defaultValue={user.email} /></div>
                        <div className="flex items-center justify-between">
                            <div><p className="text-sm font-medium">Primary email</p><p className="text-xs text-muted-foreground">Used for all account notifications</p></div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex justify-end"><Button size="sm">Update email</Button></div>
                    </div>
                </SettingsSection>

                <SettingsSection id="password" title="Change password" description="Use a strong password of at least 8 characters.">
                    <div className="space-y-4">
                        <div className="space-y-1.5"><Label>Current password</Label><PasswordInput /></div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5"><Label>New password</Label><PasswordInput /></div>
                            <div className="space-y-1.5"><Label>Confirm password</Label><PasswordInput /></div>
                        </div>
                        <div className="flex justify-end"><Button size="sm">Update password</Button></div>
                    </div>
                </SettingsSection>

                <SettingsSection id="twofa" title="Two-factor authentication" description="Add a second layer of security to your account.">
                    <div className="space-y-4">
                        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
                            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-amber-800">Two-factor authentication is currently disabled. Enable it to better protect your account.</p>
                        </div>
                        <RadioGroup
                            name="2fa-method"
                            defaultValue="app"
                            options={[
                                { value: 'app', label: 'Authenticator app', description: 'Use Google Authenticator or similar' },
                                { value: 'sms', label: 'SMS verification',  description: 'Receive a code to your phone number' },
                            ]}
                        />
                        <div className="flex justify-end"><Button size="sm">Enable 2FA</Button></div>
                    </div>
                </SettingsSection>

                <SettingsSection id="social" title="Social sign-in" description="Connect external accounts for faster login.">
                    <div className="space-y-3">
                        {[
                            { name: 'Google',    connected: true,  email: 'ahmad@gmail.com' },
                            { name: 'Microsoft', connected: false, email: null },
                            { name: 'Apple',     connected: false, email: null },
                        ].map(({ name, connected, email }) => (
                            <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                <div>
                                    <p className="text-sm font-medium">{name}</p>
                                    {email && <p className="text-xs text-muted-foreground">{email}</p>}
                                </div>
                                {connected
                                    ? <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">Disconnect</Button>
                                    : <Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />Connect</Button>
                                }
                            </div>
                        ))}
                    </div>
                </SettingsSection>

                <SettingsSection id="notifications" title="Notifications" description="Choose what alerts you want to receive.">
                    <div className="space-y-1">
                        {[
                            { label: 'Critical incidents',  desc: 'SOS and high-priority rule violations', on: true  },
                            { label: 'Device offline',       desc: 'When a device stops reporting',         on: true  },
                            { label: 'Low battery alerts',   desc: 'Battery below 20%',                     on: false },
                            { label: 'Geofence violations',  desc: 'Zone entry/exit events',                on: true  },
                            { label: 'Weekly email digest',  desc: 'Fleet summary every Monday',            on: true  },
                            { label: 'Trip completed',       desc: 'When assignees finish trips',           on: false },
                        ].map(({ label, desc, on }) => (
                            <div key={label} className="flex items-start justify-between py-2.5 border-b border-border last:border-0">
                                <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div>
                                <Switch defaultChecked={on} />
                            </div>
                        ))}
                    </div>
                </SettingsSection>

                <SettingsSection id="appearance" title="Appearance" description="Personalise how the app looks for you.">
                    <div className="space-y-4">
                        <div><p className="text-sm font-medium mb-2">Theme</p><AppearanceTabs /></div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div><p className="text-sm font-medium">Compact sidebar</p><p className="text-xs text-muted-foreground">Show only icons in the sidebar</p></div>
                            <Switch />
                        </div>
                    </div>
                </SettingsSection>

                <SettingsSection id="preferences" title="Preferences" description="Language, timezone and display preferences.">
                    <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5"><Label>Language</Label><Select defaultValue="en"><option value="en">English</option><option value="ur">Urdu</option></Select></div>
                            <div className="space-y-1.5"><Label>Date format</Label><Select defaultValue="dmy"><option value="dmy">DD/MM/YYYY</option><option value="mdy">MM/DD/YYYY</option></Select></div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Email visibility</p>
                            <RadioGroup name="email-vis" defaultValue="team" options={[
                                { value: 'public',  label: 'Public — visible to everyone' },
                                { value: 'team',    label: 'Team only — visible to my organisation' },
                                { value: 'private', label: 'Private — hidden from everyone' },
                            ]} />
                        </div>
                        <div className="flex justify-end"><Button size="sm">Save preferences</Button></div>
                    </div>
                </SettingsSection>

                <SettingsSection id="api" title="API keys" description="Use these keys to access the TAD API programmatically.">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label>Personal access token</Label>
                            <div className="flex gap-2">
                                <Input value="tad_live_••••••••••••••••••••••••••••••••" readOnly className="font-mono text-xs" />
                                <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Expires 15 Jan 2027 · Full access</p>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div><p className="text-sm font-medium">Webhook endpoint</p><p className="text-xs text-muted-foreground font-mono">https://api.tad.io/webhooks/tad</p></div>
                            <Button variant="outline" size="sm"><Copy className="h-3.5 w-3.5 mr-1" />Copy</Button>
                        </div>
                    </div>
                </SettingsSection>

                <SettingsSection id="delete" title="Delete account" description="Permanently remove your account and all its data.">
                    <div className="space-y-4">
                        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-2">
                            <p className="text-sm font-semibold text-destructive flex items-center gap-1.5"><AlertTriangle className="h-4 w-4" />Warning — this action is irreversible</p>
                            <p className="text-xs text-muted-foreground">Deleting your account will remove all your personal data, trip history, and preferences. You will lose access to all connected organisations.</p>
                        </div>
                        <Checkbox id="del-confirm" label="I understand this action cannot be undone." />
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Deactivate account</Button>
                            <Button variant="destructive" size="sm"><Trash2 className="h-3.5 w-3.5 mr-1.5" />Delete account</Button>
                        </div>
                    </div>
                </SettingsSection>
            </div>
        </div>
    );
}

export function SettingsSidebarPage({ layout, user }: { layout: LayoutName; user: UserProfile }) {
    return (
        <LayoutResolved layout={layout} title="Settings" currentUrl="/settings/profile">
            <SettingsSidebarContent user={user} />
        </LayoutResolved>
    );
}

export function SecurityContent({ user, sessions, loginActivity }: {
    user: UserProfile;
    sessions: Session[];
    loginActivity: LoginEvent[];
}) {
    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Security</h1>

            <Card>
                <CardHeader><CardTitle>Two-factor authentication</CardTitle><CardDescription>Protect your account with an additional verification step.</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-amber-100 p-2"><ShieldCheck className="h-5 w-5 text-amber-600" /></div>
                            <div>
                                <p className="text-sm font-medium">Two-factor auth is disabled</p>
                                <p className="text-xs text-muted-foreground">Enable to add extra security to your account</p>
                            </div>
                        </div>
                        <Button size="sm">Enable</Button>
                    </div>
                    <RadioGroup name="2fa-type" defaultValue="app" options={[
                        { value: 'app', label: 'Authenticator app', description: 'Scan a QR code with Google Authenticator' },
                        { value: 'sms', label: 'SMS code',          description: `Text message to ${user.phone}` },
                    ]} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div><CardTitle>Active sessions</CardTitle><CardDescription>Devices currently signed in to your account.</CardDescription></div>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive/30"><Laptop className="h-3.5 w-3.5 mr-1.5" />Sign out all</Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader><TableRow><TableHead>Device</TableHead><TableHead>Location</TableHead><TableHead>Last active</TableHead><TableHead /></TableRow></TableHeader>
                        <TableBody>
                            {sessions.map((s) => (
                                <TableRow key={s.device}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {s.device.includes('iPhone') ? <Smartphone className="h-4 w-4 text-muted-foreground shrink-0" /> : <Laptop className="h-4 w-4 text-muted-foreground shrink-0" />}
                                            <span className="text-sm">{s.device}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{s.location}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{s.time}</TableCell>
                                    <TableCell className="text-right">
                                        {s.current
                                            ? <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">This device</Badge>
                                            : <Button variant="ghost" size="sm" className="text-destructive h-7 px-2 text-xs">Revoke</Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Recent login activity</CardTitle></CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader><TableRow><TableHead>Event</TableHead><TableHead>Device</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {loginActivity.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className="text-sm font-medium">{row.event}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{row.device}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{row.date}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={row.ok ? 'text-green-600 border-green-200 bg-green-50 text-xs' : 'text-red-600 border-red-200 bg-red-50 text-xs'}>
                                            {row.ok ? 'Success' : 'Failed'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export function SecurityPage({ layout, user, sessions, loginActivity }: {
    layout: LayoutName;
    user: UserProfile;
    sessions: Session[];
    loginActivity: LoginEvent[];
}) {
    return (
        <LayoutResolved layout={layout} title="Security" currentUrl="/settings/security">
            <SecurityContent user={user} sessions={sessions} loginActivity={loginActivity} />
        </LayoutResolved>
    );
}

export function BillingContent({ invoices }: { invoices: Invoice[] }) {
    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Billing &amp; plan</h1>

            <PlanCard
                name="Professional Plan"
                status="Active"
                price="PKR 8,500 / month · Up to 500 devices · 10 users"
                renewal="Renews on 1 June 2026 · Auto-renewal enabled"
                action={<Button variant="outline" size="sm">Upgrade plan</Button>}
                usage={[
                    { label: 'Devices', used: 312, limit: 500 },
                    { label: 'Users',   used: 8,   limit: 10  },
                    { label: 'Storage', used: 12,  limit: 50  },
                ]}
            />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Payment method</CardTitle>
                    <Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />Add method</Button>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-muted p-2"><CreditCard className="h-5 w-5 text-muted-foreground" /></div>
                            <div>
                                <p className="text-sm font-medium">Meezan Bank — •••• 4242</p>
                                <p className="text-xs text-muted-foreground">Expires 09/2028</p>
                            </div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Default</Badge>
                    </div>
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
                    <p className="text-sm text-muted-foreground mb-4">Cancelling your plan will disable device tracking at the end of the current billing period. You will retain read-only access to historical data for 30 days.</p>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive/40">Cancel subscription</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export function BillingPage({ layout, invoices }: { layout: LayoutName; invoices: Invoice[] }) {
    return (
        <LayoutResolved layout={layout} title="Billing" currentUrl="/settings/billing">
            <BillingContent invoices={invoices} />
        </LayoutResolved>
    );
}
