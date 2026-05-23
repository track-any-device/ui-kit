'use client';

import { useCallback, useRef, useState } from 'react';
import type {
    FormSubmitOptions,
    NavigateOptions,
    PlatformAdapter,
    PlatformForm,
    PlatformLinkProps,
} from '../types';

// ─── Link ────────────────────────────────────────────────────────────────────

function DefaultLink({ href, children, preserveScroll: _ps, replace: _r, ...props }: PlatformLinkProps) {
    return <a href={href} {...props}>{children}</a>;
}

// ─── navigate ────────────────────────────────────────────────────────────────

function defaultNavigate(href: string, options?: NavigateOptions) {
    if (typeof window === 'undefined') return;
    if (options?.replace) {
        window.location.replace(href);
    } else {
        window.location.href = href;
    }
}

// ─── useCurrentUrl ───────────────────────────────────────────────────────────

function useDefaultCurrentUrl() {
    if (typeof window === 'undefined') return '';
    return window.location.pathname + window.location.search;
}

// ─── usePageProps ─────────────────────────────────────────────────────────────

function useDefaultPageProps<T extends Record<string, unknown>>(): T {
    return {} as T;
}

// ─── useForm ─────────────────────────────────────────────────────────────────

function useFetchForm<T extends Record<string, unknown>>(initialData: T): PlatformForm<T> {
    const [data, setDataState] = useState<T>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [processing, setProcessing] = useState(false);
    const [wasSuccessful, setWasSuccessful] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const recentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const initialRef = useRef(initialData);

    const setData: PlatformForm<T>['setData'] = useCallback((fieldOrValues: keyof T | Partial<T>, value?: unknown) => {
        if (typeof fieldOrValues === 'string') {
            setDataState((prev) => ({ ...prev, [fieldOrValues]: value }));
        } else {
            setDataState((prev) => ({ ...prev, ...(fieldOrValues as Partial<T>) }));
        }
    }, []);

    const reset = useCallback((...fields: (keyof T)[]) => {
        if (fields.length === 0) {
            setDataState(initialRef.current);
        } else {
            setDataState((prev) => {
                const next = { ...prev };
                fields.forEach((f) => { next[f] = initialRef.current[f]; });
                return next;
            });
        }
        setErrors({});
    }, []);

    const clearErrors = useCallback((...fields: (keyof T)[]) => {
        if (fields.length === 0) {
            setErrors({});
        } else {
            setErrors((prev) => {
                const next = { ...prev };
                fields.forEach((f) => { delete next[f]; });
                return next;
            });
        }
    }, []);

    const setError = useCallback((field: keyof T, message: string) => {
        setErrors((prev) => ({ ...prev, [field]: message }));
    }, []);

    async function submit(method: string, url: string, options?: FormSubmitOptions<T>) {
        setProcessing(true);
        setWasSuccessful(false);
        setErrors({});
        try {
            const res = await fetch(url, {
                method: method.toUpperCase(),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(data),
            });

            const json = await res.json().catch(() => ({}));

            if (!res.ok) {
                const serverErrors = (json?.errors ?? {}) as Partial<Record<keyof T, string>>;
                setErrors(serverErrors);
                options?.onError?.(serverErrors);
            } else {
                setWasSuccessful(true);
                setRecentlySuccessful(true);
                if (recentTimer.current) clearTimeout(recentTimer.current);
                recentTimer.current = setTimeout(() => setRecentlySuccessful(false), 2000);
                options?.onSuccess?.(json);
            }
        } catch {
            const networkError = { _network: 'Network error. Please try again.' } as Partial<Record<keyof T, string>>;
            setErrors(networkError);
            options?.onError?.(networkError);
        } finally {
            setProcessing(false);
            options?.onFinish?.();
        }
    }

    return {
        data,
        setData,
        errors,
        processing,
        wasSuccessful,
        recentlySuccessful,
        isDirty: JSON.stringify(data) !== JSON.stringify(initialRef.current),
        post:   (url, opts) => submit('POST',   url, opts),
        put:    (url, opts) => submit('PUT',    url, opts),
        patch:  (url, opts) => submit('PATCH',  url, opts),
        delete: (url, opts) => submit('DELETE', url, opts),
        reset,
        clearErrors,
        setError,
    };
}

// ─── Adapter ─────────────────────────────────────────────────────────────────

export const defaultAdapter: PlatformAdapter = {
    Link: DefaultLink,
    navigate: defaultNavigate,
    useCurrentUrl: useDefaultCurrentUrl,
    usePageProps: useDefaultPageProps,
    useForm: useFetchForm,
    Head: null,
};
