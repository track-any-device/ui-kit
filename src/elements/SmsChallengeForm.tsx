import type { FormEvent } from 'react';
import { Button } from '../controls/Button';
import { FormField } from '../controls/FormField';
import { Input } from '../controls/Input';

export interface SmsChallengeFormErrors {
    otp?: string;
}

interface Props {
    otp: string;
    errors: SmsChallengeFormErrors;
    processing?: boolean;
    resendProcessing?: boolean;
    otpPhone?: string;
    otpSent?: boolean;
    status?: string;
    sendError?: string;
    logoutUrl?: string;
    onOtpChange: (value: string) => void;
    onSubmit: (e: FormEvent) => void;
    onResend: () => void;
}

export function SmsChallengeForm({
    otp,
    errors,
    processing = false,
    resendProcessing = false,
    otpPhone,
    otpSent = true,
    status,
    sendError,
    logoutUrl = '/logout',
    onOtpChange,
    onSubmit,
    onResend,
}: Props) {
    return (
        <div className="space-y-5">
            {status && (
                <div className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}
            {sendError && (
                <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
                    {sendError}
                </div>
            )}
            {otpSent && !sendError && otpPhone && (
                <p className="text-sm text-muted-foreground">
                    A 6-digit code was sent to{' '}
                    <span className="font-medium text-foreground">{otpPhone}</span>.
                    Enter it below to continue.
                </p>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
                <FormField label="Verification code" htmlFor="sms-otp">
                    <Input
                        id="sms-otp"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={otp}
                        onChange={e => onOtpChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        error={errors.otp}
                        autoFocus
                        autoComplete="one-time-code"
                        required
                        className="text-center font-mono text-xl tracking-[0.5em] placeholder:tracking-normal"
                    />
                </FormField>

                <Button type="submit" disabled={otp.length !== 6} loading={processing} fullWidth>
                    Verify
                </Button>
            </form>

            <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
                <span>
                    Didn't receive a code?{' '}
                    <button
                        type="button"
                        onClick={onResend}
                        disabled={resendProcessing}
                        className="font-medium text-primary hover:underline disabled:opacity-50"
                    >
                        {resendProcessing ? 'Sending…' : 'Resend'}
                    </button>
                </span>
                <a
                    href={logoutUrl}
                    className="text-xs text-muted-foreground/70 underline underline-offset-4 hover:text-muted-foreground"
                >
                    Log out
                </a>
            </div>
        </div>
    );
}
