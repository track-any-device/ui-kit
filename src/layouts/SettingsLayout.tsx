import type { ReactNode } from 'react';

interface SettingsLayoutProps {
    children: ReactNode;
    title?: string;
}

export function SettingsLayout({ children, title }: SettingsLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
                {title && (
                    <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                )}
                <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
