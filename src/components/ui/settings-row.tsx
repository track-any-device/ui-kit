import * as React from 'react';
import { cn } from '../../lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface SettingsRowProps {
    icon: LucideIcon;
    title: string;
    description: string;
    /** Any node — typically a Switch, Button, or badge */
    action: React.ReactNode;
    className?: string;
}

export function SettingsRow({ icon: Icon, title, description, action, className }: SettingsRowProps) {
    return (
        <div className={cn(
            'flex items-center justify-between gap-4 px-5 py-3.5 border-b border-border last:border-0',
            className,
        )}>
            <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2 shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
            </div>
            <div className="shrink-0">{action}</div>
        </div>
    );
}
