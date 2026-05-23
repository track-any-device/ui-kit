import { cn } from '../lib/utils';
import { Card, CardContent } from '../components/ui/card';
import { Badge, badgeVariants } from '../components/ui/badge';

export type VehicleStatus = 'online' | 'offline' | 'idle' | 'moving' | 'stopped';

export interface VehicleCardData {
    id: string;
    registration: string;
    make?: string;
    model?: string;
    status: VehicleStatus;
    driver?: string;
    lastSeen?: string;
    location?: string;
    speed?: number;
    href?: string;
}

const STATUS_CONFIG: Record<VehicleStatus, { label: string; className: string }> = {
    online:  { label: 'Online',  className: 'bg-success/10 text-success border-success/20' },
    moving:  { label: 'Moving',  className: 'bg-primary/10 text-primary border-primary/20' },
    idle:    { label: 'Idle',    className: 'bg-warning/10 text-warning border-warning/20' },
    stopped: { label: 'Stopped', className: 'bg-muted text-muted-foreground border-border' },
    offline: { label: 'Offline', className: 'bg-danger-subtle text-destructive border-destructive/20' },
};

interface VehicleCardProps {
    vehicle: VehicleCardData;
    className?: string;
    onClick?: (vehicle: VehicleCardData) => void;
}

export function VehicleCard({ vehicle, className, onClick }: VehicleCardProps) {
    const status = STATUS_CONFIG[vehicle.status];
    const content = (
        <Card className={cn('transition-shadow hover:shadow-md cursor-pointer', className)} onClick={() => onClick?.(vehicle)}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-mono text-sm">{vehicle.registration}</span>
                            <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium', status.className)}>
                                {status.label}
                            </span>
                        </div>
                        {(vehicle.make || vehicle.model) && (
                            <p className="text-xs text-muted-foreground truncate">{[vehicle.make, vehicle.model].filter(Boolean).join(' ')}</p>
                        )}
                        {vehicle.driver && (
                            <p className="text-xs text-muted-foreground mt-1 truncate">Driver: {vehicle.driver}</p>
                        )}
                        {vehicle.location && (
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{vehicle.location}</p>
                        )}
                    </div>
                    {vehicle.speed !== undefined && (
                        <div className="text-right shrink-0">
                            <p className="text-lg font-bold text-mono">{vehicle.speed}</p>
                            <p className="text-xs text-muted-foreground">km/h</p>
                        </div>
                    )}
                </div>
                {vehicle.lastSeen && (
                    <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">{vehicle.lastSeen}</p>
                )}
            </CardContent>
        </Card>
    );

    if (vehicle.href) return <a href={vehicle.href} className="block no-underline">{content}</a>;
    return content;
}
