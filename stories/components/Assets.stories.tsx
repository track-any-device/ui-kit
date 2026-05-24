import type { Meta, StoryObj } from '@storybook/react';

// Import assets directly via path alias to avoid build issues in stories
import avatar1  from '../../src/assets/media/avatars/300-1.png';
import avatar2  from '../../src/assets/media/avatars/300-2.png';
import avatar3  from '../../src/assets/media/avatars/300-3.png';
import avatar4  from '../../src/assets/media/avatars/300-4.png';
import avatar5  from '../../src/assets/media/avatars/300-5.png';
import avatar6  from '../../src/assets/media/avatars/300-6.png';
import avatar7  from '../../src/assets/media/avatars/300-7.png';
import avatar8  from '../../src/assets/media/avatars/300-8.png';
import avatar9  from '../../src/assets/media/avatars/300-9.png';
import avatar10 from '../../src/assets/media/avatars/300-10.png';

import ill1  from '../../src/assets/media/illustrations/1.svg';
import ill2  from '../../src/assets/media/illustrations/2.svg';
import ill3  from '../../src/assets/media/illustrations/3.svg';
import ill4  from '../../src/assets/media/illustrations/4.svg';
import ill5  from '../../src/assets/media/illustrations/5.svg';
import ill6  from '../../src/assets/media/illustrations/6.svg';
import ill7  from '../../src/assets/media/illustrations/7.svg';
import ill8  from '../../src/assets/media/illustrations/8.svg';
import ill9  from '../../src/assets/media/illustrations/9.svg';
import ill10 from '../../src/assets/media/illustrations/10.svg';
import ill11 from '../../src/assets/media/illustrations/11.svg';
import ill12 from '../../src/assets/media/illustrations/12.svg';

import ill1Dark  from '../../src/assets/media/illustrations/1-dark.svg';
import ill2Dark  from '../../src/assets/media/illustrations/2-dark.svg';
import ill3Dark  from '../../src/assets/media/illustrations/3-dark.svg';

const meta: Meta = {
    title: 'Assets/Media',
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10];
const ILLUSTRATIONS = [ill1, ill2, ill3, ill4, ill5, ill6, ill7, ill8, ill9, ill10, ill11, ill12];
const ILLUSTRATIONS_DARK = [ill1Dark, ill2Dark, ill3Dark];

export const Avatars: Story = {
    render: () => (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Avatar photos (300-series)</h2>
            <p className="text-sm text-muted-foreground">
                Import: <code className="text-xs bg-muted px-1 py-0.5 rounded">import avatar1 from '@trackany-device/components/assets'</code>
            </p>
            <div className="flex flex-wrap gap-3">
                {AVATARS.map((src, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <img src={src} alt={`Avatar ${i + 1}`} className="h-14 w-14 rounded-full object-cover border border-border" />
                        <span className="text-xs text-muted-foreground">avatar{i + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    ),
};

export const Illustrations: Story = {
    name: 'Illustrations (light)',
    render: () => (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Illustrations — light mode</h2>
            <p className="text-sm text-muted-foreground">
                12 of 35 shown. Import as <code className="text-xs bg-muted px-1 py-0.5 rounded">illustration1</code> …
                <code className="text-xs bg-muted px-1 py-0.5 rounded">illustration35</code>
            </p>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8">
                {ILLUSTRATIONS.map((src, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card p-3">
                        <img src={src} alt={`Illustration ${i + 1}`} className="h-16 w-16 object-contain" />
                        <span className="text-xs text-muted-foreground">{i + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    ),
};

export const IllustrationsDark: Story = {
    name: 'Illustrations (dark)',
    render: () => (
        <div className="dark space-y-4 rounded-xl bg-background p-6">
            <h2 className="text-lg font-semibold text-foreground">Illustrations — dark mode</h2>
            <p className="text-sm text-muted-foreground">
                Dark variants: <code className="text-xs bg-muted px-1 py-0.5 rounded">illustration1Dark</code> …
            </p>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
                {ILLUSTRATIONS_DARK.map((src, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-muted/20 p-3">
                        <img src={src} alt={`Illustration ${i + 1} dark`} className="h-16 w-16 object-contain" />
                        <span className="text-xs text-muted-foreground">{i + 1}-dark</span>
                    </div>
                ))}
            </div>
        </div>
    ),
};

export const UsageExample: Story = {
    name: 'Usage — empty state with illustration',
    render: () => (
        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
            <img src={ill5} alt="" className="h-28 w-28 object-contain" />
            <div>
                <h3 className="text-base font-semibold">No devices found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Add your first device to start tracking</p>
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Add device
            </button>
        </div>
    ),
};
