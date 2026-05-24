import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import {
    UserProfileTabsPage, UserSettingsSidebarPage, CompanyProfilePage,
    SecuritySettingsPage, TenantBillingPage,
} from '../../../src/pages/tenant/TenantProfilePage';
import type {
    TenantUser, TenantOrg, OrgMember, SecurityLogEntry, TenantInvoice,
} from '../../../src/pages/tenant/TenantProfilePage';

const MOCK_USER: TenantUser = {
    name:     'Ahmad Faryab',
    email:    'ahmad@tad.io',
    phone:    '+92-300-1234567',
    role:     'Supervisor',
    initials: 'AF',
};

const MOCK_ORG: TenantOrg = {
    name:    'Track Any Device',
    slug:    'track-any-device',
    email:   'admin@tad.io',
    phone:   '+92-42-35761234',
    vat:     'PK-NTN-1234567-8',
    reg:     'EP-0042',
    website: 'https://tad.io',
};

const MOCK_ORG_MEMBERS: OrgMember[] = [
    { name: 'Ahmad Faryab',  email: 'ahmad@tad.io',   role: 'Supervisor', twofa: true,  joined: 'Mar 2024', initials: 'AF' },
    { name: 'Kamran Arif',   email: 'kamran@tad.io',  role: 'Operator',   twofa: false, joined: 'Jun 2024', initials: 'KA' },
    { name: 'Zeeshan Butt',  email: 'zeeshan@tad.io', role: 'Driver',     twofa: true,  joined: 'Aug 2024', initials: 'ZB' },
    { name: 'Tariq Mahmood', email: 'tariq@tad.io',   role: 'Admin',      twofa: true,  joined: 'Jan 2024', initials: 'TM' },
    { name: 'Usman Malik',   email: 'usman@tad.io',   role: 'Operator',   twofa: false, joined: 'Nov 2024', initials: 'UM' },
];

const MOCK_SECURITY_LOG: SecurityLogEntry[] = [
    { event: 'Member invited',       user: 'Ahmad Faryab',  ip: '203.128.1.44', date: '24 May 2026, 09:31', ok: true  },
    { event: 'Login failed (admin)', user: 'Unknown',       ip: '197.32.14.8',  date: '23 May 2026, 23:47', ok: false },
    { event: '2FA disabled',         user: 'Kamran Arif',   ip: '203.128.1.44', date: '22 May 2026, 14:12', ok: false },
    { event: 'Role changed',         user: 'Tariq Mahmood', ip: '203.128.1.44', date: '20 May 2026, 10:05', ok: true  },
    { event: 'API key generated',    user: 'Ahmad Faryab',  ip: '203.128.1.44', date: '18 May 2026, 16:30', ok: true  },
];

const MOCK_INVOICES: TenantInvoice[] = [
    { id: 'INV-2026-05', date: '1 May 2026', amount: 'PKR 24,500', status: 'Paid' },
    { id: 'INV-2026-04', date: '1 Apr 2026', amount: 'PKR 24,500', status: 'Paid' },
    { id: 'INV-2026-03', date: '1 Mar 2026', amount: 'PKR 24,500', status: 'Paid' },
    { id: 'INV-2026-02', date: '1 Feb 2026', amount: 'PKR 21,000', status: 'Paid' },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Profile',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'User profile and organisation settings pages for the `tenant/` app. Uses `LayoutResolved` with the layout switcher — use the **layout** control in the Storybook toolbar to preview any of the 11 app shell variants. Stories cover individual user settings, company/org profile, security policy, and billing.',
            },
        },
    },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Default: Story = {
    name: '1 · User profile — tabs',
    parameters: {
        docs: {
            description: {
                story: 'Tabbed profile page (Profile / Password / Notifications / Security / Appearance). The **Profile** tab has an avatar header, editable form, and inline save. Other tabs are full settings panels. This is the default "my profile" route inside the tenant shell.',
            },
        },
    },
    render: ({ layout }) => <UserProfileTabsPage key={layout} layout={layout} user={MOCK_USER} />,
};

export const SettingsSidebar: Story = {
    name: '2 · User settings — sidebar',
    parameters: {
        docs: {
            description: {
                story: 'Sticky 9-section sidebar (Personal info → Delete account) inside the full tenant shell. Mirrors the `my/Profile SettingsSidebar` but rendered inside `LayoutResolved` so the app chrome (top-bar, sidebar nav) is visible. Use the **layout** control to test different shell widths.',
            },
        },
    },
    render: ({ layout }) => <UserSettingsSidebarPage key={layout} layout={layout} user={MOCK_USER} orgName={MOCK_ORG.name} />,
};

export const CompanyProfile: Story = {
    name: '3 · Company / Tenant profile',
    parameters: {
        docs: {
            description: {
                story: 'Organisation-level settings with four tabs: **General** (org name, registration, address), **Branding** (logo upload, brand colour picker, white-label toggle), **Members** (searchable table with 2FA badges, enforce-2FA toggle), **Account** (org preferences table). Use this when the logged-in user is an org admin.',
            },
        },
    },
    render: ({ layout }) => <CompanyProfilePage key={layout} layout={layout} org={MOCK_ORG} members={MOCK_ORG_MEMBERS} />,
};

export const SecuritySettings: Story = {
    name: '4 · Security settings',
    parameters: {
        docs: {
            description: {
                story: 'Org-wide security policy page: 2FA enforcement card with member compliance stats, session policy (timeout, concurrent sessions, IP restriction switches), an IP whitelist card with add/remove rows, and a security event log table. Scoped to admins managing the whole organisation, not an individual account.',
            },
        },
    },
    render: ({ layout }) => <SecuritySettingsPage key={layout} layout={layout} securityLog={MOCK_SECURITY_LOG} />,
};

export const Billing: Story = {
    name: '5 · Billing & plan',
    parameters: {
        docs: {
            description: {
                story: 'Enterprise billing page: plan banner with 4 usage bars (devices / users / storage / API calls), two payment method cards (primary + secondary with a **Make default** button), invoice history table with Download buttons, and a cancel subscription danger zone. Compared to `my/Profile Billing`, this adds a secondary payment method and an API-calls usage bar.',
            },
        },
    },
    render: ({ layout }) => <TenantBillingPage key={layout} layout={layout} org={MOCK_ORG} invoices={MOCK_INVOICES} />,
};
