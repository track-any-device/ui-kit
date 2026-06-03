# ui-kit — AI Instructions

This is the **shared React component library** for the Track Any Device platform.
npm: `@trackany-device/components` | Version: semantic-release from conventional commits

This library is consumed by every frontend surface: Laravel Inertia apps (`server-tenant`,
`server-login`), the Next.js site (`web/`), and Storybook. It must remain framework-agnostic —
no direct imports from `@inertiajs/react`, `next/link`, or `next/navigation`.

Read this file before making any change.

---

## Platform-Wide Rules

These three rules apply in every repository under the `track-any-device` organisation.

**Cross-repo changes: file a GitHub issue first.**
If a task in this repository requires a change in another package or server app — stop. Open a
GitHub issue in the target repository describing exactly what is needed and why. Reference that
issue number in your commit message (`ref track-any-device/{repo}#{n}`). Do not directly edit
files in another repository. When picking up a cross-repo issue, run Claude locally inside that
repository's working directory and work only within its scope.

**Release order: packages before server apps.**
This package is independent of the PHP packages but must be released before any consuming app
bumps its npm dependency. Release via conventional commits: `fix:` → patch, `feat:` → minor,
`BREAKING CHANGE` footer → major. Do not manually tag — semantic-release handles it.

**Database layer lives in `package-core` only.**
This package has no database interaction. Do not add API calls, server-side logic, or
data-fetching to this library.

---

## Rule 1 — Plan before implementing

Before writing any code, ask clarifying questions. Present a plan and get explicit agreement.
Only begin once the approach is confirmed.

---

## Rule 2 — No framework-specific imports inside this package

This library must not import from `@inertiajs/react`, `next/link`, `next/navigation`,
or any other framework-specific package.

When a component needs platform behaviour (navigation, page props, form submission), use the
**Platform Adapter** system in `src/platform/`:

| Need | Use |
|---|---|
| Navigate to a URL | `usePlatformNavigate()` |
| Render a link | `<PlatformLink href="...">` |
| Read shared page props (auth, flash) | `usePlatformPageProps<T>()` |
| Submit a form | `usePlatformForm(initialData)` |
| Current URL (for active-link logic) | `usePlatformUrl()` |
| Document head / title | `usePlatformHead()` |

Each consuming app injects the adapter once at its root:

```tsx
// Laravel Inertia apps
const adapter = createInertiaAdapter({ Link, usePage, useForm: useForm as any, Head, router });
<PlatformProvider adapter={adapter}><App /></PlatformProvider>

// Next.js
const adapter = createNextjsAdapter({ Link, useRouter, usePathname, pageProps });
<PlatformProvider adapter={adapter}><App /></PlatformProvider>
```

---

## Rule 3 — Every component needs `'use client'` if it calls a hook

Files in `src/` that **directly call any React hook** (including platform hooks) must have
`'use client'` as their first line. Next.js treats files without it as Server Components
and throws a hooks error during static generation.

Components that only *render* other client components (no hooks in their own body) do NOT
need `'use client'`.

---

## Rule 4 — Component hierarchy: components → elements → layouts → pages

| Layer | Location | Rule |
|---|---|---|
| Components | `src/components/` | Generic, reusable UI primitives. No domain knowledge. |
| Elements | `src/elements/` | Domain composites built only from components. |
| Layouts | `src/layouts/` | Page-structure wrappers built from components + elements. |

Upper layers may import from lower layers. Lower layers must never import from upper layers.
Pages (in consuming apps) import from this library — never the reverse.

---

## Rule 5 — All exports go through `src/index.ts`

Never import directly from `src/components/Foo.tsx` in consuming apps.
Every public component, element, layout, hook, and type must be exported from `src/index.ts`.

---

## Rule 6 — Every new component needs a Storybook story

```
src/components/Card.tsx          → storybook/stories/components/Card.stories.tsx
src/layouts/AuthLayout.tsx       → storybook/stories/layouts/AuthLayout.stories.tsx
src/elements/UserCard.tsx        → storybook/stories/elements/UserCard.stories.tsx
```

Stories must cover: default state, key prop variants, empty/loading states where applicable.

---

## Platform context import depth

| File location | Correct import |
|---|---|
| `src/components/*.tsx` | `'../platform/context'` |
| `src/components/ui/*.tsx` | `'../../platform/context'` |
| `src/hooks/*.ts` | `'../platform/context'` |
| `src/layouts/*.tsx` | `'../platform/context'` |
| `src/elements/*.tsx` | `'../platform/context'` |

---

## Versioning

semantic-release on merge to `main`. Conventional commit prefixes:
- `fix:` → patch
- `feat:` → minor
- `BREAKING CHANGE` in footer → major

Do not manually create tags. Do not merge a breaking change without documenting the migration
in the commit body and filing cross-repo issues against all consuming apps.
