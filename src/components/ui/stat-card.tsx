import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';

import { cn } from '../../lib/utils';

type Props = {
    label: string;
    value: number | string;
    delta?: string;
    deltaType?: 'up' | 'down' | 'neutral';
    icon?: LucideIcon;
    description?: string;
    className?: string;
};

const DELTA_STYLES: Record<NonNullable<Props['deltaType']>, string> = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground',
};

const DELTA_ICONS: Record<NonNullable<Props['deltaType']>, LucideIcon> = {
    up: ArrowUpRight,
    down: ArrowDownRight,
    neutral: ArrowRight,
};

export function StatCard({
    label,
    value,
    delta,
    deltaType = 'neutral',
    icon: Icon,
    description,
    className,
}: Props) {
    const DeltaIcon = DELTA_ICONS[deltaType];

    return (
        <div
            className={cn(
                'rounded-xl border bg-card p-5 shadow-sm transition-colors',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {label}
                </p>
                {Icon && (
                    <span
                        className="bg-primary-subtle text-primary flex h-9 w-9 items-center justify-center rounded-lg"
                        aria-hidden="true"
                    >
                        <Icon className="size-4" />
                    </span>
                )}
            </div>
            <p className="font-display mt-3 text-3xl font-semibold leading-none text-foreground">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {(delta || description) && (
                <div className="mt-3 flex items-center gap-2 text-xs">
                    {delta && (
                        <span
                            className={cn(
                                'inline-flex items-center gap-1 font-medium',
                                DELTA_STYLES[deltaType],
                            )}
                        >
                            <DeltaIcon aria-hidden="true" className="size-3.5" />
                            {delta}
                        </span>
                    )}
                    {description && (
                        <span className="text-muted-foreground">{description}</span>
                    )}
                </div>
            )}
        </div>
    );
}
