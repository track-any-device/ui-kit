import type { Meta, StoryObj } from '@storybook/react';
import { Switch, SwitchWrapper } from '@track-any-device/components';

const meta: Meta = { title: 'Components/UI/Switch', parameters: { layout: 'padded' } };
export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <SwitchWrapper><Switch id="s1" defaultChecked /><label htmlFor="s1" className="ms-2 text-sm cursor-pointer">Notifications enabled</label></SwitchWrapper>
            <SwitchWrapper><Switch id="s2" /><label htmlFor="s2" className="ms-2 text-sm cursor-pointer">Email alerts</label></SwitchWrapper>
            <SwitchWrapper><Switch id="s3" defaultChecked size="lg" /><label htmlFor="s3" className="ms-2 text-sm cursor-pointer">Live tracking</label></SwitchWrapper>
            <SwitchWrapper><Switch id="s4" size="sm" /><label htmlFor="s4" className="ms-2 text-sm cursor-pointer">Small size</label></SwitchWrapper>
        </div>
    ),
};
