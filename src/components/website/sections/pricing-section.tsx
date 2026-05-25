'use client';

import { useState } from 'react';
import { PlatformLink } from '../../../platform/context';
import { cn } from '../../../lib/utils';
import type { PricingContent, PricingPlan, PricingFeature } from '../types';

const defaultContent: PricingContent = {
    eyebrow: 'Simple pricing',
    title: 'Plans for every fleet size',
    subtitle: 'No hidden fees. Cancel anytime. All plans include a 14-day free trial.',
    variant: 'tiers',
    show_toggle: true,
    plans: [
        {
            name: 'Starter',
            description: 'Perfect for small fleets just getting started.',
            price_monthly: 9,
            price_yearly: 7,
            currency: '$',
            cta_label: 'Start free trial',
            cta_link: '/register',
            cta_variant: 'outline',
            features: [
                { text: 'Up to 10 devices', included: true },
                { text: 'Real-time tracking', included: true },
                { text: 'Basic alerts', included: true },
                { text: 'Mobile app', included: true },
                { text: 'Route optimisation', included: false },
                { text: 'API access', included: false },
                { text: 'Dedicated support', included: false },
            ],
        },
        {
            name: 'Professional',
            description: 'For growing fleets that need more power.',
            price_monthly: 29,
            price_yearly: 23,
            currency: '$',
            badge: 'Most popular',
            highlighted: true,
            cta_label: 'Start free trial',
            cta_link: '/register',
            cta_variant: 'primary',
            features: [
                { text: 'Up to 100 devices', included: true },
                { text: 'Real-time tracking', included: true },
                { text: 'Advanced alerts', included: true },
                { text: 'Mobile app', included: true },
                { text: 'Route optimisation', included: true },
                { text: 'API access', included: true },
                { text: 'Dedicated support', included: false },
            ],
        },
        {
            name: 'Enterprise',
            description: 'Unlimited scale with white-glove support.',
            price_monthly: null,
            price_yearly: null,
            currency: '$',
            cta_label: 'Contact sales',
            cta_link: '/contact',
            cta_variant: 'outline',
            features: [
                { text: 'Unlimited devices', included: true },
                { text: 'Real-time tracking', included: true },
                { text: 'Custom alerts & workflows', included: true },
                { text: 'Mobile app', included: true },
                { text: 'Route optimisation', included: true },
                { text: 'Full API access', included: true },
                { text: 'Dedicated support', included: true },
            ],
        },
    ],
};

export function PricingSection({
    content = defaultContent,
    identifier,
}: {
    content?: PricingContent;
    identifier?: string | null;
}) {
    const [yearly, setYearly] = useState(false);
    const variant = content?.variant ?? 'tiers';
    const plans = content?.plans ?? [];
    const showToggle = content?.show_toggle ?? true;

    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                {(content?.eyebrow || content?.title || content?.subtitle) && (
                    <header className="mx-auto mb-12 max-w-2xl text-center">
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

                {/* Billing toggle */}
                {showToggle && (
                    <div className="mb-10 flex items-center justify-center gap-3">
                        <span className={cn('text-sm', !yearly && 'font-semibold text-foreground', yearly && 'text-muted-foreground')}>Monthly</span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={yearly}
                            onClick={() => setYearly(!yearly)}
                            className={cn(
                                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                yearly ? 'bg-primary' : 'bg-muted-foreground/30',
                            )}
                        >
                            <span
                                className={cn(
                                    'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
                                    yearly ? 'translate-x-6' : 'translate-x-1',
                                )}
                            />
                        </button>
                        <span className={cn('text-sm', yearly && 'font-semibold text-foreground', !yearly && 'text-muted-foreground')}>
                            Yearly <span className="text-xs text-primary font-medium">(save 20%)</span>
                        </span>
                    </div>
                )}

                {/* Tier cards */}
                {(variant === 'tiers' || variant === 'compact') && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {plans.map((plan, i) => (
                            <PricingCard key={i} plan={plan} yearly={yearly} compact={variant === 'compact'} />
                        ))}
                    </div>
                )}

                {/* Enterprise call-out */}
                {variant === 'enterprise' && (
                    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm max-w-3xl mx-auto text-center space-y-4">
                        <h3 className="text-2xl font-semibold">Enterprise</h3>
                        <p className="text-muted-foreground">Custom pricing for large fleets. SLA guarantees, SSO, dedicated infra, and white-glove onboarding included.</p>
                        <PlatformLink
                            href={plans[0]?.cta_link ?? '/contact'}
                            className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Talk to sales
                        </PlatformLink>
                    </div>
                )}

                {/* Comparison table */}
                {variant === 'comparison' && <ComparisonTable plans={plans} yearly={yearly} />}
            </div>
        </section>
    );
}

