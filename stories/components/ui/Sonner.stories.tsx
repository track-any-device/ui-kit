import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@track-any-device/components';
import { toast, Toaster } from 'sonner';

// Sonner wraps the `sonner` Toaster — show it standalone for Storybook.
const meta: Meta = { title: 'Components/UI/Sonner', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="p-6 space-y-2">
            <Toaster position="bottom-right" />
            <Button onClick={() => toast.success('Device synced successfully')}>Success toast</Button>
            <Button variant="outline" onClick={() => toast.error('Connection failed')}>Error toast</Button>
            <Button variant="ghost" onClick={() => toast('Beat assignment updated')}>Info toast</Button>
        </div>
    ),
};
