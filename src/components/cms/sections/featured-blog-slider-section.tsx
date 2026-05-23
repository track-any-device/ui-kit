import { PlatformLink } from '../../../platform/context';
import { ArrowRight, Calendar } from 'lucide-react';

import { BlurredImage } from '../blurred-image';
import { SectionButtons } from '../section-button';
import type { CmsButton } from '../section-button';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

export type FeaturedBlogSliderContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    featured_blog_slug?: string | null;
    list_count?: number | null;
    buttons?: CmsButton[] | null;
};

export type BlogPostCard = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image: string | null;
    published_at: string | null;
    author: { name: string } | null;
    tags: { name: string; slug: string; color: string | null }[];
};

/**
 * Featured blog slider — large hero post on the left + vertical
 * scroll-snap list of recent posts on the right. The "featured" post
 * is content.featured_blog_slug if set, otherwise the newest published
 * post; the list contains up to `list_count` newer-first remaining posts.
 */
export function FeaturedBlogSliderSection({
    content,
    posts,
    identifier,
}: {
    content?: FeaturedBlogSliderContent;
    posts?: BlogPostCard[];
    identifier?: string | null;
}) {
    const listCount = content?.list_count ?? 5;
    const pool = posts ?? [];

    if (pool.length === 0) {
        return null;
    }

    const explicit = content?.featured_blog_slug
        ? pool.find((p) => p.slug === content.featured_blog_slug)
        : null;
    const featured = explicit ?? pool[0];
    const list = pool.filter((p) => p.id !== featured.id).slice(0, listCount);

    return (
        <section
            id={identifier ?? undefined}
            className="bg-background py-20 sm:py-24"
        >
            <div className="mx-auto max-w-6xl px-6">
                {(content?.eyebrow || content?.title || content?.subtitle) && (
                    <header className="mb-10 max-w-2xl">
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

                <div className="grid gap-6 lg:grid-cols-12">
                    <FeaturedPost post={featured} />
                    <PostList posts={list} />
                </div>

                {content?.buttons && content.buttons.length > 0 && (
                    <div className="mt-10">
                        <SectionButtons
                            buttons={content.buttons}
                            align="left"
                            size="md"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

function FeaturedPost({ post }: { post: BlogPostCard }) {
    return (
        <PlatformLink href={`/blog/${post.slug}`} className="group block lg:col-span-7">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-colors hover:border-primary/40">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <BlurredImage
                        src={post.cover_image}
                        alt={post.title}
                        padding="p-0"
                        rounded="md"
                        fit="cover"
                        whiteWash={0}
                        className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <TagsRow tags={post.tags} />
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance text-card-foreground sm:text-3xl">
                        {post.title}
                    </h3>
                    {post.excerpt && (
                        <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-pretty text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}
                    <PostMeta post={post} className="mt-5" />
                </div>
            </article>
        </PlatformLink>
    );
}

function PostList({ posts }: { posts: BlogPostCard[] }) {
    if (posts.length === 0) {
        return null;
    }

    return (
        <div
            className={cn(
                'lg:col-span-5',
                // Vertical scroll-snap on tall screens; auto-height otherwise.
                'lg:max-h-[640px] lg:snap-y lg:snap-mandatory lg:overflow-y-auto',
                'lg:pr-2 lg:[scrollbar-width:thin]',
            )}
        >
            <ul className="flex flex-col gap-3">
                {posts.map((p) => (
                    <li key={p.id} className="lg:snap-start">
                        <a
                            href={`/blog/${p.slug}`}
                            className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/40"
                        >
                            <div className="size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                                <BlurredImage
                                    src={p.cover_image}
                                    alt=""
                                    padding="p-0"
                                    rounded="md"
                                    fit="cover"
                                    whiteWash={0}
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col">
                                <TagsRow tags={p.tags.slice(0, 1)} />
                                <h4 className="mt-1 line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary">
                                    {p.title}
                                </h4>
                                {p.published_at && (
                                    <time
                                        dateTime={p.published_at}
                                        className="mt-1 text-xs text-muted-foreground"
                                    >
                                        {formatDate(p.published_at)}
                                    </time>
                                )}
                            </div>
                            <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TagsRow({ tags }: { tags: BlogPostCard['tags'] }) {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
                <Badge
                    key={t.slug}
                    variant="secondary"
                    className="text-[10px] font-medium"
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
    );
}

function PostMeta({
    post,
    className,
}: {
    post: BlogPostCard;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex items-center gap-3 text-xs text-muted-foreground',
                className,
            )}
        >
            {post.author && <span>{post.author.name}</span>}
            {post.author && post.published_at && <span>·</span>}
            {post.published_at && (
                <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3" />
                    <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                    </time>
                </span>
            )}
        </div>
    );
}

function formatDate(iso: string): string {
    try {
        return new Date(iso).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
}
