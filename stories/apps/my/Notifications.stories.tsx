import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { NotificationChannelsPage, DoNotDisturbPage } from '../../../src/pages/my/NotificationsPage';
import type { UserContact, DigestItem } from '../../../src/pages/my/NotificationsPage';

const MOCK_USER: UserContact = {
    email: 'ahmad@suthra.pk',
    phone: '+92-300-1234567',
};

const MOCK_DIGEST_ITEMS: DigestItem[] = [
    { label: 'Daily summary',    desc: 'Fleet activity recap sent every morning at 08:00.',           on: true  },
    { label: 'Weekly report',    desc: 'Comprehensive weekly fleet report every Monday.',             on: true  },
    { label: 'Monthly invoice',  desc: 'Invoice and usage summary at the start of each month.',      on: true  },
    { label: 'Incident digest',  desc: 'Summary of all open and resolved incidents.',                on: false },
    { label: 'Geofence digest',  desc: 'Summary of zone violations over the past 24 hours.',        on: false },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/My/Notifications',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Notification preference pages for the personal account (`my/` app). Each row is a `SettingsRow` component from the library: icon + title/description on the left, any action node (Switch or Button) on the right.',
            },
        },
    },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Channels: Story = {
    name: '1 · Notification channels',
    parameters: {
        docs: {
            description: {
                story: 'Three grouped cards: **Notification channels** (Email/Mobile/Desktop toggles, Slack with a Connect button), **Fleet alerts** (critical incidents, device offline, geofence, low battery, trip completed), and **Other notifications** (budget warning, invoice alert, feedback, collaboration, status change). All rows use `SettingsRow` from the component library.',
            },
        },
    },
    render: ({ layout }) => <NotificationChannelsPage key={layout} layout={layout} user={MOCK_USER} />,
};

export const DoNotDisturb: Story = {
    name: '2 · Do Not Disturb',
    parameters: {
        docs: {
            description: {
                story: 'DND card with a master toggle and a two-column `<input type="time">` grid for scheduled quiet hours. An override switch lets critical SOS alerts bypass DND. Below, an email digest card lets users control weekly/daily/monthly digest frequency independently.',
            },
        },
    },
    render: ({ layout }) => <DoNotDisturbPage key={layout} layout={layout} digestItems={MOCK_DIGEST_ITEMS} />,
};
