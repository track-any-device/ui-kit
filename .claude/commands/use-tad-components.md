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

## 4. Platform hooks

Inside any component rendered under `<PlatformProvider>`:

```tsx
import {
    usePlatformUrl,       // current pathname + search
    usePlatformPageProps, // Inertia shared props (replaces usePage().props)
    usePlatformNavigate,  // programmatic navigation
    usePlatformForm,      // Inertia-compatible form hook
    PlatformLink,         // <Link> that uses the adapter
} from '@trackany-device/components';

const url = usePlatformUrl();
const { auth, flash } = usePlatformPageProps<{ auth: { user: User }; flash: { success?: string } }>();
const navigate = usePlatformNavigate();
navigate('/dashboard', { replace: true, preserveScroll: false });
const form = usePlatformForm({ email: '', password: '' });
form.post('/login', { onError: (errors) => console.error(errors) });
```

---

## 5. Layouts

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

All layouts are **mobile-responsive** — sidebar collapses to an overlay drawer automatically.

### Layout usage

```tsx
import { NavbarSidebarLayout } from '@trackany-device/components';

export default function DashboardPage() {
    const { auth } = usePlatformPageProps<{ auth: { user: User } }>();

    return (
        <NavbarSidebarLayout
            logo={<img src="/logo.svg" className="h-8" />}
            appName="My App"
            logoHref="/dashboard"
            currentUrl={usePlatformUrl()}
            user={{ name: auth.user.name, email: auth.user.email, avatar: auth.user.avatar_url }}
            navItems={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Settings', items: [{ title: 'Profile', href: '/profile' }] },
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

### Auth layouts

| Component | Description |
|-----------|-------------|
| `AuthSplitLayout` | Side-by-side form + image |
| `AuthCenteredLayout` | Centered form card |
| `AuthSimpleLayout` | Minimal centered form |
| `AuthCardLayout` | Card-style form |
| `AuthBrandedLayout` | Branded form with imagery |
| `AuthClassicLayout` | Classic multi-step layout |

### Persistent layout (avoids re-mounting on navigation)

```tsx
Dashboard.layout = (page) => (
    <NavbarSidebarLayout title="Dashboard" currentUrl={...} {...sharedProps}>
        {page}
    </NavbarSidebarLayout>
);
```

---

## 6. Component reference

### Controls (form inputs)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Button` | `variant?: 'default'\|'primary'\|'destructive'\|'outline'\|'secondary'\|'ghost'\|'link'`, `size?: 'sm'\|'md'\|'lg'\|'icon'`, `loading?: boolean`, `fullWidth?: boolean`, `asChild?: boolean` | Action button with loading state |
| `Input` | `error?: string`, `...InputHTMLAttributes` | Text input with error display |
| `PasswordInput` | `error?: string`, `...InputHTMLAttributes` | Toggle-able password field |
| `Label` | `required?: boolean`, `...LabelHTMLAttributes` | Form label with required indicator |
| `Select` (native) | `error?: string`, `...SelectHTMLAttributes` | Native `<select>` with error |
| `Checkbox` | `label?: ReactNode`, `error?: string`, `...InputHTMLAttributes` | Checkbox with label + error |
| `Textarea` | `error?: string`, `rows?: number`, `...TextareaHTMLAttributes` | Multi-line input |
| `FormField` | `label: string`, `htmlFor?: string`, `hint?: string`, `required?: boolean` | Label + input + hint wrapper |
| `Switch` | `label?: string`, `description?: string`, `error?: string`, `...SwitchPrimitiveProps` | Toggle switch |
| `Slider` | `label?: string`, `showValue?: boolean`, `error?: string`, `...SliderPrimitiveProps` | Range slider |
| `RadioGroup` | `options: RadioOption[]`, `value?: string`, `onChange?: (value) => void`, `orientation?: 'horizontal'\|'vertical'`, `error?: string` | Radio group |
| `DateField` | `label?: string`, `error?: string`, `inputClassName?: string` | Segment-based date input |
| `Heading` | `as?: 'h1'–'h6'` | Semantic heading |
| `Paragraph` | `size?: 'xs'\|'sm'\|'md'\|'lg'`, `variant?: 'default'\|'muted'\|'lead'\|'error'\|'success'` | Text paragraph |

