import { PlatformLink } from '../platform/context';
import { LogOut, Settings } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { UserInfo } from './user-info';
import type { User } from '../types/auth';

type Props = {
    user: User;
    settingsUrl?: string;
    logoutUrl?: string;
};

export function UserMenuContent({
    user,
    settingsUrl = '/settings/profile',
    logoutUrl = '/logout',
}: Props) {
    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <PlatformLink className="block w-full cursor-pointer" href={settingsUrl} prefetch>
                        <Settings className="mr-2" />
                        Settings
                    </PlatformLink>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <PlatformLink
                    className="block w-full cursor-pointer"
                    href={logoutUrl}
                    as="button"
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </PlatformLink>
            </DropdownMenuItem>
        </>
    );
}
