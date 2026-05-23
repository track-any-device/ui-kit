import { PlatformLink } from '../../platform/context';
/**
 * DocsShell — reusable docs layout used by every doc series.
 *
 * Matches the TAD101 docs visual language (sidebar with section list,
 * prose article in the main column, prev/next pager at the foot). Each
 * doc series passes its own sections + active id; the shell takes care
 * of the chrome.
 *
 * Existing TAD101 pages keep their dedicated DocsLayout (which is a
 * specialised wrapper around this shell) so changes here can't break
 * those pages until they're migrated.
 */
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Info,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CopyButton } from '../ui/copy-button';
import { cn } from '../../lib/utils';

export type DocsSection<TId extends string = string> = {
    id: TId;
    title: string;
    href: string;
    icon: LucideIcon;
};

type Props<TId extends string> = {
    /** Short brand label rendered in the sidebar header (e.g. "TAD101", "Tenant Manual"). */
    seriesLabel: string;
    /** Optional version pill shown next to the series label. */
    version?: string;
    /** Optional last-updated date string shown under the sidebar nav. */
    lastUpdated?: string;
    /** All sections in this doc series. */
    sections: DocsSection<TId>[];
    /** Which section the current page represents. */
    active: TId;
    /** Page title rendered as the h1 + browser title. */
    pageTitle: string;
    /** Optional eyebrow above the h1 (defaults to seriesLabel). */
    eyebrow?: string;
    children: React.ReactNode;
};

export default function DocsShell<TId extends string>({
    seriesLabel,
    version,
    lastUpdated,
    sections,
    active,
    pageTitle,
    eyebrow,
    children,
}: Props<TId>) {
    return (
        <>
            
            <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-10 lg:gap-10 lg:px-8">
                <aside className="hidden w-64 shrink-0 lg:block">
                    <Card className="sticky top-24 border-border bg-card p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <PlatformLink
                                href="/docs"
                                className="text-xs font-semibold tracking-widest text-muted-foreground uppercase hover:text-foreground"
                            >
                                {seriesLabel}
                            </PlatformLink>
                            {version && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
                                    v{version}
                                </span>
                            )}
                        </div>
                        <nav className="space-y-0.5">
                            {sections.map((s) => {
                                const Icon = s.icon;
                                const isActive = s.id === active;

                                return (
                                    <PlatformLink
                                        key={s.id}
                                        href={s.href}
                                        className={cn(
                                            'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                                            isActive
                                                ? 'bg-primary/10 font-semibold text-primary'
                                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                'size-4 shrink-0',
                                                isActive
                                                    ? 'text-primary'
                                                    : 'text-muted-foreground/70',
                                            )}
                                        />
                                        <span>{s.title}</span>
                                    </PlatformLink>
                                );
                            })}
                        </nav>
                        {lastUpdated && (
                            <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                                Last updated:{' '}
                                <span className="text-foreground">
                                    {lastUpdated}
                                </span>
                            </div>
                        )}
                        <div className="mt-3 border-t border-border pt-3">
                            <PlatformLink
                                href="/docs"
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                ← All documentation
                            </PlatformLink>
                        </div>
                    </Card>
                </aside>

                <main className="min-w-0 flex-1">
                    <header className="mb-8">
                        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                            {eyebrow ?? seriesLabel}
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                            {pageTitle}
                        </h1>
                    </header>

                    <article
                        className={cn(
                            'prose max-w-none prose-neutral dark:prose-invert',
                            'prose-headings:font-semibold prose-headings:tracking-tight',
                            'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
                            'prose-strong:text-foreground',
                            'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:font-medium prose-code:text-foreground prose-code:before:hidden prose-code:after:hidden',
                            'prose-table:my-4 prose-table:text-sm',
                            'prose-th:border-b prose-th:border-border prose-th:bg-muted/40 prose-th:px-3 prose-th:py-2 prose-th:text-left',
                            'prose-td:border-b prose-td:border-border prose-td:px-3 prose-td:py-2',
                        )}
                    >
                        {children}
                    </article>

                    <DocsFooter active={active} sections={sections} />
                </main>
            </div>
        </>
    );
}

function DocsFooter<TId extends string>({
    active,
    sections,
}: {
    active: TId;
    sections: DocsSection<TId>[];
}) {
    const idx = sections.findIndex((s) => s.id === active);
    const prev = idx > 0 ? sections[idx - 1] : null;
    const next =
        idx >= 0 && idx < sections.length - 1 ? sections[idx + 1] : null;

    if (!prev && !next) {
        return null;
    }

    return (
        <nav className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
            <div>
                {prev && (
                    <Button asChild variant="ghost">
                        <PlatformLink href={prev.href}>
                            <ArrowLeft className="size-4" />
                            <span className="flex flex-col items-start">
                                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                                    Previous
                                </span>
                                <span>{prev.title}</span>
                            </span>
                        </PlatformLink>
                    </Button>
                )}
            </div>
            <div>
                {next && (
                    <Button asChild variant="ghost">
                        <PlatformLink href={next.href}>
                            <span className="flex flex-col items-end">
                                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                                    Next
                                </span>
                                <span>{next.title}</span>
                            </span>
                            <ArrowRight className="size-4" />
                        </PlatformLink>
                    </Button>
                )}
            </div>
        </nav>
    );
}

export function CodeBlock({
    language,
    children,
}: {
    language?: string;
    children: string;
}) {
    return (
        <div className="not-prose my-4 overflow-hidden rounded-lg border border-border bg-muted/40">
            {language && (
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5">
                    <span className="font-mono text-xs text-muted-foreground">
                        {language}
                    </span>
                    <CopyButton value={children} />
                </div>
            )}
            <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground">
                <code>{children}</code>
            </pre>
        </div>
    );
}

export function Callout({
    tone = 'info',
    children,
}: {
    tone?: 'info' | 'warning' | 'success';
    children: React.ReactNode;
}) {
    const config = {
        info: {
            border: 'border-info-subtle',
            bg: 'bg-info-subtle/40',
            text: 'text-info-fg',
            icon: Info,
        },
        warning: {
            border: 'border-warning-subtle',
            bg: 'bg-warning-subtle/40',
            text: 'text-warning-fg',
            icon: AlertTriangle,
        },
        success: {
            border: 'border-primary/30',
            bg: 'bg-primary/5',
            text: 'text-primary',
            icon: CheckCircle2,
        },
    }[tone];

    const Icon = config.icon;

    return (
        <div
            className={cn(
                'not-prose my-4 flex gap-3 rounded-lg border px-4 py-3 text-sm',
                config.border,
                config.bg,
            )}
        >
            <Icon className={cn('mt-0.5 size-4 shrink-0', config.text)} />
            <div className="text-foreground">{children}</div>
        </div>
    );
}
