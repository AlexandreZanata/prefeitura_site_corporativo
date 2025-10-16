import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react(),
        viteStaticCopy({
            targets: [
                {
                    // Copia a pasta de fontes do Font Awesome
                    src: 'node_modules/@fortawesome/fontawesome-free/webfonts',
                    // Para a pasta de assets do build
                    dest: 'assets'
                }
            ]
        }),
    ],
    server: {
        proxy: {
            // Proxy API requests to the Laravel backend during development
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            }
        }
    }
});
