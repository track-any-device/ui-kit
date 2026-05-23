/**
 * Inertia.js Platform Adapter Factory
 *
 * Call this ONCE in the consuming app's entry point (app.tsx / bootstrap.tsx)
 * and pass the result to <PlatformProvider adapter={...}>.
 *
 * The factory accepts Inertia's primitives so packages/node never imports
 * @inertiajs/react directly — zero coupling.
 *
 * Usage (core/ or login/ resources/js/app.tsx):
 *
 *   import { Link, usePage, useForm, Head, router } from '@inertiajs/react';
 *   import { createInertiaAdapter, PlatformProvider } from '@track-any-device/components';
 *
 *   const adapter = createInertiaAdapter({ Link, usePage, useForm, Head, router });
 *
 *   createInertiaApp({
 *     resolve: ...,
 *     setup({ el, App, props }) {
 *       createRoot(el).render(
 *         <PlatformProvider adapter={adapter}><App {...props} /></PlatformProvider>
 *       );
 *     },
 *   });
 */

import type { ComponentType } from 'react';
import type { PlatformAdapter, PlatformLinkProps, PlatformForm, FormSubmitOptions, NavigateOptions } from '../types';

type InertiaLink = ComponentType<PlatformLinkProps>;

interface InertiaRouter {
    visit: (url: string, options?: { replace?: boolean; preserveScroll?: boolean; preserveState?: boolean }) => void;
}

interface InertiaPageObject {
    props: Record<string, unknown>;
    url: string;
}

interface InertiaDeps {
    /** Inertia's <Link> component */
    Link: InertiaLink;
    /** Inertia's usePage hook */
    usePage: () => InertiaPageObject;
    /** Inertia's useForm hook */
    useForm: <T extends Record<string, unknown>>(initialData: T) => PlatformForm<T>;
    /** Inertia's <Head> component (optional — pass null if not needed) */
    Head: ComponentType<{ title?: string }> | null;
    /** Inertia's router instance */
    router: InertiaRouter;
}

export function createInertiaAdapter({
    Link,
    usePage,
    useForm,
    Head,
    router,
}: InertiaDeps): PlatformAdapter {
    return {
        Link,

        navigate(href: string, options?: NavigateOptions) {
            router.visit(href, {
                replace: options?.replace,
                preserveScroll: options?.preserveScroll,
                preserveState: options?.preserveState,
            });
        },

        useCurrentUrl() {
            return usePage().url;
        },

        usePageProps<T extends Record<string, unknown>>(): T {
            return usePage().props as T;
        },

        useForm<T extends Record<string, unknown>>(initialData: T): PlatformForm<T> {
            return useForm<T>(initialData);
        },

        Head: Head
            ? (({ title, description: _d }) => <Head title={title} />) as ComponentType<{ title?: string; description?: string }>
            : null,
    };
}