function PricingCard({ plan, yearly, compact }: { plan: PricingPlan; yearly: boolean; compact: boolean }) {
    const price = yearly ? plan.price_yearly : plan.price_monthly;
    const currency = plan.currency ?? '$';

    return (
        <div className={cn(
            'flex flex-col rounded-2xl border p-6 shadow-sm',
            plan.highlighted
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-border bg-card',
        )}>
            {plan.badge && (
                <span className="mb-3 w-fit rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                    {plan.badge}
                </span>
            )}
            <h3 className="font-semibold text-lg">{plan.name}</h3>
            {plan.description && (
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            )}

            <div className="mt-5 mb-6">
                {price != null ? (
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm text-muted-foreground">{currency}</span>
                        <span className="text-4xl font-bold tabular-nums">{price}</span>
                        <span className="text-sm text-muted-foreground">/ mo</span>
                    </div>
                ) : (
                    <p className="text-2xl font-bold">Custom</p>
                )}
                {yearly && price != null && (
                    <p className="mt-0.5 text-xs text-muted-foreground">Billed annually</p>
                )}
            </div>

            {plan.cta_link && (
                <PlatformLink
                    href={plan.cta_link}
                    className={cn(
                        'mb-6 flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
                        plan.highlighted
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'border border-border bg-background hover:bg-muted',
                    )}
                >
                    {plan.cta_label ?? 'Get started'}
                </PlatformLink>
            )}

            {!compact && plan.features && (
                <ul className="space-y-2.5">
                    {plan.features.map((f, i) => (
                        <FeatureRow key={i} feature={f} />
                    ))}
                </ul>
            )}
        </div>
    );
}

function FeatureRow({ feature }: { feature: PricingFeature }) {
    return (
        <li className={cn('flex items-start gap-2.5 text-sm', !feature.included && 'opacity-40')}>
            <span className={cn('mt-0.5 text-base leading-none', feature.included ? 'text-primary' : 'text-muted-foreground')}>
                {feature.included ? '✓' : '✕'}
            </span>
            {feature.text}
        </li>
    );
}

function ComparisonTable({ plans, yearly }: { plans: PricingPlan[]; yearly: boolean }) {
    const allFeatures = Array.from(
        new Set(plans.flatMap((p) => p.features?.map((f) => f.text) ?? [])),
    );

    return (
        <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border bg-muted/40">
                        <th className="p-4 text-left font-medium text-muted-foreground">Features</th>
                        {plans.map((p) => (
                            <th key={p.name} className={cn('p-4 text-center font-semibold', p.highlighted && 'bg-primary/5 text-primary')}>
                                {p.name}
                                <div className="mt-0.5 text-xs font-normal text-muted-foreground">
                                    {(() => {
                                        const price = yearly ? p.price_yearly : p.price_monthly;
                                        return price != null ? `${p.currency ?? '$'}${price}/mo` : 'Custom';
                                    })()}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allFeatures.map((feat, ri) => (
                        <tr key={feat} className={cn('border-b border-border', ri % 2 === 0 && 'bg-muted/20')}>
                            <td className="p-4 text-foreground">{feat}</td>
                            {plans.map((p) => {
                                const f = p.features?.find((x) => x.text === feat);
                                return (
                                    <td key={p.name} className={cn('p-4 text-center', p.highlighted && 'bg-primary/5')}>
                                        {f?.included ? (
                                            <span className="text-primary" aria-label="Included">✓</span>
                                        ) : (
                                            <span className="text-muted-foreground/40" aria-label="Not included">—</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="border-t border-border bg-muted/40">
                        <td className="p-4" />
                        {plans.map((p) => (
                            <td key={p.name} className={cn('p-4 text-center', p.highlighted && 'bg-primary/5')}>
                                {p.cta_link && (
                                    <PlatformLink
                                        href={p.cta_link}
                                        className={cn(
                                            'inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold transition-colors',
                                            p.highlighted
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                : 'border border-border bg-background hover:bg-muted',
                                        )}
                                    >
                                        {p.cta_label ?? 'Get started'}
                                    </PlatformLink>
                                )}
                            </td>
                        ))}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export const pricingSampleProps: PricingContent = defaultContent;

export default PricingSection;
