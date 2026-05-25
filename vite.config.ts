import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        dts({
            include: ['src'],
            exclude: ['**/*.stories.*', '**/*.spec.*', '**/*.test.*'],
        }),
    ],
    build: {
        lib: {
            entry: {
                index:  resolve(__dirname, 'src/index.ts'),
                'assets/index': resolve(__dirname, 'src/assets/index.ts'),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: (id) => id === 'react' || id === 'react-dom' || id.startsWith('react/') || id.startsWith('react-dom/'),
        },
        sourcemap: true,
        copyPublicDir: false,
    },
})
