'use client';
import { PlatformLink } from '../../platform/context';

/**
 * CookieBanner — first-visit consent prompt.
 *
 * Shows once until a choice is recorded in localStorage under
 * `cookie-consent`. The recorded value is a JSON object:
 *
 *   { essential: true, analytics: bool, marketing: bool, decidedAt: ISO }
 *
 * Essential cookies (session, CSRF, theme prefs) are always on — we do
 * not collect any analytics or marketing data today, but the choice is
 * captured so a future opt-in is honoured.
 *
 * COMPLIANCE: Whenever this banner changes wording, the cookie categories,
 * or the default values, ship a new PolicyVersionSeeder_{date}.php that
 * bumps the cookie policy version. See PolicyVersion.php for the rule.
 *
 * NOTE: This component imports from @inertiajs/react which must be
 * available in the consuming app.
 */
import { Cookie } from 'lucide-react';
import * as React from 'react';

import { Button } from './button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './dialog';
import { Toggle } from './toggle';

const STORAGE_KEY = 'cookie-consent';

type Consent = {
    essential: true;
    analytics: boolean;
    marketing: boolean;
    decidedAt: string;
};

function readStored(): Consent | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Consent;
        return parsed.essential === true && parsed.decidedAt ? parsed : null;
    } catch {
        return null;
    }
}

function write(consent: Consent) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(
        new CustomEvent('cookie-consent:changed', { detail: consent }),
    );
}

export function CookieBanner() {
    const [decided, setDecided] = React.useState(true);
    const [managing, setManaging] = React.useState(false);
    const [analytics, setAnalytics] = React.useState(false);
    const [marketing, setMarketing] = React.useState(false);

    React.useEffect(() => {
        const stored = readStored();
        if (!stored) {
            setDecided(false);
        }
    }, []);

    if (decided) return null;

    const persist = (next: { analytics: boolean; marketing: boolean }) => {
        write({
            essential: true,
            analytics: next.analytics,
            marketing: next.marketing,
            decidedAt: new Date().toISOString(),
        });
        setDecided(true);
    };

    const acceptAll = () => persist({ analytics: true, marketing: true });
    const rejectAll = () => persist({ analytics: false, marketing: false });
    const saveCustom = () => {
        persist({ analytics, marketing });
        setManaging(false);
    };

    return (
        <>
            <div
                role="dialog"
                aria-label="Cookie preferences"
                className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-xl border bg-surface-raised p-5 shadow-lg sm:p-6"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="bg-primary-subtle text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <Cookie aria-hidden="true" className="size-5" />
                    </div>
                    <div className="flex-1">
                        <h2 className="font-display text-sm font-semibold text-foreground">
                            We use cookies to make this platform work
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Essential cookies keep you logged in and protect
                            against CSRF. With your consent, we may add
                            analytics later. See our{' '}
                            <PlatformLink
                                href="/cookies"
                                target="_blank"
                                className="text-primary underline-offset-2 hover:underline"
                            >
                                Cookie Policy
                            </PlatformLink>{' '}
                            for details.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <Button size="sm" onClick={acceptAll}>
                                Accept all
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={rejectAll}
                            >
                                Reject non-essential
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setManaging(true)}
                            >
                                Manage preferences
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={managing} onOpenChange={setManaging}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cookie preferences</DialogTitle>
                        <DialogDescription>
                            Choose which non-essential cookies to allow. You
                            can change these later at any time.
                        </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-3 py-2">
                        <li className="flex items-start justify-between gap-3 rounded-lg border p-3">
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Essential
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Session, CSRF, theme preferences. Always
                                    on.
                                </p>
                            </div>
                            <Toggle pressed disabled aria-label="Essential cookies are always on">
                                On
                            </Toggle>
                        </li>
                        <li className="flex items-start justify-between gap-3 rounded-lg border p-3">
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Analytics
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Helps us understand usage patterns. No
                                    personal data is shared with third
                                    parties.
                                </p>
                            </div>
                            <Toggle
                                pressed={analytics}
                                onPressedChange={setAnalytics}
                                aria-label="Toggle analytics cookies"
                            >
                                {analytics ? 'On' : 'Off'}
                            </Toggle>
                        </li>
                        <li className="flex items-start justify-between gap-3 rounded-lg border p-3">
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Marketing
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Currently unused. Reserved for future
                                    feature announcements.
                                </p>
                            </div>
                            <Toggle
                                pressed={marketing}
                                onPressedChange={setMarketing}
                                aria-label="Toggle marketing cookies"
                            >
                                {marketing ? 'On' : 'Off'}
                            </Toggle>
                        </li>
                    </ul>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setManaging(false)}>
                            Cancel
                        </Button>
                        <Button onClick={saveCustom}>Save preferences</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}