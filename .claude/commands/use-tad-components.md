# @trackany-device/components — Laravel + Inertia + React integration

Use this skill when adding, modifying, or troubleshooting the use of `@trackany-device/components` in a Laravel application that uses Inertia.js with React.

---

## 1. Install

```bash
npm install @trackany-device/components
# peer deps (only the ones you actually use)
npm install @inertiajs/react lucide-react tailwindcss
```

The package ships source CSS — no build step needed for styles.

---

## 2. Tailwind CSS setup

In your main CSS file (e.g. `resources/css/app.css`):

```css
@import "tailwindcss";

/* Component library base styles & design tokens */
@import "@trackany-device/components/styles/themes.css";

/* Optional: KeenIcons font (only if you use <KeenIcon>) */
@import "@trackany-device/components/styles/keenicons.css";
```

In `vite.config.ts` make sure `@tailwindcss/vite` is loaded:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
});
```

---

## 3. Wire up the Inertia adapter (once, in app.tsx)

The package is framework-agnostic. You hand it Inertia's own primitives so there is zero coupling between the library and `@inertiajs/react`.

```tsx
// resources/js/app.tsx
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Link, usePage, useForm, Head, router } from '@inertiajs/react';
import { PlatformProvider, createInertiaAdapter } from '@trackany-device/components';

const adapter = createInertiaAdapter({ Link, usePage, useForm, Head, router });

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <PlatformProvider adapter={adapter}>
                <App {...props} />
            </PlatformProvider>
        );
    },
});
```

`createInertiaAdapter` accepts:
| Prop | Type | Purpose |
|------|------|---------|
| `Link` | Inertia `<Link>` | SPA navigation links |
| `usePage` | Inertia hook | Current URL + shared props |
| `useForm` | Inertia hook | Form state + submission |
| `Head` | Inertia `<Head>` | Document title management |
| `router` | Inertia router | Programmatic navigation |

---

## 4. Choose a layout

Wrap your Inertia page in any layout component. All layouts accept the same base props:

```tsx
import { NavbarSidebarLayout } from '@trackany-device/components';
// or: SidebarFixedLayout, MegaMenuLayout, WorkspaceSidebarLayout, TopNavLayout, ...

export default function DashboardPage() {
    const { auth } = usePlatformPageProps<{ auth: { user: User } }>();

    return (
        <NavbarSidebarLayout
            logo={<img src="/logo.svg" className="h-8" />}
            appName="My App"
            logoHref="/dashboard"
            currentUrl={usePlatformUrl()}
            user={{
                name: auth.user.name,
                email: auth.user.email,
                avatar: auth.user.avatar_url,
            }}
            navItems={[
                { title: 'Dashboard', href: '/dashboard' },
                {
                    title: 'Settings',
                    items: [
                        { title: 'Profile', href: '/profile' },
                        { title: 'Team', href: '/team' },
                    ],
                },
            ]}
            title="Dashboard"
            breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}
            logoutUrl="/logout"
            settingsUrl="/profile"
        >
            {/* page content */}
        </NavbarSidebarLayout>
    );
}
```

### Available layouts

| Component | Description |
|-----------|-------------|
| `SidebarFixedLayout` | Fixed sidebar + fixed header. Most common. |
| `NavbarSidebarLayout` | Horizontal navbar + collapsible sidebar |
| `NavbarCollapsibleLayout` | Horizontal navbar + optional sidebar |
| `TopNavLayout` | Sticky top nav only, no sidebar |
| `MegaMenuLayout` | Full-width header with integrated mega menu |
| `MegaMenuNavbarLayout` | Mega menu header + secondary navbar |
| `WorkspaceSidebarLayout` | Workspace strip + sidebar (Slack-style) |
| `SidebarDualMenuLayout` | Icon strip + full sidebar |
| `SplitSidebarLayout` | Primary icon strip + secondary nav panel |
| `SidebarTabsLayout` | Tabbed sidebar with section switcher |
| `SidebarMinimalLayout` | Single clean sidebar |

All layouts are **mobile-responsive**: sidebar collapses to an overlay drawer, navbar menus become an absolute-positioned dropdown (does not shift page content).

---

## 5. Platform hooks in page components

Inside any component rendered under `<PlatformProvider>`, use these hooks instead of importing from `@inertiajs/react` directly:

```tsx
import {
    usePlatformUrl,       // current pathname + search
    usePlatformPageProps, // Inertia shared props (replaces usePage().props)
    usePlatformNavigate,  // programmatic navigation
    usePlatformForm,      // Inertia-compatible form hook
    PlatformLink,         // <Link> that uses the adapter
} from '@trackany-device/components';

// Current URL (used for active nav highlighting)
const url = usePlatformUrl();

// Shared props from HandleInertiaRequests middleware
const { auth, flash } = usePlatformPageProps<{
    auth: { user: User };
    flash: { success?: string };
}>();

// Programmatic navigation
const navigate = usePlatformNavigate();
navigate('/dashboard', { replace: true, preserveScroll: false });

// Form (same API as Inertia's useForm)
const form = usePlatformForm({ email: '', password: '' });
form.post('/login', {
    onError: (errors) => console.error(errors),
});
```

---

## 6. Common components

```tsx
import {
    // Feedback
    AlertError,   // <AlertError message={form.errors.email} />
    InputError,   // field-level error below inputs

    // Navigation
    Breadcrumbs,  // <Breadcrumbs items={[{ title, href }]} />
    PlatformLink, // SPA-aware <a> — honours Inertia prefetch/preserveScroll

    // Icons
    KeenIcon,     // <KeenIcon icon="home" style="duotone" />

    // Layout primitives (if building custom layouts)
    AppShell, AppHeader, AppSidebar, AppContent,
} from '@trackany-device/components';
```

---

## 7. TypeScript: shared page props

Define your props once and reuse everywhere:

```ts
// resources/js/types/index.d.ts
export interface Auth {
    user: {
        id: number;
        name: string;
        email: string;
        avatar_url: string | null;
    };
}

export interface PageProps {
    auth: Auth;
    flash: { success?: string; error?: string };
}
```

```tsx
const { auth, flash } = usePlatformPageProps<PageProps>();
```

---

## 8. Layout as a persistent wrapper (optional)

To avoid layout re-mounting on navigation, attach the layout to the page component:

```tsx
// resources/js/Pages/Dashboard.tsx
import { NavbarSidebarLayout } from '@trackany-device/components';
import type { InertiaPage } from '../types/inertia';

const Dashboard: InertiaPage = () => <div>Content</div>;

Dashboard.layout = (page) => (
    <NavbarSidebarLayout title="Dashboard" currentUrl={...} {...sharedProps}>
        {page}
    </NavbarSidebarLayout>
);

export default Dashboard;
```

---

## Key rules

- Always wrap the app root with `<PlatformProvider adapter={adapter}>` **before** using any hook or layout from this package.
- Use `usePlatformPageProps` instead of Inertia's `usePage().props` in shared components so they stay framework-agnostic.
- Import the CSS (`themes.css`) before any component renders, otherwise design tokens (colours, spacing) will be missing.
- Mobile layouts are built-in — do not add your own hamburger/overlay logic around layout components.
