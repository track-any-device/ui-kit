import type { Meta, StoryObj } from '@storybook/react';
import { LAYOUT_ARG_TYPE } from '../../../src/layouts/LayoutSwitcher';
import type { LayoutName } from '../../../src/layouts/LayoutSwitcher';
import { ServiceIntegrationsPage, ApiKeysPage, WebhooksPage, AutomationsPage } from '../../../src/pages/tenant/IntegrationsPage';
import type { Integration, ApiKey, WebhookEndpoint, Automation } from '../../../src/pages/tenant/IntegrationsPage';

const MOCK_INTEGRATIONS: Integration[] = [
    { name: 'Slack',      logo: '💬', desc: 'Send real-time incident and alert notifications to Slack channels.',        connected: true,  channel: '#tad-alerts'    },
    { name: 'Google Maps',logo: '🗺️', desc: 'Embed live Google Maps for real-time device tracking and geofences.',       connected: true,  channel: 'Fleet map view' },
    { name: 'Zapier',     logo: '⚡', desc: 'Automate workflows by connecting TAD events to thousands of apps.',         connected: false, channel: null             },
    { name: 'PagerDuty',  logo: '🚨', desc: 'Escalate critical incidents to on-call teams via PagerDuty.',               connected: false, channel: null             },
    { name: 'Twilio',     logo: '📱', desc: 'Send SMS alerts to drivers and supervisors on critical events.',            connected: true,  channel: '+92-300-xxxxxxx' },
    { name: 'MS Teams',   logo: '🏢', desc: 'Receive fleet alerts and incident updates directly in Microsoft Teams.',    connected: false, channel: null             },
];

const MOCK_API_KEYS: ApiKey[] = [
    { id: 1, name: 'Production API',     key: 'tad_live_aB3kR7mNpQ2xZ9wV4tY8uI1oE',  created: '1 Jan 2026',  lastUsed: '24 May 2026',  scopes: ['fleet:read', 'incidents:write', 'devices:read'] },
    { id: 2, name: 'Reporting Service',  key: 'tad_live_cD5sF6gH0jK2lM3nO4pQ7rS8t',  created: '15 Mar 2026', lastUsed: '20 May 2026',  scopes: ['reports:read', 'fleet:read'] },
    { id: 3, name: 'Webhook Validator',  key: 'tad_live_uV9wX1yZ2aB3cD4eF5gH6iJ7k',  created: '10 Apr 2026', lastUsed: '18 May 2026',  scopes: ['webhooks:read'] },
];

const MOCK_HOOKS: WebhookEndpoint[] = [
    { id: 1, url: 'https://api.suthra.pk/webhooks/tad',          events: ['incident.created', 'sos.triggered', 'device.offline'], status: 'Active',  lastPing: '2m ago', successRate: '99.2%' },
    { id: 2, url: 'https://hooks.zapier.com/hooks/catch/abc123',  events: ['trip.completed', 'geofence.violated'],                status: 'Failing', lastPing: '3h ago', successRate: '41.0%' },
];

const MOCK_AUTOMATIONS: Automation[] = [
    { name: 'SOS → Slack alert',          trigger: 'sos.triggered',     action: 'Notify Slack #tad-alerts',   enabled: true  },
    { name: 'Device offline → PagerDuty', trigger: 'device.offline',    action: 'Create PagerDuty incident',  enabled: false },
    { name: 'Trip end → Zapier',          trigger: 'trip.completed',     action: 'Post to Zapier workflow',    enabled: true  },
    { name: 'Member joined → Teams',      trigger: 'member.joined',      action: 'Post to MS Teams channel',   enabled: false },
];

const meta: Meta<{ layout: LayoutName }> = {
    title: 'Apps/Tenant/Integrations',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Third-party integration management pages for the `tenant/` app. Uses `LayoutResolved`. Covers four concerns: service connections (OAuth-style), API key management, webhook endpoint configuration, and workflow automations (Zapier-style). All state changes are wired to local React state — no network calls.',
            },
        },
    },
    argTypes: LAYOUT_ARG_TYPE,
    args: { layout: 'SidebarFixed' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ServiceIntegrations: Story = {
    name: '1 · Service integrations',
    parameters: {
        docs: {
            description: {
                story: '2-column card grid of 6 service integrations (Slack, Google Maps, Zapier, PagerDuty, Twilio, Teams). Connected services show a green status dot with connected channel name, a settings gear, and a red **Disconnect** button. Disconnected services show a **Connect** button. Logos use emoji placeholders — replace with real SVGs in production.',
            },
        },
    },
    render: ({ layout }) => <ServiceIntegrationsPage layout={layout as LayoutName} integrations={MOCK_INTEGRATIONS} />,
};

export const ApiKeys: Story = {
    name: '2 · API keys',
    parameters: {
        docs: {
            description: {
                story: 'API key management: a security warning banner, a table of 3 existing keys each with show/hide toggle (local state), Copy button, scope badges, last-used timestamp, and a **Revoke** button. Clicking **New API key** opens an inline creation form with name input and a scope checkbox grid. Everything is wired to local state.',
            },
        },
    },
    render: ({ layout }) => <ApiKeysPage layout={layout as LayoutName} apiKeys={MOCK_API_KEYS} />,
};

export const Webhooks: Story = {
    name: '3 · Webhooks',
    parameters: {
        docs: {
            description: {
                story: 'Webhook endpoint list: each card shows status badge (Active / Failing), truncated URL with Copy, refresh/settings/delete icon buttons, last-ping + success-rate stats, and event-name code badges. A **Failing** endpoint gets a red card border. Clicking **Add webhook** opens an inline form with URL, HMAC secret, and event checkbox grid. A docs card links to signature-verification guidance.',
            },
        },
    },
    render: ({ layout }) => <WebhooksPage layout={layout as LayoutName} hooks={MOCK_HOOKS} />,
};

export const Automations: Story = {
    name: '4 · Automations',
    parameters: {
        docs: {
            description: {
                story: 'Zapier-style automation list: each row shows a Zap icon (amber if enabled, muted if not), automation name, trigger event code badge → target service, and a settings + Switch combo. A **New automation** button in the header would open a trigger/action builder. A Connect Zapier card below links out to the Zapier integration flow.',
            },
        },
    },
    render: ({ layout }) => <AutomationsPage layout={layout as LayoutName} automations={MOCK_AUTOMATIONS} />,
};
