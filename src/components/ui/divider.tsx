/**
 * Divider — horizontal rule with optional centred label.
 *
 *   <Divider />
 *   <Divider>OR</Divider>
 */
import * as React from 'react';

import { cn } from '../../lib/utils';

type Props = {
    children?: React.ReactNode;
    className?: string;
    decorative?: boolean;
};

export function Divider({ children, className, decorative = true }: Props) {
    if (!children) {
        return (
            <hr
                role={decorative ? 'presentation' : 'separator'}
                aria-hidden={decorative ? 'true' : undefined}
                className={cn('my-4 border-border', className)}
            />
        );
    }

    return (
        <div
            role={decorative ? 'presentation' : 'separator'}
            aria-hidden={decorative ? 'true' : undefined}
            className={cn('my-4 flex items-center gap-3', className)}
        >
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {children}
            </span>
            <span className="h-px flex-1 bg-border" />
        </div>
    );
}