### Feedback & display

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `AlertError` | `message: string`, `onClose?: () => void` | Error alert banner |
| `InputError` | `message?: string` | Inline field error |
| `Alert` / `AlertTitle` / `AlertDescription` | `...HTMLAttributes` | Alert container primitives |
| `Badge` | `variant?: 'primary'\|'secondary'\|'success'\|'warning'\|'info'\|'destructive'\|'outline'`, `appearance?: 'default'\|'light'\|'outline'\|'ghost'`, `size?: 'lg'\|'md'\|'sm'\|'xs'`, `shape?: 'default'\|'circle'`, `disabled?: boolean` | Status badge |
| `Skeleton` | `className?: string` | Shimmer loading placeholder |
| `Spinner` | `className?: string` | Animated spinner |
| `Callout` | `type?: 'info'\|'warning'\|'success'\|'error'` | Emphasis callout block |
| `EmptyState` | `icon?: LucideIcon`, `title: string`, `description?: string`, `actionLabel?: string`, `actionHref?: string` | Empty state placeholder |

### Cards

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Card` / `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter` | `className?: string` | Card primitives |
| `StatCard` | `label: string`, `value: number\|string`, `delta?: string`, `deltaType?: 'up'\|'down'\|'neutral'`, `icon?: LucideIcon`, `description?: string` | Metric card with delta |
| `PlanCard` | `name: string`, `price: string`, `description?: string`, `renewal?: string`, `action?: ReactNode`, `usage?: UsageMeterItem[]`, `columns?: 2\|3\|4` | Pricing/plan card |
| `VehicleCard` | `vehicle: VehicleCardData`, `onClick?: (vehicle) => void` | Fleet vehicle status card |
| `DriverCard` | `driver: DriverCardData`, `onClick?: (driver) => void` | Driver profile card |
| `IncidentCard` | `incident: IncidentCardData`, `onClick?: (incident) => void` | Severity-colored incident card |
| `ProductCard` | `product: ProductCardData`, `currency?: 'USD'\|'PKR'`, `actionHref?: string`, `actionLabel?: string` | Product listing card |

### Navigation

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Breadcrumbs` | `breadcrumbs: BreadcrumbItem[]` | Pre-built breadcrumb trail |
| `Breadcrumb` / `BreadcrumbList` / `BreadcrumbItem` / `BreadcrumbLink` / `BreadcrumbPage` / `BreadcrumbSeparator` / `BreadcrumbEllipsis` | — | Breadcrumb primitives |
| `PlatformLink` | `href: string`, `...HTMLAnchorAttributes` | SPA-aware link |
| `TextLink` | `href: string`, `external?: boolean` | Styled text link |
| `Pagination` | `...HTMLAttributes` | Pagination container |
| `NavigationMenu` / `NavigationMenuList` / `NavigationMenuItem` / `NavigationMenuContent` / `NavigationMenuTrigger` / `NavigationMenuLink` | — | Navigation menu primitives |

### Dropdowns & menus

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `DropdownMenu` | `open?: boolean`, `onOpenChange?: (open) => void` | Dropdown provider |
| `DropdownMenuTrigger` | `asChild?: boolean` | Trigger button |
| `DropdownMenuContent` | `align?: 'start'\|'end'\|'center'`, `sideOffset?: number` | Menu popup |
| `DropdownMenuItem` | `inset?: boolean` | Menu item |
| `DropdownMenuCheckboxItem` | `checked?: boolean`, `onCheckedChange?: (checked) => void` | Checkbox item |
| `DropdownMenuRadioGroup` / `DropdownMenuRadioItem` | `value: string` | Radio items |
| `DropdownMenuSeparator` / `DropdownMenuLabel` / `DropdownMenuShortcut` | — | Decorative items |
| `DropdownMenuSub` / `DropdownMenuSubTrigger` / `DropdownMenuSubContent` | — | Submenu |
| `AccordionMenu` / `AccordionMenuItem` / `AccordionMenuTrigger` / `AccordionMenuSub` / `AccordionMenuSubTrigger` / `AccordionMenuSubContent` / `AccordionMenuGroup` / `AccordionMenuLabel` / `AccordionMenuSeparator` / `AccordionMenuIndicator` | `icon?: LucideIcon`, `label: string`, `highlighted?: boolean` | Accordion-style nav menu |

