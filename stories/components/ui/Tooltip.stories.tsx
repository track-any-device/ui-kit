import type { Meta, StoryObj } from '@storybook/react';
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@trackany-device/components';

const meta: Meta<typeof Tooltip> = {
    title: 'UI/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [
        (Story) => (
            <TooltipProvider>
                <Story />
            </TooltipProvider>
        ),
    ],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>This is a tooltip</p>
            </TooltipContent>
        </Tooltip>
    ),
};

export const Sides: Story = {
    render: () => (
        <div className="flex items-center gap-6 p-12">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <Tooltip key={side}>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">{side}</Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>
                        <p>Tooltip on {side}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    ),
};
