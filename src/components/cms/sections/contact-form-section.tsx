'use client';

import { CheckCircle2, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { cn } from '../../../lib/utils';

export type ContactFormContent = {
    title?: string | null;
    subtitle?: string | null;
    fields?: ('name' | 'email' | 'phone' | 'company' | 'subject' | 'message')[] | null;
    submit_label?: string | null;
    success_message?: string | null;
    contact_info?: {
        phone?: string | null;
        email?: string | null;
        address?: string | null;
    } | null;
};

type FieldName = 'name' | 'email' | 'phone' | 'company' | 'subject' | 'message';

interface ContactFormSectionProps {
    content?: ContactFormContent;
    identifier?: string | null;
    endpoint?: string;
    /** Pre-set flash state from the server (e.g. passed via Inertia shared props in the consuming app). */
    flashSuccess?: boolean;
    flashMessage?: string;
}

export function ContactFormSection({ content, identifier, endpoint = '/contact', flashSuccess = false, flashMessage }: ContactFormSectionProps) {
    const fields: FieldName[] = (content?.fields ?? ['name', 'email', 'phone', 'message']) as FieldName[];
    const submitLabel = content?.submit_label ?? 'Send message';
    const successCopy = content?.success_message ?? "Thanks — we'll reply within one business day.";
    const info = content?.contact_info ?? {};

    const [formData, setFormData] = useState<Record<FieldName, string>>({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
    const [processing, setProcessing] = useState(false);
    const [done, setDone] = useState(flashSuccess);
    const [serverMessage, setServerMessage] = useState(flashMessage ?? '');

    const set = (field: FieldName) => (v: string) => setFormData((prev) => ({ ...prev, [field]: v }));

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setErrors(data?.errors ?? {});
            } else {
                setDone(true);
                setServerMessage(data?.message ?? successCopy);
                setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
            }
        } catch {
            setErrors({ message: 'Network error. Please try again.' });
        } finally {
            setProcessing(false);
        }
    }

    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                {(content?.title || content?.subtitle) && (
                    <header className="mx-auto mb-12 max-w-2xl text-center">
                        {content?.title && <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{content.title}</h2>}
                        {content?.subtitle && <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">{content.subtitle}</p>}
                    </header>
                )}

                <div className="grid gap-8 lg:grid-cols-3">
                    <Card className="border-border/60 bg-card p-6 lg:col-span-2">
                        {done ? (
                            <div className="flex flex-col items-start gap-3 rounded-lg bg-primary/5 p-6 text-primary">
                                <CheckCircle2 className="size-6" />
                                <p className="text-base font-medium">{serverMessage || successCopy}</p>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
                                {fields.includes('name')    && <Field id="name"    label="Name"    required value={formData.name}    onChange={set('name')}    error={errors.name}    autoComplete="name" />}
                                {fields.includes('email')   && <Field id="email"   label="Email"   required type="email" value={formData.email}   onChange={set('email')}   error={errors.email}   autoComplete="email" />}
                                {fields.includes('phone')   && <Field id="phone"   label="Phone"   type="tel" value={formData.phone}   onChange={set('phone')}   error={errors.phone}   autoComplete="tel" />}
                                {fields.includes('company') && <Field id="company" label="Company"  value={formData.company} onChange={set('company')} error={errors.company} autoComplete="organization" />}
                                {fields.includes('subject') && <Field id="subject" label="Subject"  className="sm:col-span-2" value={formData.subject} onChange={set('subject')} error={errors.subject} />}
                                {fields.includes('message') && (
                                    <div className="sm:col-span-2">
                                        <Label htmlFor="message">Message<span className="text-destructive"> *</span></Label>
                                        <textarea id="message" required rows={5} value={formData.message} onChange={(e) => set('message')(e.target.value)}
                                            className={cn('mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50', errors.message ? 'border-destructive' : 'border-input')}
                                        />
                                        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                                    </div>
                                )}
                                <div className="sm:col-span-2">
                                    <Button type="submit" size="lg" disabled={processing} className="w-full sm:w-auto">
                                        {processing && <Loader2 className="size-4 animate-spin" />}
                                        {submitLabel}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Card>

                    {(info.phone || info.email || info.address) && (
                        <Card className="flex flex-col gap-5 border-border/60 bg-card p-6">
                            <h3 className="text-sm font-semibold tracking-tight">Get in touch</h3>
                            {info.phone   && <ContactInfoRow icon={<Phone  className="size-4 text-primary" />} label="Phone"  value={info.phone}   href={`tel:${info.phone.replace(/\s+/g, '')}`} />}
                            {info.email   && <ContactInfoRow icon={<Mail   className="size-4 text-primary" />} label="Email"  value={info.email}   href={`mailto:${info.email}`} />}
                            {info.address && <ContactInfoRow icon={<MapPin className="size-4 text-primary" />} label="Office" value={info.address} />}
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}

function Field({ id, label, type = 'text', required, value, onChange, error, className, autoComplete }: {
    id: string; label: string; type?: string; required?: boolean;
    value: string; onChange: (v: string) => void; error?: string; className?: string; autoComplete?: string;
}) {
    return (
        <div className={className}>
            <Label htmlFor={id}>{label}{required && <span className="text-destructive"> *</span>}</Label>
            <Input id={id} type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete}
                className={cn('mt-1.5', error && 'border-destructive focus-visible:border-destructive')} />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </div>
    );
}

function ContactInfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
    const content = (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">{icon}</div>
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-card-foreground">{value}</p>
            </div>
        </div>
    );
    if (href) return <a href={href} className="block hover:opacity-80">{content}</a>;
    return content;
}
