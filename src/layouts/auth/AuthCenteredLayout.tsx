import type { ReactNode } from 'react';
import type { AuthLayoutProps } from '../../types';

interface Props extends AuthLayoutProps {
    logo?: ReactNode;
    appName?: string;
    homeUrl?: string;
    bannerUrl?: string;
}

export default function AuthCenteredLayout({ children, title, description, logo, appName, homeUrl = '/', bannerUrl = '/banner.png' }: Props) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-background bg-cover bg-center bg-no-repeat p-6"
            style={{ backgroundImage: `url(${bannerUrl})` }}>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary-subtle/60" />

            <div className="relative z-10 w-full max-w-md">
                <a href={homeUrl} className="mb-6 flex flex-col items-center gap-2 text-foreground">
                    {logo}
                    {appName && <span className="font-display text-sm font-semibold">{appName}</span>}
                </a>

                <div className="rounded-2xl border bg-card/95 p-8 shadow-lg backdrop-blur">
                    <div className="mb-6 text-center">
                        <h1 className="font-display text-xl font-semibold text-foreground">{title}</h1>
                        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
                    </div>
                    {children}
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                    <a href="/terms" className="hover:text-foreground hover:underline">Terms</a>
                    {' · '}
                    <a href="/privacy" className="hover:text-foreground hover:underline">Privacy</a>
                    {' · '}
                    <a href="/cookies" className="hover:text-foreground hover:underline">Cookies</a>
                </p>
            </div>
        </div>
    );
}
