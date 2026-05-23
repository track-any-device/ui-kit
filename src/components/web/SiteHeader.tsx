'use client';

import { LayoutDashboard, Menu, Moon, ShoppingCart, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useDarkMode } from '../../hooks/use-dark-mode';
import { cn } from '../../lib/utils';
import { PlatformLink } from '../../platform/context';

type NavLink = { id: number; label: string; href: string; target: string };

export type SiteHeaderAuth = {
    user: { name: string; role: string } | null;
};

export type SiteHeaderHosts = {
    central?: string | null;
    admin?: string | null;
    my?: string | null;
};

const FALLBACK_LINKS: NavLink[] = [
    { id: 1, label: 'Products',   href: '/products',       target: '_self' },
    { id: 2, label: 'Solutions',  href: '/solutions',      target: '_self' },
    { id: 3, label: 'TAD101 Docs',href: '/docs/tad101',   target: '_self' },
    { id: 4, label: 'Industries', href: '/industries',     target: '_self' },
    { id: 5, label: 'Blog',       href: '/blog',           target: '_self' },
    { id: 6, label: 'About',      href: '/about',          target: '_self' },
    { id: 7, label: 'Contact',    href: '/contact',        target: '_self' },
];

function DefaultAppLogo() {
    const appName = (typeof window !== 'undefined' && (window as any).AppConfig?.appName) || 'Fleet Tracking';
    return <span className="font-display text-sm font-semibold text-foreground">{appName}</span>;
}

interface SiteHeaderProps {
    AppLogo?: React.ComponentType;
    navLinks?: NavLink[];
    auth?: SiteHeaderAuth;
    hosts?: SiteHeaderHosts;
}

export default function SiteHeader({ AppLogo = DefaultAppLogo, navLinks, auth, hosts }: SiteHeaderProps) {
    const links = navLinks?.length ? navLinks : FALLBACK_LINKS;
    const user = auth?.user ?? null;

    const dashboardHref = (() => {
        if (user?.role === 'admin') return hosts?.admin ?? '/admin';
        return hosts?.my ?? '/dashboard';
    })();
    const dashboardIsExternal = /^https?:\/\//.test(dashboardHref);

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 24);
        handler();
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <header className={cn(
            'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
            scrolled ? 'border-border bg-background/85 backdrop-blur-md' : 'border-transparent bg-background/0',
        )}>
            <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5">
                <PlatformLink href="/" className="flex shrink-0 items-center gap-2" aria-label="Home">
                    <AppLogo />
                </PlatformLink>

                <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
                    {links.map((link) => (
                        <li key={link.id}><NavItem link={link} /></li>
                    ))}
                </ul>

                <div className="ml-auto flex items-center gap-1.5">
                    <DarkModeToggle />

                    <Button asChild variant="ghost" size="icon" aria-label="Cart">
                        <PlatformLink href="/cart"><ShoppingCart className="size-4" /></PlatformLink>
                    </Button>

                    <Button asChild size="sm" className="hidden sm:inline-flex">
                        <PlatformLink href={dashboardHref} {...(dashboardIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                            <LayoutDashboard className="size-4" />
                            {user?.role === 'admin' ? 'Admin' : 'Dashboard'}
                        </PlatformLink>
                    </Button>

                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:max-w-sm">
                            <SheetHeader><SheetTitle>Menu</SheetTitle></SheetHeader>
                            <ul className="mt-2 flex flex-col gap-1 px-2">
                                {links.map((link) => (
                                    <li key={link.id}>
                                        <NavItem link={link} mobile onNavigate={() => setMobileOpen(false)} />
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 flex flex-col gap-2 px-2">
                                <Button asChild>
                                    <PlatformLink href={dashboardHref} onClick={() => setMobileOpen(false)}>
                                        <LayoutDashboard className="size-4" />
                                        {user?.role === 'admin' ? 'Admin' : 'Dashboard'}
                                    </PlatformLink>
                                </Button>
                                <Button asChild variant="outline">
                                    <PlatformLink href="/cart" onClick={() => setMobileOpen(false)}>
                                        <ShoppingCart className="size-4" /> Cart
                                    </PlatformLink>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}

function NavItem({ link, mobile, onNavigate }: { link: NavLink; mobile?: boolean; onNavigate?: () => void }) {
    const baseClass = mobile
        ? 'block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground'
        : 'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground';

    if (link.href.startsWith('#')) {
        return (
            <PlatformLink href={link.href} onClick={(e) => { e?.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); onNavigate?.(); }} className={baseClass}>
                {link.label}
            </PlatformLink>
        );
    }

    return (
        <PlatformLink href={link.href} target={link.target === '_blank' ? '_blank' : undefined} rel={link.target === '_blank' ? 'noopener noreferrer' : undefined} className={baseClass} onClick={onNavigate}>
            {link.label}
        </PlatformLink>
    );
}

function DarkModeToggle() {
    const { isDark, toggle } = useDarkMode();
    return (
        <Button variant="ghost" size="icon" onClick={toggle} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
    );
}
