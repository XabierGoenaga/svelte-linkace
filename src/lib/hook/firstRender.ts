import { onMount } from 'svelte';

export const useFirstRender = () => {
	let isFirstRender = true;

	onMount(() => {
		isFirstRender = false;
	});

	return isFirstRender;
};
