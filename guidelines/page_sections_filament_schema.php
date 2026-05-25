<?php

/**
 * Filament v3 resource schema for page_sections.
 *
 * Drop this into app/Filament/Resources/PageSectionResource.php
 * (or inline it into a HasSections relation manager on PageResource).
 *
 * The approach:
 *   - A top-level `type` Select drives a reactive `content` KeyValue / Section
 *     panel whose fields morph to match the chosen section type.
 *   - content is stored as JSON; Filament casts it via the model's $casts.
 *   - active / sort_order appear in the table for quick management.
 */

namespace App\Filament\Resources;

use App\Models\PageSection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PageSectionResource extends Resource
{
    protected static ?string $model = PageSection::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'CMS';

    // ─── All supported section types ────────────────────────────────────────
    public const SECTION_TYPES = [
        // CMS
        'hero'                    => 'Hero',
        'banner_5050'             => 'Banner 50/50',
        'cards_grid'              => 'Cards Grid',
        'cta'                     => 'Call to Action',
        'text'                    => 'Text Block',
        'featured_solutions_grid' => 'Featured Solutions Grid',
        'featured_products_grid'  => 'Featured Products Grid',
        'featured_blog_slider'    => 'Blog Slider',
        'blogs_listing'           => 'Blogs Listing',
        'contact_form'            => 'Contact Form',
        'solutions_with_filter'   => 'Solutions with Filter',
        // Website
        'topbar'                  => 'Top Bar',
        'logo_cloud'              => 'Logo Cloud',
        'services'                => 'Services',
        'about'                   => 'About',
        'stats'                   => 'Stats / Metrics',
        'how_it_works'            => 'How It Works',
        'testimonials'            => 'Testimonials',
        'case_studies'            => 'Case Studies',
        'pricing'                 => 'Pricing',
        'faq'                     => 'FAQ',
        'newsletter'              => 'Newsletter',
        'team'                    => 'Team',
        'timeline'                => 'Timeline',
        'image_gallery'           => 'Image Gallery',
    ];

    // ─── Form ────────────────────────────────────────────────────────────────
    public static function form(Form $form): Form
    {
        return $form->schema([

            // ── Meta ─────────────────────────────────────────────────────────
            Forms\Components\Section::make('Section settings')
                ->columns(3)
                ->schema([
                    Forms\Components\Select::make('type')
                        ->label('Section type')
                        ->options(self::SECTION_TYPES)
                        ->required()
                        ->live()    // re-renders content fields on change
                        ->columnSpan(1),

                    Forms\Components\TextInput::make('identifier')
                        ->label('CSS anchor id')
                        ->placeholder('hero, features, pricing …')
                        ->helperText('Used for deep-linking (#anchor). Must be URL-safe.')
                        ->columnSpan(1),

                    Forms\Components\TextInput::make('sort_order')
                        ->label('Sort order')
                        ->numeric()
                        ->default(0)
                        ->columnSpan(1),

                    Forms\Components\Toggle::make('active')
                        ->label('Visible on site')
                        ->default(true)
                        ->columnSpan(3),
                ]),

            // ── Content (morphs based on type) ───────────────────────────────
            Forms\Components\Section::make('Content')
                ->schema(fn (Forms\Get $get) => self::contentSchemaFor($get('type')))
                ->visible(fn (Forms\Get $get) => filled($get('type'))),
        ]);
    }

    // ─── Table ───────────────────────────────────────────────────────────────
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')->label('#')->sortable(),
                Tables\Columns\TextColumn::make('type')
                    ->formatStateUsing(fn ($state) => self::SECTION_TYPES[$state] ?? $state)
                    ->badge(),
                Tables\Columns\TextColumn::make('identifier')->placeholder('—'),
                Tables\Columns\IconColumn::make('active')->boolean(),
                Tables\Columns\TextColumn::make('updated_at')->since()->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    // ─── Content schema factory ──────────────────────────────────────────────
    // Returns the Filament field array for the chosen section type.
    // Add a new case here whenever a new section type is created.

    private static function contentSchemaFor(?string $type): array
    {
        return match ($type) {
            'topbar'       => self::topbarSchema(),
            'logo_cloud'   => self::logoCloudSchema(),
            'services'     => self::servicesSchema(),
            'about'        => self::aboutSchema(),
            'stats'        => self::statsSchema(),
            'how_it_works' => self::howItWorksSchema(),
            'testimonials' => self::testimonialsSchema(),
            'case_studies' => self::caseStudiesSchema(),
            'pricing'      => self::pricingSchema(),
            'faq'          => self::faqSchema(),
            'newsletter'   => self::newsletterSchema(),
            'team'         => self::teamSchema(),
            'timeline'     => self::timelineSchema(),
            'hero', 'cta', 'text', 'banner_5050',
            'cards_grid', 'featured_solutions_grid',
            'featured_products_grid', 'featured_blog_slider',
            'blogs_listing', 'contact_form',
            'solutions_with_filter' => self::genericKeyValueSchema(),
            default => [],
        };
    }

    // ─── Shared field helpers ────────────────────────────────────────────────

    private static function variantSelect(array $options): Forms\Components\Select
    {
        return Forms\Components\Select::make('content.variant')
            ->label('Variant')
            ->options($options)
            ->native(false);
    }

    private static function eyebrowField(): Forms\Components\TextInput
    {
        return Forms\Components\TextInput::make('content.eyebrow')->label('Eyebrow');
    }

    private static function titleField(): Forms\Components\TextInput
    {
        return Forms\Components\TextInput::make('content.title')->label('Title');
    }

    private static function subtitleField(): Forms\Components\Textarea
    {
        return Forms\Components\Textarea::make('content.subtitle')->label('Subtitle')->rows(2);
    }

    private static function buttonsRepeater(): Forms\Components\Repeater
    {
        return Forms\Components\Repeater::make('content.buttons')
            ->label('Buttons')
            ->schema([
                Forms\Components\TextInput::make('label')->required(),
                Forms\Components\TextInput::make('link')->required(),
                Forms\Components\Select::make('variant')
                    ->options(['primary' => 'Primary', 'secondary' => 'Secondary', 'outline' => 'Outline', 'ghost' => 'Ghost'])
                    ->default('primary'),
            ])
            ->columns(3)
            ->collapsed()
            ->addActionLabel('Add button');
    }

    // ─── Per-type schemas ────────────────────────────────────────────────────

    private static function topbarSchema(): array
    {
        return [
            self::variantSelect(['announcement' => 'Announcement', 'promo' => 'Promo', 'contact' => 'Contact', 'social' => 'Social']),
            Forms\Components\Textarea::make('content.message')->label('Message')->rows(2),
            Forms\Components\TextInput::make('content.cta_label')->label('CTA label'),
            Forms\Components\TextInput::make('content.cta_link')->label('CTA link'),
            Forms\Components\TextInput::make('content.contact_phone')->label('Phone'),
            Forms\Components\TextInput::make('content.contact_email')->label('Email'),
            Forms\Components\Toggle::make('content.dismissible')->label('Dismissible')->default(true),
            Forms\Components\Repeater::make('content.social_links')
                ->label('Social links')
                ->schema([
                    Forms\Components\TextInput::make('platform')->placeholder('twitter, linkedin …'),
                    Forms\Components\TextInput::make('url'),
                ])
                ->columns(2)
                ->addActionLabel('Add social link'),
        ];
    }

    private static function logoCloudSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::variantSelect(['row' => 'Row', 'grid' => 'Grid', 'grayscale' => 'Grayscale', 'bordered' => 'Bordered']),
            Forms\Components\Repeater::make('content.logos')
                ->label('Logos')
                ->schema([
                    Forms\Components\TextInput::make('name')->required(),
                    Forms\Components\FileUpload::make('image')->label('Logo image')->image()->nullable(),
                    Forms\Components\TextInput::make('url')->label('Link URL')->nullable(),
                ])
                ->columns(3)
                ->addActionLabel('Add logo'),
        ];
    }

    private static function servicesSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['cards' => 'Cards', 'tabs' => 'Tabs', 'list' => 'List', 'detailed' => 'Detailed', 'compact' => 'Compact']),
            Forms\Components\Repeater::make('content.items')
                ->label('Service items')
                ->schema([
                    Forms\Components\TextInput::make('title')->required(),
                    Forms\Components\TextInput::make('icon')->placeholder('emoji or icon key'),
                    Forms\Components\FileUpload::make('image')->image()->nullable(),
                    Forms\Components\Textarea::make('description')->rows(2),
                    Forms\Components\TextInput::make('link'),
                    Forms\Components\TextInput::make('link_label'),
                    Forms\Components\TextInput::make('tag'),
                ])
                ->columns(2)
                ->addActionLabel('Add service'),
        ];
    }

    private static function aboutSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::variantSelect(['split' => 'Split Image', 'story' => 'Story', 'mission-vision' => 'Mission/Vision', 'founder' => 'Founder Note', 'compact' => 'Compact']),
            Forms\Components\Select::make('content.image_side')->options(['left' => 'Left', 'right' => 'Right'])->default('right'),
            Forms\Components\RichEditor::make('content.body')->label('Body text'),
            Forms\Components\FileUpload::make('content.image')->image()->nullable(),
            Forms\Components\TextInput::make('content.mission')->label('Mission statement'),
            Forms\Components\TextInput::make('content.vision')->label('Vision statement'),
            Forms\Components\TextInput::make('content.founder_name'),
            Forms\Components\TextInput::make('content.founder_role'),
            Forms\Components\Textarea::make('content.founder_quote')->rows(2),
            Forms\Components\FileUpload::make('content.founder_avatar')->image()->nullable(),
            Forms\Components\Repeater::make('content.stats')
                ->label('Stats')
                ->schema([
                    Forms\Components\TextInput::make('value')->required(),
                    Forms\Components\TextInput::make('label')->required(),
                ])
                ->columns(2)
                ->addActionLabel('Add stat'),
            self::buttonsRepeater(),
        ];
    }

    private static function statsSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['simple' => 'Simple', 'card-grid' => 'Card Grid', 'icon-stats' => 'Icon Stats', 'dark-band' => 'Dark Band']),
            Forms\Components\Repeater::make('content.items')
                ->label('Stat items')
                ->schema([
                    Forms\Components\TextInput::make('value')->required(),
                    Forms\Components\TextInput::make('label')->required(),
                    Forms\Components\TextInput::make('prefix')->placeholder('$, £, €'),
                    Forms\Components\TextInput::make('suffix')->placeholder('+, %, x'),
                    Forms\Components\TextInput::make('icon')->placeholder('emoji'),
                    Forms\Components\TextInput::make('description'),
                ])
                ->columns(3)
                ->addActionLabel('Add stat'),
        ];
    }

    private static function howItWorksSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['3-step' => '3-Step Cards', 'horizontal' => 'Horizontal Flow', 'vertical' => 'Vertical', 'timeline' => 'Timeline', 'numbered' => 'Numbered']),
            Forms\Components\Repeater::make('content.items')
                ->label('Steps')
                ->schema([
                    Forms\Components\TextInput::make('number')->placeholder('01'),
                    Forms\Components\TextInput::make('icon')->placeholder('emoji'),
                    Forms\Components\TextInput::make('title')->required(),
                    Forms\Components\Textarea::make('description')->rows(2),
                ])
                ->columns(2)
                ->addActionLabel('Add step'),
            self::buttonsRepeater(),
        ];
    }

    private static function testimonialsSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['cards' => 'Cards', 'carousel' => 'Carousel', 'single-quote' => 'Single Quote', 'masonry' => 'Masonry']),
            Forms\Components\Repeater::make('content.items')
                ->label('Testimonials')
                ->schema([
                    Forms\Components\Textarea::make('quote')->rows(3)->required(),
                    Forms\Components\TextInput::make('name')->required(),
                    Forms\Components\TextInput::make('role'),
                    Forms\Components\TextInput::make('company'),
                    Forms\Components\Select::make('rating')
                        ->options([1 => '1★', 2 => '2★', 3 => '3★', 4 => '4★', 5 => '5★'])
                        ->default(5),
                    Forms\Components\FileUpload::make('avatar')->image()->nullable(),
                ])
                ->columns(2)
                ->addActionLabel('Add testimonial'),
        ];
    }

    private static function caseStudiesSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['grid' => 'Grid', 'featured' => 'Featured', 'compact' => 'Compact List', 'detailed' => 'Detailed']),
            Forms\Components\Repeater::make('content.items')
                ->label('Case studies')
                ->schema([
                    Forms\Components\TextInput::make('title')->required(),
                    Forms\Components\Textarea::make('summary')->rows(2),
                    Forms\Components\TextInput::make('industry'),
                    Forms\Components\TagsInput::make('tags'),
                    Forms\Components\FileUpload::make('image')->image()->nullable(),
                    Forms\Components\TextInput::make('link'),
                    Forms\Components\TextInput::make('link_label'),
                    Forms\Components\Repeater::make('metrics')
                        ->schema([
                            Forms\Components\TextInput::make('label'),
                            Forms\Components\TextInput::make('value'),
                        ])
                        ->columns(2)
                        ->addActionLabel('Add metric'),
                ])
                ->addActionLabel('Add case study'),
            self::buttonsRepeater(),
        ];
    }

    private static function pricingSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['tiers' => 'Tiers', 'comparison' => 'Comparison Table', 'enterprise' => 'Enterprise', 'compact' => 'Compact']),
            Forms\Components\Toggle::make('content.show_toggle')->label('Show monthly/yearly toggle')->default(true),
            Forms\Components\Repeater::make('content.plans')
                ->label('Plans')
                ->schema([
                    Forms\Components\TextInput::make('name')->required(),
                    Forms\Components\Textarea::make('description')->rows(2),
                    Forms\Components\TextInput::make('currency')->default('$')->maxLength(3),
                    Forms\Components\TextInput::make('price_monthly')->numeric()->nullable(),
                    Forms\Components\TextInput::make('price_yearly')->numeric()->nullable(),
                    Forms\Components\TextInput::make('badge')->placeholder('Most popular'),
                    Forms\Components\Toggle::make('highlighted')->default(false),
                    Forms\Components\TextInput::make('cta_label')->default('Get started'),
                    Forms\Components\TextInput::make('cta_link')->default('/register'),
                    Forms\Components\Select::make('cta_variant')
                        ->options(['primary' => 'Primary', 'outline' => 'Outline', 'ghost' => 'Ghost']),
                    Forms\Components\Repeater::make('features')
                        ->schema([
                            Forms\Components\TextInput::make('text')->required(),
                            Forms\Components\Toggle::make('included')->default(true),
                        ])
                        ->columns(2)
                        ->addActionLabel('Add feature'),
                ])
                ->addActionLabel('Add plan'),
        ];
    }

    private static function faqSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['simple' => 'Simple Accordion', 'grouped' => 'Grouped', 'two-column' => 'Two Column', 'support' => 'Support Style']),
            Forms\Components\TextInput::make('content.support_link')->label('Support page link'),
            Forms\Components\TextInput::make('content.support_label')->label('Support link label')->default('Contact support'),
            Forms\Components\Repeater::make('content.items')
                ->label('FAQ items')
                ->schema([
                    Forms\Components\TextInput::make('question')->required(),
                    Forms\Components\Textarea::make('answer')->rows(3)->required(),
                    Forms\Components\TextInput::make('group')->placeholder('General, Billing, Technical …'),
                ])
                ->addActionLabel('Add question'),
        ];
    }

    private static function newsletterSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            Forms\Components\Textarea::make('content.description')->rows(2),
            self::variantSelect(['simple' => 'Simple', 'boxed' => 'Boxed', 'dark' => 'Dark', 'footer-inline' => 'Footer Inline', 'image-side' => 'Image Side']),
            Forms\Components\TextInput::make('content.placeholder')->default('you@company.com'),
            Forms\Components\TextInput::make('content.cta_label')->default('Subscribe'),
            Forms\Components\TextInput::make('content.consent_text'),
            Forms\Components\TextInput::make('content.action_url')->label('Form action URL (optional)'),
            Forms\Components\FileUpload::make('content.image')->image()->nullable()->label('Side image (image-side variant)'),
        ];
    }

    private static function teamSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['grid' => 'Grid', 'leadership' => 'Leadership', 'compact' => 'Compact List', 'profile-card' => 'Profile Cards']),
            Forms\Components\Repeater::make('content.items')
                ->label('Team members')
                ->schema([
                    Forms\Components\TextInput::make('name')->required(),
                    Forms\Components\TextInput::make('role'),
                    Forms\Components\Textarea::make('bio')->rows(2),
                    Forms\Components\TextInput::make('tag'),
                    Forms\Components\FileUpload::make('avatar')->image()->nullable(),
                    Forms\Components\Repeater::make('social_links')
                        ->schema([
                            Forms\Components\TextInput::make('platform')->placeholder('twitter, linkedin, github'),
                            Forms\Components\TextInput::make('url'),
                        ])
                        ->columns(2)
                        ->addActionLabel('Add social'),
                ])
                ->addActionLabel('Add member'),
        ];
    }

    private static function timelineSchema(): array
    {
        return [
            self::eyebrowField(),
            self::titleField(),
            self::subtitleField(),
            self::variantSelect(['vertical' => 'Vertical', 'horizontal' => 'Horizontal', 'roadmap' => 'Roadmap', 'milestone' => 'Milestone (alternating)']),
            Forms\Components\Repeater::make('content.items')
                ->label('Timeline events')
                ->schema([
                    Forms\Components\TextInput::make('date')->placeholder('2024, Q3 2025 …'),
                    Forms\Components\TextInput::make('title')->required(),
                    Forms\Components\Textarea::make('description')->rows(2),
                    Forms\Components\TextInput::make('icon')->placeholder('emoji'),
                    Forms\Components\Toggle::make('milestone')->default(false)->label('Highlight as milestone'),
                ])
                ->addActionLabel('Add event'),
        ];
    }

    private static function genericKeyValueSchema(): array
    {
        return [
            Forms\Components\KeyValue::make('content')
                ->label('Raw content (JSON key-value)')
                ->helperText('Use this for CMS section types that have their own custom Filament forms or that are managed elsewhere.'),
        ];
    }
};
