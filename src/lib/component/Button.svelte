<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = { children: Snippet } & SvelteHTMLElements['button'];
	const { children, ...restProps }: Props = $props();
</script>

<button {...restProps}>
	{@render children()}
</button>

<style>
	button {
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		background-color: #44679f;
	}
</style>
