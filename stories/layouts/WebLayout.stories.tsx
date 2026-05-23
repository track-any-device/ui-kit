import type { Meta, StoryObj } from '@storybook/react';
import { WebLayout } from '@trackany-device/components';

const meta: Meta = {
    title: 'Layouts/WebLayout',
    component: WebLayout,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = {
    render: () => (
        <WebLayout>
            <div className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-4">Page title</h1>
                <p className="text-muted-foreground">Body content goes here.</p>
            </div>
        </WebLayout>
    ),
};
