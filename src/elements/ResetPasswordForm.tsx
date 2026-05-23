import type { FormEvent } from 'react';
import { Button } from '../controls/Button';
import { FormField } from '../controls/FormField';
import { Input } from '../controls/Input';
import { PasswordInput } from '../controls/PasswordInput';

export interface ResetPasswordFormData {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ResetPasswordFormErrors {
    email?: string;
    password?: string;
    password_confirmation?: string;
}

interface Props {
    data: ResetPasswordFormData;
    errors: ResetPasswordFormErrors;
    processing?: boolean;
    onChange: (field: keyof ResetPasswordFormData, value: string) => void;
    onSubmit: (e: FormEvent) => void;
}

export function ResetPasswordForm({ data, errors, processing = false, onChange, onSubmit }: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <FormField label="Email" htmlFor="reset-email">
                <Input
                    id="reset-email"
                    type="email"
                    value={data.email}
                    readOnly
                    tabIndex={-1}
                    error={errors.email}
                    className="bg-muted text-muted-foreground"
                />
            </FormField>

            <FormField label="New password" htmlFor="reset-password">
                <PasswordInput
                    id="reset-password"
                    value={data.password}
                    onChange={e => onChange('password', e.target.value)}
                    placeholder="••••••••"
                    error={errors.password}
                    required
                    autoFocus
                    autoComplete="new-password"
                />
            </FormField>

            <FormField label="Confirm new password" htmlFor="reset-confirm">
                <PasswordInput
                    id="reset-confirm"
                    value={data.password_confirmation}
                    onChange={e => onChange('password_confirmation', e.target.value)}
                    placeholder="••••••••"
                    error={errors.password_confirmation}
                    required
                    autoComplete="new-password"
                />
            </FormField>

            <Button type="submit" loading={processing} fullWidth>
                Reset password
            </Button>
        </form>
    );
}
