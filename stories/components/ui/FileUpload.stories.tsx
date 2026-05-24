import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '@trackany-device/components';
import { useState } from 'react';

const meta: Meta = { title: 'UI/FileUpload', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
    render: () => {
        const [file, setFile] = useState<File | null>(null);
        return (
            <div className="max-w-sm p-6">
                <FileUpload value={file} onChange={setFile} accept="image/*" />
                {file && <p className="mt-2 text-xs text-muted-foreground">Selected: {file.name}</p>}
            </div>
        );
    },
};
