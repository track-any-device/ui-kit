'use client';

import type { ReactNode } from 'react';
import type { NavItem } from '../../../types/navigation';
import { cn } from '../../../lib/utils';
import { ChevronDown } from 'lucide-react';
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
    return (
        <div className={cn('border-b border-border', className)}>
            <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
                <nav className="flex items-stretch overflow-x-auto">
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
                                                <a
                                                    href={child.href}
                                                    className={cn(isActive(child, currentUrl) && 'bg-accent')}
                                                >
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
                {rightSlot && <div className="flex items-center gap-4">{rightSlot}</div>}
            </div>
        </div>
    );
}
