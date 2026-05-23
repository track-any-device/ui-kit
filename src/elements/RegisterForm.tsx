import type { FormEvent, ReactNode } from 'react';
import { Button } from '../controls/Button';
import { FormField } from '../controls/FormField';
import { Input } from '../controls/Input';
import { PasswordInput } from '../controls/PasswordInput';
import { Select } from '../controls/Select';

export interface PhoneCountry {
    id: number;
    iso_code: string;
    name: string;
    country_code: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    mobile_country_iso?: string;
}

export interface RegisterFormErrors {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    phone?: string;
}

interface Props {
    data: RegisterFormData;
    errors: RegisterFormErrors;
    processing?: boolean;
    loginUrl?: string;
    phoneCountries?: PhoneCountry[];
    banner?: ReactNode;
    onChange: (field: keyof RegisterFormData, value: string) => void;
    onSubmit: (e: FormEvent) => void;
}

export function RegisterForm({
    data,
    errors,
    processing = false,
    loginUrl = '/login',
    phoneCountries,
    banner,
    onChange,
    onSubmit,
}: Props) {
    const hasPhone = phoneCountries && phoneCountries.length > 0;

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {banner}

            <FormField label="Full name" htmlFor="reg-name">
                <Input
                    id="reg-name"
                    type="text"
                    value={data.name}
                    onChange={e => onChange('name', e.target.value)}
                    placeholder="Your full name"
                    error={errors.name}
                    required
                    autoFocus
                    autoComplete="name"
                />
            </FormField>

            <FormField label="Email" htmlFor="reg-email">
                <Input
                    id="reg-email"
                    type="email"
                    value={data.email}
                    onChange={e => onChange('email', e.target.value)}
                    placeholder="you@example.com"
                    error={errors.email}
                    required
                    autoComplete="email"
                />
            </FormField>

            {hasPhone && (
                <FormField label="Phone number" htmlFor="reg-phone" hint="Used for SMS verification and 2FA.">
                    <div className="flex gap-2">
                        <Select
                            value={data.mobile_country_iso ?? phoneCountries[0]?.iso_code}
                            onChange={e => onChange('mobile_country_iso', e.target.value)}
                            aria-label="Country dial code"
                            className="w-28 flex-none"
                        >
                            {phoneCountries.map(c => (
                                <option key={c.id} value={c.iso_code}>
                                    {c.iso_code} {c.country_code}
                                </option>
                            ))}
                        </Select>
                        <Input
                            id="reg-phone"
                            type="tel"
                            value={data.phone ?? ''}
                            onChange={e => onChange('phone', e.target.value)}
                            placeholder="300 1234567"
                            error={errors.phone}
                            required
                            autoComplete="tel"
                            className="flex-1"
                        />
                    </div>
                </FormField>
            )}

            <FormField label="Password" htmlFor="reg-password">
                <PasswordInput
                    id="reg-password"
                    value={data.password}
                    onChange={e => onChange('password', e.target.value)}
                    placeholder="••••••••"
                    error={errors.password}
                    required
                    autoComplete="new-password"
                />
            </FormField>

            <FormField label="Confirm password" htmlFor="reg-confirm">
                <PasswordInput
                    id="reg-confirm"
                    value={data.password_confirmation}
                    onChange={e => onChange('password_confirmation', e.target.value)}
                    placeholder="••••••••"
                    error={errors.password_confirmation}
                    required
                    autoComplete="new-password"
                />
            </FormField>

            <Button type="submit" loading={processing} fullWidth>
                Create account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <a href={loginUrl} className="text-primary hover:underline">Sign in</a>
            </p>
        </form>
    );
}