### Modals & overlays

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Dialog` / `DialogTrigger` / `DialogContent` / `DialogHeader` / `DialogFooter` / `DialogTitle` / `DialogDescription` / `DialogClose` | `open?: boolean`, `onOpenChange?: (open) => void` | Modal dialog |
| `AlertDialog` / `AlertDialogTrigger` / `AlertDialogContent` / `AlertDialogHeader` / `AlertDialogFooter` / `AlertDialogTitle` / `AlertDialogDescription` / `AlertDialogAction` / `AlertDialogCancel` | `open?: boolean`, `onOpenChange?: (open) => void` | Confirmation dialog |
| `Sheet` / `SheetTrigger` / `SheetContent` / `SheetHeader` / `SheetFooter` / `SheetTitle` / `SheetDescription` / `SheetClose` | `side?: 'top'\|'right'\|'bottom'\|'left'` | Slide-out panel |
| `Drawer` / `DrawerTrigger` / `DrawerContent` / `DrawerHeader` / `DrawerFooter` / `DrawerTitle` / `DrawerDescription` / `DrawerClose` | `open?: boolean`, `onOpenChange?: (open) => void` | Bottom drawer (mobile) |
| `Popover` / `PopoverTrigger` / `PopoverAnchor` / `PopoverContent` | `side?: 'top'\|'right'\|'bottom'\|'left'` | Popover |
| `Tooltip` / `TooltipTrigger` / `TooltipContent` / `TooltipProvider` | `side?: 'top'\|'right'\|'bottom'\|'left'`, `sideOffset?: number` | Tooltip |

### Accordions & collapsibles

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent` | `value: string` | Accordion |
| `Collapsible` / `CollapsibleTrigger` / `CollapsibleContent` | `open?: boolean`, `onOpenChange?: (open) => void` | Expand/collapse |

### Tables & data grid

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Table` / `TableHeader` / `TableBody` / `TableFooter` / `TableRow` / `TableHead` / `TableCell` / `TableCaption` | — | HTML table primitives |
| `DataGrid` | `table: Table<TData>`, `recordCount: number`, `tableLayout?: {...}`, `tableClassNames?: {...}`, `onRowClick?: (row) => void`, `isLoading?: boolean`, `loadingMode?: 'skeleton'\|'spinner'`, `emptyMessage?: string` | TanStack Table wrapper |
| `DataGridTable` / `DataGridPagination` / `DataGridColumnHeader` / `DataGridColumnFilter` / `DataGridColumnVisibility` | — | DataGrid sub-components |
| `useDataGrid()` | — | Access grid context |

### Radix select (headless)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `RadixSelect` / `SelectTrigger` / `SelectContent` / `SelectItem` / `SelectGroup` / `SelectLabel` / `SelectSeparator` / `SelectValue` / `SelectScrollUpButton` / `SelectScrollDownButton` | `value: string`, `placeholder?: string` | Headless select |

### OTP & toggle inputs

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `InputOTP` / `InputOTPGroup` / `InputOTPSlot` / `InputOTPSeparator` | `index: number` | OTP input |
| `Toggle` | `pressed?: boolean`, `onPressedChange?: (pressed) => void`, `size?: 'sm'\|'md'\|'lg'`, `variant?: 'default'\|'outline'` | Toggle button |
| `ToggleGroup` / `ToggleGroupItem` | `value?: string[]`, `onValueChange?: (value) => void`, `type?: 'single'\|'multiple'` | Toggle group |
| `RadixCheckbox` / `RadioGroupPrimitive` / `RadioGroupItem` | `value: string`, `disabled?: boolean` | Raw Radix primitives |

### Date & calendar

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Calendar` | `mode?: 'single'\|'multiple'\|'range'`, `selected?: Date\|Date[]`, `onSelect?: (date) => void`, `disabled?: (date) => boolean` | Interactive date picker |
| `TimeField` | — | Segment-based time input |
| `DateInput` / `DateSegment` | `segment: 'day'\|'month'\|'year'` | Date input parts |

