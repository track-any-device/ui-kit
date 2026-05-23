/**
 * Code — inline + block code wrappers, monospace and tinted surface.
 *
 *   Inline: <Code>P901-00042</Code>
 *   Block:  <CodeBlock>{`const x = 1`}</CodeBlock>
 */
import * as React from 'react';

import { cn } from '../../lib/utils';

export function Code({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <code
            className={cn(
                'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground',
                className,
            )}
            {...props}
        >
            {children}
        </code>
    );
}

export function CodeBlock({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLPreElement>) {
    return (
        <pre
            className={cn(
                'overflow-x-auto rounded-lg border bg-surface-raised p-4 font-mono text-xs leading-relaxed text-foreground',
                className,
            )}
            {...props}
        >
            {children}
        </pre>
    );
}
