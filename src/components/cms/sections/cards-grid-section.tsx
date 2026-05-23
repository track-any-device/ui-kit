import { PlatformLink } from '../../../platform/context';
import { ArrowRight } from 'lucide-react';

import { BlurredImage } from '../blurred-image';
import { Card } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { lucideIcon } from '../../../lib/lucide-icon-map';
import { cn } from '../../../lib/utils';

export type CardItem = {
    icon?: string | null;
    image?: string | null;
    title: string;
    description?: string | null;
    value?: string | null;
    link?: string | null;
    link_label?: string | null;
};

export type CardsGridContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    columns?: 2 | 3 | 4 | null;
    card_style?: 'icon' | 'image' | 'stat' | 'minimal' | null;
    items?: CardItem[] | null;
};

const COLS: Record<number, string> = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * Generic card grid — the workhorse replacement for the old features /
 * stats / store_benefits_strip section types. Four card styles:
 *
 *   - icon    : muted-tinted icon tile + title + description
 *   - image   : product/asset photo via BlurredImage on top + title + body
 *   - stat    : huge metric value + label + small icon (Lighthouse vibe)
 *   - minimal : compact text-only card for high-density grids
 */
export function CardsGridSection({
    content,
    identifier,
}: {
    content?: CardsGridContent;
    identifier?: string | null;
}) {
    const columns = content?.columns ?? 3;
    const style = content?.card_style ?? 'icon';
    const items = content?.items ?? [];

    return (
        <section
            id={identifier ?? undefined}
            className="bg-background py-20 sm:py-24"
        >
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
                            <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                                {content.subtitle}
                            </p>
                        )}
                    </header>
                )}

                <div
                    className={cn(
                        'grid grid-cols-1 gap-4',
                        COLS[columns] ?? COLS[3],
                    )}
                >
                    {items.map((item, i) => (
                        <CardCell key={i} item={item} style={style} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CardCell({
    item,
    style,
}: {
    item: CardItem;
    style: 'icon' | 'image' | 'stat' | 'minimal';
}) {
    const Icon$ = lucideIcon(item.icon);

    const inner = (
        <>
            {style === 'icon' && Icon$ && (
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon iconNode={Icon$} className="size-5" />
                </div>
            )}

            {style === 'image' && (
                <div className="-mx-2 -mt-2 mb-5 aspect-[4/3]">
                    <BlurredImage
                        src={item.image}
                        alt={item.title}
                        padding="p-4"
                        rounded="lg"
                        className="h-full w-full"
                    />
                </div>
            )}

            {style === 'stat' && (
                <div className="mb-2 flex items-center gap-2">
                    {Icon$ && (
                        <Icon
                            iconNode={Icon$}
                            className="size-4 text-muted-foreground"
                        />
                    )}
                    {item.value && (
                        <span className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                            {item.value}
                        </span>
                    )}
                </div>
            )}

            <h3
                className={cn(
                    'text-card-foreground',
                    style === 'stat'
                        ? 'text-sm font-medium text-muted-foreground'
                        : 'text-base font-semibold',
                )}
            >
                {item.title}
            </h3>

            {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                </p>
            )}

            {item.link && item.link_label && (
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {item.link_label}
                    <ArrowRight className="size-3.5" />
                </span>
            )}
        </>
    );

    const isMinimal = style === 'minimal';
    const cardClasses = cn(
        'h-full transition-colors',
        isMinimal
            ? 'border-none bg-transparent p-4 shadow-none'
            : 'border-border/60 bg-card p-6 hover:border-border',
        item.link && 'cursor-pointer hover:border-primary/40',
    );

    if (item.link) {
        return (
            <PlatformLink href={item.link}>
                <Card className={cardClasses}>{inner}</Card>
            </PlatformLink>
        );
    }

    return <Card className={cardClasses}>{inner}</Card>;
}
