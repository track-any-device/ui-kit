'use client';
import { PlatformLink } from '../../../platform/context';

import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Card } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { lucideIcon } from '../../../lib/lucide-icon-map';
import { cn } from '../../../lib/utils';

import type { SolutionCard } from './featured-solutions-grid-section';

export type SolutionsWithFilterContent = {
    title?: string | null;
    subtitle?: string | null;
    items_per_page?: number | null;
    filters?: {
        industries?: { label: string; value: string }[];
        categories?: { label: string; value: string }[];
    } | null;
};

/**
 * Solutions list with client-side filters. Reads `solutions` shared
 * prop. Provides a search input and optional pill-style facet filters
 * (industries / categories). Pagination is "Load more" on top of the
 * filtered list.
 */
export function SolutionsWithFilterSection({
    content,
    solutions,
    identifier,
}: {
    content?: SolutionsWithFilterContent;
    solutions?: SolutionCard[];
    identifier?: string | null;
}) {
    const perPage = content?.items_per_page ?? 12;

    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [visible, setVisible] = useState(perPage);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return (solutions ?? []).filter((s) => {
            if (
                q &&
                !`${s.title} ${s.description ?? ''}`.toLowerCase().includes(q)
            ) {
                return false;
            }

            // Filter facet stored on solution's metadata (best-effort match).
            // For now, simple title-contains match against the facet value
            // so seeded content "just works" without a schema change.
            if (
                activeFilter &&
                !s.title.toLowerCase().includes(activeFilter.toLowerCase())
            ) {
                return false;
            }

            return true;
        });
    }, [solutions, query, activeFilter]);

    const shown = filtered.slice(0, visible);

    return (
        <section
            id={identifier ?? undefined}
            className="bg-background py-20 sm:py-24"
        >
            <div className="mx-auto max-w-6xl px-6">
                {(content?.title || content?.subtitle) && (
                    <header className="mb-10 max-w-2xl">
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

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setVisible(perPage);
                            }}
                            placeholder="Search solutions"
                            className="pl-9"
                        />
                    </div>

                    {content?.filters?.industries &&
                        content.filters.industries.length > 0 && (
                            <FilterPills
                                options={content.filters.industries}
                                active={activeFilter}
                                onChange={(v) => {
                                    setActiveFilter(v);
                                    setVisible(perPage);
                                }}
                            />
                        )}
                </div>

                {shown.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {shown.map((s) => (
                            <SolutionCardCell key={s.id} solution={s} />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center text-sm text-muted-foreground">
                        No solutions match your filters.
                    </p>
                )}

                {visible < filtered.length && (
                    <div className="mt-8 text-center">
                        <button
                            type="button"
                            onClick={() => setVisible((v) => v + perPage)}
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Load {Math.min(perPage, filtered.length - visible)}{' '}
                            more
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

function FilterPills({
    options,
    active,
    onChange,
}: {
    options: { label: string; value: string }[];
    active: string | null;
    onChange: (v: string | null) => void;
}) {
    return (
        <div className="flex flex-wrap gap-1.5">
            <FilterPillButton
                label="All"
                isActive={active === null}
                onClick={() => onChange(null)}
            />
            {options.map((o) => (
                <FilterPillButton
                    key={o.value}
                    label={o.label}
                    isActive={active === o.value}
                    onClick={() => onChange(o.value)}
                />
            ))}
        </div>
    );
}

function FilterPillButton({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
        >
            {label}
        </button>
    );
}

function SolutionCardCell({ solution }: { solution: SolutionCard }) {
    const Icon$ = lucideIcon(solution.icon_name);
    const href =
        solution.cta_href ??
        (solution.slug ? `/solutions/${solution.slug}` : null);

    const card = (
        <Card className="group flex h-full flex-col border-border/60 bg-card p-6 transition-colors hover:border-primary/40">
            {Icon$ && (
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon iconNode={Icon$} className="size-5" />
                </div>
            )}
            <h3 className="text-base font-semibold text-card-foreground">
                {solution.title}
            </h3>
            {solution.description && (
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {solution.description}
                </p>
            )}
            {href && (
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2">
                    Explore
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
            )}
        </Card>
    );

    return href ? <PlatformLink href={href}>{card}</PlatformLink> : card;
}