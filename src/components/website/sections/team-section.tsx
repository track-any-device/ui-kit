import { cn } from '../../../lib/utils';
import type { TeamContent, TeamMember } from '../types';

const SOCIAL_ICONS: Record<string, string> = {
    twitter: '𝕏', linkedin: 'in', github: '⌥', email: '✉',
};

const defaultContent: TeamContent = {
    eyebrow: 'Our team',
    title: 'The people behind the platform',
    subtitle: 'A small, focused team obsessed with making fleet management simple.',
    variant: 'grid',
    items: [
        { name: 'Ahmad Faryab', role: 'Founder & CEO', bio: 'Former fleet operator. Built TAD to solve the visibility problem he faced firsthand.', social_links: [{ platform: 'linkedin', url: '#' }, { platform: 'twitter', url: '#' }] },
        { name: 'Sara Malik', role: 'CTO', bio: 'Distributed systems engineer with 10 years of IoT platform experience.', social_links: [{ platform: 'github', url: '#' }] },
        { name: 'Bilal Qureshi', role: 'Head of Product', bio: 'Ex-Careem product lead. Passionate about turning customer pain into elegant features.', social_links: [{ platform: 'linkedin', url: '#' }] },
        { name: 'Fatima Arif', role: 'Lead Engineer', bio: 'Fullstack developer who keeps the codebase clean and the CI green.', social_links: [{ platform: 'github', url: '#' }] },
    ],
};

export function TeamSection({
    content = defaultContent,
    identifier,
}: {
    content?: TeamContent;
    identifier?: string | null;
}) {
    const variant = content?.variant ?? 'grid';
    const items = content?.items ?? [];

    const gridCols = variant === 'leadership'
        ? 'sm:grid-cols-2 lg:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-4';

    return (
        <section id={identifier ?? undefined} className="bg-background py-20 sm:py-24">
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
                            <p className="mt-3 text-muted-foreground">{content.subtitle}</p>
                        )}
                    </header>
                )}

                {/* Compact — horizontal list */}
                {variant === 'compact' && (
                    <ul className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                        {items.map((member, i) => (
                            <li key={i} className="flex items-center gap-4 bg-card px-5 py-4">
                                <MemberAvatar member={member} size="sm" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm">{member.name}</p>
                                    {member.role && (
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    )}
                                </div>
                                <SocialLinks member={member} />
                            </li>
                        ))}
                    </ul>
                )}

                {/* Profile card — large cards with bio */}
                {variant === 'profile-card' && (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {items.map((member, i) => (
                            <ProfileCard key={i} member={member} />
                        ))}
                    </div>
                )}

                {/* Grid / leadership */}
                {(variant === 'grid' || variant === 'leadership') && (
                    <ul className={cn('grid grid-cols-1 gap-8', gridCols)}>
                        {items.map((member, i) => (
                            <li key={i} className="flex flex-col items-center text-center gap-3">
                                <MemberAvatar member={member} size={variant === 'leadership' ? 'lg' : 'md'} />
                                <div>
                                    <p className="font-semibold">{member.name}</p>
                                    {member.role && (
                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                    )}
                                    {member.tag && (
                                        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                            {member.tag}
                                        </span>
                                    )}
                                    {variant === 'leadership' && member.bio && (
                                        <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                                    )}
                                </div>
                                <SocialLinks member={member} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

function MemberAvatar({ member, size }: { member: TeamMember; size: 'sm' | 'md' | 'lg' }) {
    const sizeClass = { sm: 'h-10 w-10 text-base', md: 'h-20 w-20 text-2xl', lg: 'h-28 w-28 text-4xl' }[size];

    if (member.avatar) {
        return (
            <img
                src={member.avatar}
                alt={member.name}
                className={cn('rounded-full object-cover', sizeClass)}
            />
        );
    }

    return (
        <div className={cn('flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary', sizeClass)}>
            {member.name.charAt(0)}
        </div>
    );
}

function SocialLinks({ member }: { member: TeamMember }) {
    if (!member.social_links?.length) return null;

    return (
        <div className="flex gap-2">
            {member.social_links.map((s) => (
                <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-muted text-xs hover:bg-accent transition-colors"
                >
                    {SOCIAL_ICONS[s.platform.toLowerCase()] ?? s.platform[0].toUpperCase()}
                </a>
            ))}
        </div>
    );
}

function ProfileCard({ member }: { member: TeamMember }) {
    return (
        <div className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <MemberAvatar member={member} size="lg" />
            <div className="flex-1 min-w-0">
                <p className="font-semibold">{member.name}</p>
                {member.role && <p className="text-sm text-primary">{member.role}</p>}
                {member.bio && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>}
                <div className="mt-3">
                    <SocialLinks member={member} />
                </div>
            </div>
        </div>
    );
}

export const teamSampleProps: TeamContent = defaultContent;

export default TeamSection;
