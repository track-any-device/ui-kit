import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import {
    UserProfilePage, SettingsPlainPage, SettingsSidebarPage, SecurityPage, BillingPage,
} from '../../../src/pages/my/ProfilePage';
import type {
    UserProfile as UserProfileData,
    Session, LoginEvent, Invoice,
} from '../../../src/pages/my/ProfilePage';

const MOCK_USER: UserProfileData = {
    name: 'Ahmad Faryab',
    email: 'ahmad@example.com',
    phone: '+92-300-1234567',
    role: 'Fleet Supervisor',
    org: 'Suthra Punjab',
    initials: 'AF',
};

const MOCK_SESSIONS: Session[] = [
    { device: 'MacBook Pro — Chrome',   location: 'Lahore, Pakistan',    time: 'Now',         current: true  },
    { device: 'iPhone 15 Pro — Safari', location: 'Lahore, Pakistan',    time: '2 hours ago', current: false },
    { device: 'Windows PC — Edge',      location: 'Islamabad, Pakistan', time: '3 days ago',  current: false },
];

const MOCK_LOGIN_ACTIVITY: LoginEvent[] = [
    { event: 'Login',           device: 'MacBook Pro',    date: '24 May 2026, 09:11', ok: true  },
    { event: 'Login',           device: 'iPhone 15 Pro',  date: '24 May 2026, 07:03', ok: true  },
    { event: 'Login failed',    device: 'Unknown device', date: '23 May 2026, 23:47', ok: false },
    { event: 'Password change', device: 'MacBook Pro',    date: '20 May 2026, 14:30', ok: true  },
];

const MOCK_INVOICES: Invoice[] = [
    { id: 'INV-2026-05', date: '1 May 2026', amount: 'PKR 8,500', status: 'Paid' },
    { id: 'INV-2026-04', date: '1 Apr 2026', amount: 'PKR 8,500', status: 'Paid' },
    { id: 'INV-2026-03', date: '1 Mar 2026', amount: 'PKR 8,500', status: 'Paid' },
    { id: 'INV-2026-02', date: '1 Feb 2026', amount: 'PKR 7,200', status: 'Paid' },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/My/Profile',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Personal account profile and settings pages for the `my/` app. Use the **Layout** control to switch between app shell variants. Pick a story to find the settings page pattern that fits your design before wiring up real data.',
            },
        },
    },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const UserProfile: Story = {
    name: '1 · User Profile',
    parameters: {
        docs: {
            description: {
                story: 'Dashboard-style read-only profile view: avatar with camera overlay, personal info table, work & skills card, account settings quick-view with inline action links, and achievement badge grid. Use this as the "view profile" route rather than an edit form.',
            },
        },
    },
    render: ({ layout }) => <UserProfilePage key={layout} layout={layout} user={MOCK_USER} />,
};

export const SettingsPlain: Story = {
    name: '2 · Settings — Plain form',
    parameters: {
        docs: {
            description: {
                story: 'Single-column settings form stacked in Cards: photo upload, personal details grid (name/email/phone/dob/country/city/bio), and a change-password section. Clicking **Save changes** shows a green success banner. Email field is intentionally disabled — change-email is a separate flow.',
            },
        },
    },
    render: ({ layout }) => <SettingsPlainPage key={layout} layout={layout} user={MOCK_USER} />,
};

export const SettingsSidebar: Story = {
    name: '3 · Settings — Sidebar nav',
    parameters: {
        docs: {
            description: {
                story: 'Full-page settings layout: sticky 10-item sidebar (Basic info → Delete account) on the left, anchored Card sections on the right. Click a sidebar item to highlight the active section. Sections cover: basic info, email, password, 2FA with RadioGroup, social sign-in, notifications, appearance with `AppearanceTabs`, preferences, API key + webhook endpoint, and delete account danger zone.',
            },
        },
    },
    render: ({ layout }) => <SettingsSidebarPage key={layout} layout={layout} user={MOCK_USER} />,
};

export const Security: Story = {
    name: '4 · Security overview',
    parameters: {
        docs: {
            description: {
                story: 'Security hub: a 2FA status banner (disabled state) with authenticator-app vs SMS RadioGroup, an active sessions table showing device/location/last-active with per-row Revoke buttons and a "Sign out all" header action, and a recent login history table with Success/Failed badges.',
            },
        },
    },
    render: ({ layout }) => (
        <SecurityPage key={layout} layout={layout} user={MOCK_USER} sessions={MOCK_SESSIONS} loginActivity={MOCK_LOGIN_ACTIVITY} />
    ),
};

export const Billing: Story = {
    name: '5 · Billing & plan',
    parameters: {
        docs: {
            description: {
                story: 'Billing page: current plan card with inline usage bars (devices/users/storage), a payment method card showing the default card, an invoice history table with Download buttons, and a cancel subscription danger zone. The usage bars use inline `style={{ width }}` so they work without a charting library.',
            },
        },
    },
    render: ({ layout }) => <BillingPage key={layout} layout={layout} invoices={MOCK_INVOICES} />,
};
