import { cn } from '../../../lib/utils';

export type TextSectionContent = {
    eyebrow?: string | null;
    title?: string | null;
    alignment?: 'left' | 'center' | null;
    max_width?: 'narrow' | 'medium' | 'wide' | 'full' | null;
    body_html?: string | null;
};

const MAX_WIDTH: Record<string, string> = {
    narrow: 'max-w-2xl',
    medium: 'max-w-3xl',
    wide: 'max-w-5xl',
    full: 'max-w-none',
};

/**
 * Long-form prose block. Renders TipTap (Filament RichEditor) output as
 * sanitised HTML. Use `prose` typography classes for readable paragraphs,
 * headings, lists, blockquotes, code blocks — without per-element styling.
 *
 * SECURITY: body_html comes from authenticated /admin authors. Filament's
 * RichEditor sanitises on save (its allowed tags/attributes are conservative
 * by default). If we ever expose richtext to untrusted submitters, swap to
 * a server-side sanitiser before render.
 */
export function TextSection({
    content,
    identifier,
}: {
    content?: TextSectionContent;
    identifier?: string | null;
}) {
    const alignment = content?.alignment ?? 'left';
    const maxWidth = MAX_WIDTH[content?.max_width ?? 'narrow'];

    return (
        <section
            id={identifier ?? undefined}
            className="bg-background py-16 sm:py-20"
        >
            <div
                className={cn(
                    'mx-auto px-6',
                    maxWidth,
                    alignment === 'center' && 'text-center',
                )}
            >
                {content?.eyebrow && (
                    <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                        {content.eyebrow}
                    </p>
                )}

                {content?.title && (
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                        {content.title}
                    </h2>
                )}

                {content?.body_html && (
                    <div
                        className={cn(
                            'prose max-w-none prose-neutral dark:prose-invert',
                            'prose-headings:font-semibold prose-headings:tracking-tight',
                            'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
                            'prose-strong:text-foreground',
                            alignment === 'center' && 'mx-auto',
                        )}
                        dangerouslySetInnerHTML={{ __html: content.body_html }}
                    />
                )}
            </div>
        </section>
    );
}
