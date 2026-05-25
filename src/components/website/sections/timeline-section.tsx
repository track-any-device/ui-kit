import { cn } from '../../../lib/utils';
import type { TimelineContent, TimelineItem } from '../types';

const defaultContent: TimelineContent = {
    eyebrow: 'Our journey',
    title: 'From idea to 50,000 devices',
    variant: 'vertical',
    items: [
        { date: '2020', title: 'Founded', description: 'Ahmad Faryab launches TAD from a Lahore garage after being frustrated by expensive, clunky tracking software.' },
        { date: '2021', title: 'First 100 clients', description: 'Word-of-mouth growth takes us to 100 paying customers and our first enterprise contract with a provincial government.' },
        { date: '2022', title: 'Mobile app launch', description: 'Native Android and iOS apps release to the public, allowing drivers and managers to track on the go.' },
        { date: '2023', title: 'Series A', description: 'Raised $3M to expand the engineering team and launch route optimisation and AI-powered alerts.' },
        { date: '2024', title: '50,000 devices', description: 'Platform crosses the 50,000 active device milestone across Pakistan, Afghanistan, and the Gulf region.', milestone: true },
    ],
};

export function TimelineSection({
    content = defaultContent,
    identifier,
}: {
    content?: TimelineContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'vertical';
    const items = content?.items ?? [];

    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-5xl px-6">
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

                {/* Vertical */}
                {(variant === 'vertical' || variant === 'roadmap') && (
                    <ol className="relative ml-4 border-l-2 border-border pl-8 space-y-10">
                        {items.map((item, i) => (
                            <li key={i} className="relative">
                                {/* dot */}
                                <div className={cn(
                                    'absolute -left-[2.4rem] flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold',
                                    item.milestone
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-border bg-background text-muted-foreground',
                                )}>
                                    {item.icon ?? String(i + 1)}
                                </div>

                                <div className={cn('rounded-xl border p-4', item.milestone ? 'border-primary/30 bg-primary/5' : 'border-border bg-card')}>
                                    {item.date && (
                                        <time className="text-xs font-medium text-muted-foreground">{item.date}</time>
                                    )}
                                    <h3 className={cn('font-semibold', item.milestone ? 'text-primary' : 'text-foreground')}>
                                        {item.title}
                                        {item.milestone && <span className="ml-2 text-xs">⭐</span>}
                                    </h3>
                                    {item.description && (
                                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                )}

                {/* Horizontal */}
                {variant === 'horizontal' && (
                    <div className="relative overflow-x-auto">
                        <ol className="flex min-w-max gap-0">
                            {items.map((item, i) => (
                                <li key={i} className="relative flex flex-1 flex-col items-center">
                                    {/* Line */}
                                    {i < items.length - 1 && (
                                        <div aria-hidden className="absolute top-4 left-1/2 h-0.5 w-full bg-border" />
                                    )}
                                    {/* Dot */}
                                    <div className={cn(
                                        'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                                        item.milestone
                                            ? 'bg-primary text-primary-foreground'
                                            : 'border-2 border-border bg-background text-muted-foreground',
                                    )}>
                                        {item.icon ?? String(i + 1)}
                                    </div>
                                    {/* Content */}
                                    <div className="mt-4 w-32 text-center">
                                        {item.date && (
                                            <time className="text-xs text-muted-foreground">{item.date}</time>
                                        )}
                                        <p className="text-sm font-semibold">{item.title}</p>
                                        {item.description && (
                                            <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{item.description}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Milestone — alternating sides */}
                {variant === 'milestone' && (
                    <div className="relative">
                        <div aria-hidden className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />
                        <ol className="space-y-10">
                            {items.map((item, i) => {
                                const isLeft = i % 2 === 0;
                                return (
                                    <li key={i} className="relative flex items-center">
                                        {/* Left content */}
                                        <div className={cn('w-1/2 pr-8 text-right', !isLeft && 'invisible')}>
                                            {isLeft && <TimelineCard item={item} />}
                                        </div>
                                        {/* Centre dot */}
                                        <div className={cn(
                                            'absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 text-xs font-bold',
                                            item.milestone ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground',
                                        )}>
                                            {item.icon ?? String(i + 1)}
                                        </div>
                                        {/* Right content */}
                                        <div className={cn('w-1/2 pl-8', isLeft && 'invisible')}>
                                            {!isLeft && <TimelineCard item={item} />}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                )}
            </div>
        </section>
    );
}

function TimelineCard({ item }: { item: TimelineItem }) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm text-left">
            {item.date && <time className="text-xs text-muted-foreground">{item.date}</time>}
            <p className="font-semibold">{item.title}</p>
            {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            )}
        </div>
    );
}

export const timelineSampleProps: TimelineContent = defaultContent;

export default TimelineSection;
