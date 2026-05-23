/**
 * AppLayout — tenant operational portal layout (sidebar variant).
 *
 * This is the thin dispatcher used by Inertia page layouts in the core app.
 * It delegates to AppSidebarLayout which wraps AppTopNav.
 *
 * NOTE: AppTopNav is an app-level component — it uses wayfinder routes and
 * app-specific navigation that cannot be defined in this package. The consuming
 * app (core/) provides the AppTopNav via app-sidebar-layout.tsx; this file
 * exists here so the package exports a consistent AppLayout type.
 *
 * Use in app layouts:
 *   import AppLayoutTemplate from '@track-any-device/components/layouts/app/app-sidebar-layout';
 */
export type AppLayoutProps = {
    breadcrumbs?: Array<{ title: string; href: string }>;
    children: React.ReactNode;
};

/**
 * Placeholder re-exported for type compatibility. The real implementation is
 * in core/resources/js/layouts/app-layout.tsx which uses the app's own
 * app-sidebar-layout.tsx (which knows about AppTopNav).
 */
export default function AppLayout({
    children,
}: AppLayoutProps) {
    return <>{children}</>;
}
