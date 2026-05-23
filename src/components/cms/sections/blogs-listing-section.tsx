'use client';
import { PlatformLink } from '../../../platform/context';

import { ArrowRight, Calendar, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { BlurredImage } from '../blurred-image';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { cn } from '../../../lib/utils';

import type { BlogPostCard } from './featured-blog-slider-section';

export type BlogsListingContent = {
    title?: string | null;
    subtitle?: string | null;
    items_per_page?: number | null;
    show_tag_filter?: boolean | null;
    show_author_filter?: boolean | null;
};

/**
 * Paginated blog listing with client-side search + tag filter.
 * Reads `posts` shared prop (an array of BlogPostCard).
 */
export function BlogsListingSection({
    content,
    posts,
    identifier,
}: {
    content?: BlogsListingContent;
    posts?: BlogPostCard[];
    identifier?: string | null;
}) {
    const perPage = content?.items_per_page ?? 12;
    const showTagFilter = content?.show_tag_filter ?? true;

    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [visible, setVisible] = useState(perPage);

    const allTags = useMemo(() => {
        const seen = new Map<string, { name: string; color: string | null }>();

        for (const p of posts ?? []) {
            for (const t of p.tags) {
                if (!seen.has(t.slug)) {
                    seen.set(t.slug, { name: t.name, color: t.color });
                }
            }
        }

        return Array.from(seen, ([slug, v]) => ({ slug, ...v }));
    }, [posts]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return (posts ?? []).filter((p) => {
            if (
                q &&
                !`${p.title} ${p.excerpt ?? ''}`.toLowerCase().includes(q)
            ) {
                return false;
            }

            if (activeTag && !p.tags.some((t) => t.slug === activeTag)) {
                return false;
            }

            return true;
        });
    }, [posts, query, activeTag]);

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
                            placeholder="Search articles"
                            className="pl-9"
                        />
                    </div>

                    {showTagFilter && allTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            <TagPill
                                label="All"
                                isActive={activeTag === null}
                                onClick={() => {
                                    setActiveTag(null);
                                    setVisible(perPage);
                                }}
                            />
                            {allTags.map((t) => (
                                <TagPill
                                    key={t.slug}
                                    label={t.name}
                                    color={t.color}
                                    isActive={activeTag === t.slug}
                                    onClick={() => {
                                        setActiveTag(t.slug);
                                        setVisible(perPage);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {shown.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {shown.map((p) => (
                            <PostCardCell key={p.id} post={p} />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center text-sm text-muted-foreground">
                        No articles match your filters.
                    </p>
                )}

                {visible < filtered.length && (
                    <div className="mt-10 text-center">
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

function TagPill({
    label,
    color,
    isActive,
    onClick,
}: {
    label: string;
    color?: string | null;
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
            style={
                isActive && color
                    ? {
                          backgroundColor: color,
                          borderColor: color,
                          color: 'white',
                      }
                    : undefined
            }
        >
            {label}
        </button>
    );
}

function PostCardCell({ post }: { post: BlogPostCard }) {
    return (
        <PlatformLink href={`/blog/${post.slug}`} className="group">
            <Card className="flex h-full flex-col overflow-hidden border-border/60 bg-card p-0 transition-colors hover:border-primary/40">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <BlurredImage
                        src={post.cover_image}
                        alt={post.title}
                        padding="p-0"
                        rounded="md"
                        fit="cover"
                        whiteWash={0}
                        className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>
                <div className="flex flex-1 flex-col p-5">
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 2).map((t) => (
                                <Badge
                                    key={t.slug}
                                    variant="secondary"
                                    className="text-[10px]"
                                    style={
                                        t.color
                                            ? {
                                                  backgroundColor: `${t.color}1a`,
                                                  color: t.color,
                                              }
                                            : undefined
                                    }
                                >
                                    {t.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <h3 className="mt-2 line-clamp-2 text-base font-semibold text-card-foreground group-hover:text-primary">
                        {post.title}
                    </h3>
                    {post.excerpt && (
                        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        {post.published_at && (
                            <span className="inline-flex items-center gap-1">
                                <Calendar className="size-3" />
                                <time dateTime={post.published_at}>
                                    {new Date(
                                        post.published_at,
                                    ).toLocaleDateString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </time>
                            </span>
                        )}
                        <ArrowRight className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </Card>
        </PlatformLink>
    );
}