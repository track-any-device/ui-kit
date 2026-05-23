import type { ReactNode } from 'react';
import type { AuthLayoutProps } from '../../types';
import { Card } from '../../components/Card';

interface Props extends AuthLayoutProps {
    logo?: ReactNode;
    homeUrl?: string;
}

export default function AuthCardLayout({ children, title, description, logo, homeUrl = '/' }: Props) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                {logo && (
                    <a href={homeUrl} className="self-center">
                        {logo}
                    </a>
                )}
                <Card>
                    <div className="px-10 pt-8 pb-0 text-center">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        {description && <p className="text-sm text-muted-foreground">{description}</p>}
                    </div>
                    <div className="px-10 py-8">
                        {children}
                    </div>
                </Card>
            </div>
        </div>
    );
}
