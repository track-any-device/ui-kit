import type { FormEvent } from 'react';
import { Button } from '../controls/Button';
import { FormField } from '../controls/FormField';
import { Input } from '../controls/Input';

export interface OtpFormErrors {
    code?: string;
}

interface Props {
    code: string;
    errors: OtpFormErrors;
    processing?: boolean;
    status?: string;
    recovery?: boolean;
    onCodeChange: (value: string) => void;
    onSubmit: (e: FormEvent) => void;
    onToggleRecovery?: () => void;
}

export function OtpForm({
    code,
    errors,
    processing = false,
    status,
    recovery = false,
    onCodeChange,
    onSubmit,
    onToggleRecovery,
}: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {status && <p className="text-sm text-green-600">{status}</p>}

            <p className="text-sm text-muted-foreground">
                {recovery
                    ? 'Enter one of your emergency recovery codes to regain access.'
                    : 'Enter the 6-digit verification code sent to your phone.'}
            </p>

            <FormField label={recovery ? 'Recovery code' : 'Verification code'} htmlFor="otp-code">
                <Input
                    id="otp-code"
                    type="text"
                    inputMode={recovery ? 'text' : 'numeric'}
                    value={code}
                    onChange={e => onCodeChange(e.target.value)}
                    placeholder={recovery ? 'xxxx-xxxx-xxxx' : '000000'}
                    maxLength={recovery ? undefined : 6}
                    error={errors.code}
                    autoFocus
                    autoComplete="one-time-code"
                    required
                    className="text-center tracking-[0.4em] placeholder:tracking-normal"
                />
            </FormField>

            <Button type="submit" loading={processing} fullWidth>
                Verify
            </Button>

            {onToggleRecovery && (
                <p className="text-center text-sm text-muted-foreground">
                    <button type="button" onClick={onToggleRecovery} className="text-primary hover:underline">
                        {recovery ? 'Use verification code instead' : 'Use a recovery code'}
                    </button>
                </p>
            )}
        </form>
    );
}
