import type { PlatformLinkProps } from '../platform/types';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<PlatformLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href: NonNullable<PlatformLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
};
