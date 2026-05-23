import type { Meta, StoryObj } from '@storybook/react';
import { SiteFooter } from '@track-any-device/components';

const meta: Meta = {
    title: 'Components/Web/SiteFooter',
    component: SiteFooter,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = { render: () => <SiteFooter /> };
