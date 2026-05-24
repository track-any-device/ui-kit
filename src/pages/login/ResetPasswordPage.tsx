import type { FormEvent } from 'react';
import type { AuthLayoutVariant } from '../../index';
import type { ResetPasswordFormData, ResetPasswordFormErrors } from '../../elements/ResetPasswordForm';
import { ResetPasswordForm } from '../../elements/ResetPasswordForm';
import { AuthLayoutResolved } from '../../layouts/LayoutSwitcher';

export default function ResetPasswordPage({
    authLayout,
    data,
    setData,
    errors = {},
    processing = false,
    title = 'Reset password',
    description = 'Enter your new password below',
}: {
    authLayout: AuthLayoutVariant;
    data: ResetPasswordFormData;
    setData: (d: ResetPasswordFormData) => void;
    errors?: ResetPasswordFormErrors;
    processing?: boolean;
    title?: string;
    description?: string;
}) {
    return (
        <AuthLayoutResolved variant={authLayout} title={title} description={description}>
            <ResetPasswordForm
                data={data}
                errors={errors}
                processing={processing}
                onChange={(field, value) => setData({ ...data, [field]: value })}
                onSubmit={(e: FormEvent) => e.preventDefault()}
            />
        </AuthLayoutResolved>
    );
}
