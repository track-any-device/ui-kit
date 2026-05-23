import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '@track-any-device/components';

const meta: Meta<typeof Avatar> = {
    title: 'UI/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
};

export const FallbackOnly: Story = {
    render: () => (
        <Avatar>
            <AvatarFallback>AF</AvatarFallback>
        </Avatar>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Avatar className="size-6">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
                <AvatarFallback>LG</AvatarFallback>
            </Avatar>
        </div>
    ),
};
