import type { ReactNode } from 'react';
import type { AuthLayoutProps, AuthLayoutVariant } from '../types';
import AuthCenteredLayout from './auth/AuthCenteredLayout';
import AuthSplitLayout from './auth/AuthSplitLayout';
import AuthSimpleLayout from './auth/AuthSimpleLayout';
import AuthCardLayout from './auth/AuthCardLayout';
import AuthBrandedLayout from './auth/AuthBrandedLayout';
import AuthClassicLayout from './auth/AuthClassicLayout';

interface Props extends AuthLayoutProps {
    variant?: AuthLayoutVariant;
    logo?: ReactNode;
    appName?: string;
    homeUrl?: string;
    brandTitle?: string;
    brandSubtitle?: string;
    brandImage?: string;
    brandImageDark?: string;
    backgroundImage?: string;
    backgroundImageDark?: string;
}

export function AuthLayout({ variant = 'split', ...props }: Props) {
    switch (variant) {
        case 'branded':  return <AuthBrandedLayout {...props} />;
        case 'classic':  return <AuthClassicLayout {...props} />;
        case 'centered': return <AuthCenteredLayout {...props} />;
        case 'simple':   return <AuthSimpleLayout {...props} />;
        case 'card':     return <AuthCardLayout {...props} />;
        default:         return <AuthSplitLayout {...props} />;
    }
}
