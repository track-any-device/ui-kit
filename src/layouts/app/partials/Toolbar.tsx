import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '../../../types/navigation';
import { cn } from '../../../lib/utils';
import { ChevronRight } from 'lucide-react';

interface ToolbarProps {
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
    actions?: ReactNode;
    className?: string;
    currentUrl?: string;
}

export function Toolbar({ title, breadcrumbs = [], actions, className, currentUrl }: ToolbarProps) {
    return (
        <div className={cn('mb-5 lg:mb-10', className)}>
            <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-5">
                <div className="flex items-center flex-wrap gap-1 lg:gap-5">
                    {title && <h1 className="font-medium text-lg text-mono">{title}</h1>}
                    {breadcrumbs.length > 0 && (
                        <nav className="flex items-center gap-1 text-xs lg:text-sm font-medium">
                            {breadcrumbs.map((item, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                const isActive = currentUrl ? currentUrl === item.href : isLast;
                                return (
                                    <span key={index} className="flex items-center gap-1">
                                        {item.href && !isLast ? (
                                            <a href={item.href} className={cn('hover:text-primary transition-colors', isActive ? 'text-mono' : 'text-muted-foreground')}>
                                                {item.title}
                                            </a>
                                        ) : (
                                            <span className={isLast ? 'text-mono' : 'text-muted-foreground'}>
                                                {item.title}
                                            </span>
                                        )}
                                        {!isLast && <ChevronRight className="size-3.5 text-muted-foreground" />}
                                    </span>
                                );
                            })}
                        </nav>
                    )}
                </div>
                {actions && <div className="flex items-center gap-2.5">{actions}</div>}
            </div>
        </div>
    );
}