### Avatars

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Avatar` / `AvatarImage` / `AvatarFallback` | `src: string`, `alt?: string` | Avatar |
| `AvatarGroup` | `animation?: 'default'\|'flip'\|'reveal'` | Avatar stack with hover tooltips |
| `AvatarGroupItem` | `animation?: 'default'\|'flip'\|'reveal'` | Item in avatar group |
| `AvatarGroupTooltip` | — | Tooltip for avatar group item |

### Progress & meters

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Progress` | `value?: number`, `max?: number` | Linear progress bar |
| `ProgressCircle` | `value?: number` | Circular progress |
| `UsageMeter` | `label: string`, `used: number`, `limit: number`, `unit?: string`, `compact?: boolean` | Usage/quota bar |

### Layout primitives

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Separator` / `Divider` | — | Visual divider |
| `ScrollArea` / `ScrollBar` | `orientation?: 'horizontal'\|'vertical'` | Scrollable container |
| `Resizable` / `ResizablePanelGroup` / `ResizablePanel` / `ResizableHandle` | `direction?: 'horizontal'\|'vertical'`, `defaultSize?: number`, `minSize?: number`, `maxSize?: number`, `withHandle?: boolean` | Resizable panels |
| `AppShell` | `variant?: 'sidebar'\|'header'`, `defaultOpen?: boolean` | Root layout shell |
| `AppHeader` / `AppContent` / `AppSidebar` / `AppSidebarHeader` / `AppLogo` / `AppLogoIcon` | — | App chrome parts |

### Sidebar primitives

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `SidebarProvider` | `defaultOpen?: boolean`, `open?: boolean`, `onOpenChange?: (open) => void` | Sidebar state |
| `Sidebar` / `SidebarHeader` / `SidebarContent` / `SidebarFooter` / `SidebarTrigger` / `SidebarInset` / `SidebarRail` | — | Sidebar shell |
| `SidebarGroup` / `SidebarGroupLabel` / `SidebarGroupContent` / `SidebarGroupAction` | — | Grouped items |
| `SidebarMenu` / `SidebarMenuItem` / `SidebarMenuButton` / `SidebarMenuAction` / `SidebarMenuBadge` / `SidebarMenuSkeleton` | `isActive?: boolean`, `tooltip?: string` | Menu items |
| `SidebarMenuSub` / `SidebarMenuSubItem` / `SidebarMenuSubButton` | — | Submenu |
| `SidebarSeparator` / `SidebarInput` / `useSidebar()` | — | Extras |

### Multi-step & workflow

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Stepper` | `steps: string[]`, `activeStep: number`, `onStepChange?: (index) => void` | Step indicator |
| `Timeline` / `TimelineItem` | `status?: 'pending'\|'complete'\|'error'`, `title: string`, `description?: string` | Timeline |
| `ChecklistItem` | `icon: LucideIcon`, `title: string`, `description: string`, `done?: boolean`, `active?: boolean`, `actionLabel?: string`, `onAction?: () => void` | Checklist step |
| `SettingsRow` | `icon: LucideIcon`, `title: string`, `description: string`, `action: ReactNode` | Settings row |
| `SettingsSection` | `id: string`, `title: string`, `description?: string` | Settings section container |

