// ─── Platform Adapter ────────────────────────────────────────────────────────
// Framework-agnostic Link / useForm / usePage / navigate abstraction.
// Each app creates and provides its own adapter at the root.
export {
    PlatformProvider,
    PlatformLink,
    usePlatform,
    usePlatformLink,
    usePlatformNavigate,
    usePlatformUrl,
    usePlatformPageProps,
    usePlatformForm,
    usePlatformHead,
    defaultAdapter,
    createInertiaAdapter,
    createNextjsAdapter,
} from './platform';
export type {
    PlatformAdapter,
    PlatformLinkProps,
    PlatformForm,
    PlatformHeadProps,
    NavigateOptions,
    FormSubmitOptions,
} from './platform';

// ─── Utilities ───────────────────────────────────────────────────────────────
export { cn, toUrl } from './lib/utils';

// Icons — KeenIcons (font-based, ~1 200 icons in duotone/filled/solid/outline styles)
// Consumers must also import the font CSS:
//   import '@trackany-device/components/styles/keenicons.css'
export { KeenIcon } from './components/keenicons/keenicons';
export type { KeeniconsProps, KeeniconsStyle } from './components/keenicons/types';

// Components — generic, reusable primitives (ShadCN-style)
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';

// App chrome components
export { default as AppLogo } from './components/app-logo';
export { default as AppLogoIcon } from './components/app-logo-icon';
export { AppShell } from './components/app-shell';
export { AppContent } from './components/app-content';
export { AppHeader } from './components/app-header';
export { AppSidebar, DEFAULT_TENANT_NAV } from './components/app-sidebar';
export { AppSidebarHeader } from './components/app-sidebar-header';
export { NavMain } from './components/nav-main';
export { NavUser } from './components/nav-user';
export { NavFooter } from './components/nav-footer';
export { NotificationBell } from './components/notification-bell';
export type { NotificationBellProps } from './components/notification-bell';
export { UserInfo } from './components/user-info';
export { UserMenuContent } from './components/user-menu-content';
export { Breadcrumbs } from './components/breadcrumbs';

// Utility components
export { default as AlertError } from './components/alert-error';
export { default as InputError } from './components/input-error';
export { default as AppearanceTabs } from './components/appearance-tabs';
export { default as TextLink } from './components/text-link';
export { default as CutoutImage } from './components/cutout-image';
export { default as FleetHeroAnimated } from './components/fleet-hero-animated';

// UI primitives (ShadCN-compatible, moved from core/resources/js/components/ui/)

