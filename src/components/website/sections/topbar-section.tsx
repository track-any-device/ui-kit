'use client';

import { useState } from 'react';
import { cn } from '../../../lib/utils';
import type { TopBarContent } from '../types';

const SOCIAL_ICONS: Record<string, string> = {
    twitter: '𝕏',
    facebook: 'f',
    instagram: '◈',
    linkedin: 'in',
    youtube: '▶',
    github: '⌥',
    tiktok: '♪',
};

const defaultContent: TopBarContent = {
    variant: 'announcement',
    message: '🎉 New: Real-time fleet tracking is now available — ',
    cta_label: 'Learn more →',
    cta_link: '/features',
    dismissible: true,
};

export function TopBarSection({
    content = defaultContent,
    identifier,
}: {
    content?: TopBarContent;
    identifier?: string | null;
}) {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) return null;

    const variant = content?.variant ?? 'announcement';
    const hasSocial = (content?.social_links?.length ?? 0) > 0;

    return (
        <div
            id={identifier ?? undefined}
            className={cn(
                'relative w-full px-4 py-2 text-sm',
                variant === 'announcement' && 'bg-primary text-primary-foreground',
                variant === 'promo' && 'bg-amber-500 text-white',
                variant === 'contact' && 'bg-muted text-muted-foreground border-b border-border',
                variant === 'social' && 'bg-card text-foreground border-b border-border',
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                {/* Left: contact info */}
                {variant === 'contact' && (
                    <div className="flex flex-wrap items-center gap-4">
                        {content?.contact_phone && (
                            <a
                                href={`tel:${content.contact_phone}`}
                                className="flex items-center gap-1 hover:text-foreground transition-colors"
                            >
                                <span aria-hidden>📞</span>
                                {content.contact_phone}
                            </a>
                        )}
                        {content?.contact_email && (
                            <a
                                href={`mailto:${content.contact_email}`}
                                className="flex items-center gap-1 hover:text-foreground transition-colors"
                            >
                                <span aria-hidden>✉</span>
                                {content.contact_email}
                            </a>
                        )}
                    </div>
                )}

                {/* Center: announcement / promo message */}
                {(variant === 'announcement' || variant === 'promo') && (
                    <p className="flex-1 text-center font-medium">
                        {content?.message}
                        {content?.cta_link && content?.cta_label && (
                            <a
                                href={content.cta_link}
                                className="ml-1 underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity"
                            >
                                {content.cta_label}
                            </a>
                        )}
                    </p>
                )}

                {/* Social links */}
                {(variant === 'social' || hasSocial) && (
                    <div className="flex items-center gap-2 ml-auto">
                        {content?.social_links?.map((s) => (
                            <a
                                key={s.platform}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.platform}
                                className="flex h-7 w-7 items-center justify-center rounded text-xs font-bold hover:bg-accent transition-colors"
                            >
                                {SOCIAL_ICONS[s.platform.toLowerCase()] ?? s.platform[0].toUpperCase()}
                            </a>
                        ))}
                    </div>
                )}

                {/* Dismiss */}
                {content?.dismissible && (
                    <button
                        type="button"
                        onClick={() => setDismissed(true)}
                        aria-label="Dismiss"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded opacity-70 hover:opacity-100 transition-opacity"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

export const topBarSampleProps: TopBarContent = {
    variant: 'announcement',
    message: '🎉 New: Real-time fleet tracking is now available — ',
    cta_label: 'Learn more →',
    cta_link: '/features',
    dismissible: true,
};

export default TopBarSection;
