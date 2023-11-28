import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            name: 'Livtoff UI',
            fileName: 'livtoff-ui',
            formats: ['es'],
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                'vue',
                '@heroicons/vue',
                '@headlessui/vue',
                '@inertiajs/vue3',
                'mitt',
                'lodash',
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                    '@heroicons/vue': 'Heroicons',
                    '@headlessui/vue': 'HeadlessUI-Vue',
                    '@inertiajs/vue3': 'Inertia Vue3',
                    mitt: 'mitt',
                    lodash: 'lodash',
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        modules: {
            generateScopedName: '[local]',
        },
    },
});
