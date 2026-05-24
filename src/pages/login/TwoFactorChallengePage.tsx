import type { FormEvent } from 'react';
import type { AuthLayoutVariant } from '../../index';
import type { OtpFormErrors } from '../../elements/OtpForm';
import { OtpForm } from '../../elements/OtpForm';
import { AuthLayoutResolved } from '../../layouts/LayoutSwitcher';

export default function TwoFactorChallengePage({
    authLayout,
    code,
    setCode,
    recovery = false,
    setRecovery,
    errors = {},
    processing = false,
    title = 'Two-factor authentication',
    description = 'Verify your identity to continue',
}: {
    authLayout: AuthLayoutVariant;
    code: string;
    setCode: (v: string) => void;
    recovery?: boolean;
    setRecovery: (v: boolean) => void;
    errors?: OtpFormErrors;
    processing?: boolean;
    title?: string;
    description?: string;
}) {
    return (
        <AuthLayoutResolved variant={authLayout} title={title} description={description}>
            <OtpForm
                code={code}
                errors={errors}
                processing={processing}
                recovery={recovery}
                onCodeChange={setCode}
                onSubmit={(e: FormEvent) => e.preventDefault()}
                onToggleRecovery={() => setRecovery(!recovery)}
            />
        </AuthLayoutResolved>
    );
}
