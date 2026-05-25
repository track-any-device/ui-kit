import { Badge } from '../../components/ui/badge';
import { Button } from '../../controls/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { ChecklistItem } from '../../components/ui/checklist-item';
import { Progress } from '../../components/ui/progress';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import {
    Bell, CheckCircle2, Download,
    Globe, MapPin, Shield, Smartphone,
    Users, Zap,
} from 'lucide-react';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface OnboardingStep {
    icon: LucideIcon;
    title: string;
    desc: string;
    action: string | null;
}

export function OnboardingChecklistContent({
    steps,
    initialCompleted,
}: {
    steps: OnboardingStep[];
    initialCompleted?: number[];
}) {
    const [completed, setCompleted] = useState(new Set(initialCompleted ?? []));
    const doneCount = completed.size;
    const total = steps.length;
    const percent = Math.round((doneCount / total) * 100);
    const activeIndex = steps.findIndex((_, i) => !completed.has(i));

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-xl font-semibold">Get started</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Complete these steps to get the most out of TAD.</p>
            </div>

            <Card>
                <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{doneCount} of {total} steps completed</p>
                        <p className="text-sm font-semibold text-primary">{percent}%</p>
                    </div>
                    <Progress value={percent} className="h-2" />
                </CardContent>
            </Card>

            <div className="space-y-3">
                {steps.map((step, i) => (
                    <ChecklistItem
                        key={i}
                        icon={step.icon}
                        title={step.title}
                        description={step.desc}
                        done={completed.has(i)}
                        active={i === activeIndex}
                        action={step.action ?? undefined}
                        onAction={() => {
                            const next = new Set(completed);
                            if (next.has(i)) next.delete(i); else next.add(i);
                            setCompleted(next);
                        }}
                        className="cursor-pointer"
                    />
                ))}
            </div>
        </div>
    );
}

export function OnboardingChecklistPage({
    layout,
    steps,
    initialCompleted,
}: {
    layout: LayoutName;
    steps: OnboardingStep[];
    initialCompleted?: number[];
}) {
    return (
        <LayoutResolved layout={layout} title="Get Started" currentUrl="/get-started">
            <OnboardingChecklistContent steps={steps} initialCompleted={initialCompleted} />
        </LayoutResolved>
    );
}

export function WelcomeScreenContent() {
    return (
        <div className="p-6 max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2 pt-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-2">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold">Welcome to TAD</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Track Any Device is your all-in-one fleet intelligence platform. Let's get you set up in a few quick steps.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: Smartphone, title: 'Add a device',     desc: 'Pair GPS trackers or phones to your fleet.',           cta: 'Add device',  primary: true  },
                    { icon: Users,      title: 'Invite your team', desc: 'Bring operators and supervisors on board.',             cta: 'Invite',      primary: false },
                    { icon: Globe,      title: 'Watch live',       desc: 'See all your devices on the real-time map.',            cta: 'Open map',    primary: false },
                ].map(({ icon: Icon, title, desc, cta, primary }) => (
                    <Card key={title} className={primary ? 'border-primary/40 bg-primary/5' : ''}>
                        <CardContent className="p-5 text-center space-y-3">
                            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${primary ? 'bg-primary/10' : 'bg-muted'}`}>
                                <Icon className={`h-5 w-5 ${primary ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                            </div>
                            <Button size="sm" variant={primary ? 'default' : 'outline'} className="w-full">{cta}</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick tips</CardTitle>
                    <CardDescription>Make the most of your TAD subscription.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    {[
                        { icon: MapPin,   tip: 'Set geofences on your most-visited locations to get automatic entry/exit alerts.' },
                        { icon: Bell,     tip: 'Enable SOS alerts and make sure your operators know how to trigger them.' },
                        { icon: Shield,   tip: 'Turn on 2FA and enforce it for all team members in Security settings.' },
                        { icon: Download, tip: 'Download the TAD mobile app to manage your fleet from anywhere.' },
                    ].map(({ icon: Icon, tip }, i) => (
                        <div key={i} className="flex items-start gap-3 py-3.5">
                            <div className="rounded-lg bg-muted p-1.5 shrink-0 mt-0.5">
                                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">{tip}</p>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View all documentation</Button>
                </CardFooter>
            </Card>

            <div className="text-center">
                <Button variant="ghost" size="sm" className="text-muted-foreground">Skip onboarding</Button>
            </div>
        </div>
    );
}

export function WelcomeScreenPage({ layout }: { layout: LayoutName }) {
    return (
        <LayoutResolved layout={layout} title="Welcome" currentUrl="/get-started">
            <WelcomeScreenContent />
        </LayoutResolved>
    );
}

export function PlanUpgradeContent() {
    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Get more from TAD</h1>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                            <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">You're on the Starter plan</p>
                                <Badge variant="outline" className="text-xs">Starter</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Upgrade to Pro to unlock unlimited devices, advanced analytics, and priority support.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                {[
                    {
                        plan: 'Pro',
                        price: '$49',
                        period: '/month',
                        features: ['Up to 50 devices', 'Advanced analytics', 'Geofence alerts', 'API access', 'Priority support'],
                        highlight: true,
                    },
                    {
                        plan: 'Enterprise',
                        price: 'Custom',
                        period: '',
                        features: ['Unlimited devices', 'White-label option', 'Dedicated CSM', 'SLA guarantees', 'SSO & SCIM'],
                        highlight: false,
                    },
                ].map(({ plan, price, period, features, highlight }) => (
                    <Card key={plan} className={highlight ? 'border-primary/40' : ''}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{plan}</CardTitle>
                                {highlight && <Badge className="text-xs">Popular</Badge>}
                            </div>
                            <p className="text-2xl font-bold">{price}<span className="text-sm font-normal text-muted-foreground">{period}</span></p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />{f}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm" className="w-full" variant={highlight ? 'default' : 'outline'}>
                                {plan === 'Enterprise' ? 'Contact sales' : 'Upgrade to Pro'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="text-center text-xs text-muted-foreground">
                Questions? <a href="#" className="text-primary underline">Chat with our team</a> or <a href="#" className="text-primary underline">compare all plans</a>.
            </div>
        </div>
    );
}

export function PlanUpgradePage({ layout }: { layout: LayoutName }) {
    return (
        <LayoutResolved layout={layout} title="Upgrade Plan" currentUrl="/get-started/upgrade">
            <PlanUpgradeContent />
        </LayoutResolved>
    );
}
