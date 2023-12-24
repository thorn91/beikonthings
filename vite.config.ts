import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import copy from 'rollup-plugin-copy'
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		rollupOptions: {
			plugins: [
				copy({
					targets: [
						{ src: 'node_modules/@shoelace-style/shoelace/dist/assets', dest: '.svelte-kit/shoelace' }
					],
					hook: 'writeBundle' // notice this
				})
			]
		}
	}
});
