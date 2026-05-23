import { DateField as DateFieldPrimitive, DateInput, DateSegment } from '../components/ui/datefield';
import { Label } from './Label';
import { cn } from '../lib/utils';
import type { DateValue } from 'react-aria-components';
import type { DateFieldProps } from 'react-aria-components';

interface DateFieldControlProps<T extends DateValue> extends DateFieldProps<T> {
    label?: string;
    error?: string;
    className?: string;
    inputClassName?: string;
}

export function DateField<T extends DateValue>({
    label,
    error,
    className,
    inputClassName,
    id,
    ...props
}: DateFieldControlProps<T>) {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            {label && <Label htmlFor={id}>{label}</Label>}
            <DateFieldPrimitive {...props}>
                <DateInput className={cn(
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors',
                    'placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    error && 'border-destructive focus-within:ring-destructive',
                    inputClassName,
                )} />
            </DateFieldPrimitive>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
