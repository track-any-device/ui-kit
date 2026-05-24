import type { FormEvent } from 'react';
import type { AuthLayoutVariant } from '../../index';
import type { LoginFormData, LoginFormErrors } from '../../elements/LoginForm';
import { LoginForm } from '../../elements/LoginForm';
import { AuthLayoutResolved } from '../../layouts/LayoutSwitcher';

export default function LoginPage({
    authLayout,
    data,
    setData,
    errors = {},
    processing = false,
    status,
    canResetPassword = true,
    canRegister = true,
    forgotPasswordUrl = '/forgot-password',
    registerUrl = '/register',
    title = 'Sign in',
    description = 'Enter your credentials to continue',
}: {
    authLayout: AuthLayoutVariant;
    data: LoginFormData;
    setData: (d: LoginFormData) => void;
    errors?: LoginFormErrors;
    processing?: boolean;
    status?: string;
    canResetPassword?: boolean;
    canRegister?: boolean;
    forgotPasswordUrl?: string;
    registerUrl?: string;
    title?: string;
    description?: string;
}) {
    return (
        <AuthLayoutResolved variant={authLayout} title={title} description={description}>
            <LoginForm
                data={data}
                errors={errors}
                processing={processing}
                status={status}
                canResetPassword={canResetPassword}
                canRegister={canRegister}
                forgotPasswordUrl={forgotPasswordUrl}
                registerUrl={registerUrl}
                onChange={(field, value) => setData({ ...data, [field]: value })}
                onSubmit={(e: FormEvent) => e.preventDefault()}
            />
        </AuthLayoutResolved>
    );
}
