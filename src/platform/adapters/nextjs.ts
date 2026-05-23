/**
 * Next.js Platform Adapter Factory
 *
 * Call this ONCE in the consuming app's root layout and pass the result
 * to <PlatformProvider adapter={...}>.
 *
 * The factory accepts Next.js primitives so packages/node never imports
 * next/link or next/navigation directly — zero coupling.
 *
 * Usage (web/ app/layout.tsx):
 *
 *   'use client';
 *   import Link from 'next/link';
 *   import { useRouter, usePathname } from 'next/navigation';
 *   import { createNextjsAdapter, PlatformProvider } from '@track-any-device/components';
 *
 *   export default function ClientProviders({ children, pageProps }) {
 *     const adapter = createNextjsAdapter({ Link, useRouter, usePathname, pageProps });
 *     return <PlatformProvider adapter={adapter}>{children}</PlatformProvider>;
 *   }
 *
 * Note: usePageProps() in the Next.js adapter reads from `pageProps` passed
 * to the factory, NOT from a server context. For shared data (auth, nav_links
 * etc.) fetch them server-side and pass them in as pageProps.
 */

import { useRef } from 'react';
import type { ComponentType } from 'react';
import type { PlatformAdapter, PlatformLinkProps, PlatformForm, NavigateOptions } from '../types';
import { defaultAdapter } from './default';

interface NextjsRouter {
    push:    (href: string) => void;
    replace: (href: string) => void;
}

interface NextjsDeps {
    /** next/link's <Link> component */
    Link: ComponentType<PlatformLinkProps>;
    /** next/navigation's useRouter hook */
    useRouter: () => NextjsRouter;
    /** next/navigation's usePathname hook */
    usePathname: () => string;
    /**
     * Shared page props (auth, nav_links, etc.) — equivalent to Inertia's
     * shared props. Pass them from the server component down via props.
     */
    pageProps?: Record<string, unknown>;
}

export function createNextjsAdapter({
    Link,
    useRouter,
    usePathname,
    pageProps = {},
}: NextjsDeps): PlatformAdapter {
    const frozenProps = pageProps;

    return {
        Link,

        navigate(href: string, options?: NavigateOptions) {
            const router = useRouter();
            if (options?.replace) {
                router.replace(href);
            } else {
                router.push(href);
            }
        },

        useCurrentUrl() {
            return usePathname();
        },

        usePageProps<T extends Record<string, unknown>>(): T {
            return frozenProps as T;
        },

        // useForm uses the default fetch-based implementation — same interface as Inertia.
        useForm: defaultAdapter.useForm,

        // Next.js manages document head via the `metadata` export on server components,
        // not via a client component. PlatformHead renders nothing here.
        Head: null,
    };
}
