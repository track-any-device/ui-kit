import type { FormEvent } from 'react';
import { Button } from '../controls/Button';
import { Checkbox } from '../controls/Checkbox';
import { FormField } from '../controls/FormField';
import { Input } from '../controls/Input';
import { PasswordInput } from '../controls/PasswordInput';

export interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
}

interface Props {
    data: LoginFormData;
    errors: LoginFormErrors;
    processing?: boolean;
    status?: string;
    canResetPassword?: boolean;
    canRegister?: boolean;
    forgotPasswordUrl?: string;
    registerUrl?: string;
    onChange: (field: keyof LoginFormData, value: string | boolean) => void;
    onSubmit: (e: FormEvent) => void;
}

export function LoginForm({
    data,
    errors,
    processing = false,
    status,
    canResetPassword = true,
    canRegister = true,
    forgotPasswordUrl = '/forgot-password',
    registerUrl = '/register',
    onChange,
    onSubmit,
}: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {status && <p className="text-sm text-green-600">{status}</p>}

            <FormField label="Email" htmlFor="login-email">
                <Input
                    id="login-email"
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

            <FormField label="Password" htmlFor="login-password">
                <PasswordInput
                    id="login-password"
                    value={data.password}
                    onChange={e => onChange('password', e.target.value)}
                    placeholder="••••••••"
                    error={errors.password}
                    required
                    autoComplete="current-password"
                />
            </FormField>

            <div className="flex items-center justify-between pt-1">
                <Checkbox
                    id="login-remember"
                    label="Remember me"
                    checked={data.remember}
                    onChange={(e: { target: HTMLInputElement }) => onChange('remember', e.target.checked)}
                />
                {canResetPassword && (
                    <a href={forgotPasswordUrl} className="text-sm text-primary hover:underline">
                        Forgot password?
                    </a>
                )}
            </div>

            <Button type="submit" loading={processing} fullWidth>
                Sign in
            </Button>

            {canRegister && (
                <p className="text-center text-sm text-muted-foreground">
                    No account?{' '}
                    <a href={registerUrl} className="text-primary hover:underline">Register</a>
                </p>
            )}
        </form>
    );
}
