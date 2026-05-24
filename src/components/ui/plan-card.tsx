import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Card, CardContent } from './card';
import { Separator } from './separator';
import { UsageMeter, type UsageMeterItem } from './usage-meter';

export interface PlanCardProps {
    /** Display name e.g. "Professional Plan" */
    name: string;
    /** Badge label shown next to name, e.g. "Active". Hidden when omitted. */
    status?: string;
    /** Primary price string, e.g. "PKR 8,500 / month" */
    price: string;
    /** Secondary descriptor line, e.g. "Up to 500 devices · 10 users" */
    description?: string;
    /** Renewal / billing info line */
    renewal?: string;
    /** Action placed top-right (typically an upgrade Button) */
    action?: React.ReactNode;
    /** Usage items rendered as a UsageMeter grid below the separator */
    usage?: UsageMeterItem[];
    /** Number of columns in the usage grid (default 3) */
    columns?: 2 | 3 | 4;
    className?: string;
}

const COLS: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
};

export function PlanCard({
    name, status, price, description, renewal, action, usage, columns = 3, className,
}: PlanCardProps) {
    return (
        <Card className={cn('border-primary/30 bg-primary/5', className)}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold">{name}</p>
                            {status && (
                                <Badge className="bg-primary text-primary-foreground text-xs">{status}</Badge>
                            )}
                        </div>
                        {price && <p className="text-sm text-muted-foreground">{price}</p>}
                        {description && <p className="text-sm text-muted-foreground">{description}</p>}
                        {renewal && <p className="text-xs text-muted-foreground">{renewal}</p>}
                    </div>
                    {action && <div className="shrink-0">{action}</div>}
                </div>

                {usage && usage.length > 0 && (
                    <>
                        <Separator className="my-4" />
                        <div className={cn('grid gap-4', COLS[columns] ?? COLS[3])}>
                            {usage.map((item) => (
                                <UsageMeter key={item.label} {...item} compact={columns === 4} />
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
