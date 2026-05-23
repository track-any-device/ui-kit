'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { PlatformAdapter, PlatformLinkProps, PlatformForm, NavigateOptions } from './types';
import { defaultAdapter } from './adapters/default';

// ─── Context ─────────────────────────────────────────────────────────────────

const PlatformContext = createContext<PlatformAdapter>(defaultAdapter);

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * Provide a platform adapter to the component tree.
 *
 * Place this at the root of each app:
 *   - core/ + login/ → wrap with createInertiaAdapter(...)
 *   - web/           → wrap with createNextjsAdapter(...)
 *   - Storybook      → no provider needed (defaultAdapter kicks in)
 */
export function PlatformProvider({
    adapter,
    children,
}: {
    adapter: PlatformAdapter;
    children: ReactNode;
}) {
    return (
        <PlatformContext.Provider value={adapter}>
            {children}
        </PlatformContext.Provider>
    );
}

// ─── usePlatform ─────────────────────────────────────────────────────────────

/** Returns the full adapter. Use the fine-grained hooks below in most cases. */
export function usePlatform(): PlatformAdapter {
    return useContext(PlatformContext);
}

// ─── Fine-grained hooks ──────────────────────────────────────────────────────

/**
 * Platform-agnostic Link component.
 *
 * Usage in components:
 *   const PlatformLink = usePlatformLink();
 *   return <PlatformLink href="/foo">Go</PlatformLink>;
 *
 * Or use the <PlatformLink> convenience component exported below.
 */
export function usePlatformLink() {
    return useContext(PlatformContext).Link;
}

/** Programmatic navigation — platform's router.visit / router.push / window.location */
export function usePlatformNavigate() {
    return useContext(PlatformContext).navigate;
}

/** Current URL (pathname + search). Reactive in SPA routers. */
export function usePlatformUrl(): string {
    return useContext(PlatformContext).useCurrentUrl();
}

/**
 * Shared page props injected by the server.
 * In Inertia: all shared() props.
 * In Next.js: whatever was passed to createNextjsAdapter({ pageProps }).
 * In Storybook/default: empty object.
 */
export function usePlatformPageProps<T extends Record<string, unknown>>(): T {
    return useContext(PlatformContext).usePageProps<T>();
}

/**
 * Inertia-compatible form hook.
 * In Inertia: Inertia's real useForm.
 * Everywhere else: fetch-based implementation with the same interface.
 */
export function usePlatformForm<T extends Record<string, unknown>>(
    initialData: T,
): PlatformForm<T> {
    return useContext(PlatformContext).useForm<T>(initialData);
}

/** Document head component, or null if the platform manages head via other means. */
export function usePlatformHead() {
    return useContext(PlatformContext).Head;
}

// ─── Convenience components ──────────────────────────────────────────────────

/**
 * Drop-in replacement for <a href> or Inertia's <Link>.
 * Automatically uses the platform's router.
 *
 * Usage:
 *   import { PlatformLink } from '@trackany-device/components';
 *   <PlatformLink href="/dashboard">Dashboard</PlatformLink>
 */
export function PlatformLink(props: PlatformLinkProps) {
    const Link = usePlatformLink();
    return <Link {...props} />;
}
