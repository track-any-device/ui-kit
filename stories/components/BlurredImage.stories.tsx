import type { Meta, StoryObj } from '@storybook/react';
import { BlurredImage } from '@track-any-device/components';

const meta: Meta<typeof BlurredImage> = {
    title: 'Components/CMS/BlurredImage',
    component: BlurredImage,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BlurredImage>;

export const WithImage: Story = {
    args: {
        src: 'https://picsum.photos/400/300',
        alt: 'Sample device',
        rounded: 'xl',
        blur: 'xl',
    },
    render: (args) => <div className="w-64 p-4"><BlurredImage {...args} /></div>,
};

export const NoImage: Story = {
    args: { src: null, alt: 'Missing image', rounded: 'lg' },
    render: (args) => <div className="w-64 p-4"><BlurredImage {...args} /></div>,
};
