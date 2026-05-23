import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderPattern } from '@trackany-device/components';

const meta: Meta = { title: 'Components/UI/PlaceholderPattern', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="relative h-48 w-full rounded-xl border border-dashed border-gray-300 overflow-hidden">
            <PlaceholderPattern className="absolute inset-0 stroke-gray-200 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            <p className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">Empty state</p>
        </div>
    ),
};
