import { type ReactNode } from 'react';
import { PlatformProvider, defaultAdapter } from '@trackany-device/components';

interface MockPageProps {
    props?: Record<string, unknown>;
    url?: string;
    children: ReactNode;
}

/**
 * Simulates an Inertia page context in Storybook.
 * Stories that rely on usePlatformPageProps() or usePlatformUrl() wrap with this.
 */
export function MockPage({ props = {}, url = '/', children }: MockPageProps) {
    const adapter = {
        ...defaultAdapter,
        useCurrentUrl: () => url,
        usePageProps: <T extends Record<string, unknown>>() => props as T,
    };
    return <PlatformProvider adapter={adapter}>{children}</PlatformProvider>;
}
