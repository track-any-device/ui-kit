import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@trackany-device/components';

const meta: Meta<typeof Divider> = { title: 'Components/UI/Divider', component: Divider, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Divider>;

export const Plain: Story = { render: () => <div className="py-4"><Divider /></div> };

export const WithLabel: Story = {
    render: () => (
        <div className="py-4 max-w-xs">
            <Divider>OR</Divider>
        </div>
    ),
};
