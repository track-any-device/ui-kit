/**
 * Timeline — vertical event timeline for activity logs / status history.
 *
 * <Timeline>
 *   <TimelineItem icon={CheckCircle} datetime='2026-05-18T10:24Z' title='Approved'>
 *     by admin@example.com
 *   </TimelineItem>
 * </Timeline>
 */
import type { LucideIcon } from 'lucide-react';
import { formatLocalDateTime } from '../../lib/datetime';
import { Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '../../lib/utils';

export function Timeline({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <ol
            className={cn(
                'relative space-y-6 border-l border-border pl-6',
                className,
            )}
        >
            {children}
        </ol>
    );
}

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info';

const VARIANT_STYLES: Record<Variant, string> = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-success-subtle text-success',
    warning: 'bg-warning-subtle text-warning',
    danger: 'bg-danger-subtle text-destructive',
    info: 'bg-info-subtle text-info',
};

type ItemProps = {
    icon?: LucideIcon;
    title: React.ReactNode;
    datetime?: string;
    variant?: Variant;
    children?: React.ReactNode;
};

export function TimelineItem({
    icon: Icon = Circle,
    title,
    datetime,
    variant = 'default',
    children,
}: ItemProps) {
    return (
        <li className="relative">
            <span
                aria-hidden="true"
                className={cn(
                    'absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background',
                    VARIANT_STYLES[variant],
                )}
            >
                <Icon className="size-3.5" />
            </span>
            <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium text-foreground">{title}</p>
                {datetime && (
                    <time
                        dateTime={datetime}
                        className="text-xs text-muted-foreground"
                    >
                        {formatLocalDateTime(datetime)}
                    </time>
                )}
            </div>
            {children && (
                <div className="mt-1 text-sm text-muted-foreground">
                    {children}
                </div>
            )}
        </li>
    );
}
