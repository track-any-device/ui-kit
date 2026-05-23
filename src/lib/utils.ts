import type { PlatformLinkProps } from '../platform/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<PlatformLinkProps['href']>): string {
    return url;
}
