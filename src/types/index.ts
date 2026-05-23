import type { ReactNode } from 'react';

export interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export type AuthLayoutVariant = 'branded' | 'classic' | 'split' | 'centered' | 'simple' | 'card';
