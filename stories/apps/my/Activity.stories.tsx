import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import {
    ActivityTimelinePage, LoginHistoryPage, AccountActivityFeedPage,
} from '../../../src/pages/my/ActivityPage';
import type { ActivityItem, LoginEntry, FeedItem } from '../../../src/pages/my/ActivityPage';
import {
    AlertTriangle, Battery, Bell, CheckCircle2, LogIn, LogOut, Settings, Shield, User,
} from 'lucide-react';

const MOCK_ACTIVITY: ActivityItem[] = [
    { icon: LogIn,         title: 'Logged in',             detail: 'MacBook Pro · Lahore, PK',             datetime: '2026-05-24T09:11:00', variant: 'success'  },
    { icon: Bell,          title: 'SOS alert received',     detail: 'Vehicle LP-4821 triggered SOS',        datetime: '2026-05-24T08:47:00', variant: 'danger'   },
    { icon: Shield,        title: 'Geofence exit',          detail: 'LP-3302 left Zone A (Punjab South)',   datetime: '2026-05-24T07:30:00', variant: 'warning'  },
    { icon: Battery,       title: 'Low battery warning',    detail: 'Device #D-4912 at 17%',               datetime: '2026-05-23T22:05:00', variant: 'warning'  },
    { icon: CheckCircle2,  title: 'Incident resolved',      detail: 'INC-0042 marked resolved by Tariq',   datetime: '2026-05-23T18:12:00', variant: 'success'  },
    { icon: User,          title: 'Profile updated',        detail: 'Phone number changed',                 datetime: '2026-05-23T14:30:00', variant: 'default'  },
    { icon: Settings,      title: '2FA disabled',           detail: 'By admin: Kamran Arif',                datetime: '2026-05-22T10:00:00', variant: 'danger'   },
    { icon: LogIn,         title: 'Logged in',              detail: 'iPhone 15 Pro · Lahore, PK',          datetime: '2026-05-22T07:03:00', variant: 'success'  },
    { icon: AlertTriangle, title: 'Login failed',           detail: 'Unknown device · 197.32.14.8',        datetime: '2026-05-21T23:47:00', variant: 'danger'   },
    { icon: LogOut,        title: 'Logged out',             detail: 'Session ended after 8 h idle',        datetime: '2026-05-21T18:00:00', variant: 'default'  },
];

const MOCK_LOGIN_HISTORY: LoginEntry[] = [
    { device: 'MacBook Pro — Chrome',   location: 'Lahore, PK',      ip: '203.128.1.44', date: '24 May 2026, 09:11', ok: true  },
    { device: 'iPhone 15 Pro — Safari', location: 'Lahore, PK',      ip: '203.128.1.44', date: '24 May 2026, 07:03', ok: true  },
    { device: 'Unknown device',          location: '197.32.14.8',     ip: '197.32.14.8',  date: '23 May 2026, 23:47', ok: false },
    { device: 'MacBook Pro — Chrome',   location: 'Lahore, PK',      ip: '203.128.1.44', date: '22 May 2026, 09:05', ok: true  },
    { device: 'Windows PC — Edge',      location: 'Islamabad, PK',   ip: '202.83.42.1',  date: '20 May 2026, 14:30', ok: true  },
    { device: 'iPhone 15 Pro — Safari', location: 'Lahore, PK',      ip: '203.128.1.44', date: '19 May 2026, 08:22', ok: true  },
];

const MOCK_FEED_ITEMS: FeedItem[] = [
    { initials: 'AF', name: 'Ahmad Faryab',  action: 'resolved incident INC-0042',          time: '2h ago',  badge: { label: 'Incident',   cls: 'text-red-600 border-red-200 bg-red-50'     } },
    { initials: 'KA', name: 'Kamran Arif',   action: 'added vehicle LP-5510 to fleet',      time: '4h ago',  badge: { label: 'Fleet',      cls: 'text-blue-600 border-blue-200 bg-blue-50'  } },
    { initials: 'ZB', name: 'Zeeshan Butt',  action: 'invited 3 new team members',          time: '1d ago',  badge: { label: 'Team',       cls: 'text-purple-600 border-purple-200 bg-purple-50' } },
    { initials: 'TM', name: 'Tariq Mahmood', action: 'disabled 2FA for Usman Malik',        time: '2d ago',  badge: { label: 'Security',   cls: 'text-amber-600 border-amber-200 bg-amber-50' } },
    { initials: 'UM', name: 'Usman Malik',   action: 'exported trip report for May 2026',   time: '3d ago',  badge: { label: 'Reports',    cls: 'text-green-600 border-green-200 bg-green-50' } },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/My/Activity',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Account activity and login history pages for the `my/` app. The `Timeline` and `TimelineItem` components handle the styled activity feed; use the `variant` prop (`default | danger | warning | success | info`) to colour the timeline dot.',
            },
        },
    },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const ActivityTimeline: Story = {
    name: '1 · Activity timeline',
    parameters: {
        docs: {
            description: {
                story: '`Timeline` component with 10 chronological account events. Each `TimelineItem` receives an icon, title, ISO datetime string, and a `variant` for the coloured dot. Filter and Export buttons sit in the page header — they are decorative in this story.',
            },
        },
    },
    render: ({ layout }) => <ActivityTimelinePage key={layout} layout={layout} items={MOCK_ACTIVITY} />,
};

export const LoginHistory: Story = {
    name: '2 · Login history',
    parameters: {
        docs: {
            description: {
                story: 'Searchable table (device / location / IP / date / Success|Failed badge) with a plain `<input>` search bar and Export button in the header. Below the table, three stat cards (total logins, failed attempts in red, unique devices) summarise the last 90 days.',
            },
        },
    },
    render: ({ layout }) => <LoginHistoryPage key={layout} layout={layout} logins={MOCK_LOGIN_HISTORY} />,
};

export const AccountActivityFeed: Story = {
    name: '3 · Activity feed with avatars',
    parameters: {
        docs: {
            description: {
                story: 'Alternative to Timeline: a flat list of feed rows, each with an `Avatar`, actor name + action text, relative timestamp, and a colour-coded category `Badge`. Use this when you need a multi-actor feed (e.g. a team audit log) rather than a single-user timeline.',
            },
        },
    },
    render: ({ layout }) => <AccountActivityFeedPage key={layout} layout={layout} items={MOCK_FEED_ITEMS} />,
};
