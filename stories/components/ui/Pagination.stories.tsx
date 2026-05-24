import type { Meta, StoryObj } from '@storybook/react';

// Pagination uses @inertiajs/react Link — render a static approximation for Storybook.
const meta: Meta = { title: 'UI/Pagination', tags: ['autodocs'] };
export default meta;

const links = [
    { url: null,  label: '&laquo; Previous', active: false },
    { url: '/page/1', label: '1', active: false },
    { url: '/page/2', label: '2', active: true },
    { url: '/page/3', label: '3', active: false },
    { url: '/page/4', label: 'Next &raquo;', active: false },
];

export const Preview: StoryObj = {
    render: () => (
        <div className="flex gap-1 p-4">
            {links.map((l, i) => (
                <a key={i} href={l.url ?? '#'}
                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded border px-3 text-sm transition ${
                        l.active ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'
                    } ${!l.url ? 'pointer-events-none opacity-40' : ''}`}
                    dangerouslySetInnerHTML={{ __html: l.label }}
                />
            ))}
        </div>
    ),
};
