import { PlatformLink } from '../platform/context';
import type { ComponentProps } from 'react';
import { cn } from '../lib/utils';

type Props = ComponentProps<typeof PlatformLink>;

export default function TextLink({
    className = '',
    children,
    ...props
}: Props) {
    return (
        <PlatformLink
            className={cn(
                'text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500',
                className,
            )}
            {...props}
        >
            {children}
        </PlatformLink>
    );
}
