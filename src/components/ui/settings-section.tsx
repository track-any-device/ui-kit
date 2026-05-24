import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

export interface SettingsSectionProps {
    /** Anchor id used by sidebar navigation */
    id: string;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function SettingsSection({ id, title, description, children }: SettingsSectionProps) {
    return (
        <Card id={id}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
