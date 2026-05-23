import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const base =
    'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors';

export function Input({ error, className = '', ...props }: Props) {
    return (
        <>
            <input
                className={`${base} ${error ? 'border-destructive' : 'border-border'} ${className}`}
                aria-invalid={!!error}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </>
    );
}
