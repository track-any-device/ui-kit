import { cn } from '../lib/utils';

export type DeviceStatus = 'online' | 'offline' | 'idle' | 'moving' | 'error' | 'unknown';

const STATUS_CONFIG: Record<DeviceStatus, { label: string; dotClass: string; textClass: string; bgClass: string }> = {
    online:  { label: 'Online',  dotClass: 'bg-success',     textClass: 'text-success',     bgClass: 'bg-success/10 border-success/20' },
    moving:  { label: 'Moving',  dotClass: 'bg-primary',     textClass: 'text-primary',     bgClass: 'bg-primary/10 border-primary/20' },
    idle:    { label: 'Idle',    dotClass: 'bg-yellow-500',  textClass: 'text-yellow-600',  bgClass: 'bg-yellow-50 border-yellow-200' },
    offline: { label: 'Offline', dotClass: 'bg-muted-foreground', textClass: 'text-muted-foreground', bgClass: 'bg-muted border-border' },
    error:   { label: 'Error',   dotClass: 'bg-destructive', textClass: 'text-destructive', bgClass: 'bg-destructive/10 border-destructive/20' },
    unknown: { label: 'Unknown', dotClass: 'bg-muted-foreground', textClass: 'text-muted-foreground', bgClass: 'bg-muted border-border' },
};

interface DeviceStatusBadgeProps {
    status: DeviceStatus;
    showDot?: boolean;
    size?: 'sm' | 'md';
    className?: string;
}

export function DeviceStatusBadge({ status, showDot = true, size = 'md', className }: DeviceStatusBadgeProps) {
    const conf = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown;
    return (
        <span className={cn(
            'inline-flex items-center gap-1.5 rounded-full border font-medium',
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
            conf.bgClass, conf.textClass,
            className,
        )}>
            {showDot && (
                <span className={cn('size-1.5 rounded-full shrink-0', conf.dotClass,
                    (status === 'online' || status === 'moving') && 'animate-pulse',
                )} />
            )}
            {conf.label}
        </span>
    );
}
