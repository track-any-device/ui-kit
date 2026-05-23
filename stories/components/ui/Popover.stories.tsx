import type { Meta, StoryObj } from '@storybook/react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@trackany-device/components';

const meta: Meta<typeof Popover> = {
    title: 'UI/Popover',
    component: Popover,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="space-y-2">
                    <h4 className="font-medium text-sm">Popover content</h4>
                    <p className="text-sm text-muted-foreground">
                        Place any content here — forms, lists, or information panels.
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    ),
};
