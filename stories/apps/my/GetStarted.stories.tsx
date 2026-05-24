import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { OnboardingChecklistPage, WelcomeScreenPage, PlanUpgradePage } from '../../../src/pages/my/GetStartedPage';
import type { OnboardingStep } from '../../../src/pages/my/GetStartedPage';
import { Bell, Globe, MapPin, Settings, Smartphone, Shield, Users } from 'lucide-react';

const MOCK_STEPS: OnboardingStep[] = [
    { icon: Smartphone, title: 'Add your first device',         desc: 'Pair a GPS tracker or mobile phone to start tracking.',   action: 'Add device'     },
    { icon: Users,      title: 'Invite your team',              desc: 'Bring operators, supervisors, and drivers on board.',      action: 'Invite members' },
    { icon: MapPin,     title: 'Create a geofence',             desc: 'Define zones to automatically alert on entry or exit.',   action: 'Create zone'    },
    { icon: Bell,       title: 'Enable SOS alerts',             desc: 'Configure emergency alerts for your fleet.',              action: 'Set up alerts'  },
    { icon: Shield,     title: 'Turn on two-factor auth',       desc: 'Secure your account with 2FA.',                          action: 'Enable 2FA'     },
    { icon: Globe,      title: 'Connect a third-party service', desc: 'Integrate Slack, PagerDuty, or Zapier.',                  action: 'View integrations' },
    { icon: Settings,   title: 'Configure notification rules',  desc: 'Choose which events trigger alerts and how.',             action: null             },
    { icon: MapPin,     title: 'Review live map',               desc: 'See all your devices in real time on the fleet map.',     action: 'Open map'       },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/My/GetStarted',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Onboarding and upgrade prompt pages for new users (`my/` app). Three distinct UX patterns: a progress-tracked checklist, a first-login welcome screen, and a plan comparison grid.',
            },
        },
    },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<{ layout: LayoutName }>;

export const Checklist: Story = {
    name: '1 · Onboarding checklist',
    parameters: {
        docs: {
            description: {
                story: 'Interactive 8-step checklist backed by a `Set` in state. **Click any step** to toggle it done — the progress bar and counter update live. The first incomplete step is the "active" step and renders highlighted with a primary CTA button. Completed steps get a strikethrough label and a green **Done** badge.',
            },
        },
    },
    render: ({ layout }) => <OnboardingChecklistPage key={layout} layout={layout} steps={MOCK_STEPS} initialCompleted={[0, 1]} />,
};

export const WelcomeScreen: Story = {
    name: '2 · Welcome screen',
    parameters: {
        docs: {
            description: {
                story: 'First-login splash: centred hero logo, headline and subtitle, three quick-start action cards (Add device / Invite team / Watch live — the first is highlighted as primary), and a tips list of four fleet best-practices. A **Skip onboarding** ghost link sits at the bottom.',
            },
        },
    },
    render: ({ layout }) => <WelcomeScreenPage key={layout} layout={layout} />,
};

export const PlanUpgrade: Story = {
    name: '3 · Plan upgrade prompt',
    parameters: {
        docs: {
            description: {
                story: 'Contextual upsell page shown to Starter users. A tinted current-plan banner precedes a two-column Pro vs Enterprise comparison grid. Each card lists feature bullet points with check icons and a CTA button (Upgrade to Pro / Contact sales). A support link sits below the grid.',
            },
        },
    },
    render: ({ layout }) => <PlanUpgradePage key={layout} layout={layout} />,
};
