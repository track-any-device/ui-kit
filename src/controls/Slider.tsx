import type { ComponentProps } from 'react';
import { Slider as SliderPrimitive, SliderThumb } from '../components/ui/slider';
import { Label } from './Label';
import { cn } from '../lib/utils';

interface SliderProps extends ComponentProps<typeof SliderPrimitive> {
    label?: string;
    showValue?: boolean;
    error?: string;
    className?: string;
}

export function Slider({ label, showValue, error, className, ...props }: SliderProps) {
    const currentValue = Array.isArray(props.value) ? props.value : props.defaultValue;
    const displayValue = Array.isArray(currentValue) ? currentValue[0] : currentValue;

    return (
        <div className={cn('space-y-2', className)}>
            {(label || showValue) && (
                <div className="flex items-center justify-between">
                    {label && <Label className="font-normal">{label}</Label>}
                    {showValue && displayValue !== undefined && (
                        <span className="text-sm text-muted-foreground">{displayValue}</span>
                    )}
                </div>
            )}
            <SliderPrimitive {...props}>
                <SliderThumb />
            </SliderPrimitive>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
