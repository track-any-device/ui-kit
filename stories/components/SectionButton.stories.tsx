import type { Meta, StoryObj } from '@storybook/react';
import { SectionButton } from '@trackany-device/components';

// SectionButton uses @inertiajs/react Link for navigation.
const meta: Meta = { title: 'Components/CMS/SectionButton', tags: ['autodocs'] };
export default meta;

const btn = { label: 'Get started', link: '/register', icon: 'ArrowRight', variant: 'primary' as const };

export const Primary: StoryObj = {
    render: () => <div className="p-6"><SectionButton button={btn} /></div>,
};

export const Outline: StoryObj = {
    render: () => <div className="p-6"><SectionButton button={{ ...btn, label: 'Learn more', variant: 'outline' }} /></div>,
};
