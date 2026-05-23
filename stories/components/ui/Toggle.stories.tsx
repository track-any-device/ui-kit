import type { Meta, StoryObj } from '@storybook/react';
import { Toggle, ToggleGroup, ToggleGroupItem } from '@track-any-device/components';
import { Bold, Italic, Underline } from 'lucide-react';

const meta: Meta = { title: 'Components/UI/Toggle', tags: ['autodocs'] };
export default meta;

export const Single: StoryObj = {
    render: () => (
        <div className="flex gap-2 p-4">
            <Toggle aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
            <Toggle aria-label="Italic" variant="outline"><Italic className="h-4 w-4" /></Toggle>
        </div>
    ),
};

export const Group: StoryObj = {
    render: () => (
        <div className="p-4">
            <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
        </div>
    ),
};
