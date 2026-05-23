import type { BlockquoteHTMLAttributes, ReactNode } from 'react';

interface Props extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
    children: ReactNode;
    cite?: string;
}

export function Blockquote({ children, cite, className = '', ...props }: Props) {
    return (
        <figure className={className}>
            <blockquote
                cite={cite}
                className="border-l-4 border-primary pl-4 italic text-muted-foreground"
                {...props}
            >
                {children}
            </blockquote>
            {cite && (
                <figcaption className="mt-2 pl-4 text-xs text-muted-foreground/70">
                    — <cite>{cite}</cite>
                </figcaption>
            )}
        </figure>
    );
}
