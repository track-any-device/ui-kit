import { cn } from '../lib/utils';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export interface DriverCardData {
    id: string;
    name: string;
    licenseNumber?: string;
    phone?: string;
    avatar?: string;
    status?: 'active' | 'inactive' | 'on-trip';
    vehicleRegistration?: string;
    href?: string;
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
    active:   { label: 'Active',   className: 'text-success' },
    inactive: { label: 'Inactive', className: 'text-muted-foreground' },
    'on-trip':{ label: 'On Trip',  className: 'text-primary' },
};

function getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

interface DriverCardProps {
    driver: DriverCardData;
    className?: string;
    onClick?: (driver: DriverCardData) => void;
}

export function DriverCard({ driver, className, onClick }: DriverCardProps) {
    const statusConf = driver.status ? STATUS_LABELS[driver.status] : null;
    const content = (
        <Card className={cn('transition-shadow hover:shadow-md cursor-pointer', className)} onClick={() => onClick?.(driver)}>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="size-10 shrink-0">
                        {driver.avatar && <AvatarImage src={driver.avatar} alt={driver.name} />}
                        <AvatarFallback className="text-xs font-medium">{getInitials(driver.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-mono text-sm truncate">{driver.name}</p>
                            {statusConf && (
                                <span className={cn('text-xs font-medium shrink-0', statusConf.className)}>
                                    {statusConf.label}
                                </span>
                            )}
                        </div>
                        {driver.licenseNumber && (
                            <p className="text-xs text-muted-foreground mt-0.5">Lic: {driver.licenseNumber}</p>
                        )}
                        {driver.vehicleRegistration && (
                            <p className="text-xs text-muted-foreground">Vehicle: {driver.vehicleRegistration}</p>
                        )}
                        {driver.phone && (
                            <p className="text-xs text-muted-foreground">{driver.phone}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
    if (driver.href) return <a href={driver.href} className="block no-underline">{content}</a>;
    return content;
}
