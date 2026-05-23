import type { Meta, StoryObj } from '@storybook/react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@trackany-device/components';

const meta: Meta<typeof Dialog> = {
    title: 'UI/Dialog',
    component: Dialog,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
    render: () => (
        <div className="p-8">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Action</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to proceed? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    ),
};

export const WithoutCloseButton: Story = {
    render: () => (
        <div className="p-8">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Open (no X)</Button>
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Processing…</DialogTitle>
                        <DialogDescription>
                            Please wait while we complete your request.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button>Done</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    ),
};
