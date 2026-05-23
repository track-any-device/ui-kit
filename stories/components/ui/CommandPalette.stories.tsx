import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette } from '@track-any-device/components';

// CommandPalette uses @inertiajs/react usePage for global search.
const meta: Meta = { title: 'Components/UI/CommandPalette', tags: ['autodocs'] };
export default meta;

export const Preview: StoryObj = {
    render: () => (
        <div className="p-6 text-sm text-muted-foreground">
            <p>CommandPalette is triggered by <kbd className="px-1.5 py-0.5 border rounded text-xs font-mono">⌘K</kbd> in the app. It requires Inertia context for navigation — open the full app to preview it.</p>
        </div>
    ),
};
