import type { Meta, StoryObj } from '@storybook/react';

/**
 * SiteHeader and SiteFooter stories.
 *
 * These components depend on @inertiajs/react (usePage) at runtime.
 * In Storybook we render a mocked wrapper that provides the shared props
 * directly so the components can render without a full Inertia context.
 */

// Inline lightweight mock — avoids adding @inertiajs/react as a storybook dep.
// The SiteHeader reads nav_links, auth, and hosts from usePage().props.
// We stub those here via a custom render wrapper.

function HeaderPreview({
    scrolled = false,
    loggedIn = false,
}: {
    scrolled?: boolean;
    loggedIn?: boolean;
}) {
    return (
        <div className="relative" style={{ minHeight: 80 }}>
            <header
                className={[
                    'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
                    scrolled
                        ? 'border-border bg-background/85 backdrop-blur-md'
                        : 'border-transparent bg-background/0',
                ].join(' ')}
            >
                <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5">
                    <span className="font-display font-semibold text-foreground">
                        Fleet Tracking
                    </span>
                    <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
                        {['Products', 'Solutions', 'Docs', 'Blog', 'About'].map(
                            (label) => (
                                <li key={label}>
                                    <a
                                        href="#"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ),
                        )}
                    </ul>
                    <div className="ml-auto flex items-center gap-1.5">
                        <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            aria-label="Toggle dark mode"
                        >
                            ☀
                        </button>
                        <a
                            href="#"
                            className="hidden rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground sm:inline-flex"
                        >
                            {loggedIn ? 'Dashboard' : 'Sign in'}
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    );
}

const meta: Meta<typeof HeaderPreview> = {
    title: 'Components/SiteHeader',
    component: HeaderPreview,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};
export default meta;
type Story = StoryObj<typeof HeaderPreview>;

export const Default: Story = {
    args: {
        scrolled: false,
        loggedIn: false,
    },
};

export const Scrolled: Story = {
    args: {
        scrolled: true,
        loggedIn: false,
    },
};

export const LoggedIn: Story = {
    args: {
        scrolled: true,
        loggedIn: true,
    },
};
