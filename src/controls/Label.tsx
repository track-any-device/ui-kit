import type { LabelHTMLAttributes, ReactNode } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    children?: ReactNode;
}

export function Label({ required, children, className = '', ...props }: Props) {
    return (
        <label
            className={`block text-sm font-medium text-foreground mb-1 ${className}`}
            {...props}
        >
            {children}
            {required && <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>}
        </label>
    );
}
