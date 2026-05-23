# @track-any-device/components

Shared React component library for the **Track Any Device** platform.  
Built with React 19, Tailwind CSS v4, Radix UI primitives, and shadcn/ui conventions.

[![Socket Badge](https://badge.socket.dev/npm/package/@trackany-device/components/1.0.0)](https://badge.socket.dev/npm/package/@trackany-device/components/1.0.0)



## Install

```bash
npm install @track-any-device/components
```

> **Peer dependencies** — install the ones you use:
> ```bash
> npm install react react-dom lucide-react tailwindcss
> ```
> Optional peers (only needed for specific components):
> `@dnd-kit/*`, `@tanstack/react-table`, `@xyflow/react`, `recharts`, `react-hook-form`, `zod`

---

## Setup

### 1. Import the styles

In your app's CSS entry point (e.g. `app.css`):

```css
@import "tailwindcss";
@import "@track-any-device/components/styles/themes.css";

/* If you use KeenIcons: */
@import "@track-any-device/components/styles/keenicons.css";
```

### 2. Wrap your app with a theme

Apply a `data-theme` attribute to your root element (or `<html>`):

```html
<html data-theme="blue">   <!-- or green, purple, red, orange … -->
```

Add `.dark` for dark mode:

```html
<html data-theme="blue" class="dark">
```

### 3. Set up the Platform adapter

The library abstracts routing/forms behind a `PlatformProvider`. Pick the adapter for your framework:

```tsx
// Next.js
import { PlatformProvider, createNextjsAdapter } from '@track-any-device/components';

export default function RootLayout({ children }) {
    return (
        <PlatformProvider adapter={createNextjsAdapter()}>
            {children}
        </PlatformProvider>
    );
}
```

```tsx
// Inertia.js (Laravel)
import { PlatformProvider, createInertiaAdapter } from '@track-any-device/components';

createInertiaApp({
    setup({ el, App, props }) {
        createRoot(el).render(
            <PlatformProvider adapter={createInertiaAdapter()}>
                <App {...props} />
            </PlatformProvider>
        );
    },
});
```

---

## Usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@track-any-device/components';

export default function Example() {
    return (
        <Card className="w-80">
            <CardHeader>
                <CardTitle>Hello world</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
                <Button variant="primary">Save</Button>
                <Button variant="outline">Cancel</Button>
            </CardContent>
        </Card>
    );
}
```

---

## Themes

21 brand colour schemes are included. Apply via `data-theme` on any ancestor element:

| Token | Colour |
|-------|--------|
| `default` / `blue` | Blue-600 |
| `green` | Green-600 |
| `purple` | Purple-600 |
| `red` | Red-600 |
| `orange` | Orange-500 |
| `rose` | Rose-600 |
| `sky` | Sky-500 |
| `teal` | Teal-600 |
| `cyan` | Cyan-600 |
| `indigo` | Indigo-600 |
| `violet` | Violet-600 |
| `emerald` | Emerald-600 |
| `lime` | Lime-600 |
| `yellow` | Yellow-500 |
| `amber` | Amber-500 |
| `pink` | Pink-500 |
| `fuchsia` | Fuchsia-600 |
| `neutral` | Neutral-700 |
| `slate` | Slate-600 |
| `gray` | Gray-600 |

Each theme ships with a matching dark variant — add `.dark` to the same element.

---

## Components

### App chrome
`AppShell` · `AppHeader` · `AppSidebar` · `AppSidebarHeader` · `AppContent` · `NavMain` · `NavUser` · `NavFooter` · `NotificationBell` · `AppLogo` · `Breadcrumbs` · `AppearanceTabs`

### UI primitives
`Button` · `Input` · `Select` · `Checkbox` · `Switch` · `Slider` · `Textarea` · `Label` · `Badge` · `Avatar` · `Card` · `Dialog` · `Drawer` · `Sheet` · `Popover` · `Tooltip` · `DropdownMenu` · `Tabs` · `Accordion` · `Progress` · `Skeleton` · `Spinner` · `Separator` · `Alert` · `Sonner` (toast)

### Data
`DataGrid` · `DataList` · `Chart` · `StatCard` · `Pagination`

### Forms & auth
`LoginForm` · `RegisterForm` · `ForgotPasswordForm` · `ResetPasswordForm` · `ConfirmPasswordForm` · `OtpForm` · `VerifyEmailForm` · `SmsChallengeForm`

### Icons
`KeenIcon` — ~1 200 icons in four styles (`duotone` · `filled` · `outline` · `solid`):

```tsx
import { KeenIcon } from '@track-any-device/components';
// Don't forget: import '@track-any-device/components/styles/keenicons.css';

<KeenIcon icon="home" style="duotone" className="size-5" />
```

---

## Storybook

Browse all components interactively — includes a **Theme** toolbar to switch between all 21 colour schemes and a **Color Mode** toggle for dark mode.

```bash
npm run storybook        # dev server on :6006
npm run build-storybook  # static build → storybook-static/
```

### Docker (static Storybook)

```bash
docker build -t tad-storybook .
docker run -p 8080:80 tad-storybook
# open http://localhost:8080
```

---

## Development

```bash
npm install
npm run storybook       # live-reload component dev
npm run types:check     # TypeScript validation
```

---

## Release

Releases are fully automated via [semantic-release](https://github.com/semantic-release/semantic-release) on every push to `main`.

| Commit prefix | Version bump |
|---------------|-------------|
| `fix:` | patch — `1.0.0 → 1.0.1` |
| `feat:` | minor — `1.0.1 → 1.1.0` |
| `feat!:` / `BREAKING CHANGE` | major — `1.1.0 → 2.0.0` |
| `chore:` `docs:` `ci:` `style:` `refactor:` | no release |

On release, semantic-release automatically:
1. Calculates the next version from commit messages
2. Updates `package.json` and `CHANGELOG.md`
3. Creates a GitHub release with notes
4. Publishes to npm

---

## License

UNLICENSED — private, all rights reserved.
