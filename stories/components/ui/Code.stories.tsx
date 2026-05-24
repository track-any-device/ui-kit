import type { Meta, StoryObj } from '@storybook/react';
import { Code, CodeBlock } from '@trackany-device/components';

const meta: Meta = { title: 'UI/Code', tags: ['autodocs'] };
export default meta;

export const Inline: StoryObj = {
    render: () => (
        <p className="text-sm">
            Set the device password with <Code>admin123456</Code> via SMS.
        </p>
    ),
};

export const Block: StoryObj = {
    render: () => (
        <CodeBlock>{`const client = new ApolloClient({
  uri: 'https://graphql.track-any-device.com/graphql',
  cache: new InMemoryCache(),
});`}</CodeBlock>
    ),
};
