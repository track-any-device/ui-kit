import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { CheckCircle2, Copy, Gift, Link2, Mail, Plus, UserPlus, XCircle } from 'lucide-react';
import { useState } from 'react';

export type InviteStatus = 'Accepted' | 'Pending' | 'Declined';

export interface SentInvite {
    name: string;
    email: string;
    status: InviteStatus;
    activity: string;
    initials: string;
}

const statusStyle: Record<InviteStatus, string> = {
    Accepted: 'text-green-600 border-green-200 bg-green-50',
    Pending:  'text-amber-600 border-amber-200 bg-amber-50',
    Declined: 'text-red-600 border-red-200 bg-red-50',
};

export function InvitePeopleContent() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Invite a team member</h1>

            {sent && (
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />Invitation sent to <strong>{email}</strong>
                </div>
            )}

            <Card>
                <CardHeader><CardTitle>Send an invitation</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="inv-email">Email address</Label>
                        <Input id="inv-email" type="email" placeholder="colleague@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="inv-role">Role</Label>
                        <Select id="inv-role" defaultValue="member">
                            <option value="member">Member</option>
                            <option value="operator">Operator</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="admin">Admin</option>
                        </Select>
                    </div>
                    <Button variant="outline" size="sm" className="w-full border-dashed"><Plus className="h-3.5 w-3.5 mr-1.5" />Add another email</Button>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button onClick={() => { if (email) setSent(true); }}><UserPlus className="h-4 w-4 mr-1.5" />Send invitation</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader><CardTitle>Invite via link</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">Share this link — anyone with it can join your organisation as a Member.</p>
                    <div className="flex gap-2">
                        <Input value="https://tad.io/invite/track-any-device/abc123xyz" readOnly className="text-xs font-mono" />
                        <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                    </div>
                    <Button variant="outline" size="sm" className="w-full"><Link2 className="h-3.5 w-3.5 mr-1.5" />Regenerate link</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Referral rewards</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4">
                        <Gift className="h-8 w-8 text-primary shrink-0" />
                        <div>
                            <p className="text-sm font-semibold">Earn 1 month free</p>
                            <p className="text-xs text-muted-foreground mt-0.5">For every team member who joins and activates, you get 1 month free.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        {[{ v: '5', l: 'Invites sent' }, { v: '3', l: 'Accepted' }, { v: '2', l: 'Months earned' }].map(({ v, l }) => (
                            <div key={l} className="rounded-lg border border-border p-3">
                                <p className="text-xl font-bold text-primary">{v}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{l}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function InvitePeoplePage({ layout }: { layout: LayoutName }) {
    return (
        <LayoutResolved layout={layout} title="Invite" currentUrl="/invite">
            <InvitePeopleContent />
        </LayoutResolved>
    );
}

export function SentInvitesContent({ invites }: { invites: SentInvite[] }) {
    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Sent invites</h1>
                <Button size="sm"><Mail className="h-4 w-4 mr-1.5" />Invite members</Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Person</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last activity</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invites.map((inv) => (
                                <TableRow key={inv.email}>
                                    <TableCell>
                                        <div className="flex items-center gap-2.5">
                                            <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{inv.initials}</AvatarFallback></Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{inv.name}</p>
                                                <p className="text-xs text-muted-foreground">{inv.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`text-xs ${statusStyle[inv.status]}`}>{inv.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{inv.activity}</TableCell>
                                    <TableCell className="text-right">
                                        {inv.status === 'Pending' && (
                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive"><XCircle className="h-3.5 w-3.5 mr-1" />Revoke</Button>
                                        )}
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

export function SentInvitesPage({ layout, invites }: { layout: LayoutName; invites: SentInvite[] }) {
    return (
        <LayoutResolved layout={layout} title="Sent Invites" currentUrl="/invite/sent">
            <SentInvitesContent invites={invites} />
        </LayoutResolved>
    );
}
