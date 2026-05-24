import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const externals = new Set([
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.dependencies ?? {}),
    'react/jsx-runtime',
])

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
            external: (id) => {
                if (externals.has(id)) return true
                return [...externals].some(dep => id.startsWith(dep + '/'))
            },
        },
        sourcemap: true,
        copyPublicDir: false,
    },
})
