import type { HTMLAttributes, ReactNode } from 'react';

type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const sizes: Record<Level, string> = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-bold tracking-tight',
    h3: 'text-2xl font-semibold tracking-tight',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-semibold',
    h6: 'text-base font-semibold',
};

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    as?: Level;
    children: ReactNode;
}

export function Heading({ as: Tag = 'h2', className = '', children, ...props }: Props) {
    return (
        <Tag
            className={`text-foreground ${sizes[Tag]} ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
}
