import type { Meta, StoryObj } from '@storybook/react';
import { WebLayout, HeroSection, CardsGridSection, FeaturedSolutionsGridSection, CtaSection } from '@track-any-device/components';
import { MockPage } from '../../../.storybook/mocks/inertia-react';

const mockNavLinks = [
    { id: 1, label: 'Products', href: '/products', target: '_self' },
    { id: 2, label: 'Solutions', href: '/solutions', target: '_self' },
    { id: 3, label: 'Docs', href: '/docs/tad101', target: '_self' },
    { id: 4, label: 'Pricing', href: '/pricing', target: '_self' },
];

const webPageProps = { nav_links: mockNavLinks, auth: { user: null }, flash: {}, errors: {} };

const meta: Meta = {
    title: 'Apps/Web/Home',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [(Story) => <MockPage props={webPageProps} url="/"><Story /></MockPage>],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <WebLayout>
            <HeroSection
                content={{
                    eyebrow: 'Universal IoT Platform',
                    title: 'Track Anything, Anywhere',
                    subtitle: 'From GPS fleet trackers to custom Arduino builds — one platform, five device types, unlimited tenants.',
                    bg: { kind: 'gradient', gradient_from: 'hsl(var(--primary))', gradient_to: 'hsl(var(--primary)/0.6)', gradient_direction: 'to-br', overlay_alpha: 0 },
                    buttons: [
                        { label: 'Get started', link: '/register', variant: 'primary' },
                        { label: 'View docs', link: '/docs/tad101', variant: 'outline' },
                    ],
                    size: 'full',
                }}
            />
            <CardsGridSection
                content={{
                    eyebrow: 'Why Track Any Device?',
                    title: 'Built for every use case',
                    card_style: 'icon',
                    columns: 3,
                    cards: [
                        { icon: 'MapPin', title: 'Real-time tracking', body: 'GPS location with sub-second updates across cellular, Wi-Fi, and Bluetooth.' },
                        { icon: 'Shield', title: 'Geofence alerts', body: 'Define beat boundaries and get notified the moment a device leaves the zone.' },
                        { icon: 'Cpu', title: 'Universal protocol', body: 'TAD101 works with any device — from P901 trackers to Raspberry Pi builds.' },
                    ],
                }}
            />
            <FeaturedSolutionsGridSection
                content={{
                    eyebrow: 'Solutions',
                    title: 'Ready for your industry',
                    buttons: [{ label: 'View all solutions', link: '/solutions', variant: 'outline' }],
                }}
                solutions={[
                    { id: 1, title: 'Government Fleets', slug: 'government', icon_name: 'Building2', description: 'Manage patrol vehicles, workers, and equipment for municipal agencies.' },
                    { id: 2, title: 'Logistics & Delivery', slug: 'logistics', icon_name: 'Truck', description: 'End-to-end visibility for delivery fleets with ETA and incident alerts.' },
                    { id: 3, title: 'Agriculture', slug: 'agriculture', icon_name: 'Leaf', description: 'Track farm machinery, field workers, and irrigation equipment.' },
                ]}
            />
            <CtaSection
                content={{
                    title: 'Ready to deploy?',
                    subtitle: 'Set up your first tenant in minutes — no hardware vendor lock-in.',
                    bg: { kind: 'color', color_token: 'primary', overlay_alpha: 0 },
                    buttons: [{ label: 'Start free trial', link: '/register', variant: 'primary' }],
                }}
            />
        </WebLayout>
    ),
};

export const LoggedIn: Story = {
    decorators: [(Story) => <MockPage props={{ ...webPageProps, auth: { user: { name: 'Ahmad Faryab', email: 'ahmad@example.com' } } }} url="/"><Story /></MockPage>],
    render: () => (
        <WebLayout>
            <HeroSection content={{ title: 'Welcome back, Ahmad', subtitle: 'Your fleet dashboard is ready.', size: 'half', bg: { kind: 'gradient', gradient_from: 'hsl(var(--primary))', gradient_to: 'hsl(var(--primary)/0.6)', gradient_direction: 'to-br', overlay_alpha: 0 }, buttons: [{ label: 'Go to dashboard', link: '/my-devices', variant: 'primary' }] }} />
        </WebLayout>
    ),
};
