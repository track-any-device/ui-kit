import { SectionButtons } from '../../cms/section-button';
import { cn } from '../../../lib/utils';
import type { AboutContent } from '../types';

const defaultContent: AboutContent = {
    eyebrow: 'Our story',
    title: 'Built for fleets that cannot afford downtime',
    body: '<p>Track Any Device was founded in 2020 with a single mission: give every fleet operator — from a local delivery service to a government department — the same real-time visibility that enterprise logistics giants enjoy.</p><p>Today our platform monitors tens of thousands of vehicles across Pakistan, helping operators cut fuel costs, reduce incidents, and keep SLAs green.</p>',
    variant: 'split',
    image_side: 'right',
    stats: [
        { value: '50K+', label: 'Devices tracked' },
        { value: '120+', label: 'Enterprise clients' },
        { value: '99.9%', label: 'Platform uptime' },
        { value: '2020', label: 'Founded' },
    ],
    buttons: [{ label: 'Meet the team', link: '/about', variant: 'outline' }],
};

export function AboutSection({
    content = defaultContent,
    identifier,
}: {
    content?: AboutContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'split';

    if (variant === 'mission-vision') {
        return <MissionVisionVariant content={content} identifier={identifier} />;
    }

    if (variant === 'founder') {
        return <FounderVariant content={content} identifier={identifier} />;
    }

    if (variant === 'compact') {
        return <CompactVariant content={content} identifier={identifier} />;
    }

    // split / story (default)
    return <SplitVariant content={content} identifier={identifier} />;
}

function SplitVariant({ content, identifier }: { content: AboutContent; identifier?: string | null }) {
    const imageRight = (content?.image_side ?? 'right') === 'right';

    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className={cn('flex flex-col gap-12 lg:flex-row lg:items-center', imageRight ? '' : 'lg:flex-row-reverse')}>
                    {/* Text */}
                    <div className="flex-1 space-y-5">
                        {content?.eyebrow && (
                            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                                {content.eyebrow}
                            </p>
                        )}
                        {content?.title && (
                            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                                {content.title}
                            </h2>
                        )}
                        {content?.body && (
                            <div
                                className="prose prose-sm max-w-none text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: content.body }}
                            />
                        )}
                        {(content?.stats?.length ?? 0) > 0 && (
                            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {content.stats!.map((s) => (
                                    <div key={s.label} className="text-center">
                                        <dt className="text-xs text-muted-foreground">{s.label}</dt>
                                        <dd className="text-2xl font-bold text-primary">{s.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                        {content?.buttons && (
                            <SectionButtons buttons={content.buttons} align="left" size="md" className="mt-6" />
                        )}
                    </div>

                    {/* Image */}
                    <div className="flex-1">
                        {content?.image ? (
                            <img
                                src={content.image}
                                alt={content.title ?? ''}
                                className="w-full rounded-2xl object-cover shadow-lg"
                            />
                        ) : (
                            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                <span className="text-6xl opacity-30">🏢</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

function MissionVisionVariant({ content, identifier }: { content: AboutContent; identifier?: string | null }) {
    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-5xl px-6 text-center">
                {content?.eyebrow && (
                    <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                        {content.eyebrow}
                    </p>
                )}
                {content?.title && (
                    <h2 className="mb-12 text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
                )}
                <div className="grid gap-8 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-card p-8 text-left shadow-sm">
                        <p className="mb-3 text-xs font-medium tracking-widest text-primary uppercase">Mission</p>
                        <p className="text-lg font-medium leading-relaxed">{content?.mission ?? ''}</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-8 text-left shadow-sm">
                        <p className="mb-3 text-xs font-medium tracking-widest text-primary uppercase">Vision</p>
                        <p className="text-lg font-medium leading-relaxed">{content?.vision ?? ''}</p>
                    </div>
                </div>
                {content?.buttons && (
                    <SectionButtons buttons={content.buttons} align="center" size="md" className="mt-10" />
                )}
            </div>
        </section>
    );
}

function FounderVariant({ content, identifier }: { content: AboutContent; identifier?: string | null }) {
    return (
        <section id={identifier ?? undefined} className="bg-muted/40 py-20 sm:py-24">
            <div className="mx-auto max-w-3xl px-6 text-center">
                {content?.founder_avatar ? (
                    <img
                        src={content.founder_avatar}
                        alt={content.founder_name ?? ''}
                        className="mx-auto mb-5 h-24 w-24 rounded-full object-cover shadow-md"
                    />
                ) : (
                    <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-4xl">
                        👤
                    </div>
                )}
                {content?.founder_quote && (
                    <blockquote className="mb-6 text-xl font-medium leading-relaxed text-foreground italic">
                        "{content.founder_quote}"
                    </blockquote>
                )}
                {content?.founder_name && (
                    <cite className="not-italic">
                        <p className="font-semibold">{content.founder_name}</p>
                        {content?.founder_role && (
                            <p className="text-sm text-muted-foreground">{content.founder_role}</p>
                        )}
                    </cite>
                )}
                {content?.body && (
                    <div
                        className="prose prose-sm mx-auto mt-8 text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: content.body }}
                    />
                )}
            </div>
        </section>
    );
}

function CompactVariant({ content, identifier }: { content: AboutContent; identifier?: string | null }) {
    return (
        <section id={identifier ?? undefined} className="bg-background py-14">
            <div className="mx-auto max-w-4xl px-6 text-center">
                {content?.eyebrow && (
                    <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                        {content.eyebrow}
                    </p>
                )}
                {content?.title && (
                    <h2 className="mb-4 text-2xl font-semibold tracking-tight">{content.title}</h2>
                )}
                {content?.body && (
                    <div
                        className="prose prose-sm mx-auto text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: content.body }}
                    />
                )}
                {content?.buttons && (
                    <SectionButtons buttons={content.buttons} align="center" size="md" className="mt-6" />
                )}
            </div>
        </section>
    );
}

export const aboutSampleProps: AboutContent = {
    ...defaultContent,
    mission: 'Make real-time fleet visibility accessible to every operator, regardless of fleet size or budget.',
    vision: 'A world where every vehicle journey is safe, efficient, and accountable.',
    founder_name: 'Ahmad Faryab',
    founder_role: 'Founder & CEO',
    founder_quote: 'We built the tool we wished existed when we were running our own fleet.',
};

export default AboutSection;
