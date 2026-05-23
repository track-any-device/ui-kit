import { PlatformLink } from '../../../platform/context';
import { ArrowRight } from 'lucide-react';

import { SectionButtons } from '../section-button';
import type { CmsButton } from '../section-button';
import { Card } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { lucideIcon } from '../../../lib/lucide-icon-map';
import { cn } from '../../../lib/utils';

export type FeaturedSolutionsGridContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    columns?: 2 | 3 | 4 | null;
    max_items?: number | null;
    show_buttons_on_cards?: boolean | null;
    card_button_label?: string | null;
    buttons?: CmsButton[] | null;
};

export type SolutionCard = {
    id: number;
    title: string;
    description: string | null;
    icon_name: string | null;
    gradient_from?: string | null;
    gradient_to?: string | null;
    cta_label?: string | null;
    cta_href?: string | null;
    slug?: string;
};

const COLS: Record<number, string> = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * Featured solutions grid. Pulls from `solutions` shared prop
 * (Solution::featured()). Each card renders icon + title + description
 * with an optional per-card CTA, plus an optional row of section-level
 * buttons below the grid.
 */
export function FeaturedSolutionsGridSection({
    content,
    solutions,
    identifier,
}: {
    content?: FeaturedSolutionsGridContent;
    solutions?: SolutionCard[];
    identifier?: string | null;
}) {
    const columns = content?.columns ?? 3;
    const max = content?.max_items ?? 0;
    const showCta = content?.show_buttons_on_cards ?? true;
    const ctaLabel = content?.card_button_label ?? 'Learn more';

    const items = (solutions ?? []).slice(0, max > 0 ? max : undefined);

    if (items.length === 0) {
        return null;
    }

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
                    {items.map((s) => (
                        <SolutionCardCell
                            key={s.id}
                            solution={s}
                            showCta={showCta}
                            ctaLabel={ctaLabel}
                        />
                    ))}
                </div>

                {content?.buttons && content.buttons.length > 0 && (
                    <div className="mt-12">
                        <SectionButtons
                            buttons={content.buttons}
                            align="center"
                            size="lg"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

function SolutionCardCell({
    solution,
    showCta,
    ctaLabel,
}: {
    solution: SolutionCard;
    showCta: boolean;
    ctaLabel: string;
}) {
    const Icon$ = lucideIcon(solution.icon_name);
    const href =
        solution.cta_href ??
        (solution.slug ? `/solutions/${solution.slug}` : null);

    const card = (
        <Card className="group flex h-full flex-col border-border/60 bg-card p-6 transition-colors hover:border-primary/40">
            {Icon$ && (
                <div
                    className={cn(
                        'mb-4 inline-flex size-12 items-center justify-center rounded-xl text-white',
                        // Use the brand gradient if both stops set; otherwise default to primary.
                        solution.gradient_from && solution.gradient_to
                            ? 'bg-gradient-to-br'
                            : 'bg-primary',
                    )}
                    style={
                        solution.gradient_from && solution.gradient_to
                            ? {
                                  backgroundImage: `linear-gradient(to bottom right, var(--color-${solution.gradient_from}, #2563eb), var(--color-${solution.gradient_to}, #1d4ed8))`,
                              }
                            : undefined
                    }
                >
                    <Icon iconNode={Icon$} className="size-5" />
                </div>
            )}

            <h3 className="text-lg font-semibold text-card-foreground">
                {solution.title}
            </h3>

            {solution.description && (
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {solution.description}
                </p>
            )}

            {showCta && href && (
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2">
                    {solution.cta_label ?? ctaLabel}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
            )}
        </Card>
    );

    if (href) {
        return <PlatformLink href={href}>{card}</PlatformLink>;
    }

    return card;
}
