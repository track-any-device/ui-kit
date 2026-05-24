import {
    Avatar, AvatarFallback,
    Badge, Button,
    Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription,
    Checkbox,
    Input, Label,
    Select,
    Switch,
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@trackany-device/components';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import {
    Check, Copy, Download, Filter, Link2, Mail, MoreHorizontal,
    Plus, Search, Settings, Shield, ShieldCheck, UserPlus, Users, X,
} from 'lucide-react';
import { useState } from 'react';

export type MemberRole   = 'Admin' | 'Supervisor' | 'Operator' | 'Member';
export type MemberStatus = 'Active' | 'Invited' | 'Inactive';

export interface Member {
    id: number;
    name: string;
    email: string;
    role: MemberRole;
    status: MemberStatus;
    twofa: boolean;
    initials: string;
    joined: string;
}

export interface Role {
    name: MemberRole;
    color: string;
    count: number;
    desc: string;
    perms: string[];
}

export interface PermissionRow {
    label: string;
    admin: boolean;
    supervisor: boolean;
    operator: boolean;
    member: boolean;
}

export interface PermissionSection {
    section: string;
    rows: PermissionRow[];
}

const STATUS_COLOR: Record<MemberStatus, string> = {
    Active:   'text-green-600 border-green-200 bg-green-50',
    Invited:  'text-amber-600 border-amber-200 bg-amber-50',
    Inactive: 'text-muted-foreground border-border bg-muted',
};

const ROLE_COLOR: Record<MemberRole, string> = {
    Admin:      'text-purple-600 border-purple-200 bg-purple-50',
    Supervisor: 'text-blue-600 border-blue-200 bg-blue-50',
    Operator:   'text-amber-600 border-amber-200 bg-amber-50',
    Member:     'text-green-600 border-green-200 bg-green-50',
};