// New Metronic UI components
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion';
export {
    AccordionMenu, AccordionMenuGroup, AccordionMenuIndicator, AccordionMenuItem,
    AccordionMenuLabel, AccordionMenuSeparator, AccordionMenuSub,
    AccordionMenuSubContent, AccordionMenuSubTrigger,
} from './components/ui/accordion-menu';
export type { AccordionMenuClassNames } from './components/ui/accordion-menu';
export {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger,
} from './components/ui/alert-dialog';
export { AvatarGroup, AvatarGroupItem, AvatarGroupTooltip } from './components/ui/avatar-group';
export { Calendar } from './components/ui/calendar';
export {
    ChartContainer, ChartTooltip, ChartTooltipContent,
    ChartLegend, ChartLegendContent, ChartStyle,
} from './components/ui/chart';
export type { ChartConfig } from './components/ui/chart';
export {
    DataGrid, DataGridContext, useDataGrid,
} from './components/ui/data-grid';
export type { DataGridProps, DataGridContextProps, DataGridApiFetchParams, DataGridApiResponse } from './components/ui/data-grid';
export { DataGridTable } from './components/ui/data-grid-table';
export { DataGridPagination } from './components/ui/data-grid-pagination';
export { DataGridColumnFilter } from './components/ui/data-grid-column-filter';
export { DataGridColumnHeader } from './components/ui/data-grid-column-header';
export { DataGridColumnVisibility } from './components/ui/data-grid-column-visibility';
// DateField primitives (named with "Primitive" prefix to avoid conflict with controls/DateField)
export { DateField as DateFieldPrimitive, TimeField, DateInput, DateSegment } from './components/ui/datefield';
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from './components/ui/drawer';
// RHF form primitives (FormField aliased to avoid conflict with controls/FormField)
export { Form, FormControl, FormDescription, FormField as RHFFormField, FormItem, FormLabel, FormMessage, useFormField } from './components/ui/form';
export { Progress, ProgressCircle } from './components/ui/progress';
// RadioGroup primitive (RadioGroupItem exported; RadioGroup itself conflicts with controls/RadioGroup)
export { RadioGroup as RadioGroupPrimitive, RadioGroupItem } from './components/ui/radio-group';
export { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';
export { ScrollArea, ScrollBar } from './components/ui/scroll-area';
// Slider/Switch primitives (conflicts with controls/Slider and controls/Switch)
export { Slider as SliderPrimitive, SliderThumb } from './components/ui/slider';
export { Switch as SwitchPrimitive, SwitchWrapper } from './components/ui/switch';
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './components/ui/table';
export { Stepper } from './components/ui/stepper';

export { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
export { Badge, badgeVariants } from './components/ui/badge';
export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from './components/ui/breadcrumb';
export { Checkbox as RadixCheckbox } from './components/ui/checkbox';
export { Code, CodeBlock } from './components/ui/code';
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/ui/collapsible';
export {
    CommandPaletteRoot,
    CommandPaletteTrigger,
    CommandPaletteLink,
} from './components/ui/command-palette';
export type { CommandItem } from './components/ui/command-palette';
export { CookieBanner } from './components/ui/cookie-banner';
export { CopyButton } from './components/ui/copy-button';
export { DataList, DataListItem } from './components/ui/data-list';
export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from './components/ui/dialog';
export { Divider } from './components/ui/divider';
export {
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from './components/ui/dropdown-menu';
export { EmptyState } from './components/ui/empty-state';
export { FileUpload } from './components/ui/file-upload';
export { Icon } from './components/ui/icon';
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './components/ui/input-otp';
export { Kbd } from './components/ui/kbd';
export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from './components/ui/navigation-menu';
export { Pagination } from './components/ui/pagination';
export { PlaceholderPattern } from './components/ui/placeholder-pattern';
export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from './components/ui/popover';
export {
    Select as RadixSelect,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from './components/ui/select';
export { Separator } from './components/ui/separator';
export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
} from './components/ui/sheet';
export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from './components/ui/sidebar';
export { Skeleton } from './components/ui/skeleton';
export { Toaster } from './components/ui/sonner';
export { Spinner } from './components/ui/spinner';
export { StatCard } from './components/ui/stat-card';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
export { Timeline, TimelineItem } from './components/ui/timeline';
export { Toggle, toggleVariants } from './components/ui/toggle';
export { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

// Controls — atomic UI controls (inputs, buttons, typography)
// Button is the single canonical button — superset of both the legacy API and ShadCN API
export { Button, buttonVariants } from './controls/Button';
export { Label } from './controls/Label';
export { Input } from './controls/Input';
export { PasswordInput } from './controls/PasswordInput';
export { Select } from './controls/Select';
export { Checkbox } from './controls/Checkbox';
export { Textarea } from './controls/Textarea';
export { FormField } from './controls/FormField';
export { Heading } from './controls/Heading';
export { Paragraph } from './controls/Paragraph';
export { Blockquote } from './controls/Blockquote';
export { RadioGroup } from './controls/RadioGroup';
export { Switch } from './controls/Switch';
export { Slider } from './controls/Slider';
export { DateField } from './controls/DateField';

// Elements — domain-specific composites

// Fleet domain elements
export { VehicleCard } from './elements/VehicleCard';
export type { VehicleCardData, VehicleStatus } from './elements/VehicleCard';
export { DriverCard } from './elements/DriverCard';
export type { DriverCardData } from './elements/DriverCard';
export { DeviceStatusBadge } from './elements/DeviceStatusBadge';
export type { DeviceStatus } from './elements/DeviceStatusBadge';
export { IncidentCard } from './elements/IncidentCard';
export type { IncidentCardData, IncidentSeverity } from './elements/IncidentCard';

// Auth form elements
export { LoginForm } from './elements/LoginForm';
export { RegisterForm } from './elements/RegisterForm';
export { ForgotPasswordForm } from './elements/ForgotPasswordForm';
export { OtpForm } from './elements/OtpForm';
export { ResetPasswordForm } from './elements/ResetPasswordForm';
export { ConfirmPasswordForm } from './elements/ConfirmPasswordForm';
export { VerifyEmailForm } from './elements/VerifyEmailForm';
export { SmsChallengeForm } from './elements/SmsChallengeForm';
export type { LoginFormData, LoginFormErrors } from './elements/LoginForm';
export type { RegisterFormData, RegisterFormErrors, PhoneCountry } from './elements/RegisterForm';
export type { ForgotPasswordFormData, ForgotPasswordFormErrors } from './elements/ForgotPasswordForm';
export type { OtpFormErrors } from './elements/OtpForm';
export type { ResetPasswordFormData, ResetPasswordFormErrors } from './elements/ResetPasswordForm';
export type { ConfirmPasswordFormErrors } from './elements/ConfirmPasswordForm';
export type { SmsChallengeFormErrors } from './elements/SmsChallengeForm';

// Web components
export { default as SiteHeader } from './components/web/SiteHeader';
export { default as SiteFooter } from './components/web/SiteFooter';

// CMS components
export { BlurredImage } from './components/cms/blurred-image';
export { SectionButton } from './components/cms/section-button';
export type { CmsButton } from './components/cms/section-button';
export { HeroSection } from './components/cms/sections/hero-section';
export { Banner5050Section } from './components/cms/sections/banner-5050-section';
export { CardsGridSection } from './components/cms/sections/cards-grid-section';
export { CtaSection } from './components/cms/sections/cta-section';
export { TextSection } from './components/cms/sections/text-section';
export { FeaturedSolutionsGridSection } from './components/cms/sections/featured-solutions-grid-section';
export type { SolutionCard } from './components/cms/sections/featured-solutions-grid-section';
export { FeaturedProductsGridSection } from './components/cms/sections/featured-products-grid-section';
export { FeaturedBlogSliderSection } from './components/cms/sections/featured-blog-slider-section';
export type { BlogPostCard } from './components/cms/sections/featured-blog-slider-section';
export { BlogsListingSection } from './components/cms/sections/blogs-listing-section';
export { ContactFormSection } from './components/cms/sections/contact-form-section';
export { SolutionsWithFilterSection } from './components/cms/sections/solutions-with-filter-section';

// Device components
export { DevicesMiniMap } from './components/devices/devices-mini-map';
export type { MiniMapDevice, MiniMapIncident } from './components/devices/devices-mini-map';

// Docs components
export { default as DocsShell, CodeBlock as DocsCodeBlock, Callout } from './components/docs/docs-shell';
export type { DocsSection } from './components/docs/docs-shell';

// Product components
export { ProductCard } from './components/products/product-card';
export type { ProductCardData, Currency } from './components/products/product-card';

// Workflow components
export { WorkflowCanvas } from './components/workflows/workflow-canvas';

// Layouts — page structure
export { AuthLayout } from './layouts/AuthLayout';
export { AppLayout } from './layouts/AppLayout';
export type { AppVariant } from './layouts/AppLayout';
export { LayoutProvider, useLayout } from './layouts/app/layout-context';
export type { BaseAppLayoutProps, AppLayoutUser, AppLayoutFooterLink } from './layouts/app/layout-types';

// App layouts — Demo series (10 variants)
export { TopNavLayout } from './layouts/app/TopNavLayout';
export { SidebarFixedLayout } from './layouts/app/SidebarFixedLayout';
export { NavbarCollapsibleLayout } from './layouts/app/NavbarCollapsibleLayout';
export { SplitSidebarLayout } from './layouts/app/SplitSidebarLayout';
export { NavbarSidebarLayout } from './layouts/app/NavbarSidebarLayout';
export { SidebarTabsLayout } from './layouts/app/SidebarTabsLayout';
export { MegaMenuLayout } from './layouts/app/MegaMenuLayout';
export { SidebarMinimalLayout } from './layouts/app/SidebarMinimalLayout';
export { MegaMenuNavbarLayout } from './layouts/app/MegaMenuNavbarLayout';
export { SidebarDualMenuLayout } from './layouts/app/SidebarDualMenuLayout';

// App layouts — Starter kit named aliases (layouts 1-39)
export { SidebarMegaMenuLayout } from './layouts/app/SidebarMegaMenuLayout';
export { TopNavLinksLayout } from './layouts/app/TopNavLinksLayout';
export { NavbarCollapsibleLinksLayout } from './layouts/app/NavbarCollapsibleLinksLayout';
export { SplitSidebarDashboardLayout } from './layouts/app/SplitSidebarDashboardLayout';
export { NavbarSidebarDashboardLayout } from './layouts/app/NavbarSidebarDashboardLayout';
export { SidebarTabsDualLayout } from './layouts/app/SidebarTabsDualLayout';
export { MegaMenuHeaderLayout } from './layouts/app/MegaMenuHeaderLayout';
export { SidebarCleanLayout } from './layouts/app/SidebarCleanLayout';
export { MegaMenuSearchNavbarLayout } from './layouts/app/MegaMenuSearchNavbarLayout';
export { SidebarPrimarySecondaryLayout } from './layouts/app/SidebarPrimarySecondaryLayout';
export { SidebarSearchHeaderLayout } from './layouts/app/SidebarSearchHeaderLayout';
export { WorkspaceSidebarLayout } from './layouts/app/WorkspaceSidebarLayout';
export { MailLayout } from './layouts/app/MailLayout';
export { AIChatLayout } from './layouts/app/AIChatLayout';
export { CalendarSidebarLayout } from './layouts/app/CalendarSidebarLayout';
export { FocusSidebarLayout } from './layouts/app/FocusSidebarLayout';
export { SettingsLayout } from './layouts/SettingsLayout';
export { default as AuthSplitLayout } from './layouts/auth/AuthSplitLayout';
export { default as AuthCenteredLayout } from './layouts/auth/AuthCenteredLayout';
export { default as AuthSimpleLayout } from './layouts/auth/AuthSimpleLayout';
export { default as AuthCardLayout } from './layouts/auth/AuthCardLayout';
export { default as AuthBrandedLayout } from './layouts/auth/AuthBrandedLayout';
export { default as AuthClassicLayout } from './layouts/auth/AuthClassicLayout';
export { default as WebLayout } from './layouts/web-layout';
export { default as WebAppLayout } from './layouts/web-app-layout';
export { default as AppSidebarLayout } from './layouts/app/app-sidebar-layout';
export { default as AppHeaderLayout } from './layouts/app/app-header-layout';

// Hooks
export { useDarkMode } from './hooks/use-dark-mode';
export { useIsMobile } from './hooks/use-mobile';
export { useInitials } from './hooks/use-initials';
export { useClipboard } from './hooks/use-clipboard';
export { useFlashToast } from './hooks/use-flash-toast';
export { useAppearance, initializeTheme } from './hooks/use-appearance';
export { useAppliedTheme, initializeAppliedTheme } from './hooks/use-applied-theme';
export { useCurrentUrl } from './hooks/use-current-url';
export { useMobileNavigation } from './hooks/use-mobile-navigation';

// Lib exports
export { formatLocalDateTime, formatLocalDate, formatLocalTime, formatRelative, browserTimezone, resolveTimezone, setSharedTimezone, useUserTimezone, reportBrowserTimezone } from './lib/datetime';
export { hasGoogleMapsKey, loadGoogleMaps } from './lib/google-maps-loader';
export { cachedCoords, setCachedCoords, useLocationConsent, attachLocationToInertiaVisits, useEagerLocationConsent } from './lib/location';
export type { Coords, ConsentStatus } from './lib/location';
export { LUCIDE_ICON_MAP, lucideIcon } from './lib/lucide-icon-map';
export { MAP_STYLES, mapStyleByName, mapStyleForAppearance, watchDarkMode, isDarkMode } from './lib/map-styles';
export type { MapStyleName } from './lib/map-styles';
export {
    networkTier, markerColor,
    arrowRotation, useArrow, deviceArrowUrl,
    devicePinColor,
    incidentFlagUrl,
    arrows, flags,
    ARROW_URLS, FLAG_URLS, PIN_COLORS,
} from './lib/map-markers';
export type { NetworkTier, MarkerColor, IncidentSeverity as MapIncidentSeverity } from './lib/map-markers';

// Types
export type { AuthLayoutProps, AuthLayoutVariant } from './types';
export type { User, Auth, TwoFactorSetupData, TwoFactorSecretKey } from './types/auth';
export type { BreadcrumbItem as BreadcrumbItemData, NavItem } from './types/navigation';
export type { AppLayoutProps, FlashToast } from './types/ui';
