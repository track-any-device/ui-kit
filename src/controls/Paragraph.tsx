import type { HTMLAttributes, ReactNode } from 'react';

const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
} as const;

const variants = {
    default: 'text-foreground',
    muted:   'text-muted-foreground',
    lead:    'text-muted-foreground text-xl',
    error:   'text-destructive',
    success: 'text-green-600',
} as const;

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    size?: keyof typeof sizes;
    variant?: keyof typeof variants;
    children: ReactNode;
}

export function Paragraph({
    size = 'md',
    variant = 'default',
    className = '',
    children,
    ...props
}: Props) {
    return (
        <p
            className={`leading-relaxed ${sizes[size]} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </p>
    );
}
