'use client';

import * as React from 'react';

const STORAGE_KEY = 'ui-dark-mode';

/**
 * Controls the `dark` class on <html>. Persists the user's choice in
 * localStorage, falling back to the system colour-scheme preference on
 * first visit.
 *
 * Used by the public site header's day/night toggle. Keeps the choice
 * tab-wide so it survives Inertia navigations.
 */
export function useDarkMode() {
    const [isDark, setIsDark] = React.useState<boolean>(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        const stored = window.localStorage.getItem(STORAGE_KEY);

        if (stored === 'true') {
            return true;
        }

        if (stored === 'false') {
            return false;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    React.useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }

        document.documentElement.classList.toggle('dark', isDark);
        window.localStorage.setItem(STORAGE_KEY, String(isDark));
    }, [isDark]);

    return {
        isDark,
        toggle: React.useCallback(() => setIsDark((v) => !v), []),
        set: setIsDark,
    };
}
