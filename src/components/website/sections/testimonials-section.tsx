import { SectionBackground } from '../../cms/section-bg';
import { cn } from '../../../lib/utils';
import type { TestimonialsContent, TestimonialItem } from '../types';

const defaultContent: TestimonialsContent = {
    eyebrow: 'What clients say',
    title: 'Trusted by fleet operators nationwide',
    variant: 'cards',
    items: [
        { name: 'Zara Khan', role: 'Fleet Manager', company: 'LogiPak Ltd', rating: 5, quote: 'We reduced fuel costs by 22% in the first three months. The geo-fence alerts alone paid for the subscription.' },
        { name: 'Ali Raza', role: 'Operations Director', company: 'Swift Couriers', rating: 5, quote: 'The dashboard is incredibly intuitive. Our drivers adopted the mobile app with zero training.' },
        { name: 'Sara Ahmed', role: 'Head of Transport', company: 'Punjab Government', rating: 5, quote: 'Real-time visibility transformed how we manage our government fleet. Accountability has never been higher.' },
        { name: 'Usman Tariq', role: 'CEO', company: 'MegaFreight', rating: 4, quote: 'Excellent support team. Any issue is resolved within the hour. A truly enterprise-grade product.' },
        { name: 'Fatima Malik', role: 'IT Manager', company: 'Medex Pharma', rating: 5, quote: 'Integration with our ERP took less than a day thanks to the well-documented REST API.' },
        { name: 'Bilal Hussain', role: 'Fleet Supervisor', company: 'Atlas Transit', rating: 5, quote: 'Route optimisation cut our average delivery time by 18 minutes per run. Remarkable impact.' },
    ],
};

export function TestimonialsSection({
    content = defaultContent,
    identifier,
}: {
    content?: TestimonialsContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'cards';
    const items = content?.items ?? [];
    const bg = content?.bg ?? null;
    const hasBg = bg?.kind != null;

    return (
        <section
            id={identifier ?? undefined}
            className={cn('relative overflow-hidden py-20 sm:py-24', !hasBg && 'bg-muted/40')}
        >
            {hasBg && <SectionBackground bg={bg} />}

            <div className="relative mx-auto max-w-6xl px-6">
                {(content?.eyebrow || content?.title || content?.subtitle) && (
                    <header className="mx-auto mb-14 max-w-2xl text-center">
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
                            <p className="mt-3 text-muted-foreground">{content.subtitle}</p>
                        )}
                    </header>
                )}

                {/* Cards / masonry */}
                {(variant === 'cards' || variant === 'masonry') && (
                    <div className={cn(
                        'grid gap-5',
                        variant === 'cards' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                    )}>
                        {items.map((item, i) => (
                            <TestimonialCard key={i} item={item} />
                        ))}
                    </div>
                )}

                {/* Single quote — first item only */}
                {variant === 'single-quote' && items[0] && (
                    <SingleQuote item={items[0]} />
                )}

                {/* Carousel placeholder (static for now) */}
                {variant === 'carousel' && (
                    <div className="relative overflow-hidden">
                        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
                            {items.map((item, i) => (
                                <div key={i} className="snap-start shrink-0 w-80 sm:w-96">
                                    <TestimonialCard item={item} />
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-center text-xs text-muted-foreground">Scroll to see more →</p>
                    </div>
                )}
            </div>
        </section>
    );
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={cn('h-4 w-4', i < rating ? 'text-amber-400' : 'text-muted')}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function Avatar({ item }: { item: TestimonialItem }) {
    if (item.avatar) {
        return (
            <img
                src={item.avatar}
                alt={item.name}
                className="h-10 w-10 rounded-full object-cover"
            />
        );
    }
    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {item.name.charAt(0)}
        </div>
    );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
    return (
        <figure className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            {item.rating != null && <StarRating rating={item.rating} />}
            <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                "{item.quote}"
            </blockquote>
            <figcaption className="flex items-center gap-3">
                <Avatar item={item} />
                <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    {(item.role || item.company) && (
                        <p className="text-xs text-muted-foreground">
                            {[item.role, item.company].filter(Boolean).join(', ')}
                        </p>
                    )}
                </div>
            </figcaption>
        </figure>
    );
}

function SingleQuote({ item }: { item: TestimonialItem }) {
    return (
        <figure className="mx-auto max-w-2xl text-center">
            <svg aria-hidden className="mx-auto mb-6 h-12 w-12 text-primary/20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            {item.rating != null && (
                <div className="mb-4 flex justify-center">
                    <StarRating rating={item.rating} />
                </div>
            )}
            <blockquote className="text-xl font-medium leading-relaxed text-foreground italic">
                "{item.quote}"
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-2">
                <Avatar item={item} />
                <div className="text-center">
                    <p className="font-semibold">{item.name}</p>
                    {(item.role || item.company) && (
                        <p className="text-sm text-muted-foreground">
                            {[item.role, item.company].filter(Boolean).join(', ')}
                        </p>
                    )}
                </div>
            </figcaption>
        </figure>
    );
}

export const testimonialsSampleProps: TestimonialsContent = defaultContent;

export default TestimonialsSection;
