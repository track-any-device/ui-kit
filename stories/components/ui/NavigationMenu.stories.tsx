import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@track-any-device/components';

const meta: Meta = { title: 'Components/UI/NavigationMenu', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="p-6">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/products" className={navigationMenuTriggerStyle()}>Products</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/solutions" className={navigationMenuTriggerStyle()}>Solutions</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>Docs</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    ),
};
