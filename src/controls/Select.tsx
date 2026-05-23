import type { ReactNode, SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
    children: ReactNode;
}

const base =
    'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.5rem_center] pr-9';

export function Select({ error, className = '', children, ...props }: Props) {
    return (
        <>
            <select
                className={`${base} ${error ? 'border-destructive' : 'border-border'} ${className}`}
                aria-invalid={!!error}
                {...props}
            >
                {children}
            </select>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </>
    );
}
