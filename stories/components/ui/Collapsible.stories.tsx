import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent, Button } from '@track-any-device/components';
import { useState } from 'react';

const meta: Meta = { title: 'Components/UI/Collapsible', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <Collapsible open={open} onOpenChange={setOpen} className="max-w-sm space-y-2 p-4">
                <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">{open ? 'Hide' : 'Show'} advanced options</Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 rounded border p-3 text-sm">
                    <p>Advanced option 1</p>
                    <p>Advanced option 2</p>
                </CollapsibleContent>
            </Collapsible>
        );
    },
};
