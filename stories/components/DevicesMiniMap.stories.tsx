import type { Meta, StoryObj } from '@storybook/react';

// DevicesMiniMap uses Google Maps JS API (VITE_GOOGLE_MAPS_API_KEY).
// Render a placeholder — the real component renders in the full app.
const meta: Meta = { title: 'Components/Devices/DevicesMiniMap', tags: ['autodocs'] };
export default meta;

export const Placeholder: StoryObj = {
    render: () => (
        <div className="h-64 w-full rounded-xl bg-muted/40 border border-border flex items-center justify-center">
            <div className="text-center text-muted-foreground space-y-1">
                <p className="font-semibold text-sm">DevicesMiniMap</p>
                <p className="text-xs">Requires VITE_GOOGLE_MAPS_API_KEY — renders in full app</p>
            </div>
        </div>
    ),
};