### Utility UI

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `CopyButton` | `text: string`, `label?: string`, `variant?: 'default'\|'outline'`, `size?: 'sm'\|'md'` | Copy to clipboard |
| `FileUpload` | `accept?: string`, `multiple?: boolean`, `maxSize?: number`, `onChange?: (files) => void` | File picker |
| `Toaster` | — | Toast container (Sonner) |
| `CommandPalette` | `items: CommandItem[]`, `onSelect?: (item) => void` | Command palette |
| `DataList` / `DataListItem` | `term: string`, `definition: ReactNode` | Definition list |
| `Code` | `code: string`, `language?: string` | Inline code |
| `CodeBlock` | `code: string`, `language?: string`, `filename?: string`, `showLineNumbers?: boolean` | Code block |
| `Kbd` | — | Keyboard key display |
| `PlaceholderPattern` | `width?: number`, `height?: number`, `type?: 'grid'\|'dots'` | Background pattern |
| `CookieBanner` | `onAccept?: () => void`, `onDecline?: () => void`, `policyUrl?: string` | Cookie consent |
| `NotificationBell` | `unreadCount?: number`, `fetchUrl?: string`, `markReadUrl?: (id) => string`, `markAllReadUrl?: string`, `viewAllUrl?: string` | Notification dropdown |
| `AppearanceTabs` | — | Light/dark/system theme selector |

### Icons

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `KeenIcon` | `icon: string`, `className?: string`, `style?: 'solid'\|'duotone'\|'outline'\|'filled'` | Font-based icon (1200+ icons) |
| `Icon` | `name: string`, `size?: number` | Lucide icon renderer |

### Auth forms

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `LoginForm` | `data: LoginFormData`, `errors: LoginFormErrors`, `processing?: boolean`, `status?: string`, `canResetPassword?: boolean`, `canRegister?: boolean`, `forgotPasswordUrl?: string`, `registerUrl?: string`, `onChange: (field, value) => void`, `onSubmit: (e) => void` | Email/password login |
| `RegisterForm` | `data: RegisterFormData`, `errors: RegisterFormErrors`, `processing?: boolean`, `loginUrl?: string`, `phoneCountries?: PhoneCountry[]`, `banner?: ReactNode`, `onChange: (field, value) => void`, `onSubmit: (e) => void` | Registration form |
| `ForgotPasswordForm` | `data: ForgotPasswordFormData`, `errors: ForgotPasswordFormErrors`, `processing?: boolean`, `status?: string`, `loginUrl?: string`, `onChange: (field, value) => void`, `onSubmit: (e) => void` | Password reset request |
| `ResetPasswordForm` | `data: ResetPasswordFormData`, `errors: ResetPasswordFormErrors`, `processing?: boolean`, `onChange: (field, value) => void`, `onSubmit: (e) => void` | New password form |
| `OtpForm` | `code: string`, `errors: OtpFormErrors`, `processing?: boolean`, `status?: string`, `recovery?: boolean`, `onCodeChange: (value) => void`, `onSubmit: (e) => void`, `onToggleRecovery?: () => void` | 6-digit OTP input |
| `ConfirmPasswordForm` | `password: string`, `errors: ConfirmPasswordFormErrors`, `processing?: boolean`, `onChange: (value) => void`, `onSubmit: (e) => void` | Re-enter password |
| `VerifyEmailForm` | `processing?: boolean`, `status?: string`, `logoutUrl?: string`, `onSubmit: (e) => void` | Email verification resend |
| `SmsChallengeForm` | `otp: string`, `errors: SmsChallengeFormErrors`, `processing?: boolean`, `resendProcessing?: boolean`, `otpPhone?: string`, `otpSent?: boolean`, `status?: string`, `logoutUrl?: string`, `onOtpChange: (value) => void`, `onSubmit: (e) => void`, `onResend: () => void` | SMS 2FA |

### Fleet & device components

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `DeviceStatusBadge` | `status: 'online'\|'offline'\|'idle'\|'moving'\|'error'\|'unknown'`, `showDot?: boolean`, `size?: 'sm'\|'md'` | Inline status badge |
| `DevicesMiniMap` | `devices: MiniMapDevice[]`, `incidents?: MiniMapIncident[]`, `height?: string`, `title?: string`, `fallbackCenter?: {lat, lng}`, `mapStyle?: MapStyleName` | Compact device tracking map |
| `MapMarker` | `signal: 0–4`, `rotation?: number`, `incidentPriority?: IncidentSeverity\|'resolved'`, `size?: number` | Signal/heading map marker |

### React Hook Form integration

