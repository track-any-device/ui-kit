import type { FormEvent } from 'react';
import { Button } from '../controls/Button';
import { FormField } from '../controls/FormField';
import { PasswordInput } from '../controls/PasswordInput';

export interface ConfirmPasswordFormErrors {
    password?: string;
}

interface Props {
    password: string;
    errors: ConfirmPasswordFormErrors;
    processing?: boolean;
    onChange: (value: string) => void;
    onSubmit: (e: FormEvent) => void;
}

export function ConfirmPasswordForm({ password, errors, processing = false, onChange, onSubmit }: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
                This is a secure area of the application. Please confirm your password before continuing.
            </p>

            <FormField label="Password" htmlFor="confirm-password">
                <PasswordInput
                    id="confirm-password"
                    value={password}
                    onChange={e => onChange(e.target.value)}
                    placeholder="••••••••"
                    error={errors.password}
                    required
                    autoFocus
                    autoComplete="current-password"
                />
            </FormField>

            <Button type="submit" loading={processing} fullWidth>
                Confirm password
            </Button>
        </form>
    );
}
