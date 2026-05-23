import { cn } from '../lib/utils';
import { Card, CardContent } from '../components/ui/card';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface IncidentCardData {
    id: string;
    title: string;
    description?: string;
    severity: IncidentSeverity;
    vehicle?: string;
    driver?: string;
    location?: string;
    timestamp?: string;
    resolved?: boolean;
    href?: string;
}

const SEVERITY_CONFIG: Record<IncidentSeverity, { icon: typeof AlertTriangle; iconClass: string; borderClass: string; bgClass: string }> = {
    critical: { icon: AlertTriangle, iconClass: 'text-destructive', borderClass: 'border-destructive/30', bgClass: 'bg-destructive/5' },
    high:     { icon: AlertCircle,   iconClass: 'text-orange-500',  borderClass: 'border-orange-300',    bgClass: 'bg-orange-50' },
    medium:   { icon: AlertTriangle, iconClass: 'text-yellow-500',  borderClass: 'border-yellow-300',    bgClass: 'bg-yellow-50' },
    low:      { icon: Info,           iconClass: 'text-blue-500',    borderClass: 'border-blue-200',      bgClass: 'bg-blue-50' },
    info:     { icon: Info,           iconClass: 'text-muted-foreground', borderClass: 'border-border',  bgClass: 'bg-muted/50' },
};

interface IncidentCardProps {
    incident: IncidentCardData;
    className?: string;
    onClick?: (incident: IncidentCardData) => void;
}

export function IncidentCard({ incident, className, onClick }: IncidentCardProps) {
    const conf = SEVERITY_CONFIG[incident.severity];
    const Icon = conf.icon;
    const content = (
        <Card className={cn('transition-shadow hover:shadow-md cursor-pointer border', conf.borderClass, incident.resolved && 'opacity-60', className)} onClick={() => onClick?.(incident)}>
            <CardContent className={cn('p-4', conf.bgClass)}>
                <div className="flex items-start gap-3">
                    <Icon className={cn('size-4 shrink-0 mt-0.5', conf.iconClass)} />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-mono text-sm">{incident.title}</p>
                            {incident.resolved && (
                                <span className="text-xs text-success font-medium shrink-0">Resolved</span>
                            )}
                        </div>
                        {incident.description && (
                            <p className="text-xs text-muted-foreground mt-1">{incident.description}</p>
                        )}
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
                            {incident.vehicle && <span className="text-xs text-muted-foreground">Vehicle: {incident.vehicle}</span>}
                            {incident.driver && <span className="text-xs text-muted-foreground">Driver: {incident.driver}</span>}
                            {incident.location && <span className="text-xs text-muted-foreground">{incident.location}</span>}
                        </div>
                        {incident.timestamp && (
                            <p className="text-xs text-muted-foreground mt-1">{incident.timestamp}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
    if (incident.href) return <a href={incident.href} className="block no-underline">{content}</a>;
    return content;
}
