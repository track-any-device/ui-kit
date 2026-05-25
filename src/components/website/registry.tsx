/**
 * Section component registry.
 *
 * Maps every WebsiteSectionType string to the React component that renders it.
 * Import this and pass it to SectionRenderer, or use SectionRenderer directly
 * (it uses this registry by default).
 *
 * To add a new section type:
 *   1. Create src/components/website/sections/my-section.tsx
 *   2. Add its type string to WebsiteSectionType in types.ts
 *   3. Add an entry here: my_section: MySection
 *   Done — SectionRenderer picks it up automatically.
 */

import type { ComponentType } from 'react';
import type { WebsiteSectionType } from './types';

// ─── Existing CMS sections ────────────────────────────────────────────────────
import { HeroSection } from '../cms/sections/hero-section';
import { Banner5050Section } from '../cms/sections/banner-5050-section';
import { CardsGridSection } from '../cms/sections/cards-grid-section';
import { CtaSection } from '../cms/sections/cta-section';
import { TextSection } from '../cms/sections/text-section';
import { FeaturedSolutionsGridSection } from '../cms/sections/featured-solutions-grid-section';
import { FeaturedProductsGridSection } from '../cms/sections/featured-products-grid-section';
import { FeaturedBlogSliderSection } from '../cms/sections/featured-blog-slider-section';
import { BlogsListingSection } from '../cms/sections/blogs-listing-section';
import { ContactFormSection } from '../cms/sections/contact-form-section';
import { SolutionsWithFilterSection } from '../cms/sections/solutions-with-filter-section';

// ─── New website sections ─────────────────────────────────────────────────────
import { TopBarSection } from './sections/topbar-section';
import { LogoCloudSection } from './sections/logo-cloud-section';
import { ServicesSection } from './sections/services-section';
import { AboutSection } from './sections/about-section';
import { StatsSection } from './sections/stats-section';
import { HowItWorksSection } from './sections/how-it-works-section';
import { TestimonialsSection } from './sections/testimonials-section';
import { CaseStudiesSection } from './sections/case-studies-section';
import { PricingSection } from './sections/pricing-section';
import { FaqSection } from './sections/faq-section';
import { NewsletterSection } from './sections/newsletter-section';
import { TeamSection } from './sections/team-section';
import { TimelineSection } from './sections/timeline-section';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SectionComponent = ComponentType<{ content?: any; identifier?: string | null }>;

export const sectionRegistry: Record<WebsiteSectionType, SectionComponent> = {
    // CMS
    hero: HeroSection,
    banner_5050: Banner5050Section,
    cards_grid: CardsGridSection,
    cta: CtaSection,
    text: TextSection,
    featured_solutions_grid: FeaturedSolutionsGridSection,
    featured_products_grid: FeaturedProductsGridSection,
    featured_blog_slider: FeaturedBlogSliderSection,
    blogs_listing: BlogsListingSection,
    contact_form: ContactFormSection,
    solutions_with_filter: SolutionsWithFilterSection,

    // Website
    topbar: TopBarSection,
    logo_cloud: LogoCloudSection,
    services: ServicesSection,
    about: AboutSection,
    stats: StatsSection,
    how_it_works: HowItWorksSection,
    testimonials: TestimonialsSection,
    case_studies: CaseStudiesSection,
    pricing: PricingSection,
    faq: FaqSection,
    newsletter: NewsletterSection,
    team: TeamSection,
    timeline: TimelineSection,
    image_gallery: FallbackSection, // placeholder — swap in ImageGallerySection when built
};

function FallbackSection({ content, identifier }: { content?: unknown; identifier?: string | null }) {
    if (import.meta.env?.MODE === 'production') return null;
    return (
        <div id={identifier ?? undefined} className="border border-dashed border-amber-400 bg-amber-50 p-6 text-center text-sm text-amber-700 rounded-lg m-4">
            <p className="font-semibold">Section not registered</p>
            <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(content, null, 2)}</pre>
        </div>
    );
}
