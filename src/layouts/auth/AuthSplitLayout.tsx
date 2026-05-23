import { Activity, MapPin, Radio, Shield } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AuthLayoutProps } from '../../types';

const FEATURES = [
    { icon: MapPin,     label: 'Real-time GPS tracking',    sub: 'Live positions on interactive maps' },
    { icon: Shield,     label: 'Beat zone enforcement',     sub: 'Instant geo-fence breach alerts' },
    { icon: Radio,      label: 'Multi-device support',      sub: 'P901 · GF-07 · JT808 and more' },
    { icon: Activity,   label: 'Incident management',       sub: 'SOS, offline, and violation tracking' },
];

interface Props extends AuthLayoutProps {
    logo?: ReactNode;
    appName?: string;
}

export default function AuthSplitLayout({ children, title, description, logo, appName = 'Track Any Device' }: Props) {
    return (
        <div className="flex h-dvh overflow-hidden bg-background">
            {/* LEFT PANEL */}
            <aside className="relative hidden overflow-hidden border-r border-border bg-[#0b1220] lg:flex lg:w-[48%] lg:flex-col">
                <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
                    style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} />
                <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="relative z-10 flex h-full flex-col justify-between p-10">
                    <div className="flex items-center gap-3">
                        {logo && <div className="flex h-10 items-center rounded-lg bg-white/95 px-3 shadow-sm">{logo}</div>}
                        <span className="text-base font-semibold text-white">{appName}</span>
                    </div>

                    <div className="max-w-md">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium tracking-wider text-white/70 uppercase">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            </span>
                            Live operations platform
                        </span>

                        <h2 className="text-4xl leading-tight font-bold tracking-tight text-white">
                            Field intelligence,<br />in one view.
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-white/65">
                            Real-time GPS tracking, beat zone enforcement, and automated incident management — built for fleet, government, and IoT operators.
                        </p>

                        <ul className="mt-9 space-y-2">
                            {FEATURES.map((f) => (
                                <li key={f.label} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.06]">
                                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary"
                                        style={{ background: 'color-mix(in oklab, var(--primary) 18%, transparent)' }}>
                                        <f.icon className="h-4 w-4" />
                                    </span>
                                    <span className="leading-tight">
                                        <span className="block text-sm font-semibold text-white">{f.label}</span>
                                        <span className="block text-xs text-white/55">{f.sub}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-[11px] tracking-wide text-white/35">
                        © {new Date().getFullYear()} · Secure · Encrypted · Enterprise-grade
                    </div>
                </div>
            </aside>

            {/* RIGHT PANEL */}
            <div className="flex flex-1 items-center justify-center overflow-y-auto bg-background p-6 lg:p-12">
                <div className="w-full max-w-sm">
                    {logo && <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">{logo}</div>}
                    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                        <div className="mb-6">
                            <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
                            {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
                        </div>
                        {children}
                    </div>
                    <p className="mt-5 text-center text-xs text-muted-foreground">Secure · Encrypted · Enterprise-grade</p>
                </div>
            </div>
        </div>
    );
}
