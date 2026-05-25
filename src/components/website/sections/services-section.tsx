import { PlatformLink } from '../../../platform/context';
import { SectionBackground } from '../../cms/section-bg';
import { cn } from '../../../lib/utils';
import type { ServicesContent, ServiceItem } from '../types';

const defaultContent: ServicesContent = {
    eyebrow: 'What we offer',
    title: 'End-to-end fleet management',
    subtitle: 'Everything you need to monitor, manage, and optimise your fleet in one platform.',
    variant: 'cards',
    items: [
        { icon: '📡', title: 'Real-time Tracking', description: 'Live GPS positions on interactive maps with sub-second refresh.', link: '#', link_label: 'Learn more' },
        { icon: '🔔', title: 'Smart Alerts', description: 'Geo-fence breaches, speeding, and idle-time notifications.', link: '#', link_label: 'Learn more' },
        { icon: '📊', title: 'Analytics & Reports', description: 'Fuel consumption, route efficiency, and driver behaviour reports.', link: '#', link_label: 'Learn more' },
        { icon: '🔒', title: 'Remote Control', description: 'Engine cut-off and lock/unlock from your dashboard or mobile app.', link: '#', link_label: 'Learn more' },
        { icon: '🗺️', title: 'Route Planning', description: 'AI-optimised routes with traffic and road condition awareness.', link: '#', link_label: 'Learn more' },
        { icon: '📱', title: 'Mobile App', description: 'Android and iOS apps for drivers and fleet managers on the go.', link: '#', link_label: 'Learn more' },
    ],
};

export function ServicesSection({
    content = defaultContent,
    identifier,
}: {
    content?: ServicesContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'cards';
    const items = content?.items ?? [];
    const bg = content?.bg ?? null;
    const hasBg = bg?.kind != null;

    return (
        <section
            id={identifier ?? undefined}
            className={cn('relative overflow-hidden py-20 sm:py-24', !hasBg && 'bg-background')}
        >
            {hasBg && <SectionBackground bg={bg} />}

            <div className="relative mx-auto max-w-6xl px-6">
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
                            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {content.subtitle}
                            </p>
                        )}
                    </header>
                )}

                {variant === 'list' && (
                    <ul className="space-y-6 max-w-3xl mx-auto">
                        {items.map((item, i) => (
                            <ServiceListItem key={i} item={item} />
                        ))}
                    </ul>
                )}

                {variant === 'compact' && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item, i) => (
                            <ServiceCompactItem key={i} item={item} />
                        ))}
                    </div>
                )}

                {variant === 'detailed' && (
                    <div className="space-y-16">
                        {items.map((item, i) => (
                            <ServiceDetailItem key={i} item={item} index={i} />
                        ))}
                    </div>
                )}

                {/* Default: cards */}
                {(variant === 'cards' || variant === 'tabs') && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item, i) => (
                            <ServiceCard key={i} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function ServiceCard({ item }: { item: ServiceItem }) {
    return (
        <div className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
            {item.icon && !item.image && (
                <span className="text-3xl">{item.icon}</span>
            )}
            {item.image && (
                <img src={item.image} alt={item.title} className="h-10 w-10 rounded object-cover" />
            )}
            {item.tag && (
                <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {item.tag}
                </span>
            )}
            <h3 className="text-base font-semibold">{item.title}</h3>
            {item.description && (
                <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                    {item.description}
                </p>
            )}
            {item.link && item.link_label && (
                <PlatformLink
                    href={item.link}
                    className="mt-2 text-sm font-medium text-primary hover:underline"
                >
                    {item.link_label} →
                </PlatformLink>
            )}
        </div>
    );
}

function ServiceListItem({ item }: { item: ServiceItem }) {
    return (
        <li className="flex gap-5 rounded-xl border border-border bg-card p-5">
            {item.icon && (
                <span className="mt-0.5 text-2xl shrink-0">{item.icon}</span>
            )}
            <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                )}
                {item.link && item.link_label && (
                    <PlatformLink href={item.link} className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
                        {item.link_label} →
                    </PlatformLink>
                )}
            </div>
        </li>
    );
}

function ServiceCompactItem({ item }: { item: ServiceItem }) {
    return (
        <div className="flex items-start gap-3 rounded-lg bg-muted/50 px-4 py-3">
            {item.icon && <span className="mt-0.5 text-xl shrink-0">{item.icon}</span>}
            <div>
                <p className="text-sm font-semibold">{item.title}</p>
                {item.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                )}
            </div>
        </div>
    );
}

function ServiceDetailItem({ item, index }: { item: ServiceItem; index: number }) {
    const isEven = index % 2 === 0;
    return (
        <div className={cn('flex flex-col gap-8 md:flex-row md:items-center', !isEven && 'md:flex-row-reverse')}>
            <div className="flex-1">
                {item.icon && <span className="text-5xl">{item.icon}</span>}
                {item.image && (
                    <img src={item.image} alt={item.title} className="mt-4 rounded-xl object-cover w-full max-h-64" />
                )}
            </div>
            <div className="flex-1 space-y-3">
                {item.tag && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {item.tag}
                    </span>
                )}
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                {item.description && (
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                )}
                {item.link && item.link_label && (
                    <PlatformLink href={item.link} className="inline-block text-sm font-medium text-primary hover:underline">
                        {item.link_label} →
                    </PlatformLink>
                )}
            </div>
        </div>
    );
}

export const servicesSampleProps: ServicesContent = defaultContent;

export default ServicesSection;
