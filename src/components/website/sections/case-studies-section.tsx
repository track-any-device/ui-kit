import { PlatformLink } from '../../../platform/context';
import { SectionButtons } from '../../cms/section-button';
import { cn } from '../../../lib/utils';
import type { CaseStudiesContent, CaseStudyItem } from '../types';

const defaultContent: CaseStudiesContent = {
    eyebrow: 'Success stories',
    title: 'Real results for real fleets',
    subtitle: 'See how teams across Pakistan cut costs and improved visibility with Track Any Device.',
    variant: 'grid',
    items: [
        {
            title: 'Punjab Government reduces fuel fraud by 35%',
            summary: 'By deploying 1,200 trackers across their transport fleet and setting fuel-consumption thresholds, the department cut unauthorised refuelling within 60 days.',
            tags: ['Government', 'Fuel management'],
            metrics: [{ label: 'Fuel savings', value: '35%' }, { label: 'Vehicles tracked', value: '1,200' }],
            industry: 'Government',
            link: '#',
            link_label: 'Read case study',
        },
        {
            title: 'Swift Couriers hits 98% on-time delivery',
            summary: 'Route optimisation and live traffic alerts helped Swift Couriers\' Lahore fleet shave an average of 18 minutes per delivery run.',
            tags: ['Logistics', 'Route optimisation'],
            metrics: [{ label: 'On-time rate', value: '98%' }, { label: 'Avg. time saved', value: '18 min' }],
            industry: 'Logistics',
            link: '#',
            link_label: 'Read case study',
        },
        {
            title: 'MegaFreight scales to 3,000 trucks in 6 weeks',
            summary: 'A phased hardware rollout and our bulk provisioning API let MegaFreight onboard their entire national fleet without a single support ticket.',
            tags: ['Freight', 'Scale'],
            metrics: [{ label: 'Trucks onboarded', value: '3,000' }, { label: 'Rollout time', value: '6 weeks' }],
            industry: 'Freight',
            link: '#',
            link_label: 'Read case study',
        },
    ],
    buttons: [{ label: 'View all case studies', link: '/case-studies', variant: 'outline' }],
};

export function CaseStudiesSection({
    content = defaultContent,
    identifier,
}: {
    content?: CaseStudiesContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'grid';
    const items = content?.items ?? [];

    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                {(content?.eyebrow || content?.title || content?.subtitle) && (
                    <header className="mx-auto mb-14 max-w-2xl text-center">
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

                {/* Featured: first item large, rest small */}
                {variant === 'featured' && items.length > 0 && (
                    <div className="grid gap-6 lg:grid-cols-5">
                        <div className="lg:col-span-3">
                            <CaseStudyCard item={items[0]} featured />
                        </div>
                        <div className="flex flex-col gap-6 lg:col-span-2">
                            {items.slice(1).map((item, i) => (
                                <CaseStudyCard key={i} item={item} compact />
                            ))}
                        </div>
                    </div>
                )}

                {/* Grid */}
                {variant === 'grid' && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item, i) => (
                            <CaseStudyCard key={i} item={item} />
                        ))}
                    </div>
                )}

                {/* Compact list */}
                {variant === 'compact' && (
                    <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                        {items.map((item, i) => (
                            <CaseStudyListRow key={i} item={item} />
                        ))}
                    </div>
                )}

                {/* Detailed */}
                {variant === 'detailed' && (
                    <div className="space-y-16">
                        {items.map((item, i) => (
                            <CaseStudyDetailed key={i} item={item} index={i} />
                        ))}
                    </div>
                )}

                {content?.buttons && (
                    <div className="mt-12 text-center">
                        <SectionButtons buttons={content.buttons} align="center" size="md" />
                    </div>
                )}
            </div>
        </section>
    );
}

function CaseStudyCard({ item, featured, compact }: { item: CaseStudyItem; featured?: boolean; compact?: boolean }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
            {item.image ? (
                <img
                    src={item.image}
                    alt={item.title}
                    className={cn('w-full object-cover', featured ? 'h-56' : compact ? 'h-28' : 'h-44')}
                />
            ) : (
                <div className={cn(
                    'flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5',
                    featured ? 'h-56' : compact ? 'h-28' : 'h-44',
                )}>
                    {item.industry && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {item.industry}
                        </span>
                    )}
                </div>
            )}

            <div className="flex flex-1 flex-col gap-3 p-5">
                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <h3 className={cn('font-semibold leading-snug', featured ? 'text-xl' : 'text-base')}>
                    {item.title}
                </h3>

                {item.summary && !compact && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
                )}

                {item.metrics && item.metrics.length > 0 && (
                    <dl className="mt-auto flex flex-wrap gap-4 border-t border-border pt-3">
                        {item.metrics.map((m) => (
                            <div key={m.label}>
                                <dd className="text-xl font-bold text-primary">{m.value}</dd>
                                <dt className="text-xs text-muted-foreground">{m.label}</dt>
                            </div>
                        ))}
                    </dl>
                )}

                {item.link && (
                    <PlatformLink href={item.link} className="mt-2 text-sm font-medium text-primary hover:underline">
                        {item.link_label ?? 'Read case study'} →
                    </PlatformLink>
                )}
            </div>
        </article>
    );
}

function CaseStudyListRow({ item }: { item: CaseStudyItem }) {
    return (
        <div className="flex items-center gap-4 bg-card px-5 py-4 hover:bg-muted/40 transition-colors">
            {item.industry && (
                <span className="shrink-0 rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {item.industry}
                </span>
            )}
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{item.title}</p>
                {item.tags && (
                    <p className="text-xs text-muted-foreground">{item.tags.join(' · ')}</p>
                )}
            </div>
            {item.link && (
                <PlatformLink href={item.link} className="shrink-0 text-sm font-medium text-primary hover:underline">
                    {item.link_label ?? 'Read →'}
                </PlatformLink>
            )}
        </div>
    );
}

function CaseStudyDetailed({ item, index }: { item: CaseStudyItem; index: number }) {
    const isEven = index % 2 === 0;
    return (
        <article className={cn('flex flex-col gap-10 md:flex-row md:items-start', !isEven && 'md:flex-row-reverse')}>
            <div className="md:w-2/5">
                {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full rounded-2xl object-cover shadow" />
                ) : (
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-5xl">
                        📊
                    </div>
                )}
            </div>
            <div className="md:w-3/5 space-y-4">
                {item.tags && (
                    <div className="flex gap-2 flex-wrap">
                        {item.tags.map((t) => (
                            <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
                        ))}
                    </div>
                )}
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                {item.summary && <p className="text-muted-foreground">{item.summary}</p>}
                {item.metrics && (
                    <dl className="flex flex-wrap gap-6">
                        {item.metrics.map((m) => (
                            <div key={m.label}>
                                <dd className="text-3xl font-bold text-primary">{m.value}</dd>
                                <dt className="text-sm text-muted-foreground">{m.label}</dt>
                            </div>
                        ))}
                    </dl>
                )}
                {item.link && (
                    <PlatformLink href={item.link} className="inline-block text-sm font-medium text-primary hover:underline">
                        {item.link_label ?? 'Read the full story'} →
                    </PlatformLink>
                )}
            </div>
        </article>
    );
}

export const caseStudiesSampleProps: CaseStudiesContent = defaultContent;

export default CaseStudiesSection;
