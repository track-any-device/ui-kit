import type { Meta, StoryObj } from '@storybook/react';

// CookieBanner uses @inertiajs/react — show a structural mock.
const meta: Meta = { title: 'UI/CookieBanner', tags: ['autodocs'] };
export default meta;

export const Preview: StoryObj = {
    render: () => (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
            <p className="text-muted-foreground max-w-xl">
                We use cookies to improve your experience. By continuing, you agree to our{' '}
                <a href="/cookies" className="underline text-primary">Cookie Policy</a>.
            </p>
            <div className="flex gap-2 shrink-0">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Accept</button>
                <button className="px-4 py-2 rounded-lg border border-border text-sm">Decline</button>
            </div>
        </div>
    ),
};
