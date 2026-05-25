import type { CmsBackground } from '../cms/section-bg';
import type { CmsButton } from '../cms/section-button';

export type { CmsBackground, CmsButton };

// ─── Shared primitives ────────────────────────────────────────────────────────

export type SocialLink = { platform: string; url: string };

// ─── TopBar ───────────────────────────────────────────────────────────────────

export type TopBarContent = {
    message?: string | null;
    contact_email?: string | null;
    contact_phone?: string | null;
    social_links?: SocialLink[] | null;
    dismissible?: boolean | null;
    variant?: 'announcement' | 'contact' | 'promo' | 'social' | null;
    bg?: CmsBackground | null;
    cta_label?: string | null;
    cta_link?: string | null;
};

// ─── Logo Cloud ───────────────────────────────────────────────────────────────

export type LogoItem = {
    name: string;
    image?: string | null;
    url?: string | null;
};

export type LogoCloudContent = {
    eyebrow?: string | null;
    title?: string | null;
    logos?: LogoItem[] | null;
    variant?: 'row' | 'grid' | 'grayscale' | 'bordered' | null;
};

// ─── Services ─────────────────────────────────────────────────────────────────

export type ServiceItem = {
    icon?: string | null;
    image?: string | null;
    title: string;
    description?: string | null;
    link?: string | null;
    link_label?: string | null;
    tag?: string | null;
};

export type ServicesContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'cards' | 'tabs' | 'list' | 'detailed' | 'compact' | null;
    items?: ServiceItem[] | null;
    bg?: CmsBackground | null;
};

// ─── About ────────────────────────────────────────────────────────────────────

export type AboutStat = { value: string; label: string };

export type AboutContent = {
    eyebrow?: string | null;
    title?: string | null;
    body?: string | null;
    image?: string | null;
    buttons?: CmsButton[] | null;
    stats?: AboutStat[] | null;
    variant?: 'story' | 'mission-vision' | 'split' | 'founder' | 'compact' | null;
    image_side?: 'left' | 'right' | null;
    mission?: string | null;
    vision?: string | null;
    founder_name?: string | null;
    founder_role?: string | null;
    founder_avatar?: string | null;
    founder_quote?: string | null;
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export type StatItem = {
    value: string;
    label: string;
    icon?: string | null;
    description?: string | null;
    prefix?: string | null;
    suffix?: string | null;
};

export type StatsContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'simple' | 'card-grid' | 'icon-stats' | 'dark-band' | null;
    items?: StatItem[] | null;
    bg?: CmsBackground | null;
};

// ─── How It Works ─────────────────────────────────────────────────────────────

export type StepItem = {
    number?: string | null;
    icon?: string | null;
    title: string;
    description?: string | null;
};

export type HowItWorksContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: '3-step' | 'timeline' | 'horizontal' | 'vertical' | 'numbered' | null;
    items?: StepItem[] | null;
    buttons?: CmsButton[] | null;
};

// ─── Testimonials ─────────────────────────────────────────────────────────────

export type TestimonialItem = {
    quote: string;
    name: string;
    role?: string | null;
    company?: string | null;
    avatar?: string | null;
    rating?: number | null;
};

export type TestimonialsContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'cards' | 'carousel' | 'single-quote' | 'masonry' | null;
    items?: TestimonialItem[] | null;
    bg?: CmsBackground | null;
};

// ─── Case Studies ─────────────────────────────────────────────────────────────

export type CaseMetric = { label: string; value: string };

export type CaseStudyItem = {
    image?: string | null;
    title: string;
    summary?: string | null;
    tags?: string[] | null;
    metrics?: CaseMetric[] | null;
    link?: string | null;
    link_label?: string | null;
    industry?: string | null;
};

export type CaseStudiesContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'grid' | 'featured' | 'compact' | 'detailed' | null;
    items?: CaseStudyItem[] | null;
    buttons?: CmsButton[] | null;
};

// ─── Pricing ──────────────────────────────────────────────────────────────────

export type PricingFeature = {
    text: string;
    included: boolean;
};

export type PricingPlan = {
    name: string;
    description?: string | null;
    price_monthly?: number | null;
    price_yearly?: number | null;
    currency?: string | null;
    badge?: string | null;
    highlighted?: boolean | null;
    features?: PricingFeature[] | null;
    cta_label?: string | null;
    cta_link?: string | null;
    cta_variant?: CmsButton['variant'] | null;
};

export type PricingContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'tiers' | 'comparison' | 'enterprise' | 'compact' | null;
    plans?: PricingPlan[] | null;
    show_toggle?: boolean | null;
    bg?: CmsBackground | null;
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export type FaqItem = {
    question: string;
    answer: string;
    group?: string | null;
};

export type FaqContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'simple' | 'grouped' | 'two-column' | 'support' | null;
    items?: FaqItem[] | null;
    support_link?: string | null;
    support_label?: string | null;
};

// ─── Newsletter ───────────────────────────────────────────────────────────────

export type NewsletterContent = {
    eyebrow?: string | null;
    title?: string | null;
    description?: string | null;
    placeholder?: string | null;
    cta_label?: string | null;
    consent_text?: string | null;
    image?: string | null;
    variant?: 'simple' | 'boxed' | 'dark' | 'footer-inline' | 'image-side' | null;
    bg?: CmsBackground | null;
    action_url?: string | null;
};

// ─── Team ─────────────────────────────────────────────────────────────────────

export type TeamMember = {
    name: string;
    role?: string | null;
    bio?: string | null;
    avatar?: string | null;
    social_links?: SocialLink[] | null;
    tag?: string | null;
};

export type TeamContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'grid' | 'leadership' | 'compact' | 'profile-card' | null;
    items?: TeamMember[] | null;
};

// ─── Timeline ─────────────────────────────────────────────────────────────────

export type TimelineItem = {
    date?: string | null;
    title: string;
    description?: string | null;
    icon?: string | null;
    milestone?: boolean | null;
};

export type TimelineContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'vertical' | 'horizontal' | 'roadmap' | 'milestone' | null;
    items?: TimelineItem[] | null;
};

// ─── Image Gallery ────────────────────────────────────────────────────────────

export type GalleryImage = {
    src: string;
    alt?: string | null;
    caption?: string | null;
};

export type ImageGalleryContent = {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    variant?: 'grid' | 'masonry' | 'carousel' | 'before-after' | null;
    images?: GalleryImage[] | null;
    columns?: 2 | 3 | 4 | null;
};

// ─── Section Renderer ─────────────────────────────────────────────────────────

export type WebsiteSectionType =
    // existing CMS sections
    | 'hero'
    | 'banner_5050'
    | 'cards_grid'
    | 'cta'
    | 'text'
    | 'featured_solutions_grid'
    | 'featured_products_grid'
    | 'featured_blog_slider'
    | 'blogs_listing'
    | 'contact_form'
    | 'solutions_with_filter'
    // new website sections
    | 'topbar'
    | 'logo_cloud'
    | 'services'
    | 'about'
    | 'stats'
    | 'how_it_works'
    | 'testimonials'
    | 'case_studies'
    | 'pricing'
    | 'faq'
    | 'newsletter'
    | 'team'
    | 'timeline'
    | 'image_gallery';

export type PageSection = {
    id: number;
    type: WebsiteSectionType;
    identifier?: string | null;
    active: boolean;
    sort_order: number;
    content: Record<string, unknown>;
};
