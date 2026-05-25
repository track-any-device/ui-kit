'use client';

import { useState } from 'react';
import { SectionBackground } from '../../cms/section-bg';
import { cn } from '../../../lib/utils';
import type { NewsletterContent } from '../types';

const defaultContent: NewsletterContent = {
    eyebrow: 'Stay in the loop',
    title: 'Fleet insights, straight to your inbox',
    description: 'Monthly digest of best practices, product updates, and fleet management tips.',
    placeholder: 'you@company.com',
    cta_label: 'Subscribe',
    consent_text: 'No spam. Unsubscribe anytime.',
    variant: 'boxed',
};

export function NewsletterSection({
    content = defaultContent,
    identifier,
}: {
    content?: NewsletterContent;
    identifier?: string | null;
}) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const variant = content?.variant ?? 'boxed';
    const bg = content?.bg ?? null;
    const hasBg = bg?.kind != null;
    const isDark = variant === 'dark';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    };

    const form = submitted ? (
        <p className={cn('text-sm font-medium', isDark ? 'text-white' : 'text-primary')}>
            ✓ You're subscribed! We'll be in touch.
        </p>
    ) : (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor={`newsletter-${identifier ?? 'default'}`} className="sr-only">
                Email address
            </label>
            <input
                id={`newsletter-${identifier ?? 'default'}`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content?.placeholder ?? 'you@company.com'}
                className={cn(
                    'flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/50',
                    isDark
                        ? 'border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        : 'border-border bg-background text-foreground placeholder:text-muted-foreground',
                )}
            />
            <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
                {content?.cta_label ?? 'Subscribe'}
            </button>
        </form>
    );

    // Footer-inline — single horizontal row, no box
    if (variant === 'footer-inline') {
        return (
            <div id={identifier ?? undefined} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <p className="text-sm font-medium">{content?.title}</p>
                {form}
            </div>
        );
    }

    // Image-side variant
    if (variant === 'image-side') {
        return (
            <section id={identifier ?? undefined} className="bg-background py-16">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="flex flex-col gap-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:flex-row">
                        {content?.image && (
                            <div className="md:w-2/5">
                                <img
                                    src={content.image}
                                    alt=""
                                    className="h-full w-full object-cover"
                                    aria-hidden
                                />
                            </div>
                        )}
                        {!content?.image && (
                            <div className="flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 md:w-2/5 min-h-[200px]">
                                <span className="text-5xl opacity-40">📬</span>
                            </div>
                        )}
                        <div className="flex flex-col justify-center gap-4 p-8 md:w-3/5">
                            {content?.eyebrow && (
                                <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">{content.eyebrow}</p>
                            )}
                            {content?.title && <h2 className="text-2xl font-semibold">{content.title}</h2>}
                            {content?.description && <p className="text-sm text-muted-foreground">{content.description}</p>}
                            {form}
                            {content?.consent_text && (
                                <p className="text-xs text-muted-foreground">{content.consent_text}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Dark variant
    if (isDark) {
        return (
            <section id={identifier ?? undefined} className="relative overflow-hidden bg-foreground py-16 text-background">
                {hasBg && <SectionBackground bg={bg} />}
                <div className="relative mx-auto max-w-2xl px-6 text-center">
                    {content?.eyebrow && (
                        <p className="mb-3 text-xs font-medium tracking-widest text-white/60 uppercase">{content.eyebrow}</p>
                    )}
                    {content?.title && <h2 className="mb-3 text-3xl font-semibold text-white">{content.title}</h2>}
                    {content?.description && <p className="mb-6 text-white/70 text-sm">{content.description}</p>}
                    <div className="flex justify-center">{form}</div>
                    {content?.consent_text && (
                        <p className="mt-3 text-xs text-white/50">{content.consent_text}</p>
                    )}
                </div>
            </section>
        );
    }

    // Simple / boxed (default)
    const isBoxed = variant === 'boxed';

    return (
        <section
            id={identifier ?? undefined}
            className={cn('py-16', isBoxed ? 'bg-background' : 'bg-muted/40')}
        >
            <div className="mx-auto max-w-2xl px-6">
                <div className={cn('text-center', isBoxed && 'rounded-2xl border border-border bg-card p-10 shadow-sm')}>
                    {content?.eyebrow && (
                        <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">{content.eyebrow}</p>
                    )}
                    {content?.title && (
                        <h2 className="mb-3 text-2xl font-semibold tracking-tight">{content.title}</h2>
                    )}
                    {content?.description && (
                        <p className="mb-6 text-sm text-muted-foreground">{content.description}</p>
                    )}
                    <div className="flex justify-center">{form}</div>
                    {content?.consent_text && (
                        <p className="mt-3 text-xs text-muted-foreground">{content.consent_text}</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export const newsletterSampleProps: NewsletterContent = defaultContent;

export default NewsletterSection;
