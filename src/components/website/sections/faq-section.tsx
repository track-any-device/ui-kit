'use client';

import { useState } from 'react';
import { PlatformLink } from '../../../platform/context';
import { cn } from '../../../lib/utils';
import type { FaqContent, FaqItem } from '../types';

const defaultContent: FaqContent = {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    subtitle: 'Everything you need to know before getting started.',
    variant: 'simple',
    items: [
        { question: 'How long does installation take?', answer: 'Most OBD-II trackers are plug-and-play and take under 5 minutes. Hardwired units take 20–40 minutes with a certified installer.' },
        { question: 'Is there a free trial?', answer: 'Yes — all plans include a 14-day free trial with no credit card required.' },
        { question: 'Can I track vehicles in real time?', answer: 'Yes. Our platform refreshes positions every 5 seconds and shows live speed, heading, and engine status.' },
        { question: 'How many users can be on one account?', answer: 'The Starter plan includes 3 user seats. Professional includes 10, and Enterprise is unlimited.' },
        { question: 'What happens if a device goes offline?', answer: 'The last known position is retained and you\'ll receive an offline alert. Data is buffered on-device and synced when connectivity restores.' },
        { question: 'Do you offer an API?', answer: 'Yes — Professional and Enterprise plans include full REST API and webhook access with comprehensive documentation.' },
    ],
    support_link: '/contact',
    support_label: 'Contact support',
};

export function FaqSection({
    content = defaultContent,
    identifier,
}: {
    content?: FaqContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'simple';
    const items = content?.items ?? [];

    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-4xl px-6">
                {(content?.eyebrow || content?.title || content?.subtitle) && (
                    <header className="mb-12 text-center">
                        {content?.eyebrow && (
                            <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                                {content.eyebrow}
                            </p>
                        )}
                        {content?.title && (
                            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                                {content.title}
                            </h2>
                        )}
                        {content?.subtitle && (
                            <p className="mt-3 text-muted-foreground">{content.subtitle}</p>
                        )}
                    </header>
                )}

                {/* Simple / support */}
                {(variant === 'simple' || variant === 'support') && (
                    <AccordionList items={items} />
                )}

                {/* Two-column */}
                {variant === 'two-column' && (
                    <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                        <AccordionList items={items.slice(0, Math.ceil(items.length / 2))} />
                        <AccordionList items={items.slice(Math.ceil(items.length / 2))} />
                    </div>
                )}

                {/* Grouped */}
                {variant === 'grouped' && <GroupedFaq items={items} />}

                {/* Support CTA */}
                {(variant === 'support' || content?.support_link) && (
                    <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-8 text-center">
                        <p className="font-medium">Still have questions?</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Our team is happy to help.
                        </p>
                        {content?.support_link && (
                            <PlatformLink
                                href={content.support_link}
                                className="mt-4 inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                            >
                                {content.support_label ?? 'Contact support'} →
                            </PlatformLink>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

function AccordionList({ items }: { items: FaqItem[] }) {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <dl className="divide-y divide-border rounded-xl border border-border overflow-hidden">
            {items.map((item, i) => (
                <div key={i}>
                    <dt>
                        <button
                            type="button"
                            onClick={() => setOpen(open === i ? null : i)}
                            aria-expanded={open === i}
                            className="flex w-full items-center justify-between gap-4 bg-card px-5 py-4 text-left text-sm font-medium hover:bg-muted/40 transition-colors"
                        >
                            {item.question}
                            <span
                                aria-hidden
                                className={cn(
                                    'shrink-0 text-muted-foreground transition-transform duration-200',
                                    open === i && 'rotate-45',
                                )}
                            >
                                +
                            </span>
                        </button>
                    </dt>
                    {open === i && (
                        <dd className="bg-muted/20 px-5 pb-5 pt-2 text-sm text-muted-foreground leading-relaxed">
                            {item.answer}
                        </dd>
                    )}
                </div>
            ))}
        </dl>
    );
}

function GroupedFaq({ items }: { items: FaqItem[] }) {
    const groups = items.reduce<Record<string, FaqItem[]>>((acc, item) => {
        const key = item.group ?? 'General';
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    return (
        <div className="space-y-10">
            {Object.entries(groups).map(([group, groupItems]) => (
                <div key={group}>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                        {group}
                    </h3>
                    <AccordionList items={groupItems} />
                </div>
            ))}
        </div>
    );
}

export const faqSampleProps: FaqContent = defaultContent;

export default FaqSection;
