import type { FormEvent } from 'react';
import { Button } from '../controls/Button';
import { FormField } from '../controls/FormField';
import { Input } from '../controls/Input';

export interface ForgotPasswordFormData {
    email: string;
}

export interface ForgotPasswordFormErrors {
    email?: string;
}

interface Props {
    data: ForgotPasswordFormData;
    errors: ForgotPasswordFormErrors;
    processing?: boolean;
    status?: string;
    loginUrl?: string;
    onChange: (field: keyof ForgotPasswordFormData, value: string) => void;
    onSubmit: (e: FormEvent) => void;
}

export function ForgotPasswordForm({
    data,
    errors,
    processing = false,
    status,
    loginUrl = '/login',
    onChange,
    onSubmit,
}: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
                Enter your email and we'll send you a password reset link.
            </p>

            {status && <p className="text-sm text-green-600">{status}</p>}

            <FormField label="Email" htmlFor="forgot-email">
                <Input
                    id="forgot-email"
                    type="email"
                    value={data.email}
                    onChange={e => onChange('email', e.target.value)}
                    placeholder="you@example.com"
                    error={errors.email}
                    required
                    autoFocus
                    autoComplete="email"
                />
            </FormField>

            <Button type="submit" loading={processing} fullWidth>
                Send reset link
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                <a href={loginUrl} className="text-primary hover:underline">← Back to sign in</a>
            </p>
        </form>
    );
}
