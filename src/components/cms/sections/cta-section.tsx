import { SectionBackground } from '../section-bg';
import type { CmsBackground } from '../section-bg';
import { SectionButtons } from '../section-button';
import type { CmsButton } from '../section-button';
import { cn } from '../../../lib/utils';

export type CtaContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    alignment?: 'left' | 'center' | null;
    bg?: CmsBackground | null;
    buttons?: CmsButton[] | null;
};

/**
 * Call-to-action section. Composed of: background (any bg{} mode except
 * map), eyebrow, title, subtitle, and a buttons[] row. Common patterns:
 *   - tinted accent panel ("Bulk orders" / "Custom solutions")
 *   - bold primary-coloured rail at the end of a page
 *   - dark gradient closing band on the home page
 */
export function CtaSection({
    content,
    identifier,
}: {
    content?: CtaContent;
    identifier?: string | null;
}) {
    const alignment = content?.alignment ?? 'center';
    const bg = content?.bg ?? { kind: 'color', color_token: 'accent' };
    const isDarkSurface = ['image', 'video', 'gradient'].includes(
        bg.kind ?? '',
    );
    const isPrimaryColor =
        bg.kind === 'color' && (bg.color_token ?? '') === 'primary';
    const onDark = isDarkSurface || isPrimaryColor;
    const textColor = onDark ? 'text-white' : 'text-foreground';
    const supportColor = onDark ? 'text-white/80' : 'text-muted-foreground';
    const eyebrowColor = onDark ? 'text-white/70' : 'text-muted-foreground';

    return (
        <section
            id={identifier ?? undefined}
            className="relative isolate overflow-hidden"
        >
            <SectionBackground bg={bg} />

            <div
                className={cn(
                    'relative mx-auto max-w-4xl px-6 py-16 sm:py-20',
                    alignment === 'center' ? 'text-center' : 'text-left',
                )}
            >
                {content?.eyebrow && (
                    <p
                        className={cn(
                            'mb-3 text-xs font-medium tracking-widest uppercase',
                            eyebrowColor,
                        )}
                    >
                        {content.eyebrow}
                    </p>
                )}

                {content?.title && (
                    <h2
                        className={cn(
                            'text-3xl font-semibold tracking-tight text-balance sm:text-4xl',
                            textColor,
                        )}
                    >
                        {content.title}
                    </h2>
                )}

                {content?.subtitle && (
                    <p
                        className={cn(
                            'mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg',
                            supportColor,
                            alignment === 'left' && 'mx-0',
                        )}
                    >
                        {content.subtitle}
                    </p>
                )}

                {content?.buttons && content.buttons.length > 0 && (
                    <div className="mt-8">
                        <SectionButtons
                            buttons={content.buttons}
                            align={alignment}
                            size="lg"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
