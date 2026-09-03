import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [reactRouter(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        include: ['gsap', 'gsap/Flip', 'gsap/ScrollTrigger', '@gsap/react'],
    },
});
