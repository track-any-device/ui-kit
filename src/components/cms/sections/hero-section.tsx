import { SectionBackground } from '../section-bg';
import type { CmsBackground } from '../section-bg';
import { SectionButtons } from '../section-button';
import type { CmsButton } from '../section-button';
import { cn } from '../../../lib/utils';

export type HeroContent = {
    size?: 'full' | 'half' | 'third' | null;
    alignment?: 'left' | 'center' | null;
    eyebrow?: string | null;
    title?: string | null;
    title_highlight?: string | null;
    subtitle?: string | null;
    body?: string | null;
    bg?: CmsBackground | null;
    buttons?: CmsButton[] | null;
};

const SIZE_CLASSES: Record<string, string> = {
    full: 'min-h-[88vh]',
    half: 'min-h-[60vh]',
    third: 'min-h-[40vh]',
};

/**
 * Hero section — the universal page header. Three size variants
 * (full / half / third), five background modes, optional eyebrow,
 * highlighted title fragment, subtitle, body, and a buttons[] CTA row.
 *
 * Light-on-dark vs dark-on-light is decided automatically by the bg
 * mode: image, video, map, and gradient default to light text; color
 * uses the matching foreground token.
 */
export function HeroSection({
    content,
    identifier,
}: {
    content?: HeroContent;
    identifier?: string | null;
}) {
    const size = content?.size ?? 'half';
    const alignment = content?.alignment ?? 'center';
    const bg = content?.bg ?? { kind: 'color', color_token: 'muted' };
    const isDarkSurface = ['image', 'video', 'map', 'gradient'].includes(
        bg.kind ?? '',
    );
    const isMapSurface = bg.kind === 'map';
    const isPrimaryColor =
        bg.kind === 'color' && (bg.color_token ?? 'primary') === 'primary';
    const textColor =
        isDarkSurface || isPrimaryColor ? 'text-white' : 'text-foreground';
    const supportColor =
        isDarkSurface || isPrimaryColor
            ? 'text-white/85'
            : 'text-muted-foreground';
    const eyebrowColor =
        isDarkSurface || isPrimaryColor
            ? 'text-white/70'
            : 'text-muted-foreground';

    const title = content?.title ?? '';
    const highlight = content?.title_highlight?.trim();
    const titleNode =
        highlight && title.includes(highlight)
            ? renderHighlightedTitle(
                  title,
                  highlight,
                  isDarkSurface || isPrimaryColor,
              )
            : title;

    return (
        <section
            id={identifier ?? undefined}
            className={cn(
                'relative isolate flex w-full items-center overflow-hidden',
                SIZE_CLASSES[size] ?? SIZE_CLASSES.half,
            )}
        >
            <SectionBackground bg={bg} />

            <div
                className={cn(
                    'relative mx-auto w-full max-w-5xl px-6 py-16 sm:py-20 lg:py-24',
                    alignment === 'center' ? 'text-center' : 'text-left',
                    // On a live map background the moving tiles can otherwise
                    // wash out the text. A subtle frosted card behind the
                    // copy keeps the title and CTAs readable on any region.
                    isMapSurface &&
                        'rounded-3xl bg-black/35 ring-1 ring-white/10 backdrop-blur-sm',
                )}
            >
                {content?.eyebrow ? (
                    <p
                        className={cn(
                            'mb-4 text-xs font-medium tracking-widest uppercase',
                            eyebrowColor,
                        )}
                    >
                        {content.eyebrow}
                    </p>
                ) : null}

                {title ? (
                    <h1
                        className={cn(
                            'text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl',
                            textColor,
                            isDarkSurface &&
                                '[text-shadow:0_2px_24px_rgba(0,0,0,0.4)]',
                        )}
                    >
                        {titleNode}
                    </h1>
                ) : null}

                {content?.subtitle ? (
                    <p
                        className={cn(
                            'mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl',
                            supportColor,
                            alignment === 'left' && 'mx-0',
                            isDarkSurface &&
                                '[text-shadow:0_1px_12px_rgba(0,0,0,0.5)]',
                        )}
                    >
                        {content.subtitle}
                    </p>
                ) : null}

                {content?.body ? (
                    <p
                        className={cn(
                            'mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pretty',
                            supportColor,
                            alignment === 'left' && 'mx-0',
                        )}
                    >
                        {content.body}
                    </p>
                ) : null}

                {content?.buttons && content.buttons.length > 0 ? (
                    <div className="mt-10">
                        <SectionButtons
                            buttons={content.buttons}
                            align={alignment}
                            size="lg"
                        />
                    </div>
                ) : null}
            </div>
        </section>
    );
}

function renderHighlightedTitle(
    title: string,
    highlight: string,
    onDark: boolean,
) {
    const idx = title.indexOf(highlight);

    if (idx === -1) {
        return title;
    }

    const before = title.slice(0, idx);
    const after = title.slice(idx + highlight.length);

    return (
        <>
            {before}
            <span className={cn(onDark ? 'text-primary' : 'text-primary')}>
                {highlight}
            </span>
            {after}
        </>
    );
}
