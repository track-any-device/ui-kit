// Types
export type {
    PlatformAdapter,
    PlatformLinkProps,
    PlatformForm,
    PlatformHeadProps,
    NavigateOptions,
    FormSubmitOptions,
} from './types';

// Provider + hooks + PlatformLink component
export {
    PlatformProvider,
    PlatformLink,
    usePlatform,
    usePlatformLink,
    usePlatformNavigate,
    usePlatformUrl,
    usePlatformPageProps,
    usePlatformForm,
    usePlatformHead,
} from './context';

// Adapters — each app picks the one matching its framework
export { defaultAdapter } from './adapters/default';
export { createInertiaAdapter } from './adapters/inertia';
export { createNextjsAdapter } from './adapters/nextjs';
