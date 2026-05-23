import type { Meta, StoryObj } from '@storybook/react';
import { SettingsLayout } from '@track-any-device/components';
import { MockPage } from '../../../.storybook/mocks/inertia-react';
import { mockPageProps } from '../../_mock-data';
import { useState } from 'react';

const meta: Meta = {
    title: 'Apps/Login/Settings/Profile',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [(Story) => <MockPage props={mockPageProps} url="/settings/profile"><Story /></MockPage>],
};
export default meta;
type Story = StoryObj;

function ProfilePage({ status }: { status?: string }) {
    const [name, setName] = useState('Ahmad Faryab');
    const [email, setEmail] = useState('ahmad@example.com');
    return (
        <SettingsLayout title="Profile">
            {status && <p className="mb-4 text-sm text-green-600">{status}</p>}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Save changes</button>
            </form>
        </SettingsLayout>
    );
}

export const Default: Story = { render: () => <ProfilePage /> };
export const Saved: Story = { render: () => <ProfilePage status="Profile updated successfully." /> };
