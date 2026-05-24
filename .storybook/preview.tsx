import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import './storybook.css';
import '../src/components/keenicons/assets/styles.css';

const THEMES = [
    'default', 'blue', 'neutral', 'slate', 'gray',
    'red', 'green', 'purple', 'orange', 'rose',
    'sky', 'yellow', 'fuchsia', 'amber', 'pink',
    'lime', 'cyan', 'emerald', 'violet', 'teal', 'indigo',
] as const;

const withTheme: Decorator = (Story, context) => {
    const theme = context.globals['theme'] ?? 'default';
    const colorMode = context.globals['colorMode'] ?? 'light';
    const isFullscreen = context.parameters['layout'] === 'fullscreen';

    return (
        <div
            data-theme={theme}
            className={colorMode === 'dark' ? 'dark' : ''}
            style={{
                background: 'var(--background, #ffffff)',
                minHeight: '100%',
                ...(isFullscreen ? {} : { padding: '1rem' }),
            }}
        >
            <Story />
        </div>
    );
};

const preview: Preview = {
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Brand colour scheme',
            defaultValue: 'default',
            toolbar: {
                icon: 'paintbrush',
                items: THEMES.map(t => ({ value: t, title: t.charAt(0).toUpperCase() + t.slice(1) })),
                showName: true,
                dynamicTitle: true,
            },
        },
        colorMode: {
            name: 'Color Mode',
            description: 'Light or dark mode',
            defaultValue: 'light',
            toolbar: {
                icon: 'circlehollow',
                items: [
                    { value: 'light', title: 'Light', icon: 'sun' },
                    { value: 'dark', title: 'Dark', icon: 'moon' },
                ],
                showName: true,
                dynamicTitle: true,
            },
        },
    },
    decorators: [withTheme],
    parameters: {
        options: {
            storySort: {
                order: [
                    'Design System',
                    'Apps',
                    'Components',
                    'Elements',
                    'UI',
                    'Controls',
                    'Layouts',
                    'Assets',
                    '*',
                ],
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
