import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import * as React from 'react';

import { cn } from '../../lib/utils';
import { Button } from './button';

type Props = {
    icon?: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    className?: string;
    children?: React.ReactNode;
};

export function EmptyState({
    icon: Icon = Inbox,
    title,
    description,
    actionLabel,
    actionHref,
    className,
    children,
}: Props) {
    return (
        <div
            role="status"
            className={cn(
                'flex flex-col items-center justify-center rounded-lg border border-dashed bg-surface px-6 py-12 text-center',
                className,
            )}
        >
            <div className="bg-primary-subtle text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-6" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
                {title}
            </h3>
            {description && (
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    {description}
                </p>
            )}
            {children && <div className="mt-6">{children}</div>}
            {!children && actionLabel && actionHref && (
                <Button asChild className="mt-6">
                    <a href={actionHref}>{actionLabel}</a>
                </Button>
            )}
        </div>
    );
}