| Component | Description |
|-----------|-------------|
| `Form` | `FormProvider` from react-hook-form |
| `RHFFormField` | Alias for `FormField` |
| `FormItem` / `FormLabel` / `FormControl` / `FormDescription` / `FormMessage` | RHF field parts |
| `useFormField()` | Hook for form field context |

### CMS / website sections

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `SectionRenderer` | `sections: PageSection[]`, `identifiers?: Record<string, string>` | Dynamic section renderer |
| `HeroSection` | `content?: HeroContent`, `identifier?: string` | Page hero |
| `TopBarSection` | `content?: TopBarContent`, `identifier?: string` | Announcement bar |
| `LogoCloudSection` | `content?: LogoCloudContent` | Client logos grid |
| `ServicesSection` | `content?: ServicesContent` | Services/features list |
| `AboutSection` | `content?: AboutContent` | About company section |
| `StatsSection` | `content?: StatsContent` | KPI metrics |
| `HowItWorksSection` | `content?: HowItWorksContent` | Process steps |
| `TestimonialsSection` | `content?: TestimonialsContent` | Testimonial carousel |
| `CaseStudiesSection` | `content?: CaseStudiesContent` | Case studies grid |
| `PricingSection` | `content?: PricingContent` | Pricing tiers |
| `FaqSection` | `content?: FaqContent` | FAQ accordion |
| `NewsletterSection` | `content?: NewsletterContent` | Email signup |
| `TeamSection` | `content?: TeamContent` | Team gallery |
| `TimelineSection` | `content?: TimelineContent` | Event timeline section |
| `Banner5050Section` / `CardsGridSection` / `CtaSection` / `TextSection` / `FeaturedSolutionsGridSection` / `FeaturedProductsGridSection` / `FeaturedBlogSliderSection` / `BlogsListingSection` / `ContactFormSection` / `SolutionsWithFilterSection` | — | Content section variants |
| `SiteHeader` / `SiteFooter` | — | Public site header/footer |
| `BlurredImage` | `src: string`, `alt: string`, `blur?: number` | Blur-up image |
| `SectionButton` | `button: CmsButton` | CMS-driven button |

### Images & assets

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `CutoutImage` | `src: string`, `alt: string` | Image with cutout bg |
| `FleetHeroAnimated` | — | Animated fleet hero |

### Docs components

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `DocsShell` | `sections?: DocsSection[]` | Documentation layout |
| `DocsCodeBlock` | Alias for `CodeBlock` | Docs code snippet |
| `WorkflowCanvas` | — | Workflow builder canvas |

---

## 7. Hooks

| Hook | Returns | Description |
|------|---------|-------------|
| `usePlatformUrl()` | `string` | Current pathname + search |
| `usePlatformPageProps<T>()` | `T` | Inertia shared props |
| `usePlatformNavigate()` | `navigate fn` | Programmatic navigation |
| `usePlatformForm(initialData)` | Form object | Inertia-compatible form |
| `usePlatformLink()` | — | Platform link behaviour |
| `usePlatformHead()` | — | Document head management |
| `usePlatform()` | Adapter context | Raw adapter access |
| `useSidebar()` | Sidebar state | Open/collapse state |
| `useDataGrid()` | Grid context | DataGrid context |
| `useFormField()` | Field context | RHF form field |
| `useDarkMode()` | `{ isDark, toggle, set }` | Dark mode toggle |
| `useIsMobile()` | `boolean` | `< 768px` check |
| `useInitials()` | `GetInitialsFn` | User initials from full name |
| `useClipboard()` | `{ copy, isCopied }` | Clipboard utility |
| `useFlashToast()` | `(message, type?) => void` | Flash toast notification |
| `useAppearance()` | `{ appearance, resolvedAppearance, updateAppearance }` | Theme control |
| `useAppliedTheme()` | `{ theme, setTheme }` | Applied theme state |
| `useCurrentUrl()` | `string` | Current page URL |
| `useMobileNavigation()` | — | Mobile nav state |
| `useUserTimezone()` | `string` | User's timezone |
| `useLocationConsent()` | `boolean` | Geolocation consent |
| `useEagerLocationConsent()` | `boolean` | Request location on load |
| `useLayout()` | Layout context | Layout context |

