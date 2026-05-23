import { ImageOff } from 'lucide-react';

import { cn } from '../../lib/utils';

type Props = {
    src: string | null | undefined;
    alt: string;
    className?: string;
    /** Inner padding around the sharp image. Larger value = bigger blur halo. */
    padding?: string;
    /** Object-fit for the sharp image. */
    fit?: 'contain' | 'cover';
    /** Rounding on the wrapper. */
    rounded?: 'md' | 'lg' | 'xl' | '2xl' | 'full';
    /** Blur radius on the background. */
    blur?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    /** Opacity of the white wash overlaying the blur (0–100). */
    whiteWash?: number;
};

/**
 * Image with a blurred copy of itself behind it, washed toward the
 * surface color (white in light mode, --background in dark mode) so the
 * image edge fades seamlessly into the page background regardless of the
 * original asset's edges. Use for: partner logos, customer avatars,
 * device product photos, blog cover images.
 *
 * Inspired by the Launch UI / Apple TV poster glow technique.
 */
export function BlurredImage({
    src,
    alt,
    className,
    padding = 'p-6',
    fit = 'contain',
    rounded = 'xl',
    blur = '2xl',
    whiteWash = 70,
}: Props) {
    const roundedCls = {
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
    }[rounded];

    const blurCls = {
        md: 'blur-md',
        lg: 'blur-lg',
        xl: 'blur-xl',
        '2xl': 'blur-2xl',
        '3xl': 'blur-3xl',
    }[blur];

    if (!src) {
        return (
            <div
                className={cn(
                    'inline-flex aspect-square items-center justify-center bg-muted text-muted-foreground',
                    roundedCls,
                    padding,
                    className,
                )}
                aria-label={alt}
            >
                <ImageOff className="size-1/2 opacity-40" />
            </div>
        );
    }

    return (
        <div
            className={cn(
                'relative inline-flex items-center justify-center overflow-hidden',
                roundedCls,
                padding,
                className,
            )}
        >
            {/* Layer 1: scaled, blurred copy of the image acts as ambient halo */}
            <div
                aria-hidden
                className={cn('absolute inset-0 scale-125', blurCls)}
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            {/* Layer 2: surface-coloured wash blends the blur edge to white
                (light) / --background (dark) so the image dissolves into the
                page rather than terminating with a hard rectangle */}
            <div
                aria-hidden
                className="absolute inset-0 bg-background"
                style={{ opacity: whiteWash / 100 }}
            />
            {/* Layer 3: the sharp source image */}
            <img
                src={src}
                alt={alt}
                className={cn(
                    'relative h-full w-full',
                    fit === 'cover' ? 'object-cover' : 'object-contain',
                )}
                loading="lazy"
            />
        </div>
    );
}
