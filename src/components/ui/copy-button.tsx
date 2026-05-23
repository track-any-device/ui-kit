'use client';

/**
 * CopyButton — one-tap clipboard copy with visual ack.
 *
 *   <CopyButton value='P901-00042' />
 *
 * Shows a check icon for 1.5s after copying. Falls back gracefully when
 * navigator.clipboard isn't available (older browsers / insecure context).
 */
import { Check, Copy } from 'lucide-react';
import * as React from 'react';

import { Button } from './button';
import { cn } from '../../lib/utils';

type Props = React.ComponentProps<typeof Button> & {
    value: string;
    label?: string;
};

export function CopyButton({
    value,
    label = 'Copy',
    className,
    variant = 'ghost',
    size = 'icon',
    ...rest
}: Props) {
    const [copied, setCopied] = React.useState(false);

    const copy = React.useCallback(async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch {
            // Insecure context / no permission — silently fail; consumer
            // can offer a manual fallback if needed.
        }
    }, [value]);

    return (
        <Button
            type="button"
            variant={variant}
            size={size}
            aria-label={copied ? 'Copied' : label}
            className={cn(className)}
            onClick={copy}
            {...rest}
        >
            {copied ? (
                <Check aria-hidden="true" className="text-success" />
            ) : (
                <Copy aria-hidden="true" />
            )}
        </Button>
    );
}
