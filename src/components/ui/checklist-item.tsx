import * as React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Button } from './button';

export interface ChecklistItemProps {
    /** Lucide icon shown when the step is not yet done */
    icon: React.ElementType;
    title: string;
    description: string;
    done?: boolean;
    /** Highlights the item as the current active step */
    active?: boolean;
    /** Label for the primary CTA button; only shown when active and not done */
    action?: string;
    /** Called when the action button is clicked */
    onAction?: () => void;
    className?: string;
}

export function ChecklistItem({
    icon: Icon, title, description, done = false, active = false, action, onAction, className,
}: ChecklistItemProps) {
    return (
        <div className={cn(
            'flex items-start gap-4 rounded-xl border p-4 transition-colors',
            active && !done ? 'border-primary/40 bg-primary/5' : 'border-border',
            className,
        )}>
            <div className={cn(
                'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                done ? 'bg-green-100' : active ? 'bg-primary/10' : 'bg-muted',
            )}>
                {done
                    ? <CheckCircle2 className="h-5 w-5 text-green-600" />
                    : <Icon className={cn('h-4 w-4', active ? 'text-primary' : 'text-muted-foreground')} />}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <p className={cn('text-sm font-medium', done && 'line-through text-muted-foreground')}>{title}</p>
                    {done && (
                        <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50 shrink-0">Done</Badge>
                    )}
                    {active && !done && action && (
                        <Button size="sm" className="shrink-0 h-7 text-xs" onClick={onAction}>
                            {action}<ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                    )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
        </div>
    );
}
