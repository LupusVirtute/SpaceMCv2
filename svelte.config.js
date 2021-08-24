import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess.js';
import node from '@sveltejs/adapter-node';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node(),
		vite: {
			resolve: {
				alias: {
					$component: path.resolve("src/lib/Components/"),
					$theme: path.resolve("src/themes/"),
					$config: path.resolve("src/config/"),
					$asset: path.resolve("src/assets/"),
					$util: path.resolve("src/utils/"),
				}
			}
		},
	}
};

export default config;
