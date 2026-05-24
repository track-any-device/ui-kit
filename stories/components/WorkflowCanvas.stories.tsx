import type { Meta, StoryObj } from '@storybook/react';

// WorkflowCanvas uses complex drag-and-drop dependencies.
// Render a representative static placeholder.
const meta: Meta = { title: 'Components/UI/WorkflowCanvas', tags: ['autodocs'] };
export default meta;

export const Placeholder: StoryObj = {
    render: () => (
        <div className="h-96 w-full rounded-xl border border-dashed border-border flex items-center justify-center bg-muted/30">
            <div className="text-center text-muted-foreground space-y-2">
                <p className="font-semibold">WorkflowCanvas</p>
                <p className="text-xs">Drag-and-drop node editor — renders in the full app context</p>
            </div>
        </div>
    ),
};
