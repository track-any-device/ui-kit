import type { ComponentProps } from 'react';
import { Switch as SwitchPrimitive, SwitchWrapper } from '../components/ui/switch';
import { Label } from './Label';
import { cn } from '../lib/utils';

interface SwitchProps extends ComponentProps<typeof SwitchPrimitive> {
    label?: string;
    description?: string;
    error?: string;
    labelClassName?: string;
}

export function Switch({ label, description, error, labelClassName, className, id, ...props }: SwitchProps) {
    const switchId = id ?? `switch-${Math.random().toString(36).slice(2, 7)}`;
    return (
        <SwitchWrapper className={cn('flex items-center gap-3', className)}>
            <SwitchPrimitive id={switchId} {...props} />
            {(label || description) && (
                <div className="flex flex-col gap-0.5">
                    {label && (
                        <Label htmlFor={switchId} className={cn('font-normal cursor-pointer', labelClassName)}>
                            {label}
                        </Label>
                    )}
                    {description && <span className="text-xs text-muted-foreground">{description}</span>}
                </div>
            )}
            {error && <p className="text-xs text-destructive">{error}</p>}
        </SwitchWrapper>
    );
}
