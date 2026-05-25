import { SectionBackground } from '../../cms/section-bg';
import { cn } from '../../../lib/utils';
import type { StatsContent, StatItem } from '../types';

const defaultContent: StatsContent = {
    eyebrow: 'By the numbers',
    title: 'Trusted at scale',
    variant: 'card-grid',
    items: [
        { value: '50,000', suffix: '+', label: 'Devices tracked', icon: '📡' },
        { value: '120', suffix: '+', label: 'Enterprise clients', icon: '🏢' },
        { value: '99.9', suffix: '%', label: 'Platform uptime', icon: '✅' },
        { value: '4.8', suffix: '/5', label: 'Customer rating', icon: '⭐' },
    ],
};

export function StatsSection({
    content = defaultContent,
    identifier,
}: {
    content?: StatsContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'card-grid';
    const items = content?.items ?? [];
    const bg = content?.bg ?? null;

    const isDark = variant === 'dark-band';
    const hasBg = bg?.kind != null;

    return (
        <section
            id={identifier ?? undefined}
            className={cn(
                'relative overflow-hidden py-16 sm:py-20',
                isDark && 'bg-foreground text-background',
                !isDark && !hasBg && 'bg-background',
            )}
        >
            {hasBg && !isDark && <SectionBackground bg={bg} />}

            <div className="relative mx-auto max-w-6xl px-6">
                {(content?.eyebrow || content?.title || content?.subtitle) && (
                    <header className="mb-12 text-center">
                        {content?.eyebrow && (
                            <p className={cn(
                                'mb-2 text-xs font-medium tracking-widest uppercase',
                                isDark ? 'text-white/60' : 'text-muted-foreground',
                            )}>
                                {content.eyebrow}
                            </p>
                        )}
                        {content?.title && (
                            <h2 className={cn('text-3xl font-semibold tracking-tight sm:text-4xl', isDark && 'text-white')}>
                                {content.title}
                            </h2>
                        )}
                        {content?.subtitle && (
                            <p className={cn('mt-3 text-base sm:text-lg', isDark ? 'text-white/70' : 'text-muted-foreground')}>
                                {content.subtitle}
                            </p>
                        )}
                    </header>
                )}

                {variant === 'simple' && (
                    <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {items.map((item, i) => (
                            <SimpleStatItem key={i} item={item} dark={false} />
                        ))}
                    </dl>
                )}

                {variant === 'card-grid' && (
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {items.map((item, i) => (
                            <div key={i} className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                                <SimpleStatItem item={item} dark={false} />
                            </div>
                        ))}
                    </dl>
                )}

                {variant === 'icon-stats' && (
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {items.map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-sm">
                                {item.icon && <span className="text-3xl">{item.icon}</span>}
                                <SimpleStatItem item={item} dark={false} />
                            </div>
                        ))}
                    </dl>
                )}

                {variant === 'dark-band' && (
                    <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {items.map((item, i) => (
                            <SimpleStatItem key={i} item={item} dark />
                        ))}
                    </dl>
                )}
            </div>
        </section>
    );
}

function SimpleStatItem({ item, dark }: { item: StatItem; dark: boolean }) {
    return (
        <div className="text-center">
            <dd className={cn('text-4xl font-bold tabular-nums', dark ? 'text-white' : 'text-primary')}>
                {item.prefix}{item.value}{item.suffix}
            </dd>
            <dt className={cn('mt-1 text-sm font-medium', dark ? 'text-white/70' : 'text-muted-foreground')}>
                {item.label}
            </dt>
            {item.description && (
                <p className={cn('mt-1 text-xs', dark ? 'text-white/50' : 'text-muted-foreground/70')}>
                    {item.description}
                </p>
            )}
        </div>
    );
}

export const statsSampleProps: StatsContent = defaultContent;

export default StatsSection;
