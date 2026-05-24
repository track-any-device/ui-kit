import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { InvitePeoplePage, SentInvitesPage } from '../../../src/pages/tenant/InvitePage';
import type { SentInvite } from '../../../src/pages/tenant/InvitePage';

const MOCK_SENT_INVITES: SentInvite[] = [
    { name: 'Bilal Chaudhry',  email: 'bilal@tad.io',    status: 'Accepted', activity: '2 days ago',  initials: 'BC' },
    { name: 'Sara Qureshi',    email: 'sara@tad.io',     status: 'Pending',  activity: '4 days ago',  initials: 'SQ' },
    { name: 'Amir Raza',       email: 'amir.raza@gmail.com',status: 'Declined', activity: '1 week ago',  initials: 'AR' },
    { name: 'Faisal Mehmood',  email: 'faisal@example.pk', status: 'Pending',  activity: '1 week ago',  initials: 'FM' },
    { name: 'Nadia Bashir',    email: 'nadia@tad.io',    status: 'Accepted', activity: '2 weeks ago', initials: 'NB' },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Invite',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Invite team members and track sent invitations for the tenant app. Covers two flows: sending new invites (email form + shareable link) and reviewing past invites with status.',
            },
        },
    },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const InvitePeople: Story = {
    name: '1 · Invite people',
    parameters: {
        docs: {
            description: {
                story: 'Three cards stacked: (1) email + role form with an "Add another email" dashed button — typing an address and clicking **Send invitation** shows a green confirmation banner; (2) invite-via-link panel with a read-only monospace URL, Copy icon button, and Regenerate link; (3) referral rewards card showing 3 stat counters (invites sent / accepted / months earned).',
            },
        },
    },
    render: ({ layout }) => <InvitePeoplePage key={layout} layout={layout} />,
};

export const SentInvites: Story = {
    name: '2 · Sent invites table',
    parameters: {
        docs: {
            description: {
                story: 'Full-width table of sent invitations. Each row shows an `Avatar` with initials, name + email, a coloured status badge (Accepted green / Pending amber / Declined red), last activity timestamp, and a **Revoke** ghost button that appears only for Pending rows.',
            },
        },
    },
    render: ({ layout }) => <SentInvitesPage key={layout} layout={layout} invites={MOCK_SENT_INVITES} />,
};
