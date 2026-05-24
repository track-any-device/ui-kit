import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@trackany-device/components';

const meta: Meta<typeof Card> = {
    title: 'UI/Card',
    component: Card,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    render: () => (
        <div className="p-8">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle>Card title</CardTitle>
                    <CardDescription>Supporting description text.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Card body content goes here.</p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">Footer</p>
                </CardFooter>
            </Card>
        </div>
    ),
};

export const TitleOnly: Story = {
    render: () => (
        <div className="p-8">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle>Title only</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">Content without a description.</p>
                </CardContent>
            </Card>
        </div>
    ),
};
