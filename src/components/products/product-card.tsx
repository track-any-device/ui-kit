import { PlatformLink } from '../../platform/context';
/**
 * Unified product card.
 *
 * Used everywhere a product is displayed (featured carousel, products grid,
 * filter page). Theme-aware (uses semantic tokens, no raw hex), supports
 * USD/PKR pricing, badge labels, out-of-stock and bulk-quantity states.
 */
import { ArrowRight, Package } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export type Currency = 'USD' | 'PKR';

export type ProductCardData = {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    slug: string;
    price_usd: number | null;
    price_pkr?: number | null;
    min_quantity?: number;
    quantity_multiple?: number;
    bulk_quantity?: number | null;
    quantity?: number;
    badge_label: string | null;
    badge_color: string | null;
};

type Props = {
    product: ProductCardData;
    currency?: Currency;
    /** Where the "Order" / "View Details" CTA navigates to. */
    actionHref?: string;
    actionLabel?: string;
};

export function formatProductPrice(
    p: ProductCardData,
    currency: Currency,
): string | null {
    if (currency === 'PKR') {
        if (p.price_pkr != null) {
            return `₨ ${p.price_pkr.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
        }

        // Fall back to USD if PKR isn't priced — never show an empty cell.
        return p.price_usd != null ? `$ ${p.price_usd.toFixed(2)}` : null;
    }

    return p.price_usd != null ? `$ ${p.price_usd.toFixed(2)}` : null;
}

export function ProductCard({
    product,
    currency = 'PKR',
    actionHref,
    actionLabel = 'View Details',
}: Props) {
    const price = formatProductPrice(product, currency);
    const href = actionHref ?? `/products/${product.slug}`;
    const outOfStock = product.quantity === 0;
    const isBulk =
        product.bulk_quantity != null &&
        product.quantity != null &&
        product.quantity > product.bulk_quantity;

    return (
        <Card className="group flex h-full flex-col overflow-hidden border-border bg-card p-0 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            {/* Image */}
            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-muted">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-background/60 shadow-sm">
                        <Package className="h-10 w-10 text-muted-foreground" />
                    </div>
                )}
                {product.badge_label && (
                    <Badge
                        className="absolute top-3 left-3"
                        style={
                            product.badge_color
                                ? {
                                      backgroundColor: product.badge_color,
                                      color: 'white',
                                  }
                                : undefined
                        }
                    >
                        {product.badge_label}
                    </Badge>
                )}
                {outOfStock && (
                    <span className="absolute top-3 right-3 rounded-full bg-foreground/75 px-2.5 py-1 text-[11px] font-semibold text-background">
                        Out of Stock
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1 text-base font-semibold text-card-foreground">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {product.description}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-3">
                    <div>
                        {price ? (
                            <span className="text-lg font-semibold text-foreground tabular-nums">
                                {price}
                            </span>
                        ) : (
                            <span className="text-sm text-muted-foreground italic">
                                Price on request
                            </span>
                        )}
                        {(product.min_quantity ?? 1) > 1 && (
                            <div className="text-xs text-muted-foreground">
                                Min {product.min_quantity}
                                {(product.quantity_multiple ?? 1) > 1
                                    ? ` · ×${product.quantity_multiple}`
                                    : ''}
                            </div>
                        )}
                    </div>

                    {isBulk ? (
                        <a
                            href="/contact?topic=bulk"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-warning-subtle px-3 py-1.5 text-xs font-semibold text-warning-fg transition hover:bg-warning-subtle/80"
                        >
                            Contact Us
                        </a>
                    ) : (
                        <a
                            href={href}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                        >
                            {actionLabel}
                            <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
}
