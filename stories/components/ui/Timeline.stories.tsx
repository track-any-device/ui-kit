import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from '@trackany-device/components';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const meta: Meta = { title: 'Components/UI/Timeline', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="max-w-md p-6">
            <Timeline>
                <TimelineItem icon={CheckCircle} datetime="2026-05-22T10:24Z" title="Resolved">
                    Marked resolved by admin@example.com
                </TimelineItem>
                <TimelineItem icon={AlertCircle} datetime="2026-05-22T09:10Z" title="Escalated">
                    Escalated to supervisor
                </TimelineItem>
                <TimelineItem icon={Clock} datetime="2026-05-22T08:45Z" title="Opened">
                    Device out of beat — auto-generated
                </TimelineItem>
            </Timeline>
        </div>
    ),
};
