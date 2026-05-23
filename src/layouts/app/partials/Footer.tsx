import type { AppLayoutFooterLink } from '../layout-types';
import { cn } from '../../../lib/utils';

interface FooterProps {
    links?: AppLayoutFooterLink[];
    copyright?: string;
    className?: string;
}

export function Footer({ links = [], copyright, className }: FooterProps) {
    const year = new Date().getFullYear();
    return (
        <footer className={cn('footer border-t border-border', className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
                    <div className="flex order-2 md:order-1 gap-2 font-normal text-sm">
                        <span className="text-muted-foreground">{year} &copy;</span>
                        {copyright && (
                            <span className="text-secondary-foreground">{copyright}</span>
                        )}
                    </div>
                    {links.length > 0 && (
                        <nav className="flex order-1 md:order-2 gap-4 font-normal text-sm text-muted-foreground">
                            {links.map((link) => (
                                <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </footer>
    );
}
