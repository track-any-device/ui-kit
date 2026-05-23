import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from '@trackany-device/components';
import { AlertCircleIcon, InfoIcon } from 'lucide-react';

const meta: Meta<typeof Alert> = {
    title: 'UI/Alert',
    component: Alert,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
    render: () => (
        <div className="w-96 p-4">
            <Alert>
                <InfoIcon />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>
                    You can add components and dependencies to your app using the CLI.
                </AlertDescription>
            </Alert>
        </div>
    ),
};

export const Destructive: Story = {
    render: () => (
        <div className="w-96 p-4">
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Your session has expired. Please log in again.
                </AlertDescription>
            </Alert>
        </div>
    ),
};

export const TitleOnly: Story = {
    render: () => (
        <div className="w-96 p-4">
            <Alert>
                <AlertTitle>A simple alert with title only</AlertTitle>
            </Alert>
        </div>
    ),
};
