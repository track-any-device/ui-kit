import type { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressCircle } from '@trackany-device/components';

const meta: Meta = { title: 'Components/UI/Progress', parameters: { layout: 'padded' } };
export default meta;

export const Linear: StoryObj = {
    render: () => (
        <div className="space-y-4 max-w-sm">
            <div><p className="text-sm mb-1">25%</p><Progress value={25} /></div>
            <div><p className="text-sm mb-1">50%</p><Progress value={50} /></div>
            <div><p className="text-sm mb-1">75%</p><Progress value={75} /></div>
            <div><p className="text-sm mb-1">100%</p><Progress value={100} /></div>
        </div>
    ),
};

export const Circle: StoryObj = {
    render: () => (
        <div className="flex gap-6 items-center">
            <ProgressCircle value={25} size={48}><span className="text-xs font-bold">25%</span></ProgressCircle>
            <ProgressCircle value={60} size={64}><span className="text-xs font-bold">60%</span></ProgressCircle>
            <ProgressCircle value={90} size={80}><span className="text-sm font-bold">90%</span></ProgressCircle>
        </div>
    ),
};
