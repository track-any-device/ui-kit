import type { FormEvent } from 'react';
import type { AuthLayoutVariant } from '../../index';
import type { RegisterFormData, RegisterFormErrors, PhoneCountry } from '../../elements/RegisterForm';
import { RegisterForm } from '../../elements/RegisterForm';
import { AuthLayoutResolved } from '../../layouts/LayoutSwitcher';

export default function RegisterPage({
    authLayout,
    data,
    setData,
    errors = {},
    processing = false,
    loginUrl = '/login',
    phoneCountries,
    title = 'Create an account',
    description = 'Fill in your details to get started',
}: {
    authLayout: AuthLayoutVariant;
    data: RegisterFormData;
    setData: (d: RegisterFormData) => void;
    errors?: RegisterFormErrors;
    processing?: boolean;
    loginUrl?: string;
    phoneCountries?: PhoneCountry[];
    title?: string;
    description?: string;
}) {
    return (
        <AuthLayoutResolved variant={authLayout} title={title} description={description}>
            <RegisterForm
                data={data}
                errors={errors}
                processing={processing}
                loginUrl={loginUrl}
                phoneCountries={phoneCountries}
                onChange={(field, value) => setData({ ...data, [field]: value })}
                onSubmit={(e: FormEvent) => e.preventDefault()}
            />
        </AuthLayoutResolved>
    );
}
