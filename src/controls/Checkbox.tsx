import type { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: ReactNode;
    error?: string;
}

export function Checkbox({ label, error, className = '', id, ...props }: Props) {
    return (
        <div>
            <label
                htmlFor={id}
                className="flex items-center gap-2.5 cursor-pointer select-none"
            >
                <input
                    id={id}
                    type="checkbox"
                    className={`h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                    aria-invalid={!!error}
                    {...props}
                />
                {label && (
                    <span className="text-sm text-foreground">{label}</span>
                )}
            </label>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </div>
    );
}
