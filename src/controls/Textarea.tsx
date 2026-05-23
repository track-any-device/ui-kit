import type { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const base =
    'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors';

export function Textarea({ error, className = '', rows = 4, ...props }: Props) {
    return (
        <>
            <textarea
                rows={rows}
                className={`${base} ${error ? 'border-destructive' : 'border-border'} ${className}`}
                aria-invalid={!!error}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </>
    );
}
