import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta = { title: 'Components/UI/Resizable', parameters: { layout: 'padded' } };
export default meta;
export const Placeholder: StoryObj = { render: () => <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Resizable — story coming in next iteration.</p></div> };
