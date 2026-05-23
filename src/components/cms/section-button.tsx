import { PlatformLink } from '../../platform/context';

import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { lucideIcon } from '../../lib/lucide-icon-map';
import { cn } from '../../lib/utils';

export type CmsButton = {
    label: string;
    link: string;
    icon?: string | null;
    variant?:
        | 'primary'
        | 'secondary'
        | 'outline'
        | 'ghost'
        | 'destructive'
        | null;
};

/**
 * Maps the CMS `buttons[]` variant strings to shadcn Button variants.
 * Our schema uses "primary" (matches user intent); shadcn calls it "default".
 */
function mapVariant(v?: string | null) {
    switch (v) {
        case 'secondary':
            return 'secondary' as const;
        case 'outline':
            return 'outline' as const;
        case 'ghost':
            return 'ghost' as const;
        case 'destructive':
            return 'destructive' as const;
        case 'primary':
        default:
            return 'primary' as const;
    }
}

function isExternal(href: string): boolean {
    return /^(https?:)?\/\//i.test(href) || /^mailto:|^tel:/i.test(href);
}

function isAnchor(href: string): boolean {
    return href.startsWith('#');
}

export function SectionButton({
    button,
    size = 'lg',
    className,
}: {
    button: CmsButton;
    size?: 'md' | 'sm' | 'lg';
    className?: string;
}) {
    const Icon$ = lucideIcon(button.icon);
    const variant = mapVariant(button.variant);

    const content = (
        <>
            {Icon$ ? <Icon iconNode={Icon$} className="size-4" /> : null}
            {button.label}
        </>
    );

    if (isExternal(button.link) || isAnchor(button.link)) {
        return (
            <Button
                asChild
                variant={variant}
                size={size}
                className={cn(className)}
            >
                <a
                    href={button.link}
                    target={isExternal(button.link) ? '_blank' : undefined}
                    rel={
                        isExternal(button.link)
                            ? 'noopener noreferrer'
                            : undefined
                    }
                >
                    {content}
                </a>
            </Button>
        );
    }

    return (
        <Button asChild variant={variant} size={size} className={cn(className)}>
            <PlatformLink href={button.link}>{content}</PlatformLink>
        </Button>
    );
}

export function SectionButtons({
    buttons,
    align = 'center',
    size = 'lg',
    className,
}: {
    buttons?: CmsButton[] | null;
    align?: 'left' | 'center' | 'right';
    size?: 'md' | 'sm' | 'lg';
    className?: string;
}) {
    if (!buttons || buttons.length === 0) {
        return null;
    }

    return (
        <div
            className={cn(
                'flex flex-wrap items-center gap-3',
                align === 'center' && 'justify-center',
                align === 'right' && 'justify-end',
                className,
            )}
        >
            {buttons.map((b, i) => (
                <SectionButton key={`${b.label}-${i}`} button={b} size={size} />
            ))}
        </div>
    );
}
