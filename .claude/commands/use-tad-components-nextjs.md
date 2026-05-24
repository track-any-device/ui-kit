# @trackany-device/components — Next.js (App Router) integration

Use this skill when adding, modifying, or troubleshooting the use of `@trackany-device/components` in a Next.js App Router project.

---

## 1. Install

```bash
npm install @trackany-device/components
# peer deps (only the ones you actually use)
npm install lucide-react tailwindcss
```

The package ships source CSS — no build step needed for styles.

---

## 2. Tailwind CSS setup

In your global CSS file (e.g. `app/globals.css`):

```css
@import "tailwindcss";

/* Component library base styles & design tokens */
@import "@trackany-device/components/styles/themes.css";

/* Optional: KeenIcons font (only if you use <KeenIcon>) */
@import "@trackany-device/components/styles/keenicons.css";
```

Apply a theme and optional dark mode via `data-theme` on `<html>` in `app/layout.tsx`:

```tsx
// app/layout.tsx (Server Component)
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="blue">
            <body>{children}</body>
        </html>
    );
}
```

Add `.dark` to `<html>` for dark mode: `<html data-theme="blue" class="dark">`.

Available themes: `blue` (default) · `green` · `purple` · `red` · `orange` · `rose` · `sky` · `teal` · `cyan` · `indigo` · `violet` · `emerald` · `lime` · `yellow` · `amber` · `pink` · `fuchsia` · `neutral` · `slate` · `gray`

---

## 3. Wire up the Next.js adapter

Because the adapter uses client hooks (`useRouter`, `usePathname`), create a dedicated **Client Component** wrapper and call it from the server root layout.

```tsx
// app/providers.tsx  ← new file, mark as client
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { PlatformProvider, createNextjsAdapter } from '@trackany-device/components';

interface ProvidersProps {
    children: React.ReactNode;
    /** Shared server data (auth, nav_links, …) passed down from the root layout */
    pageProps?: Record<string, unknown>;
}

export function Providers({ children, pageProps = {} }: ProvidersProps) {
    const adapter = createNextjsAdapter({ Link, useRouter, usePathname, pageProps });
    return <PlatformProvider adapter={adapter}>{children}</PlatformProvider>;
}
```

```tsx
// app/layout.tsx (Server Component)
import './globals.css';
import { Providers } from './providers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // Fetch shared data server-side and pass as pageProps
    const auth = await getAuthUser(); // your own helper

    return (
        <html lang="en" data-theme="blue">
            <body>
                <Providers pageProps={{ auth }}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
```

`createNextjsAdapter` accepts:

| Prop | Type | Purpose |
|------|------|---------|
| `Link` | `next/link` | SPA navigation links |
| `useRouter` | `next/navigation` hook | Programmatic navigation |
| `usePathname` | `next/navigation` hook | Current pathname (active nav highlighting) |
| `pageProps` | `Record<string, unknown>` | Shared server data (auth, nav config, etc.) |

> **Important:** `pageProps` is frozen at adapter creation time. For data that changes between navigations, re-render `Providers` from the server (it re-creates the adapter with fresh props on each page load).

> **Document `<head>`:** Next.js manages `<head>` via the `metadata` export on Server Components. The `PlatformHead` from this library is a no-op in the Next.js adapter — use Next.js's own `metadata` API instead.

---

## 4. Choose a layout

Wrap your page in any layout component. Because layouts use the platform hooks, they must run in a Client Component context — either mark the page `'use client'` or wrap the layout in a client shell.

```tsx
// app/dashboard/page.tsx
'use client';

import { NavbarSidebarLayout, usePlatformPageProps, usePlatformUrl } from '@trackany-device/components';

interface PageProps {
    auth: { user: { name: string; email: string; avatar_url: string | null } };
}

export default function DashboardPage() {
    const { auth } = usePlatformPageProps<PageProps>();

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

All layouts are **mobile-responsive**: sidebar collapses to an overlay drawer on small screens.

---

## 5. Platform hooks in client components

Inside any component rendered under `<PlatformProvider>`, use these hooks:

```tsx
'use client';