export function TeamMembersPage({ layout, members }: { layout: LayoutName; members: Member[] }) {
    const [search, setSearch] = useState('');
    const filtered = members.filter(
        (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.includes(search.toLowerCase()),
    );
    return (
        <LayoutResolved layout={layout}>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Team members</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">{members.length} members · 5 of 10 seats used</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" />Export</Button>
                        <Button size="sm"><UserPlus className="h-4 w-4 mr-1.5" />Invite member</Button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input placeholder="Search members…" className="pl-8 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <Select defaultValue="all">
                        <option value="all">All roles</option>
                        <option value="admin">Admin</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="operator">Operator</option>
                        <option value="member">Member</option>
                    </Select>
                    <Select defaultValue="all">
                        <option value="all">All statuses</option>
                        <option value="active">Active</option>
                        <option value="invited">Invited</option>
                        <option value="inactive">Inactive</option>
                    </Select>
                    <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5 mr-1.5" />More filters</Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10"><Checkbox /></TableHead>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>2FA</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((m) => (
                                    <TableRow key={m.id}>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <Avatar className="h-8 w-8 shrink-0">
                                                    <AvatarFallback className="text-xs">{m.initials}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">{m.name}</p>
                                                    <p className="text-xs text-muted-foreground">{m.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`text-xs ${ROLE_COLOR[m.role]}`}>{m.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`text-xs ${STATUS_COLOR[m.status]}`}>{m.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {m.twofa
                                                ? <ShieldCheck className="h-4 w-4 text-green-600" />
                                                : <Shield className="h-4 w-4 text-muted-foreground/40" />}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{m.joined}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
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

export function InviteMemberPage({ layout }: { layout: LayoutName }) {
    const [emails, setEmails] = useState(['']);
    const [sent, setSent] = useState(false);
    return (
        <LayoutResolved layout={layout}>
            <div className="p-6 max-w-xl mx-auto space-y-6">
                <h1 className="text-xl font-semibold">Invite team members</h1>

                {sent && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
                        <Check className="h-4 w-4 shrink-0" />Invitations sent successfully
                    </div>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Send invitations</CardTitle>
                        <CardDescription>Members will receive an email with a link to join your organisation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {emails.map((email, i) => (
                            <div key={i} className="flex gap-2">
                                <div className="flex-1 space-y-1.5">
                                    <Label className="text-xs text-muted-foreground">Email address</Label>
                                    <Input
                                        type="email"
                                        placeholder="colleague@example.com"
                                        value={email}
                                        onChange={(e) => { const next = [...emails]; next[i] = e.target.value; setEmails(next); }}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs text-muted-foreground">Role</Label>
                                    <Select defaultValue="member">
                                        <option value="member">Member</option>
                                        <option value="operator">Operator</option>
                                        <option value="supervisor">Supervisor</option>
                                        <option value="admin">Admin</option>
                                    </Select>
                                </div>
                                {emails.length > 1 && (
                                    <button onClick={() => setEmails(emails.filter((_, j) => j !== i))} className="mt-6 text-muted-foreground hover:text-destructive">
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full border-dashed" onClick={() => setEmails([...emails, ''])}>
                            <Plus className="h-3.5 w-3.5 mr-1.5" />Add another
                        </Button>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button variant="outline" size="sm">Cancel</Button>
                        <Button size="sm" onClick={() => { setSent(true); setEmails(['']); }}>
                            <Mail className="h-4 w-4 mr-1.5" />Send invitations
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Invite via link</CardTitle>
                        <CardDescription>Anyone with this link can join as a Member. Regenerate to invalidate the old link.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex gap-2">
                            <Input value="https://tad.io/invite/suthra-punjab/abc123xyz" readOnly className="text-xs font-mono" />
                            <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            <Link2 className="h-3.5 w-3.5 mr-1.5" />Regenerate link
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </LayoutResolved>
    );
}

export function RolesPage({ layout, roles }: { layout: LayoutName; roles: Role[] }) {
    return (
        <LayoutResolved layout={layout}>
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Roles</h1>
                    <Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Create role</Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {roles.map((role) => (
                        <Card key={role.name}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className={`text-xs ${role.color}`}>{role.name}</Badge>
                                        <span className="text-xs text-muted-foreground">{role.count} member{role.count !== 1 ? 's' : ''}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-7 w-7"><Settings className="h-3.5 w-3.5" /></Button>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{role.desc}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs font-medium text-muted-foreground mb-2">Permissions</p>
                                <ul className="space-y-1">
                                    {role.perms.map((p) => (
                                        <li key={p} className="flex items-center gap-1.5 text-xs">
                                            <Check className="h-3 w-3 text-green-600 shrink-0" />{p}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </LayoutResolved>
    );
}

export function PermissionsTogglePage({ layout, sections }: { layout: LayoutName; sections: PermissionSection[] }) {
    return (
        <LayoutResolved layout={layout}>
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Permissions</h1>
                    <Button size="sm">Save changes</Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-2/5">Permission</TableHead>
                                    <TableHead className="text-center">Admin</TableHead>
                                    <TableHead className="text-center">Supervisor</TableHead>
                                    <TableHead className="text-center">Operator</TableHead>
                                    <TableHead className="text-center">Member</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sections.map(({ section, rows }) => (
                                    <>
                                        <TableRow key={section} className="bg-muted/30">
                                            <TableCell colSpan={5} className="py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{section}</TableCell>
                                        </TableRow>
                                        {rows.map((row) => (
                                            <TableRow key={row.label}>
                                                <TableCell className="text-sm">{row.label}</TableCell>
                                                {(['admin', 'supervisor', 'operator', 'member'] as const).map((role) => (
                                                    <TableCell key={role} className="text-center">
                                                        <div className="flex justify-center">
                                                            <Switch defaultChecked={row[role]} disabled={role === 'admin'} />
                                                        </div>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </LayoutResolved>
    );
}

export function TeamInfoPage({ layout, members, roles }: { layout: LayoutName; members: Member[]; roles: Role[] }) {
    const active  = members.filter((m) => m.status === 'Active').length;
    const pending = members.filter((m) => m.status === 'Invited').length;
    const twofa   = members.filter((m) => m.twofa).length;
    const twoFaPct = Math.round((twofa / members.length) * 100);

    return (
        <LayoutResolved layout={layout}>
            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <h1 className="text-xl font-semibold">Team</h1>

                <div className="grid grid-cols-4 gap-4">
                    {[
                        { label: 'Total members', value: String(members.length), sub: 'Across all roles'    },
                        { label: 'Active',         value: String(active),         sub: 'Signed in recently'  },
                        { label: 'Pending invite', value: String(pending),        sub: 'Awaiting acceptance' },
                        { label: 'Seats used',     value: `${members.length}/10`, sub: `${10 - members.length} seats remaining` },
                    ].map(({ label, value, sub }) => (
                        <Card key={label}>
                            <CardContent className="p-4 text-center">
                                <p className="text-2xl font-bold text-primary">{value}</p>
                                <p className="text-sm font-medium mt-0.5">{label}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader><CardTitle>Role distribution</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {roles.map(({ name, color, count }) => (
                            <div key={name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={`text-xs ${color}`}>{name}</Badge>
                                </div>
                                <div className="flex items-center gap-3 flex-1 max-w-xs ml-4">
                                    <div className="flex-1 rounded-full h-1.5 bg-muted overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${(count / members.length) * 100}%` }} />
                                    </div>
                                    <span className="text-xs text-muted-foreground w-16 text-right">{count} of {members.length}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2FA compliance</CardTitle>
                        <CardDescription>Members with two-factor authentication enabled.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-primary">{twoFaPct}%</div>
                            <div className="flex-1">
                                <div className="rounded-full h-2.5 bg-muted overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${twoFaPct}%` }} />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1.5">{twofa} of {members.length} members have 2FA enabled</p>
                            </div>
                            <Button variant="outline" size="sm"><Shield className="h-3.5 w-3.5 mr-1.5" />Enforce 2FA</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Import members</CardTitle><CardDescription>Bulk import team members from a CSV file.</CardDescription></CardHeader>
                    <CardContent className="space-y-3">
                        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                            <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm font-medium">Drop your CSV here</p>
                            <p className="text-xs text-muted-foreground mt-0.5">or click to browse — max 500 rows</p>
                            <Button variant="outline" size="sm" className="mt-3">Browse file</Button>
                        </div>
                        <a href="#" className="text-xs text-primary underline">Download sample CSV template</a>
                    </CardContent>
                </Card>
            </div>
        </LayoutResolved>
    );
}
