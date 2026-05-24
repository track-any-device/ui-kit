import type { Meta, StoryObj } from '@storybook/react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Button } from '@trackany-device/components';

const meta: Meta = { title: 'UI/Sheet', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="p-6">
            <Sheet>
                <SheetTrigger asChild><Button>Open sheet</Button></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Device details</SheetTitle>
                        <SheetDescription>P901 · IMEI 123456789</SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 text-sm text-muted-foreground">Sheet body content.</div>
                </SheetContent>
            </Sheet>
        </div>
    ),
};

export const Left: StoryObj = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild><Button variant="outline">Open left</Button></SheetTrigger>
            <SheetContent side="left">
                <SheetHeader><SheetTitle>Navigation</SheetTitle></SheetHeader>
                <p className="mt-4 text-sm text-muted-foreground">Left-side panel.</p>
            </SheetContent>
        </Sheet>
    ),
};
