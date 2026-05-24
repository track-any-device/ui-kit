import type { FormEvent } from 'react';
import type { AuthLayoutVariant } from '../../index';
import { VerifyEmailForm } from '../../elements/VerifyEmailForm';
import { AuthLayoutResolved } from '../../layouts/LayoutSwitcher';

export default function VerifyEmailPage({
    authLayout,
    processing = false,
    status,
    logoutUrl = '/logout',
    title = 'Verify your email',
    description = 'Check your inbox for a verification link',
}: {
    authLayout: AuthLayoutVariant;
    processing?: boolean;
    status?: string;
    logoutUrl?: string;
    title?: string;
    description?: string;
}) {
    return (
        <AuthLayoutResolved variant={authLayout} title={title} description={description}>
            <VerifyEmailForm
                processing={processing}
                status={status}
                logoutUrl={logoutUrl}
                onSubmit={(e: FormEvent) => e.preventDefault()}
            />
        </AuthLayoutResolved>
    );
}
