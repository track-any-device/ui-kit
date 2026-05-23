import type { ReactNode } from 'react';
import { Card, CardContent } from '../../components/ui/card';

interface AuthClassicLayoutProps {
    children: ReactNode;
    logo?: ReactNode;
    logoHref?: string;
    backgroundImage?: string;
    backgroundImageDark?: string;
}

export default function AuthClassicLayout({
    children,
    logo,
    logoHref = '/',
    backgroundImage,
    backgroundImageDark,
}: AuthClassicLayoutProps) {
    return (
        <>
            {(backgroundImage || backgroundImageDark) && (
                <style>{`
                    .auth-classic-bg { ${backgroundImage ? `background-image: url('${backgroundImage}');` : ''} }
                    .dark .auth-classic-bg { ${backgroundImageDark ? `background-image: url('${backgroundImageDark}');` : ''} }
                `}</style>
            )}
            <div className="flex flex-col items-center justify-center grow min-h-screen bg-center bg-no-repeat auth-classic-bg">
                {logo && (
                    <div className="m-5">
                        <a href={logoHref}>{logo}</a>
                    </div>
                )}
                <Card className="w-full max-w-[400px]">
                    <CardContent className="p-6">
                        {children}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
