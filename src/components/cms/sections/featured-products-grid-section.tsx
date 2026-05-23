'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { SectionButtons } from '../section-button';
import type { CmsButton } from '../section-button';
import { ProductCard } from '../../products/product-card';
import type { ProductCardData } from '../../products/product-card';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';

export type FeaturedProductsGridContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    columns?: 2 | 3 | 4 | null;
    max_items?: number | null;
    show_buttons_on_cards?: boolean | null;
    card_button_label?: string | null;
    buttons?: CmsButton[] | null;
};

export type ProductCard = ProductCardData;

/**
 * Featured products carousel. Pulls from `featured_products` shared prop
 * (DeviceType::featured()). Renders a horizontal scroll-snap row with
 * arrow controls — same `ProductCard` component used everywhere else,
 * so cards stay visually consistent across surfaces.
 */
export function FeaturedProductsGridSection({
    content,
    products,
    identifier,
}: {
    content?: FeaturedProductsGridContent;
    products?: ProductCardData[];
    identifier?: string | null;
}) {
    const max = content?.max_items ?? 8;
    const items = (products ?? []).slice(0, max > 0 ? max : undefined);

    const scrollerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const el = scrollerRef.current;

        if (!el) {
            return;
        }

        const update = () => {
            setCanScrollLeft(el.scrollLeft > 4);
            setCanScrollRight(
                el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
            );
        };
        update();
        el.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            el.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [items.length]);

    function scrollBy(direction: 1 | -1) {
        const el = scrollerRef.current;

        if (!el) {
            return;
        }

        const card = el.querySelector<HTMLElement>('[data-product-card]');
        const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
        el.scrollBy({ left: direction * step, behavior: 'smooth' });
    }

    if (items.length === 0) {
        return null;
    }

    return (
        <section
            id={identifier ?? undefined}
            className="bg-muted/30 py-20 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-6">
                {(content?.eyebrow || content?.title || content?.subtitle) && (
                    <header className="mx-auto mb-10 max-w-2xl text-center">
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

                <div className="relative">
                    {/* Arrow controls */}
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Previous"
                        onClick={() => scrollBy(-1)}
                        disabled={!canScrollLeft}
                        className={cn(
                            'absolute top-1/2 -left-2 z-10 hidden -translate-y-1/2 rounded-full bg-background shadow-md sm:flex',
                            !canScrollLeft && 'opacity-0',
                        )}
                    >
                        <ChevronLeft className="size-5" />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Next"
                        onClick={() => scrollBy(1)}
                        disabled={!canScrollRight}
                        className={cn(
                            'absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 rounded-full bg-background shadow-md sm:flex',
                            !canScrollRight && 'opacity-0',
                        )}
                    >
                        <ChevronRight className="size-5" />
                    </Button>

                    {/* Scroll-snap carousel */}
                    <div
                        ref={scrollerRef}
                        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {items.map((p) => (
                            <div
                                key={p.id}
                                data-product-card
                                className="w-[260px] shrink-0 snap-start sm:w-[280px] lg:w-[300px]"
                            >
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>

                {content?.buttons && content.buttons.length > 0 && (
                    <div className="mt-12">
                        <SectionButtons
                            buttons={content.buttons}
                            align="center"
                            size="lg"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
