import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
    stories: ['../stories/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    async viteFinal(config) {
        config.plugins = [
            react(),
            tailwindcss(),
            ...(config.plugins ?? []),
        ];
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                '@track-any-device/components': path.resolve(__dirname, '../src/index.ts'),
            },
        };
        return config;
    },
};

export default config;
