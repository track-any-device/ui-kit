'use client';

import { PlatformLink } from '../../platform/context';

import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type NavLink = { id: number; label: string; href: string; target: string };

export type FooterLinks = {
    quick?: NavLink[];
    support?: NavLink[];
    legal?: NavLink[];
};

const CONTACT = {
    phone: '+1 (800) 123-4567',
    email: 'info@trackanydevice.com',
    address: '123 Innovation Drive, Smart City, CA 94043, USA',
};

function DefaultAppLogo() {
    const appName = (typeof window !== 'undefined' && (window as any).AppConfig?.appName) || 'Fleet Tracking';
    return <span className="font-display text-sm font-semibold text-foreground">{appName}</span>;
}

interface SiteFooterProps {
    AppLogo?: React.ComponentType;
    footerLinks?: FooterLinks;
    subscribeEndpoint?: string;
}

export default function SiteFooter({ AppLogo = DefaultAppLogo, footerLinks, subscribeEndpoint = '/subscribe' }: SiteFooterProps) {
    const groups = footerLinks ?? { quick: [], support: [], legal: [] };
    const appName = (typeof window !== 'undefined' && (window as any).AppConfig?.appName) || 'Fleet Tracking';

    return (
        <footer id="contact" className="border-t border-border bg-card">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-16">
                <div className="grid gap-10 border-b border-border pb-10 lg:grid-cols-2">
                    <div>
                        <PlatformLink href="/" className="mb-4 inline-flex items-center gap-2.5">
                            <div className="flex h-9 items-center"><AppLogo /></div>
                            <span className="font-display text-sm font-semibold text-foreground">{appName}</span>
                        </PlatformLink>
                        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                            Smart tracking solutions for a connected world. Track any device, anywhere, anytime.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        <ContactRow icon={Phone} label="Phone"   value={CONTACT.phone}   />
                        <ContactRow icon={Mail}  label="Email"   value={CONTACT.email}   />
                        <ContactRow icon={MapPin} label="Address" value={CONTACT.address} />
                    </div>
                </div>

                <div className="grid gap-10 py-10 sm:grid-cols-3">
                    <FooterColumn title="Quick Links" links={groups.quick ?? []} />
                    <FooterColumn title="Policies"    links={groups.legal  ?? []} />
                    <SubscriptionForm endpoint={subscribeEndpoint} />
                </div>
            </div>

            <div className="border-t border-border bg-muted/30">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8 lg:px-16">
                    <span>© {new Date().getFullYear()} {appName}. All rights reserved.</span>
                    <span>Built for modern field operations · IoT · Fleet · Smart Infrastructure</span>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
    if (!links || links.length === 0) return null;
    return (
        <div>
            <h3 className="mb-4 font-display text-xs font-semibold tracking-widest text-foreground uppercase">{title}</h3>
            <ul className="space-y-2.5">
                {links.map((link) => (
                    <li key={link.id}>
                        <PlatformLink href={link.href} target={link.target === '_blank' ? '_blank' : undefined} rel={link.target === '_blank' ? 'noopener noreferrer' : undefined} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                            {link.label}
                        </PlatformLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ContactRow({ icon: IconCmp, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
    return (
        <div className="flex items-start gap-2.5">
            <IconCmp className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
                <p className="text-sm text-foreground">{value}</p>
            </div>
        </div>
    );
}

function SubscriptionForm({ endpoint }: { endpoint: string }) {
    const [email, setEmail]       = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone]         = useState(false);
    const [error, setError]       = useState('');

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email, source: 'footer' }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data?.errors?.email ?? 'Something went wrong.');
            } else {
                setDone(true);
                setEmail('');
                setTimeout(() => setDone(false), 4000);
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            <h3 className="mb-4 font-display text-xs font-semibold tracking-widest text-foreground uppercase">Subscribe</h3>
            <p className="mb-3 text-sm text-muted-foreground">Product updates, new device launches, and tips for getting more out of your fleet.</p>
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={submit} noValidate>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" aria-label="Email address" required className="flex-1" />
                <Button type="submit" disabled={submitting} className="shrink-0">{submitting ? '…' : 'Subscribe'}</Button>
            </form>
            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
            {done && (
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-primary">
                    <CheckCircle2 className="size-3" /> Thanks! You're subscribed.
                </p>
            )}
        </div>
    );
}
