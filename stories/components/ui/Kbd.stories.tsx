import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '@trackany-device/components';

const meta: Meta = { title: 'Components/UI/Kbd', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="flex items-center gap-2 text-sm p-4">
            Press <Kbd>⌘K</Kbd> to open the command palette.
        </div>
    ),
};

export const Chord: StoryObj = {
    render: () => (
        <div className="flex items-center gap-1 p-4">
            <Kbd>Ctrl</Kbd> + <Kbd>/</Kbd>
        </div>
    ),
};