---

## 8. Utility functions

### Class names
```ts
import { cn } from '@trackany-device/components';
cn('base-class', condition && 'conditional', className)
```

### Date & timezone
```ts
import {
    formatLocalDateTime,   // (date, tz?) => string
    formatLocalDate,       // (date, tz?) => string
    formatLocalTime,       // (date, tz?) => string
    formatRelative,        // (date) => "2 hours ago"
    browserTimezone,       // () => string
    resolveTimezone,       // (tz?) => string
    setSharedTimezone,     // (tz) => void
    reportBrowserTimezone, // () => void
    attachLocationToInertiaVisits, // () => void
} from '@trackany-device/components';
```

### Maps
```ts
import {
    hasGoogleMapsKey,   // () => boolean
    loadGoogleMaps,     // () => Promise<any>
    cachedCoords,       // () => Coords | null
    setCachedCoords,    // (coords) => void
    networkTier,        // (signal: 0-100) => 'green'|'blue'|'purple'|'red'
    markerColor,        // (signal: 0-100) => color
    arrowRotation,      // (heading?) => CSS transform string
    deviceArrowUrl,     // (signal?) => string
    devicePinUrl,       // (signal?) => string
    incidentFlagUrl,    // (severity) => string
    mapStyleByName,     // (name) => map style config
    mapStyleForAppearance, // ('light'|'dark') => map style config
    isDarkMode,         // () => boolean
    watchDarkMode,      // (callback) => unsubscribe fn
} from '@trackany-device/components';
```

### Icons
```ts
import { lucideIcon, LUCIDE_ICON_MAP } from '@trackany-device/components';
const Icon = lucideIcon('home'); // returns LucideIcon | null
```

---

## 9. Key TypeScript types

```ts
// Navigation
interface BreadcrumbItem { title: string; href: string }
interface NavItem { label: string; href?: string; icon?: LucideIcon; children?: NavItem[] }

// User & Auth
interface User { id: string; name: string; email: string; avatar?: string }
interface Auth { user?: User; authenticated: boolean }
interface LoginFormData { email: string; password: string; remember: boolean }
interface RegisterFormData { name: string; email: string; password: string; password_confirmation: string; phone?: string; mobile_country_iso?: string }
interface PhoneCountry { id: string; iso_code: string; name: string; country_code: string }

// Fleet & Devices
type DeviceStatus = 'online' | 'offline' | 'idle' | 'moving' | 'error' | 'unknown'
type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'
type VehicleStatus = 'online' | 'offline' | 'idle' | 'moving' | 'stopped'
interface VehicleCardData { id: string; registration: string; make?: string; model?: string; status: VehicleStatus; driver?: string; lastSeen?: string; location?: string; speed?: number; href?: string }

// Maps
type MapStyleName = 'light' | 'dark' | 'satellite'
type MarkerColor = 'green' | 'blue' | 'purple' | 'red'

// DataGrid
type DataGridApiFetchParams = { pageIndex: number; pageSize: number; sorting?: any; filters?: any; searchQuery?: string }
type DataGridApiResponse<T> = { data: T[]; empty: boolean; pagination: { total: number; page: number } }

// Icons
type KeeniconsStyle = 'solid' | 'duotone' | 'outline' | 'filled'

// Theme
type Appearance = 'light' | 'dark' | 'system'
type ResolvedAppearance = 'light' | 'dark'

// Products
type Currency = 'USD' | 'PKR'
interface ProductCardData { id: string; name: string; description: string; image: string; slug: string; price_usd: number; price_pkr?: number; min_quantity?: number }
```

---

## 10. Key rules

- Always wrap the app root with `<PlatformProvider adapter={adapter}>` **before** using any hook or layout.
- Use `usePlatformPageProps` instead of Inertia's `usePage().props` in shared components.
- Import `themes.css` before any component renders — design tokens (colours, spacing) will be missing otherwise.
- Mobile layouts are built-in — do not add your own hamburger/overlay logic around layout components.
- Never import from `@inertiajs/react` directly in shared components; use the platform hooks instead.
