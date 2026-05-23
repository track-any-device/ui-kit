'use client';

/**
 * CommandPalette — global Ctrl+K / ⌘K launcher.
 *
 * Renders a centred dialog with a fuzzy-searchable list of commands.
 * Mount once near the app root (already added in app.tsx via
 * <CommandPaletteRoot/>). Pass the commands as a prop or extend via
 * the global window event `command-palette:register`.
 *
 *   <CommandPaletteRoot commands={[
 *     { id: 'orders', label: 'Go to Orders', href: '/orders', icon: ShoppingBag },
 *   ]} />
 *
 * available in the consuming app.
 */
import { Command } from 'cmdk';
import type { LucideIcon } from 'lucide-react';
import { PlatformLink, usePlatformNavigate } from '../../platform/context';
import { Search } from 'lucide-react';
import * as React from 'react';

import { Dialog, DialogContent } from './dialog';
import { Kbd } from './kbd';
import { cn } from '../../lib/utils';

export type CommandItem = {
    id: string;
    label: string;
    description?: string;
    icon?: LucideIcon;
    href?: string;
    /** Custom handler — fires before closing the palette. */
    onSelect?: () => void;
    /** Group label; items without a group fall under "Commands". */
    group?: string;
    /** Extra search terms not visible in the label. */
    keywords?: string[];
};

type Props = {
    commands?: CommandItem[];
};

export function CommandPaletteRoot({ commands = [] }: Props) {
    const navigate = usePlatformNavigate();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    React.useEffect(() => {
        const onOpen = () => setOpen(true);
        window.addEventListener('command-palette:open', onOpen);
        return () =>
            window.removeEventListener('command-palette:open', onOpen);
    }, []);

    const groups = React.useMemo(() => {
        const buckets = new Map<string, CommandItem[]>();
        for (const cmd of commands) {
            const key = cmd.group ?? 'Commands';
            if (!buckets.has(key)) buckets.set(key, []);
            buckets.get(key)!.push(cmd);
        }
        return Array.from(buckets.entries());
    }, [commands]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                showCloseButton={false}
                className="overflow-hidden p-0 sm:max-w-[560px]"
            >
                <Command
                    label="Global command palette"
                    className="flex flex-col"
                >
                    <div className="flex items-center gap-2 border-b px-3 py-2.5">
                        <Search
                            aria-hidden="true"
                            className="size-4 text-muted-foreground"
                        />
                        <Command.Input
                            autoFocus
                            placeholder="Search commands…"
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                        <Kbd>esc</Kbd>
                    </div>
                    <Command.List className="max-h-[360px] overflow-y-auto p-1">
                        <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                            No matches.
                        </Command.Empty>
                        {groups.map(([group, items]) => (
                            <Command.Group
                                key={group}
                                heading={group}
                                className="px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1"
                            >
                                {items.map((cmd) => {
                                    const Icon = cmd.icon;
                                    const onSelect = () => {
                                        cmd.onSelect?.();
                                        if (cmd.href) navigate(cmd.href);
                                        setOpen(false);
                                    };
                                    return (
                                        <Command.Item
                                            key={cmd.id}
                                            value={[
                                                cmd.label,
                                                cmd.description ?? '',
                                                ...(cmd.keywords ?? []),
                                            ].join(' ')}
                                            onSelect={onSelect}
                                            className={cn(
                                                'flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-foreground transition-colors',
                                                'aria-selected:bg-accent aria-selected:text-accent-foreground',
                                            )}
                                        >
                                            {Icon && (
                                                <Icon
                                                    aria-hidden="true"
                                                    className="size-4 text-muted-foreground"
                                                />
                                            )}
                                            <span className="flex-1">
                                                {cmd.label}
                                            </span>
                                            {cmd.description && (
                                                <span className="text-xs text-muted-foreground">
                                                    {cmd.description}
                                                </span>
                                            )}
                                        </Command.Item>
                                    );
                                })}
                            </Command.Group>
                        ))}
                    </Command.List>
                </Command>
            </DialogContent>
        </Dialog>
    );
}

/** Convenience link for the top bar trigger — pairs a search icon + shortcut hint. */
export function CommandPaletteTrigger({
    className,
}: {
    className?: string;
}) {
    return (
        <button
            type="button"
            onClick={() =>
                window.dispatchEvent(new CustomEvent('command-palette:open'))
            }
            className={cn(
                'inline-flex items-center gap-2 rounded-md border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                className,
            )}
        >
            <Search aria-hidden="true" className="size-3.5" />
            <span>Search…</span>
            <Kbd className="ml-2">⌘K</Kbd>
        </button>
    );
}

/** Static fallback for SSR / tests where Link isn't useful. */
export function CommandPaletteLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return <PlatformLink href={href}>{children}</PlatformLink>;
}
