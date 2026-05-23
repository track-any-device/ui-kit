import type { ReactNode } from 'react';
import { Label } from './Label';

interface Props {
    label: string;
    htmlFor?: string;
    hint?: string;
    required?: boolean;
    children: ReactNode;
}

export function FormField({ label, htmlFor, hint, required, children }: Props) {
    return (
        <div>
            <Label htmlFor={htmlFor} required={required}>{label}</Label>
            {children}
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
    );
}
