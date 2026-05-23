import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection, CardsGridSection, CtaSection, TextSection, FeaturedSolutionsGridSection } from '@track-any-device/components';

// CMS sections require @inertiajs/react in consuming apps.
// These stories show structural rendering with mock data.
const meta: Meta = { title: 'Components/CMS/Sections', tags: ['autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;

export const Hero: StoryObj = {
    render: () => (
        <HeroSection content={{
            title: 'Real-time IoT Fleet Tracking',
            subtitle: 'Monitor devices, manage beats, and automate incident workflows.',
            bg: { kind: 'color', color_token: 'primary' },
            size: 'full',
            buttons: [{ label: 'Browse Products', link: '/products', variant: 'primary' }],
        }} />
    ),
};

export const CardsGrid: StoryObj = {
    render: () => (
        <div className="p-8">
            <CardsGridSection content={{
                title: 'Platform Features',
                card_style: 'icon',
                columns: 3,
                items: [
                    { title: 'Real-time tracking', description: 'Live device positions on interactive maps.', icon: 'MapPin' },
                    { title: 'Beat enforcement', description: 'Instant geo-fence breach alerts.', icon: 'Shield' },
                    { title: 'Multi-device', description: 'P901 · GF-07 · JT808 and more.', icon: 'Radio' },
                ],
            }} />
        </div>
    ),
};

export const Cta: StoryObj = {
    render: () => (
        <CtaSection content={{
            title: 'Ready to get started?',
            subtitle: 'Deploy in minutes. No credit card required.',
            buttons: [{ label: 'Start free trial', link: '/register', variant: 'primary' }],
            bg: { kind: 'gradient', gradient_from: '#3b82f6', gradient_to: '#1d4ed8', gradient_direction: 'to-r' },
        }} />
    ),
};

export const Text: StoryObj = {
    render: () => (
        <div className="p-8 max-w-2xl">
            <TextSection content={{
                title: 'About the platform',
                body: '<p>Track Any Device is a multi-tenant IoT fleet tracking platform serving fleet operators, government organisations, and IoT solution providers across Pakistan.</p>',
                alignment: 'left',
            }} />
        </div>
    ),
};
