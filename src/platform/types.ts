import type { ComponentType, ReactNode } from 'react';

// ─── Link ────────────────────────────────────────────────────────────────────

export interface PlatformLinkProps {
    href: string;
    children?: ReactNode;
    className?: string;
    onClick?: (e?: React.MouseEvent) => void;
    target?: string;
    rel?: string;
    /** Preserve scroll position after navigation (Inertia option, ignored elsewhere) */
    preserveScroll?: boolean;
    /** Replace history entry instead of pushing (SPA routers) */
    replace?: boolean;
    [key: string]: unknown;
}

// ─── Navigate ────────────────────────────────────────────────────────────────

export interface NavigateOptions {
    replace?: boolean;
    preserveScroll?: boolean;
    preserveState?: boolean;
}

// ─── useForm ─────────────────────────────────────────────────────────────────

export interface FormSubmitOptions<T = Record<string, unknown>> {
    preserveScroll?: boolean;
    preserveState?: boolean;
    onSuccess?: (data?: unknown) => void;
    onError?: (errors: Partial<Record<keyof T, string>>) => void;
    onFinish?: () => void;
}

export interface PlatformForm<T extends Record<string, unknown>> {
    data: T;
    setData: {
        (field: keyof T, value: unknown): void;
        (values: Partial<T>): void;
    };
    errors: Partial<Record<keyof T, string>>;
    processing: boolean;
    wasSuccessful: boolean;
    recentlySuccessful: boolean;
    isDirty: boolean;
    post:   (url: string, options?: FormSubmitOptions<T>) => void;
    put:    (url: string, options?: FormSubmitOptions<T>) => void;
    patch:  (url: string, options?: FormSubmitOptions<T>) => void;
    delete: (url: string, options?: FormSubmitOptions<T>) => void;
    reset:  (...fields: (keyof T)[]) => void;
    clearErrors: (...fields: (keyof T)[]) => void;
    setError: (field: keyof T, message: string) => void;
}

// ─── Head ────────────────────────────────────────────────────────────────────

export interface PlatformHeadProps {
    title?: string;
    description?: string;
}

// ─── Adapter ─────────────────────────────────────────────────────────────────

export interface PlatformAdapter {
    /**
     * SPA-aware link component. Falls back to <a> in environments
     * where no router is available (Storybook, static sites).
     */
    Link: ComponentType<PlatformLinkProps>;

    /**
     * Programmatic navigation. Uses the platform's router if available,
     * otherwise falls back to window.location.
     */
    navigate: (href: string, options?: NavigateOptions) => void;

    /**
     * Returns the current URL/pathname. Reactive in SPA routers.
     */
    useCurrentUrl: () => string;

    /**
     * Returns shared page props injected by the server or a parent provider.
     * In Inertia: usePage<T>().props
     * In Next.js: data from PlatformPagePropsProvider
     * Default: empty object
     */
    usePageProps: <T extends Record<string, unknown>>() => T;

    /**
     * Inertia-compatible form hook. In Inertia this is the real useForm.
     * In all other environments it is a fetch-based implementation that
     * exposes the same interface.
     */
    useForm: <T extends Record<string, unknown>>(initialData: T) => PlatformForm<T>;

    /**
     * Document head management. In Inertia this is <Head>. In Next.js
     * metadata is managed via the `metadata` export so this is null.
     * Components should render nothing when Head is null.
     */
    Head: ComponentType<PlatformHeadProps> | null;
}
