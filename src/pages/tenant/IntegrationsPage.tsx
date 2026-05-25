import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import {
    AlertTriangle, Check, Copy, Eye, EyeOff, Globe, Key, Link2,
    Plus, RefreshCw, Settings, Trash2, Webhook, Zap,
} from 'lucide-react';
import { useState } from 'react';

export interface Integration {
    name: string;
    logo: string;
    desc: string;
    connected: boolean;
    channel: string | null;
}

export interface ApiKey {
    id: number;
    name: string;
    key: string;
    created: string;
    lastUsed: string;
    scopes: string[];
}

export interface WebhookEndpoint {
    id: number;
    url: string;
    events: string[];
    status: 'Active' | 'Failing';
    lastPing: string;
    successRate: string;
}

export interface Automation {
    name: string;
    trigger: string;
    action: string;
    enabled: boolean;
}

const ALL_EVENTS = [
    'incident.created', 'incident.resolved', 'sos.triggered',
    'device.online', 'device.offline', 'trip.started', 'trip.completed',
    'geofence.violated', 'member.invited', 'member.joined',
];

export function ServiceIntegrationsContent({ integrations }: { integrations: Integration[] }) {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Integrations</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Connect TAD with your existing tools and services.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {integrations.map((intg) => (
                    <Card key={intg.name}>
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">{intg.logo}</div>
                                    <div>
                                        <CardTitle className="text-base">{intg.name}</CardTitle>
                                        {intg.connected && (
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                                                <span className="text-xs text-green-600">Connected{intg.channel ? ` · ${intg.channel}` : ''}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {intg.connected && (
                                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                                        <Settings className="h-3.5 w-3.5" />
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <p className="text-sm text-muted-foreground">{intg.desc}</p>
                        </CardContent>
                        <CardFooter>
                            {intg.connected
                                ? <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5"><Trash2 className="h-3.5 w-3.5 mr-1.5" />Disconnect</Button>
                                : <Button variant="outline" size="sm"><Link2 className="h-3.5 w-3.5 mr-1.5" />Connect</Button>}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export function ServiceIntegrationsPage({ layout, integrations }: { layout: LayoutName; integrations: Integration[] }) {
    return (
        <LayoutResolved layout={layout}>
            <ServiceIntegrationsContent integrations={integrations} />
        </LayoutResolved>
    );
}

export function ApiKeysContent({ apiKeys }: { apiKeys: ApiKey[] }) {
    const [showKey, setShowKey] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [newName, setNewName] = useState('');

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">API keys</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Manage API keys for programmatic access to TAD data.</p>
                </div>
                <Button size="sm" onClick={() => setCreating(true)}><Plus className="h-4 w-4 mr-1.5" />New API key</Button>
            </div>

            {creating && (
                <Card className="border-primary/40">
                    <CardHeader><CardTitle>Create API key</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="key-name">Key name</Label>
                            <Input id="key-name" placeholder="e.g. Mobile app integration" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Scopes</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {['read:devices', 'write:devices', 'read:trips', 'read:incidents', 'write:incidents', 'read:all'].map((scope) => (
                                    <label key={scope} className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="checkbox" defaultChecked={scope === 'read:devices'} className="rounded" />
                                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{scope}</code>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCreating(false)}>Cancel</Button>
                        <Button size="sm" onClick={() => setCreating(false)}><Key className="h-3.5 w-3.5 mr-1.5" />Create key</Button>
                    </CardFooter>
                </Card>
            )}

            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>API keys grant full access to your account. Never share them publicly or commit them to version control.</p>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Key</TableHead>
                                <TableHead>Scopes</TableHead>
                                <TableHead>Last used</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {apiKeys.map((k) => (
                                <TableRow key={k.id}>
                                    <TableCell>
                                        <p className="text-sm font-medium">{k.name}</p>
                                        <p className="text-xs text-muted-foreground">Created {k.created}</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
                                                {showKey === k.id ? k.key : `${k.key.slice(0, 16)}${'•'.repeat(12)}`}
                                            </code>
                                            <button onClick={() => setShowKey(showKey === k.id ? null : k.id)} className="text-muted-foreground hover:text-foreground">
                                                {showKey === k.id ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                            </button>
                                            <button className="text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {k.scopes.map((s) => (
                                                <code key={s} className="text-xs bg-muted px-1.5 py-0.5 rounded">{s}</code>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{k.lastUsed}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive">
                                            <Trash2 className="h-3.5 w-3.5 mr-1" />Revoke
                                        </Button>
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

export function ApiKeysPage({ layout, apiKeys }: { layout: LayoutName; apiKeys: ApiKey[] }) {
    return (
        <LayoutResolved layout={layout}>
            <ApiKeysContent apiKeys={apiKeys} />
        </LayoutResolved>
    );
}

export function WebhooksContent({ hooks }: { hooks: WebhookEndpoint[] }) {
    const [creating, setCreating] = useState(false);

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Webhooks</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Receive real-time HTTP callbacks when events occur in your fleet.</p>
                </div>
                <Button size="sm" onClick={() => setCreating(true)}><Plus className="h-4 w-4 mr-1.5" />Add webhook</Button>
            </div>

            {creating && (
                <Card className="border-primary/40">
                    <CardHeader><CardTitle>New webhook endpoint</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="hook-url">Endpoint URL</Label>
                            <Input id="hook-url" type="url" placeholder="https://your-server.com/webhooks" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="hook-secret">Secret (optional)</Label>
                            <Input id="hook-secret" type="password" placeholder="Used to verify webhook signatures" />
                        </div>
                        <div className="space-y-2">
                            <Label>Events to send</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {ALL_EVENTS.map((evt) => (
                                    <label key={evt} className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="checkbox" className="rounded" />
                                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{evt}</code>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCreating(false)}>Cancel</Button>
                        <Button size="sm" onClick={() => setCreating(false)}><Webhook className="h-3.5 w-3.5 mr-1.5" />Save endpoint</Button>
                    </CardFooter>
                </Card>
            )}

            <div className="space-y-4">
                {hooks.map((hook) => (
                    <Card key={hook.id} className={hook.status === 'Failing' ? 'border-red-200' : ''}>
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className={`text-xs shrink-0 ${hook.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                                            {hook.status}
                                        </Badge>
                                        <code className="text-xs font-mono text-muted-foreground truncate">{hook.url}</code>
                                        <button className="text-muted-foreground hover:text-foreground shrink-0"><Copy className="h-3.5 w-3.5" /></button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <Button variant="ghost" size="icon" className="h-7 w-7"><RefreshCw className="h-3.5 w-3.5" /></Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7"><Settings className="h-3.5 w-3.5" /></Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <span>Last ping: <strong className="text-foreground">{hook.lastPing}</strong></span>
                                <span>Success rate: <strong className={hook.status === 'Failing' ? 'text-red-600' : 'text-foreground'}>{hook.successRate}</strong></span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {hook.events.map((evt) => (
                                    <code key={evt} className="text-xs bg-muted px-1.5 py-0.5 rounded">{evt}</code>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Webhook documentation</CardTitle>
                    <CardDescription>All payloads are signed with HMAC-SHA256. Verify the <code className="text-xs bg-muted px-1 py-0.5 rounded">X-TAD-Signature</code> header on your server.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" size="sm"><Globe className="h-3.5 w-3.5 mr-1.5" />View webhook docs</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export function WebhooksPage({ layout, hooks }: { layout: LayoutName; hooks: WebhookEndpoint[] }) {
    return (
        <LayoutResolved layout={layout}>
            <WebhooksContent hooks={hooks} />
        </LayoutResolved>
    );
}

export function AutomationsContent({ automations }: { automations: Automation[] }) {
    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Automations</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Automate actions between TAD and third-party services.</p>
                </div>
                <Button size="sm"><Zap className="h-4 w-4 mr-1.5" />New automation</Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    {automations.map((zap, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Zap className={`h-4 w-4 shrink-0 ${zap.enabled ? 'text-amber-500' : 'text-muted-foreground/40'}`} />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{zap.name}</p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{zap.trigger}</code>
                                        <span className="text-muted-foreground">→</span>
                                        <span className="text-xs text-muted-foreground">{zap.action}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Button variant="ghost" size="icon" className="h-7 w-7"><Settings className="h-3.5 w-3.5" /></Button>
                                <Switch defaultChecked={zap.enabled} />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Connect Zapier</CardTitle>
                    <CardDescription>Zapier connects TAD to 5,000+ apps without code.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                    <Button variant="outline" size="sm"><Zap className="h-3.5 w-3.5 mr-1.5" />Connect Zapier</Button>
                    <Button variant="outline" size="sm"><Globe className="h-3.5 w-3.5 mr-1.5" />Browse templates</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export function AutomationsPage({ layout, automations }: { layout: LayoutName; automations: Automation[] }) {
    return (
        <LayoutResolved layout={layout}>
            <AutomationsContent automations={automations} />
        </LayoutResolved>
    );
}
