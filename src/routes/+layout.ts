import { locales } from '../locales/data.js';
import { browser } from '$app/environment';
import { loadLocale } from 'wuchale/load-utils';
// so that the loaders are registered, only here, not required in nested ones (below)
import '../locales/main.loader.svelte.js';
import '../locales/js.loader.js';
import type { LayoutLoad } from './$types.js';

export const load: LayoutLoad = async ({ url }) => {
	const locale = url.searchParams.get('locale') ?? 'en';
	if (browser && locales.includes(locale)) {
		await loadLocale(locale);
	}
};
