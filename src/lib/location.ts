'use client';

/**
 * Browser geolocation consent helper.
 *
 * Returns a hook that requests the user's coordinates on demand. Coords are
 * cached in component state and forwarded as `X-Browser-Latitude` /
 * `X-Browser-Longitude` headers on every Inertia visit. The hook is a soft
 * prompt — login/register still work when the user denies permission, but
 * the form payload omits the coords and the server stores null.
 *
 * attachLocationToInertiaVisits(router) accepts Inertia's router from the
 * consuming app and is a no-op when omitted (Storybook / Next.js).
 */

import { useCallback, useEffect, useState } from 'react';

interface LocationRouter {
    on: (event: string, callback: (e: unknown) => void) => () => void;
}

export type Coords = {
    latitude: number;
    longitude: number;
};

export type ConsentStatus =
    | 'idle'
    | 'prompting'
    | 'granted'
    | 'denied'
    | 'unavailable';

let _cached: Coords | null = null;

export function cachedCoords(): Coords | null {
    return _cached;
}

export function setCachedCoords(coords: Coords | null): void {
    _cached = coords;
}

export function useLocationConsent(): {
    coords: Coords | null;
    status: ConsentStatus;
    request: () => Promise<Coords | null>;
} {
    const [coords, setCoords] = useState<Coords | null>(_cached);
    const [status, setStatus] = useState<ConsentStatus>(
        _cached ? 'granted' : 'idle',
    );

    const request = useCallback((): Promise<Coords | null> => {
        if (typeof window === 'undefined' || !navigator.geolocation) {
            setStatus('unavailable');

            return Promise.resolve(null);
        }

        setStatus('prompting');

        return new Promise<Coords | null>((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const next: Coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    _cached = next;
                    setCoords(next);
                    setStatus('granted');
                    resolve(next);
                },
                () => {
                    setStatus('denied');
                    resolve(null);
                },
                {
                    enableHighAccuracy: false,
                    maximumAge: 60_000,
                    timeout: 8_000,
                },
            );
        });
    }, []);

    return { coords, status, request };
}

/**
 * Wire cached coordinates onto every outgoing Inertia visit as request
 * headers. Idempotent — safe to call once at app bootstrap.
 */
export function attachLocationToInertiaVisits(router?: LocationRouter): void {
    if (typeof window === 'undefined' || !router) {
        return;
    }

    router.on('before', (event: unknown) => {
        if (!_cached) {
            return;
        }

        const headers = (event as { detail: { visit?: { headers?: Record<string, string> } } }).detail.visit?.headers ?? {};
        (headers as Record<string, string>)['X-Browser-Latitude'] = String(
            _cached.latitude,
        );
        (headers as Record<string, string>)['X-Browser-Longitude'] = String(
            _cached.longitude,
        );
    });
}

/** Convenience: re-request location on mount, swallowing failures. */
export function useEagerLocationConsent(): ConsentStatus {
    const { status, request } = useLocationConsent();

    useEffect(() => {
        if (status === 'idle') {
            void request();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return status;
}
