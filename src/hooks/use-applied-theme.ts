'use client';

/**
 * useAppliedTheme — controls the `data-theme` attribute on <html>.
 *
 * The server-side resolved scheme is set in app.blade.php from
 * ThemeResolver. This hook lets the UI-Kit preview page (and only that
 * page) override it client-side via `?theme=NAME`, persisting the
 * override in localStorage so reloads keep the choice.
 *
 * Normal pages do NOT call apply() — they just render whatever the
 * server provided. Only the UI-Kit page provides the switcher UI.
 */
import * as React from 'react';

const STORAGE_KEY = 'ui-kit-theme-override';

declare global {
    interface Window {
        AppConfig?: {
            theme: string;
            appName: string;
            logoUrl: string | null;
            schemes: string[];
        };
    }
}

function knownSchemes(): string[] {
    return window.AppConfig?.schemes ?? [];
}

export function initializeAppliedTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('theme');
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);

    const candidate = fromQuery ?? fromStorage;

    if (!candidate) {
        return;
    }

    if (knownSchemes().includes(candidate)) {
        document.documentElement.dataset.theme = candidate;

        if (fromQuery) {
            window.localStorage.setItem(STORAGE_KEY, candidate);
        }
    }
}

export function useAppliedTheme(): {
    theme: string;
    schemes: string[];
    apply: (name: string) => void;
    reset: () => void;
} {
    const [theme, setTheme] = React.useState<string>(() => {
        if (typeof window === 'undefined') {
            return 'default';
        }

        return (
            document.documentElement.dataset.theme ??
            window.AppConfig?.theme ??
            'default'
        );
    });

    const schemes = React.useMemo(() => window.AppConfig?.schemes ?? [], []);

    const apply = React.useCallback(
        (name: string) => {
            if (!schemes.includes(name)) {
                return;
            }

            document.documentElement.dataset.theme = name;
            window.localStorage.setItem(STORAGE_KEY, name);
            setTheme(name);
        },
        [schemes],
    );

    const reset = React.useCallback(() => {
        window.localStorage.removeItem(STORAGE_KEY);
        const serverTheme = window.AppConfig?.theme ?? 'default';
        document.documentElement.dataset.theme = serverTheme;
        setTheme(serverTheme);
    }, []);

    return { theme, schemes, apply, reset };
}
