'use client';
import { PlatformLink } from '../platform/context';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';
import { useCurrentUrl } from '../hooks/use-current-url';
import type { NavItem } from '../types/navigation';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-1">
            <SidebarMenu className="gap-2">
                {items.map((item) => {
                    const active = isCurrentOrParentUrl(item.href);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                size="lg"
                                tooltip={{ children: item.title }}
                                className={
                                    active
                                        ? 'border-l-[3px] border-sidebar-primary py-4 pl-[calc(0.75rem-3px)] text-sidebar-foreground'
                                        : 'border-l-[3px] border-transparent py-4 pl-3 text-sidebar-foreground/70 hover:text-sidebar-foreground'
                                }
                            >
                                <PlatformLink
                                    href={item.href}
                                    prefetch
                                    className="group-data-[collapsible=icon]:justify-center"
                                >
                                    {item.icon && (
                                        <item.icon className="h-[28px] w-[28px] shrink-0 group-data-[collapsible=icon]:mx-auto" />
                                    )}
                                    <span className="text-[13px] font-medium group-data-[collapsible=icon]:hidden">
                                        {item.title}
                                    </span>
                                </PlatformLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
