import * as React from 'react';
import { cn } from '../../lib/utils';

export interface UsageMeterItem {
    label: string;
    used: number;
    limit: number;
    unit?: string;
}

interface UsageMeterProps extends UsageMeterItem {
    className?: string;
    /** Show used/limit as "used / limit" (spaced) vs "used/limit" (compact) */
    compact?: boolean;
}

export function UsageMeter({ label, used, limit, unit = '', compact = false, className }: UsageMeterProps) {
    const pct = Math.min((used / limit) * 100, 100);
    const barColor = pct >= 95 ? 'bg-destructive' : pct >= 80 ? 'bg-amber-500' : 'bg-primary';
    const suffix = unit ? ` ${unit}` : '';

    return (
        <div className={cn('space-y-1', className)}>
            <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium tabular-nums">
                    {compact ? `${used}/${limit}${suffix}` : `${used} / ${limit}${suffix}`}
                </span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={cn('h-full rounded-full transition-all', barColor)} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
