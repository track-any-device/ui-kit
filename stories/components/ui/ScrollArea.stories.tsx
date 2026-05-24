import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta = { title: 'UI/ScrollArea', parameters: { layout: 'padded' } };
export default meta;
export const Placeholder: StoryObj = { render: () => <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">ScrollArea — story coming in next iteration.</p></div> };
