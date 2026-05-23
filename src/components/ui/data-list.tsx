/**
 * DataList — key/value display (HTML <dl>).
 *
 * Two flavours:
 *   - Pass `items` prop: array of { label, value, mono? }
 *   - Or compose with <DataListItem> children for richer cells
 *
 * <DataList items={[
 *   { label: 'Serial', value: 'P901-00042', mono: true },
 *   { label: 'Status', value: <Badge>Active</Badge> },
 * ]} />
 */
import * as React from 'react';

import { cn } from '../../lib/utils';

type Item = {
    label: string;
    value: React.ReactNode;
    mono?: boolean;
};

type Props = {
    items?: Item[];
    children?: React.ReactNode;
    className?: string;
};

export function DataList({ items, children, className }: Props) {
    return (
        <dl
            className={cn(
                'divide-y divide-border rounded-lg border bg-card',
                className,
            )}
        >
            {items
                ? items.map((item) => (
                      <DataListItem
                          key={item.label}
                          label={item.label}
                          mono={item.mono}
                      >
                          {item.value}
                      </DataListItem>
                  ))
                : children}
        </dl>
    );
}

export function DataListItem({
    label,
    mono,
    children,
}: {
    label: string;
    mono?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:w-40">
                {label}
            </dt>
            <dd
                className={cn(
                    'flex-1 text-sm text-foreground',
                    mono && 'font-mono',
                )}
            >
                {children}
            </dd>
        </div>
    );
}
