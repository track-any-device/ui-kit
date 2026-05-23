import { Check, ImageOff } from 'lucide-react';

import { SectionButtons } from '../section-button';
import type { CmsButton } from '../section-button';
import { Icon } from '../../ui/icon';
import { lucideIcon } from '../../../lib/lucide-icon-map';
import { cn } from '../../../lib/utils';

export type Banner5050Content = {
    image?: string | null;
    image_position?: 'left' | 'right' | null;
    eyebrow?: string | null;
    title?: string | null;
    body?: string | null;
    bullets?: { icon?: string | null; text: string }[] | null;
    buttons?: CmsButton[] | null;
};

/**
 * 50/50 banner — image on one side, text/bullets/CTAs on the other.
 * Used for "Built for engineers", team intros, product highlights —
 * anywhere we want a visual + supporting copy with equal weight.
 *
 * Image renders as a full-bleed cover photo inside a rounded card —
 * no blurred halo / surface wash, so the image keeps a hard edge.
 */
export function Banner5050Section({
    content,
    identifier,
}: {
    content?: Banner5050Content;
    identifier?: string | null;
}) {
    const imagePos = content?.image_position ?? 'left';

    return (
        <section
            id={identifier ?? undefined}
            className="bg-background py-20 sm:py-24"
        >
            <div className="mx-auto max-w-6xl px-6">
                <div
                    className={cn(
                        'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
                    )}
                >
                    <div
                        className={cn(
                            imagePos === 'right' ? 'lg:order-2' : 'lg:order-1',
                        )}
                    >
                        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted/40">
                            {content?.image ? (
                                <img
                                    src={content.image}
                                    alt={content.title ?? ''}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div
                                    aria-label={content?.title ?? ''}
                                    className="flex h-full w-full items-center justify-center text-muted-foreground"
                                >
                                    <ImageOff className="size-12 opacity-40" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className={cn(
                            imagePos === 'right' ? 'lg:order-1' : 'lg:order-2',
                        )}
                    >
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
                        {content?.body && (
                            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                                {content.body}
                            </p>
                        )}

                        {content?.bullets && content.bullets.length > 0 && (
                            <ul className="mt-6 space-y-3">
                                {content.bullets.map((b, i) => {
                                    const Icon$ = lucideIcon(b.icon);

                                    return (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-sm leading-relaxed"
                                        >
                                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                {Icon$ ? (
                                                    <Icon
                                                        iconNode={Icon$}
                                                        className="size-3"
                                                    />
                                                ) : (
                                                    <Check className="size-3" />
                                                )}
                                            </span>
                                            <span className="text-foreground">
                                                {b.text}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        {content?.buttons && content.buttons.length > 0 && (
                            <div className="mt-8">
                                <SectionButtons
                                    buttons={content.buttons}
                                    align="left"
                                    size="lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
