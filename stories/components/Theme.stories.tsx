import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '@trackany-device/components';

const THEMES = [
    { name: 'default',  label: 'Blue (Default)' },
    { name: 'blue',     label: 'Blue' },
    { name: 'neutral',  label: 'Neutral' },
    { name: 'slate',    label: 'Slate' },
    { name: 'gray',     label: 'Gray' },
    { name: 'red',      label: 'Red' },
    { name: 'green',    label: 'Green' },
    { name: 'purple',   label: 'Purple' },
    { name: 'orange',   label: 'Orange' },
    { name: 'rose',     label: 'Rose' },
    { name: 'sky',      label: 'Sky' },
    { name: 'yellow',   label: 'Yellow' },
    { name: 'fuchsia',  label: 'Fuchsia' },
    { name: 'amber',    label: 'Amber' },
    { name: 'pink',     label: 'Pink' },
    { name: 'lime',     label: 'Lime' },
    { name: 'cyan',     label: 'Cyan' },
    { name: 'emerald',  label: 'Emerald' },
    { name: 'violet',   label: 'Violet' },
    { name: 'teal',     label: 'Teal' },
    { name: 'indigo',   label: 'Indigo' },
] as const;

type ThemeName = (typeof THEMES)[number]['name'];

function ThemeCard({ theme, dark }: { theme: ThemeName; dark?: boolean }) {
    return (
        <div
            data-theme={theme}
            className={[
                'rounded-xl border border-border p-4 space-y-3',
                dark ? 'dark' : '',
            ].join(' ')}
            style={{
                background: 'var(--background, #ffffff)',
                color: 'var(--foreground, #0a0a0a)',
            }}
        >
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {theme}
                </span>
                {dark && (
                    <span className="text-xs text-muted-foreground">dark</span>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="primary">Primary</Button>
                <Button size="sm" variant="outline">Outline</Button>
                <Button size="sm" variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-2">
                <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                    Primary badge
                </span>
                <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                    Accent badge
                </span>
            </div>
            <div
                className="h-2 rounded-full"
                style={{ background: 'var(--primary)' }}
            />
        </div>
    );
}

const meta: Meta = {
    title: 'Design System/Themes',
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const AllThemesLight: Story = {
    name: 'All Themes — Light',
    render: () => (
        <div className="p-8">
            <h2 className="text-lg font-bold mb-6">All Themes — Light Mode</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {THEMES.map(t => (
                    <ThemeCard key={t.name} theme={t.name} />
                ))}
            </div>
        </div>
    ),
};

export const AllThemesDark: Story = {
    name: 'All Themes — Dark',
    render: () => (
        <div className="p-8" style={{ background: '#0a0a0a' }}>
            <h2 className="text-lg font-bold mb-6 text-white">All Themes — Dark Mode</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {THEMES.map(t => (
                    <ThemeCard key={t.name} theme={t.name} dark />
                ))}
            </div>
        </div>
    ),
};

export const SingleTheme: Story = {
    name: 'Single Theme (use toolbar)',
    render: () => (
        <div className="p-8 space-y-6">
            <p className="text-sm text-muted-foreground">
                Use the <strong>Theme</strong> and <strong>Color Mode</strong> dropdowns in the toolbar
                to preview any of the 21 brand themes in light or dark mode.
            </p>
            <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-2">
                <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                    Primary badge
                </span>
                <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                    Accent badge
                </span>
                <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: 'var(--primary-subtle)', color: 'var(--accent-foreground)' }}
                >
                    Subtle badge
                </span>
            </div>
            <div className="space-y-1.5">
                <div className="h-2 rounded-full" style={{ background: 'var(--primary)' }} />
                <div className="h-2 rounded-full" style={{ background: 'var(--primary-subtle)' }} />
                <div className="h-2 rounded-full bg-muted" />
            </div>
        </div>
    ),
};
