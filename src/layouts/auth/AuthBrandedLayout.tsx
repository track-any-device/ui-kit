import type { ReactNode } from 'react';
import { Card, CardContent } from '../../components/ui/card';

interface AuthBrandedLayoutProps {
    children: ReactNode;
    logo?: ReactNode;
    brandTitle?: string;
    brandSubtitle?: string;
    brandImage?: string;
    brandImageDark?: string;
    logoHref?: string;
}

export default function AuthBrandedLayout({
    children,
    logo,
    brandTitle = 'Secure Dashboard Access',
    brandSubtitle = 'A robust authentication gateway ensuring secure, efficient access.',
    brandImage,
    brandImageDark,
    logoHref = '/',
}: AuthBrandedLayoutProps) {
    return (
        <>
            {(brandImage || brandImageDark) && (
                <style>{`
                    .auth-branded-bg { ${brandImage ? `background-image: url('${brandImage}');` : ''} }
                    .dark .auth-branded-bg { ${brandImageDark ? `background-image: url('${brandImageDark}');` : ''} }
                `}</style>
            )}
            <div className="grid lg:grid-cols-2 grow min-h-screen">
                {/* Form panel */}
                <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
                    <Card className="w-full max-w-[400px]">
                        <CardContent className="p-6">
                            {children}
                        </CardContent>
                    </Card>
                </div>

                {/* Brand panel */}
                <div className={`lg:rounded-xl lg:border lg:border-border lg:m-5 order-1 lg:order-2 bg-top xxl:bg-center xl:bg-cover bg-no-repeat auth-branded-bg bg-muted`}>
                    <div className="flex flex-col p-8 lg:p-16 gap-4">
                        {logo && (
                            <a href={logoHref} className="shrink-0">
                                {logo}
                            </a>
                        )}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-2xl font-semibold text-mono">{brandTitle}</h3>
                            <p className="text-base font-medium text-secondary-foreground">{brandSubtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
