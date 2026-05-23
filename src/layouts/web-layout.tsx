import { PlatformLink } from '../platform/context';
import SiteFooter from '../components/web/SiteFooter';
import SiteHeader from '../components/web/SiteHeader';

/**
 * WebLayout — wraps central-host public pages with the shared shadcn
 * header + footer. Token-driven, so it respects the active tenant
 * data-theme + light/dark mode.
 *
 * Pages with a full-bleed hero (home/) render SiteHeader / SiteFooter
 * directly so they can sit above and below the hero without the
 * fixed-header offset.
 *
 */
export default function WebLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="mt-16 flex flex-1 flex-col">{children}</main>
            <SiteFooter />
        </div>
    );
}
