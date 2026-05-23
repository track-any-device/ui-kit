import type { Meta, StoryObj } from '@storybook/react';
import { SettingsLayout } from '@track-any-device/components';

const meta: Meta<typeof SettingsLayout> = {
    title: 'Layouts/SettingsLayout',
    component: SettingsLayout,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SettingsLayout>;

export const Default: Story = {
    args: { title: 'Profile settings' },
    render: (args) => (
        <SettingsLayout {...args}>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" className="w-full rounded-lg border px-3 py-2 text-sm" defaultValue="Ahmad Faryab" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full rounded-lg border px-3 py-2 text-sm" defaultValue="ahmad@example.com" />
                </div>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    Save changes
                </button>
            </div>
        </SettingsLayout>
    ),
};
