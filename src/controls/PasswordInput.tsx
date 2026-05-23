'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    error?: string;
}

const base =
    'w-full rounded-lg border bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors';

export function PasswordInput({ error, className = '', ...props }: Props) {
    const [visible, setVisible] = useState(false);
    const Icon = visible ? EyeOff : Eye;

    return (
        <>
            <div className="relative">
                <input
                    type={visible ? 'text' : 'password'}
                    className={`${base} ${error ? 'border-destructive' : 'border-border'} ${className}`}
                    aria-invalid={!!error}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setVisible(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                >
                    <Icon className="h-4 w-4" />
                </button>
            </div>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </>
    );
}
