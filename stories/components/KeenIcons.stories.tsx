import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KeenIcon } from '@trackany-device/components';
import type { KeeniconsStyle } from '@trackany-device/components';

// Representative subset of KeenIcons for the story grid.
// See the full list at: packages/node/src/components/keenicons/assets/
const SAMPLE_ICONS = [
    'abstract-1', 'abstract-2', 'abstract-3',
    'add-files', 'add-folder', 'add-item',
    'address-book', 'airplane', 'alarm',
    'archive', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up',
    'badge', 'bar-chart', 'bell',
    'book', 'bookmark', 'briefcase',
    'calendar', 'camera', 'car',
    'chart-line', 'chart-pie', 'check',
    'cheque', 'clipboard', 'clock',
    'cloud', 'code', 'compass',
    'copy', 'credit-card', 'cross',
    'dashboard', 'data', 'delete',
    'delivery', 'device', 'document',
    'dots-square', 'dots', 'download',
    'drop', 'earth', 'edit',
    'element-1', 'element-2', 'element-3',
    'eye', 'eye-slash', 'file',
    'filter', 'flag', 'folder',
    'gear', 'gift', 'global',
    'heart', 'home', 'info-circle',
    'key', 'layers', 'like',
    'link', 'list', 'loading',
    'location', 'lock', 'logout',
    'mail', 'map', 'maximize',
    'menu', 'message', 'minimize',
    'minus', 'mobile', 'monitor',
    'moon', 'more', 'notification',
    'pencil', 'phone', 'picture',
    'pin', 'plus', 'printer',
    'profile', 'question', 'refresh',
    'route', 'search', 'security',
    'send', 'setting-2', 'setting-3',
    'share', 'shield', 'shop',
    'sidebar-left', 'sidebar-right', 'sign-in',
    'sign-out', 'sms', 'sort',
    'star', 'status', 'switch',
    'tablet', 'tag', 'timer',
    'toggle', 'trash', 'truck',
    'turn-left', 'turn-right', 'up-down',
    'upload', 'user', 'user-edit',
    'user-tick', 'users', 'verify',
    'wallet', 'warning', 'wifi',
    'wrench', 'zoom-in', 'zoom-out',
];

const STYLES: KeeniconsStyle[] = ['duotone', 'filled', 'solid', 'outline'];

function IconGrid({ iconStyle }: { iconStyle: KeeniconsStyle }) {
    const [query, setQuery] = useState('');
    const filtered = SAMPLE_ICONS.filter((i) => i.includes(query.toLowerCase()));

    return (
        <div className="p-6 space-y-4">
            <input
                className="w-full px-3 py-2 border border-border rounded-md text-sm"
                placeholder="Filter icons…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
                Showing {filtered.length} icons · style: <strong>{iconStyle}</strong>
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3">
                {filtered.map((icon) => (
                    <div
                        key={icon}
                        className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-accent cursor-default group"
                        title={icon}
                    >
                        <KeenIcon icon={icon} style={iconStyle} className="text-2xl" />
                        <span className="text-2xs text-muted-foreground text-center leading-tight truncate w-full">
                            {icon}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const meta: Meta = {
    title: 'Controls/KeenIcons',
    parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

export const Duotone: Story = {
    render: () => <IconGrid iconStyle="duotone" />,
};

export const Filled: Story = {
    render: () => <IconGrid iconStyle="filled" />,
};

export const Solid: Story = {
    render: () => <IconGrid iconStyle="solid" />,
};

export const Outline: Story = {
    render: () => <IconGrid iconStyle="outline" />,
};

export const Sizes: Story = {
    render: () => (
        <div className="p-6 flex items-end gap-6">
            {(['text-sm', 'text-base', 'text-xl', 'text-2xl', 'text-4xl', 'text-6xl'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                    <KeenIcon icon="map" style="duotone" className={size} />
                    <span className="text-2xs text-muted-foreground">{size}</span>
                </div>
            ))}
        </div>
    ),
};
