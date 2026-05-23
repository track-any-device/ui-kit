import { usePlatformPageProps } from '../platform/context';
/**
 * Datetime utilities for rendering server-UTC timestamps in the user's local
 * timezone. The server emits ISO-8601 with a 'Z' suffix (see Carbon serialiser
 * configured in AppServiceProvider). All helpers in this module accept either
 * an ISO string or a Date / null and return display strings.
 *
 * Display timezone resolution order:
 *   1. explicit `timezone` argument
 *   2. usePage().props.user_timezone (Inertia shared prop) — resolved via useUserTimezone()
 *   3. Intl.DateTimeFormat().resolvedOptions().timeZone (browser default)
 *   4. 'UTC' as final fallback
 *
 * NOTE: useUserTimezone() and reportBrowserTimezone() import from @inertiajs/react
 * which must be available in the consuming app.
 */


type IsoOrDate = string | Date | null | undefined;

const isoCache = new Map<string, Date>();

function toDate(value: IsoOrDate): Date | null {
    if (value === null || value === undefined) {
        return null;
    }

    if (value instanceof Date) {
        return isNaN(value.getTime()) ? null : value;
    }

    if (typeof value !== 'string') {
        return null;
    }

    const cached = isoCache.get(value);

    if (cached !== undefined) {
        return cached;
    }

    const d = new Date(value);

    if (isNaN(d.getTime())) {
        return null;
    }

    isoCache.set(value, d);

    return d;
}

export function browserTimezone(): string {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
        return 'UTC';
    }
}

let _sharedTimezone: string | null = null;

export function setSharedTimezone(tz: string | null): void {
    _sharedTimezone = tz;
}

export function resolveTimezone(explicit?: string | null): string {
    if (explicit) {
        return explicit;
    }

    if (_sharedTimezone) {
        return _sharedTimezone;
    }

    return browserTimezone();
}

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
};

export function formatLocalDateTime(
    value: IsoOrDate,
    options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS,
    timezone?: string,
): string {
    const d = toDate(value);

    if (d === null) {
        return '';
    }

    return new Intl.DateTimeFormat(undefined, {
        ...options,
        timeZone: resolveTimezone(timezone),
    }).format(d);
}

export function formatLocalDate(value: IsoOrDate, timezone?: string): string {
    return formatLocalDateTime(
        value,
        { year: 'numeric', month: 'short', day: 'numeric' },
        timezone,
    );
}

export function formatLocalTime(value: IsoOrDate, timezone?: string): string {
    return formatLocalDateTime(
        value,
        {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        },
        timezone,
    );
}

export function formatRelative(value: IsoOrDate): string {
    const d = toDate(value);

    if (d === null) {
        return '';
    }

    const diffMs = Date.now() - d.getTime();
    const sec = Math.round(diffMs / 1000);

    if (Math.abs(sec) < 45) {
        return 'just now';
    }

    const min = Math.round(sec / 60);

    if (Math.abs(min) < 60) {
        return `${min}m ago`;
    }

    const hr = Math.round(min / 60);

    if (Math.abs(hr) < 24) {
        return `${hr}h ago`;
    }

    const days = Math.round(hr / 24);

    if (Math.abs(days) < 30) {
        return `${days}d ago`;
    }

    return formatLocalDate(d);
}

/**
 * Returns the user's timezone resolved from Inertia shared props.
 * Use inside React components; outside components prefer resolveTimezone().
 */
export function useUserTimezone(): string {
    const { user_timezone } = usePlatformPageProps<{ user_timezone?: string | null }>();
    return resolveTimezone(user_timezone);
}

/**
 * Send the browser's resolved timezone to the server so unauthenticated
 * users (and the X-Browser-Timezone fallback in HandleInertiaRequests) get
 * a sensible default. Idempotent — safe to call on every page load.
 */
interface TimezoneRouter { on: (e: string, cb: (event: unknown) => void) => () => void; }

export function reportBrowserTimezone(router?: TimezoneRouter): void {
    if (typeof window === 'undefined') {
        return;
    }

    const tz = browserTimezone();
    if (!router) return;
    router.on('before', (event: unknown) => {
        const xhr = (event as { detail: { visit?: { headers?: Record<string, string> } } }).detail.visit?.headers ?? {};
        (xhr as Record<string, string>)['X-Browser-Timezone'] = tz;
    });
}
