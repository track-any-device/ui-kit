import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@trackany-device/components';
import { Button } from '@trackany-device/components';

const meta: Meta = { title: 'UI/AlertDialog', parameters: { layout: 'padded' } };
export default meta;

export const Default: StoryObj = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive">Delete Vehicle</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Remove vehicle LEA-001?</AlertDialogTitle>
                    <AlertDialogDescription>This will permanently delete the vehicle and all associated trip data. This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};
