import type { Meta, StoryObj } from '@storybook/react';
import {
    TopBarSection, topBarSampleProps,
    LogoCloudSection, logoCloudSampleProps,
    ServicesSection, servicesSampleProps,
    AboutSection, aboutSampleProps,
    StatsSection, statsSampleProps,
    HowItWorksSection, howItWorksSampleProps,
    TestimonialsSection, testimonialsSampleProps,
    CaseStudiesSection, caseStudiesSampleProps,
    PricingSection, pricingSampleProps,
    FaqSection, faqSampleProps,
    NewsletterSection, newsletterSampleProps,
    TeamSection, teamSampleProps,
    TimelineSection, timelineSampleProps,
    SectionRenderer,
} from '@trackany-device/components';
import type { PageSection } from '@trackany-device/components';

const meta: Meta = {
    title: 'Components/Website/Sections',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;

// ─── TopBar ───────────────────────────────────────────────────────────────────

export const TopBarAnnouncement: StoryObj = {
    name: 'TopBar / Announcement',
    render: () => <TopBarSection content={topBarSampleProps} />,
};

export const TopBarContact: StoryObj = {
    name: 'TopBar / Contact',
    render: () => (
        <TopBarSection content={{
            variant: 'contact',
            contact_phone: '+92 300 1234567',
            contact_email: 'hello@trackany.device',
            social_links: [
                { platform: 'twitter', url: '#' },
                { platform: 'linkedin', url: '#' },
            ],
        }} />
    ),
};

export const TopBarPromo: StoryObj = {
    name: 'TopBar / Promo',
    render: () => (
        <TopBarSection content={{
            variant: 'promo',
            message: '🔥 Limited time: 3 months free on annual plans.',
            cta_label: 'Claim offer →',
            cta_link: '/pricing',
            dismissible: false,
        }} />
    ),
};

// ─── Logo Cloud ───────────────────────────────────────────────────────────────

export const LogoCloudRow: StoryObj = {
    name: 'LogoCloud / Row',
    render: () => <LogoCloudSection content={{ ...logoCloudSampleProps, variant: 'row' }} />,
};

export const LogoCloudBordered: StoryObj = {
    name: 'LogoCloud / Bordered',
    render: () => <LogoCloudSection content={logoCloudSampleProps} />,
};

export const LogoCloudGrid: StoryObj = {
    name: 'LogoCloud / Grid',
    render: () => <LogoCloudSection content={{ ...logoCloudSampleProps, variant: 'grid' }} />,
};

export const LogoCloudGrayscale: StoryObj = {
    name: 'LogoCloud / Grayscale',
    render: () => <LogoCloudSection content={{ ...logoCloudSampleProps, variant: 'grayscale' }} />,
};

// ─── Services ─────────────────────────────────────────────────────────────────

export const ServicesCards: StoryObj = {
    name: 'Services / Cards',
    render: () => <ServicesSection content={servicesSampleProps} />,
};

export const ServicesList: StoryObj = {
    name: 'Services / List',
    render: () => <ServicesSection content={{ ...servicesSampleProps, variant: 'list' }} />,
};

export const ServicesCompact: StoryObj = {
    name: 'Services / Compact',
    render: () => <ServicesSection content={{ ...servicesSampleProps, variant: 'compact' }} />,
};

export const ServicesDetailed: StoryObj = {
    name: 'Services / Detailed',
    render: () => <ServicesSection content={{ ...servicesSampleProps, variant: 'detailed' }} />,
};

// ─── About ────────────────────────────────────────────────────────────────────

export const AboutSplit: StoryObj = {
    name: 'About / Split',
    render: () => <AboutSection content={aboutSampleProps} />,
};

export const AboutMissionVision: StoryObj = {
    name: 'About / Mission-Vision',
    render: () => (
        <AboutSection content={{
            ...aboutSampleProps,
            variant: 'mission-vision',
            mission: 'Make real-time fleet visibility accessible to every operator, regardless of fleet size or budget.',
            vision: 'A world where every vehicle journey is safe, efficient, and accountable.',
        }} />
    ),
};

export const AboutFounder: StoryObj = {
    name: 'About / Founder Note',
    render: () => (
        <AboutSection content={{
            ...aboutSampleProps,
            variant: 'founder',
            founder_name: 'Ahmad Faryab',
            founder_role: 'Founder & CEO',
            founder_quote: 'We built the tool we wished existed when we were running our own fleet.',
        }} />
    ),
};

export const AboutCompact: StoryObj = {
    name: 'About / Compact',
    render: () => <AboutSection content={{ ...aboutSampleProps, variant: 'compact' }} />,
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export const StatsCards: StoryObj = {
    name: 'Stats / Card Grid',
    render: () => <StatsSection content={statsSampleProps} />,
};

export const StatsSimple: StoryObj = {
    name: 'Stats / Simple',
    render: () => <StatsSection content={{ ...statsSampleProps, variant: 'simple' }} />,
};

export const StatsIconGrid: StoryObj = {
    name: 'Stats / Icon Stats',
    render: () => <StatsSection content={{ ...statsSampleProps, variant: 'icon-stats' }} />,
};

export const StatsDarkBand: StoryObj = {
    name: 'Stats / Dark Band',
    render: () => <StatsSection content={{ ...statsSampleProps, variant: 'dark-band' }} />,
};

// ─── How It Works ─────────────────────────────────────────────────────────────

export const HowItWorksThreeStep: StoryObj = {
    name: 'HowItWorks / 3-Step Cards',
    render: () => <HowItWorksSection content={howItWorksSampleProps} />,
};

export const HowItWorksVertical: StoryObj = {
    name: 'HowItWorks / Vertical Timeline',
    render: () => <HowItWorksSection content={{ ...howItWorksSampleProps, variant: 'vertical' }} />,
};

export const HowItWorksHorizontal: StoryObj = {
    name: 'HowItWorks / Horizontal Flow',
    render: () => <HowItWorksSection content={{ ...howItWorksSampleProps, variant: 'horizontal' }} />,
};

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TestimonialsCards: StoryObj = {
    name: 'Testimonials / Cards',
    render: () => <TestimonialsSection content={testimonialsSampleProps} />,
};

export const TestimonialsSingleQuote: StoryObj = {
    name: 'Testimonials / Single Quote',
    render: () => <TestimonialsSection content={{ ...testimonialsSampleProps, variant: 'single-quote' }} />,
};

export const TestimonialsCarousel: StoryObj = {
    name: 'Testimonials / Carousel',
    render: () => <TestimonialsSection content={{ ...testimonialsSampleProps, variant: 'carousel' }} />,
};

// ─── Case Studies ─────────────────────────────────────────────────────────────

export const CaseStudiesGrid: StoryObj = {
    name: 'CaseStudies / Grid',
    render: () => <CaseStudiesSection content={caseStudiesSampleProps} />,
};

export const CaseStudiesFeatured: StoryObj = {
    name: 'CaseStudies / Featured',
    render: () => <CaseStudiesSection content={{ ...caseStudiesSampleProps, variant: 'featured' }} />,
};

export const CaseStudiesCompact: StoryObj = {
    name: 'CaseStudies / Compact List',
    render: () => <CaseStudiesSection content={{ ...caseStudiesSampleProps, variant: 'compact' }} />,
};

export const CaseStudiesDetailed: StoryObj = {
    name: 'CaseStudies / Detailed',
    render: () => <CaseStudiesSection content={{ ...caseStudiesSampleProps, variant: 'detailed' }} />,
};

// ─── Pricing ──────────────────────────────────────────────────────────────────

export const PricingTiers: StoryObj = {
    name: 'Pricing / Tiers',
    render: () => <PricingSection content={pricingSampleProps} />,
};

export const PricingComparison: StoryObj = {
    name: 'Pricing / Comparison Table',
    render: () => <PricingSection content={{ ...pricingSampleProps, variant: 'comparison' }} />,
};

export const PricingCompact: StoryObj = {
    name: 'Pricing / Compact',
    render: () => <PricingSection content={{ ...pricingSampleProps, variant: 'compact' }} />,
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const FaqSimple: StoryObj = {
    name: 'FAQ / Simple',
    render: () => <FaqSection content={faqSampleProps} />,
};

export const FaqTwoColumn: StoryObj = {
    name: 'FAQ / Two Column',
    render: () => <FaqSection content={{ ...faqSampleProps, variant: 'two-column' }} />,
};

export const FaqSupport: StoryObj = {
    name: 'FAQ / Support Style',
    render: () => <FaqSection content={{ ...faqSampleProps, variant: 'support' }} />,
};

export const FaqGrouped: StoryObj = {
    name: 'FAQ / Grouped',
    render: () => (
        <FaqSection content={{
            ...faqSampleProps,
            variant: 'grouped',
            items: [
                { question: 'How long does installation take?', answer: 'Under 5 minutes for OBD-II.', group: 'Getting started' },
                { question: 'Is there a free trial?', answer: '14-day free trial, no card required.', group: 'Getting started' },
                { question: 'Do you offer an API?', answer: 'Yes — REST API on Professional+.', group: 'Integrations' },
                { question: 'Can I integrate with my ERP?', answer: 'Yes — via webhooks and our REST API.', group: 'Integrations' },
                { question: 'What countries are supported?', answer: 'Pakistan, UAE, Saudi Arabia, and more.', group: 'Coverage' },
            ],
        }} />
    ),
};

// ─── Newsletter ───────────────────────────────────────────────────────────────

export const NewsletterBoxed: StoryObj = {
    name: 'Newsletter / Boxed',
    render: () => <NewsletterSection content={newsletterSampleProps} />,
};

export const NewsletterDark: StoryObj = {
    name: 'Newsletter / Dark',
    render: () => <NewsletterSection content={{ ...newsletterSampleProps, variant: 'dark' }} />,
};

export const NewsletterSimple: StoryObj = {
    name: 'Newsletter / Simple',
    render: () => <NewsletterSection content={{ ...newsletterSampleProps, variant: 'simple' }} />,
};

export const NewsletterImageSide: StoryObj = {
    name: 'Newsletter / Image Side',
    render: () => <NewsletterSection content={{ ...newsletterSampleProps, variant: 'image-side' }} />,
};

// ─── Team ─────────────────────────────────────────────────────────────────────

export const TeamGrid: StoryObj = {
    name: 'Team / Grid',
    render: () => <TeamSection content={teamSampleProps} />,
};

export const TeamLeadership: StoryObj = {
    name: 'Team / Leadership',
    render: () => <TeamSection content={{ ...teamSampleProps, variant: 'leadership' }} />,
};

export const TeamCompact: StoryObj = {
    name: 'Team / Compact List',
    render: () => <TeamSection content={{ ...teamSampleProps, variant: 'compact' }} />,
};

export const TeamProfileCard: StoryObj = {
    name: 'Team / Profile Cards',
    render: () => <TeamSection content={{ ...teamSampleProps, variant: 'profile-card' }} />,
};

// ─── Timeline ─────────────────────────────────────────────────────────────────

export const TimelineVertical: StoryObj = {
    name: 'Timeline / Vertical',
    render: () => <TimelineSection content={timelineSampleProps} />,
};

export const TimelineHorizontal: StoryObj = {
    name: 'Timeline / Horizontal',
    render: () => <TimelineSection content={{ ...timelineSampleProps, variant: 'horizontal' }} />,
};

export const TimelineMilestone: StoryObj = {
    name: 'Timeline / Milestone (alternating)',
    render: () => <TimelineSection content={{ ...timelineSampleProps, variant: 'milestone' }} />,
};

export const TimelineRoadmap: StoryObj = {
    name: 'Timeline / Roadmap',
    render: () => <TimelineSection content={{ ...timelineSampleProps, variant: 'roadmap' }} />,
};

// ─── SectionRenderer ─────────────────────────────────────────────────────────

const examplePageSections: PageSection[] = [
    {
        id: 1,
        type: 'topbar',
        active: true,
        sort_order: 1,
        identifier: 'topbar',
        content: topBarSampleProps,
    },
    {
        id: 2,
        type: 'logo_cloud',
        active: true,
        sort_order: 2,
        identifier: 'clients',
        content: logoCloudSampleProps,
    },
    {
        id: 3,
        type: 'services',
        active: true,
        sort_order: 3,
        identifier: 'services',
        content: servicesSampleProps,
    },
    {
        id: 4,
        type: 'stats',
        active: true,
        sort_order: 4,
        identifier: 'stats',
        content: statsSampleProps,
    },
    {
        id: 5,
        type: 'how_it_works',
        active: true,
        sort_order: 5,
        identifier: 'how-it-works',
        content: howItWorksSampleProps,
    },
    {
        id: 6,
        type: 'testimonials',
        active: true,
        sort_order: 6,
        identifier: 'testimonials',
        content: testimonialsSampleProps,
    },
    {
        id: 7,
        type: 'pricing',
        active: true,
        sort_order: 7,
        identifier: 'pricing',
        content: pricingSampleProps,
    },
    {
        id: 8,
        type: 'faq',
        active: true,
        sort_order: 8,
        identifier: 'faq',
        content: faqSampleProps,
    },
    {
        id: 9,
        type: 'newsletter',
        active: true,
        sort_order: 9,
        identifier: 'newsletter',
        content: newsletterSampleProps,
    },
];

export const FullPageRenderer: StoryObj = {
    name: 'SectionRenderer / Full Landing Page',
    render: () => <SectionRenderer sections={examplePageSections} />,
};

export const SectionRendererWithInactive: StoryObj = {
    name: 'SectionRenderer / Inactive sections skipped',
    render: () => (
        <SectionRenderer
            sections={[
                { id: 1, type: 'stats', active: true, sort_order: 1, content: statsSampleProps },
                { id: 2, type: 'pricing', active: false, sort_order: 2, content: pricingSampleProps },
                { id: 3, type: 'faq', active: true, sort_order: 3, content: faqSampleProps },
            ]}
        />
    ),
};
