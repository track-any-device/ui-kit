import { cn } from '../../../lib/utils';
import type { LogoCloudContent } from '../types';

const defaultContent: LogoCloudContent = {
    eyebrow: 'Trusted by teams at',
    title: undefined,
    variant: 'row',
    logos: [
        { name: 'Acme Corp' },
        { name: 'Globex' },
        { name: 'Initech' },
        { name: 'Umbrella' },
        { name: 'Hooli' },
        { name: 'Pied Piper' },
    ],
};

function LogoPlaceholder({ name, bordered }: { name: string; bordered?: boolean }) {
    return (
        <div
            className={cn(
                'flex h-12 min-w-[120px] items-center justify-center px-6 rounded-lg',
                bordered
                    ? 'border border-border bg-card shadow-sm'
                    : 'opacity-60 hover:opacity-100 transition-opacity',
            )}
        >
            <span className="text-sm font-semibold tracking-tight text-muted-foreground">
                {name}
            </span>
        </div>
    );
}

export function LogoCloudSection({
    content = defaultContent,
    identifier,
}: {
    content?: LogoCloudContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'row';
    const logos = content?.logos ?? [];

    return (
        <section
            id={identifier ?? undefined}
            className="bg-background py-14"
        >
            <div className="mx-auto max-w-6xl px-6">
                {(content?.eyebrow || content?.title) && (
                    <div className="mb-10 text-center">
                        {content?.eyebrow && (
                            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                                {content.eyebrow}
                            </p>
                        )}
                        {content?.title && (
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                {content.title}
                            </h2>
                        )}
                    </div>
                )}

                {variant === 'grid' ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {logos.map((logo) => (
                            <LogoItem key={logo.name} logo={logo} grayscale={false} bordered={false} />
                        ))}
                    </div>
                ) : variant === 'bordered' ? (
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {logos.map((logo) => (
                            <LogoItem key={logo.name} logo={logo} grayscale={false} bordered />
                        ))}
                    </div>
                ) : (
                    // row / grayscale
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        {logos.map((logo) => (
                            <LogoItem
                                key={logo.name}
                                logo={logo}
                                grayscale={variant === 'grayscale'}
                                bordered={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function LogoItem({
    logo,
    grayscale,
    bordered,
}: {
    logo: { name: string; image?: string | null; url?: string | null };
    grayscale: boolean;
    bordered: boolean;
}) {
    const inner = logo.image ? (
        <img
            src={logo.image}
            alt={logo.name}
            className={cn(
                'h-8 max-w-[130px] object-contain',
                grayscale && 'grayscale hover:grayscale-0 transition-all',
            )}
        />
    ) : (
        <LogoPlaceholder name={logo.name} bordered={bordered} />
    );

    if (logo.url) {
        return (
            <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.name}
                className="flex items-center"
            >
                {inner}
            </a>
        );
    }

    return <div className="flex items-center">{inner}</div>;
}

export const logoCloudSampleProps: LogoCloudContent = {
    eyebrow: 'Trusted by leading companies',
    variant: 'bordered',
    logos: [
        { name: 'Acme Corp', url: '#' },
        { name: 'Globex Industries', url: '#' },
        { name: 'Initech', url: '#' },
        { name: 'Umbrella Ltd', url: '#' },
        { name: 'Hooli', url: '#' },
        { name: 'Pied Piper', url: '#' },
    ],
};

export default LogoCloudSection;
