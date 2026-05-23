import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@trackany-device/components';

const meta: Meta<typeof Tabs> = {
    title: 'UI/Tabs',
    component: Tabs,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    render: () => (
        <div className="p-8">
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                    <p className="text-sm text-muted-foreground">Overview content goes here.</p>
                </TabsContent>
                <TabsContent value="activity" className="mt-4">
                    <p className="text-sm text-muted-foreground">Activity content goes here.</p>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                    <p className="text-sm text-muted-foreground">Settings content goes here.</p>
                </TabsContent>
            </Tabs>
        </div>
    ),
};

export const WithDisabled: Story = {
    render: () => (
        <div className="p-8">
            <Tabs defaultValue="tab1">
                <TabsList>
                    <TabsTrigger value="tab1">Active</TabsTrigger>
                    <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
                    <TabsTrigger value="tab3">Other</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                    <p className="text-sm">Tab 1 content.</p>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                    <p className="text-sm">Tab 3 content.</p>
                </TabsContent>
            </Tabs>
        </div>
    ),
};
