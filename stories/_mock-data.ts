import type { User } from '@trackany-device/components';

export const mockUser: User = {
    id: 1,
    name: 'Ahmad Faryab',
    email: 'ahmad@example.com',
    avatar: undefined,
    email_verified_at: '2026-01-01T00:00:00.000Z',
    role: 'admin',
    two_factor_enabled: false,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
};

export const mockTenant = {
    display_name: 'Suthra Punjab',
    sub_brand: 'Environment Protection & Climate Change Dept.',
};

export const mockBreadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Settings', href: '/settings' },
    { title: 'Profile', href: '/settings/profile' },
];

export const mockPageProps = {
    auth: { user: mockUser },
    sidebarOpen: true,
    tenant: mockTenant,
    unreadNotificationsCount: 3,
    flash: {},
    errors: {},
};
