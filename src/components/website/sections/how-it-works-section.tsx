import { SectionButtons } from '../../cms/section-button';
import { cn } from '../../../lib/utils';
import type { HowItWorksContent, StepItem } from '../types';

const defaultContent: HowItWorksContent = {
    eyebrow: 'Simple process',
    title: 'Up and running in minutes',
    subtitle: 'No complex integrations. Plug in, sign up, and start tracking.',
    variant: '3-step',
    items: [
        { number: '01', icon: '📦', title: 'Install the device', description: 'Plug our compact GPS tracker into your vehicle\'s OBD-II port or hardwire it — takes under five minutes.' },
        { number: '02', icon: '🔗', title: 'Connect to the platform', description: 'The device auto-registers. Log in to your dashboard and see your first vehicle appear on the live map.' },
        { number: '03', icon: '🚀', title: 'Start managing your fleet', description: 'Set geo-fences, configure alerts, invite team members, and pull your first report — all from a single screen.' },
    ],
    buttons: [{ label: 'Get started free', link: '/register', variant: 'primary' }],
};

export function HowItWorksSection({
    content = defaultContent,
    identifier,
}: {
    content?: HowItWorksContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? '3-step';
    const items = content?.items ?? [];

    return (
        <section id={identifier ?? undefined} className="bg-muted/40 py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                {(content?.eyebrow || content?.title || content?.subtitle) && (
                    <header className="mx-auto mb-14 max-w-2xl text-center">
                        {content?.eyebrow && (
                            <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                                {content.eyebrow}
                            </p>
                        )}
                        {content?.title && (
                            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                                {content.title}
                            </h2>
                        )}
                        {content?.subtitle && (
                            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                                {content.subtitle}
                            </p>
                        )}
                    </header>
                )}

                {/* 3-step / numbered */}
                {(variant === '3-step' || variant === 'numbered') && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {items.map((item, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-sm">
                                {/* connector line */}
                                {i < items.length - 1 && (
                                    <div aria-hidden className="absolute top-10 left-[calc(50%+3rem)] hidden h-px w-[calc(100%+1.5rem)] border-t border-dashed border-border sm:block" />
                                )}
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                    {item.icon ?? item.number ?? String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mb-2 font-semibold">{item.title}</h3>
                                {item.description && (
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* horizontal */}
                {variant === 'horizontal' && (
                    <ol className="flex flex-col gap-0 sm:flex-row sm:items-start">
                        {items.map((item, i) => (
                            <li key={i} className="flex flex-1 flex-col sm:items-center">
                                <div className="flex items-center gap-3 sm:flex-col sm:gap-2 sm:text-center">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                        {item.number ?? String(i + 1)}
                                    </div>
                                    {i < items.length - 1 && (
                                        <div aria-hidden className="hidden h-px flex-1 bg-border sm:block" />
                                    )}
                                </div>
                                <div className="mt-4 sm:text-center px-2">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    {item.description && (
                                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                )}

                {/* vertical / timeline */}
                {(variant === 'vertical' || variant === 'timeline') && (
                    <ol className="relative border-l border-border pl-8 space-y-10 max-w-2xl mx-auto">
                        {items.map((item, i) => (
                            <li key={i} className="relative">
                                <div className="absolute -left-[2.25rem] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                    {item.number ?? String(i + 1)}
                                </div>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                {item.description && (
                                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                                )}
                            </li>
                        ))}
                    </ol>
                )}

                {content?.buttons && (
                    <div className="mt-12 text-center">
                        <SectionButtons buttons={content.buttons} align="center" size="lg" />
                    </div>
                )}
            </div>
        </section>
    );
}

export const howItWorksSampleProps: HowItWorksContent = defaultContent;

export default HowItWorksSection;
