import type { FormEvent } from 'react';
import type { AuthLayoutVariant } from '../../index';
import type { ForgotPasswordFormData, ForgotPasswordFormErrors } from '../../elements/ForgotPasswordForm';
import { ForgotPasswordForm } from '../../elements/ForgotPasswordForm';
import { AuthLayoutResolved } from '../../layouts/LayoutSwitcher';

export default function ForgotPasswordPage({
    authLayout,
    data,
    setData,
    errors = {},
    processing = false,
    status,
    loginUrl = '/login',
    title = 'Forgot password?',
    description = "We'll email you a reset link",
}: {
    authLayout: AuthLayoutVariant;
    data: ForgotPasswordFormData;
    setData: (d: ForgotPasswordFormData) => void;
    errors?: ForgotPasswordFormErrors;
    processing?: boolean;
    status?: string;
    loginUrl?: string;
    title?: string;
    description?: string;
}) {
    return (
        <AuthLayoutResolved variant={authLayout} title={title} description={description}>
            <ForgotPasswordForm
                data={data}
                errors={errors}
                processing={processing}
                status={status}
                loginUrl={loginUrl}
                onChange={(field, value) => setData({ ...data, [field]: value })}
                onSubmit={(e: FormEvent) => e.preventDefault()}
            />
        </AuthLayoutResolved>
    );
}
