import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { TeamMembersPage, InviteMemberPage, RolesPage, PermissionsTogglePage, TeamInfoPage } from '../../../src/pages/tenant/MembersPage';
import type { Member, Role, PermissionSection } from '../../../src/pages/tenant/MembersPage';

const MOCK_MEMBERS: Member[] = [
    { id: 1, name: 'Ahmad Faryab',  email: 'ahmad@suthra.pk',   role: 'Supervisor', status: 'Active',   twofa: true,  initials: 'AF', joined: 'Mar 2024' },
    { id: 2, name: 'Kamran Arif',   email: 'kamran@suthra.pk',  role: 'Operator',   status: 'Active',   twofa: false, initials: 'KA', joined: 'Jun 2024' },
    { id: 3, name: 'Zeeshan Butt',  email: 'zeeshan@suthra.pk', role: 'Operator',   status: 'Active',   twofa: true,  initials: 'ZB', joined: 'Aug 2024' },
    { id: 4, name: 'Tariq Mahmood', email: 'tariq@suthra.pk',   role: 'Admin',      status: 'Active',   twofa: true,  initials: 'TM', joined: 'Jan 2024' },
    { id: 5, name: 'Usman Malik',   email: 'usman@suthra.pk',   role: 'Operator',   status: 'Active',   twofa: false, initials: 'UM', joined: 'Nov 2024' },
    { id: 6, name: 'Bilal Chaudhry',email: 'bilal@suthra.pk',   role: 'Member',     status: 'Invited',  twofa: false, initials: 'BC', joined: 'May 2026' },
    { id: 7, name: 'Sajid Hussain', email: 'sajid@suthra.pk',   role: 'Member',     status: 'Inactive', twofa: false, initials: 'SH', joined: 'Sep 2024' },
];

const MOCK_ROLES: Role[] = [
    {
        name: 'Admin', color: 'text-purple-600 border-purple-200 bg-purple-50', count: 1,
        desc: 'Full access to all settings, members, billing, and fleet data.',
        perms: ['Manage members', 'Edit org settings', 'View billing', 'Delete data', 'Manage integrations'],
    },
    {
        name: 'Supervisor', color: 'text-blue-600 border-blue-200 bg-blue-50', count: 1,
        desc: 'Oversees fleet operations, incidents, and assignees.',
        perms: ['View all devices', 'Manage incidents', 'Assign devices', 'View reports', 'Invite members'],
    },
    {
        name: 'Operator', color: 'text-amber-600 border-amber-200 bg-amber-50', count: 3,
        desc: 'Monitors assigned devices and responds to alerts.',
        perms: ['View assigned devices', 'Acknowledge incidents', 'View live map', 'Export trip data'],
    },
    {
        name: 'Member', color: 'text-green-600 border-green-200 bg-green-50', count: 2,
        desc: 'Read-only access for reporting and dashboards.',
        perms: ['View dashboard', 'View reports', 'View assigned devices'],
    },
];

const MOCK_PERMISSION_SECTIONS: PermissionSection[] = [
    {
        section: 'Devices',
        rows: [
            { label: 'View all devices',    admin: true,  supervisor: true,  operator: true,  member: true  },
            { label: 'Add / remove device', admin: true,  supervisor: true,  operator: false, member: false },
            { label: 'Edit device settings',admin: true,  supervisor: false, operator: false, member: false },
        ],
    },
    {
        section: 'Incidents',
        rows: [
            { label: 'View incidents',       admin: true, supervisor: true,  operator: true,  member: true  },
            { label: 'Create incident',      admin: true, supervisor: true,  operator: true,  member: false },
            { label: 'Resolve incident',     admin: true, supervisor: true,  operator: false, member: false },
            { label: 'Delete incident',      admin: true, supervisor: false, operator: false, member: false },
        ],
    },
    {
        section: 'Team',
        rows: [
            { label: 'View members',         admin: true, supervisor: true,  operator: true,  member: true  },
            { label: 'Invite members',        admin: true, supervisor: true,  operator: false, member: false },
            { label: 'Edit member roles',    admin: true, supervisor: false, operator: false, member: false },
            { label: 'Remove members',       admin: true, supervisor: false, operator: false, member: false },
        ],
    },
    {
        section: 'Billing',
        rows: [
            { label: 'View invoices',        admin: true, supervisor: false, operator: false, member: false },
            { label: 'Manage billing',       admin: true, supervisor: false, operator: false, member: false },
        ],
    },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Members',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Team member management pages for the `tenant/` app. Uses `LayoutResolved` — use the **layout** control to preview different shell variants. Covers the full member lifecycle: viewing the team table, inviting new members, managing role definitions, configuring per-role permissions, and reviewing team health stats.',
            },
        },
    },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const TeamMembers: Story = {
    name: '1 · Team members',
    parameters: {
        docs: {
            description: {
                story: 'Searchable, filterable team table: bulk-select checkboxes, Avatar + name/email, role badge, status badge (Active / Invited / Inactive), 2FA shield icon, joined date, and a kebab-menu button per row. Search is live-filtered in state. Role and status dropdowns are decorative in this story.',
            },
        },
    },
    render: ({ layout }) => <TeamMembersPage layout={layout as LayoutName} members={MOCK_MEMBERS} />,
};

export const InviteMember: Story = {
    name: '2 · Invite member',
    parameters: {
        docs: {
            description: {
                story: 'Two-card invite flow: (1) dynamic email + role form — clicking **Add another** appends a row, the X button removes it, clicking **Send invitations** clears the form and shows a green banner; (2) invite-via-link card with read-only URL, Copy, and Regenerate. Clicking Send is wired to local state — no network calls.',
            },
        },
    },
    render: ({ layout }) => <InviteMemberPage layout={layout as LayoutName} />,
};

export const Roles: Story = {
    name: '3 · Roles',
    parameters: {
        docs: {
            description: {
                story: '2×2 card grid of role definitions (Admin / Supervisor / Operator / Member). Each card shows the role badge with member count, a description, and a bulleted list of granted permissions with check icons. A settings gear icon in the card header would open a role-edit drawer in production.',
            },
        },
    },
    render: ({ layout }) => <RolesPage layout={layout as LayoutName} roles={MOCK_ROLES} />,
};

export const PermissionsToggle: Story = {
    name: '4 · Permissions toggle',
    parameters: {
        docs: {
            description: {
                story: 'Matrix table of permissions grouped by section (Devices / Incidents / Team / Billing) with a Switch per role per row. Admin column Switches are disabled (always on). A **Save changes** button sits in the header. Section header rows span all columns with muted background to visually group the permission blocks.',
            },
        },
    },
    render: ({ layout }) => <PermissionsTogglePage layout={layout as LayoutName} sections={MOCK_PERMISSION_SECTIONS} />,
};

export const TeamInfo: Story = {
    name: '5 · Team info',
    parameters: {
        docs: {
            description: {
                story: 'Team health dashboard: 4 stat cards (total / active / pending / seats used), a role-distribution bar chart built with inline `style={{ width }}`, a 2FA compliance progress bar with an **Enforce 2FA** button, and a CSV import drop-zone with a sample template download link.',
            },
        },
    },
    render: ({ layout }) => <TeamInfoPage layout={layout as LayoutName} members={MOCK_MEMBERS} roles={MOCK_ROLES} />,
};
