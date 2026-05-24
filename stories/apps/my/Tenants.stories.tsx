import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { TenantsList } from '../../../src/pages/my/TenantsPage';
import type { Tenant } from '../../../src/pages/my/TenantsPage';

const MOCK_TENANTS: Tenant[] = [
    { id: 1, slug: 'suthra-punjab',    display_name: 'Suthra Punjab',    sub_brand: null,              devices: 312, role: 'Supervisor' },
    { id: 2, slug: 'lahore-police',    display_name: 'Lahore Police',    sub_brand: 'Traffic Division', devices: 89,  role: 'Operator'   },
    { id: 3, slug: 'nha-logistics',    display_name: 'NHA Logistics',    sub_brand: null,              devices: 47,  role: 'Member'     },
    { id: 4, slug: 'punjab-ambulance', display_name: 'Punjab Ambulance', sub_brand: 'EMS Fleet',       devices: 120, role: 'Supervisor' },
    { id: 5, slug: 'agri-dept',        display_name: 'Agriculture Dept', sub_brand: null,              devices: 28,  role: 'Member'     },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/My/Tenants',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Default: Story = {
    render: ({ layout }) => <TenantsList key={layout} layout={layout} tenants={MOCK_TENANTS} />,
};
