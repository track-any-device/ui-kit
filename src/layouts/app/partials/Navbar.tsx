'use client';

import { useState, type ReactNode } from 'react';
import type { NavItem } from '../../../types/navigation';
import { cn } from '../../../lib/utils';
import { ChevronDown, Menu, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';

interface NavbarProps {
    navItems?: NavItem[];
    currentUrl?: string;
    rightSlot?: ReactNode;
    className?: string;
}

function isActive(item: NavItem, currentUrl: string): boolean {
    if (!item.href || item.href === '#') return false;
    return currentUrl.startsWith(item.href);
}

function hasActiveChild(items: NavItem[], currentUrl: string): boolean {
    return items.some((item) => isActive(item, currentUrl) || (item.items && hasActiveChild(item.items, currentUrl)));
}

export function Navbar({ navItems = [], currentUrl = '', rightSlot, className }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        // relative so the mobile dropdown can be absolute-positioned
        <div className={cn('border-b border-border relative', className)}>
            <div className="container mx-auto px-4 flex justify-between items-center gap-2">
                {/* Desktop nav */}
                <nav className="hidden lg:flex items-stretch overflow-x-auto">
                    {navItems.map((item, index) => {
                        const active = isActive(item, currentUrl);
                        const childActive = item.items ? hasActiveChild(item.items, currentUrl) : false;
                        const highlighted = active || childActive;

                        if (item.items && item.items.length > 0) {
                            return (
                                <DropdownMenu key={index}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className={cn(
                                                'flex items-center gap-1.5 px-3 py-3.5 text-sm text-nowrap border-b-2 transition-colors',
                                                'hover:text-mono bg-transparent border-transparent',
                                                highlighted ? 'text-mono border-mono' : 'text-secondary-foreground',
                                            )}
                                        >
                                            {item.title}
                                            <ChevronDown className="size-3.5" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent sideOffset={0} className="min-w-[175px]">
                                        {item.items.map((child, ci) => (
                                            <DropdownMenuItem key={ci} asChild>
                                                <a href={child.href} className={cn(isActive(child, currentUrl) && 'bg-accent')}>
                                                    {child.title}
                                                </a>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            );
                        }

                        return (
                            <a
                                key={index}
                                href={item.href}
                                className={cn(
                                    'flex items-center px-3 py-3.5 text-sm text-nowrap border-b-2 transition-colors',
                                    'hover:text-mono border-transparent',
                                    highlighted ? 'text-mono border-mono' : 'text-secondary-foreground',
                                )}
                            >
                                {item.title}
                            </a>
                        );
                    })}
                </nav>

                {/* Mobile: hamburger on the left, right slot hidden */}
                <button
                    className="lg:hidden flex items-center justify-center size-9 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setMobileOpen((o) => !o)}
                    aria-label="Toggle navigation"
                >
                    {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </button>

                {rightSlot && <div className="hidden lg:flex items-center gap-4">{rightSlot}</div>}
            </div>

            {/* Mobile dropdown — absolute so it overlays content without shifting layout */}
            {mobileOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 z-50 border-b border-border bg-background shadow-md pb-2">
                    {navItems.map((item, i) =>
                        item.items && item.items.length > 0 ? (
                            <div key={i}>
                                <div className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    {item.title}
                                </div>
                                {item.items.map((child, ci) => (
                                    <a
                                        key={ci}
                                        href={child.href}
                                        className={cn(
                                            'block px-6 py-2 text-sm hover:bg-accent transition-colors',
                                            isActive(child, currentUrl) && 'text-primary font-medium',
                                        )}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {child.title}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <a
                                key={i}
                                href={item.href}
                                className={cn(
                                    'block px-4 py-2.5 text-sm hover:bg-accent transition-colors',
                                    isActive(item, currentUrl) && 'text-primary font-medium',
                                )}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.title}
                            </a>
                        ),
                    )}
                </div>
            )}
        </div>
    );
}
