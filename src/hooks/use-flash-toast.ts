'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '../types/ui';

interface FlashRouter {
    on: (event: string, callback: (e: unknown) => void) => () => void;
}

/**
 * Listens for Inertia flash events and shows a Sonner toast.
 * Pass Inertia's `router` from the consuming app:
 *
 *   import { router } from '@inertiajs/react';
 *   useFlashToast(router);
 *
 * In non-Inertia environments omit the argument — the hook is a no-op.
 */
export function useFlashToast(router?: FlashRouter): void {
    useEffect(() => {
        if (!router) return;
        return router.on('flash', (event) => {
            const flash = (event as CustomEvent).detail?.flash;
            const data = flash?.toast as FlashToast | undefined;
            if (data) toast[data.type](data.message);
        });
    }, [router]);
}
