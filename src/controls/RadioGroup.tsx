import type { ReactNode } from 'react';
import { RadioGroup as RadioGroupPrimitive, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from './Label';
import { cn } from '../lib/utils';

interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

interface RadioGroupProps {
    name?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    options: RadioOption[];
    error?: string;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    children?: ReactNode;
}

export function RadioGroup({
    name,
    value,
    defaultValue,
    onChange,
    options,
    error,
    className,
    orientation = 'vertical',
    children,
}: RadioGroupProps) {
    return (
        <div className={cn('space-y-1', className)}>
            <RadioGroupPrimitive
                name={name}
                value={value}
                defaultValue={defaultValue}
                onValueChange={onChange}
                className={cn(
                    'flex gap-3',
                    orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
                )}
            >
                {children ?? options.map((opt) => (
                    <div key={opt.value} className="flex items-start gap-2">
                        <RadioGroupItem
                            id={`${name}-${opt.value}`}
                            value={opt.value}
                            disabled={opt.disabled}
                            className="mt-0.5"
                        />
                        <div className="flex flex-col gap-0.5">
                            <Label htmlFor={`${name}-${opt.value}`} className="font-normal cursor-pointer">
                                {opt.label}
                            </Label>
                            {opt.description && (
                                <span className="text-xs text-muted-foreground">{opt.description}</span>
                            )}
                        </div>
                    </div>
                ))}
            </RadioGroupPrimitive>
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
    );
}
