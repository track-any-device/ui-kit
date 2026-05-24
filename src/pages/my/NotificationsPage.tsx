import {
    Button, Card, CardContent, CardHeader, CardTitle,
    Label, SettingsRow, Switch, Separator,
} from '@trackany-device/components';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import {
    Bell, BellOff, CalendarClock, ClipboardCheck, DollarSign,
    FileText, Mail, MessageCircle, Monitor, Phone, Tablet, Users,
} from 'lucide-react';

export interface UserContact {
    email: string;
    phone: string;
}

export interface DigestItem {
    label: string;
    desc: string;
    on: boolean;
}

export function NotificationChannelsPage({ layout, user }: { layout: LayoutName; user: UserContact }) {
    return (
        <LayoutResolved layout={layout} title="Notifications" currentUrl="/notifications">
            <div className="p-6 max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Notifications</h1>
                    <div className="flex items-center gap-2"><Label className="text-sm">Team-wide alerts</Label><Switch /></div>
                </div>

                <Card>
                    <CardHeader className="pb-0">
                        <CardTitle>Notification channels</CardTitle>
                    </CardHeader>
                    <div>
                        <SettingsRow icon={Mail}    title="Email"   description={user.email}                                   action={<Switch defaultChecked />} />
                        <SettingsRow icon={Phone}   title="Mobile"  description={user.phone}                                   action={<Switch />} />
                        <SettingsRow icon={Monitor} title="Desktop" description="Enable real-time desktop browser alerts."    action={<Switch defaultChecked />} />
                        <SettingsRow
                            icon={Bell}
                            title="Slack"
                            description="Receive instant alerts for messages and updates directly in Slack."
                            action={<Button variant="outline" size="sm">Connect Slack</Button>}
                        />
                    </div>
                </Card>

                <Card>
                    <CardHeader className="pb-0">
                        <CardTitle>Fleet alerts</CardTitle>
                    </CardHeader>
                    <div>
                        <SettingsRow icon={Bell}           title="Critical incidents"  description="SOS pressed, speeding, and high-priority rule violations."  action={<Switch defaultChecked />} />
                        <SettingsRow icon={Monitor}        title="Device offline"      description="When a tracked device stops reporting."                    action={<Switch defaultChecked />} />
                        <SettingsRow icon={ClipboardCheck} title="Geofence violations" description="Device enters or exits a restricted zone."                action={<Switch defaultChecked />} />
                        <SettingsRow icon={Tablet}         title="Low battery"         description="Battery below 20% on any device."                         action={<Switch />} />
                        <SettingsRow icon={CalendarClock}  title="Trip completed"      description="Notification when an assignee finishes a trip."           action={<Switch />} />
                    </div>
                </Card>

                <Card>
                    <CardHeader className="pb-0">
                        <CardTitle>Other notifications</CardTitle>
                    </CardHeader>
                    <div>
                        <SettingsRow icon={DollarSign}    title="Budget warning"       description="Get notified if nearing your device quota limit."        action={<Switch defaultChecked />} />
                        <SettingsRow icon={FileText}      title="Invoice alert"        description="Alert for new and unpaid invoices."                      action={<Button variant="outline" size="sm">View invoices</Button>} />
                        <SettingsRow icon={MessageCircle} title="Feedback alert"       description="When a team member submits new feedback."                action={<Switch defaultChecked />} />
                        <SettingsRow icon={Users}         title="Collaboration invite" description="Invite to collaborate on a new report or document."      action={<Switch defaultChecked />} />
                        <SettingsRow icon={ClipboardCheck}title="Status change"        description="Notifies changes in incident or task status."            action={<Switch defaultChecked />} />
                    </div>
                </Card>
            </div>
        </LayoutResolved>
    );
}

export function DoNotDisturbPage({ layout, digestItems }: { layout: LayoutName; digestItems: DigestItem[] }) {
    return (
        <LayoutResolved layout={layout} title="Notifications" currentUrl="/notifications">
            <div className="p-6 max-w-2xl mx-auto space-y-6">
                <h1 className="text-xl font-semibold">Notifications</h1>

                <Card>
                    <CardHeader><CardTitle>Do Not Disturb</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Activate Do Not Disturb to silence all notifications and focus without interruptions during specified hours or tasks.</p>
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                            <div className="flex items-center gap-3">
                                <BellOff className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Do Not Disturb</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">All notifications are paused</p>
                                </div>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <p className="text-sm font-medium">Scheduled quiet hours</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Start time</Label>
                                <input type="time" defaultValue="22:00" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">End time</Label>
                                <input type="time" defaultValue="07:00" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div><p className="text-sm font-medium">Allow critical incident alerts</p><p className="text-xs text-muted-foreground">SOS and high-priority violations bypass DND</p></div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex justify-end"><Button size="sm">Save schedule</Button></div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Email digest</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {digestItems.map(({ label, desc, on }) => (
                            <div key={label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                                <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div>
                                <Switch defaultChecked={on} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </LayoutResolved>
    );
}
