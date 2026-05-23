import type { ReactNode } from 'react';
import type { BreadcrumbItem } from './navigation';

export type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export type AppVariant = 'header' | 'sidebar';

export type FlashToast = {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
};

/**
 * 'branded'  → split screen: form card left, full branded panel right (Metronic)
 * 'classic'  → centered card on a full-page background image (Metronic)
 * 'split'    → left feature panel + right form card (legacy default)
 * 'centered' → single centred card on auth background image (legacy)
 * 'simple'   → minimal, no background
 * 'card'     → card-only, plain background
 */
export type AuthLayoutVariant = 'branded' | 'classic' | 'split' | 'centered' | 'simple' | 'card';

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
    variant?: AuthLayoutVariant;
};