import {
    usePlatformUrl,       // current pathname
    usePlatformPageProps, // shared pageProps passed to createNextjsAdapter
    usePlatformNavigate,  // programmatic navigation (wraps useRouter)
    usePlatformForm,      // fetch-based form hook (same API as Inertia useForm)
    PlatformLink,         // <Link> that uses the adapter
} from '@trackany-device/components';

// Current pathname (used for active nav highlighting)
const url = usePlatformUrl();

// Shared props from pageProps (auth, nav_links, etc.)
const { auth } = usePlatformPageProps<{ auth: { user: User } }>();

// Programmatic navigation
const navigate = usePlatformNavigate();
navigate('/dashboard', { replace: true });

// Fetch-based form (not tied to Next.js server actions)
const form = usePlatformForm({ email: '', password: '' });
form.post('/api/login', {
    onError: (errors) => console.error(errors),
});
```

> `usePlatformPageProps` reads from the `pageProps` object you passed to `createNextjsAdapter` — **not** from any server context at call time. Keep server-fetched shared data in `pageProps`.

---

## 6. Common components

```tsx
import {
    // Feedback
    AlertError,   // <AlertError message="Something went wrong" />
    InputError,   // field-level error below inputs

    // Navigation
    Breadcrumbs,  // <Breadcrumbs items={[{ title, href }]} />
    PlatformLink, // SPA-aware <a> — uses next/link under the hood

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
// types/page-props.ts
export interface Auth {
    user: {
        id: number;
        name: string;
        email: string;
        avatar_url: string | null;
    };
}

export interface SharedPageProps {
    auth: Auth;
    flash?: { success?: string; error?: string };
}
```

Pass on the server:

```tsx
// app/layout.tsx
const auth = await getAuthUser();
<Providers pageProps={{ auth } satisfies SharedPageProps}>
```

Consume on the client:

```tsx
const { auth } = usePlatformPageProps<SharedPageProps>();
```

---

## 8. Shared layout with Next.js nested layouts

Instead of per-page `'use client'` wrappers, define the layout once in a route group:

```
app/
  (dashboard)/
    layout.tsx   ← client layout with NavbarSidebarLayout
    page.tsx     ← plain server component
    settings/
      page.tsx
```

```tsx
// app/(dashboard)/layout.tsx
'use client';

import { NavbarSidebarLayout, usePlatformPageProps, usePlatformUrl } from '@trackany-device/components';
import type { SharedPageProps } from '@/types/page-props';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePlatformPageProps<SharedPageProps>();

    return (
        <NavbarSidebarLayout
            currentUrl={usePlatformUrl()}
            user={{ name: auth.user.name, email: auth.user.email, avatar: auth.user.avatar_url }}
            navItems={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Settings', href: '/settings' },
            ]}
            title="App"
            logoutUrl="/api/logout"
            settingsUrl="/settings"
        >
            {children}
        </NavbarSidebarLayout>
    );
}
```

Pages inside `(dashboard)/` are plain Server Components — no `'use client'` needed.

---

## Key rules

- Always wrap with `<PlatformProvider adapter={adapter}>` **in a Client Component** — `createNextjsAdapter` calls `useRouter` and `usePathname`, which require client context.
- Pass server-fetched shared data (auth, nav config) via `pageProps` — `usePlatformPageProps` reads from there, not from React context at call time.
- Import `themes.css` (and optionally `keenicons.css`) in your global CSS before any component renders — design tokens (colours, spacing) come from there.
- Use Next.js `metadata` exports for document `<head>` management — `PlatformHead` is a no-op in this adapter.
- Mobile layouts are built-in — do not add your own hamburger/overlay logic around layout components.
