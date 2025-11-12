import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { wuchale } from '@wuchale/vite-plugin';

export default defineConfig({
	plugins: [wuchale(), sveltekit(), devtoolsJson()],
	server: {
		allowedHosts: ["vite.xabier.uk"]
	}
});
