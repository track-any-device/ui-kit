import type { FormEvent } from 'react';
import { Button } from '../controls/Button';

interface Props {
    processing?: boolean;
    status?: string;
    logoutUrl?: string;
    onSubmit: (e: FormEvent) => void;
}

export function VerifyEmailForm({ processing = false, status, logoutUrl = '/logout', onSubmit }: Props) {
    return (
        <div className="space-y-6 text-center">
            <p className="text-sm text-muted-foreground">
                Before continuing, could you verify your email address by clicking on the link we
                just emailed to you? If you didn't receive the email, we will gladly send you another.
            </p>

            {status === 'verification-link-sent' && (
                <p className="text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </p>
            )}

            <form onSubmit={onSubmit}>
                <Button type="submit" loading={processing} variant="secondary">
                    Resend verification email
                </Button>
            </form>

            <a
                href={logoutUrl}
                className="block text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
                Log out
            </a>
        </div>
    );
}
