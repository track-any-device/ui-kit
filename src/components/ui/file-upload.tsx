'use client';

/**
 * FileUpload — drag-and-drop multi-file picker.
 *
 * Headless: it manages drag-state + selection internally and reports back
 * via onChange(File[]). It does NOT upload — caller is responsible for
 * passing the file list to an Inertia form / fetch / FormData payload.
 *
 *   <FileUpload accept='image/*' maxSize={2 * 1024 * 1024}
 *               onChange={(files) => form.setData('logo', files[0])} />
 */
import { Upload, X } from 'lucide-react';
import * as React from 'react';

import { Button } from './button';
import { cn } from '../../lib/utils';

type Props = {
    accept?: string;
    multiple?: boolean;
    /** Bytes. Files larger than this are rejected silently with an error message. */
    maxSize?: number;
    hint?: string;
    label?: string;
    name?: string;
    onChange?: (files: File[]) => void;
    className?: string;
};

export function FileUpload({
    accept,
    multiple = false,
    maxSize,
    hint,
    label = 'Drop files here, or click to browse',
    name,
    onChange,
    className,
}: Props) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [files, setFiles] = React.useState<File[]>([]);
    const [dragging, setDragging] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleFiles = React.useCallback(
        (incoming: FileList | null) => {
            if (!incoming) return;
            const list = Array.from(incoming);

            if (maxSize) {
                const tooBig = list.find((f) => f.size > maxSize);
                if (tooBig) {
                    setError(
                        `${tooBig.name} exceeds the ${(maxSize / (1024 * 1024)).toFixed(1)} MB limit.`,
                    );
                    return;
                }
            }

            setError(null);
            const next = multiple ? [...files, ...list] : list.slice(0, 1);
            setFiles(next);
            onChange?.(next);
        },
        [files, maxSize, multiple, onChange],
    );

    const remove = (idx: number) => {
        const next = files.filter((_, i) => i !== idx);
        setFiles(next);
        onChange?.(next);
    };

    return (
        <div className={cn('space-y-2', className)}>
            <label
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFiles(e.dataTransfer.files);
                }}
                className={cn(
                    'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-surface px-6 py-8 text-center transition-colors',
                    dragging
                        ? 'border-primary bg-primary-subtle/40'
                        : 'border-border hover:border-primary/60',
                )}
            >
                <Upload
                    aria-hidden="true"
                    className="mb-2 size-6 text-muted-foreground"
                />
                <span className="text-sm font-medium text-foreground">
                    {label}
                </span>
                {hint && (
                    <span className="mt-1 text-xs text-muted-foreground">
                        {hint}
                    </span>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    className="sr-only"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </label>

            {error && (
                <p role="alert" className="text-xs text-destructive">
                    {error}
                </p>
            )}

            {files.length > 0 && (
                <ul className="space-y-1">
                    {files.map((file, idx) => (
                        <li
                            key={`${file.name}-${idx}`}
                            className="flex items-center justify-between rounded-md border bg-card px-3 py-2 text-sm"
                        >
                            <span className="truncate font-mono text-xs text-foreground">
                                {file.name}
                                <span className="ml-2 text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} KB
                                </span>
                            </span>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                aria-label={`Remove ${file.name}`}
                                onClick={() => remove(idx)}
                            >
                                <X aria-hidden="true" className="size-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
