import type { Meta, StoryObj } from '@storybook/react';
import { DocsShell, DocsCodeBlock, Callout } from '@track-any-device/components';
import type { DocsSection } from '@track-any-device/components';
import { BookOpen, Code2, Cpu, List, ScrollText, Wifi } from 'lucide-react';

const meta: Meta<typeof DocsShell> = {
    title: 'Components/Docs/DocsShell',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DocsShell>;

type SectionId = 'intro' | 'architecture' | 'sensors' | 'commands' | 'envelope' | 'changelog';

const sections: DocsSection<SectionId>[] = [
    { id: 'intro',        title: 'Introduction',   href: '/docs/tad101',              icon: BookOpen },
    { id: 'architecture', title: 'Architecture',   href: '/docs/tad101/architecture', icon: Cpu },
    { id: 'envelope',     title: 'Envelope',       href: '/docs/tad101/envelope',     icon: Wifi },
    { id: 'sensors',      title: 'Sensors',        href: '/docs/tad101/sensors',      icon: List },
    { id: 'commands',     title: 'Commands',       href: '/docs/tad101/commands',     icon: Code2 },
    { id: 'changelog',    title: 'Changelog',      href: '/docs/tad101/changelog',    icon: ScrollText },
];

export const Default: Story = {
    render: () => (
        <DocsShell
            seriesLabel="TAD101"
            version="1.0.0"
            sections={sections}
            active="intro"
            pageTitle="TAD101 Universal Device Protocol"
            lastUpdated="2024-06-01"
        >
            <p>
                TAD101 is a lightweight, transport-agnostic telemetry and command
                protocol for GPS trackers, IoT sensors, and mobile apps.
            </p>
            <Callout tone="info">
                Every device that speaks TAD101 works with any TAD101-compatible
                platform out of the box — no per-device configuration required.
            </Callout>
            <h2>Quick start</h2>
            <p>Connect over WebSocket and send your first ping:</p>
            <DocsCodeBlock language="json">{`{ "event": "tad101.ping", "data": { "imei": "860000000000001" } }`}</DocsCodeBlock>
        </DocsShell>
    ),
};

export const MidSection: Story = {
    render: () => (
        <DocsShell
            seriesLabel="TAD101"
            version="1.0.0"
            sections={sections}
            active="sensors"
            pageTitle="Sensor Registry"
        >
            <p>TAD101 carries a uniform sensor surface — every device populates the fields it has.</p>
        </DocsShell>
    ),
};

export const LastSection: Story = {
    render: () => (
        <DocsShell
            seriesLabel="TAD101"
            sections={sections}
            active="changelog"
            pageTitle="Changelog"
        >
            <p>Every change to the protocol is recorded here.</p>
        </DocsShell>
    ),
};
