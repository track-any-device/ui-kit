import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@trackany-device/components';

const meta: Meta<typeof Accordion> = { title: 'Components/UI/Accordion', component: Accordion, parameters: { layout: 'padded' } };
export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
    { value: 'item-1', title: 'What is fleet tracking?', content: 'Fleet tracking monitors vehicles using GPS and telematics to provide real-time location and performance data.' },
    { value: 'item-2', title: 'How do alerts work?', content: 'Alerts trigger when vehicles exceed thresholds like speed limits, geofence boundaries, or maintenance schedules.' },
    { value: 'item-3', title: 'Can I view historical data?', content: 'Yes — trip history, driver behaviour scores, and fuel consumption are all available as historical reports.' },
];

export const Default: Story = {
    render: () => (
        <Accordion type="single" collapsible className="w-full max-w-md">
            {items.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    ),
};

export const Outline: Story = {
    render: () => (
        <Accordion type="single" collapsible variant="outline" className="w-full max-w-md">
            {items.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    ),
};

export const Solid: Story = {
    render: () => (
        <Accordion type="single" collapsible variant="solid" className="w-full max-w-md">
            {items.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    ),
};
